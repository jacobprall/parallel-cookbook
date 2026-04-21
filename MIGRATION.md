# Migration Map

Old path → new path. Use this to update bookmarks, CI references, and external links.

## Moved

| Old | New | Notes |
|---|---|---|
| `typescript-recipes/parallel-supabase-enrichment/` | `recipes/supabase-enrichment-app/` | |
| `typescript-recipes/parallel-daily-insights/` | `recipes/daily-insights/` | |
| `typescript-recipes/parallel-tasks-sse/` | `recipes/tasks-sse/` | |
| `typescript-recipes/parallel-entity-resolution/` | `recipes/entity-resolution/` | |
| `typescript-recipes/parallel-search-agent-cerebras/` | `recipes/search-agent/` | Merged with groq variant; single configurable worker |
| `typescript-recipes/parallel-search-agent-groq/` | `recipes/search-agent/` | Merged with cerebras variant |
| `typescript-recipes/parallel-fact-checker-cerebras/` | `recipes/fact-checker/` | |
| `typescript-recipes/parallel-vercel-template/` | `recipes/api-explorer-app/` | Renamed — describes the JTBD, not the deploy target |
| `python-recipes/Deep_Research_Recipe.ipynb` | `recipes/deep-research/deep_research_recipe.ipynb` | |
| `python-recipes/Large_Scale_Tasks_Recipe.py` | `recipes/large-scale-tasks/large_scale_tasks_recipe.py` | |
| `python-recipes/Task_Group_Temporal_Recipe.py` | `recipes/task-group-temporal/task_group_temporal_recipe.py` | |
| `python-recipes/market-analysis-demo/` | `recipes/market-analysis-app/` | |
| `python-recipes/vertex_ai_demo/` | `recipes/vertex-ai-grounding/` | |

## Deleted

| Old | Reason |
|---|---|
| `typescript-recipes/parallel-search-agent/` | Tombstone (README-only redirect). Merged into `recipes/search-agent/`. |
| `python-recipes/README.md` | Superseded by per-recipe `recipe.json` and `recipes/README.md`. |
