"use client";

import { useState, useRef, useEffect } from "react";
import { getRoleLevelData } from "../../data/roleData";
import { trackEvent, handleScrollDepthTracking } from "../../utils/analytics";
import { PROMPTS_DATA, SectionPrompts } from "../../data/promptsData"; // [PROMPT WIRING - Step 3]
import { ROLE_TO_PROMPT_KEY } from "../../data/rolePromptMapping"; // [PROMPT WIRING - Step 3]
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Download,
  Sparkles,
  CheckCheck,
  MapPin,
  Mail,
  ExternalLink,
  ArrowRight,
  Wand2,
  ThumbsUp,
  Heart,
  Lock,
  Unlock,
  Building2,
} from "lucide-react";
import { DiagnosticLevel } from "../types";
import { CV_TEMPLATES, TRANSFORM_TEMPLATES, CVData, ExperienceEntry, ProjectEntry, AwardEntry, ActivityEntry, generateFallbackCV } from "../../data/cvTemplates";
import { EXPANDED_CV_TEMPLATES } from "../../data/expandedCvData";
import { buildCombinedPrompt } from "./Screen4Finish"; // Provide full prompt

// [PROMPT WIRING - Step 3] Helper to get dynamic prompt
const getPromptForSection = (role: string | null, section: string): string => {
  const safeRole = role || "Product Manager";
  const promptKey = ROLE_TO_PROMPT_KEY[safeRole] ?? "Product Management (PM)";
  const sectionData = PROMPTS_DATA[promptKey];
  if (!sectionData) return "Prompt not available for this role.";
  return (
    sectionData[section as keyof SectionPrompts] ??
    "Prompt not available for this section."
  );
};

// ─── Types ───────────────────────────────────────────────────────────────────

export type CVSection = "header" | "summary" | "experience" | "projects" | "skills" | "education" | "awards" | "activities";

import { ProjectXLogo } from "./ProjectXLogo";

type FlashColor = "blue" | "green";

type TextSeg = {
  id: string;
  text: string;
  flash?: FlashColor;
};

type Stage = TextSeg[];

export type PanelData = {
  hrQuote: string;
  hrName: string;
  hrRole: string;
  hrCompany: string;
  hrAvatar: "man" | "woman";
  aiTitle: string;
  aiSubtext: string;
  aiPrompt: string;
};

// ─── Tour & Micro-feedback Constants ─────────────────────────────────────────

const TOUR_CONTENT = [
  {
    title: "📄 Your Sample CV",
    description:
      "On the left is a real CV sample matched to your chosen role — with actual bullet points, metrics, and layout. Click any section (Summary, Experience, Projects) to explore it. Watch it highlight!",
    buttonText: "Next →",
  },
  {
    title: "✅ Self-Audit Checklist",
    description:
      "When you click a section, 3 quality checkboxes appear on the right. Each one is a standard HR expects. Tick them after honestly checking your own CV against the sample.",
    buttonText: "Next →",
  },
  {
    title: "🔓 Unlock Your Master AI Prompt",
    description:
      "Complete all 9 checklist items (3 per section). Once you hit 9/9, a Master AI Prompt unlocks. Copy it, paste it with your CV into ChatGPT or Claude, and get professional rewrites instantly!",
    buttonText: "Let's Start! 🎉",
  },
];

const MICRO_REACTIONS = [
  { emoji: "💪", text: "Action verb upgraded!", color: "#0E56FA" },
  { emoji: "🎯", text: "Context & scope added!", color: "#7c3aed" },
  { emoji: "📈", text: "Impact quantified — HR-ready!", color: "#16a34a" },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const AVATAR_MAN =
  "https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80";
const AVATAR_WOMAN =
  "https://images.unsplash.com/photo-1649193137571-2fd26d073790?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80";

// Company logos - using simple badges to represent companies
const COMPANY_INFO: Record<
  string,
  { name: string; color: string; textColor: string }
> = {
  expert: { name: "HR Expert", color: "#0f172a", textColor: "white" },
};

const LEVEL_OPTS: { id: DiagnosticLevel; emoji: string; label: string }[] = [
  { id: "starter", emoji: "🌱", label: "Beginner" },
  { id: "developing", emoji: "🚀", label: "Mid-Level" },
  { id: "ready", emoji: "🎯", label: "Expert" },
];

const LEVEL_LABEL: Record<DiagnosticLevel, string> = {
  starter: "Beginner",
  developing: "Mid-Level",
  ready: "Expert",
};

const SECTION_LABEL: Record<CVSection, string> = {
  header: "Header & Contact",
  summary: "Summary",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
  awards: "Honors & Awards",
  activities: "Extracurriculars",
};

// The generic CV Data and Transform templates are now imported from cvTemplates.ts

const PANEL_DATA: Record<CVSection, Record<DiagnosticLevel, PanelData>> = {
  experience: {
    starter: {
      hrQuote:
        "No full-time experience? Completely fine. Club projects, internships, and coursework all count — if framed with ownership. 'I helped with the project' is weak. 'Led a team of 3 to build and launch an MVP' is strong. Show me initiative.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
      hrAvatar: "woman",
      aiTitle: "Struggling to write this?",
      aiSubtext:
        "Use our prompt to let your AI turn raw activity descriptions into professional, XYZ-formatted bullet points.",
      aiPrompt: `Act as an expert Tech Recruiter for entry-level PM roles.\n\nRewrite the following raw activity into 3 professional bullet points using the XYZ Google formula: "Accomplished [X] as measured by [Y], by doing [Z]."\n\nRequirements:\n- Start each bullet with a strong action verb\n- No "I" or "my" — professional third-person\n- Include team size, tools, or any available scope\n- Emphasize initiative and ownership\n\nRaw activity:\n[PASTE YOUR DESCRIPTION HERE]`,
    },
    developing: {
      hrQuote:
        "For Mid-level roles, I don't want a list of daily tasks. I scan for data-driven results and business impact. Show me the numbers — percentages, dollar values, user counts. Give me a reason to forward your CV in the first 6 seconds.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
      hrAvatar: "man",
      aiTitle: "Struggling to write this?",
      aiSubtext:
        "Use our prompt to let your AI rewrite your raw bullet points into HR-approved XYZ formats with real metrics.",
      aiPrompt: `Act as an expert Tech Recruiter specializing in mid-level PM roles.\n\nRewrite the following experience into 3 powerful bullet points using the XYZ Google formula.\n\nRequirements:\n- Start with strong verbs (Led, Spearheaded, Optimised, Defined, Shipped)\n- Include specific metrics: %, $, user counts, NPS scores\n- Show cross-functional collaboration\n- Demonstrate product thinking (why, not just what)\n\nRaw bullets:\n[PASTE YOUR BULLET POINTS HERE]\n\nContext: I'm applying for [ROLE] at [COMPANY TYPE, e.g. Series B SaaS startup].`,
    },
    ready: {
      hrQuote:
        "At senior level, I'm not reading your CV — I'm scanning for company-scale impact. Tell me the ARR you influenced, the org you led, the strategic bets you made. If I can't see the business outcome in 6 seconds, it's a no.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
      hrAvatar: "man",
      aiTitle: "Struggling to elevate this?",
      aiSubtext:
        "Use this prompt to transform mid-level bullets into executive-grade, business-impact statements.",
      aiPrompt: `Act as an executive CV consultant for senior Product leadership.\n\nElevate the following bullets to Director/VP level:\n1. Lead with business impact at company scale (ARR, retention, market share)\n2. Show strategic ownership (not just execution)\n3. Demonstrate cross-functional leadership (squad size, budget, org influence)\n4. Use executive vocabulary: Spearheaded, Orchestrated, Championed, Architected\n\nCurrent bullets:\n[PASTE YOUR BULLETS HERE]\n\nTarget role: [Director / VP / Senior Lead]\nIndustry: [e.g., B2B SaaS, Enterprise Software, Fintech]`,
    },
  },
  summary: {
    starter: {
      hrQuote:
        "As a student, your summary should tell me what you're studying, what you're passionate about, and what problem you want to solve. Keep it to 2–3 sentences. Honesty and specificity beats buzzwords every time.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
      hrAvatar: "woman",
      aiTitle: "Need help with your summary?",
      aiSubtext:
        "Use this prompt to generate a crisp, professional 2-line summary tailored for entry-level tech roles.",
      aiPrompt: `Act as an expert CV writer for entry-level tech candidates.\n\nWrite a 2–3 sentence professional summary for a student applying for PM/tech roles.\n\nInput:\n- Degree & university: [e.g., BSc CS at VinUni]\n- Graduation year: [e.g., 2025]\n- Key experiences: [e.g., led product club, did data internship]\n- Target role: [e.g., Associate Product Manager]\n\nRequirements:\n- Line 1: degree, university, graduation year\n- Line 2: strongest experience or project\n- Line 3: specific career goal\n- No "I" or "my"\n- Max 60 words`,
    },
    developing: {
      hrQuote:
        "Your summary is your 30-second pitch. I need seniority, domain, and your biggest win — all in 2 lines. 'PM with 2 years experience' tells me nothing. '2 years scaling onboarding to 50K users, growing NPS 34→61' tells me everything.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
      hrAvatar: "man",
      aiTitle: "Struggling to summarise yourself?",
      aiSubtext:
        "Use this prompt to compress your achievements into a powerful 2-line summary that grabs hiring managers.",
      aiPrompt: `Act as an expert CV writer for mid-level PM candidates.\n\nWrite a 2-sentence professional summary for a PM with 2–4 years experience.\n\nInput:\n- Years of experience: [e.g., 2+ years]\n- Industry/product: [e.g., B2B SaaS, consumer mobile]\n- Strongest metric: [e.g., NPS 34→61, churn reduced 23%]\n- Specialisation: [e.g., Growth PM, Platform, Data]\n\nRequirements:\n- Sentence 1: years + domain + key achievement with number\n- Sentence 2: specialisation + methodology strength\n- No "I" or "my"\n- Max 50 words`,
    },
    ready: {
      hrQuote:
        "For senior roles, your summary should read like an investment memo. I want the size of your playing field — revenue scale, org impact, market context. One anchor number is worth three paragraphs of soft skills.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
      hrAvatar: "man",
      aiTitle: "Need a senior-level summary?",
      aiSubtext:
        "Use this executive framing prompt to position yourself as a strategic leader, not just a senior IC.",
      aiPrompt: `Act as an executive headhunter writing a senior PM/Product Lead profile.\n\nWrite a 2-sentence executive summary for a Director/VP-level product leader.\n\nInput:\n- Total experience: [e.g., 6 years]\n- Biggest business impact: [e.g., scaled $2M → $18M ARR]\n- Team/org scale: [e.g., 3 squads, 28 people]\n- Target seniority: [Director / VP / Head of Product]\n\nRequirements:\n- Sentence 1: years + company-scale metric (ARR, team, user base)\n- Sentence 2: strategic strength + domain expertise\n- Vocabulary: scaled, architected, championed, drove\n- No "I" or "my" — Max 55 words`,
    },
  },
  projects: {
    starter: {
      hrQuote:
        "For students, a strong projects section replaces work experience. I don't need a real company — I need to see you define a problem, build something, and measure the outcome. A Figma prototype with 5 test users counts if you frame it right.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
      hrAvatar: "woman",
      aiTitle: "Need to frame your project better?",
      aiSubtext:
        "Use this prompt to turn a raw project description into a compelling, recruiter-ready CV entry.",
      aiPrompt: `Act as an expert CV coach for student PM candidates.\n\nReframe the following project into 3 professional bullet points.\n\nProject details:\n- Name: [e.g., Campus Food Delivery App]\n- What you built: [describe plainly]\n- Your role: [led team / did research / built prototypes]\n- Outcome: [award, test users, % improvement]\n\nRequirements:\n- Bullet 1: what you built + role + scope\n- Bullet 2: process (research, testing, design)\n- Bullet 3: outcome with metric\n- Start each with a strong verb — no "I" or "my"`,
    },
    developing: {
      hrQuote:
        "Projects are underrated by mid-level candidates. A well-framed initiative shows hunger and initiative that standard experience sections often miss. Scannable: problem, what you built, what happened — with numbers.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
      hrAvatar: "man",
      aiTitle: "Want to make your project shine?",
      aiSubtext:
        "Use this prompt to reframe an initiative or side project as a compelling CV entry with measurable impact.",
      aiPrompt: `Act as an expert CV coach for mid-level Product Managers.\n\nReframe the following project as a professional CV entry with 3 bullet points.\n\nContext:\n- Name: [e.g., AI-Powered Onboarding]\n- Problem: [1–2 sentences]\n- Your role: [defined scope / led sprint / coordinated data team]\n- Team: [3 engineers, 1 designer, 1 data scientist]\n- Outcome: [D7 retention +14%, A/B test winner, shipped in 6 weeks]\n\nRequirements:\n- Bullet 1: what shipped + ownership\n- Bullet 2: cross-functional collaboration\n- Bullet 3: measurable impact\n- XYZ formula where possible`,
    },
    ready: {
      hrQuote:
        "At senior level, I expect initiatives, not projects. Tell me the strategic bet you championed, the cross-org investment you secured, the platform you architected. These entries should feel like mini case studies in leadership.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
      hrAvatar: "man",
      aiTitle: "Need to elevate your initiatives?",
      aiSubtext:
        "Use this prompt to frame a project as an executive-grade strategic initiative.",
      aiPrompt: `Act as an executive CV consultant for senior Product leaders.\n\nElevate the following project to a strategic initiative for a Director/VP CV.\n\nContext:\n- Initiative: [e.g., Enterprise Analytics Platform]\n- Business problem: [company scale]\n- Investment: [e.g., $12M R&D, 4 squads, 12 months]\n- Your role: [product vision owner, exec buy-in]\n- Outcome: [200+ enterprise clients, $X ARR]\n\nRequirements:\n- Bullet 1: strategic context + ownership + investment\n- Bullet 2: stakeholder management + cross-org\n- Bullet 3: company/market scale outcome\n- Vocabulary: Architected, Orchestrated, Championed, Secured`,
    },
  },
  header: {
    starter: {
      hrQuote:
        "Don't just write 'Student'. Write 'Aspiring Product Manager' or 'CS Student · PM Track'. It signals intent immediately and helps me route your CV to the right hiring manager — before I've read a single bullet.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
      hrAvatar: "woman",
      aiTitle: "Not sure how to title yourself?",
      aiSubtext:
        "Use this prompt to generate 5 professional title variants tailored to your target role.",
      aiPrompt: `Act as an expert CV coach for early-career tech candidates.\n\nGenerate 5 professional CV title options for a student targeting [TARGET ROLE].\n\nContext:\n- Status: [Final-year CS student / Recent graduate]\n- Target: [Associate PM / Junior Product Manager]\n- Track: [data analytics / B2B SaaS / mobile apps]\n\nRequirements:\n- 3–7 words per title\n- Signals target role clearly\n- Professional (avoid: "Passionate about", "Hard-working")\n- ATS-friendly\n\nBonus: one LinkedIn headline variant (max 120 chars)`,
    },
    developing: {
      hrQuote:
        "I see hundreds of generic 'Product Manager' headers weekly. 'Growth PM — B2B SaaS & Analytics' takes 3 seconds and tells me you're specialised. That specificity alone gets you a second look at 4am screening.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
      hrAvatar: "man",
      aiTitle: "Want a sharper header?",
      aiSubtext:
        "Use this prompt to generate a specialised, role-specific title that stands out in ATS scans.",
      aiPrompt: `Act as an expert CV coach for mid-level Product Managers.\n\nGenerate 5 professional CV title options for a PM with 2–4 years experience.\n\nContext:\n- Current role: [PM at TechCorp]\n- Specialisation: [Growth / Platform / Data / B2B SaaS]\n- Target company: [Series B startup / enterprise SaaS]\n- Target seniority: [Senior PM / Product Lead]\n\nRequirements:\n- Domain-specific — not just "PM"\n- 3–8 words per title\n- 2 variants should include a metric or scope signal\n- ATS-friendly\n\nBonus: LinkedIn headline for the strongest option.`,
    },
    ready: {
      hrQuote:
        "For senior candidates, your header should scream credibility before I read a bullet. 'Senior Product Lead · $18M ARR · Series C' as a subtitle is more powerful than any buzzword summary. Anchor seniority with scope.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
      hrAvatar: "man",
      aiTitle: "Positioning yourself as a senior leader?",
      aiSubtext:
        "Use this prompt to craft an executive header that signals seniority and strategic scope instantly.",
      aiPrompt: `Act as an executive headhunter for senior Product leadership.\n\nCreate a header and subtitle for a Director/VP/Senior Lead CV.\n\nContext:\n- Current title: [Senior PM / Product Lead]\n- Scope indicator: [$18M ARR / Series C / 3 squads]\n- Industry: [B2B SaaS / Fintech / Enterprise]\n- Target: [Director of Product / Head of Product / VP Product]\n\nDeliverables:\n1. Main title (5–8 words, bold positioning)\n2. Subtitle (10–15 words, include scope/metric)\n3. LinkedIn headline (max 120 chars)\n4. One-line email signature tagline`,
    },
  },
  skills: { // Added for new CVSection type
    starter: {
      hrQuote:
        "For entry-level, I look for foundational skills and eagerness to learn. List relevant tools, languages, and any certifications. Don't just say 'proficient' — show me what you've built with them.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
      hrAvatar: "woman",
      aiTitle: "Need help listing your skills?",
      aiSubtext:
        "Use this prompt to generate a structured list of skills relevant to your target role.",
      aiPrompt: `Act as an expert CV coach for entry-level tech candidates.\n\nGenerate a list of 5-7 key skills for a [TARGET ROLE] candidate.\n\nContext:\n- Target role: [e.g., Associate Product Manager]\n- Key projects/coursework: [e.g., built a mobile app, took data science course]\n- Tools/languages you know: [e.g., Python, SQL, Figma]\n\nRequirements:\n- Categorize skills (e.g., Technical, Product, Soft)\n- Include 1-2 examples of how you applied each skill if possible.\n- Focus on skills directly relevant to the target role.`,
    },
    developing: {
      hrQuote:
        "Mid-level skills should demonstrate depth and application. Instead of just listing 'SQL', tell me 'SQL for A/B testing and data analysis'. Show me how your skills drive product outcomes.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
      hrAvatar: "man",
      aiTitle: "Want to showcase your skills effectively?",
      aiSubtext:
        "Use this prompt to refine your skills section, highlighting practical application and impact.",
      aiPrompt: `Act as an expert CV coach for mid-level Product Managers.\n\nRefine the following skills list to highlight practical application and impact for a [TARGET SENIORITY] role.\n\nContext:\n- Current skills: [e.g., SQL, Jira, Agile, User Research]\n- Target seniority: [e.g., Senior PM / Product Lead]\n- Key achievements: [e.g., improved feature adoption by 15% using A/B testing]\n\nRequirements:\n- For each skill, add a brief phrase demonstrating its application or impact.\n- Group related skills (e.g., Product Management Tools, Data Analysis).\n- Remove generic skills; focus on those that differentiate you.`,
    },
    ready: {
      hrQuote:
        "At senior level, skills are less about individual tools and more about strategic capabilities. 'Leadership', 'Cross-functional Alignment', 'Market Analysis' — these are the skills that matter. Frame them with business context.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
      hrAvatar: "man",
      aiTitle: "Elevate your skills to a strategic level?",
      aiSubtext:
        "Use this prompt to transform your skills section into a strategic capabilities overview for executive roles.",
      aiPrompt: `Act as an executive headhunter for senior Product leadership.\n\nTransform the following skills into a strategic capabilities overview for a Director/VP-level CV.\n\nContext:\n- Current skills: [e.g., Product Strategy, Team Leadership, Go-to-Market, P&L Management]\n- Target role: [e.g., VP Product / Head of Product]\n- Key leadership experiences: [e.g., led a team of 10 PMs, launched 3 new product lines]\n\nRequirements:\n- Rephrase skills as strategic capabilities (e.g., 'Product Strategy' -> 'Architecting Product Vision & Strategy').\n- For each capability, provide a brief, high-level example of impact or scope.\n- Focus on leadership, business acumen, and organizational influence.`,
    },
  },
  education: { // Added for new CVSection type
    starter: {
      hrQuote:
        "For students, education is paramount. List your degree, university, graduation date, and any relevant coursework or honors. If your GPA is strong, include it!",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
      hrAvatar: "woman",
      aiTitle: "Need to optimize your education section?",
      aiSubtext:
        "Use this prompt to ensure your academic achievements are presented clearly and effectively.",
      aiPrompt: `Act as an expert CV coach for entry-level tech candidates.\n\nOptimize the following education details for a student CV.\n\nContext:\n- Degree: [e.g., Bachelor of Science in Computer Science]\n- University: [e.g., VinUniversity]\n- Graduation Date: [e.g., May 2025]\n- GPA: [e.g., 3.8/4.0]\n- Relevant Coursework: [e.g., Data Structures, Algorithms, Product Design]\n- Honors/Awards: [e.g., Dean's List, Scholarship Recipient]\n\nRequirements:\n- Present information concisely and clearly.\n- Highlight relevant coursework and academic achievements.\n- Include GPA if it's strong (3.5+).`,
    },
    developing: {
      hrQuote:
        "For mid-level, education is still important but less prominent than experience. Keep it concise: Degree, University, Year. Only add details if they directly support your career trajectory or specializations.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
      hrAvatar: "man",
      aiTitle: "How to best present your education?",
      aiSubtext:
        "Use this prompt to condense your education section for a mid-level CV, focusing on relevance.",
      aiPrompt: `Act as an expert CV coach for mid-level Product Managers.\n\nCondense the following education details for a mid-level CV.\n\nContext:\n- Degree: [e.g., Master of Business Administration]\n- University: [e.g., National University of Singapore]\n- Graduation Date: [e.g., 2020]\n- Thesis/Specialization: [e.g., Product Innovation in Fintech]\n\nRequirements:\n- Keep it to 1-2 lines per degree.\n- Include degree, university, and graduation year.\n- Only add thesis or specialization if highly relevant to target roles.`,
    },
    ready: {
      hrQuote:
        "At senior level, education is a formality. List your highest degree and institution. Executive education or relevant certifications can be included if they bolster your leadership profile.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
      hrAvatar: "man",
      aiTitle: "Streamline your education for executive roles?",
      aiSubtext:
        "Use this prompt to create a minimalist yet impactful education entry for a senior-level CV.",
      aiPrompt: `Act as an executive headhunter for senior Product leadership.\n\nStreamline the following education details for a Director/VP-level CV.\n\nContext:\n- Highest Degree: [e.g., PhD in AI Ethics]\n- Institution: [e.g., Stanford University]\n- Year: [e.g., 2015]\n- Executive Education: [e.g., Harvard Business School Executive Program]\n\nRequirements:\n- List only highest degree and institution.\n- Include relevant executive education or certifications that enhance leadership credibility.\n- Keep it extremely concise.`,
    },
  },
  awards: {
    starter: {
      hrQuote: "At the starter level, relevant awards establish credibility and highlight excellence. Focus on scholarships, hackathons, or academic honors.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
      hrAvatar: "woman",
      aiTitle: "How to showcase your academic honors?",
      aiSubtext: "Use this prompt to cleanly present your awards, focusing on context and selectivity.",
      aiPrompt: "Act as a CV coach for an entry-level tech candidate.\n\nFormat the following award/honor to be clean and impactful:\n- Award Name: [e.g., First Place Hackathon]\n- Issuer: [e.g., Tech Startup Club]\n- Date: [e.g., 2023]\n- Context/Description (optional): [e.g., Out of 50 teams, built an AI tool in 48 hours]\n\nRequirements:\n- Emphasize the prestige or selectivity if notable.\n- Keep description under 1 short sentence.",
    },
    developing: {
      hrQuote: "For mid-level, only include awards that are highly relevant to your career or showcase exceptional leadership/technical recognition.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
      hrAvatar: "man",
      aiTitle: "Which awards matter now?",
      aiSubtext: "Use this prompt to curate and format professional awards that highlight your growing domain expertise.",
      aiPrompt: "Act as an expert CV writer for mid-level tech professionals.\n\nCondense and impact-focus the following professional recognition:\n- Award Name: [e.g., Q3 Innovator Award]\n- Issuer: [e.g., Company Name]\n- Date: [e.g., 2022]\n- Description: [e.g., Recognized for migrating core services with zero downtime]\n\nRequirements:\n- Focus entirely on the professional outcome that earned the award.\n- Keep it highly concise (1 line max).",
    },
    ready: {
      hrQuote: "At the senior level, awards should represent industry-wide recognition, major patents, or significant structural contributions. Omit standard internal awards.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
      hrAvatar: "man",
      aiTitle: "Highlighting industry recognition?",
      aiSubtext: "Use this prompt to frame executive-level accolades or major industry patents.",
      aiPrompt: "Act as an executive headhunter.\n\nRefine the following major accolade/patent for a Director-level CV:\n- Title: [e.g., Patent: Machine Learning method for X]\n- Issuer/Organization: [e.g., US Patent Office]\n- Year: [e.g., 2021]\n- Impact: [e.g., Deployed across enterprise serving 2M users]\n\nRequirements:\n- Make it sound executive and industry-leading.\n- Keep it to a single, powerful line.",
    },
  },
  activities: {
    starter: {
      hrQuote: "Extracurriculars are vital for students. They show me you can collaborate, take initiative, and manage time. Leadership roles in clubs are a massive plus.",
      hrName: "Sarah Thompson",
      hrRole: "HR Lead",
      hrCompany: "shopee",
      hrAvatar: "woman",
      aiTitle: "Maximizing club involvement?",
      aiSubtext: "Use this prompt to turn club participation into a demonstration of soft skills and leadership.",
      aiPrompt: "Act as an expert CV coach for entry-level tech candidates.\n\nReframe the following extracurricular activity into 1-2 professional bullet points:\n- Organization: [e.g., University Tech Club]\n- Role: [e.g., Event Coordinator]\n- Dates: [e.g., 2023-2024]\n- What you did: [e.g., Organized 3 workshops, managed social media, grew membership by 20%]\n\nRequirements:\n- Use strong action verbs.\n- Treat this like professional experience, focusing on numbers, leadership, and outcomes.",
    },
    developing: {
      hrQuote: "If you include activities at the mid-level, they better be relevant community contributions. Think open-source maintainer, meetup organizer, or tech speaker.",
      hrName: "Marcus Lee",
      hrRole: "Tech Lead",
      hrCompany: "google",
      hrAvatar: "man",
      aiTitle: "Curating your professional community work?",
      aiSubtext: "Use this prompt to format relevant community leadership and open-source contributions.",
      aiPrompt: "Act as an expert CV writer for mid-level professionals.\n\nFormat the following community involvement into a professional entry:\n- Organization/Project: [e.g., ReactJS Vietnam Group]\n- Role/Contribution: [e.g., Core Contributor / Speaker]\n- Dates: [e.g., 2022 - Present]\n- Impact: [e.g., Spoke at 2 meetups for 200+ devs]\n\nRequirements:\n- Emphasize knowledge sharing and community impact.\n- Keep it highly scannable.",
    },
    ready: {
      hrQuote: "For senior leaders, activities usually mean board memberships, advisory roles, or high-profile industry speaking engagements. Everything else is noise.",
      hrName: "David Kim",
      hrRole: "VP Engineering",
      hrCompany: "scaleup",
      hrAvatar: "man",
      aiTitle: "Structuring board and advisory roles?",
      aiSubtext: "Use this prompt to present your executive-level community and advisory engagements.",
      aiPrompt: "Act as an executive CV consultant.\n\nFrame the following advisory or board role for a senior leader's CV:\n- Entity: [e.g., Tech Startup Hub / Non-Profit]\n- Role: [e.g., Advisory Board Member]\n- Dates: [e.g., 2020 - Present]\n- Contribution: [e.g., Mentored 5 startup founders on product strategy]\n\nRequirements:\n- Highlight strategic guidance and mentorship.\n- Keep it sophisticated and concise.",
    },
  },
};

// ─── Transform Bullet Component ───────────────────────────────────────────────

function TransformBullet({
  section,
  stages,
  stageIndex,
}: {
  section: CVSection;
  stages: [Stage, Stage, Stage, Stage];
  stageIndex: number;
}) {
  // CRITICAL CRASH FIX: Guard against malformed or missing stages data
  const safeStages = Array.isArray(stages) && stages.length > 0 ? stages : [[{ id: "fallback", text: "Loading representation..." } as TextSeg]];
  const safeIndex = Math.min(Math.max(0, stageIndex), safeStages.length - 1);
  const currentStage = safeStages[safeIndex];
  
  const isBad = stageIndex === 0;
  const isFinal = stageIndex >= 3;
  const containerRef = useRef<HTMLSpanElement>(null);
  const prevIndexRef = useRef(stageIndex);
  
  // Safe mapping to prevent "cannot read properties of undefined (reading map)"
  const currentIds = Array.isArray(currentStage) ? currentStage.map((s) => s?.id || "") : [];
  const prevIdsRef = useRef(new Set(currentIds));

  useEffect(() => {
    if (stageIndex === prevIndexRef.current) return;
    if (!Array.isArray(currentStage)) return;
    
    const newIds = new Set(currentStage.map((s) => s?.id || ""));
    const addedIds = [...newIds].filter((id) => !prevIdsRef.current.has(id));

    if (containerRef.current && addedIds.length > 0) {

      // Small delay ensures DOM has updated
      requestAnimationFrame(() => {
        addedIds.forEach((id) => {
          if (!containerRef.current) return;
          const span = containerRef.current.querySelector(`[data-seg="${id}"]`);
          if (span) {
            const flash = span.getAttribute("data-flash");
            const cls =
              flash === "green" ? "seg-flash-green" : "seg-flash-blue";
            span.classList.remove("seg-flash-blue", "seg-flash-green");
            // Force reflow to restart animation
            void (span as HTMLElement).offsetWidth;
            span.classList.add(cls);
          }
        });
      });
    }

    prevIndexRef.current = stageIndex;
    prevIdsRef.current = newIds;
  }, [stageIndex, currentStage]);

  const isTitleStyle = section === "header";
  const isTextStyle = section === "summary";

  return (
    <>
      <div
        style={{
          borderRadius: 9,
          padding: "10px 14px 12px",
          background: isBad
            ? "#FFF5F5"
            : isFinal
              ? "rgba(22,163,74,0.04)"
              : "rgba(14,86,250,0.03)",
          border: `1.5px solid ${isBad ? "#FECACA" : isFinal ? "#BBF7D0" : "#DBEAFE"}`,
          marginBottom: isBad ? 6 : 10,
          position: "relative",
          transition: "background 0.5s, border-color 0.5s",
        }}
      >
        {/* Stage badge */}
        <div
          style={{
            position: "absolute",
            top: -11,
            left: 10,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              padding: "2px 9px",
              borderRadius: 99,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: isBad ? "#FEE2E2" : isFinal ? "#DCFCE7" : "#DBEAFE",
              color: isBad ? "#dc2626" : isFinal ? "#16a34a" : "#0E56FA",
              border: `1px solid ${isBad ? "#FECACA" : isFinal ? "#BBF7D0" : "#BFDBFE"}`,
            }}
          >
            {isBad ? "❌ Bad CV" : isFinal ? "✅ Perfect" : "✏️ Improving..."}
          </span>
        </div>

        {/* Bullet content */}
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "flex-start",
            paddingTop: isTitleStyle ? 2 : 4,
          }}
        >
          {!isTitleStyle && !isTextStyle && (
            <span
              style={{
                fontSize: 9.5,
                color: isBad ? "#ef4444" : isFinal ? "#16a34a" : "#0E56FA",
                fontWeight: 700,
                marginTop: 2,
                flexShrink: 0,
                transition: "color 0.4s",
              }}
            >
              ▸
            </span>
          )}
          <span
            ref={containerRef}
            style={{
              fontSize: isTitleStyle ? 13 : 11.5,
              fontWeight: isTitleStyle ? 700 : 400,
              lineHeight: 1.6,
              color: isBad ? "#ef4444" : "#01001F",
              letterSpacing: isTitleStyle ? "-0.02em" : "-0.01em",
              transition: "color 0.4s",
              display: "block",
            }}
          >
            {currentStage.map((seg) => {
              const segColor = isBad
                ? "#ef4444"
                : seg.flash === "blue"
                  ? "#0E56FA"
                  : seg.flash === "green"
                    ? "#16a34a"
                    : "#01001F";
              return (
                <span
                  key={seg.id}
                  data-seg={seg.id}
                  data-flash={seg.flash || ""}
                  style={{
                    color: segColor,
                    fontWeight: seg.flash ? 700 : isBad ? 500 : 400,
                  }}
                >
                  {seg.text}
                </span>
              );
            })}
          </span>
        </div>
      </div>

      {/* FIX 2 — Contextual guide hint below BAD CV box */}
      {isBad && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            marginTop: 0,
            marginBottom: 10,
            padding: "6px 12px",
            borderRadius: 99,
            background: "#FEF9C3",
            border: "1px solid #FDE68A",
          }}
        >
          <span style={{ fontSize: 13, lineHeight: 1, flexShrink: 0 }}>💡</span>
          <span
            style={{
              fontSize: 12,
              color: "#92400E",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            This is a common weak bullet. Use the checklist on the right to see what makes it stronger →
          </span>
        </div>
      )}
    </>
  );
}

// ─── Spotlight Tour ───────────────────────────────────────────────────────────

function SpotlightTour({
  step,
  onNext,
  onSkip,
}: {
  step: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const [dims, setDims] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1200,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const fn = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const { w, h } = dims;

  const [spots, setSpots] = useState(() => [
    // Default fallbacks while DOM measures
    { x: 0, y: 68, sw: Math.floor(dims.w / 2), sh: dims.h - 68 },
    { x: Math.floor(dims.w / 2), y: 68, sw: dims.w - Math.floor(dims.w / 2), sh: Math.round((dims.h - 68) * 0.62) },
    { x: Math.floor(dims.w / 2), y: 68 + Math.round((dims.h - 68) * 0.62), sw: dims.w - Math.floor(dims.w / 2), sh: Math.round((dims.h - 68) * 0.38) }
  ]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const half = Math.floor(w / 2);
      const navH = 68;

      const newSpots = [
        { x: 0, y: navH, sw: half, sh: h - navH },
        { x: half, y: navH, sw: w - half, sh: Math.round((h - navH) * 0.62) },
        { x: half, y: navH + Math.round((h - navH) * 0.62), sw: w - half, sh: Math.round((h - navH) * 0.38) }
      ];

      const chk = document.getElementById("tour-checklist");
      if (chk) {
        const rect = chk.getBoundingClientRect();
        newSpots[1] = { x: rect.left - 16, y: rect.top - 16, sw: rect.width + 32, sh: rect.height + 32 };
      }

      const prmpt = document.getElementById("tour-prompt");
      if (prmpt) {
        const rect = prmpt.getBoundingClientRect();
        // The bottom card should be properly framed
        newSpots[2] = { x: rect.left - 16, y: rect.top - 16, sw: rect.width + 32, sh: rect.height + 32 };
      }

      setSpots(newSpots);
    };

    update();
    // Use a small timeout to let the entrance animations settle before measuring DOM
    setTimeout(update, 350);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [step]);


  const HALF = Math.floor(w / 2);
  const tooltips = [
    // Step 0: Spotlight on LEFT CV panel → show tooltip card in the RIGHT side
    { tx: HALF + 24, ty: Math.round(h * 0.28) },
    // Step 1: Spotlight on RIGHT top (checklist) → show tooltip card on the LEFT side
    { tx: 20, ty: Math.round(h * 0.28) },
    // Step 2: Spotlight on RIGHT bottom (AI prompt) → show tooltip card on the LEFT side
    { tx: 20, ty: Math.round(h * 0.30) },
  ];

  if (step < 0 || step >= TOUR_CONTENT.length || !spots[step] || !tooltips[step]) {
    return null;
  }

  const { x, y, sw, sh } = spots[step];
  const { tx, ty } = tooltips[step];
  const content = TOUR_CONTENT[step];
  const isLast = step === 2;
  const DIM = "rgba(1,0,31,0.82)";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999 }}
    >
      {/* 4-panel dim overlay around the spotlight hole */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: y,
          background: DIM,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: y + sh,
          left: 0,
          right: 0,
          bottom: 0,
          background: DIM,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: y,
          left: 0,
          width: x,
          height: sh,
          background: DIM,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: y,
          left: x + sw,
          right: 0,
          height: sh,
          background: DIM,
        }}
      />

      {/* Spotlight glow ring */}
      <motion.div
        key={`ring-${step}`}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute",
          top: y - 5,
          left: x - 5,
          width: sw + 10,
          height: sh + 10,
          borderRadius: 16,
          border: "2.5px solid rgba(14,86,250,0.85)",
          boxShadow:
            "0 0 0 6px rgba(14,86,250,0.12), 0 0 48px rgba(14,86,250,0.3)",
          pointerEvents: "none",
        }}
      />

      {/* Tooltip card */}
      <motion.div
        key={`tip-${step}`}
        initial={{ opacity: 0, scale: 0.88, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.25,
          type: "spring",
          stiffness: 480,
          damping: 30,
        }}
        style={{
          position: "absolute",
          left: Math.max(12, Math.min(tx, w - 332)),
          top: Math.max(8, Math.min(ty, h - 230)),
          width: 308,
          padding: "18px 20px 16px",
          borderRadius: 16,
          background: "white",
          boxShadow:
            "0 8px 52px rgba(1,0,31,0.4), 0 2px 10px rgba(1,0,31,0.12)",
          zIndex: 10000,
        }}
      >
        {/* Progress pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginBottom: 13,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                height: 5,
                width: i === step ? 22 : 6,
                borderRadius: 99,
                background:
                  i < step ? "#16a34a" : i === step ? "#0E56FA" : "#17CAFA",
                transition: "all 0.3s",
              }}
            />
          ))}
          <span
            style={{
              marginLeft: "auto",
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: "0.03em",
            }}
          >
            {step + 1} / 3
          </span>
        </div>

        <h3
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: "#01001F",
            letterSpacing: "-0.03em",
            margin: "0 0 7px",
          }}
        >
          {content.title}
        </h3>
        <p
          style={{
            fontSize: 12.5,
            color: "#01001F",
            lineHeight: 1.63,
            margin: "0 0 16px",
            letterSpacing: "-0.01em",
          }}
        >
          {content.description}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={onSkip}
            style={{
              fontSize: 11,
              color: "#94a3b8",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontWeight: 500,
            }}
          >
            Skip
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onNext}
            style={{
              padding: "7px 20px",
              borderRadius: 9,
              background: isLast ? "#16a34a" : "#0E56FA",
              color: "white",
              border: "none",
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "-0.01em",
              boxShadow: isLast
                ? "0 3px 14px rgba(22,163,74,0.45)"
                : "0 3px 14px rgba(14,86,250,0.45)",
            }}
          >
            {content.buttonText}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Level Switcher ───────────────────────────────────────────────────────────

function LevelSwitcher({
  level,
  onChange,
}: {
  level: DiagnosticLevel;
  onChange: (l: DiagnosticLevel) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        background: "#FFFFFF",
        borderRadius: 10,
        padding: 3,
        gap: 2,
      }}
    >
      {LEVEL_OPTS.map((opt) => {
        const active = level === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 14px",
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              background: "none",
              border: "none",
              color: active ? "white" : "#01001F",
              zIndex: 1,
              outline: "none",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              transition: "color 0.15s",
            }}
          >
            {active && (
              <motion.div
                layoutId="ws3level"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#0E56FA",
                  borderRadius: 7,
                  zIndex: -1,
                  boxShadow: "0 2px 10px rgba(14,86,250,0.32)",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            {opt.emoji} {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Top Navbar ───────────────────────────────────────────────────────────────

function TopNav({
  level,
  onSetLevel,
  onBack,
  selectedRole,
}: {
  level: DiagnosticLevel;
  onSetLevel: (l: DiagnosticLevel) => void;
  onBack?: () => void;
  selectedRole?: string | null;
}) {
  return (
    <div
      style={{
        height: 56,
        background: "white",
        borderBottom: "1px solid #E8EDF5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        flexShrink: 0,
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        position: "relative",
        zIndex: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
        {/* Back button */}
        {onBack && (
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#F8FAFC",
              border: "1px solid #17CAFA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              marginRight: 4,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="#01001F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        )}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
          }}
        >
          <img src="/favicon.svg" alt="Project X Logo" style={{ width: 18, height: 18, objectFit: "contain" }} />
        </div>
        <div
          style={{ width: 1, height: 16, background: "#17CAFA", flexShrink: 0 }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#01001F",
            letterSpacing: "-0.02em",
          }}
        >
          Career Survival Kit
        </span>
        {selectedRole && (
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#01001F",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ margin: "0 6px", color: "#CBD5E1" }}>/</span>
            {selectedRole}
          </span>
        )}
        <div
          style={{
            marginLeft: 6,
            padding: "2px 9px",
            borderRadius: 99,
            background: "rgba(14,86,250,0.07)",
            border: "1px solid rgba(14,86,250,0.13)",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#0E56FA",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Step 2 of 3
          </span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
      </div>
    </div>
  );
}

// ─── CV Section Block ─────────────────────────────────────────────────────────

function CVSectionBlock({
  id,
  isActive,
  isHovered,
  onHover,
  onClick,
  children,
}: {
  id: CVSection;
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: CVSection | null) => void;
  onClick: (id: CVSection, rect: DOMRect) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      data-cv-section={id}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => onClick(id, e.currentTarget.getBoundingClientRect())}
      style={{
        position: "relative",
        borderRadius: 8,
        cursor: "pointer",
        padding: "12px 14px",
        border: isActive
          ? "1.5px solid #0E56FA"
          : isHovered
            ? "1.5px solid #BFDBFE"
            : "1.5px solid transparent",
        background: isActive
          ? "rgba(14,86,250,0.04)"
          : isHovered
            ? "rgba(14,86,250,0.015)"
            : "transparent",
        transition: "all 0.18s",
        marginBottom: 10,
      }}
    >
      {isActive && (
        <div style={{ position: "absolute", top: -10, right: 10 }}>
          <span
            style={{
              fontSize: 8.5,
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: 99,
              background: "#0E56FA",
              color: "white",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Selected
          </span>
        </div>
      )}
      {isHovered && !isActive && (
        <div style={{ position: "absolute", top: -10, right: 10 }}>
          <span
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 99,
              background: "#E0EAFF",
              color: "#0E56FA",
            }}
          >
            Click to explore
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

function SectionDivider({ text, active }: { text: string; active?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: "0.14em",
          color: active ? "#0E56FA" : "#94a3b8",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          transition: "color 0.2s",
        }}
      >
        {text}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: active
            ? "linear-gradient(90deg, #BFDBFE 0%, transparent 100%)"
            : "#FFFFFF",
          transition: "background 0.2s",
        }}
      />
    </div>
  );
}

// ─── Left CV Column ───────────────────────────────────────────────────────────



// ─── HR Quote Floating Bubble ──────────────────────────────────────────────────

function HRQuoteBubble({
  section,
  level,
  selectedRole,
  anchorRect,
  isMobile,
}: {
  section: CVSection;
  level: DiagnosticLevel;
  selectedRole: string | null;
  anchorRect: DOMRect | null;
  isMobile: boolean;
}) {
  const data = PANEL_DATA[section] ? PANEL_DATA[section][level] : PANEL_DATA["experience"][level];
  const roleData = getRoleLevelData(selectedRole, level);
  const hrQuote =
    (roleData as any).hrQuotes?.[section] ||
    (roleData as any).hrQuote ||
    data.hrQuote;
  const hrName = roleData.hrName;
  const hrRole = roleData.hrRole;
  const hrCompany = roleData?.hrCompany || "expert";
  const companyInfo = COMPANY_INFO[hrCompany] || COMPANY_INFO.expert;

  // ── Position calculation (FIX 1 + FIX 3) ──────────────────────────────────
  const BUBBLE_WIDTH = 440;
  const BUBBLE_APPROX_HEIGHT = 220;
  const GAP = 16;

  let fixedStyle: React.CSSProperties = {};

  if (isMobile) {
    // FIX 5 — Mobile bottom sheet
    fixedStyle = {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      borderRadius: "16px 16px 0 0",
      zIndex: 9999,
    };
  } else if (anchorRect) {
    // Position bubble to the right of the clicked CV section
    let top = anchorRect.top + window.scrollY;
    const cvPanelRightEdge = anchorRect.right;
    let left = cvPanelRightEdge + GAP;

    // Clamp: if bubble goes off the right edge, flip to left side of CV panel
    if (left + BUBBLE_WIDTH > window.innerWidth - 8) {
      left = Math.max(8, anchorRect.left - BUBBLE_WIDTH - GAP);
    }
    // Clamp: if bubble bottom goes off bottom of viewport, shift up
    if (top + BUBBLE_APPROX_HEIGHT > window.scrollY + window.innerHeight - 8) {
      top = window.scrollY + window.innerHeight - BUBBLE_APPROX_HEIGHT - 8;
    }
    // Clamp: don't go above viewport
    if (top < window.scrollY + 8) top = window.scrollY + 8;

    fixedStyle = {
      position: "fixed",
      top: top - window.scrollY,
      left,
      width: BUBBLE_WIDTH,
      zIndex: 9999,
      transition: "top 200ms ease, left 200ms ease",
    };
  } else {
    // Fallback: bottom-left corner (pre-click)
    fixedStyle = {
      position: "fixed",
      bottom: 24,
      left: 24,
      width: BUBBLE_WIDTH,
      zIndex: 9999,
    };
  }

  // FIX 5 — Mobile: slide-up animation; desktop: scale-in animation
  const initial = isMobile
    ? { opacity: 0, y: "100%" as unknown as number }
    : { opacity: 0, y: 12, scale: 0.96 };
  const animate = isMobile
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={isMobile ? { opacity: 0, y: "100%" as unknown as number } : { opacity: 0, scale: 0.96, y: 12 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      style={{
        ...fixedStyle,
        borderRadius: isMobile ? "16px 16px 0 0" : 16,
        border: "1px solid rgba(226, 232, 240, 0.8)",
        background: "white",
        padding: "20px 22px",
        boxShadow: "0 12px 40px rgba(2, 8, 24, 0.08), 0 4px 12px rgba(2, 8, 24, 0.04)",
      }}
    >
      {/* Speech bubble tail */}
      <div 
        style={{
          position: 'absolute',
          top: -10,
          left: 36,
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '11px solid white',
          filter: 'drop-shadow(0 -2px 1px rgba(0,0,0,0.05))'
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: "2px solid #F8FAFC",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
        >
          <img
            src={data.hrAvatar === "man" ? AVATAR_MAN : AVATAR_WOMAN}
            alt={hrName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 3,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.01em",
              }}
            >
              {hrName}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 8px 3px 6px",
                borderRadius: 6,
                background: companyInfo.color,
                boxShadow: `0 2px 8px ${companyInfo.color}40`,
              }}
            >
              <Building2
                size={10}
                color={companyInfo.textColor}
                strokeWidth={2.5}
                style={{ opacity: 0.9 }}
              />
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: 800,
                  color: companyInfo.textColor,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {companyInfo.name}
              </span>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: "#01001F", fontWeight: 500 }}>
            {hrRole}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            borderRadius: 8,
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#16a34a",
              boxShadow: "0 0 0 2px rgba(22,163,74,0.2)"
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#16a34a",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Verified
          </span>
        </div>
      </div>
      
      <div style={{ position: "relative" }}>
        <p
          style={{
            fontSize: 13.5,
            color: "#01001F",
            lineHeight: 1.6,
            margin: 0,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
          }}
        >
          "{hrQuote}"
        </p>
      </div>
    </motion.div>
  );
}

// Maps a role string to a key inside EXPANDED_CV_TEMPLATES.
// Routes every role to the correct personalized CV bucket.
const getCVTemplateKey = (role: string | null): string => {
  const safeRole = role || "";

  // ── Explicit role-name mappings (Screen1Pillars roles) ──────────────────────
  const ROLE_MAP: Record<string, string> = {
    "Frontend Engineer":    "Software Engineering (SWE)",
    "Backend Engineer":     "Software Engineering (SWE)",
    "Full Stack Dev":       "Software Engineering (SWE)",
    "Full-Stack Dev":       "Software Engineering (SWE)",
    "Mobile Dev":           "Software Engineering (SWE)",
    "DevOps":               "Cloud Engineering / DevOps",
    "Product Management (PM)": "Product Management (PM)",
    "Product Growth / Growth PM": "Product Growth / Growth PM",
    "Business Analytics (BA)": "Business Analytics (BA)",
    "UI/UX / Product Design": "UI/UX / Product Design",
    "Sales Engineer":       "Business Development (Tech Industry)",
    "Solutions Architect":  "Software Engineering (SWE)",
    "Partnerships Lead":    "Business Development (Tech Industry)",
    "Operations":           "Operations (Tech Operations / Process Automation)",
    "AI/ML Engineer":       "Artificial Intelligence (AI) / Machine Learning (ML)",
    "AI Product Manager":   "Artificial Intelligence (AI) / Machine Learning (ML)",
    "Prompt Engineer":      "Artificial Intelligence (AI) / Machine Learning (ML)",
    "Data Scientist":       "Data Analytics (DA) & Business Intelligence (BI)",
  };
  if (ROLE_MAP[safeRole]) return ROLE_MAP[safeRole];

  // ── Generic fallback by keyword ──────────────────────────────────────────────
  if (safeRole.includes("AI") || safeRole.includes("Machine Learning") || safeRole.includes("Data Engineering"))
    return "Artificial Intelligence (AI) / Machine Learning (ML)";
  if (safeRole.includes("Data") || safeRole.includes("Analytics") || safeRole.includes("Business Intelligence"))
    return "Data Analytics (DA) & Business Intelligence (BI)";
  if (safeRole.includes("Cloud") || safeRole.includes("DevOps"))
    return "Cloud Engineering / DevOps";
  if (safeRole.includes("Engineer") || safeRole.includes("SWE") || safeRole.includes("Developer") || safeRole.includes("Dev"))
    return "Software Engineering (SWE)";
  if (safeRole.includes("Growth"))
    return "Product Growth / Growth PM";
  if (safeRole.includes("UI") || safeRole.includes("UX") || safeRole.includes("Design"))
    return "UI/UX / Product Design";
  if (safeRole.includes("Business Development"))
    return "Business Development (Tech Industry)";
  if (safeRole.includes("Marketing"))
    return "Digital Marketing (Tech-focused)";
  if (safeRole.includes("Operations") || safeRole.includes("Process"))
    return "Operations (Tech Operations / Process Automation)";
  if (safeRole.includes("Project"))
    return "Project Management (Tech Projects)";
  if (safeRole.includes("Business Analytics") || safeRole.includes("BA"))
    return "Business Analytics (BA)";
  return "Product Management (PM)";
};
// Keep old name as alias for any external consumers
const getTrackForRole = getCVTemplateKey;

function LeftCVColumn({
  level,
  activeSection,
  hoveredSection,
  onHover,
  onActivate,
  checks,
  selectedRole,
}: {
  level: DiagnosticLevel;
  activeSection: CVSection;
  hoveredSection: CVSection | null;
  onHover: (id: CVSection | null) => void;
  /** Call with CVSection id AND the DOMRect of the clicked element */
  onActivate: (id: CVSection, rect: DOMRect) => void;
  checks: [boolean, boolean, boolean];
  selectedRole: string | null;
}) {
  const cvKey = getCVTemplateKey(selectedRole);
  // EXPANDED_CV_TEMPLATES is keyed by exact role name - look it up directly first
  const cv: CVData = (EXPANDED_CV_TEMPLATES[selectedRole || ""]?.[level])
    ?? (EXPANDED_CV_TEMPLATES[cvKey]?.[level])
    ?? generateFallbackCV(selectedRole || "Product Manager", level);
  const TRANSFORM = TRANSFORM_TEMPLATES[cvKey] ?? TRANSFORM_TEMPLATES["Product Management (PM)"];
  const roleData = getRoleLevelData(selectedRole, level);
  const stageIndex = checks.filter(Boolean).length;

  const ACTION_VERBS = new Set([
    "led",
    "built",
    "conducted",
    "presented",
    "assisted",
    "attended",
    "redesigned",
    "created",
    "defined",
    "shipped",
    "prioritised",
    "analysed",
    "coordinated",
    "designed",
    "collaborated",
    "optimised",
    "spearheaded",
    "orchestrated",
    "championed",
    "drove",
    "owned",
    "architected",
    "secured",
  ]);

  const renderHighlighted = (text: string): React.ReactNode =>
    text.split(/(\s+)/).map((tok, i) => {
      if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
      const clean = tok.replace(/[.,;:!?()\-]+$/g, "").toLowerCase();
      const isVerb = ACTION_VERBS.has(clean);
      const isMet = /\d|%|\$|£|K\+|M\+/.test(tok);
      return (
        <span
          key={i}
          style={{
            color: isVerb ? "#0E56FA" : isMet ? "#16a34a" : "#01001F",
            fontWeight: isVerb || isMet ? 700 : 400,
          }}
        >
          {tok}
        </span>
      );
    });

  return (
    <>
      <style>{`
        .cv-left-scroll::-webkit-scrollbar { width: 6px; }
        .cv-left-scroll::-webkit-scrollbar-track { background: #FFFFFF; border-radius: 99px; margin: 8px 0; }
        .cv-left-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
        .cv-left-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        @keyframes segFlashBlue {
          0%   { background-color: #0E56FA; color: white; border-radius: 4px; padding: 1px 4px; }
          45%  { background-color: rgba(14,86,250,0.18); color: #0E56FA; border-radius: 4px; padding: 1px 4px; }
          100% { background-color: rgba(0, 0, 0, 0); padding: 0; }
        }
        @keyframes segFlashGreen {
          0%   { background-color: #16a34a; color: white; border-radius: 4px; padding: 1px 4px; }
          45%  { background-color: rgba(22,163,74,0.18); color: #16a34a; border-radius: 4px; padding: 1px 4px; }
          100% { background-color: rgba(0, 0, 0, 0); padding: 0; }
        }
        .seg-flash-blue  { animation: segFlashBlue  1.3s ease forwards; }
        .seg-flash-green { animation: segFlashGreen 1.3s ease forwards; }
      `}</style>

      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        className="cv-left-scroll"
        style={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          background: "#FFFFFF",
          borderRight: "1px solid #17CAFA",
          padding: "28px 24px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Instruction chip */}
        <div
          style={{
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 99,
            background: "white",
            border: "1px solid #17CAFA",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#0E56FA",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 11, fontWeight: 500, color: "#01001F" }}>
            Click any section → check items on the right → watch it transform ✨
          </span>
        </div>

        {/* A4 Paper */}
        <div
          style={{
            background: "white",
            width: "100%",
            maxWidth: 520,
            border: "1px solid #17CAFA",
            borderRadius: 6,
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.07), 0 24px 56px rgba(0,0,0,0.07)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              height: 3,
              background: "linear-gradient(90deg, #01001F 0%, #0E56FA 100%)",
            }}
          />
          <div style={{ padding: "26px 32px 32px" }}>
            {/* ── HEADER ── */}
            <CVSectionBlock
              id="header"
              isActive={activeSection === "header"}
              isHovered={hoveredSection === "header"}
              onHover={onHover}
              onClick={onActivate}
            >
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#01001F",
                  letterSpacing: "-0.04em",
                  marginBottom: 3,
                }}
              >
                {cv.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#01001F",
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                {roleData.cvTitle}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {[
                  { icon: Mail, text: cv.email },
                  { icon: MapPin, text: cv.location },
                  { icon: ExternalLink, text: cv.linkedin },
                ].map(({ icon: Icon, text }, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Icon size={9} color="#94a3b8" strokeWidth={2} />
                    <span style={{ fontSize: 10, color: "#01001F" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
              {/* Transform demo for header */}
              {activeSection === "header" && TRANSFORM?.header?.[level]?.stages && (
                <div style={{ marginTop: 10 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#94a3b8",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {TRANSFORM.header[level].demoLabel}
                  </div>
                  <TransformBullet
                    section="header"
                    stages={TRANSFORM.header[level].stages}
                    stageIndex={stageIndex}
                  />
                </div>
              )}
            </CVSectionBlock>

            {/* ── SUMMARY ── */}
            <CVSectionBlock
              id="summary"
              isActive={activeSection === "summary"}
              isHovered={hoveredSection === "summary"}
              onHover={onHover}
              onClick={onActivate}
            >
              <SectionDivider
                text="Professional Summary"
                active={activeSection === "summary"}
              />
              {activeSection === "summary" && TRANSFORM?.summary?.[level]?.stages && (
                <div style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#94a3b8",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {TRANSFORM.summary[level].demoLabel}
                  </div>
                  <TransformBullet
                    section="summary"
                    stages={TRANSFORM.summary[level].stages}
                    stageIndex={stageIndex}
                  />
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#CBD5E1",
                      marginBottom: 6,
                      marginTop: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Good Examples ↓
                  </div>
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`sum-${level}-${selectedRole}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    fontSize: 11,
                    color: "#01001F",
                    lineHeight: 1.65,
                    margin: 0,
                    paddingLeft: 2,
                  }}
                >
                  {roleData.cvSummary}
                </motion.p>
              </AnimatePresence>
            </CVSectionBlock>

            {/* ── EXPERIENCE ── */}
            <CVSectionBlock
              id="experience"
              isActive={activeSection === "experience"}
              isHovered={hoveredSection === "experience"}
              onHover={onHover}
              onClick={onActivate}
            >
              <SectionDivider
                text="Experience"
                active={activeSection === "experience"}
              />
              {activeSection === "experience" && TRANSFORM?.experience?.[level]?.stages && (
                <div style={{ marginBottom: 10 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#94a3b8",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {TRANSFORM.experience[level].demoLabel}
                  </div>
                  <TransformBullet
                    section="experience"
                    stages={TRANSFORM.experience[level].stages}
                    stageIndex={stageIndex}
                  />
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#CBD5E1",
                      marginBottom: 8,
                      marginTop: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Good Examples ↓
                  </div>
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`exp-${level}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {cv.experience.map((entry: ExperienceEntry, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: idx < cv.experience.length - 1 ? 14 : 0,
                        paddingLeft: 10,
                        borderLeft: "2px solid #17CAFA",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 5,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11.5,
                              fontWeight: 700,
                              color: "#01001F",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {entry.role}
                          </span>
                          <span style={{ fontSize: 10, color: "#01001F" }}>
                            · {entry.company}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: 9,
                            color: "#CBD5E1",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {entry.dates}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                          marginTop: 5,
                        }}
                      >
                        {entry.bullets.map((bullet: string, bi: number) => (
                          <div
                            key={bi}
                            style={{
                              display: "flex",
                              gap: 5,
                              alignItems: "flex-start",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 9.5,
                                color:
                                  activeSection === "experience"
                                    ? "#0E56FA"
                                    : "#CBD5E1",
                                fontWeight: 700,
                                marginTop: 1.5,
                                flexShrink: 0,
                                transition: "color 0.2s",
                              }}
                            >
                              ▸
                            </span>
                            <div
                              style={{
                                fontSize: 10.5,
                                lineHeight: 1.55,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {renderHighlighted(bullet)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </CVSectionBlock>

            {/* ── PROJECTS ── */}
            <CVSectionBlock
              id="projects"
              isActive={activeSection === "projects"}
              isHovered={hoveredSection === "projects"}
              onHover={onHover}
              onClick={onActivate}
            >
              <SectionDivider
                text="Projects"
                active={activeSection === "projects"}
              />
              {activeSection === "projects" && TRANSFORM?.projects?.[level]?.stages && (
                <div style={{ marginBottom: 10 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#94a3b8",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {TRANSFORM.projects[level].demoLabel}
                  </div>
                  <TransformBullet
                    section="projects"
                    stages={TRANSFORM.projects[level].stages}
                    stageIndex={stageIndex}
                  />
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#CBD5E1",
                      marginBottom: 8,
                      marginTop: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Good Examples ↓
                  </div>
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`proj-${level}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {cv.projects.map((proj: ProjectEntry, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        paddingLeft: 10,
                        borderLeft: "2px solid #17CAFA",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 5,
                          marginBottom: 5,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            color: "#01001F",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {proj.name}
                        </span>
                        <span style={{ fontSize: 10, color: "#01001F" }}>
                          · {proj.type}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        {proj.bullets.map((bullet: string, bi: number) => (
                          <div
                            key={bi}
                            style={{
                              display: "flex",
                              gap: 5,
                              alignItems: "flex-start",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 9.5,
                                color:
                                  activeSection === "projects"
                                    ? "#0E56FA"
                                    : "#CBD5E1",
                                fontWeight: 700,
                                marginTop: 1.5,
                                flexShrink: 0,
                                transition: "color 0.2s",
                              }}
                            >
                              ▸
                            </span>
                            <div
                              style={{
                                fontSize: 10.5,
                                lineHeight: 1.55,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {renderHighlighted(bullet)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </CVSectionBlock>

            {/* ── AWARDS ── */}
            {cv.awards && cv.awards.length > 0 && (
              <CVSectionBlock
                id="awards"
                isActive={activeSection === "awards"}
                isHovered={hoveredSection === "awards"}
                onHover={onHover}
                onClick={onActivate}
              >
                <SectionDivider
                  text="Honors & Awards"
                  active={activeSection === "awards"}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`awd-${level}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {cv.awards.map((award: AwardEntry, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom: idx < cv.awards!.length - 1 ? 10 : 0,
                          paddingLeft: 10,
                          borderLeft: "2px solid #17CAFA",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 5,
                            marginBottom: 2,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11.5,
                              fontWeight: 700,
                              color: "#01001F",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {award.name}
                          </span>
                          <span style={{ fontSize: 10, color: "#01001F" }}>
                            · {award.issuer} ({award.date})
                          </span>
                        </div>
                        {award.description && (
                          <div
                            style={{
                              fontSize: 10.5,
                              lineHeight: 1.55,
                              letterSpacing: "-0.01em",
                              color: "#01001F",
                              marginTop: 2,
                            }}
                          >
                            {renderHighlighted(award.description)}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </CVSectionBlock>
            )}

            {/* ── ACTIVITIES ── */}
            {cv.activities && cv.activities.length > 0 && (
              <CVSectionBlock
                id="activities"
                isActive={activeSection === "activities"}
                isHovered={hoveredSection === "activities"}
                onHover={onHover}
                onClick={onActivate}
              >
                <SectionDivider
                  text="Extracurriculars"
                  active={activeSection === "activities"}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`act-${level}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {cv.activities.map((act: ActivityEntry, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom: idx < cv.activities!.length - 1 ? 14 : 0,
                          paddingLeft: 10,
                          borderLeft: "2px solid #17CAFA",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                            marginBottom: 4,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                            <span
                              style={{
                                fontSize: 11.5,
                                fontWeight: 700,
                                color: "#01001F",
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {act.organisation}
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 500, color: "#0E56FA" }}>
                              {act.role}
                            </span>
                          </div>
                          <span style={{ fontSize: 9.5, fontWeight: 600, color: "#94a3b8" }}>
                            {act.dates}
                          </span>
                        </div>
                        {act.bullets && act.bullets.length > 0 && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {act.bullets.map((bullet: string, bi: number) => (
                              <div
                                key={bi}
                                style={{
                                  display: "flex",
                                  gap: 5,
                                  alignItems: "flex-start",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 9.5,
                                    color: activeSection === "activities" ? "#0E56FA" : "#CBD5E1",
                                    fontWeight: 700,
                                    marginTop: 1.5,
                                    flexShrink: 0,
                                    transition: "color 0.2s",
                                  }}
                                >
                                  ▸
                                </span>
                                <div
                                  style={{
                                    fontSize: 10.5,
                                    lineHeight: 1.55,
                                    letterSpacing: "-0.01em",
                                  }}
                                >
                                  {renderHighlighted(bullet)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </CVSectionBlock>
            )}
          </div>
          {/* Legend */}
          <div
            style={{
              padding: "8px 32px 12px",
              borderTop: "1px solid #F8FAFC",
              display: "flex",
              gap: 14,
            }}
          >
            {[
              { color: "#0E56FA", label: "Action Verb" },
              { color: "#16a34a", label: "Metric" },
            ].map(({ color, label }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 2,
                    background: color,
                  }}
                />
                <span
                  style={{ fontSize: 9, color: "#94a3b8", fontWeight: 500 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

// ─── Step Checklist ───────────────────────────────────────────────────────────

function StepChecklist({
  items,
  checks,
  onChange,
}: {
  items: [string, string, string];
  checks: [boolean, boolean, boolean];
  onChange: (checks: [boolean, boolean, boolean]) => void;
}) {
  const handleToggle = (i: number) => {
    const next: [boolean, boolean, boolean] = [...checks] as [
      boolean,
      boolean,
      boolean,
    ];
    if (checks[i]) {
      // Uncheck this + all subsequent
      for (let j = i; j < 3; j++) next[j] = false;
    } else {
      // Check this + all previous
      for (let j = 0; j <= i; j++) next[j] = true;
    }
    onChange(next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => {
        const done = checks[i];
        const enabled = i === 0 || checks[i - 1];

        return (
          <motion.button
            key={i}
            onClick={() => enabled && handleToggle(i)}
            whileHover={enabled ? { x: 2 } : {}}
            whileTap={enabled ? { scale: 0.98 } : {}}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              border: `1.5px solid ${done ? "#BBF7D0" : enabled ? "#E2E8F0" : "#F8FAFC"}`,
              background: done ? "#F0FDF4" : enabled ? "#F8FAFF" : "#FFFFFF",
              cursor: enabled ? "pointer" : "not-allowed",
              textAlign: "left",
              transition: "all 0.2s",
              width: "100%",
              opacity: enabled ? 1 : 0.45,
              position: "relative",
            }}
          >
            {/* Step number + checkbox */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  border: `2px solid ${done ? "#16a34a" : enabled ? "#CBD5E1" : "#17CAFA"}`,
                  background: done ? "#16a34a" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                <AnimatePresence>
                  {done ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        duration: 0.14,
                        type: "spring",
                        stiffness: 600,
                      }}
                    >
                      <Check size={12} color="white" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        color: enabled ? "#94a3b8" : "#CBD5E1",
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                </AnimatePresence>
              </div>
              {/* Connector line */}
              {i < 2 && (
                <div
                  style={{
                    width: 2,
                    height: 8,
                    background: done ? "#BBF7D0" : "#17CAFA",
                    borderRadius: 99,
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>

            <div style={{ flex: 1, paddingTop: 1 }}>
              <span
                style={{
                  fontSize: 12.5,
                  color: done ? "#16a34a" : enabled ? "#01001F" : "#94a3b8",
                  fontWeight: done ? 600 : 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.5,
                  textDecoration: done ? "line-through #86EFAC" : "none",
                  transition: "all 0.2s",
                  display: "block",
                }}
              >
                {item}
              </span>

              {/* "Applied to CV" badge */}
              <AnimatePresence>
                {done && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      marginTop: 4,
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#16a34a",
                      background: "#DCFCE7",
                      border: "1px solid #BBF7D0",
                      padding: "1px 7px",
                      borderRadius: 99,
                    }}
                  >
                    <Wand2 size={9} strokeWidth={2.5} />
                    Applied to CV ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Right Insight Panel ──────────────────────────────────────────────────────

function RightInsightPanel({
  section,
  level,
  sectionChecks,
  onSectionChecksChange,
  onContinue,
  selectedRole,
}: {
  section: CVSection;
  level: DiagnosticLevel;
  sectionChecks: Record<string, boolean[]>;
  onSectionChecksChange: (c: [boolean, boolean, boolean]) => void;
  onContinue: (prompt: string) => void;
  selectedRole: string | null;
}) {
  const data = PANEL_DATA[section] ? PANEL_DATA[section][level] : PANEL_DATA["experience"][level];
  const roleData = getRoleLevelData(selectedRole, level);
  // Override HR data and checklist with role-specific content
  const hrQuote =
    (roleData as any).hrQuotes?.[section] ||
    (roleData as any).hrQuote ||
    data?.hrQuote || "Great job structuring this section. Keep it up.";
  const hrName = roleData.hrName || data?.hrName || "Career Coach";
  const hrRole = roleData.hrRole || data?.hrRole || "Reviewer";
  const hrCompany = roleData.hrCompany || data?.hrCompany || "startup";
  const cvKey = getCVTemplateKey(selectedRole);
  const TRANSFORM = TRANSFORM_TEMPLATES[cvKey] ?? TRANSFORM_TEMPLATES["Product Management (PM)"];
  
  const sectionTransform = TRANSFORM?.[section];
  // Per-level data — some sections (header, projects) may have only one level
  const transformAtLevel =
    sectionTransform?.[level] ?? sectionTransform?.["starter"] ?? sectionTransform ?? null;

  // Always guarantee a valid 3-tuple to prevent crashes when switching sections
  const DEFAULT_SUMMARY_CHECKLIST: [string, string, string] = [
    "Keep it under 3 sentences",
    "Highlight your most impressive metric or domain",
    "Remove cliches like 'hard-working' or 'team player'",
  ];

  const DEFAULT_PROJECTS_CHECKLIST: [string, string, string] = [
    "State the problem your project solved",
    "List the exact technical stack or tools used",
    "Include a measurable outcome (users, speed, accuracy)",
  ];

  const DEFAULT_EXPERIENCE_CHECKLIST: [string, string, string] = [
    "Open with an outcome-oriented action verb",
    "Reference cross-functional scope or team size",
    "Close with a commercial or engagement metric (%, $, users)",
  ];

  const FALLBACK_CHECKLIST = section === "summary" ? DEFAULT_SUMMARY_CHECKLIST : section === "projects" ? DEFAULT_PROJECTS_CHECKLIST : DEFAULT_EXPERIENCE_CHECKLIST;

  const checklistItems: [string, string, string] =
    section === "experience"
      ? (Array.isArray(roleData.experienceChecklist) && roleData.experienceChecklist.length === 3
          ? roleData.experienceChecklist as [string, string, string]
          : FALLBACK_CHECKLIST)
      : section === "summary"
        ? (Array.isArray(roleData.summaryChecklist) && roleData.summaryChecklist.length === 3
            ? roleData.summaryChecklist as [string, string, string]
            : FALLBACK_CHECKLIST)
        : (Array.isArray(transformAtLevel?.checklistItems) && transformAtLevel!.checklistItems.length === 3
            ? transformAtLevel!.checklistItems as [string, string, string]
            : FALLBACK_CHECKLIST);
  const transform = transformAtLevel;
  const panelKey = `${section}-${level}-${cvKey}`;
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"helpful" | "love" | null>(null);
  
  const checks = (sectionChecks[section] || [false, false, false]) as [boolean, boolean, boolean];
  const totalChecked = 
    (sectionChecks.summary?.filter(Boolean).length || 0) + 
    (sectionChecks.experience?.filter(Boolean).length || 0) + 
    (sectionChecks.projects?.filter(Boolean).length || 0);
  
  const stageIndex = checks.filter(Boolean).length;
  const allChecked = totalChecked === 9;
  const companyInfo = COMPANY_INFO[hrCompany];

  // [PROMPT WIRING - Step 4] Get the dynamic master prompt when unlocked
  const currentPrompt = allChecked ? buildCombinedPrompt(selectedRole ?? null) : getPromptForSection(selectedRole, section);

  const handleCopy = () => {
    // [PROMPT WIRING - Step 4] Copy the dynamic prompt
    navigator.clipboard.writeText(currentPrompt).catch(() => {});

    // [PROMPT WIRING - Step 5] Track prompt copy event with role and section
    trackEvent("prompt_copied", {
      role: selectedRole || "Unknown",
      prompt_key:
        ROLE_TO_PROMPT_KEY[selectedRole || ""] ?? "Product Management (PM)",
      section: section,
    });

    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <style>{`
        .cv-right-scroll::-webkit-scrollbar { width: 6px; }
        .cv-right-scroll::-webkit-scrollbar-track { background: #F8FAFC; border-radius: 99px; margin: 8px 0; }
        .cv-right-scroll::-webkit-scrollbar-thumb { background: #17CAFA; border-radius: 99px; }
        .cv-right-scroll::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
      <div
        className="cv-right-scroll"
        onScroll={(e) =>
          handleScrollDepthTracking(e, "Screen3Workspace_HRPanel")
        }
        style={{
          width: "50%",
          overflowY: "auto",
          background: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Persistent Global X/9 Progress Bar (ALWAYS VISIBLE) ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "white",
            borderBottom: "1.5px solid rgba(14,86,250,0.08)",
            padding: "10px 28px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Section dots */}
          {["summary", "experience", "projects"].map((sec) => {
            const secChecks = (sectionChecks[sec] || []) as boolean[];
            const secDone = secChecks.filter(Boolean).length;
            return (
              <div key={sec} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: secChecks[i] ? "#0E56FA" : "rgba(14,86,250,0.12)",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
                <span style={{ fontSize: 9, fontWeight: 600, color: "#01001F", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.05em", marginLeft: 2 }}>
                  {sec === "summary" ? "SUM" : sec === "experience" ? "EXP" : "PROJ"}
                </span>
              </div>
            );
          })}
          {/* Global counter */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            {/* Progress bar */}
            <div style={{ width: 80, height: 4, borderRadius: 99, background: "rgba(14,86,250,0.12)", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  borderRadius: 99,
                  width: `${(totalChecked / 9) * 100}%`,
                  background: allChecked ? "#16a34a" : "#0E56FA",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: allChecked ? "#16a34a" : "#0E56FA",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {totalChecked}/9 {allChecked ? "✓ Unlocked!" : "completed"}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={panelKey}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              padding: "28px 28px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              flex: 1,
            }}
          >
            {/* ── Panel Header ── */}
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: 0,
                lineHeight: 1.2,
                background: "linear-gradient(90deg, #01001F 0%, #0E56FA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mastering {SECTION_LABEL[section]}
            </h2>

            {/* ── Block 2: Step Checklist (only for core sections) ── */}
            {["summary", "experience", "projects"].includes(section) ? (
          <div
            id="tour-checklist"
            style={{
              background: "rgba(14, 86, 250, 0.07)",
              padding: "16px",
              borderRadius: "16px",
              border: "1px solid rgba(14, 86, 250, 0.15)",
              marginBottom: "16px",
            }}
          >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background: "rgba(14,86,250,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Check size={11} color="#0E56FA" strokeWidth={3} />
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#01001F",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Self-Audit Checklist
                </span>
                {/* Progress indicator */}
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <div style={{ display: "flex", gap: 3 }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 2,
                          background: checks[i] ? "#16a34a" : "#17CAFA",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: stageIndex === 3 ? "#16a34a" : "#94a3b8",
                    }}
                  >
                    {stageIndex}/3
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: 11.5,
                  color: "#01001F",
                  margin: "0 0 10px",
                  letterSpacing: "-0.01em",
                }}
              >
                Tick each step — watch the CV bullet transform on the left ←
              </p>
              <StepChecklist
                items={checklistItems}
                checks={checks}
                onChange={onSectionChecksChange}
              />

              {/* All-done celebration */}
              <AnimatePresence>
                {stageIndex === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.28,
                      type: "spring",
                      stiffness: 400,
                    }}
                    style={{
                      marginTop: 10,
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #F0FDF4, #DCFCE7)",
                      border: "1px solid #BBF7D0",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#16a34a",
                      }}
                    >
                      🎉 Perfect! All 3 improvements applied. Your bullet is now
                      HR-ready.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>) : (
              /* Info panel for non-core sections (header, awards, activities) */
              <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(14,86,250,0.04)", border: "1px solid rgba(14,86,250,0.12)" }}>
                <p style={{ fontSize: 12.5, color: "#01001F", lineHeight: 1.6, margin: 0 }}>
                  💡 <strong>Tip:</strong> Use the AI prompt below to generate strong, role-specific content for this section. Paste it into ChatGPT or Claude with your CV details.
                </p>
              </div>
            )}

            {/* ── Block 3: AI Prompt (Locked/Unlocked Progressive Disclosure) ── */}
            <div
              id="tour-prompt"
              style={{
                borderRadius: 14,
                padding: "18px 20px",
                position: "relative",
                overflow: "hidden",
                minHeight: 200,
                background: allChecked
                  ? "linear-gradient(135deg, rgba(14,86,250,0.03) 0%, rgba(109,40,217,0.04) 100%)"
                  : "linear-gradient(135deg, rgba(148,163,184,0.06) 0%, rgba(203,213,225,0.08) 100%)",
                transition: "background 0.5s",
              }}
            >
              {/* Gradient border */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 14,
                  padding: 1.5,
                  background: allChecked
                    ? "linear-gradient(135deg, rgba(14,86,250,0.35), rgba(109,40,217,0.35))"
                    : "linear-gradient(135deg, rgba(148,163,184,0.25), rgba(203,213,225,0.25))",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  pointerEvents: "none",
                  transition: "background 0.5s",
                }}
              />

              {!allChecked ? (
                /* LOCKED STATE */
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FFFFFF, #17CAFA)",
                      marginBottom: 12,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    }}
                  >
                    <Lock size={24} color="#94a3b8" strokeWidth={2} />
                  </div>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "#01001F",
                      letterSpacing: "-0.02em",
                      margin: "0 0 8px",
                    }}
                  >
                    🔒 Exclusive AI Prompt — Locked
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#01001F",
                      lineHeight: 1.6,
                      margin: "0 0 6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Complete{" "}
                    <strong style={{ color: "#0E56FA" }}>
                      9/9 checklist items
                    </strong>{" "}
                    across all sections (Summary, Experience, Projects) to unlock your master AI prompt.
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 10px",
                      borderRadius: 99,
                      background: "rgba(14,86,250,0.08)",
                      border: "1px solid rgba(14,86,250,0.15)",
                      marginTop: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#0E56FA",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {totalChecked}/9 Completed
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* UNLOCKED STATE */
                <motion.div
                  key="unlocked"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {/* Unlock animation sparkle */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #10b981, #16a34a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(16,185,129,0.4)",
                    }}
                  >
                    <Unlock size={16} color="white" strokeWidth={2.5} />
                  </motion.div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 6,
                    }}
                  >
                    <Sparkles size={15} color="#6d28d9" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#01001F",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Master AI Prompt Unlocked!
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        padding: "2px 7px",
                        borderRadius: 99,
                        background: "#16a34a",
                        color: "white",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                      }}
                    >
                      Unlocked
                    </span>
                  </div>
                  {/* [PROMPT WIRING - Step 4] Display dynamic prompt data */}
                  <div
                    style={{
                      maxHeight: 200,
                      overflowY: "auto",
                      background: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(14,86,250,0.15)",
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 14,
                    }}
                  >
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        fontFamily: "'Fira Code', 'Menlo', monospace",
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "#01001F",
                      }}
                    >
                      {currentPrompt}
                    </pre>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      handleCopy();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "9px 18px",
                      borderRadius: 9,
                      background: copied ? "#16a34a" : "#0E56FA",
                      border: "none",
                      color: "white",
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: copied
                        ? "0 3px 12px rgba(22,163,74,0.35)"
                        : "0 3px 12px rgba(14,86,250,0.35)",
                      transition: "background 0.2s, box-shadow 0.2s",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {copied ? (
                      <CheckCheck size={14} strokeWidth={2.5} />
                    ) : (
                      <Sparkles size={14} strokeWidth={2.5} />
                    )}
                    {copied
                      ? "Copied! Paste into your AI →"
                      : "✨ Copy AI Prompt Template"}
                  </motion.button>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontSize: 11,
                        color: "#16a34a",
                        margin: "8px 0 0",
                        fontWeight: 500,
                      }}
                    >
                      Paste this into your AI along with your raw bullet points.
                    </motion.p>
                  )}
                </motion.div>
              )}
            </div>

            {/* ── Continue — only visible when all 3 items are checked ── */}
            {allChecked && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  borderTop: "1px solid #FFFFFF",
                  paddingTop: 18,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.04, x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onContinue(currentPrompt)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "10px 20px",
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #0E56FA 0%, #17CAFA 100%)",
                    border: "none",
                    color: "white",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(14,86,250,0.35)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Get My AI Prompt
                  <ArrowRight size={14} strokeWidth={2.5} />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Screen3Props {
  level: DiagnosticLevel;
  onSetLevel: (l: DiagnosticLevel) => void;
  selectedRole: string | null;
  onComplete: (bullet: string) => void;
  onBack?: () => void;
}

export function Screen3Workspace({
  level,
  onSetLevel,
  selectedRole,
  onComplete,
  onBack,
}: Screen3Props) {
  const [activeSection, setActiveSection] = useState<CVSection>("experience");
  const [hoveredSection, setHoveredSection] = useState<CVSection | null>(null);
  const [sectionChecks, setSectionChecks] = useState<Record<string, boolean[]>>({
    summary: [false, false, false],
    experience: [false, false, false],
    projects: [false, false, false],
  });

  // ── HR Quote Bubble state (FIX 1, FIX 2) ───────────────────────────────────
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [bubbleAnchorRect, setBubbleAnchorRect] = useState<DOMRect | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const bubbleRef = useRef<HTMLDivElement | null>(null);

  // FIX 2 — Click-outside handler: dismiss bubble if click is outside CV sections
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      // If click is inside the bubble itself, do nothing
      if (bubbleRef.current && bubbleRef.current.contains(target)) return;
      // If click is on a CV section block, the onActivate handler will set a new rect
      // We only dismiss if the click target is not a CV section child
      // Check by looking for our data attribute on the event path
      const path = e.composedPath ? e.composedPath() : [];
      const clickedSection = path.some(
        (el) => el instanceof HTMLElement && el.dataset.cvSection
      );
      if (!clickedSection) {
        setBubbleVisible(false);
      }
    };
    document.addEventListener("click", handleDocClick, true);
    return () => document.removeEventListener("click", handleDocClick, true);
  }, []);

  // ── Tour state ──────────────────────────────────────────────────────────────
  const [tourStep, setTourStep] = useState<number | null>(null);

  useEffect(() => {
    // ALWAYS show the guided tour on every page visit
    const t = setTimeout(() => setTourStep(0), 420);
    return () => clearTimeout(t);
  }, []);

  const handleTourNext = () => {
    if (tourStep === 2) {
      localStorage.setItem("cv_survival_tour_v1", "1");
      setTourStep(null);
    } else {
      setTourStep((s) => (s ?? 0) + 1);
    }
  };

  const handleTourSkip = () => {
    localStorage.setItem("cv_survival_tour_v1", "1");
    setTourStep(null);
  };

  // ── Micro-reaction toast ────────────────────────────────────────────────────
  const [microToast, setMicroToast] = useState<{
    key: number;
    step: number;
  } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChecksChange = (newChecks: [boolean, boolean, boolean]) => {
    const currentSectionChecks = sectionChecks[activeSection] || [false, false, false];
    for (let i = 0; i < 3; i++) {
      if (newChecks[i] && !currentSectionChecks[i]) {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setMicroToast({ key: Date.now(), step: i });
        toastTimerRef.current = setTimeout(() => setMicroToast(null), 2600);
        break;
      }
    }
    setSectionChecks(prev => ({
      ...prev,
      [activeSection]: newChecks
    }));
  };

  // Reset checks only when the diagnostic level changes (not when activeSection changes!)
  useEffect(() => {
    setSectionChecks({
      summary: [false, false, false],
      experience: [false, false, false],
      projects: [false, false, false],
    });
  }, [level]);

  // FIX 1 — Activate section and capture clicked element's rect for bubble positioning
  const handleActivate = (id: CVSection, rect: DOMRect) => {
    setActiveSection(id);
    setBubbleAnchorRect(rect);
    setBubbleVisible(true);
  };

  const handleContinue = (prompt: string) => {
    onComplete(prompt);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#FFFFFF",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <TopNav
        level={level}
        onSetLevel={onSetLevel}
        onBack={onBack}
        selectedRole={selectedRole}
      />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <LeftCVColumn
          level={level}
          activeSection={activeSection}
          hoveredSection={hoveredSection}
          onHover={setHoveredSection}
          onActivate={handleActivate}
          checks={((sectionChecks as any)[activeSection] || [false, false, false]) as [boolean, boolean, boolean]}
          selectedRole={selectedRole}
        />
        <RightInsightPanel
          section={activeSection}
          level={level}
          sectionChecks={sectionChecks}
          onSectionChecksChange={handleChecksChange}
          onContinue={handleContinue}
          selectedRole={selectedRole}
        />
      </div>

      {/* ── HR Quote Bubble (FIX 1-5) ── */}
      <AnimatePresence>
        {bubbleVisible && !["header", "awards", "activities"].includes(activeSection) && (
          <div ref={bubbleRef}>
            <HRQuoteBubble
              section={activeSection}
              level={level}
              selectedRole={selectedRole}
              anchorRect={bubbleAnchorRect}
              isMobile={isMobile}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── Spotlight Guided Tour ── */}
      <AnimatePresence>
        {tourStep !== null && (
          <SpotlightTour
            step={tourStep}
            onNext={handleTourNext}
            onSkip={handleTourSkip}
          />
        )}
      </AnimatePresence>

      {/* ── Micro-reaction toast ── */}
      <AnimatePresence>
        {microToast && (
          <motion.div
            key={microToast.key}
            initial={{ opacity: 0, y: 28, scale: 0.84 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.9 }}
            transition={{
              duration: 0.26,
              type: "spring",
              stiffness: 500,
              damping: 28,
            }}
            style={{
              position: "fixed",
              bottom: 36,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 8888,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 18px 9px 14px",
              borderRadius: 99,
              background: "white",
              boxShadow:
                "0 4px 28px rgba(0,0,0,0.15), 0 1px 5px rgba(0,0,0,0.07)",
              border: `1.5px solid ${MICRO_REACTIONS[microToast.step].color}30`,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {/* Coloured left dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: MICRO_REACTIONS[microToast.step].color,
                flexShrink: 0,
                boxShadow: `0 0 8px ${MICRO_REACTIONS[microToast.step].color}80`,
              }}
            />
            <span style={{ fontSize: 16, lineHeight: 1 }}>
              {MICRO_REACTIONS[microToast.step].emoji}
            </span>
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: MICRO_REACTIONS[microToast.step].color,
                letterSpacing: "-0.01em",
              }}
            >
              {MICRO_REACTIONS[microToast.step].text}
            </span>
            {/* Applied badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "2px 9px",
                borderRadius: 99,
                background: `${MICRO_REACTIONS[microToast.step].color}14`,
                border: `1px solid ${MICRO_REACTIONS[microToast.step].color}30`,
              }}
            >
              <Wand2
                size={9}
                color={MICRO_REACTIONS[microToast.step].color}
                strokeWidth={2.5}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: MICRO_REACTIONS[microToast.step].color,
                }}
              >
                Applied to CV ✓
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
