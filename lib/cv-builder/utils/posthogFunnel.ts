import { capturePostHogEvent } from "./posthog";

export const FUNNEL_EVENTS = {
  LANDING_VIEWED: "funnel_landing_viewed",
  START_CLICKED: "funnel_start_clicked",
  PILLAR_SELECTED: "funnel_pillar_selected",
  ROLE_SELECTED: "funnel_role_selected",
  WORKSPACE_VIEWED: "funnel_workspace_viewed",
  WORKSPACE_COMPLETED: "funnel_workspace_completed",
  BULLET_GENERATED: "funnel_bullet_generated",
  FINISH_VIEWED: "funnel_finish_viewed",
  RESTART_CLICKED: "funnel_restart_clicked",
  SECTION_CLICKED: "funnel_section_clicked",
  CHECKLIST_TOGGLED: "funnel_checklist_toggled",
  PROGRESS_MILESTONE: "funnel_progress_milestone",
  PROMPT_UNLOCKED: "funnel_prompt_unlocked",
  TOUR_COMPLETED: "funnel_tour_completed",
  WORKSPACE_BACK: "funnel_workspace_back",
  MASTER_PROMPT_COPIED: "funnel_master_prompt_copied",
  BACK_TO_EDIT: "funnel_back_to_edit",
} as const;

export function trackFunnelLandingViewed() {
  capturePostHogEvent(FUNNEL_EVENTS.LANDING_VIEWED);
}

export function trackFunnelStartClicked() {
  capturePostHogEvent(FUNNEL_EVENTS.START_CLICKED);
}

export function trackFunnelPillarSelected(pillar: string) {
  capturePostHogEvent(FUNNEL_EVENTS.PILLAR_SELECTED, { pillar });
}

export function trackFunnelRoleSelected(role: string) {
  capturePostHogEvent(FUNNEL_EVENTS.ROLE_SELECTED, { role });
}

export function trackFunnelWorkspaceViewed(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.WORKSPACE_VIEWED, { role: role ?? "unknown" });
}

export function trackFunnelWorkspaceCompleted(
  role: string | null,
  level: string,
) {
  const props = { role: role ?? "unknown", level };
  capturePostHogEvent(FUNNEL_EVENTS.WORKSPACE_COMPLETED, props);
  // Backward-compatible alias used in earlier dashboards.
  capturePostHogEvent(FUNNEL_EVENTS.BULLET_GENERATED, props);
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

export function trackFunnelSectionClicked(section: string) {
  capturePostHogEvent(FUNNEL_EVENTS.SECTION_CLICKED, { section });
}

export function trackFunnelChecklistToggled(
  section: string,
  itemIndex: number,
  checked: boolean,
) {
  capturePostHogEvent(FUNNEL_EVENTS.CHECKLIST_TOGGLED, {
    section,
    item_index: itemIndex,
    checked,
  });
}

export function trackFunnelProgressMilestone(completedCount: number) {
  capturePostHogEvent(FUNNEL_EVENTS.PROGRESS_MILESTONE, {
    completed_count: completedCount,
  });
}

export function trackFunnelPromptUnlocked(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.PROMPT_UNLOCKED, { role: role ?? "unknown" });
}

export function trackFunnelTourCompleted() {
  capturePostHogEvent(FUNNEL_EVENTS.TOUR_COMPLETED);
}

export function trackFunnelWorkspaceBack() {
  capturePostHogEvent(FUNNEL_EVENTS.WORKSPACE_BACK);
}

export function trackFunnelMasterPromptCopied(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.MASTER_PROMPT_COPIED, {
    role: role ?? "unknown",
  });
}

export function trackFunnelBackToEdit(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.BACK_TO_EDIT, { role: role ?? "unknown" });
}
