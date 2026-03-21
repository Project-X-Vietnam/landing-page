/**
 * GA4 Event Tracking — SFP 2026
 *
 * Single source of truth for all SFP 2026 analytics events.
 * Uses window.gtag injected by @next/third-parties/google.
 *
 * Principle: only send custom parameters that GA4 cannot infer.
 * Auto-collected params (UTMs, device, country, page_path) are omitted.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type CtaPosition = "hero" | "bottom_cta" | "navbar" | "testimonials";
export type FormPhase = "early-bird" | "official";
export type ScrollPercent = 25 | 50 | 75;

export const STEP_NAMES = [
  "personal_info",
  "profile_interests",
  "readiness",
  "goals_submit",
] as const;

export type StepName = (typeof STEP_NAMES)[number];

export type SectionName =
  | "hero"
  | "impact"
  | "about_pjx"
  | "about_sfp"
  | "partners"
  | "roles"
  | "journey"
  | "testimonials"
  | "faq"
  | "final_cta";

export type InterestTrack = "engineering" | "product" | "business" | "mixed";

interface SfpUserProperties {
  sfp_form_phase: FormPhase;
  sfp_interest_track: InterestTrack;
  sfp_application_status: "started" | "submitted";
}

// ─────────────────────────────────────────────────────────────
// Core helper
// ─────────────────────────────────────────────────────────────

function sendEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}

// ─────────────────────────────────────────────────────────────
// Priority 1 — Core Funnel Events
// ─────────────────────────────────────────────────────────────

export function trackClickApplyCta(ctaPosition: CtaPosition, pageSection?: string) {
  sendEvent("click_apply_cta", {
    cta_position: ctaPosition,
    ...(pageSection && { page_section: pageSection }),
  });
  // Flag for application_page_view entry_type detection.
  // document.referrer doesn't update during Next.js SPA navigation,
  // so we use sessionStorage as the reliable cross-route signal.
  try { sessionStorage.setItem("sfp_cta_clicked", "1"); } catch { /* private browsing */ }
}

export function trackApplicationFormStart(formPhase: FormPhase) {
  sendEvent("application_form_start", {
    form_phase: formPhase,
  });
}

export function trackFormStepComplete(
  stepNumber: number,
  stepName: StepName,
  formPhase: FormPhase,
) {
  sendEvent("form_step_complete", {
    step_number: stepNumber,
    step_name: stepName,
    form_phase: formPhase,
  });
}

export function trackFormValidationError(
  stepNumber: number,
  stepName: StepName,
  errorCount: number,
  firstErrorField: string,
) {
  sendEvent("form_validation_error", {
    step_number: stepNumber,
    step_name: stepName,
    error_count: errorCount,
    first_error_field: firstErrorField,
  });
}

export function trackApplicationSubmitted(
  formPhase: FormPhase,
  completionTimeSeconds: number,
) {
  sendEvent("application_submitted", {
    form_phase: formPhase,
    application_cycle: "SFP2026",
    completion_time_seconds: Math.round(completionTimeSeconds),
  });
}

/**
 * Fires once on /sfp2026/apply mount. Distinguishes users who came through
 * a tracked CTA (normal funnel) vs. direct entry (bookmark, shared link,
 * campaign URL pointing straight to the form).
 *
 * Uses a sessionStorage flag set by trackClickApplyCta() because
 * document.referrer does NOT update during Next.js SPA navigations.
 */
export function trackApplicationPageView(formPhase: FormPhase) {
  let fromCta = false;
  try {
    fromCta = sessionStorage.getItem("sfp_cta_clicked") === "1";
    sessionStorage.removeItem("sfp_cta_clicked");
  } catch { /* private browsing / SSR */ }
  sendEvent("application_page_view", {
    form_phase: formPhase,
    entry_type: fromCta ? "from_landing" : "direct",
  });
}

// ─────────────────────────────────────────────────────────────
// Priority 2 — Engagement & Optimization Events
// ─────────────────────────────────────────────────────────────

export function trackScrollDepth(scrollPercent: ScrollPercent) {
  sendEvent("scroll_depth", {
    scroll_percent: scrollPercent,
  });
}

export function trackSectionView(sectionName: SectionName) {
  sendEvent("section_view", {
    section_name: sectionName,
  });
}

export function trackFaqExpand(faqQuestion: string, faqIndex: number) {
  sendEvent("faq_expand", {
    faq_question: faqQuestion.slice(0, 100),
    faq_index: faqIndex,
  });
}

export function trackFormSessionRestored(stepRestored: number, formPhase: FormPhase) {
  sendEvent("form_session_restored", {
    step_restored: stepRestored,
    form_phase: formPhase,
  });
}

export type FormExitElement = "back_link" | "logo";

/** User leaves the form page before submitting. */
export function trackFormExit(
  exitElement: FormExitElement,
  stepAtExit: number,
  formPhase: FormPhase,
) {
  sendEvent("form_exit", {
    exit_element: exitElement,
    step_at_exit: stepAtExit,
    form_phase: formPhase,
  });
}

export type SuccessActionType = "follow_facebook" | "back_to_landing";

/** Post-conversion engagement on the success screen. */
export function trackSuccessAction(action: SuccessActionType) {
  sendEvent("success_action", {
    action,
    application_cycle: "SFP2026",
  });
}

/** User intentionally cleared all form data via the reset button. */
export function trackFormReset(stepAtReset: number, formPhase: FormPhase) {
  sendEvent("form_reset", {
    step_at_reset: stepAtReset,
    form_phase: formPhase,
  });
}

// ─────────────────────────────────────────────────────────────
// User Properties
// ─────────────────────────────────────────────────────────────

export function setSfpUserProperties(props: Partial<SfpUserProperties>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", "user_properties", props);
  }
}

// ─────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────

/**
 * Derive the interest track from selected areas of interest.
 * Engineering Track keywords, Product Track keywords, else Business.
 */
export function deriveInterestTrack(interests: string[]): InterestTrack {
  const eng = interests.some(
    (i) =>
      i.includes("Software") ||
      i.includes("AI") ||
      i.includes("Data Engineering") ||
      i.includes("Cloud") ||
      i.includes("Machine Learning"),
  );
  const product = interests.some(
    (i) =>
      i.includes("Product") ||
      i.includes("UI/UX") ||
      i.includes("Business Analytics"),
  );
  const biz = interests.some(
    (i) =>
      i.includes("Project Management") ||
      i.includes("Business Development") ||
      i.includes("Digital Marketing") ||
      i.includes("Operations"),
  );

  const tracks = [eng, product, biz].filter(Boolean).length;
  if (tracks >= 2) return "mixed";
  if (eng) return "engineering";
  if (product) return "product";
  if (biz) return "business";
  return "mixed";
}
