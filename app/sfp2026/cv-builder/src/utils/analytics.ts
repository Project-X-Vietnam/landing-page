/// <reference types="vite/client" />
import { track } from '@vercel/analytics';

const isDev = import.meta.env.DEV;

/**
 * Custom tracking wrapper mapping to Vercel Analytics custom events
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (isDev) {
    console.log(`[Analytics Event] ${eventName}`, properties);
  } else {
    try {
      track(eventName, properties);
    } catch (e) {
      console.warn("Analytics error", e);
    }
  }
};

const scrolledElements = new WeakMap<HTMLElement, Set<number>>();

export const handleScrollDepthTracking = (e: React.UIEvent<HTMLElement>, componentName: string) => {
  const target = e.currentTarget;
  if (!target) return;

  const { scrollTop, scrollHeight, clientHeight } = target;
  if (scrollHeight <= clientHeight) return;

  const scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
  
  let thresholds = scrolledElements.get(target);
  if (!thresholds) {
    thresholds = new Set([25, 50, 75, 100]);
    scrolledElements.set(target, thresholds);
  }

  const passedThresholds = Array.from(thresholds).filter(t => scrollPercent >= t);
  passedThresholds.forEach(t => {
    trackEvent("scroll_depth", { percentage: t, component: componentName });
    thresholds!.delete(t);
  });
};
