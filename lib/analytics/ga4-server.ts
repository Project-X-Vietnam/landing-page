/**
 * GA4 Measurement Protocol — Server-Side Event Tracking
 *
 * Fires GA4 events from the server, bypassing client-side ad blockers.
 * Used as a complement to client-side gtag for accurate conversion counts.
 *
 * Setup:
 *   1. Go to GA4 Admin > Data Streams > your web stream
 *   2. Click "Measurement Protocol API secrets" > Create
 *   3. Add the secret to your env as GA4_API_SECRET
 */

const GA4_ENDPOINT = "https://www.google-analytics.com/mp/collect";

/**
 * Fire a GA4 event via the Measurement Protocol.
 * Fire-and-forget: never throws, never blocks the caller.
 */
export function trackServerEvent(
  clientId: string,
  eventName: string,
  params?: Record<string, string | number>,
): void {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) return;

  const url = `${GA4_ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      events: [
        {
          name: eventName,
          params: {
            ...params,
            engagement_time_msec: 1,
          },
        },
      ],
    }),
  }).catch((err) => {
    console.warn(
      "[GA4 Server] Failed to send event:",
      err instanceof Error ? err.message : err,
    );
  });
}

/**
 * Extract the GA4 client ID from the `_ga` cookie.
 * Cookie format: GA1.1.XXXXXXXXXX.TIMESTAMP → client ID: XXXXXXXXXX.TIMESTAMP
 * Falls back to a random UUID for users without GA (ad-blocked).
 */
export function getGA4ClientId(gaCookieValue?: string): string {
  if (gaCookieValue) {
    const parts = gaCookieValue.split(".");
    if (parts.length >= 4) {
      return `${parts[2]}.${parts[3]}`;
    }
  }
  return crypto.randomUUID();
}
