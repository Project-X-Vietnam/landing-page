"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ============================================
// ICONS
// ============================================
const icons = {
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  partnership: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  product: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  growth: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  operations: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  mentor: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  briefcase: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  rocket: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
};

// ============================================
// TYPES
// ============================================
type DeptQuestion = {
  id: string;
  label: string;
  type: "scale" | "textarea" | "multiselect";
  helper?: string;
  maxWords?: number;
  scaleMax?: number;
  options?: string[];
};

type Department = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  questions: DeptQuestion[];
};

// ============================================
// DEPARTMENTS DATA
// ============================================
const departments: Department[] = [
  {
    id: "partnership",
    title: "Partnership Department",
    icon: icons.partnership,
    description: "Build relationships with companies and organizations",
    questions: [
      { id: "p-q1", label: "On a scale of 1 to 10, how comfortable & confident are you with reaching out to strangers to discuss business-related topics?", type: "scale", helper: "1 being Not at all, 10 being Extremely comfortable & confident" },
      { id: "p-q2", label: "On a scale of 1 to 10, how would you rate your business sense & knowledge, and market research skills?", type: "scale", helper: "1 being Beginner, 10 being Highly confident & experienced" },
      { id: "p-q3", label: "Describe a time when you successfully built a partnership or secured sponsorship for a project/organization. Can you share about your approach, and how did you secure long-term value for both parties?", type: "textarea", helper: "Please provide your answers in bullet points (300 words)", maxWords: 300 },
      { id: "p-q4", label: "What do you think is the most challenging part of cold outreach? How do you personally overcome it?", type: "textarea", helper: "Please provide your answers in bullet points (300 words)", maxWords: 300 },
      { id: "p-q5", label: "Based on your own brief research of Project X Vietnam, please identify top 3 Ideal Customer Profiles (ICPs) for potential B2B partners. Explain why each ICP is relevant and how it aligns with Project X Vietnam's goals and products.", type: "textarea", helper: "Please provide your answers in bullet points (300 words)", maxWords: 300 },
      { id: "p-q6", label: "What excites you most about working in a Partnership role in tech organization, and how does this align with your career goals?", type: "textarea", helper: "Please provide your answers in bullet points (300 words)", maxWords: 300 },
    ],
  },
  {
    id: "product",
    title: "Product Department",
    icon: icons.product,
    description: "Design and improve Project X programs and initiatives",
    questions: [
      { id: "pd-q1", label: "Please propose 2–3 product initiatives that Project X could develop next. These can be new product ideas or improvements to existing components.", type: "textarea", helper: "For each initiative, follow the format: Problem (user pain point), Insight (behavioral/data-driven insight), Solution (proposed feature and who it serves)", maxWords: 500 },
      { id: "pd-q2", label: "Pick ONE of the initiatives you proposed above. Describe a 'Low-Fidelity' Experiment you could run in 48 hours with zero budget to prove this idea is worth pursuing.", type: "textarea", helper: "What exactly would you do? What data point would convince you to proceed? (e.g., 'If 10 people sign up,' or 'If 80% say Yes')", maxWords: 300 },
      { id: "pd-q3", label: "Think about the current landscape of student organizations or tech communities in Vietnam. What is one common activity or format that everyone does, but you think is actually ineffective or a waste of time?", type: "textarea", helper: "e.g., 'I think Recruitment Days are useless because...', or 'I think generic Soft Skill webinars don't work because...'", maxWords: 300 },
    ],
  },
  {
    id: "growth",
    title: "Growth Department",
    icon: icons.growth,
    description: "Drive marketing, content, and community growth",
    questions: [
      { id: "g-q1", label: "Which area are you MOST curious about exploring in Growth?", type: "multiselect", options: ["Community acquisition", "Branding & storytelling", "Content & social media", "Visual design", "Analytics & insights", "Not sure yet — open to learning everything!"] },
      { id: "g-q2", label: "Share a moment when you had to do or learn something completely new. How did you figure it out, from your first step to your final outcome?", type: "textarea", helper: "Please walk us through your thought process and a specific example", maxWords: 300 },
      { id: "g-q3", label: "Tell us about a time you tried something new, made mistakes, and had to iterate quickly. What happened and what did you learn from that experience?", type: "textarea", maxWords: 300 },
      { id: "g-q4", label: "How comfortable are you with using creative tools (e.g., Figma, Canva, Notion)?", type: "scale", helper: "0 being no experience, 5 being proficient", scaleMax: 5 },
      { id: "g-q5", label: "Imagine the PJX Summer Fellowship applications open next week. What is one campaign idea you would launch immediately?", type: "textarea", helper: "Format suggestion: Insight - Big Idea - Explanation/Execution", maxWords: 300 },
    ],
  },
  {
    id: "operations",
    title: "Operations Department",
    icon: icons.operations,
    description: "Manage logistics, events, and internal processes",
    questions: [
      { id: "o-q1", label: "Describe a time when you had to handle multiple tasks with tight deadlines. How did you prioritize, and what trade-offs did you make?", type: "textarea", maxWords: 300 },
      { id: "o-q2", label: "Tell us about a time you worked cross-functionally and faced misalignment or disagreement. How did you resolve it and ensure the project moved forward?", type: "textarea", maxWords: 300 },
      { id: "o-q3", label: "Describe a situation where you anticipated or managed risks in a project or event. How did you identify the risks, and what actions did you take to mitigate them?", type: "textarea", maxWords: 300 },
      { id: "o-q4", label: "Have you used any Project Management or Automation tools before? If yes, please describe how you used them to optimize your work.", type: "textarea", helper: "If possible, please attach or share examples of your actual work", maxWords: 300 },
    ],
  },
];

// ============================================
// FORM COMPONENTS
// ============================================
function FormInput({ label, name, type = "text", placeholder, required = false, value, onChange, helper }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; helper?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {helper && <p className="text-xs text-slate-400 mb-1.5">{helper}</p>}
      <input
        type={type} id={name} name={name} placeholder={placeholder} required={required}
        value={value} onChange={onChange}
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
      />
    </div>
  );
}

function FormTextarea({ label, name, placeholder, required = false, value, onChange, helper, rows = 3, maxWords }: {
  label: string; name: string; placeholder?: string; required?: boolean;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; helper?: string; rows?: number; maxWords?: number;
}) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {helper && <p className="text-xs text-slate-400 mb-1.5">{helper}</p>}
      <textarea
        id={name} name={name} placeholder={placeholder} required={required}
        value={value} onChange={onChange} rows={rows}
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm"
      />
      {maxWords && (
        <p className={`text-xs mt-1 ${wordCount > maxWords ? "text-red-500" : "text-slate-400"}`}>
          {wordCount}/{maxWords} words
        </p>
      )}
    </div>
  );
}

function FormRadioGroup({ label, name, options, required = false, value, onChange }: {
  label: string; name: string; options: { value: string; label: string }[]; required?: boolean;
  value: string; onChange: (value: string) => void;
}) {
  return (
    <div className="shrink-0">
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className={`flex items-center gap-3 py-2.5 px-3 rounded-lg border cursor-pointer transition-all ${
            value === opt.value ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"
          }`}>
            <div className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center ${
              value === opt.value ? "border-primary" : "border-slate-300"
            }`}>
              {value === opt.value && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
            <span className="text-sm text-slate-700">{opt.label}</span>
            <input type="radio" name={name} value={opt.value} checked={value === opt.value}
              onChange={() => onChange(opt.value)} className="sr-only" />
          </label>
        ))}
      </div>
    </div>
  );
}

function FormScale({ label, required = false, value, onChange, helper, scaleMin = 1, scaleMax = 10 }: {
  label: string; required?: boolean; value: number; onChange: (value: number) => void; helper?: string; scaleMin?: number; scaleMax?: number;
}) {
  const scaleRange = Array.from({ length: scaleMax - scaleMin + 1 }, (_, i) => scaleMin + i);
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {helper && <p className="text-xs text-slate-400 mb-2">{helper}</p>}
      <div className="flex items-center gap-1 flex-wrap">
        {scaleRange.map((n) => (
          <button key={n} type="button" onClick={() => onChange(n)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
              value === n ? "bg-primary text-white" : value >= scaleMin && n <= value ? "bg-primary/20 text-primary" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}>
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function FormMultiSelect({ label, required = false, options, value, onChange, helper }: {
  label: string; required?: boolean; options: string[]; value: string[]; onChange: (value: string[]) => void; helper?: string;
}) {
  const toggleOption = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {helper && <p className="text-xs text-slate-400 mb-2">{helper}</p>}
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className={`flex items-center gap-3 py-2.5 px-3 rounded-lg border cursor-pointer transition-all ${
            value.includes(opt) ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"
          }`}>
            <div className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center ${
              value.includes(opt) ? "border-primary bg-primary" : "border-slate-300"
            }`}>
              {value.includes(opt) && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
            </div>
            <span className="text-sm text-slate-700">{opt}</span>
            <input type="checkbox" checked={value.includes(opt)} onChange={() => toggleOption(opt)} className="sr-only" />
          </label>
        ))}
      </div>
    </div>
  );
}

function DepartmentCard({ dept, isSelected, order, onSelect, disabled }: {
  dept: Department; isSelected: boolean; order: number | null; onSelect: () => void; disabled: boolean;
}) {
  return (
    <div onClick={() => !disabled && onSelect()}
      className={`relative flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
        isSelected ? "border-primary bg-primary/5" : disabled ? "border-slate-100 opacity-40 cursor-not-allowed" : "border-slate-100 hover:border-primary/40"
      }`}>
      {order && <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{order}</div>}
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-500"}`}>{dept.icon}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 text-sm">{dept.title}</h3>
        <p className="text-xs text-slate-500 truncate">{dept.description}</p>
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function RecruitmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Navigate to step and scroll to top
  const goToStep = (step: number | ((prev: number) => number)) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Form state
  const [formData, setFormData] = useState({
    // Part 1: Personal Info
    fullName: "", email: "", socialMedia: "", university: "", major: "", location: "", resume: "", portfolio: "",
    // Part 2: Project X
    whyJoin: "", firstChoice: "", secondChoice: "", participated: "", participatedDetails: "", hoursPerWeek: "", heardFrom: "",
    // Department answers
    deptAnswers: {} as Record<string, string | number | string[]>,
    // Part 5: Final words
    finalWords: "",
  });

  const steps = ["Personal Info", "About Project X", "Department Questions", "Final Words", "Review"];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeptAnswer = (id: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, deptAnswers: { ...prev.deptAnswers, [id]: value } }));
  };

  const getSelectedDepts = () => {
    const depts: Department[] = [];
    if (formData.firstChoice) {
      const d = departments.find((x) => x.id === formData.firstChoice);
      if (d) depts.push(d);
    }
    if (formData.secondChoice && formData.secondChoice !== formData.firstChoice) {
      const d = departments.find((x) => x.id === formData.secondChoice);
      if (d) depts.push(d);
    }
    return depts;
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.fullName && formData.email && formData.socialMedia && formData.university && formData.major && formData.location && formData.resume;
    }
    if (currentStep === 1) {
      return formData.whyJoin && formData.firstChoice && formData.participated && formData.hoursPerWeek && formData.heardFrom;
    }
    if (currentStep === 2) {
      const depts = getSelectedDepts();
      return depts.every((d) => d.questions.every((q) => {
        const answer = formData.deptAnswers[q.id];
        if (q.type === "multiselect") return Array.isArray(answer) && answer.length > 0;
        return answer;
      }));
    }
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lark/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: { ...formData, submitted: new Date().toISOString() } }),
      });
      setSubmitStatus(res.ok ? "success" : "error");
    } catch { setSubmitStatus("error"); }
    finally { setIsSubmitting(false); }
  };

  const selectedDepts = getSelectedDepts();

  // ============================================
  // SUCCESS SCREEN
  // ============================================
  if (submitStatus === "success") {
    return (
      <main className="min-h-screen bg-[#020818] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `linear-gradient(to right, rgba(14,86,250,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,86,250,0.15) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,86,250,0.4)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,209,255,0.3)_0%,_transparent_50%)]" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 max-w-lg w-full">
          {/* Success Icon */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>
          
          {/* Content */}
          <div className="text-center mb-8">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Application Submitted! 🎉
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/60 text-lg">
              Thank you for applying to join <span className="text-white font-medium">Project X Organizing Team 2026</span>
            </motion.p>
          </div>
          
          {/* What's Next Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">What happens next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div>
                <div><p className="text-white font-medium text-sm">Application Review</p><p className="text-white/50 text-xs">Our team will carefully review your application within 5-7 business days.</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</div>
                <div><p className="text-white font-medium text-sm">Interview Invitation</p><p className="text-white/50 text-xs">Shortlisted candidates will receive an interview invitation via email.</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">3</div>
                <div><p className="text-white font-medium text-sm">Final Decision</p><p className="text-white/50 text-xs">We&apos;ll notify all applicants of the final decision by email.</p></div>
              </div>
            </div>
          </motion.div>
          
          {/* Email Notice */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center justify-center gap-2 text-white/40 text-sm mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span>Confirmation sent to <span className="text-white">{formData.email}</span></span>
          </motion.div>
          
          {/* Actions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/"><Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3 font-semibold">Back to Home</Button></Link>
            <a href="https://www.facebook.com/projectxvietnam" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-3 font-semibold">Follow Us on Facebook</Button>
            </a>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  // ============================================
  // MAIN FORM
  // ============================================
  return (
    <main className="min-h-screen bg-white">
      {/* ========== LEFT: FORM (60%) ========== */}
      <div className="w-full lg:w-3/5 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 py-10 lg:py-12">
          {/* Logo */}
          <Link href="/" className="inline-block mb-8">
            <img src="/preview_icon.png" alt="Project X" className="h-10" />
          </Link>

          {/* Stepper */}
          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < currentStep ? "bg-primary text-white" : i === currentStep ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {i < currentStep ? icons.check : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`w-6 lg:w-8 h-0.5 mx-1 ${i < currentStep ? "bg-primary" : "bg-slate-100"}`} />}
              </div>
            ))}
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {/* Part 1: Personal Info */}
            {currentStep === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Part 1</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Personal Information</h1>
                <p className="text-slate-500 mb-6">Let&apos;s start with some basic information about you.</p>

                <div className="space-y-5">
                  <FormInput label="Full Name" name="fullName" placeholder="Le Minh Hung" required value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                  <FormInput label="Email" name="email" type="email" placeholder="you@email.com" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} helper="We'll use this to contact you for next steps." />
                  <FormInput label="Social Media Link" name="socialMedia" placeholder="linkedin.com/in/yourprofile" required value={formData.socialMedia} onChange={(e) => handleChange("socialMedia", e.target.value)} helper="e.g., LinkedIn, Facebook (Preferred LinkedIn)" />
                  <FormInput label="University" name="university" placeholder="FTU'26" required value={formData.university} onChange={(e) => handleChange("university", e.target.value)} helper="Include graduation year (e.g., FTU'26)" />
                  <FormInput label="Major" name="major" placeholder="Business Administration" required value={formData.major} onChange={(e) => handleChange("major", e.target.value)} />
                  <FormInput label="Current Location" name="location" placeholder="HCMC, Vietnam" required value={formData.location} onChange={(e) => handleChange("location", e.target.value)} helper="Format: City, Country" />
                  <FormInput label="Resume (Google Drive Link)" name="resume" placeholder="https://drive.google.com/..." required value={formData.resume} onChange={(e) => handleChange("resume", e.target.value)} helper="Upload your resume to Google Drive and paste the link. Set sharing to 'Anyone with the link can view'." />
                  <FormInput label="Portfolio (optional)" name="portfolio" placeholder="https://drive.google.com/..." value={formData.portfolio} onChange={(e) => handleChange("portfolio", e.target.value)} helper="If you have a portfolio, paste the Google Drive link here." />
                </div>
              </motion.div>
            )}

            {/* Part 2: Project X */}
            {currentStep === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Part 2</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">About Project X</h1>
                <p className="text-slate-500 mb-6">Tell us about your interest in joining our team.</p>

                <div className="space-y-5">
                  <FormTextarea label="Why do you want to join the Project X Organizing Team 2026?" name="whyJoin" placeholder="Share your motivation in bullet points..." required value={formData.whyJoin} onChange={(e) => handleChange("whyJoin", e.target.value)} helper="Please elaborate in bullet points" maxWords={100} rows={4} />

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Choice Position <span className="text-red-500">*</span></label>
                    <p className="text-xs text-slate-400 mb-2">Check the Job Description link for more information.</p>
                    <div className="space-y-2">
                      {departments.map((dept) => (
                        <DepartmentCard key={dept.id} dept={dept} isSelected={formData.firstChoice === dept.id} order={formData.firstChoice === dept.id ? 1 : null} onSelect={() => handleChange("firstChoice", dept.id)} disabled={false} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Second Choice Position (optional)</label>
                    <div className="space-y-2">
                      {departments.filter((d) => d.id !== formData.firstChoice).map((dept) => (
                        <DepartmentCard key={dept.id} dept={dept} isSelected={formData.secondChoice === dept.id} order={formData.secondChoice === dept.id ? 2 : null} onSelect={() => handleChange("secondChoice", formData.secondChoice === dept.id ? "" : dept.id)} disabled={false} />
                      ))}
                    </div>
                  </div>

                  <FormRadioGroup label="Have you participated in any Project X programs?" name="participated" required value={formData.participated} onChange={(v) => handleChange("participated", v)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
                  {formData.participated === "yes" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.2 }}>
                      <FormInput label="Which programs?" name="participatedDetails" placeholder="e.g., Summer Fellowship Program 2024" value={formData.participatedDetails} onChange={(e) => handleChange("participatedDetails", e.target.value)} />
                    </motion.div>
                  )}

                  <FormRadioGroup label="How many hours per week can you dedicate?" name="hoursPerWeek" required value={formData.hoursPerWeek} onChange={(v) => handleChange("hoursPerWeek", v)} options={[
                    { value: "5-10", label: "5 - 10 hours per week" },
                    { value: "10-15", label: "10 - 15 hours per week" },
                    { value: "15-20", label: "15 - 20 hours per week" },
                    { value: "20+", label: "Over 20 hours per week" },
                  ]} />

                  <FormInput label="Where did you hear about Project X?" name="heardFrom" placeholder="e.g., Facebook, Friend, Event..." required value={formData.heardFrom} onChange={(e) => handleChange("heardFrom", e.target.value)} />
                </div>
              </motion.div>
            )}

            {/* Part 3-4: Department Questions */}
            {currentStep === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Department Questions</h1>
                <p className="text-slate-500 mb-6">Answer questions for your selected department(s).</p>

                <div className="space-y-6">
                  {selectedDepts.map((dept, idx) => (
                    <div key={dept.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Part {idx + 3}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{dept.icon}</div>
                        <div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${idx === 0 ? "bg-primary text-white" : "bg-slate-200 text-slate-600"}`}>
                            {idx === 0 ? "1ST CHOICE" : "2ND CHOICE"}
                          </span>
                          <h3 className="font-semibold text-slate-900">{dept.title}</h3>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {dept.questions.map((q) => (
                          q.type === "scale" ? (
                            <FormScale key={q.id} label={q.label} required value={(formData.deptAnswers[q.id] as number) || 0} onChange={(v) => handleDeptAnswer(q.id, v)} helper={q.helper} scaleMin={q.scaleMax === 5 ? 0 : 1} scaleMax={q.scaleMax || 10} />
                          ) : q.type === "multiselect" ? (
                            <FormMultiSelect key={q.id} label={q.label} required options={q.options || []} value={(formData.deptAnswers[q.id] as string[]) || []} onChange={(v) => handleDeptAnswer(q.id, v)} helper={q.helper} />
                          ) : (
                            <FormTextarea key={q.id} label={q.label} name={q.id} required value={(formData.deptAnswers[q.id] as string) || ""} onChange={(e) => handleDeptAnswer(q.id, e.target.value)} rows={4} helper={q.helper} maxWords={q.maxWords} />
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Part 5: Final Words */}
            {currentStep === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Part {selectedDepts.length + 3}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Last Words for Project X</h1>
                <p className="text-slate-500 mb-6">Thank you for your interest! Feel free to share any final thoughts.</p>

                <FormTextarea
                  label="Is there anything else you would like us to know, or any questions you have for Project X?"
                  name="finalWords"
                  placeholder="Share any additional information or questions..."
                  value={formData.finalWords}
                  onChange={(e) => handleChange("finalWords", e.target.value)}
                  rows={5}
                />
              </motion.div>
            )}

            {/* Review */}
            {currentStep === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Final Step</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Review & Submit</h1>
                <p className="text-slate-500 mb-6">Please review all your information before submitting.</p>

                <div className="space-y-5">
                  {/* Part 1: Personal Info */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Part 1: Personal Info</h3>
                      <button onClick={() => goToStep(0)} className="text-xs text-primary hover:underline">Edit</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Full Name</p><p className="font-medium text-slate-900">{formData.fullName}</p></div>
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Email</p><p className="font-medium text-slate-900">{formData.email}</p></div>
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Social Media</p><p className="font-medium text-primary truncate">{formData.socialMedia}</p></div>
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">University</p><p className="font-medium text-slate-900">{formData.university}</p></div>
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Major</p><p className="font-medium text-slate-900">{formData.major}</p></div>
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Location</p><p className="font-medium text-slate-900">{formData.location}</p></div>
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Resume</p>{formData.resume ? <a href={formData.resume} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">View Link ↗</a> : <span className="text-slate-400">Not provided</span>}</div>
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Portfolio</p>{formData.portfolio ? <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">View Link ↗</a> : <span className="text-slate-400">Not provided</span>}</div>
                    </div>
                  </div>

                  {/* Part 2: About Project X */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Part 2: About Project X</h3>
                      <button onClick={() => goToStep(1)} className="text-xs text-primary hover:underline">Edit</button>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-2">Why do you want to join?</p><p className="font-medium text-slate-900 whitespace-pre-wrap">{formData.whyJoin || "Not provided"}</p></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-2">First Choice</p><div className="flex items-center gap-2"><span className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center text-xs font-bold">1</span><span className="font-medium text-slate-900">{selectedDepts[0]?.title || "Not selected"}</span></div></div>
                        <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-2">Second Choice</p>{selectedDepts[1] ? <div className="flex items-center gap-2"><span className="w-5 h-5 rounded bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">2</span><span className="font-medium text-slate-900">{selectedDepts[1].title}</span></div> : <span className="text-slate-400">Not selected</span>}</div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Participated in PX?</p><p className="font-medium text-slate-900 capitalize">{formData.participated}{formData.participated === "yes" && formData.participatedDetails && <span className="text-slate-500 text-xs ml-2">({formData.participatedDetails})</span>}</p></div>
                        <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Hours per week</p><p className="font-medium text-slate-900">{formData.hoursPerWeek} hours</p></div>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-slate-100"><p className="text-xs text-slate-400 mb-1">Where did you hear about us?</p><p className="font-medium text-slate-900">{formData.heardFrom}</p></div>
                    </div>
                  </div>

                  {/* Part 3-4: Department Answers */}
                  {selectedDepts.map((dept, idx) => (
                    <div key={dept.id} className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Part {idx + 3}: {dept.title}</h3>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${idx === 0 ? "bg-primary text-white" : "bg-slate-200 text-slate-600"}`}>{idx === 0 ? "1ST" : "2ND"}</span>
                        </div>
                        <button onClick={() => goToStep(2)} className="text-xs text-primary hover:underline">Edit</button>
                      </div>
                      <div className="space-y-3 text-sm">
                        {dept.questions.map((q) => {
                          const answer = formData.deptAnswers[q.id];
                          return (
                            <div key={q.id} className="p-3 rounded-lg bg-white border border-slate-100">
                              <p className="text-xs text-slate-400 mb-2">{q.label}</p>
                              {q.type === "scale" ? (
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">{Array.from({ length: q.scaleMax || 10 }, (_, i) => i + (q.scaleMax === 5 ? 0 : 1)).map((n) => (<div key={n} className={`w-6 h-6 rounded text-xs font-medium flex items-center justify-center ${(answer as number) >= n ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}>{n}</div>))}</div>
                                  <span className="text-slate-500 text-xs">({answer || 0}/{q.scaleMax || 10})</span>
                                </div>
                              ) : q.type === "multiselect" ? (
                                <div className="flex flex-wrap gap-1.5">{(answer as string[] || []).map((opt) => (<span key={opt} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{opt}</span>))}{(!answer || (answer as string[]).length === 0) && <span className="text-slate-400">Not selected</span>}</div>
                              ) : (
                                <p className="font-medium text-slate-900 whitespace-pre-wrap">{(answer as string) || "Not provided"}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Part 5: Final Words */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Part {selectedDepts.length + 3}: Final Words</h3>
                      <button onClick={() => goToStep(3)} className="text-xs text-primary hover:underline">Edit</button>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-slate-100 text-sm">
                      <p className="font-medium text-slate-900 whitespace-pre-wrap">{formData.finalWords || "No additional comments"}</p>
                    </div>
                  </div>

                  {submitStatus === "error" && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                      Something went wrong. Please try again.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
            <Button variant="ghost" onClick={() => goToStep((p) => p - 1)} disabled={currentStep === 0}
              className={`text-slate-500 ${currentStep === 0 ? "opacity-0 pointer-events-none" : ""}`}>← Back</Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={() => goToStep((p) => p + 1)} disabled={!canProceed()}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 disabled:opacity-50">Continue →</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 disabled:opacity-50">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
          <p className="text-center text-xs text-slate-400 mt-6 pb-4">By submitting, you agree to our <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</p>
        </div>
      </div>

      {/* ========== RIGHT: CONTEXT (40%) - Fixed Panel ========== */}
      <div className="hidden lg:block fixed top-0 right-0 w-2/5 h-screen bg-[#020818] overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `linear-gradient(to right, rgba(14,86,250,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,86,250,0.15) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,86,250,0.3)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,209,255,0.2)_0%,_transparent_50%)]" />

        <div className="relative z-10 h-full flex flex-col p-10 xl:p-14">
          <div className="flex justify-end mb-10">
            <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Back to Home
            </Link>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl xl:text-3xl font-bold text-white mb-3">Join the Organizing Team 2026</h2>
            <p className="text-white/50 text-sm leading-relaxed">Be part of the team that shapes Vietnam&apos;s next generation of tech talent.</p>
          </div>

          <div className="space-y-5 mb-10">
            {[
              { icon: icons.mentor, title: "Impactful Work", desc: "Help 500+ students launch their tech careers" },
              { icon: icons.briefcase, title: "Professional Growth", desc: "Develop leadership and project management skills" },
              { icon: icons.rocket, title: "Amazing Team", desc: "Work with passionate individuals from top universities" },
              { icon: icons.globe, title: "Network", desc: "Connect with industry mentors and partners" },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-primary flex items-center justify-center shrink-0">{b.icon}</div>
                <div><h3 className="font-semibold text-white text-sm">{b.title}</h3><p className="text-white/40 text-xs">{b.desc}</p></div>
              </div>
            ))}
          </div>

          {selectedDepts.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Your Selections</h3>
              <div className="space-y-3">
                {selectedDepts.map((d, i) => (
                  <div key={d.id} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${i === 0 ? "bg-primary text-white" : "bg-white/20 text-white/70"}`}>{i + 1}</span>
                    <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center">{d.icon}</div>
                    <span className="font-medium text-white text-sm">{d.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="mt-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-white/30 mb-4">Part of Project X Vietnam</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {["2,000+ Applicants", "35+ Partners", "85+ Senior Mentors"].map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center">{icons.check}</div>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
