# Contributing

Thanks for considering a contribution. This cookbook is designed so humans and agents can both navigate it quickly, which means conventions matter.

## Adding a recipe

1. **Copy the template.**
   ```bash
   cp -r recipes/_template recipes/<your-slug>
   ```
   The slug is kebab-case, ≤40 characters, and describes the job-to-be-done (e.g. `findall-icp-discovery`, not `parallel-awesome-thing`).

2. **Fill in `recipe.json`.** Validates against [`recipes/recipe.schema.json`](./recipes/recipe.schema.json). Required fields: `slug`, `title`, `description`, `status`, `apis`, `patterns`, `jtbd`, `languages`. See the schema for the allowed enum values.

3. **Write `README.md`.** Keep to the section order in the template. ASCII architecture diagrams are preferred over PNGs because they render in terminals and LLM contexts.

4. **Write `SPEC.md` if the recipe has a contract.** Schemas, event taxonomies, and API surfaces belong here. Delete it otherwise.

5. **Write `DEPLOY.md` if deploy is non-trivial.** More than ~5 commands, or platform-specific setup. Delete it otherwise — inline the steps in the README.

6. **Add code.** Flat under `recipes/<slug>/` by default. Nest into `recipes/<slug>/{python,typescript}/` only if a second-language implementation lands.

7. **Follow [`docs/task-best-practices.md`](./docs/task-best-practices.md)** for any Task API schemas. Flat structures, fact-based field names, processor selection guidance.

## PR checklist

Before opening:

- [ ] `recipe.json` present and validates against the schema
- [ ] `README.md` follows the template section order
- [ ] `.dev.vars.example` lists every secret the recipe needs (with empty values)
- [ ] No secrets, API keys, or personal data committed
- [ ] Live demo URL works (or `status: "draft"` in `recipe.json`)
- [ ] If the recipe replaces an existing one, update `MIGRATION.md` with the old → new path

## Fixing an existing recipe

- Bug fixes: open a PR with a minimal repro in the description.
- Breaking changes: bump the recipe's `CHANGELOG.md` (create if it doesn't exist) and call them out in the PR body.
- Deprecation: set `status: "deprecated"` in `recipe.json`, don't delete the directory. Deletions go through `MIGRATION.md`.

## Community recipes

External repos that use Parallel are welcome but live in `community.json`, not `recipes/`. Open an issue to propose one.

## Questions

[@janwilmake](https://x.com/janwilmake) on X, or open an issue.
