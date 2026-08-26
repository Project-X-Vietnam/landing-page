# CLAUDE.md

Alias of [AGENTS.md](./AGENTS.md). Read that file — it is the authoritative guide for this repo.

## 30-second orientation

- **This is the public face of Project X Vietnam.** Everything here is seen by students, mentors, partners and press. Internal team tooling goes in the separate `internal` repo.
- **No database.** Every form write proxies out to a Google Apps Script, n8n, or Lark webhook.
- **The main surface is `/sfp2026`** — the Summer Fellowship Program funnel.

```bash
pnpm dev          # dev server on :3000 (.claude/launch.json uses :3001)
npx tsc --noEmit  # the build ignores type AND lint errors — check manually
```

## Three things that will trip you up

1. `next.config.ts` sets `ignoreBuildErrors` and `ignoreDuringBuilds` — **a broken build ships green.**
2. `/sfp` and `/recruitment2026` are redirected away in `next.config.ts`, so their page files are dead code.
3. `components/cv-builder/ui/` is a *second, divergent* copy of `components/ui/`. Check which set your file imports.

## Key files

- `AGENTS.md` — full architecture, routes, integrations, conventions
- `PJX_UI_STYLE_GUIDE.md` — canonical PJX design system (shared with the internal repo)
- `PROJECT_X_VIETNAM_SYSTEM_PROMPT.md` — org context: mission, programs, personas, brand voice
- `docs/` — feature and technical notes

`.agent/`, `.claude/skills/`, `.agents/skills/` and `.cursor/rules/` hold a generic third-party starter kit with duplicate copies — not PJX policy. `AGENTS.md` wins on any conflict.
