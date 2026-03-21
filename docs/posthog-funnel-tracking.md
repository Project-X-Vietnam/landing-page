# PostHog Funnel Tracking (CV Toolkit)

Funnel events implemented for `app/sfp2026/cv-builder`.

## Required env vars

Set in Vercel / local env:

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## Funnel events

- `funnel_landing_viewed`
- `funnel_start_clicked`
- `funnel_role_selected` (`role`)
- `funnel_workspace_viewed` (`role`)
- `funnel_bullet_generated` (`role`, `level`)
- `funnel_finish_viewed` (`role`, `level`)
- `funnel_restart_clicked` (`role`)

## Source files

- `lib/cv-builder/utils/posthog.ts`
- `lib/cv-builder/utils/posthogFunnel.ts`
- `lib/cv-builder/utils/analytics.ts`
- `app/sfp2026/cv-builder/page.tsx`
