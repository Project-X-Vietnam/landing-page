# AGENTS.md — landing-page

## What this is

The **public face of Project X Vietnam (PJX)** — a Vietnamese non-profit building a tech talent pipeline for students. Everything here is seen by people outside the organization: prospective fellows, mentors, corporate partners, press.

Its job is to **communicate and convert**: explain what PJX is, showcase programs, mentors, partners and team, and move applicants through the Summer Fellowship Program (SFP) funnel.

Deployed on Vercel at `projectxvietnam.org`. No database — every write goes out to an external webhook.

The internal team platform is a **separate repo**, `Project-X-Vietnam/internal`. If a feature is only for PJX members, it does not belong here.

## Commands

```bash
pnpm dev      # dev server on :3000 (.claude/launch.json runs it on :3001)
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # ESLint
```

`npm` works too; the repo has both `package-lock.json` and `pnpm-lock.yaml`.

> **`pnpm build` does not catch type or lint errors.** `next.config.ts` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` to `true`, so a broken build ships green. There is no `typecheck` script. Before you call work done, run type checking yourself:
>
> ```bash
> npx tsc --noEmit
> ```

## Stack

| Technology | Version | Notes |
|---|---|---|
| Next.js | 15.x | App Router |
| React | 19.x | |
| TypeScript | 5.x | strict, but **not enforced at build** — see above |
| Tailwind CSS | 3.4.x | config in `tailwind.config.ts` |
| Framer Motion / `motion` | 12.x | both installed; `motion` is the newer package |
| Radix UI + CVA | — | shadcn/ui pattern, 49 primitives in `components/ui/` |
| `react-hook-form` | 7.x | application forms |
| Sonner | 1.7.x | toasts, mounted in `app/layout.tsx` |
| Lucide React | 0.473.x | icons |
| GA4 + PostHog + Vercel Analytics | — | three analytics systems, different scopes |

`@google/generative-ai` is in `package.json` but **imported nowhere** — dead dependency, don't build on it without asking.

## Route map

| Route | File | Lines | Purpose |
|---|---|---|---|
| `/` | `app/page.tsx` | 1105 | Home — org pitch, programs, mentors, stats |
| `/about` | `app/about/page.tsx` | 567 | Mission, history, values |
| `/mentors` | `app/mentors/page.tsx` | 544 | Mentor showcase |
| `/partners` | `app/partners/page.tsx` | 726 | Partner companies + partner enquiry form |
| `/team` | `app/team/page.tsx` | 581 | Organizing team, filterable by cohort |
| `/sfp2026` | `app/sfp2026/page.tsx` | 1719 | **Main program page** — SFP 2026, timeline, countdown |
| `/sfp2026/apply` | `app/sfp2026/apply/page.tsx` | 1130 | Round 1 application |
| `/sfp2026/apply/round-2` | `app/sfp2026/apply/round-2/page.tsx` | 457 | Round 2 application |
| `/sfp2026/cv-builder` | `app/sfp2026/cv-builder/page.tsx` | 195 | CV & Portfolio Survival Kit — multi-screen tool |
| `/sfp2026/case-trainer` | `app/sfp2026/case-trainer/page.tsx` | 202 | Case interview trainer, n8n-backed |

**Two routes are unreachable in production.** `next.config.ts` redirects `/sfp` → `/sfp2026` and `/recruitment2026` → an external Google Form. So `app/sfp/page.tsx` (1127 lines) and `app/recruitment2026/page.tsx` (783 lines) are dead code that still compiles. Don't spend effort on them, and don't cite them as patterns — but check `next.config.ts` before assuming, since redirects get toggled around campaign deadlines.

### API routes

| Route | Backend | Env var |
|---|---|---|
| `app/api/apply/` | Google Apps Script | `NEXT_GOOGLE_SCRIPT_URL` |
| `app/api/apply/round-2/` | Google Apps Script | `NEXT_GOOGLE_SCRIPT_URL_R2` |
| `app/api/partners/` | Google Apps Script | `NEXT_GOOGLE_PARTNER_SCRIPT_URL` |
| `app/api/case-trainer/setup/` | n8n webhook | `N8N_CASE_TRAINER_WEBHOOK_URL` |
| `app/api/lark/{submit,upload,token}/` | Lark (Feishu) API | `LARK_APP_ID`, `LARK_APP_SECRET` |

Applications land in **Google Sheets via Apps Script**, not in a database. The Lark routes are the older path, still wired to `lib/form-submission.ts` and `app/utils/lark.ts` but only reached from the redirected `/recruitment2026`. Prefer the Apps Script pattern for new forms.

## Directory structure

```
app/                      Routes (see map above)
├── layout.tsx            Metadata, Inter Tight font, GA, Sonner Toaster
├── globals.css           CSS vars, @font-face, keyframe animations
├── api/                  Route handlers — all proxy to external webhooks
└── utils/lark.ts         Lark helpers (legacy path)

components/
├── ui/                   49 shadcn primitives  ← use these
├── cv-builder/           CV Builder feature
│   ├── Screen1..4*.tsx   Step screens
│   ├── imports/          Figma-exported code, do not hand-edit
│   └── ui/               ⚠ 48-file duplicate primitive set, see below
├── SiteNav.tsx           Nav for /about /mentors /team /partners
├── Navbar.tsx            Nav for /sfp /sfp2026
├── SiteFooter.tsx        Shared footer
└── Reveal, PageTransition, AnimatedCounter, CursorGlow, Eyebrow …

lib/
├── utils.ts              cn() — clsx + tailwind-merge
├── analytics/            ga4-server, sfp2026, case-trainer event helpers
├── cv-builder/           Role data, CV templates, prompts, PostHog funnels
├── form-submission.ts    Legacy Lark submission
└── lark/auth.ts          Lark tenant token

scripts/cv-builder/       One-off generators (Node + Python), not part of build
docs/                     Feature and technical notes
```

### Two things that will trip you up

1. **`components/cv-builder/ui/` is a second copy of `components/ui/`** — 48 files against 49, same names, *different contents*. The CV Builder was imported from a separate Figma-based project. Fix a bug in one and the other keeps it. When editing, confirm which set the file you're touching actually imports.
2. **`Form.tsx`, `Hero.tsx`, and `Header.tsx` have zero importers.** Earlier versions of this file listed them as key components; they are leftovers. Use `SiteNav`/`Navbar` and the per-route form implementations instead.

## Component conventions

Reach for components in this order:

1. `components/ui/` primitives — Button, Card, Input, Dialog, Select, …
2. Shared components in `components/` — `SiteNav`, `SiteFooter`, `Reveal`
3. Native HTML — only when nothing above fits

```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SiteNav from "@/components/SiteNav";
```

- Tailwind utilities only; no inline styles.
- Conditional classes go through `cn()`.
- Brand colors via CSS variables: `hsl(var(--pxv-blue))`, or the `pxv-*` Tailwind scale.
- Framer Motion for scroll/viewport animation; Tailwind keyframes (`animate-fade-in-up`, `animate-float`, `animate-gradient-x`) for simple effects.
- Page files are long by convention — 500–1700 lines with inline section components. Match that, or extract deliberately; don't half-refactor a page you're only touching for one fix.

## Design system

Canonical reference: [`PJX_UI_STYLE_GUIDE.md`](PJX_UI_STYLE_GUIDE.md) (1063 lines). SFP-specific overrides: [`SFP2026_UI_STYLE_GUIDE.md`](SFP2026_UI_STYLE_GUIDE.md). The internal repo carries the same style guide as `DESIGN_SYSTEM.md` — **keep them in sync when brand tokens change**.

### Brand colors

| Token | Hex | Usage |
|---|---|---|
| `pxv-blue` / `primary` | `#0E56FA` | Brand blue, CTAs, links |
| `pxv-cyan` / `secondary` | `#17CAFA` | Accent, gradients |
| `pxv-dark` | `#01001F` | Deep navy backgrounds |
| `pxv-light` | — | Light backgrounds |

Semantic tokens (`background`, `card`, `muted`, `border`, `ring`, `chart-1..5`) are defined as HSL CSS variables in `app/globals.css` and mapped in `tailwind.config.ts`.

### Typography

- **Body:** SF Pro Display, self-hosted via `@font-face` from `public/fonts/`
- **Headings:** Plus Jakarta Sans, self-hosted from `public/fonts/PlusJakartaSans/`
- **Fallback:** Inter Tight, loaded through `next/font/google` as `--font-inter-tight` with the `vietnamese` subset — this is what actually renders for most non-Apple users, so check your work on non-Apple hardware
- Weights 300–800

## Analytics

Three systems, deliberately scoped:

- **GA4** (`@next/third-parties/google`) — site-wide, mounted in `app/layout.tsx`. Server-side events via `lib/analytics/ga4-server.ts` and `GA4_API_SECRET`.
- **PostHog** — CV Builder only. Funnel logic in `lib/cv-builder/utils/posthogFunnel.ts`; see `docs/posthog-funnel-tracking.md`.
- **Vercel Analytics** — installed via `@vercel/analytics`.

`next.config.ts` maps `VITE_POSTHOG_*` → `NEXT_PUBLIC_POSTHOG_*` for backward compatibility with an older Vite project.

## Environment variables

| Variable | Purpose | In `.env.example` |
|---|---|---|
| `NEXT_GOOGLE_SCRIPT_URL` | Round 1 applications → Sheets | ✅ |
| `NEXT_GOOGLE_SCRIPT_URL_R2` | Round 2 applications → Sheets | ✅ |
| `NEXT_GOOGLE_PARTNER_SCRIPT_URL` | Partner enquiries → Sheets | ✅ |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 client | ✅ |
| `GA4_API_SECRET` | GA4 Measurement Protocol | ✅ |
| `NEXT_PUBLIC_POSTHOG_KEY` / `_HOST` | PostHog | ✅ |
| `N8N_CASE_TRAINER_WEBHOOK_URL` | Case Trainer backend | ❌ **missing** |
| `LARK_APP_ID` / `LARK_APP_SECRET` | Lark API | ❌ **missing** |

`.env.local` is gitignored and holds real values. If you add a variable, add it to `.env.example` in the same change.

## Reference examples

| Pattern | File |
|---|---|
| Long marketing page with inline sections | `app/sfp2026/page.tsx` |
| Multi-step form + validation + success screen | `app/sfp2026/apply/page.tsx` |
| Filterable directory with cohort tabs | `app/team/page.tsx` |
| API route proxying to Apps Script | `app/api/apply/route.ts` |
| shadcn Button with CVA variants | `components/ui/button.tsx` |
| Scroll-triggered reveal | `components/Reveal.tsx` |
| Glassmorphism surface | `components/ui/glass-card.tsx` |

## Guardrails

- **Everything here is public.** Program dates, deadlines, cohort sizes, mentor names, partner logos and company names are real external commitments. Never invent, estimate, or "round" them — copy from source or ask. A wrong deadline on this site is a real-world problem.
- **Deadlines change often.** Countdown targets and timeline dates are edited under time pressure near campaign dates (see the `feat/extend-*` branches). Treat them as data, not as code to refactor.
- Don't remove or rename analytics event names — funnels depend on the exact strings.
- Don't hand-edit `components/cv-builder/imports/` — it is Figma-generated.
- Don't touch `next.config.ts` redirects without confirming; they gate live campaign traffic.

## Other agent files in this repo

`CLAUDE.md` is an alias of this file. `.agent/`, `.claude/skills/`, `.agents/skills/` and `.cursor/rules/` contain a generic third-party starter kit with overlapping duplicate copies — **not PJX policy**. Where they conflict with this file, this file wins.
