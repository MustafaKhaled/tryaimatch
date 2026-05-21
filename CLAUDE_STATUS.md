# Project Status — tryaimatch

Snapshot of where the app is and what's left. Updated 2026-05-21.

## What ships today

**End-to-end quiz flow works.** Home → `/quiz` (category picker + N weighted questions) → `/loading` (~3s animated screen) → `/results` (top-3 ranked cards + star rating + confetti). All 10 categories use one generic schema and scoring engine:

- Video maker · Voiceover & audio · Image generation · Writing & copywriting · Coding & development · Presentation & slides · SEO & research · Chatbots & automation · Customer support · Data analysis

**Public pages**: Home, `/blogs` (placeholder "coming soon"), `/contact` (product-listing form). Shared `<SiteNav />` with NuxtLink-based active-state, plus a "Start now" CTA.

**Analytics + persistence**:
- `POST /api/quiz-completions` — every finished quiz logs category, answers, top-3 tools, duration.
- `POST /api/ratings` — 1–5 stars (required) + comment (optional) from the results page.
- `POST /api/contact` — Supabase insert **and** SMTP email to `hello@tryaimatch.com` (via nodemailer 8.x), with the visitor's email set as `Reply-To`.
- All three handlers degrade to `console.log` if env vars aren't set, so dev works with zero setup.

**Design system**: adaptive light/dark via `prefers-color-scheme`, IBM Plex Sans + Caveat (handwritten accent), Tabler icons, hard-shadow brutalist buttons. CSS vars in [assets/css/main.css](assets/css/main.css).

**Deployment**: Railway via [railway.json](railway.json) (Nixpacks). Node 20+ pinned in `package.json` engines. GTM tag wired in [nuxt.config.ts](nuxt.config.ts) (`G-HRG7JVJRMS`).

## Architecture in one paragraph

Every category is a `Category` object ([data/schema.ts](data/schema.ts)) with `questions[]` and `tools[]`. Each option carries `effects[]` — `numeric` (weighted 0–10), `boolean` (env match → flat points), `hardFilter` (capability penalty), `priceFilter` (budget penalty). [data/scoring.ts](data/scoring.ts) walks them generically; `maxScore` is auto-derived. To add a category: drop a file in `data/categories/`, register in `data/categories/index.ts`, add it to the picker in `pages/quiz.vue`. No other code changes.

## Setup checklist for production

- [ ] **Supabase** — run [supabase/schema.sql](supabase/schema.sql) in the SQL editor (3 tables: `ratings`, `quiz_completions`, `contact_submissions`). Set `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` on Railway.
- [ ] **SMTP** — get `SMTP_HOST`/`PORT`/`USER`/`PASS` from your domain's mailbox provider. Defaults assume `hello@tryaimatch.com`.
- [ ] **Logo** — drop final `public/logo.png` (currently in place but verify it's the right asset; rendered at 36px height).
- [ ] **GTM ID** — confirm `G-HRG7JVJRMS` is the right property for prod, or override.

## Open / expected tasks

Things we've discussed but haven't built, and obvious next steps the code is set up for.

### Content & polish
- [ ] **Blogs page is a stub** — needs real posts, list/index, individual post pages, and likely an MDX or markdown content pipeline.
- [ ] **Tool data needs verification** — scores in `data/categories/*.ts` are reasonable defaults, not researched rankings. A pass through each category against current 2026 reality (esp. coding, image gen, voice) would improve match quality.
- [ ] **Affiliate URLs** — the `affiliateUrl` fields on each tool are vanilla product URLs. If monetisation matters, swap in real affiliate links.
- [ ] **Browse all tools** — the secondary CTA on the hero says "Browse all tools →" but goes nowhere. Either build a directory page or remove the button.

### Product features
- [ ] **Email capture for results** — currently top-3 are shown then forgotten. An opt-in "email me my matches" would be a natural lead-gen hook (and Supabase already has the data).
- [ ] **Share / save results** — URLs for `/results` currently rely on `useState`, so sharing or refreshing loses the result. Encoding answers in the query string would fix this and enable shareable matches.
- [ ] **Admin view for ratings + completions** — data is going into Supabase but there's no in-app dashboard. Either build one or just use Supabase's table editor.
- [ ] **A/B test the question order or weights** — the scoring engine is deterministic; nothing currently tracks which weight tweaks improve user satisfaction (the rating data could feed this).

### Operational
- [ ] **No tests** — there's no test suite. At minimum, snapshot tests on `scoreCategory()` per category would catch regressions when tools/weights change.
- [ ] **No linter** — consider adding ESLint + a format pass; the codebase has been hand-curated so far.
- [ ] **Error monitoring** — no Sentry / equivalent. Server endpoints `console.error` on failure but nothing collects them in prod.
- [ ] **`requirements.txt` exists for confusing reasons** — it was explicitly requested for Railway despite being a Node app. The file content explains this. Safe to delete if it stops being useful.

### Tech debt
- [ ] **`useState` doesn't survive hard reloads** — quiz answers and chosen category are in-memory. Refreshing `/results` mid-flow drops you back to defaults. Consider persisting to sessionStorage.
- [ ] **Logo asset** — verify what's in `public/logo.png` is the final mark at the right resolution (rendered up to 200px wide).
- [ ] **No favicon set explicitly** — Nuxt's default applies. A branded favicon should ship with the logo.

## Recently completed (chronological)

1. Initial Nuxt scaffold + adaptive design system
2. Hero with handwritten headline + animated SVG match-card annotation
3. 5-question generic quiz → loading → results with confetti
4. Star-rating widget on results
5. Coding & development built as a separate weighted wizard
6. Generalised the wizard into a schema-driven system covering all 10 categories
7. Star rating + completion tracking wired to Supabase
8. `/contact` form + delivery via SMTP (initially Resend, swapped for nodemailer at user request)
9. Shared `<SiteNav />` component, working tab routing, `/blogs` placeholder
10. Railway deploy config (Procfile, railway.json, lockfile sync)
11. `CLAUDE.md` for project memory
