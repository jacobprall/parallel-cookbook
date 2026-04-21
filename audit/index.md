# Parallel Cookbook — Audit & Refactor

**Scope:** Repo structure, conventions, navigability. Out of scope: `website/`, `oss/`, community repos.

## Why this repo

The cookbook is the highest-leverage dev onboarding surface. It has distribution; what it lacked was structure. Every well-structured recipe compounds — long-tail search landing page, LLM citation target, template for the next contributor. Fix the scaffolding once, ship integration recipes cheaply forever.

The integration lane is wide open: agent frameworks, model providers, data infra, eval tools. Each is a recipe and a cross-promotion opportunity. But today, shipping one means re-inventing conventions from scratch.

## Problems found

| # | Problem | Impact |
|---|---|---|
| 1 | **No template.** 13 recipes, 6 different file combinations. `CONTRIBUTING.md` was 40 chars. | Contributors have no bar; every recipe re-litigates layout decisions. |
| 2 | **Language-first dirs hide the JTBD.** `python-recipes/` + `typescript-recipes/` force language choice before intent. Tombstone and near-duplicate (`-cerebras`/`-groq`) add noise. | Reader looking for "fact-checker" has to know which language dir first. Multi-language ports diverge. |
| 3 | **Best docs buried.** `task-best-practices.md` (13 kB) at root, unlinked. 90 kB SDK types + 29 kB task library sit unexplained. | Strongest asset invisible. LLM context files indistinguishable from junk. |
| 4 | **No agent layer.** README says "Machine Quickstart" but no `AGENTS.md`, no `llms.txt`, no structured metadata. | Agents infer conventions recipe-by-recipe. Positioning ≠ artifact. |

## What we shipped (`refactor/cookbook-structure`)

176 files changed. Single commit, clean history.

### Structure: before → after

```
BEFORE                                  AFTER
python-recipes/                         recipes/
  Deep_Research_Recipe.ipynb               _template/        ← canonical layout
  market-analysis-demo/                   search-agent/     ← merged cerebras+groq
  ...                                     supabase-enrichment-app/
typescript-recipes/                       daily-insights/
  parallel-search-agent/     ← tombstone  deep-research/
  parallel-search-agent-cerebras/         market-analysis-app/
  parallel-search-agent-groq/             ...
  parallel-supabase-enrichment/
  ...
```

### Key decisions

- **JTBD-first.** `recipes/<slug>/` — reader picks what to build, not what language.
- **Stripped `parallel-` prefix.** Redundant inside `parallel-cookbook/recipes/`.
- **`-app` suffix** for full-stack apps (DB, framework, multiple concerns).
- **Merged provider variants.** One `search-agent/` with `LLM_PROVIDER` env var, not two codebases.
- **Flat by default.** Language subdirs only when ≥2 implementations exist.
- **Tombstone deleted.** Old paths live in `MIGRATION.md`.

### New files

| File | What it does |
|---|---|
| `recipes/_template/` | Copy-paste starting point: README, SPEC, DEPLOY, `.dev.vars.example`, `recipe.json` |
| `recipes/recipe.schema.json` | JSON Schema for `recipe.json` — enforces `apis[]`, `patterns[]`, `jtbd[]`, `languages[]`, `status` |
| `recipes/*/recipe.json` | Per-recipe metadata. Single source of truth; README table + future website generate from these. |
| `CONTRIBUTING.md` | Rewritten. Template reference, PR checklist, deprecation rules. |
| `docs/task-best-practices.md` | Moved from root, linked from README as "Start here." |
| `context/README.md` | Explains `task-library.json` (example specs) and `sdk-types.d.ts` (full TS types) — LLM context seeds. |
| `AGENTS.md` | Machine-first orientation: structure map, priority-read order, API coverage with gaps called out. |
| `llms.txt` | Flat recipe index for MCP/agent ingestion. |
| `MIGRATION.md` | Complete old → new path map. |

### Still out of scope

- `website/` / `cookbook.json` — future: generate from `recipes/*/recipe.json`.
- Content gaps (FindAll ×0, Monitor ×0, Ingest ×0, MCP ×0) — new recipes follow the template post-merge.
