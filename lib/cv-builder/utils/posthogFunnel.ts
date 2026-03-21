import { capturePostHogEvent } from "./posthog";

export const FUNNEL_EVENTS = {
  LANDING_VIEWED: "funnel_landing_viewed",
  START_CLICKED: "funnel_start_clicked",
  ROLE_SELECTED: "funnel_role_selected",
  WORKSPACE_VIEWED: "funnel_workspace_viewed",
  BULLET_GENERATED: "funnel_bullet_generated",
  FINISH_VIEWED: "funnel_finish_viewed",
  RESTART_CLICKED: "funnel_restart_clicked",
} as const;

export function trackFunnelLandingViewed() {
  capturePostHogEvent(FUNNEL_EVENTS.LANDING_VIEWED);
}

export function trackFunnelStartClicked() {
  capturePostHogEvent(FUNNEL_EVENTS.START_CLICKED);
}

export function trackFunnelRoleSelected(role: string) {
  capturePostHogEvent(FUNNEL_EVENTS.ROLE_SELECTED, { role });
}

export function trackFunnelWorkspaceViewed(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.WORKSPACE_VIEWED, { role: role ?? "unknown" });
}

export function trackFunnelBulletGenerated(role: string | null, level: string) {
  capturePostHogEvent(FUNNEL_EVENTS.BULLET_GENERATED, {
    role: role ?? "unknown",
    level,
  });
}

export function trackFunnelFinishViewed(role: string | null, level: string) {
  capturePostHogEvent(FUNNEL_EVENTS.FINISH_VIEWED, {
    role: role ?? "unknown",
    level,
  });
}

export function trackFunnelRestartClicked(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.RESTART_CLICKED, { role: role ?? "unknown" });
}
