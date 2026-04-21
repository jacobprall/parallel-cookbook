# Deploy — <Recipe Title>

> Keep this file only when deploy is non-trivial (more than 5 commands or requires platform-specific setup). Otherwise inline it in the README.

## Target

One of: Cloudflare Workers, Vercel, Supabase Edge Functions, Flask (Vercel), CLI, Notebook. Matches `deploy` in `recipe.json`.

## Prerequisites

- Node 18+ (or Python 3.10+)
- `<platform>` account with billing enabled (if applicable)
- Parallel API key: <https://platform.parallel.ai>

## Steps

### Cloudflare Workers

```bash
npx wrangler login
npx wrangler secret put PARALLEL_API_KEY
npm run deploy
```

### Vercel

```bash
npx vercel link
npx vercel env add PARALLEL_API_KEY
npx vercel deploy --prod
```

### Supabase Edge Functions

```bash
supabase link --project-ref <ref>
supabase secrets set PARALLEL_API_KEY=...
supabase functions deploy <fn-name>
```

Pick one. Delete the others.

## Verification

One command or URL that proves the deploy works.

```bash
curl -X POST https://<your-deploy>/example -d '{"input":"ping"}'
```
