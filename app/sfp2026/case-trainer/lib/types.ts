export type ScenarioCategory =
  | "Product"
  | "Growth"
  | "Data & Analytics"
  | "Business"
  | "Technical"
  | "Behavioral";

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export type PracticeStep = {
  id: number;
  label: string;
  title: string;
  prompt: string;
  hint: string;
};

export type Scenario = {
  id: string;
  category: ScenarioCategory;
  difficulty: DifficultyLevel;
  title: string;
  tagline: string;
  context: string;
  prompt: string;
  frameworkHints: string[];
  steps: PracticeStep[];
};

// 5-dimension rubric per PRD §5.3
export type RubricDimension = {
  score: number; // 0–100
  label: string;
  feedback: string;
};

export type RubricScores = {
  framing: RubricDimension;
  structure: RubricDimension;
  logic: RubricDimension;
  insight: RubricDimension;
  communication: RubricDimension;
  overallScore: number;
  coachingNote: string;
};

export type StepResponse = {
  stepId: number;
  userResponse: string;
  rubric: RubricScores | null;
  isLoading: boolean;
};

export type SessionState = {
  scenarioId: string;
  currentStep: number;
  responses: StepResponse[];
  isComplete: boolean;
};
