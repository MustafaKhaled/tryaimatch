# tryaimatch

Nuxt 3 app that matches users to the right AI tool through a short weighted quiz. Deployed to Railway.

## Commands

```bash
npm install              # install deps (also runs nuxt prepare)
npm run dev              # local dev server (http://localhost:3000)
npm run build            # production build → .output/
npm run start            # run production build (what Railway uses)
npm run generate         # static export (not used in deploy)
npx nuxt prepare         # regenerate .nuxt/ types if IDE auto-imports go red
```

No test suite, no linter configured.

## Architecture

**Quiz flow**: `/` → `/quiz` (category picker + N category-specific questions) → `/loading` (animated, ~3s) → `/results` (top-3 cards + star rating + confetti).

State between pages uses `useState` keys (not pinia/route params):
- `chosenCategory` — picked category id
- `categoryAnswers` — `{ questionId → optionId }` map for the current run
- `completionTracked` — guards against double-firing analytics

**One scoring engine, many categories.** Every category is a single object conforming to `Category` in [data/schema.ts](data/schema.ts):

```ts
{ id, label, icon, questions: CategoryQuestion[], tools: Tool[] }
```

Each question's options carry `effects[]`, and the engine in [data/scoring.ts](data/scoring.ts) walks them generically. Four effect kinds:

- `numeric` — `tool[field]` (0–10) × weight
- `boolean` — flat points if `tool[field]` is true
- `hardFilter` — penalty if `tool[field]` ≠ expected (capabilities the tool lacks)
- `priceFilter` — penalty if `tool.price > max` and `!tool.hasFree`

`maxScore` is auto-derived per category (sum of each question's best-possible contribution), so you never hand-tune totals. `scoreCategory()` returns sorted tools with `matchPercentage`, deduped `whyItWon` (top 3 strengths), and `whyItLost` (hard-filter penalties).

To add a new category: create `data/categories/<id>.ts`, register in [data/categories/index.ts](data/categories/index.ts), and add the option to the picker in [pages/quiz.vue](pages/quiz.vue). Everything else — quiz UI, loading screen, results, analytics — works without further changes.

To add a tool: append to the relevant category file. All fields referenced by that category's question effects must be set on every tool (otherwise the engine treats missing numeric fields as 0).

## Server endpoints

`/server/api/*` handlers all degrade gracefully — if env vars aren't set they `console.log` and return `{ persisted: false }` so dev works with no setup.

- `POST /api/quiz-completions` — logs category id, full answers, top-3 tools, duration. Fires once on `/results` mount.
- `POST /api/ratings` — 1–5 stars required, comment optional. Wired to the rating widget on `/results`.
- `POST /api/contact` — listing submissions from `/contact`. Does two things in parallel: inserts to Supabase **and** sends email via SMTP (nodemailer 8.x). Each failure is independent.

Shared Supabase client at [server/utils/supabase.ts](server/utils/supabase.ts) — lazy singleton, reads from `useRuntimeConfig()`. Schema to run once in Supabase SQL editor: [supabase/schema.sql](supabase/schema.sql).

## Environment variables

All optional in dev — required only for persistence/email in production.

| Var | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | service_role key — server-side only, never expose |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Domain mailbox SMTP for contact emails |
| `SMTP_SECURE` | `true` for port 465, `false` for 587 (default) |
| `CONTACT_TO_EMAIL` | default `hello@tryaimatch.com` |
| `CONTACT_FROM_EMAIL` | default `tryaimatch <hello@tryaimatch.com>` |

## Deployment (Railway)

[railway.json](railway.json) uses Nixpacks. Build: `npm install && npm run build`. Start: `npm run start` (runs `.output/server/index.mjs`).

**Lockfile must stay in sync** — Railway uses `npm ci`. If `package.json` changed and `npm ci` fails locally, run `npm install` and commit `package-lock.json`.

Node ≥20 is enforced in `package.json` `engines`.

[requirements.txt](requirements.txt) exists only because it was asked for — this is a Node app, the file just points to the real config.

## Conventions

- **Design tokens** in [assets/css/main.css](assets/css/main.css) — adaptive light/dark via `prefers-color-scheme`. Use the CSS vars (`--primary`, `--surface`, `--text-muted`, etc.) rather than hex codes when adding components.
- **Fonts**: IBM Plex Sans everywhere except the big hero headlines and handwritten accents, which use Caveat (`var(--font-hand)`).
- **Icons**: Tabler icons via CDN webfont — `<i class="ti ti-name">`.
- **Shared nav**: [components/SiteNav.vue](components/SiteNav.vue) on public pages (home, blogs, contact). The quiz/loading/results pages have their own slim Exit-only header on purpose — they're a guided flow and shouldn't expose navigation.
- **Logo**: `/public/logo.png` is the brand mark, rendered at 36px height in `SiteNav`.

## Things that aren't what they look like

- The `code` (Coding & development) category uses the same generic schema as every other category — there's no separate scoring path or wizard page anymore.
- `data/scoring.ts` has no per-category special-cases. If a category needs new behaviour, add a new effect kind to the schema instead of branching here.
- `useState` keys are shared across the quiz/loading/results pages and reset when the user picks a new category on `/quiz`. Don't rely on them surviving a hard reload.
