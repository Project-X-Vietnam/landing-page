import { NextRequest, NextResponse } from "next/server";
import { trackServerEvent, getGA4ClientId } from "@/lib/analytics/ga4-server";

const ASSUME_SUCCESS_MS = 12_000;
const HARD_TIMEOUT_MS = 60_000;

export async function POST(request: NextRequest) {
  const googleScriptUrl = process.env.NEXT_GOOGLE_SCRIPT_URL_R2;
  if (!googleScriptUrl) {
    console.error("NEXT_GOOGLE_SCRIPT_URL_R2 is not configured");
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
      .then(async (res) => {
        const text = await res.text();
        let parsed: unknown = null;
        try {
          parsed = text ? JSON.parse(text) : null;
        } catch {
          /* ignore */
        }
        return {
          status: res.status,
          error: false,
          detail: "",
          responseText: text.slice(0, 500),
          parsed,
        };
      })
      .catch((fetchErr: unknown) => {
        const detail = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
        console.error("Google Script fetch error:", detail);
        return { status: 0, error: true, detail };
      });

    const timerPromise = new Promise<{ status: number; error: boolean; detail: string }>(
      (resolve) =>
        setTimeout(() => resolve({ status: -1, error: false, detail: "timer" }), ASSUME_SUCCESS_MS)
    );

    const result = await Promise.race([fetchPromise, timerPromise]);
    clearTimeout(hardTimer);

    if (result.status === 200 || result.status === -1) {
      const clientId = getGA4ClientId(request.cookies.get("_ga")?.value);
      trackServerEvent(clientId, "application_submitted_server", {
        form_phase: "round-2",
        application_cycle: "SFP2026_R2",
      });

      return NextResponse.json({ success: true });
    }

    if (result.error) {
      console.error("Submission failed — fetch error:", result.detail);
      return NextResponse.json(
        { success: false, error: "Could not reach submission server. Please check your connection and try again." },
        { status: 502 }
      );
    }

    const responseText = "responseText" in result ? result.responseText : "";
    const parsed = "parsed" in result ? result.parsed : null;
    const scriptError =
      parsed && typeof parsed === "object" && "error" in parsed
        ? String((parsed as { error?: unknown }).error)
        : null;

    console.error("Unexpected Google Script status:", result.status, {
      responsePreview: responseText,
      scriptError,
    });

    const userMessage = scriptError
      ? `Submission failed: ${scriptError}`
      : "Unexpected response from submission server. Please try again or contact support.";

    return NextResponse.json(
      { success: false, error: userMessage },
      { status: 502 }
    );
  } catch (error) {
    console.error("Apply Round 2 submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process your application. Please try again." },
      { status: 500 }
    );
  }
}
