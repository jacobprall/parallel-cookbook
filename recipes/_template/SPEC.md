# SPEC — <Recipe Title>

> Delete this file if the recipe's contract fits in the README's "What it does" section. Keep it when the recipe has a schema, a play contract, or an event taxonomy worth fixing in one place.

## Goal

One sentence: what this recipe must do to be considered working. Testable if possible.

## Inputs

| Field | Type | Required | Description |
|---|---|---|---|
| `example_input` | string | yes | What the caller provides. |

## Outputs

Paste the Parallel Task output schema here as a fenced JSON block, or link to where it's defined in code. Follow `docs/task-best-practices.md` — flat, required-all, fact-based field names.

```json
{
  "type": "object",
  "properties": {
    "example_field": {
      "type": "string",
      "description": "Entity / action / specifics / error handling. See task-best-practices.md §'Effective Field Descriptions'."
    }
  },
  "required": ["example_field"],
  "additionalProperties": false
}
```

## Events / API surface

If this recipe streams or exposes HTTP endpoints, enumerate them here. One table for endpoints, one table for event types.

| Endpoint | Method | Body | Returns |
|---|---|---|---|
| `/example` | POST | `{ "input": string }` | SSE stream |

| Event type | When it fires | Payload |
|---|---|---|
| `example.update` | On each chunk | `{ "chunk": string }` |

## Non-goals

- What this recipe intentionally does not do. Keeps reviewers from scope-creeping the PR.

## Processor selection

- Processor: `<lite|base|core|pro|ultra>`
- Why: one sentence referencing complexity, field count, or interpretive load. See `docs/task-best-practices.md` §Processor Selection.
