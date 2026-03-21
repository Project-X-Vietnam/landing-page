# PostHog Funnel Tracking (CV Toolkit)

Funnel events implemented for `app/sfp2026/cv-builder`.

## Required env vars

Set in Vercel / local env:

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

If env vars are missing, the app runs normally — events are silently skipped.

## Macro funnel (screen-to-screen)

Build the primary PostHog Funnel in this order:

| # | Event | Properties | Fired from |
|---|---|---|---|
| 1 | `funnel_landing_viewed` | — | `page.tsx` on mount |
| 2 | `funnel_start_clicked` | — | Welcome screen CTA |
| 3 | `funnel_pillar_selected` | `pillar` | Screen 1 pillar expand |
| 4 | `funnel_role_selected` | `role` | Screen 1 role pill |
| 5 | `funnel_workspace_viewed` | `role` | Screen 3 mount |
| 6 | `funnel_workspace_completed` | `role`, `level` | Screen 3 "Final Step" CTA |
| 7 | `funnel_finish_viewed` | `role`, `level` | Screen 4 mount |
| 8 | `funnel_restart_clicked` | `role` | Screen 4 "Start over" |

> `funnel_bullet_generated` is a deprecated alias for `funnel_workspace_completed`.

## Screen 3 micro-funnel (workspace engagement)

These events capture drop-off *within* the workspace.

| Event | Properties | Trigger |
|---|---|---|
| `funnel_section_clicked` | `section`, `role`, `previous_section` | User clicks a CV section (header, summary, experience, projects, awards, activities) |
| `funnel_checklist_toggled` | `section`, `step_index` (1-3), `progress` (e.g. "4/9"), `role` | User toggles a checklist item |
| `funnel_progress_milestone` | `milestone` (3/6/9), `role`, `sections_completed` | User hits 3/9, 6/9, or 9/9 |
| `funnel_prompt_unlocked` | `role` | All 9/9 checklist items completed |
| `funnel_tour_completed` | `completed_steps` (0-3), `skipped` | User finishes or skips the guided tour |
| `funnel_workspace_back` | `role`, `progress` (e.g. "2/9"), `active_section` | User abandons workspace via Back button |

## Screen 4 actions (finish screen)

| Event | Properties | Trigger |
|---|---|---|
| `funnel_master_prompt_copied` | `role` | User clicks "Copy whole-CV prompt" (primary CTA) |
| `funnel_back_to_edit` | `role` | User clicks "Back to edit" |

## Supplementary events

| Event | Properties | Fired from |
|---|---|---|
| `prompt_copied` | `section`, `role` | Screen 3 copy button |
| `scroll_depth` | `percentage`, `component` | Screen 3 HR panel scroll |
| `screen_timing` | `screen`, `seconds` | `page.tsx` on workspace completion |
| `page_view_source` | `source` | `page.tsx` on mount (if UTM present) |
| `session_end` | `time_on_page_seconds` | `page.tsx` on beforeunload |

## UTM super properties

When UTM params are present in the URL (`utm_source`, `utm_medium`, `utm_campaign`), they are registered as PostHog super properties via `posthog.register()`. This means they automatically attach to **every subsequent event** in the session — no per-event wiring needed.

## PostHog dashboard setup

### Primary funnel

Steps 1–7 from the macro funnel table above.

### Recommended filters

- By role: `role = "AI Product Manager"` (or any role)
- By level: `level = "developing"`
- By acquisition: `utm_source = "linkedin"` (via super properties)

### Recommended breakdowns

- Breakdown by `role` from step 4 onward
- Breakdown by `level` from step 6 onward
- Breakdown by `section` on `funnel_section_clicked`
- Breakdown by `milestone` on `funnel_progress_milestone`

## Naming convention

- All funnel events are prefixed with `funnel_` for easy filtering.
- Properties use short, stable keys: `role`, `level`, `section`, `pillar`.
- If renaming events, update both `lib/cv-builder/utils/posthogFunnel.ts` and any existing PostHog dashboards.

## Source files

- `lib/cv-builder/utils/posthog.ts` — PostHog init + `capturePostHogEvent` + `registerSuperProperties`
- `lib/cv-builder/utils/posthogFunnel.ts` — All funnel event definitions and tracking functions
- `lib/cv-builder/utils/analytics.ts` — `trackEvent` wrapper (PostHog + Vercel Analytics)
- `app/sfp2026/cv-builder/page.tsx` — Orchestrator: macro funnel, UTM, screen timing
- `components/cv-builder/Screen3Workspace.tsx` — Micro-funnel: section, checklist, tour, back
- `components/cv-builder/Screen4Finish.tsx` — PDF download, back to edit
