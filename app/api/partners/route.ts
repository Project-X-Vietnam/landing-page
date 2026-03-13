import { NextRequest, NextResponse } from "next/server";
import { trackServerEvent, getGA4ClientId } from "@/lib/analytics/ga4-server";

const ASSUME_SUCCESS_MS = 12_000;
const HARD_TIMEOUT_MS = 60_000;

export async function POST(request: NextRequest) {
  const googleScriptUrl = process.env.NEXT_GOOGLE_PARTNER_SCRIPT_URL;
  if (!googleScriptUrl) {
    console.error("NEXT_GOOGLE_PARTNER_SCRIPT_URL is not configured");
    return NextResponse.json(
      { success: false, error: "Server misconfiguration. Please contact support." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const payload = JSON.stringify(body);

    const controller = new AbortController();
    const hardTimer = setTimeout(() => controller.abort(), HARD_TIMEOUT_MS);

    const fetchPromise = fetch(googleScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: payload,
      redirect: "follow",
      signal: controller.signal,
    })
      .then((res) => ({ status: res.status, error: false, detail: "" }))
      .catch((err: unknown) => {
        const detail = err instanceof Error ? err.message : String(err);
        console.error("Google Script fetch error:", detail);
        return { status: 0, error: true, detail };
      });

    const timerPromise = new Promise<{ status: number; error: boolean; detail: string }>(
      (resolve) =>
        setTimeout(() => resolve({ status: -1, error: false, detail: "timer" }), ASSUME_SUCCESS_MS),
    );

    const result = await Promise.race([fetchPromise, timerPromise]);
    clearTimeout(hardTimer);

    if (result.status === 200 || result.status === -1) {
      const clientId = getGA4ClientId(request.cookies.get("_ga")?.value);
      trackServerEvent(clientId, "partner_inquiry_submitted", {
        partnership_type: body.partnershipType || "unknown",
        company_name: body.companyName || "unknown",
      });

      return NextResponse.json({ success: true });
    }

    if (result.error) {
      console.error("Partner submission failed — fetch error:", result.detail);
      return NextResponse.json(
        { success: false, error: "Could not reach submission server. Please check your connection and try again." },
        { status: 502 },
      );
    }

    console.error("Unexpected Google Script status:", result.status);
    return NextResponse.json(
      { success: false, error: "Unexpected response from submission server." },
      { status: 502 },
    );
  } catch (error) {
    console.error("Partner submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process your inquiry. Please try again." },
      { status: 500 },
    );
  }
}
