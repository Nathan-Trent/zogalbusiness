# Zogal Business — marketing site

`business.getzogal.com` — the Zogal Business sub-brand and its products.

- `/` — Zogal Business
- `/doka` — Doka by Zogal (features, pricing from the Doka back office, sign-up → doka.zogal.app)

Next.js on Vercel. Env vars: see `.env.example`. Pricing is read anonymously from the Doka
Supabase project (`pricing_plans`, public read) and re-fetched every 60 s.
Design follows getzogal.com; gold is the business sub-brand's accent.
