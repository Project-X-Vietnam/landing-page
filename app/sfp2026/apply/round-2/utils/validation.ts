import type { Round2FormData } from "../data/types";
import { R1_PASSED_EMAILS } from "../r1-passed-emails";

export function validateStep(step: number, data: Round2FormData): string[] {
  const errors: string[] = [];
  if (step === 0) {
    if (!data.fullName.trim()) errors.push("Full Name is required");
    if (!data.email.trim()) errors.push("Email is required");
    else if (!R1_PASSED_EMAILS.has(data.email.trim().toLowerCase()))
      errors.push(
        "This email was not found in Round 1 records. Please use the same email you registered with."
      );
    if (!data.cvUpdated) errors.push("Please indicate if you've updated your CV");
    if (!data.cvLink.trim()) errors.push("Updated CV link is required");
  }
  if (step === 1) {
    if (!data.university) errors.push("University is required");
    if (data.university === "Others" && !data.universityOther.trim())
      errors.push("Please specify your university name");
    if (!data.graduationYear.trim()) errors.push("Graduation Year is required");
    if (!data.majors.trim()) errors.push("Major(s) is required");
    if (!data.gpa.trim()) errors.push("GPA is required");
    if (!data.internshipExperience)
      errors.push("Please indicate your internship experience");
    if (!data.preferredLocation) errors.push("Preferred location is required");
    if (
      data.preferredLocation === "Hanoi" &&
      !data.willingToRelocate
    )
      errors.push("Please indicate if you're willing to relocate to HCMC");
  }
  if (step === 2) {
    if (!data.careerTrack) errors.push("Please select a career track");
    const needsBizFields =
      data.careerTrack === "Product / Business Track" ||
      (data.careerTrack === "Engineering / Technical Track" &&
        data.crossTrackEng.startsWith("Yes"));

    if (data.careerTrack === "Engineering / Technical Track") {
      if (data.programmingLanguages.length === 0)
        errors.push("Select at least one programming language");
      const unratedLang = data.programmingLanguages.filter(
        (l) => l !== "Other" && !data.languageProficiency[l]
      );
      if (unratedLang.length > 0)
        errors.push(`Rate proficiency for: ${unratedLang[0]}`);
      if (data.frameworks.length === 0)
        errors.push("Select at least one framework/tool");
      const unratedFw = data.frameworks.filter(
        (f) => f !== "Other" && !data.frameworkProficiency[f]
      );
      if (unratedFw.length > 0)
        errors.push(`Rate proficiency for: ${unratedFw[0]}`);
      if (data.techDomains.length === 0)
        errors.push("Select at least one technical domain");
      if (
        data.techDomains.includes("Other") &&
        !data.techDomainsOther.trim()
      )
        errors.push("Please specify your technical domain");
      if (!data.crossTrackEng)
        errors.push("Please indicate cross-track interest");
    }
    if (needsBizFields) {
      if (data.bizTools.length === 0)
        errors.push("Select at least one product/business tool");
      const unratedBiz = data.bizTools.filter(
        (t) => t !== "Other" && !data.bizToolProficiency[t]
      );
      if (unratedBiz.length > 0)
        errors.push(`Rate proficiency for: ${unratedBiz[0]}`);
      if (data.analyticalTools.length === 0)
        errors.push("Select at least one analytical tool");
      const unratedAn = data.analyticalTools.filter(
        (t) => t !== "Other" && !data.analyticalToolProficiency[t]
      );
      if (unratedAn.length > 0)
        errors.push(`Rate proficiency for: ${unratedAn[0]}`);
      if (data.bizDomains.length === 0)
        errors.push("Select at least one business domain");
      if (
        data.bizDomains.includes("Other") &&
        !data.bizDomainsOther.trim()
      )
        errors.push("Please specify your business domain");
    }
    if (data.careerTrack === "Product / Business Track") {
      if (!data.crossTrackBiz)
        errors.push("Please indicate cross-track interest");
    }
  }
  if (step === 3) {
    if (data.techIndustries.length === 0)
      errors.push("Select at least one tech industry");
    if (!data.startDate) errors.push("Earliest start date is required");
    if (!data.preferredDuration)
      errors.push("Preferred duration is required");
  }
  if (step === 4) {
    if (data.improvementsAfterR1.length === 0)
      errors.push("Select at least one improvement since Round 1");
    if (!data.fellowshipCommitment)
      errors.push("Please indicate your fellowship commitment");
  }
  return errors;
}
