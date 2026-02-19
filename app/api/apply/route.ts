import { NextRequest, NextResponse } from "next/server";

// Google Apps Script cold starts are slow (10–80s+), but data is stored
// synchronously on their end. We race the fetch against a generous timer —
// if no response within ASSUME_SUCCESS_MS we still treat it as success.
const ASSUME_SUCCESS_MS = 12_000;
const HARD_TIMEOUT_MS = 60_000;

export async function POST(request: NextRequest) {
  const googleScriptUrl = process.env.NEXT_GOOGLE_SCRIPT_URL;
  if (!googleScriptUrl) {
    console.error("NEXT_GOOGLE_SCRIPT_URL is not configured");
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
        setTimeout(() => resolve({ status: -1, error: false, detail: "timer" }), ASSUME_SUCCESS_MS)
    );

    const result = await Promise.race([fetchPromise, timerPromise]);
    clearTimeout(hardTimer);

    // 200 = direct response / followed redirect successfully
    // -1  = timer won the race — data is already in flight to Google
    if (result.status === 200 || result.status === -1) {
      return NextResponse.json({ success: true });
    }

    if (result.error) {
      console.error("Submission failed — fetch error:", result.detail);
      return NextResponse.json(
        { success: false, error: "Could not reach submission server. Please check your connection and try again." },
        { status: 502 }
      );
    }

    console.error("Unexpected Google Script status:", result.status);
    return NextResponse.json(
      { success: false, error: "Unexpected response from submission server." },
      { status: 502 }
    );
  } catch (error) {
    console.error("Apply submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process your application. Please try again." },
      { status: 500 }
    );
  }
}
