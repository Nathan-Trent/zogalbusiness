# Zogal Business — marketing site

`business.getzogal.com` — the Zogal Business sub-brand and its products.

- `/` — Zogal Business
- `/doka` — Doka by Zogal: features, how it works, pricing (from the Doka back office), FAQ, sign-up → doka.zogal.app

Next.js on Vercel, on the getzogal.com design kit (light ground, surfaces, forest bands, the leaf).
Env vars: see `.env.example`. Pricing is read anonymously from the Doka Supabase project
(`pricing_plans`, public read) and re-fetched every 60 s.
