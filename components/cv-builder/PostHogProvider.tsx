"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

const POSTHOG_KEY = "phc_s95MMDfSOzSCXn3ZNkYH9bYehkKgFAwasbILY57oCYj";
const POSTHOG_HOST = "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      defaults: "2026-01-30",
      person_profiles: "identified_only",
      capture_pageview: false, // We'll do this manually
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

// Analytics helper — call posthog.capture directly for events
export function trackEvent(event: string, props?: Record<string, unknown>) {
  posthog.capture(event, props);
}

export function trackPageView(path: string) {
  posthog.capture("$pageview", { $current_url: path });
}
