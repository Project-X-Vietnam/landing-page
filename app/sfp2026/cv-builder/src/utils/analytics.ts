import posthog from "posthog-js";

const isDev = process.env.NODE_ENV !== "production";

// Initialize PostHog
if (typeof window !== "undefined") {
  posthog.init("phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", {
    api_host: "https://us.posthog.com", // Override with your Host URL
    autocapture: false, // We will manually track events
    capture_pageview: true,
  });
}

/**
 * Custom tracking wrapper mapping to PostHog events
 */
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>,
) => {
  if (isDev) {
    console.log(`[Analytics Event] ${eventName}`, properties);
  } else {
    try {
      posthog.capture(eventName, properties);
    } catch (e) {
      console.warn("Analytics error", e);
    }
  }
};

const scrolledElements = new WeakMap<HTMLElement, Set<number>>();

export const handleScrollDepthTracking = (
  e: React.UIEvent<HTMLElement>,
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
    (t) => scrollPercent >= t,
  );
  passedThresholds.forEach((t) => {
    trackEvent("scroll_depth", { percentage: t, component: componentName });
    thresholds!.delete(t);
  });
};
