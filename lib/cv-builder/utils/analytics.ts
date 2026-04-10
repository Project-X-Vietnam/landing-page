import { track } from "@vercel/analytics";
import type { UIEvent } from "react";
import { capturePostHogEvent } from "./posthog";

const isDev = process.env.NODE_ENV !== "production";

export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
) => {
  capturePostHogEvent(eventName, properties);

  if (isDev) {
    console.log(`[Analytics Event] ${eventName}`, properties);
    return;
  }

  try {
    track(eventName, properties);
  } catch (error) {
    console.warn("Analytics error", error);
  }
};

const scrolledElements = new WeakMap<HTMLElement, Set<number>>();

export const handleScrollDepthTracking = (
  e: UIEvent<HTMLElement>,
  componentName: string,
) => {
  const target = e.currentTarget;
  if (!target) return;

  const { scrollTop, scrollHeight, clientHeight } = target;
  if (scrollHeight <= clientHeight) return;

  const scrollPercent = Math.round(
    (scrollTop / (scrollHeight - clientHeight)) * 100,
  );

  let thresholds = scrolledElements.get(target);
  if (!thresholds) {
    thresholds = new Set([25, 50, 75, 100]);
    scrolledElements.set(target, thresholds);
  }

  const passedThresholds = Array.from(thresholds).filter(
    (threshold) => scrollPercent >= threshold,
  );

  passedThresholds.forEach((threshold) => {
    trackEvent("scroll_depth", { percentage: threshold, component: componentName });
    thresholds!.delete(threshold);
  });
};
