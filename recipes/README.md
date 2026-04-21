# Recipes

Each subdirectory is one recipe. The recipe's `recipe.json` is the source of truth for its metadata; the root README's recipe index is generated from those files.

## Layout

```
recipes/
├── _template/              # canonical layout — copy this when adding a recipe
├── recipe.schema.json      # JSON Schema for recipe.json
└── <slug>/
    ├── recipe.json         # required — metadata
    ├── README.md           # required — narrative + quick start
    ├── SPEC.md             # optional — contract, schema, event types
    ├── DEPLOY.md           # optional — deploy steps
    ├── .dev.vars.example   # required when the recipe needs secrets
    ├── assets/             # optional — screenshots, diagrams
    └── <language>/         # only when the recipe exists in >1 language
        └── <runtime>/      # only when >1 implementation per language (e.g. cerebras vs groq)
```

## Rules

- **Flat by default.** A single-language recipe puts its code (`worker.ts`, `index.html`, etc.) directly under `recipes/<slug>/`. Don't add a `typescript/` subdirectory unless a second language implementation exists.
- **One slug per recipe.** The directory name must equal `recipe.json`'s `slug` field.
- **Metadata is machine-readable.** `recipe.json` validates against `recipes/recipe.schema.json`.
- **No tombstones.** If a recipe moves, delete the old directory and add the old → new path to `MIGRATION.md`.

## Adding a recipe

1. Copy `_template/` to `recipes/<your-slug>/`.
2. Fill in `recipe.json`, `README.md`, and `.dev.vars.example`.
3. See `CONTRIBUTING.md` for the PR checklist.
