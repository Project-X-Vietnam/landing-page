"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return;
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
