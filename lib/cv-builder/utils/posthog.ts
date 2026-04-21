import posthog from "posthog-js";

let initialized = false;

function getPostHogConfig() {
  const key = (process.env.NEXT_PUBLIC_POSTHOG_KEY || "").trim();
  const host = (
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"
  ).trim();
  return { key, host };
}

export function initPostHog() {
  if (initialized) return true;
  // Avoid calling posthog-js on the server; capture helpers should no-op in SSR.
  if (typeof window === "undefined") return false;

  const { key, host } = getPostHogConfig();
  if (!key) return false;

  posthog.init(key, {
    api_host: host,
    capture_pageview: true,
    capture_pageleave: true,
  });

  initialized = true;
  return true;
}

export function capturePostHogEvent(
  event: string,
  properties?: Record<string, any>,
) {
  if (!initialized && !initPostHog()) return;
  posthog.capture(event, properties);
}

export function registerSuperProperties(properties: Record<string, string>) {
  if (!initialized && !initPostHog()) return;
  posthog.register(properties);
}
