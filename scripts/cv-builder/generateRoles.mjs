import fs from 'fs';

const types = `// ─── Per-Role Data Layer ────────────────────────────────────────────────────
// This is the single source of truth for role-specific content.
// Content maps: role (string from Screen1Pillars) → level → section content.

export type Level = "starter" | "developing" | "ready";

export interface RoleLevelData {
  cvTitle: string;
  cvSummary: string;
  experienceChecklist: [string, string, string];
  summaryChecklist: [string, string, string];
  actionVerbs: string[];
  keySkills: string[];
  hrQuote: string;
  hrName: string;
  hrRole: string;
  hrCompany: "shopee" | "google" | "grab" | "vng" | "startup" | "scaleup";
}

export interface RoleData {
  starter: RoleLevelData;
  developing: RoleLevelData;
  ready: RoleLevelData;
}

export const ROLE_DATA: Record<string, RoleData> = {
`;

fs.writeFileSync('src/data/roleData.ts', types);
console.log('Types written.');
