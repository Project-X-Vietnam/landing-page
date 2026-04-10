/**
 * GA4 Event Tracking — Case Trainer Funnel
 *
 * Specific tracking wrapper for the Case Trainer feature launch.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
  }
  // Fallback console log for debugging in dev
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics] ${name}`, params);
  }
}

export function trackCaseTrainerHeroClick() {
  sendEvent('click_hero_cta', { cta_position: 'hero' });
}

export function trackCaseTrainerNavClick() {
  sendEvent('click_nav_cta', { cta_position: 'nav' });
}

export function trackCaseTrainerBottomClick() {
  sendEvent('click_bottom_cta', { cta_position: 'bottom' });
}

export function trackCaseTrainerScrollDepth(percent: 25 | 50 | 75 | 100) {
  sendEvent('scroll_depth_setup', { scroll_percent: percent });
}

export function trackCaseTrainerAssetDownload(assetName: 'system_prompt' | 'case_hub') {
  sendEvent('download_asset', { asset_type: assetName });
}

export function trackCaseTrainerCopyPrompt() {
  sendEvent('copy_prompt', { asset_type: 'system_prompt_copied' });
}

export function trackCaseTrainerPlatformSelect(platformId: string) {
  sendEvent('select_ai_platform', { platform: platformId });
}

export function trackCaseTrainerOutboundClick(platformId: string, url: string) {
  sendEvent('outbound_click_ai', { platform: platformId, outbound_url: url });
}
