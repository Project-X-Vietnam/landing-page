import { NextRequest, NextResponse } from "next/server";
import { getScenarioById } from "@/app/sfp2026/case-trainer/lib/scenarios";
import { RubricScores } from "@/app/sfp2026/case-trainer/lib/types";

const STEP_LABELS = ["Define", "Decompose", "Hypothesize", "Analyze", "Recommend"];

function buildSystemPrompt(scenarioTitle: string, scenarioContext: string): string {
  return `You are an expert case interview coach evaluating a candidate's response for a tech industry case interview.

SCENARIO: ${scenarioTitle}
CONTEXT: ${scenarioContext}

Your role is to provide structured, constructive feedback that helps the candidate improve their structured thinking and communication skills. You evaluate responses on 5 dimensions per the PJX Case Trainer rubric.

SCORING SCALE: 0–100 per dimension
- 0–39: Needs Significant Work
- 40–59: Developing
- 60–74: Adequate  
- 75–89: Proficient
- 90–100: Exceptional

EVALUATION DIMENSIONS:
1. Problem Framing (25% weight): Did the candidate define scope, user, and constraints clearly?
2. Structure (25% weight): Is reasoning organized into logical, non-overlapping, collectively exhaustive components?
3. Logic & Evidence (20% weight): Are conclusions supported with reasoning or data?
4. Insight (15% weight): Does the candidate identify non-obvious implications or second-order effects?
5. Communication Clarity (15% weight): Is the explanation coherent, concise, and easy to follow?

RULES:
- Be honest but constructive. Never inflate scores.
- Give specific, actionable feedback — not generic praise.
- The coaching note should give ONE concrete thing to improve next time.
- Return ONLY valid JSON, no markdown fences.`;
}

function buildEvaluationPrompt(stepLabel: string, stepPrompt: string, userResponse: string): string {
  return `PRACTICE STEP: ${stepLabel}
STEP OBJECTIVE: ${stepPrompt}

CANDIDATE RESPONSE:
"${userResponse}"

Evaluate this response and return ONLY this exact JSON structure (no markdown, no explanation outside JSON):
{
  "framing": { "score": <0-100>, "label": "<tier>", "feedback": "<1-2 sentences of specific feedback>" },
  "structure": { "score": <0-100>, "label": "<tier>", "feedback": "<1-2 sentences of specific feedback>" },
  "logic": { "score": <0-100>, "label": "<tier>", "feedback": "<1-2 sentences of specific feedback>" },
  "insight": { "score": <0-100>, "label": "<tier>", "feedback": "<1-2 sentences of specific feedback>" },
  "communication": { "score": <0-100>, "label": "<tier>", "feedback": "<1-2 sentences of specific feedback>" },
  "overallScore": <0-100>,
  "coachingNote": "<One specific, actionable improvement tip for this step>"
}`;
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Exceptional";
  if (score >= 75) return "Proficient";
  if (score >= 60) return "Adequate";
  if (score >= 40) return "Developing";
  return "Needs Work";
}

// Fallback mock feedback if no API key
function mockFeedback(stepId: number): RubricScores {
  const base = 55 + stepId * 3;
  return {
    framing: { score: base + 5, label: scoreLabel(base + 5), feedback: "You identified the user and goal, but constraints and success metrics were underspecified." },
    structure: { score: base, label: scoreLabel(base), feedback: "The breakdown shows some structure but parts overlap — aim for MECE components." },
    logic: { score: base - 5, label: scoreLabel(base - 5), feedback: "Assertions were made without explicit reasoning. Back each claim with a 'because' or 'given that'." },
    insight: { score: base - 10, label: scoreLabel(base - 10), feedback: "The response stays at surface level. Try to surface one non-obvious implication." },
    communication: { score: base + 8, label: scoreLabel(base + 8), feedback: "Generally clear, but would benefit from a stronger opening statement that signals your structure upfront." },
    overallScore: Math.round(base + 0.6),
    coachingNote: "Next time, open with a one-sentence 'problem statement' before diving into components — it signals clarity and confidence immediately.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scenarioId, stepId, userResponse } = body as {
      scenarioId: string;
      stepId: number;
      userResponse: string;
    };

    if (!scenarioId || !stepId || !userResponse?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const scenario = getScenarioById(scenarioId);
    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }

    const step = scenario.steps.find((s) => s.id === stepId);
    if (!step) {
      return NextResponse.json({ error: "Step not found" }, { status: 404 });
    }

    // If no API key, return mock feedback for development
    if (!process.env.GEMINI_API_KEY) {
      console.warn("[Case Trainer] GEMINI_API_KEY not set — returning mock feedback");
      return NextResponse.json(mockFeedback(stepId));
    }

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const apiKey = process.env.GEMINI_API_KEY as string;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemPrompt = buildSystemPrompt(scenario.title, scenario.context);
    const userPrompt = buildEvaluationPrompt(
      STEP_LABELS[stepId - 1] ?? step.label,
      step.prompt,
      userResponse
    );

    const result = await model.generateContent({
      systemInstruction: systemPrompt,
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
      },
    });

    const raw = result.response.text().trim();

    // Strip markdown fences if model adds them despite instructions
    const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    const parsed: RubricScores = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[Case Trainer Feedback API]", err);
    return NextResponse.json(
      { error: "Failed to generate feedback. Please try again." },
      { status: 500 }
    );
  }
}
