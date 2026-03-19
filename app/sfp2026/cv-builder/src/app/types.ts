export type ExperienceLevel = "beginner" | "mid" | "expert";
export type FormatChoice = "upload" | "portfolio" | "blank";
export type CareerTrack = "pm" | "aiml" | "swe" | "da";
export type DiagnosticLevel = "starter" | "developing" | "ready";
export type PillarId = "engineering" | "product" | "business" | "ai";

export interface FormulaState {
  action: string;
  context: string;
  impact: string;
}
