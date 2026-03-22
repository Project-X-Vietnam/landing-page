export interface PortfolioEntry {
  platform: string;
  url: string;
}

export interface Round2FormData {
  fullName: string;
  email: string;
  cvUpdated: string;
  cvLink: string;
  portfolioEntries: PortfolioEntry[];

  university: string;
  universityOther: string;
  graduationYear: string;
  majors: string;
  gpa: string;
  internshipExperience: string;
  preferredLocation: string;
  willingToRelocate: string;

  careerTrack: string;
  programmingLanguages: string[];
  programmingLanguagesOther: string;
  languageProficiency: Record<string, string>;
  frameworks: string[];
  frameworksOther: string;
  frameworkProficiency: Record<string, string>;
  techDomains: string[];
  techDomainsOther: string;
  crossTrackEng: string;

  bizTools: string[];
  bizToolsOther: string;
  bizToolProficiency: Record<string, string>;
  analyticalTools: string[];
  analyticalToolsOther: string;
  analyticalToolProficiency: Record<string, string>;
  bizDomains: string[];
  bizDomainsOther: string;
  crossTrackBiz: string;

  techIndustries: string[];
  startDate: string;
  preferredDuration: string;
  workArrangement: string[];

  improvementsAfterR1: string[];
  improvementsAfterR1Other: string;
  fellowshipCommitment: string;
  additionalComments: string;
}

export type UpdateFn = <K extends keyof Round2FormData>(
  key: K,
  value: Round2FormData[K]
) => void;
