import { capturePostHogEvent } from "./posthog";

export const FUNNEL_EVENTS = {
  LANDING_VIEWED: "funnel_landing_viewed",
  START_CLICKED: "funnel_start_clicked",
  PILLAR_SELECTED: "funnel_pillar_selected",
  ROLE_SELECTED: "funnel_role_selected",
  WORKSPACE_VIEWED: "funnel_workspace_viewed",
  WORKSPACE_COMPLETED: "funnel_workspace_completed",
  /** @deprecated kept for backward compat — use WORKSPACE_COMPLETED */
  BULLET_GENERATED: "funnel_workspace_completed",
  FINISH_VIEWED: "funnel_finish_viewed",
  RESTART_CLICKED: "funnel_restart_clicked",

  // Screen 3 — workspace micro-funnel
  SECTION_CLICKED: "funnel_section_clicked",
  CHECKLIST_TOGGLED: "funnel_checklist_toggled",
  PROGRESS_MILESTONE: "funnel_progress_milestone",
  PROMPT_UNLOCKED: "funnel_prompt_unlocked",
  TOUR_COMPLETED: "funnel_tour_completed",
  WORKSPACE_BACK: "funnel_workspace_back",

  // Screen 4 — finish actions
  PDF_DOWNLOADED: "funnel_pdf_downloaded",
  BACK_TO_EDIT: "funnel_back_to_edit",
} as const;

// ── Screen 0 ──────────────────────────────────────────────────────

export function trackFunnelLandingViewed() {
  capturePostHogEvent(FUNNEL_EVENTS.LANDING_VIEWED);
}

export function trackFunnelStartClicked() {
  capturePostHogEvent(FUNNEL_EVENTS.START_CLICKED);
}

// ── Screen 1 ──────────────────────────────────────────────────────

export function trackFunnelPillarSelected(pillar: string) {
  capturePostHogEvent(FUNNEL_EVENTS.PILLAR_SELECTED, { pillar });
}

export function trackFunnelRoleSelected(role: string) {
  capturePostHogEvent(FUNNEL_EVENTS.ROLE_SELECTED, { role });
}

// ── Screen 3 — macro ─────────────────────────────────────────────

export function trackFunnelWorkspaceViewed(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.WORKSPACE_VIEWED, { role: role ?? "unknown" });
}

export function trackFunnelWorkspaceCompleted(role: string | null, level: string) {
  capturePostHogEvent(FUNNEL_EVENTS.WORKSPACE_COMPLETED, {
    role: role ?? "unknown",
    level,
  });
}

/** @deprecated Use trackFunnelWorkspaceCompleted */
export const trackFunnelBulletGenerated = trackFunnelWorkspaceCompleted;

// ── Screen 3 — micro-funnel ──────────────────────────────────────

export function trackFunnelSectionClicked(
  section: string,
  role: string | null,
  previousSection?: string,
) {
  capturePostHogEvent(FUNNEL_EVENTS.SECTION_CLICKED, {
    section,
    role: role ?? "unknown",
    ...(previousSection && { previous_section: previousSection }),
  });
}

export function trackFunnelChecklistToggled(
  section: string,
  stepIndex: number,
  progress: string,
  role: string | null,
) {
  capturePostHogEvent(FUNNEL_EVENTS.CHECKLIST_TOGGLED, {
    section,
    step_index: stepIndex,
    progress,
    role: role ?? "unknown",
  });
}

export function trackFunnelProgressMilestone(
  milestone: number,
  role: string | null,
  sectionsCompleted: string[],
) {
  capturePostHogEvent(FUNNEL_EVENTS.PROGRESS_MILESTONE, {
    milestone,
    role: role ?? "unknown",
    sections_completed: sectionsCompleted,
  });
}

export function trackFunnelPromptUnlocked(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.PROMPT_UNLOCKED, {
    role: role ?? "unknown",
  });
}

export function trackFunnelTourCompleted(completedSteps: number, skipped: boolean) {
  capturePostHogEvent(FUNNEL_EVENTS.TOUR_COMPLETED, {
    completed_steps: completedSteps,
    skipped,
  });
}

export function trackFunnelWorkspaceBack(
  role: string | null,
  progress: string,
  activeSection: string,
) {
  capturePostHogEvent(FUNNEL_EVENTS.WORKSPACE_BACK, {
    role: role ?? "unknown",
    progress,
    active_section: activeSection,
  });
}

// ── Screen 4 ──────────────────────────────────────────────────────

export function trackFunnelFinishViewed(role: string | null, level: string) {
  capturePostHogEvent(FUNNEL_EVENTS.FINISH_VIEWED, {
    role: role ?? "unknown",
    level,
  });
}

export function trackFunnelPdfDownloaded(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.PDF_DOWNLOADED, {
    role: role ?? "unknown",
  });
}

export function trackFunnelBackToEdit(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.BACK_TO_EDIT, {
    role: role ?? "unknown",
  });
}

export function trackFunnelRestartClicked(role: string | null) {
  capturePostHogEvent(FUNNEL_EVENTS.RESTART_CLICKED, { role: role ?? "unknown" });
}
