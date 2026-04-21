# <Recipe Title>

> One-sentence pitch. Matches `description` in `recipe.json`.

Live demo: <https://...>

## What it does

Two to four sentences. State the input, the output, and the user-visible behavior. Avoid marketing language — this is the first thing a developer reads to decide whether to keep reading.

## Why this approach

Short paragraph or bullet list on the architectural choice that makes this recipe interesting. Link to `SPEC.md` if the full contract is spelled out there. One or two of:

- Which Parallel API(s) and why (Task vs Search vs Extract vs FindAll vs Monitor vs Ingest).
- The execution pattern (sync, SSE, webhook, cron, batch, agent tool-call).
- The processor choice and tradeoff (lite/base/core/pro/ultra).

## Architecture

ASCII-diagram preferred over images so it renders in terminals and LLM contexts:

```
┌──────────┐   ┌──────────────┐   ┌────────────────┐
│  Client  │──▶│  <deploy>    │──▶│  Parallel API  │
└──────────┘   └──────────────┘   └────────────────┘
```

## Quick start

```bash
cp .dev.vars.example .dev.vars
# fill in PARALLEL_API_KEY and any other secrets
npm install
npm run dev
```

## Configuration

| Var | Required | Description |
|---|---|---|
| `PARALLEL_API_KEY` | yes | From <https://platform.parallel.ai> |

## Project structure

```
<slug>/
├── recipe.json
├── README.md
├── SPEC.md            # if this recipe has a schema/contract worth spelling out
├── DEPLOY.md          # if deploy steps exceed 5 commands
├── .dev.vars.example
└── worker.ts | app.py | ...
```

## Deployment

See [`DEPLOY.md`](./DEPLOY.md). Omit that file if the deploy is one or two commands and fits inline here.

## Resources

- [Parallel docs](https://docs.parallel.ai)
- [Task API best practices](../../docs/task-best-practices.md)
- [Recipe source](https://github.com/parallel-web/parallel-cookbook/tree/main/recipes/<slug>)
