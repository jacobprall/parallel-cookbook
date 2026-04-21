# Parallel Cookbook — Audit

## Scope
Structure, conventions, and navigability of the repo itself.
Out of scope: `website/`, `cookbook.json`, community (external) examples.

## Why this repo
Picked `parallel-cookbook` because it's the highest-leverage surface area in the org for developer onboarding and it's currently underbuilt.
- **Traction is already there.** Solid star count and steady inbound — it's the repo people actually land on when evaluating Parallel. That distribution is paid for; the question is what we do with it.
- **It's the natural "what can Parallel do?" surface.** A cookbook is where capabilities, building patterns, and API usage get shown rather than described. Docs tell; recipes prove. Right now it does neither job well — recipes are inconsistent, the strongest prose is buried, and there's no map.
- **Integrations are a wide-open lane.** Today the repo is mostly "Parallel + a frontend." The real wedge is Parallel inside the stacks developers are already building on: agent frameworks (LangChain, LlamaIndex, Mastra, Vercel AI SDK, CrewAI), model providers (Anthropic, OpenAI, Cerebras, Groq), data/infra (Supabase, Neon, Modal, Val Town), and eval/observability tools. Each integration is a recipe and a cross-promotion opportunity — their audience becomes aware of Parallel, our audience gets a blessed path into their tool.
- **Compounding surface.** Every well-structured recipe is a landing page for a long-tail search, a citation target for an LLM, and a template for the next contributor. Fixing the scaffolding once (template, `AGENTS.md`, `llms.txt`, generated index) compounds across every recipe added after.

The audit below is in service of that: make the repo good enough that shipping integration recipes is cheap, consistent, and discoverable.

## Top 4 problems
### 1. No canonical recipe template; 13 recipes, 6 conventions
**What.** The set `{README, SPEC, DEPLOY, CHANGELOG, TODO, .dev.vars.example, screenshot.png}` appears in ~6 different combinations across recipes. No `_template/`. No enforced layout.
**Why it matters.** Every per-recipe decision ("does this need a SPEC?") is re-litigated, which is also the root cause of problems 2–4. And `CONTRIBUTING.md` is 40 characters today, so a contributor has no bar to clear.
**Fix.** Ship `recipes/_template/` (`README.md`, `SPEC.md`, `DEPLOY.md`, `.dev.vars.example`, `recipe.json` stub). Rewrite `CONTRIBUTING.md` to reference it with a concrete PR checklist.
### 2. Language-first directory structure hides the JTBD
**What.** `python-recipes/` and `typescript-recipes/` are sibling roots. Reader looking for "fact-checker" picks a language first. Python side is internally asymmetric (loose `Snake_Case_Recipe.py` files alongside `kebab-case/` and `snake_case_demo/` dirs). There's one tombstone (`parallel-search-agent/`, README-only redirect) and one near-duplicate (`parallel-search-agent-cerebras` / `-groq`, same app, swapped inference provider).
**Why it matters.** A recipe's identity is its job-to-be-done, not its runtime. Multi-language ports live in two diverging trees instead of one folder.
**Fix.** `recipes/<slug>/`. Flat by default; nest `recipes/<slug>/{python,typescript}/` only when ≥2 languages exist. Merge cerebras/groq under `recipes/search-agent/typescript/{cerebras,groq}/`. Delete the tombstone.
### 3. Best docs are buried; large assets are unlabeled
**What.** `task-best-practices.md` (13 kB, the single strongest prose asset) sits at root, lowercase, unlinked from the README table. `task_library_trimmed.json` (29 kB) and `typescript-sdk-types.d.ts` (90 kB) sit at root with no README explanation — they appear to be LLM context seeds, but a reader has to guess.
**Why it matters.** Readers and agents can't find the guidance that prevents most Task-spec mistakes, and can't tell whether to ingest the root blobs.
**Fix.** Move guidance to `docs/task-best-practices.md` and link from README as "Start here." Move blobs to `context/` with a one-paragraph `context/README.md` naming their purpose.
### 4. No agent-navigability layer, despite "Machine Quickstart" framing
**What.** Root README pitches the repo as machine-first. But there's no `AGENTS.md`, no `llms.txt`, no map of what lives where or which recipe matches which API/pattern. The only signal is the README table, which is hand-maintained.
**Why it matters.** Both humans and LLMs land on the repo and have to infer conventions recipe-by-recipe. Gap between positioning and artifact.
**Fix.** Add `AGENTS.md` (recipe layout, file conventions, where to read first). Add `llms.txt` (apex summary + stable URL list). Generate the root README recipe table from `recipes/*/recipe.json` so it cannot drift.

---

## What changed (branch: `refactor/cookbook-structure`)

### Summary of changes

Eliminated the four problems above in a single structural pass. Every change is motivated by one or more of: **developer experience** (get to working code faster), **agent navigability** (machine-readable metadata, clear priority-read order), and **maintainability** (one source of truth, enforceable conventions).

### 1. Canonical template + real CONTRIBUTING.md

| Artifact | Purpose |
|---|---|
| `recipes/_template/` | Copy-paste starting point for any new recipe. Includes `README.md`, `SPEC.md`, `DEPLOY.md`, `.dev.vars.example`, `recipe.json`. |
| `recipes/recipe.schema.json` | JSON Schema (draft-07) for `recipe.json`. Enumerates allowed values for `apis`, `patterns`, `jtbd`, `languages`, `deploy`, `status`. |
| `CONTRIBUTING.md` (rewritten) | References the template, provides a concrete PR checklist, documents how to handle deprecations and community recipes. |

**Why.** Before: 13 recipes, 6 conventions, contributors had zero guidance (old CONTRIBUTING.md was 40 characters). After: one layout to copy, one schema to validate, one checklist to follow.

### 2. JTBD-first directory structure

Before:
```
python-recipes/
  Deep_Research_Recipe.ipynb
  Large_Scale_Tasks_Recipe.py
  market-analysis-demo/
  vertex_ai_demo/
typescript-recipes/
  parallel-search-agent/          ← tombstone
  parallel-search-agent-cerebras/
  parallel-search-agent-groq/     ← near-duplicate
  parallel-supabase-enrichment/
  ...
```

After:
```
recipes/
  search-agent/        ← merged cerebras + groq into one configurable worker
  supabase-enrichment-app/
  daily-insights/
  deep-research/       ← deep_research_recipe.ipynb (kebab dir, snake_case file)
  market-analysis-app/
  vertex-ai-grounding/
  ...
```

Design decisions:
- **Stripped `parallel-` prefix** from all slugs (redundant inside `parallel-cookbook/recipes/`).
- **Full apps get `-app` suffix** (framework infra, DB, multiple concerns) to distinguish from single-pattern recipes.
- **Provider duplication → one configurable worker.** `search-agent` uses `LLM_PROVIDER` env var instead of two codebases.
- **Flat by default.** Language subdirs (`typescript/`, `python/`) only when ≥2 implementations exist.
- **Tombstone deleted.** `MIGRATION.md` carries the old→new path map for anyone updating bookmarks.

**Why.** Reader arrives with "I want to build X" not "I want to write TypeScript." Structure now matches intent. Agent traversal is predictable: `recipes/<slug>/recipe.json` always exists, always validates.

### 3. Promoted docs + labeled context

| Move | Why |
|---|---|
| `task-best-practices.md` → `docs/task-best-practices.md` | Highest-value prose was invisible. Now linked from README as "Start here." |
| `task_library_trimmed.json` → `context/task-library.json` | Unlabeled 29 kB blob → explained in `context/README.md` as "feed to LLM when designing Task specs." |
| `typescript-sdk-types.d.ts` → `context/sdk-types.d.ts` | Unlabeled 90 kB blob → explained as "full TS SDK types for agent ingestion." |

**Why.** The repo's positioning is "Machine Quickstart" — these files are the machine's starting context, and they were unnamed luggage. Now they have a purpose statement and a defined update cadence.

### 4. Agent-navigability layer

| File | Role |
|---|---|
| `AGENTS.md` | Full orientation for LLMs: structure map, conventions, priority-read list, API coverage snapshot with gaps called out. |
| `llms.txt` | Apex-level summary: one-liner per recipe, links to docs, SDK, and platform. Designed for `llms.txt` MCP ingestion. |
| Root `README.md` (rewritten) | Recipe index table with API, language, and demo columns. Links to `AGENTS.md`, `llms.txt`, `CONTRIBUTING.md`, and `docs/` upfront. |

**Why.** Before: an agent landing on the repo would read the README, find a 5-row table, and have no idea which file to read next or which APIs are covered. After: `AGENTS.md` gives a priority-ordered reading list, `llms.txt` gives a flat machine-parseable index, and the README links both on the first screen.

### 5. Per-recipe `recipe.json` (new invention)

Every recipe now has a co-located `recipe.json` that validates against `recipes/recipe.schema.json`. Fields:

```json
{
  "slug": "search-agent",
  "title": "Web Search Agent",
  "description": "...",
  "status": "live",
  "apis": ["search"],
  "patterns": ["sse", "agent-tool", "ratelimit"],
  "jtbd": ["agent"],
  "languages": ["typescript"],
  "deploy": ["cloudflare-workers"],
  "demo_url": "...",
  "creators": ["janwilmake"]
}
```

**Why.** The original repo had `website/cookbook.json` (centralized, hand-maintained, drifts from reality) and the root README table (also hand-maintained, also drifts). `recipe.json` is the single source of truth, co-located with the recipe, machine-validatable. The README table and any website view should be *generated* from these files, not maintained separately.

### What's still out of scope

- `website/` and `cookbook.json` — left untouched. Future: website reads from `recipes/*/recipe.json` at build time.
- `oss/` — redirect worker, left in place.
- Content gaps (FindAll, Monitor, Ingest, MCP recipes) — structural work lands first, new recipes follow the template.

### File map (before → after)

See `MIGRATION.md` for the complete old→new path table.
