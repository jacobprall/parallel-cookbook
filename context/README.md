# Context Files

These files exist as **LLM context seeds**. They're not runtime dependencies — they're here so agents (and humans with long-context tools) can ingest the full Parallel API surface in one shot.

## Files

| File | What it is | When to use it |
|---|---|---|
| `task-library.json` | A curated set of Task API spec examples (schemas, inputs, processor choices). | Feed to an LLM when designing a new Task spec. Shows working patterns. |
| `sdk-types.d.ts` | Full TypeScript type definitions for the `parallel-web` npm package. | Feed to an LLM when writing SDK code. Gives complete method signatures, payload shapes, and return types. |

## Why these exist

The root README's "Machine Quickstart" section recommends cloning this repo for agent use. These files give an agent immediate access to the Parallel API contract without needing to fetch docs at runtime.

They should be updated whenever the SDK ships a breaking change. The canonical sources are:
- `task-library.json`: curated manually from production task specs.
- `sdk-types.d.ts`: copied from `node_modules/parallel-web/dist/index.d.ts` after `npm install parallel-web@latest`.
