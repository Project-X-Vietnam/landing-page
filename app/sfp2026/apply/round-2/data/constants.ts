import type { Round2FormData } from "./types";

export const FORM_CLOSE_DEADLINE = new Date("2026-03-29T17:00:00+07:00");

export function isFormClosed(): boolean {
  return new Date() > FORM_CLOSE_DEADLINE;
}

export const STEP_LABELS = [
  "Identity",
  "Profile",
  "Career & Skills",
  "Availability",
  "Submit",
];

export const R2_STEP_NAMES = [
  "identity_verification",
  "general_profile",
  "career_skills",
  "industry_availability",
  "additional_submit",
] as const;

export type R2StepName = (typeof R2_STEP_NAMES)[number];

export const INITIAL_FORM: Round2FormData = {
  fullName: "",
  email: "",
  cvUpdated: "",
  cvLink: "",
  portfolioEntries: [{ platform: "github", url: "" }],
  university: "",
  universityOther: "",
  graduationYear: "",
  majors: "",
  gpa: "",
  internshipExperience: "",
  preferredLocation: "",
  willingToRelocate: "",
  careerTrack: "",
  programmingLanguages: [],
  programmingLanguagesOther: "",
  languageProficiency: {},
  frameworks: [],
  frameworksOther: "",
  frameworkProficiency: {},
  techDomains: [],
  techDomainsOther: "",
  crossTrackEng: "",
  bizTools: [],
  bizToolsOther: "",
  bizToolProficiency: {},
  analyticalTools: [],
  analyticalToolsOther: "",
  analyticalToolProficiency: {},
  bizDomains: [],
  bizDomainsOther: "",
  crossTrackBiz: "",
  techIndustries: [],
  startDate: "",
  preferredDuration: "",
  workArrangement: [],
  improvementsAfterR1: [],
  improvementsAfterR1Other: "",
  fellowshipCommitment: "",
  additionalComments: "",
};
