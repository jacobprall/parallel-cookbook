# Parallel Cookbook

Recipes and full-stack examples for building with [Parallel APIs](https://docs.parallel.ai). Clone this repo and start building — or point your agent at [`AGENTS.md`](./AGENTS.md) for machine-first orientation.

## Start here

- **New to the Task API?** Read [`docs/task-best-practices.md`](./docs/task-best-practices.md) before writing a schema.
- **Adding a recipe?** Copy `recipes/_template/` and follow [`CONTRIBUTING.md`](./CONTRIBUTING.md).
- **Using an agent?** See [`AGENTS.md`](./AGENTS.md) and [`llms.txt`](./llms.txt).

## Recipes

| Recipe | Description | APIs | Language | Demo |
|---|---|---|---|---|
| [supabase-enrichment-app](recipes/supabase-enrichment-app/) | Real-time company enrichment with Supabase Edge Functions | Task | TypeScript | — |
| [daily-insights](recipes/daily-insights/) | Active monitoring with cron triggers, KV, and webhooks | Task | TypeScript | [daily.p0web.com](https://daily.p0web.com) |
| [tasks-sse](recipes/tasks-sse/) | Task streaming playground with OAuth and SSE | Task, OAuth | TypeScript | [oss.parallel.ai/tasks-sse](https://oss.parallel.ai/tasks-sse/) |
| [entity-resolution](recipes/entity-resolution/) | AI-powered identity resolution across social platforms | Task, OAuth | TypeScript | [entity-resolution-demo.parallel.ai](https://entity-resolution-demo.parallel.ai) |
| [search-agent](recipes/search-agent/) | Streaming search agent with Parallel Search as a tool | Search | TypeScript | [oss.parallel.ai/agent](https://oss.parallel.ai/agent) |
| [fact-checker](recipes/fact-checker/) | Extract claims from text/URLs and verify against web sources | Search, Extract | TypeScript | — |
| [api-explorer-app](recipes/api-explorer-app/) | Interactive demo of Search, Extract, and Task APIs | Task, Search, Extract | TypeScript | [parallel-vercel-template-cookbook.vercel.app](https://parallel-vercel-template-cookbook.vercel.app/) |
| [deep-research](recipes/deep-research/) | Interactive market research with Deep Research API | Task | Python | — |
| [large-scale-tasks](recipes/large-scale-tasks/) | Production batch processing with Task Group API | Task | Python | — |
| [task-group-temporal](recipes/task-group-temporal/) | Task Groups integrated with Temporal workflows | Task | Python | — |
| [market-analysis-app](recipes/market-analysis-app/) | Full-stack market research tool with SSE and email | Task | Python | [market-analysis-demo.parallel.ai](https://market-analysis-demo.parallel.ai/) |
| [vertex-ai-grounding](recipes/vertex-ai-grounding/) | Parallel Search as grounding for Gemini on Vertex AI | Search | Python | — |

## Community Examples

- [Parallel Spreadsheet](https://github.com/zahidkhawaja/parallel-spreadsheet) by [@chillzaza\_](https://x.com/chillzaza_/status/1958005876918292941)
- [Based People](https://github.com/janwilmake/basedpeople) by [@janwilmake](https://x.com/janwilmake/status/1956061673833300443)
- [Scira (10k+ stars)](https://github.com/zaidmukaddam/scira) by [@zaidmukaddam](https://x.com/zaidmukaddam/status/1958583204635439264)

## Resources

- [Parallel Documentation](https://docs.parallel.ai)
- [Get API Keys](https://platform.parallel.ai)
- [parallel-web (npm)](https://www.npmjs.com/package/parallel-web)
- [parallel-flatten](https://github.com/janwilmake/parallel-flatten) — utility for flat outputs

## Machine Quickstart

Clone this repo and install [our MCPs](https://docs.parallel.ai/integrations/mcp/getting-started). The "llms.txt MCP" provides comprehensive context for asking questions about Parallel. Other MCPs let you experiment with APIs without writing code.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).
