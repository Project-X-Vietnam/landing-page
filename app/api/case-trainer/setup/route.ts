import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const webhookUrl =
    process.env.N8N_CASE_TRAINER_WEBHOOK_URL ??
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ??
    "https://n8n.giangle.site/webhook/9748fde6-e064-4521-9af1-f3da0383bfcf";

  try {
    const body = await request.json();

    if (!body?.name || !body?.email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Webhook responded with ${response.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Case trainer setup webhook failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send setup data." },
      { status: 500 }
    );
  }
}
