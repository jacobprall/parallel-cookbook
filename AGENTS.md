# Agent Guide

> Read this first if you are an LLM or coding agent working in this repo.

## Repo structure

```
parallel-cookbook/
├── README.md               ← human entry point (recipe index table)
├── AGENTS.md               ← you are here
├── CONTRIBUTING.md         ← PR checklist and template reference
├── MIGRATION.md            ← old path → new path map
├── docs/
│   └── task-best-practices.md  ← Task API schema guidance (read before writing any Task spec)
├── context/
│   ├── task-library.json       ← example Task specs (ingest for schema design)
│   └── sdk-types.d.ts          ← full TS SDK types (ingest for SDK code)
├── recipes/
│   ├── recipe.schema.json      ← JSON Schema for recipe.json
│   ├── README.md               ← layout rules
│   ├── _template/              ← copy this when creating a recipe
│   └── <slug>/                 ← one directory per recipe
│       ├── recipe.json         ← metadata (slug, apis, patterns, jtbd, languages)
│       ├── README.md           ← narrative
│       └── ...                 ← code, SPEC.md, DEPLOY.md, etc.
├── oss/                        ← Cloudflare redirect worker (oss.parallel.ai)
└── website/                    ← cookbook website (p0web.com)
```

## Conventions

- **Recipes are identified by slug** (directory name = `recipe.json` slug field).
- **Flat by default.** Code lives directly under `recipes/<slug>/`. Only nest into `typescript/` or `python/` when multiple language implementations exist.
- **Metadata is machine-readable.** `recipe.json` validates against `recipes/recipe.schema.json`.
- **No tombstones.** Moves go in `MIGRATION.md`.
- **`docs/task-best-practices.md`** is the canonical source for Task API schema design rules. Reference it in any Task spec you write.

## What to read first (priority order)

1. `AGENTS.md` (this file) — orientation.
2. `docs/task-best-practices.md` — if writing a Task spec.
3. `context/sdk-types.d.ts` — if writing SDK code.
4. `context/task-library.json` — if designing a new Task output schema.
5. `recipes/<slug>/SPEC.md` — if modifying an existing recipe's contract.

## Adding or modifying a recipe

1. Copy `recipes/_template/` → `recipes/<your-slug>/`.
2. Fill in `recipe.json` (validates against `recipes/recipe.schema.json`).
3. Follow the section order in the template README.
4. See `CONTRIBUTING.md` for the full PR checklist.

## API coverage snapshot

| API | Recipes |
|---|---|
| Task | supabase-enrichment-app, daily-insights, tasks-sse, entity-resolution, api-explorer-app, deep-research, large-scale-tasks, task-group-temporal, market-analysis-app |
| Search | search-agent, fact-checker, api-explorer-app, vertex-ai-grounding |
| Extract | fact-checker, api-explorer-app |
| FindAll | — (gap) |
| Monitor | — (gap) |
| Ingest | — (gap) |
| MCP | — (gap) |
| OAuth | tasks-sse, entity-resolution |
