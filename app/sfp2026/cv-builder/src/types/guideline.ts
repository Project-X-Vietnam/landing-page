export interface RoleGuideline {
  track: string;
  industry: string;
  role: string;
  overview: string;
  actionVerbs: string[];
  keySkills: string[];
  resumeStructure: {
    summaryTips: string[];
    experienceTips: string[];
    projectTips?: string[];
    educationTips?: string[];
  };
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
}
