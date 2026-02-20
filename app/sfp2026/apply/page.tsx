"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Send,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import SuccessScreen from "./SuccessScreen";
import {
  trackApplicationFormStart,
  trackApplicationPageView,
  trackFormStepComplete,
  trackFormValidationError,
  trackApplicationSubmitted,
  trackFormSessionRestored,
  trackFormExit,
  trackFormReset,
  setSfpUserProperties,
  deriveInterestTrack,
  STEP_NAMES,
  type FormPhase as AnalyticsFormPhase,
  type FormExitElement,
} from "@/lib/analytics/sfp2026";

// ═══════════════════════════════════════════════════════════════
// TYPES & CONSTANTS
// ═══════════════════════════════════════════════════════════════

type FormPhase = "early-bird" | "official" | "closed";

const EARLY_BIRD_DEADLINE = new Date("2026-02-28T23:59:59+07:00");
const OFFICIAL_DEADLINE = new Date("2026-03-13T23:59:59+07:00");

function getFormPhase(): FormPhase {
  const now = new Date();
  if (now <= EARLY_BIRD_DEADLINE) return "early-bird";
  if (now <= OFFICIAL_DEADLINE) return "official";
  return "closed";
}

function getDeadline(phase: FormPhase): Date {
  return phase === "early-bird" ? EARLY_BIRD_DEADLINE : OFFICIAL_DEADLINE;
}

const STEP_LABELS = [
  "Personal Info",
  "Profile & Interests",
  "Readiness",
  "Goals & Submit",
];

const INTEREST_GROUPS = [
  {
    label: "Engineering Track",
    options: [
      "Software Engineering (SWE)",
      "Artificial Intelligence (AI) / Machine Learning (ML)",
      "Data Analytics (DA) & Business Intelligence (BI)",
      "Data Engineering",
      "Cloud Engineering / DevOps",
    ],
  },
  {
    label: "Product & Analytics Track",
    options: [
      "Product Management (PM)",
      "Product Growth / Growth PM",
      "Business Analytics (BA)",
      "UI/UX / Product Design",
    ],
  },
  {
    label: "Tech-Enabled Business Roles",
    options: [
      "Project Management (Tech Projects)",
      "Business Development (Tech Industry)",
      "Digital Marketing (Tech-focused)",
      "Operations (Tech Operations / Process Automation)",
    ],
  },
];

const LOCATIONS = ["HCMC", "Hanoi", "Remote"];

const FOLLOWING_DURATION_OPTIONS = [
  "Less than 1 month",
  "1 – 6 months",
  "6 months – 1 year",
  "More than 1 year",
];

const ANNOUNCEMENT_SOURCE_OPTIONS = [
  "Project X Email Newsletter",
  "Project X Discord Community",
  "Facebook Fanpage Post",
  "Shared by a friend",
  "University Portal/Club Page",
];

const APPLY_FACTORS_OPTIONS = [
  "Impressed by the Info Pack, Mentors, Partners, etc",
  "Wanted to finish early to stop worrying",
  "Inspired and motivated by Alumni stories/reviews",
  "Just saw the opportunities and applied immediately to try my luck",
  "The Early Bird deadline is approaching",
];

const APPLIED_WITH_OPTIONS = [
  "I am applying on my own",
  "I applied first, and then I will encourage my friends to apply too",
  "My friends/network applied or talked about it, so I decided to apply too",
  "We are working on our applications together",
];

const CV_CHALLENGE_OPTIONS = [
  "Starting from scratch (don't know what to include or how to structure)",
  "Lack of relevant experience or projects to showcase",
  "Selecting what's relevant (have experience but unsure what matters)",
  "Describing my experience effectively (turning responsibilities into achievements)",
  "Writing about myself with confidence",
  "Understanding what recruiters and companies actually look for",
  "Finding examples/templates specific to my field or role",
];

const CV_RATING_CRITERIA = [
  { key: "contentStructure", label: "Content & Structure", desc: "Clear sections, appropriate length, well-organized" },
  { key: "impactAchievements", label: "Impact & Achievements", desc: "Shows measurable results and accomplishments" },
  { key: "relevance", label: "Relevance", desc: "Tailored to tech roles, highlights relevant skills" },
  { key: "clarityComm", label: "Clarity & Communication", desc: "Clear, concise language; easy to read" },
];

const PORTFOLIO_PLAN_OPTIONS = [
  "Yes, and I already have one (I need to improve or update it)",
  "Yes, but I'm starting from scratch (don't have one yet)",
  "Maybe — I'm not sure if I need one for my target roles",
  "No — not relevant for my target roles",
];

const PORTFOLIO_CHALLENGE_OPTIONS = [
  "Don't know where to start or which format to use",
  "Lack of strong projects to include (only class projects)",
  "Have projects but don't know how to document them effectively",
  'Unsure which projects are "portfolio-worthy" for my target role(s)',
  "Don't know how to tell the story behind my projects",
  "My existing portfolio looks unprofessional or incomplete",
  "Finding portfolio examples specific to my field or role",
];

const PREVIOUS_APPS_OPTIONS = [
  "Yes, I've applied to 5+ positions",
  "Yes, I've applied to 1-4 positions",
  "No, this will be my first time applying",
  "I've applied but now switching career focus",
];

const TOP_PRIORITIES_OPTIONS = [
  "Build my CV from scratch",
  "Improve my CV's impact & achievements (not just responsibilities)",
  "Tailor my CV specifically for tech roles",
  "Improve my writing and communication clarity",
  "Create a portfolio or project showcase from scratch",
  "Improve my existing portfolio's quality or documentation",
  "Understand what different tech roles involve",
  "Build confidence in my application materials",
];

const TECH_BIZ_CHALLENGE_OPTIONS = [
  "I don't know how to make my non-tech background relevant for tech companies",
  'I can\'t show "tech skills" on my CV (no coding, no technical projects)',
  'My experience is all traditional business — how do I make it "tech"?',
  "I don't know which tech tools/skills to learn or highlight",
  'I\'m unsure what "tech-enabled business roles" actually look like',
];

const PROGRAM_GOALS_OPTIONS = [
  "Internship opportunities",
  "Mentorship from Senior & Professionals",
  "Technical/Professional skills training",
  "Career & Direction clarity",
  "Build Personal Projects/Portfolio/CV",
  "Network with peers and professionals",
];

// ═══════════════════════════════════════════════════════════════
// FORM DATA
// ═══════════════════════════════════════════════════════════════

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  socialMedia: string;
  summerLocation: string;
  university: string;
  graduationYear: string;
  majors: string;
  minors: string;
  gpa: string;
  cvLink: string;
  portfolioLink: string;
  areasOfInterest: string[];
  areasOfInterestOther: string;
  preferredLocation: string[];
  preferredLocationOther: string;
  followingDuration: string;
  announcementSource: string[];
  announcementSourceUniPortal: string;
  announcementSourceOther: string;
  applyFactors: string[];
  applyFactorsOther: string;
  appliedWith: string[];
  cvChallenge: string[];
  cvChallengeOther: string;
  cvRatings: Record<string, number>;
  portfolioPlan: string;
  portfolioChallenge: string[];
  previousApplications: string;
  topPriorities: string[];
  topPrioritiesOther: string;
  techBizChallenge: string[];
  fiveYearVision: string;
  stepsTaken: string;
  programGoals: string[];
  programGoalsOther: string;
  referral: string;
  questions: string;
}

const INITIAL_FORM: ApplicationFormData = {
  fullName: "", email: "", phone: "", socialMedia: "", summerLocation: "",
  university: "", graduationYear: "", majors: "", minors: "", gpa: "",
  cvLink: "", portfolioLink: "",
  areasOfInterest: [], areasOfInterestOther: "",
  preferredLocation: [], preferredLocationOther: "",
  followingDuration: "",
  announcementSource: [], announcementSourceUniPortal: "", announcementSourceOther: "",
  applyFactors: [], applyFactorsOther: "", appliedWith: [],
  cvChallenge: [], cvChallengeOther: "", cvRatings: {},
  portfolioPlan: "", portfolioChallenge: [],
  previousApplications: "",
  topPriorities: [], topPrioritiesOther: "",
  techBizChallenge: [],
  fiveYearVision: "", stepsTaken: "",
  programGoals: [], programGoalsOther: "",
  referral: "", questions: "",
};

type UpdateFn = <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => void;

// ═══════════════════════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════════════════════

function validateStep(step: number, data: ApplicationFormData, phase: FormPhase): string[] {
  const errors: string[] = [];
  if (step === 0) {
    if (!data.fullName.trim()) errors.push("Full Name is required");
    if (!data.email.trim()) errors.push("Email is required");
    if (!data.phone.trim()) errors.push("Phone Number is required");
    if (!data.socialMedia.trim()) errors.push("Social media link is required");
    if (!data.summerLocation.trim()) errors.push("Summer location is required");
    if (!data.university.trim()) errors.push("University is required");
    if (!data.graduationYear.trim()) errors.push("Graduation Year is required");
    if (!data.majors.trim()) errors.push("Major(s) is required");
    if (!data.minors.trim()) errors.push("Minor(s) is required");
    if (!data.gpa.trim()) errors.push("GPA is required");
  }
  if (step === 1) {
    if (!data.cvLink.trim()) errors.push("CV/Resume link is required");
    if (data.areasOfInterest.length === 0) errors.push("Select at least one area of interest");
    if (data.preferredLocation.length === 0) errors.push("Select at least one preferred location");
    if (phase === "early-bird") {
      if (!data.followingDuration) errors.push("Please indicate how long you've been following PXV");
      if (data.announcementSource.length === 0) errors.push("Please select where you first saw the announcement");
      if (data.applyFactors.length === 0) errors.push("Please select factors that influenced your decision");
      if (data.appliedWith.length === 0) errors.push("Please indicate how you decided to apply");
    }
  }
  if (step === 2) {
    if (data.cvChallenge.length === 0) errors.push("Select at least one CV challenge");
    if (CV_RATING_CRITERIA.some((c) => !data.cvRatings[c.key])) errors.push("Please rate all CV criteria");
    if (!data.portfolioPlan) errors.push("Please select a portfolio plan option");
    if (!data.previousApplications) errors.push("Please indicate your previous application experience");
    if (data.topPriorities.length === 0) errors.push("Select at least one priority");
    if (data.techBizChallenge.length === 0) errors.push("Select at least one tech business challenge");
  }
  if (step === 3) {
    if (!data.fiveYearVision.trim()) errors.push("5-year vision is required");
    if (!data.stepsTaken.trim()) errors.push("Steps taken is required");
    if (data.programGoals.length === 0) errors.push("Select at least one program goal");
  }
  return errors;
}

function preparePayload(data: ApplicationFormData, phase: FormPhase) {
  const withOther = (arr: string[], otherText: string) =>
    arr.map((item) => (item === "Other" && otherText ? `Other: ${otherText}` : item)).join(", ");

  const seeSource = (() => {
    const parts = withOther(data.announcementSource, data.announcementSourceOther);
    if (data.announcementSourceUniPortal) return `${parts} (${data.announcementSourceUniPortal})`;
    return parts;
  })();

  return {
    formType: phase,
    timestamp: new Date().toISOString(),
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    social: data.socialMedia,
    location: data.summerLocation,
    university: data.university,
    grad_year: data.graduationYear,
    major: data.majors,
    minor: data.minors,
    gpa: data.gpa,
    resume: data.cvLink,
    portfolio: data.portfolioLink,
    career_interest: withOther(data.areasOfInterest, data.areasOfInterestOther),
    intern_location: withOther(data.preferredLocation, data.preferredLocationOther),
    follow_prjx: data.followingDuration,
    see_prjx: seeSource,
    reason_apply: withOther(data.applyFactors, data.applyFactorsOther),
    apply_partner: data.appliedWith.join(", "),
    cv_challenge: withOther(data.cvChallenge, data.cvChallengeOther),
    cvRatingContent: data.cvRatings.contentStructure || 0,
    cvRatingImpact: data.cvRatings.impactAchievements || 0,
    cvRatingRelevance: data.cvRatings.relevance || 0,
    cvRatingClarity: data.cvRatings.clarityComm || 0,
    prj_showcase: data.portfolioPlan,
    port_challenge: data.portfolioChallenge.join(", "),
    apply_intern: data.previousApplications,
    priority: withOther(data.topPriorities, data.topPrioritiesOther),
    tech_challenge: data.techBizChallenge.join(", "),
    open_q1: data.fiveYearVision,
    open_q2: data.stepsTaken,
    open_q3: withOther(data.programGoals, data.programGoalsOther),
    note: data.questions,
    referral: data.referral,
  };
}

// ═══════════════════════════════════════════════════════════════
// FORM FIELD COMPONENTS (light theme)
// ═══════════════════════════════════════════════════════════════

function FormField({ label, description, required, children, className }: {
  label: string; description?: string; required?: boolean; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {description && <p className="text-xs text-slate-400 mb-1.5 leading-relaxed">{description}</p>}
      {children}
    </div>
  );
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm",
        "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
        props.className
      )}
    />
  );
}

function FormTextarea({ maxWords, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { maxWords?: number }) {
  const value = typeof props.value === "string" ? props.value : "";
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  return (
    <div className="relative">
      <textarea
        {...props}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm",
          "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y",
          props.className
        )}
      />
      {maxWords && (
        <p className={cn("text-xs mt-1", wordCount > maxWords ? "text-red-500" : "text-slate-400")}>
          {wordCount}/{maxWords} words
        </p>
      )}
    </div>
  );
}

function OptionGrid({ options, selected, onChange, multiple = true, maxSelect, columns = 2, hasOther, otherValue, onOtherChange }: {
  options: string[]; selected: string[]; onChange: (s: string[]) => void;
  multiple?: boolean; maxSelect?: number; columns?: 1 | 2 | 3;
  hasOther?: boolean; otherValue?: string; onOtherChange?: (v: string) => void;
}) {
  const toggle = (option: string) => {
    if (multiple) {
      if (selected.includes(option)) onChange(selected.filter((s) => s !== option));
      else if (!maxSelect || selected.length < maxSelect) onChange([...selected, option]);
    } else {
      onChange(selected.includes(option) ? [] : [option]);
    }
  };
  const allOptions = hasOther ? [...options, "Other"] : options;
  const isOtherSelected = selected.includes("Other");
  const gridClass = columns === 1 ? "grid-cols-1" : columns === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";

  return (
    <div>
      <div className={cn("grid gap-2", gridClass)}>
        {allOptions.map((option) => {
          const isSelected = selected.includes(option);
          const isDisabled = multiple && !!maxSelect && selected.length >= maxSelect && !isSelected;
          return (
            <label key={option} className={cn(
              "flex items-center gap-3 py-2.5 px-3 rounded-lg border cursor-pointer transition-all text-sm",
              isSelected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300",
              isDisabled && "opacity-40 cursor-not-allowed"
            )}>
              <div className={cn(
                "w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center",
                multiple ? "" : "rounded-full",
                isSelected ? "border-primary bg-primary" : "border-slate-300"
              )}>
                {isSelected && (multiple
                  ? <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  : <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-slate-700">{option}</span>
              <input type="checkbox" checked={isSelected} onChange={() => !isDisabled && toggle(option)} className="sr-only" />
            </label>
          );
        })}
      </div>
      {hasOther && isOtherSelected && (
        <FormInput placeholder="Please specify..." value={otherValue || ""} onChange={(e) => onOtherChange?.(e.target.value)} className="mt-2" />
      )}
      {multiple && maxSelect && <p className="mt-1.5 text-xs text-slate-400">{selected.length}/{maxSelect} selected</p>}
    </div>
  );
}

function GroupedOptionGrid({ groups, selected, onChange, hasOther, otherValue, onOtherChange }: {
  groups: { label: string; options: string[] }[]; selected: string[]; onChange: (s: string[]) => void;
  hasOther?: boolean; otherValue?: string; onOtherChange?: (v: string) => void;
}) {
  const toggle = (option: string) => {
    if (selected.includes(option)) onChange(selected.filter((s) => s !== option));
    else onChange([...selected, option]);
  };
  const isOtherSelected = selected.includes("Other");

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{group.label}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {group.options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <label key={option} className={cn(
                  "flex items-center gap-3 py-2.5 px-3 rounded-lg border cursor-pointer transition-all text-sm",
                  isSelected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"
                )}>
                  <div className={cn("w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center", isSelected ? "border-primary bg-primary" : "border-slate-300")}>
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-slate-700">{option}</span>
                  <input type="checkbox" checked={isSelected} onChange={() => toggle(option)} className="sr-only" />
                </label>
              );
            })}
          </div>
        </div>
      ))}
      {hasOther && (
        <div>
          <label className={cn(
            "flex items-center gap-3 py-2.5 px-3 rounded-lg border cursor-pointer transition-all text-sm w-full",
            isOtherSelected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"
          )}>
            <div className={cn("w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center", isOtherSelected ? "border-primary bg-primary" : "border-slate-300")}>
              {isOtherSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </div>
            <span className="text-slate-700">Other (Please Specify)</span>
            <input type="checkbox" checked={isOtherSelected} onChange={() => toggle("Other")} className="sr-only" />
          </label>
          {isOtherSelected && <FormInput placeholder="Please specify the area(s)..." value={otherValue || ""} onChange={(e) => onOtherChange?.(e.target.value)} className="mt-2" />}
        </div>
      )}
    </div>
  );
}

function RatingRow({ label, description, value, onChange }: {
  label: string; description: string; value: number; onChange: (n: number) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 border-b border-slate-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <div className="flex gap-1.5 flex-shrink-0">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => onChange(n)} className={cn(
            "w-9 h-9 rounded-lg text-sm font-medium transition-all",
            value === n ? "bg-primary text-white" : value > 0 && n <= value ? "bg-primary/20 text-primary" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          )}>{n}</button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STEP COMPONENTS
// ═══════════════════════════════════════════════════════════════

interface StepProps { data: ApplicationFormData; update: UpdateFn; }

const PERSONAL_FIELDS: { key: keyof ApplicationFormData; label: string; placeholder: string; required: boolean; type?: string; description?: string }[] = [
  { key: "fullName", label: "Full Name", placeholder: "E.g. Nguyen Van A", required: true },
  { key: "email", label: "Email", placeholder: "E.g. projectxvietnam@gmail.com", required: true, type: "email", description: "This will be used to contact you throughout the program." },
  { key: "phone", label: "Phone Number", placeholder: "E.g. (+84) 123-456-7890", required: true, description: "Format: (Country Code) Phone Number" },
  { key: "socialMedia", label: "Social media link (e.g., Facebook, LinkedIn)", placeholder: "E.g. https://www.facebook.com/techXVn", required: true },
  { key: "summerLocation", label: "Your location this Summer (July to August)", placeholder: "E.g. Hanoi, Vietnam", required: true, description: "Format: City, Country" },
  { key: "university", label: "University", placeholder: "E.g. Ho Chi Minh City University of Technology", required: true, description: "Full university name" },
  { key: "graduationYear", label: "Graduation Year", placeholder: "E.g. 2026", required: true },
  { key: "majors", label: "Major(s)", placeholder: "E.g. Computer Science", required: true },
  { key: "minors", label: "Minor(s)", placeholder: 'E.g. Economics or "N/A"', required: true, description: 'If not applicable, write "N/A"' },
  { key: "gpa", label: "Cumulative GPA", placeholder: "E.g. 3.5", required: true, description: "On a 4.0 scale. Convert if your university uses a different system." },
];

function Step1({ data, update }: StepProps) {
  return (
    <div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Step 1</span>
      <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">Personal Information</h1>
      <p className="text-slate-500 text-sm mb-6">Let&apos;s start with some basic information about you.</p>
      <div className="space-y-5">
        {PERSONAL_FIELDS.map((f) => (
          <FormField key={f.key} label={f.label} required={f.required} description={f.description}>
            <FormInput type={f.type || "text"} value={data[f.key] as string} onChange={(e) => update(f.key, e.target.value as ApplicationFormData[typeof f.key])} placeholder={f.placeholder} />
          </FormField>
        ))}
      </div>
    </div>
  );
}

function Step2({ data, update, phase }: StepProps & { phase: FormPhase }) {
  const isEB = phase === "early-bird";
  return (
    <div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Step 2</span>
      <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">Profile & Interests</h1>
      <p className="text-slate-500 text-sm mb-6">Share your professional profile and preferences.</p>
      <div className="space-y-6">
        <FormField label="Please upload your CV/Resume" required description="Google Drive link with view-only access.">
          <FormInput value={data.cvLink} onChange={(e) => update("cvLink", e.target.value)} placeholder="https://drive.google.com/..." />
        </FormField>
        <FormField label="Please upload your portfolio" description="Optional — Google Drive link with view-only access.">
          <FormInput value={data.portfolioLink} onChange={(e) => update("portfolioLink", e.target.value)} placeholder="https://drive.google.com/... (optional)" />
        </FormField>
        <FormField label="Area(s) of interest for Internship" required description="You may choose multiple answers.">
          <GroupedOptionGrid groups={INTEREST_GROUPS} selected={data.areasOfInterest} onChange={(v) => update("areasOfInterest", v)} hasOther otherValue={data.areasOfInterestOther} onOtherChange={(v) => update("areasOfInterestOther", v)} />
        </FormField>
        <FormField label="Preferred Summer Internship Location" required description="You may choose multiple answers.">
          <OptionGrid options={LOCATIONS} selected={data.preferredLocation} onChange={(v) => update("preferredLocation", v)} columns={3} hasOther otherValue={data.preferredLocationOther} onOtherChange={(v) => update("preferredLocationOther", v)} />
        </FormField>

        {isEB && (
          <>
            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-lg font-bold text-slate-900">Interests & Motivation</h2>
            </div>
            <FormField label="How long have you been following Project X Vietnam activities?" required>
              <OptionGrid options={FOLLOWING_DURATION_OPTIONS} selected={data.followingDuration ? [data.followingDuration] : []} onChange={(v) => update("followingDuration", v[0] || "")} multiple={false} columns={2} />
            </FormField>
            <FormField label="Where did you FIRST see the announcement for SFP 2026?" required description="You may select multiple options.">
              <OptionGrid options={ANNOUNCEMENT_SOURCE_OPTIONS} selected={data.announcementSource} onChange={(v) => update("announcementSource", v)} hasOther otherValue={data.announcementSourceOther} onOtherChange={(v) => update("announcementSourceOther", v)} />
              {data.announcementSource.includes("University Portal/Club Page") && (
                <FormInput placeholder="Name of University Portal/Club Page" value={data.announcementSourceUniPortal} onChange={(e) => update("announcementSourceUniPortal", e.target.value)} className="mt-2" />
              )}
            </FormField>
            <FormField label="What factors most influenced your decision to apply?" required description="You may select multiple options.">
              <OptionGrid options={APPLY_FACTORS_OPTIONS} selected={data.applyFactors} onChange={(v) => update("applyFactors", v)} hasOther otherValue={data.applyFactorsOther} onOtherChange={(v) => update("applyFactorsOther", v)} />
            </FormField>
            <FormField label="Did you apply alone or with friends?" required description="You may select multiple options.">
              <OptionGrid options={APPLIED_WITH_OPTIONS} selected={data.appliedWith} onChange={(v) => update("appliedWith", v)} columns={1} />
            </FormField>
          </>
        )}
      </div>
    </div>
  );
}

function Step3({ data, update }: StepProps) {
  const showPortfolioChallenge = ["Yes, and I already have one (I need to improve or update it)", "Yes, but I'm starting from scratch (don't have one yet)", "Maybe — I'm not sure if I need one for my target roles"].includes(data.portfolioPlan);
  return (
    <div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Step 3</span>
      <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">Internship Application Readiness</h1>
      <p className="text-slate-500 text-sm mb-6">Help us understand where you are in your application journey.</p>
      <div className="space-y-6">
        <FormField label="What is your biggest challenge with creating a strong CV?" required description="Select up to 2.">
          <OptionGrid options={CV_CHALLENGE_OPTIONS} selected={data.cvChallenge} onChange={(v) => update("cvChallenge", v)} maxSelect={2} columns={1} hasOther otherValue={data.cvChallengeOther} onOtherChange={(v) => update("cvChallengeOther", v)} />
        </FormField>
        <FormField label="Rate the current state of your CV/Resume" required description="1 = Needs significant work, 3 = Adequate, 5 = Strong/Confident">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            {CV_RATING_CRITERIA.map((c) => (
              <RatingRow key={c.key} label={c.label} description={c.desc} value={data.cvRatings[c.key] || 0} onChange={(n) => update("cvRatings", { ...data.cvRatings, [c.key]: n })} />
            ))}
          </div>
        </FormField>
        <FormField label="Do you plan to create a portfolio or project showcase?" required description="A portfolio could be a GitHub profile, case study collection, documentation site, or Notion showcase.">
          <OptionGrid options={PORTFOLIO_PLAN_OPTIONS} selected={data.portfolioPlan ? [data.portfolioPlan] : []} onChange={(v) => update("portfolioPlan", v[0] || "")} multiple={false} columns={1} />
        </FormField>
        <AnimatePresence>
          {showPortfolioChallenge && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <FormField label="What is your biggest challenge with your portfolio?" description="Select up to 2.">
                <OptionGrid options={PORTFOLIO_CHALLENGE_OPTIONS} selected={data.portfolioChallenge} onChange={(v) => update("portfolioChallenge", v)} maxSelect={2} columns={1} />
              </FormField>
            </motion.div>
          )}
        </AnimatePresence>
        <FormField label="Have you previously applied to internships or full-time tech roles?" required>
          <OptionGrid options={PREVIOUS_APPS_OPTIONS} selected={data.previousApplications ? [data.previousApplications] : []} onChange={(v) => update("previousApplications", v[0] || "")} multiple={false} columns={1} />
        </FormField>
        <FormField label="What are your TOP 2 priorities for improvement?" required>
          <OptionGrid options={TOP_PRIORITIES_OPTIONS} selected={data.topPriorities} onChange={(v) => update("topPriorities", v)} maxSelect={2} columns={1} hasOther otherValue={data.topPrioritiesOther} onOtherChange={(v) => update("topPrioritiesOther", v)} />
        </FormField>
        <FormField label="What's your biggest challenge positioning yourself for tech companies?" required description="Select up to 2.">
          <OptionGrid options={TECH_BIZ_CHALLENGE_OPTIONS} selected={data.techBizChallenge} onChange={(v) => update("techBizChallenge", v)} maxSelect={2} columns={1} />
        </FormField>
      </div>
    </div>
  );
}

function Step4({ data, update }: StepProps) {
  return (
    <div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Step 4</span>
      <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">Goal Alignment & Additional Info</h1>
      <p className="text-slate-500 text-sm mb-6">Feel free to use AI as a supporting tool. However, your responses will be assessed based on the authenticity and originality of your personal story.</p>
      <div className="space-y-6">
        <FormField label="How do you see yourself in the next 5 years? How does this align with Project X Vietnam's vision?" required description="Career goals, professional development, personal growth, etc.">
          <FormTextarea value={data.fiveYearVision} onChange={(e) => update("fiveYearVision", e.target.value)} placeholder="Share your vision..." rows={6} maxWords={250} />
        </FormField>
        <FormField label="What steps have you taken so far? What challenges are you currently facing?" required>
          <FormTextarea value={data.stepsTaken} onChange={(e) => update("stepsTaken", e.target.value)} placeholder="Share your journey so far..." rows={6} maxWords={250} />
        </FormField>
        <FormField label="What do you hope to achieve through the PJX Fellowship Program?" required>
          <OptionGrid options={PROGRAM_GOALS_OPTIONS} selected={data.programGoals} onChange={(v) => update("programGoals", v)} hasOther otherValue={data.programGoalsOther} onOtherChange={(v) => update("programGoalsOther", v)} />
        </FormField>
        <div className="border-t border-slate-200 pt-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Additional Information</p>
        </div>
        <FormField label="If you were referred, please provide the name of your referral contact.">
          <FormInput value={data.referral} onChange={(e) => update("referral", e.target.value)} placeholder="E.g. Nguyen Van A (optional)" />
        </FormField>
        <FormField label="Any questions or clarifications about the program?">
          <FormTextarea value={data.questions} onChange={(e) => update("questions", e.target.value)} placeholder="Share any questions you have (optional)" rows={3} />
        </FormField>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RIGHT PANEL
// ═══════════════════════════════════════════════════════════════

const STEP_CONTEXT: { title: string; tip: string }[] = [
  { title: "Getting to know you", tip: "Be accurate with your contact details — we'll use them for all program communication." },
  { title: "Show us your path", tip: "There are no wrong answers. We want to understand your genuine interests and motivations." },
  { title: "Where you stand", tip: "Honest self-assessment helps us provide you with the best resources & support." },
  { title: "Almost there!", tip: "Speak from the heart — we value authenticity and original thinking over polished answers." },
];


function CountdownTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center font-medium">
      <span className="text-[40px] xl:text-[52px] 2xl:text-[56px] font-medium text-white tabular-nums leading-none tracking-tight">{String(value).padStart(2, "0")}</span>
      <span className="text-[11px] text-white/50 font-medium mt-1.5">{label}</span>
    </div>
  );
}

function RightPanel({ phase, deadline, currentStep, data, onExit }: {
  phase: FormPhase; deadline: Date; currentStep: number; data: ApplicationFormData;
  onExit?: (element: FormExitElement) => void;
}) {
  const [[d, h, m, s], setTime] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, deadline.getTime() - Date.now());
      setTime([Math.floor(diff / 86400000), Math.floor((diff / 3600000) % 24), Math.floor((diff / 60000) % 60), Math.floor((diff / 1000) % 60)]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const ctx = STEP_CONTEXT[currentStep] || STEP_CONTEXT[0];
  const visibleInterests = data.areasOfInterest.slice(0, 4);
  const overflowCount = data.areasOfInterest.length - 4;

  return (
    <div className="relative z-10 h-full flex flex-col p-6 xl:p-8 2xl:p-10">
      {/* Header: back link — pinned top */}
      <div className="shrink-0">
        <Link href="/sfp2026" onClick={() => onExit?.("back_link")} className="text-xs text-white/50 hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> SFP 2026
        </Link>
      </div>

      {/* Centered content — fills remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0 mb-24">
        {/* Program hero */}
        <div className="text-center mb-6">
          {phase === "early-bird" ? (
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide backdrop-blur-md bg-secondary/20 text-secondary border border-secondary/30 shadow-[0_0_20px_rgba(23,202,250,0.25)]">
                <span className="w-2 h-2 rounded-full animate-pulse bg-secondary" />
                Early Bird Open
              </div>
            </div>
          ) : (
            <p className="text-secondary italic text-base xl:text-lg font-medium mb-2">Project X Vietnam</p>
          )}
          <h2 className="uppercase font-bold text-white tracking-wide mb-4 flex flex-col gap-2 xl:gap-3" style={{ fontFamily: "Plus Jakarta Sans, -apple-system, sans-serif" }}>
            <span className="text-2xl xl:text-3xl 2xl:text-[2.5rem] leading-none">Summer Fellowship</span>
            <span className="text-2xl xl:text-3xl 2xl:text-[2.5rem] leading-none">Program 2026</span>
          </h2>
          <p className="text-white/70 text-[13px] leading-relaxed max-w-lg mx-auto">
            {phase === "early-bird"
              ? "Apply early for an extra internship slot privilege during company matching, plus exclusive resources package \u2014 top practical courses, eBooks, and other job application materials to strengthen your application."
              : "Final application window. Complete your application to secure your spot in SFP 2026 with Project X Vietnam."}
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3 w-full">
        {/* Countdown */}
        <GlassCard className="shrink-0">
          <div className="px-12 py-4">
            <p className="text-[13px] font-medium text-white/60 text-center mb-3">
              {phase === "early-bird" ? "Early Bird Application closes in" : "Application closes in"}
            </p>
            <div className="flex items-start justify-between">
              <CountdownTile value={d} label="days" />
              <span className="text-[32px] xl:text-[42px] 2xl:text-[46px] font-light text-white leading-none mt-[2px]">:</span>
              <CountdownTile value={h} label="hours" />
              <span className="text-[32px] xl:text-[42px] 2xl:text-[46px] font-light text-white leading-none mt-[2px]">:</span>
              <CountdownTile value={m} label="minutes" />
              <span className="text-[32px] xl:text-[42px] 2xl:text-[46px] font-light text-white leading-none mt-[2px]">:</span>
              <CountdownTile value={s} label="seconds" />
            </div>
          </div>
        </GlassCard>

        {/* Contextual tip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="shrink-0">
              <div className="px-5 py-4">
                <p className="text-white font-semibold text-sm mb-1">{ctx.title}</p>
                <p className="text-white/55 text-xs leading-relaxed">{ctx.tip}</p>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic interests */}
        {data.areasOfInterest.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="shrink-0">
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60 mb-2.5">Your interests</p>
                <div className="flex flex-wrap gap-1.5">
                  {visibleInterests.map((interest) => (
                    <span key={interest} className="px-2.5 py-1 rounded-full bg-white/[0.08] text-white text-[11px] font-medium border border-white/[0.12] truncate max-w-[200px]">
                      {interest}
                    </span>
                  ))}
                  {overflowCount > 0 && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] text-white/50 bg-white/[0.04] border border-white/[0.08] font-medium">+{overflowCount}</span>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function ApplyPage() {
  const [phase] = useState<FormPhase>(() => getFormPhase());
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLabel, setSubmitLabel] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  // ── GA4 tracking refs ──
  const hasTrackedFormStart = useRef(false);
  const formStartTimeRef = useRef<number>(0);
  const analyticsPhase = phase as AnalyticsFormPhase;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sfp2026-apply");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (typeof parsed.step === "number" && parsed.step >= 0 && parsed.step < STEP_LABELS.length) {
          setCurrentStep(parsed.step);
          // GA4: only track restored session if user had meaningful progress
          const hasProgress = parsed.step > 0
            || (parsed.formData?.fullName && parsed.formData.fullName.trim() !== "");
          if (hasProgress) {
            trackFormSessionRestored(parsed.step, (getFormPhase() === "closed" ? "official" : getFormPhase()) as AnalyticsFormPhase);
          }
        }
      }
    } catch { /* ignore */ }
    setIsHydrated(true);
  }, []);

  // GA4: set user property + track page view on mount
  useEffect(() => {
    if (phase !== "closed") {
      setSfpUserProperties({ sfp_form_phase: analyticsPhase });
      trackApplicationPageView(analyticsPhase);
    }
  }, [phase, analyticsPhase]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("sfp2026-apply", JSON.stringify({ formData, step: currentStep }));
  }, [formData, currentStep, isHydrated]);

  // GA4: track first form interaction
  const trackFormStartOnce = useCallback(() => {
    if (!hasTrackedFormStart.current && phase !== "closed") {
      hasTrackedFormStart.current = true;
      formStartTimeRef.current = Date.now();
      trackApplicationFormStart(analyticsPhase);
      setSfpUserProperties({ sfp_application_status: "started" });
    }
  }, [phase, analyticsPhase]);

  const update: UpdateFn = useCallback((key, value) => {
    trackFormStartOnce();
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, [trackFormStartOnce]);

  const scrollToTop = useCallback(() => {
    leftPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToStep = (step: number) => {
    setErrors([]);
    setCurrentStep(step);
    scrollToTop();
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData, phase);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      toast.error(stepErrors[0]);
      trackFormValidationError(currentStep, STEP_NAMES[currentStep], stepErrors.length, stepErrors[0]);
      return;
    }
    setErrors([]);
    trackFormStepComplete(currentStep, STEP_NAMES[currentStep], analyticsPhase);

    // GA4: set interest track user property after step 1 (profile & interests)
    if (currentStep === 1 && formData.areasOfInterest.length > 0) {
      setSfpUserProperties({ sfp_interest_track: deriveInterestTrack(formData.areasOfInterest) });
    }

    setCurrentStep((p) => p + 1);
    scrollToTop();
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(currentStep, formData, phase);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      toast.error(stepErrors[0]);
      trackFormValidationError(currentStep, STEP_NAMES[currentStep], stepErrors.length, stepErrors[0]);
      return;
    }
    if (getFormPhase() === "closed") { toast.error("The application period has ended."); return; }
    setIsSubmitting(true);
    setSubmitLabel("Submitting...");

    const slowTimer = setTimeout(() => setSubmitLabel("Almost there — hang tight..."), 8_000);
    const verySlowTimer = setTimeout(() => setSubmitLabel("Still processing — please don't close this page"), 25_000);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparePayload(formData, phase)),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || (json && !json.success)) {
        const msg = json?.error || "Submission failed. Please try again.";
        throw new Error(msg);
      }

      // GA4: track final step complete + submission
      trackFormStepComplete(currentStep, STEP_NAMES[currentStep], analyticsPhase);
      const completionSeconds = formStartTimeRef.current
        ? (Date.now() - formStartTimeRef.current) / 1000
        : 0;
      trackApplicationSubmitted(analyticsPhase, completionSeconds);
      setSfpUserProperties({ sfp_application_status: "submitted" });

      setIsSubmitted(true);
      localStorage.removeItem("sfp2026-apply");
      toast.success("Application submitted successfully!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit. Please try again.";
      toast.error(message);
      console.error("Submit error:", error);
    } finally {
      clearTimeout(slowTimer);
      clearTimeout(verySlowTimer);
      setIsSubmitting(false);
      setSubmitLabel("");
    }
  };

  const handleReset = () => {
    if (window.confirm("Clear all form data? This cannot be undone.")) {
      trackFormReset(currentStep, analyticsPhase);
      setFormData(INITIAL_FORM);
      setCurrentStep(0);
      setErrors([]);
      localStorage.removeItem("sfp2026-apply");
      toast.success("Form has been reset.");
    }
  };

  // ── Closed ──
  if (phase === "closed") {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #060085 0%, #01001F 25%)" }}>
        <img src="/images/sfp2026/radiant_top_right.png" alt="" className="absolute top-0 right-0 w-1/2 max-w-[600px] h-auto pointer-events-none select-none" />
        <img src="/images/sfp2026/radiant_bottom_left.png" alt="" className="absolute bottom-0 left-0 w-1/2 max-w-[600px] h-auto pointer-events-none select-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center"><Clock className="w-10 h-10 text-white/40" /></div>
          <h1 className="text-3xl font-bold text-white mb-4">Applications Closed</h1>
          <p className="text-white/50 text-sm mb-8">The application period for SFP 2026 has ended. Follow us for updates on future programs.</p>
          <Link href="/sfp2026"><Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8">Back to SFP 2026</Button></Link>
        </motion.div>
      </main>
    );
  }

  // ── Success ──
  if (isSubmitted) {
    const firstName = formData.fullName.split(" ")[0] || "there";
    return <SuccessScreen firstName={firstName} email={formData.email} phase={phase} />;
  }

  // ── Form ──
  const deadline = getDeadline(phase);

  return (
    <main className="min-h-screen lg:h-screen lg:overflow-hidden bg-white">
      {/* LEFT: Form (50%) — independently scrollable */}
      <div ref={leftPanelRef} className="w-full lg:w-1/2 min-h-screen lg:h-screen lg:overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 py-10 lg:py-12">
          {/* Logo */}
          <Link href="/sfp2026" onClick={() => trackFormExit("logo", currentStep, analyticsPhase)} className="inline-block mb-8">
            <img src="/preview_icon.png" alt="Project X Vietnam" className="h-10" />
          </Link>

          {/* Stepper */}
          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => i < currentStep && goToStep(i)}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    i < currentStep ? "bg-primary text-white cursor-pointer" : i === currentStep ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                  )}
                >
                  {i < currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </button>
                {i < STEP_LABELS.length - 1 && <div className={cn("w-6 lg:w-8 h-0.5 mx-1", i < currentStep ? "bg-primary" : "bg-slate-100")} />}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              {currentStep === 0 && <Step1 data={formData} update={update} />}
              {currentStep === 1 && <Step2 data={formData} update={update} phase={phase} />}
              {currentStep === 2 && <Step3 data={formData} update={update} />}
              {currentStep === 3 && <Step4 data={formData} update={update} />}
            </motion.div>
          </AnimatePresence>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <ul className="space-y-1">
                {errors.map((err, i) => <li key={i} className="text-sm text-red-600">• {err}</li>)}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
            <Button variant="ghost" onClick={() => goToStep(currentStep - 1)} disabled={currentStep === 0}
              className={cn("text-slate-500", currentStep === 0 && "opacity-0 pointer-events-none")}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            {currentStep < STEP_LABELS.length - 1 ? (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6">
                Continue <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 disabled:opacity-50">
                {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{submitLabel}</> : <>Submit Application<Send className="w-4 h-4 ml-2" /></>}
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pb-4">
            <p className="text-xs text-slate-400">
              By submitting, you agree to our <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
            <button type="button" onClick={handleReset} className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Context Panel (50%) - Fixed */}
      <div className="hidden lg:block fixed top-0 right-0 w-1/2 h-screen overflow-hidden" style={{ background: "linear-gradient(to bottom, #060085 0%, #01001F 25%)" }}>
        <img src="/images/sfp2026/radiant_top_right.png" alt="" className="absolute top-0 right-0 w-3/4 h-auto pointer-events-none select-none" />
        <img src="/images/sfp2026/radiant_bottom_left.png" alt="" className="absolute bottom-0 left-0 w-3/4 h-auto pointer-events-none select-none" />
        <RightPanel phase={phase} deadline={deadline} currentStep={currentStep} data={formData} onExit={(el) => trackFormExit(el, currentStep, analyticsPhase)} />
      </div>
    </main>
  );
}
