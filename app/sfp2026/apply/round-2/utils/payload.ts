import type { Round2FormData } from "../data/types";
import { PORTFOLIO_PLATFORMS } from "../components/PortfolioIcons";

export function preparePayload(data: Round2FormData): Record<string, string> {
  const withOther = (arr: string[], otherText: string) =>
    arr
      .map((item) =>
        item === "Other" && otherText ? `Other: ${otherText}` : item
      )
      .join(", ");

  const flattenProficiency = (
    items: string[],
    ratings: Record<string, string>
  ) =>
    items
      .filter((i) => i !== "Other")
      .map((i) => `${i}: ${ratings[i] || "N/A"}`)
      .join("; ");

  const portfolioStr = data.portfolioEntries
    .filter((e) => e.url.trim())
    .map((e) => {
      const platform = PORTFOLIO_PLATFORMS.find((p) => p.key === e.platform);
      return `${platform?.label || e.platform}: ${e.url}`;
    })
    .join("\n");

  const isEng = data.careerTrack === "Engineering / Technical Track";
  const includeBiz =
    !isEng || data.crossTrackEng.startsWith("Yes");

  return {
    formType: "round-2",
    timestamp: new Date().toISOString(),
    fullName: data.fullName,
    email: data.email,
    cvUpdated: data.cvUpdated,
    cvLink: data.cvLink,
    portfolioLinks: portfolioStr,
    university:
      data.university === "Others"
        ? data.universityOther.trim()
          ? `Others: ${data.universityOther.trim()}`
          : "Others"
        : data.university,
    graduationYear: data.graduationYear,
    majors: data.majors,
    gpa: data.gpa,
    internshipExperience: data.internshipExperience,
    preferredLocation: data.preferredLocation,
    willingToRelocate: data.willingToRelocate,
    careerTrack: data.careerTrack,
    programmingLanguages: isEng
      ? withOther(data.programmingLanguages, data.programmingLanguagesOther)
      : "",
    languageProficiency: isEng
      ? flattenProficiency(data.programmingLanguages, data.languageProficiency)
      : "",
    frameworks: isEng
      ? withOther(data.frameworks, data.frameworksOther)
      : "",
    frameworkProficiency: isEng
      ? flattenProficiency(data.frameworks, data.frameworkProficiency)
      : "",
    techDomains: isEng
      ? withOther(data.techDomains, data.techDomainsOther)
      : "",
    crossTrackEng: isEng ? data.crossTrackEng : "",
    bizTools: includeBiz
      ? withOther(data.bizTools, data.bizToolsOther)
      : "",
    bizToolProficiency: includeBiz
      ? flattenProficiency(data.bizTools, data.bizToolProficiency)
      : "",
    analyticalTools: includeBiz
      ? withOther(data.analyticalTools, data.analyticalToolsOther)
      : "",
    analyticalToolProficiency: includeBiz
      ? flattenProficiency(
          data.analyticalTools,
          data.analyticalToolProficiency
        )
      : "",
    bizDomains: includeBiz
      ? withOther(data.bizDomains, data.bizDomainsOther)
      : "",
    crossTrackBiz: !isEng ? data.crossTrackBiz : "",
    techIndustries: data.techIndustries.join(", "),
    startDate: data.startDate,
    preferredDuration: data.preferredDuration,
    workArrangement: data.workArrangement.join(", "),
    improvementsAfterR1: withOther(
      data.improvementsAfterR1,
      data.improvementsAfterR1Other
    ),
    fellowshipCommitment: data.fellowshipCommitment,
    additionalComments: data.additionalComments,
  };
}
