/// <reference types="@cloudflare/workers-types" />
import { Parallel } from "parallel-web";
import { createCerebras } from "@ai-sdk/cerebras";
import { createGroq } from "@ai-sdk/groq";
import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod/v4";
import { rateLimitMiddleware } from "./ratelimit";
//@ts-ignore
import indexHtml from "./index.html";

export interface Env {
  PARALLEL_API_KEY: string;
  LLM_PROVIDER: "cerebras" | "groq";
  CEREBRAS_API_KEY?: string;
  GROQ_API_KEY?: string;
  RATE_LIMIT_KV?: KVNamespace;
}

function getClientIP(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0].trim() ||
    request.headers.get("X-Real-IP") ||
    "unknown"
  );
}

function createModel(env: Env) {
  if (env.LLM_PROVIDER === "groq") {
    if (!env.GROQ_API_KEY) throw new Error("GROQ_API_KEY required when LLM_PROVIDER=groq");
    const groq = createGroq({ apiKey: env.GROQ_API_KEY });
    return groq("meta-llama/llama-4-maverick-17b-128e-instruct");
  }
  if (!env.CEREBRAS_API_KEY) throw new Error("CEREBRAS_API_KEY required when LLM_PROVIDER=cerebras");
  const cerebras = createCerebras({ apiKey: env.CEREBRAS_API_KEY });
  return cerebras("qwen-3-235b-a22b-instruct-2507");
}

const DEFAULT_SYSTEM_PROMPT = (date: string) =>
  `You are a simple search agent. Your mission is to comprehensively fulfill the user's search objective by conducting 1 up to 3 searches from different angles until you have gathered sufficient information to provide a complete answer. The current date is ${date}

**Research Philosophy:**
- Each search should explore a unique angle or aspect of the topic
- NEVER try to OPEN an article, the excerpts provided should be enough

**Key Parameters:**
- objective: Describe what you're trying to accomplish. This helps the search engine understand intent and provide relevant results.

**Output:**
After doing the searches required, write up your 'search report' that answers the initial search query. Even if you could not answer the question ensure to always provide a final report! Please do NOT use markdown tables.
`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (!env.PARALLEL_API_KEY) {
      return new Response("Missing PARALLEL_API_KEY", { status: 500 });
    }

    const url = new URL(request.url);

    if (url.pathname === "/agent" || url.pathname === "/agent/") {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    if (request.method === "GET") {
      return new Response(indexHtml, {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (request.method === "POST") {
      if (env.RATE_LIMIT_KV) {
        const rateLimitResponse = await rateLimitMiddleware(env.RATE_LIMIT_KV, {
          limits: [
            { name: "IP hourly", requests: 100, windowMs: 60 * 60 * 1000, limiter: getClientIP(request) },
            { name: "Global per minute", requests: 100, windowMs: 60 * 1000, limiter: "global" },
            { name: "Global daily", requests: 10000, windowMs: 24 * 60 * 60 * 1000, limiter: "global" },
          ],
        });
        if (rateLimitResponse) return rateLimitResponse;
      }

      try {
        const { query, systemPrompt } = await request.json<any>();
        if (!query) {
          return new Response("Query is required", { status: 400 });
        }

        const searchTool = tool({
          description: `# Web Search Tool

**Purpose:** Perform web searches and return LLM-friendly results.

**Usage:**
- objective: Natural-language description of your research goal (max 200 characters)

**Best Practices:**
- Be specific about what information you need
- Mention if you want recent/current data
- Keep objectives concise but descriptive`,
          inputSchema: z.object({
            objective: z.string().describe("Natural-language description of your research goal (max 200 characters)"),
          }),
          execute: async ({ objective }) => {
            const parallel = new Parallel({ apiKey: env.PARALLEL_API_KEY });
            return parallel.beta.search({
              objective,
              search_queries: undefined,
              processor: "base",
              source_policy: { exclude_domains: undefined, include_domains: undefined },
              max_results: 10,
              max_chars_per_result: 2500,
            });
          },
        });

        const model = createModel(env);
        const today = new Date(Date.now()).toISOString().slice(0, 10);

        const result = streamText({
          model,
          system: systemPrompt || DEFAULT_SYSTEM_PROMPT(today),
          prompt: query,
          tools: { search: searchTool },
          stopWhen: stepCountIs(25),
          maxOutputTokens: 20000,
        });

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of result.fullStream) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
              }
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            } catch (error) {
              console.error("Stream error:", error);
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: "error", error: error.message })}\n\n`)
              );
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      } catch (error) {
        console.error("Research error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
