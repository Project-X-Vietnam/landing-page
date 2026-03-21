import { DiagnosticLevel } from "../types";
import { CVData, ExperienceEntry } from "./cvTemplates";

type CvOverride = Partial<Pick<CVData, "title" | "summary" | "experience" | "projects">>;

const LEVEL_ROLE_SUFFIX: Record<DiagnosticLevel, string> = {
  starter: "Intern",
  developing: "Fresher",
  ready: "Trainee",
};

const CANONICAL_ROLE_LABEL: Record<string, string> = {
  "Software Engineering (SWE)": "Software Engineer",
  "Artificial Intelligence (AI) / Machine Learning (ML)": "ML Engineer",
  "Data Analytics (DA) & Business Intelligence (BI)": "Data Analyst",
  "Data Engineering": "Data Engineer",
  "Cloud Engineering / DevOps": "Cloud / DevOps Engineer",
  "Product Management (PM)": "Product Manager",
  "Product Growth / Growth PM": "Growth PM",
  "Business Analytics (BA)": "Business Analyst",
  "UI/UX / Product Design": "Product Designer",
  "Project Management (Tech Projects)": "Project Manager (Tech Projects)",
  "Business Development (Tech Industry)": "Business Development Associate",
  "Digital Marketing (Tech-focused)": "Digital Marketer",
  "Operations (Tech Operations / Process Automation)": "Operations Associate",
};

const SENIORITY_MARKERS = /(intern|fresher|trainee|junior|early-career)/i;
const CONFLICTING_SENIORITY_PREFIX = /^(senior|sr\.?|lead|principal|staff|mid-level|mid)\s+/i;

function getRoleLabel(selectedRole: string | null, canonicalRole: string): string {
  if (selectedRole === "AI Product Manager" || selectedRole === "AI Product Management") {
    return "AI Product Manager";
  }
  return CANONICAL_ROLE_LABEL[canonicalRole] ?? canonicalRole;
}

function withLevelSuffix(roleLabel: string, level: DiagnosticLevel): string {
  const normalized = roleLabel.replace(CONFLICTING_SENIORITY_PREFIX, "").trim();
  if (SENIORITY_MARKERS.test(normalized)) return normalized;
  return `${normalized} ${LEVEL_ROLE_SUFFIX[level]}`;
}

function normalizeExperienceRoles(
  base: ExperienceEntry[] | undefined,
  selectedRole: string | null,
  canonicalRole: string,
  level: DiagnosticLevel
): ExperienceEntry[] | undefined {
  if (!base || base.length === 0) return base;
  const normalizedRole = withLevelSuffix(getRoleLabel(selectedRole, canonicalRole), level);
  return base.map((entry, idx) => {
    if (idx !== 0) return entry;
    return {
      ...entry,
      role: normalizedRole,
    };
  });
}

const OVERRIDES_BY_ROLE: Record<string, Partial<Record<DiagnosticLevel, CvOverride>>> = {
  "AI Product Manager": {
    starter: {
      summary:
        "AI Product Manager intern bridging model capabilities with user needs. Defines AI-assisted workflows, evaluates UX risk, and helps teams ship practical AI features responsibly.",
    },
    developing: {
      summary:
        "AI product manager fresher owning scoped AI features from problem framing to experiment readouts. Focuses on user value, guardrails, and measurable product outcomes.",
    },
    ready: {
      summary:
        "Strong-fresher AI product manager profile: leads scoped AI feature delivery with clear success criteria, responsible rollout checks, and user-facing value proof.",
    },
  },
  "AI Product Management": {
    starter: {
      summary:
        "AI Product Manager intern bridging model capabilities with user needs. Defines AI-assisted workflows, evaluates UX risk, and helps teams ship practical AI features responsibly.",
    },
    developing: {
      summary:
        "AI product manager fresher owning scoped AI features from problem framing to experiment readouts. Focuses on user value, guardrails, and measurable product outcomes.",
    },
    ready: {
      summary:
        "Strong-fresher AI product manager profile: leads scoped AI feature delivery with clear success criteria, responsible rollout checks, and user-facing value proof.",
    },
  },
};

function mergeExperienceRoleOnly(
  base: ExperienceEntry[] | undefined,
  rolePatch: ExperienceEntry[] | undefined
): ExperienceEntry[] | undefined {
  if (!base || !rolePatch || rolePatch.length === 0) return rolePatch ?? base;
  return base.map((entry, idx) => {
    const patch = rolePatch[idx];
    if (!patch) return entry;
    return {
      ...entry,
      company: patch.company || entry.company,
      role: patch.role || entry.role,
      dates: patch.dates || entry.dates,
      bullets: patch.bullets && patch.bullets.length > 0 ? patch.bullets : entry.bullets,
    };
  });
}

export function getRoleCvOverride(
  selectedRole: string | null,
  canonicalRole: string,
  level: DiagnosticLevel,
  base: CVData
): CvOverride | null {
  const baseExperience = normalizeExperienceRoles(base.experience, selectedRole, canonicalRole, level);
  const bySelected = selectedRole ? OVERRIDES_BY_ROLE[selectedRole]?.[level] : null;
  const byCanonical = OVERRIDES_BY_ROLE[canonicalRole]?.[level];
  const override = bySelected ?? byCanonical ?? null;
  if (!override) return { experience: baseExperience };

  return {
    ...override,
    experience: mergeExperienceRoleOnly(baseExperience, override.experience)?.map((entry, idx) =>
      idx === 0
        ? {
            ...entry,
            role: withLevelSuffix(entry.role, level),
          }
        : entry
    ),
  };
}
