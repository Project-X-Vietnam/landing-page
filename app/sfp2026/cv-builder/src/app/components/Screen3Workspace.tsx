import { useState, useRef, useEffect } from "react";
import { getRoleLevelData } from "../../data/roleData";
import { trackEvent, handleScrollDepthTracking } from "../../utils/analytics";
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

// ─── Types ───────────────────────────────────────────────────────────────────

type CVSection = "header" | "summary" | "experience" | "projects";
type FlashColor = "blue" | "green";

type TextSeg = {
  id: string;
  text: string;
  flash?: FlashColor;
};

type Stage = TextSeg[];

// ─── Tour & Micro-feedback Constants ─────────────────────────────────────────

const TOUR_CONTENT = [
  {
    title: "📄 Tờ CV của bạn",
    description:
      "Bấm vào bất kỳ phần nào trên CV này để khám phá bí mật mà HR đang tìm kiếm.",
    buttonText: "Tiếp theo →",
  },
  {
    title: "⚡ Level Switcher",
    description:
      "Chuyển đổi Level tại đây để xem tiêu chuẩn của HR thay đổi như thế nào.",
    buttonText: "Tiếp theo →",
  },
  {
    title: "✅ Self-Audit Checklist",
    description:
      "Tự kiểm tra CV của bạn và mở khóa ChatGPT prompt đặc biệt khi hoàn thành đủ 3 mục.",
    buttonText: "Got it! 🎉",
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
const COMPANY_INFO: Record<string, { name: string; color: string; textColor: string }> = {
  shopee: { name: "Shopee", color: "#EE4D2D", textColor: "white" },
  google: { name: "Google", color: "#4285F4", textColor: "white" },
  grab: { name: "Grab", color: "#00B14F", textColor: "white" },
  vng: { name: "VNG", color: "#009FE8", textColor: "white" },
  startup: { name: "Series B", color: "#6366f1", textColor: "white" },
  scaleup: { name: "ScaleUp", color: "#8b5cf6", textColor: "white" },
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
};

// ─── CV Data ─────────────────────────────────────────────────────────────────

type ExperienceEntry = { company: string; role: string; dates: string; bullets: string[] };
type ProjectEntry = { name: string; type: string; bullets: string[] };

const CV_DATA: Record<DiagnosticLevel, {
  name: string; title: string; email: string; location: string; linkedin: string;
  summary: string; experience: ExperienceEntry[]; projects: ProjectEntry[];
}> = {
  starter: {
    name: "Alex Nguyen", title: "Aspiring Product Manager",
    email: "alex.nguyen@gmail.com", location: "Ho Chi Minh City, VN", linkedin: "linkedin.com/in/alexn",
    summary: "Final-year Computer Science student with hands-on product experience through coursework and club leadership. Passionate about building user-centered solutions. Seeking my first PM role in tech.",
    experience: [
      {
        company: "Product Club, VinUni", role: "Project Lead", dates: "Sep 2023 – May 2024",
        bullets: [
          "Built a campus food delivery app MVP, leading a team of 3 students",
          "Conducted user interviews with 20+ students to validate key features",
          "Presented product roadmap to faculty panel; received top project award",
        ],
      },
      {
        company: "FPT Software", role: "Business Analyst Intern", dates: "Jun – Aug 2023",
        bullets: [
          "Assisted in documenting requirements for a client management portal",
          "Attended 10+ sprint reviews and daily standups with the engineering team",
        ],
      },
    ],
    projects: [
      {
        name: "Campus App Redesign", type: "UX Research Project",
        bullets: [
          "Redesigned student portal UI; improved task completion by 18% in usability tests",
          "Created 15 wireframes and 3 high-fidelity prototypes using Figma",
          "Presented findings to 4 faculty stakeholders",
        ],
      },
    ],
  },
  developing: {
    name: "Alex Johnson", title: "Product Manager",
    email: "alex.johnson@gmail.com", location: "London, UK", linkedin: "linkedin.com/in/alexj",
    summary: "Data-driven Product Manager with 2+ years building B2B SaaS products. Track record of increasing user retention by 23% through data-led roadmap decisions and cross-functional team leadership.",
    experience: [
      {
        company: "TechCorp Ltd", role: "Product Manager", dates: "Jun 2022 – Present",
        bullets: [
          "Led cross-functional team of 5 engineers to redesign onboarding flow, reducing drop-off by 23%",
          "Defined and shipped 3 product features impacting 50K+ monthly active users",
          "Prioritised roadmap using data insights, increasing NPS score from 34 to 61",
        ],
      },
      {
        company: "StartupXYZ", role: "Product Analyst", dates: "Jan 2021 – May 2022",
        bullets: [
          "Analysed user funnel to identify top 3 drop-off points, informing key roadmap decisions",
          "Coordinated with design team to prototype 2 new flows, cutting task completion time by 18%",
        ],
      },
    ],
    projects: [
      {
        name: "AI-Powered Onboarding Flow", type: "Product Initiative",
        bullets: [
          "Designed & shipped ML-driven personalisation feature, increasing D7 retention by 14%",
          "Collaborated with 3 engineers and 1 data scientist over a 6-week sprint",
          "A/B tested 4 variants; selected winner based on funnel conversion data",
        ],
      },
    ],
  },
  ready: {
    name: "Alex Johnson", title: "Senior Product Lead",
    email: "alex.johnson@gmail.com", location: "London, UK", linkedin: "linkedin.com/in/alexj",
    summary: "Strategic product leader with 6+ years scaling B2B SaaS from $2M to $18M ARR. Expert in driving cross-org alignment, building 0-to-1 products, and owning P&L for enterprise segments.",
    experience: [
      {
        company: "ScaleUp Inc", role: "Senior Product Lead", dates: "2021 – Present",
        bullets: [
          "Spearheaded 0-to-1 enterprise tier launch, generating $4.2M ARR within 12 months",
          "Orchestrated 3 cross-functional squads (28 people) to deliver platform re-architecture on schedule",
          "Championed data governance framework across 5 product lines, reducing compliance risk by 60%",
        ],
      },
      {
        company: "GrowthCo", role: "Product Manager II", dates: "2019 – 2021",
        bullets: [
          "Drove 47% uplift in enterprise customer retention through strategic roadmap reprioritisation",
          "Owned pricing strategy for premium tier, increasing ARPU by 31% ($2.4M incremental revenue)",
        ],
      },
    ],
    projects: [
      {
        name: "Enterprise Analytics Platform", type: "Strategic Initiative",
        bullets: [
          "Architected product vision for $12M R&D investment, deployed to 200+ Fortune 500 clients",
          "Defined OKRs and success metrics adopted by 4 product squads across 3 business units",
          "Secured cross-departmental executive buy-in within 6 weeks of initial proposal",
        ],
      },
    ],
  },
};

// ─── Transformation Data ──────────────────────────────────────────────────────

type TransformData = {
  stages: [Stage, Stage, Stage, Stage];
  checklistItems: [string, string, string];
  demoLabel?: string; // what the demo box header says
};

const TRANSFORM: Record<CVSection, Record<DiagnosticLevel, TransformData>> = {
  experience: {
    starter: {
      demoLabel: "Live Bullet Transformation",
      stages: [
        [{ id: "s0", text: "Was responsible for making a student app and got people to use it." }],
        [
          { id: "verb", text: "Built", flash: "blue" },
          { id: "r1", text: " a student app and got people to use it." },
        ],
        [
          { id: "verb", text: "Built" },
          { id: "ctx", text: " a campus food delivery app MVP, leading a team of 3 students", flash: "blue" },
          { id: "r2", text: " to use it." },
        ],
        [
          { id: "verb", text: "Built" },
          { id: "ctx", text: " a campus food delivery app MVP, leading a team of 3 students" },
          { id: "res", text: "; received top project award from faculty panel.", flash: "green" },
        ],
      ],
      checklistItems: [
        "Replace 'Was responsible for' with a strong Action Verb",
        "Name the specific project and add concrete scope/details",
        "Add an End Result — what actually happened? (award, users, feedback)",
      ],
    },
    developing: {
      demoLabel: "Live Bullet Transformation",
      stages: [
        [{ id: "s0", text: "Responsible for improving the product and the team did better overall." }],
        [
          { id: "verb", text: "Led", flash: "blue" },
          { id: "r1", text: " the product team and improved overall performance." },
        ],
        [
          { id: "verb", text: "Led" },
          { id: "ctx", text: " a cross-functional team of 5 engineers to redesign the onboarding flow", flash: "blue" },
          { id: "r2", text: ", improving performance." },
        ],
        [
          { id: "verb", text: "Led" },
          { id: "ctx", text: " cross-functional team of 5 engineers to redesign onboarding flow" },
          { id: "res", text: ", reducing drop-off by 23%.", flash: "green" },
        ],
      ],
      checklistItems: [
        "Replace 'Responsible for' with a strong Action Verb (Led, Spearheaded, Defined)",
        "Add cross-functional context: team size, function, and specific initiative",
        "Quantify the business impact with a specific metric (%)",
      ],
    },
    ready: {
      demoLabel: "Live Bullet Transformation",
      stages: [
        [{ id: "s0", text: "In charge of launching a new product tier and it generated good revenue." }],
        [
          { id: "verb", text: "Spearheaded", flash: "blue" },
          { id: "r1", text: " launch of a new enterprise product tier, generating good revenue." },
        ],
        [
          { id: "verb", text: "Spearheaded" },
          { id: "ctx", text: " 0-to-1 enterprise tier launch from concept to market", flash: "blue" },
          { id: "r2", text: ", generating significant revenue." },
        ],
        [
          { id: "verb", text: "Spearheaded" },
          { id: "ctx", text: " 0-to-1 enterprise tier launch" },
          { id: "res", text: ", generating $4.2M ARR within 12 months.", flash: "green" },
        ],
      ],
      checklistItems: [
        "Upgrade to an executive-grade verb (Spearheaded, Championed, Orchestrated)",
        "Add strategic scope: 0-to-1, the initiative type, and target segment",
        "Lead with a business-level outcome (ARR, $M in revenue, % uplift)",
      ],
    },
  },
  summary: {
    starter: {
      demoLabel: "Live Summary Transformation",
      stages: [
        [{ id: "s0", text: "I am a motivated student who wants to work in product management." }],
        [
          { id: "status", text: "Final-year Computer Science student at VinUni", flash: "blue" },
          { id: "r1", text: " looking to work in product." },
        ],
        [
          { id: "status", text: "Final-year Computer Science student at VinUni" },
          { id: "exp", text: " with hands-on product experience through coursework and club leadership", flash: "blue" },
          { id: "r2", text: "." },
        ],
        [
          { id: "status", text: "Final-year Computer Science student at VinUni" },
          { id: "exp", text: " with hands-on product experience through coursework and club leadership" },
          { id: "goal", text: ". Passionate about building user-centered solutions. Seeking first PM role in tech.", flash: "green" },
        ],
      ],
      checklistItems: [
        "Replace 'I am a student' with your degree, university, and year",
        "Add specific experience context (internship, club projects, coursework)",
        "Close with a clear, specific career goal — what role are you seeking?",
      ],
    },
    developing: {
      demoLabel: "Live Summary Transformation",
      stages: [
        [{ id: "s0", text: "Product Manager with experience in tech companies. Good at building products." }],
        [
          { id: "title", text: "Data-driven Product Manager with 2+ years in B2B SaaS.", flash: "blue" },
        ],
        [
          { id: "title", text: "Data-driven Product Manager with 2+ years in B2B SaaS." },
          { id: "ach", text: " Track record of increasing user retention by 23%.", flash: "blue" },
        ],
        [
          { id: "title", text: "Data-driven Product Manager with 2+ years in B2B SaaS." },
          { id: "ach", text: " Track record of increasing user retention by 23%" },
          { id: "method", text: " through data-led roadmap decisions and cross-functional team leadership.", flash: "green" },
        ],
      ],
      checklistItems: [
        "Open with your domain + years of experience (not just 'PM with experience')",
        "Add your single strongest quantified achievement in the first sentence",
        "Explain HOW — your methodology and cross-functional approach",
      ],
    },
    ready: {
      demoLabel: "Live Summary Transformation",
      stages: [
        [{ id: "s0", text: "Senior product leader with many years of experience scaling tech companies." }],
        [
          { id: "scale", text: "Strategic product leader with 6+ years scaling B2B SaaS to $18M ARR.", flash: "blue" },
        ],
        [
          { id: "scale", text: "Strategic product leader with 6+ years scaling B2B SaaS to $18M ARR." },
          { id: "depth", text: " Expert in driving cross-org alignment and building 0-to-1 products.", flash: "blue" },
        ],
        [
          { id: "scale", text: "Strategic product leader with 6+ years scaling B2B SaaS to $18M ARR." },
          { id: "depth", text: " Expert in driving cross-org alignment" },
          { id: "mandate", text: ", building 0-to-1 products, and owning P&L for enterprise segments.", flash: "green" },
        ],
      ],
      checklistItems: [
        "Lead with a company-scale metric (ARR, growth range, user base scale)",
        "Add strategic depth: specialisation and capability signal",
        "Show 0-to-1 ownership and P&L responsibility to signal real seniority",
      ],
    },
  },
  projects: {
    starter: {
      demoLabel: "Live Project Bullet Transformation",
      stages: [
        [{ id: "s0", text: "Did a redesign project for school and people thought it was nice." }],
        [
          { id: "verb", text: "Redesigned", flash: "blue" },
          { id: "r1", text: " a school UI project that was well received." },
        ],
        [
          { id: "verb", text: "Redesigned" },
          { id: "ctx", text: " the student portal UI using Figma, creating 15 wireframes and 3 hi-fi prototypes", flash: "blue" },
          { id: "r2", text: "." },
        ],
        [
          { id: "verb", text: "Redesigned" },
          { id: "ctx", text: " the student portal UI using Figma, creating 15 wireframes" },
          { id: "res", text: "; improved task completion by 18% in usability tests.", flash: "green" },
        ],
      ],
      checklistItems: [
        "Start with a strong Action Verb describing what you actually built",
        "Name the specific tool, deliverables, and scope (Figma, wireframes, etc.)",
        "Add a measurable outcome — even a small usability test result counts",
      ],
    },
    developing: {
      demoLabel: "Live Project Bullet Transformation",
      stages: [
        [{ id: "s0", text: "Worked on an AI project with the team and retention improved." }],
        [
          { id: "verb", text: "Designed & shipped", flash: "blue" },
          { id: "r1", text: " an AI feature that improved user retention." },
        ],
        [
          { id: "verb", text: "Designed & shipped" },
          { id: "ctx", text: " an ML-driven personalisation feature in collaboration with 3 engineers and 1 data scientist over 6 weeks", flash: "blue" },
          { id: "r2", text: "." },
        ],
        [
          { id: "verb", text: "Designed & shipped" },
          { id: "ctx", text: " ML-driven personalisation feature" },
          { id: "res", text: ", increasing D7 retention by 14%.", flash: "green" },
        ],
      ],
      checklistItems: [
        "Use verbs that show both design AND delivery ownership (Designed & shipped)",
        "Add team composition and sprint context (who, how many, how long)",
        "Quantify the outcome — which metric moved, and by how much?",
      ],
    },
    ready: {
      demoLabel: "Live Initiative Bullet Transformation",
      stages: [
        [{ id: "s0", text: "Led a big analytics platform project that enterprise clients now use." }],
        [
          { id: "verb", text: "Architected", flash: "blue" },
          { id: "r1", text: " the product vision for an enterprise analytics platform." },
        ],
        [
          { id: "verb", text: "Architected" },
          { id: "ctx", text: " product vision for a $12M R&D initiative now deployed to Fortune 500 clients", flash: "blue" },
          { id: "r2", text: "." },
        ],
        [
          { id: "verb", text: "Architected" },
          { id: "ctx", text: " product vision for $12M R&D investment" },
          { id: "res", text: ", deployed to 200+ Fortune 500 clients.", flash: "green" },
        ],
      ],
      checklistItems: [
        "Use an executive verb showing architectural ownership (Architected, Championed)",
        "Include investment scale and target audience (Fortune 500, enterprise, $M)",
        "Add company-level deployment scope — how many clients or what revenue impact?",
      ],
    },
  },
  header: {
    starter: {
      demoLabel: "Live Title Transformation",
      stages: [
        [{ id: "s0", text: "Student" }],
        [{ id: "title", text: "Aspiring Product Manager", flash: "blue" }],
        [
          { id: "title", text: "Aspiring Product Manager" },
          { id: "school", text: " · CS at VinUni", flash: "blue" },
        ],
        [
          { id: "title", text: "Aspiring Product Manager" },
          { id: "school", text: " · CS at VinUni" },
          { id: "year", text: " · Class of 2025", flash: "green" },
        ],
      ],
      checklistItems: [
        "Replace generic 'Student' with your specific target role title",
        "Add your degree/university to establish academic credibility",
        "Include graduation year — gives recruiters a clear timeline",
      ],
    },
    developing: {
      demoLabel: "Live Title Transformation",
      stages: [
        [{ id: "s0", text: "Product Manager" }],
        [
          { id: "title", text: "Product Manager", flash: "blue" },
          { id: "domain", text: " · B2B SaaS", flash: "blue" },
        ],
        [
          { id: "title", text: "Product Manager" },
          { id: "domain", text: " · B2B SaaS" },
          { id: "track", text: " | Growth & Retention", flash: "blue" },
        ],
        [
          { id: "title", text: "Product Manager" },
          { id: "domain", text: " · B2B SaaS | Growth & Retention" },
          { id: "loc", text: " · London, UK", flash: "green" },
        ],
      ],
      checklistItems: [
        "Add your domain/industry specialisation (B2B SaaS, Fintech, etc.)",
        "Add your focus area or track (Growth, Platform, Retention)",
        "Include your location — city or 'Open to remote'",
      ],
    },
    ready: {
      demoLabel: "Live Title Transformation",
      stages: [
        [{ id: "s0", text: "Senior Product Manager" }],
        [{ id: "title", text: "Senior Product Lead", flash: "blue" }],
        [
          { id: "title", text: "Senior Product Lead" },
          { id: "scope", text: " · B2B SaaS | $18M ARR", flash: "blue" },
        ],
        [
          { id: "title", text: "Senior Product Lead" },
          { id: "scope", text: " · B2B SaaS | $18M ARR" },
          { id: "stage", text: " · Series C", flash: "green" },
        ],
      ],
      checklistItems: [
        "Upgrade title to reflect actual seniority (Lead, Director, VP — not just 'Senior PM')",
        "Add a scope signal — ARR, product portfolio size, or company stage",
        "Company stage (Series C, Enterprise) anchors your playing field instantly",
      ],
    },
  },
};

// ─── Panel Data (HR Quote + AI Prompt) ───────────────────────────────────────

type PanelData = {
  hrQuote: string;
  hrName: string;
  hrRole: string;
  hrCompany: keyof typeof COMPANY_INFO;
  hrAvatar: "man" | "woman";
  aiTitle: string;
  aiSubtext: string;
  aiPrompt: string;
};

const PANEL_DATA: Record<CVSection, Record<DiagnosticLevel, PanelData>> = {
  experience: {
    starter: {
      hrQuote: "No full-time experience? Completely fine. Club projects, internships, and coursework all count — if framed with ownership. 'I helped with the project' is weak. 'Led a team of 3 to build and launch an MVP' is strong. Show me initiative.",
      hrName: "Sarah Thompson", hrRole: "HR Lead", hrCompany: "shopee", hrAvatar: "woman",
      aiTitle: "Struggling to write this?",
      aiSubtext: "Use our prompt to let ChatGPT turn raw activity descriptions into professional, XYZ-formatted bullet points.",
      aiPrompt: `Act as an expert Tech Recruiter for entry-level PM roles.\n\nRewrite the following raw activity into 3 professional bullet points using the XYZ Google formula: "Accomplished [X] as measured by [Y], by doing [Z]."\n\nRequirements:\n- Start each bullet with a strong action verb\n- No "I" or "my" — professional third-person\n- Include team size, tools, or any available scope\n- Emphasize initiative and ownership\n\nRaw activity:\n[PASTE YOUR DESCRIPTION HERE]`,
    },
    developing: {
      hrQuote: "For Mid-level roles, I don't want a list of daily tasks. I scan for data-driven results and business impact. Show me the numbers — percentages, dollar values, user counts. Give me a reason to forward your CV in the first 6 seconds.",
      hrName: "Marcus Lee", hrRole: "Tech Lead", hrCompany: "google", hrAvatar: "man",
      aiTitle: "Struggling to write this?",
      aiSubtext: "Use our prompt to let ChatGPT rewrite your raw bullet points into HR-approved XYZ formats with real metrics.",
      aiPrompt: `Act as an expert Tech Recruiter specializing in mid-level PM roles.\n\nRewrite the following experience into 3 powerful bullet points using the XYZ Google formula.\n\nRequirements:\n- Start with strong verbs (Led, Spearheaded, Optimised, Defined, Shipped)\n- Include specific metrics: %, $, user counts, NPS scores\n- Show cross-functional collaboration\n- Demonstrate product thinking (why, not just what)\n\nRaw bullets:\n[PASTE YOUR BULLET POINTS HERE]\n\nContext: I'm applying for [ROLE] at [COMPANY TYPE, e.g. Series B SaaS startup].`,
    },
    ready: {
      hrQuote: "At senior level, I'm not reading your CV — I'm scanning for company-scale impact. Tell me the ARR you influenced, the org you led, the strategic bets you made. If I can't see the business outcome in 6 seconds, it's a no.",
      hrName: "David Kim", hrRole: "VP Engineering", hrCompany: "scaleup", hrAvatar: "man",
      aiTitle: "Struggling to elevate this?",
      aiSubtext: "Use this prompt to transform mid-level bullets into executive-grade, business-impact statements.",
      aiPrompt: `Act as an executive CV consultant for senior Product leadership.\n\nElevate the following bullets to Director/VP level:\n1. Lead with business impact at company scale (ARR, retention, market share)\n2. Show strategic ownership (not just execution)\n3. Demonstrate cross-functional leadership (squad size, budget, org influence)\n4. Use executive vocabulary: Spearheaded, Orchestrated, Championed, Architected\n\nCurrent bullets:\n[PASTE YOUR BULLETS HERE]\n\nTarget role: [Director / VP / Senior Lead]\nIndustry: [e.g., B2B SaaS, Enterprise Software, Fintech]`,
    },
  },
  summary: {
    starter: {
      hrQuote: "As a student, your summary should tell me what you're studying, what you're passionate about, and what problem you want to solve. Keep it to 2–3 sentences. Honesty and specificity beats buzzwords every time.",
      hrName: "Sarah Thompson", hrRole: "HR Lead", hrCompany: "shopee", hrAvatar: "woman",
      aiTitle: "Need help with your summary?",
      aiSubtext: "Use this prompt to generate a crisp, professional 2-line summary tailored for entry-level tech roles.",
      aiPrompt: `Act as an expert CV writer for entry-level tech candidates.\n\nWrite a 2–3 sentence professional summary for a student applying for PM/tech roles.\n\nInput:\n- Degree & university: [e.g., BSc CS at VinUni]\n- Graduation year: [e.g., 2025]\n- Key experiences: [e.g., led product club, did data internship]\n- Target role: [e.g., Associate Product Manager]\n\nRequirements:\n- Line 1: degree, university, graduation year\n- Line 2: strongest experience or project\n- Line 3: specific career goal\n- No "I" or "my"\n- Max 60 words`,
    },
    developing: {
      hrQuote: "Your summary is your 30-second pitch. I need seniority, domain, and your biggest win — all in 2 lines. 'PM with 2 years experience' tells me nothing. '2 years scaling onboarding to 50K users, growing NPS 34→61' tells me everything.",
      hrName: "Marcus Lee", hrRole: "Tech Lead", hrCompany: "google", hrAvatar: "man",
      aiTitle: "Struggling to summarise yourself?",
      aiSubtext: "Use this prompt to compress your achievements into a powerful 2-line summary that grabs hiring managers.",
      aiPrompt: `Act as an expert CV writer for mid-level PM candidates.\n\nWrite a 2-sentence professional summary for a PM with 2–4 years experience.\n\nInput:\n- Years of experience: [e.g., 2+ years]\n- Industry/product: [e.g., B2B SaaS, consumer mobile]\n- Strongest metric: [e.g., NPS 34→61, churn reduced 23%]\n- Specialisation: [e.g., Growth PM, Platform, Data]\n\nRequirements:\n- Sentence 1: years + domain + key achievement with number\n- Sentence 2: specialisation + methodology strength\n- No "I" or "my"\n- Max 50 words`,
    },
    ready: {
      hrQuote: "For senior roles, your summary should read like an investment memo. I want the size of your playing field — revenue scale, org impact, market context. One anchor number is worth three paragraphs of soft skills.",
      hrName: "David Kim", hrRole: "VP Engineering", hrCompany: "scaleup", hrAvatar: "man",
      aiTitle: "Need a senior-level summary?",
      aiSubtext: "Use this executive framing prompt to position yourself as a strategic leader, not just a senior IC.",
      aiPrompt: `Act as an executive headhunter writing a senior PM/Product Lead profile.\n\nWrite a 2-sentence executive summary for a Director/VP-level product leader.\n\nInput:\n- Total experience: [e.g., 6 years]\n- Biggest business impact: [e.g., scaled $2M → $18M ARR]\n- Team/org scale: [e.g., 3 squads, 28 people]\n- Target seniority: [Director / VP / Head of Product]\n\nRequirements:\n- Sentence 1: years + company-scale metric (ARR, team, user base)\n- Sentence 2: strategic strength + domain expertise\n- Vocabulary: scaled, architected, championed, drove\n- No "I" or "my" — Max 55 words`,
    },
  },
  projects: {
    starter: {
      hrQuote: "For students, a strong projects section replaces work experience. I don't need a real company — I need to see you define a problem, build something, and measure the outcome. A Figma prototype with 5 test users counts if you frame it right.",
      hrName: "Sarah Thompson", hrRole: "HR Lead", hrCompany: "shopee", hrAvatar: "woman",
      aiTitle: "Need to frame your project better?",
      aiSubtext: "Use this prompt to turn a raw project description into a compelling, recruiter-ready CV entry.",
      aiPrompt: `Act as an expert CV coach for student PM candidates.\n\nReframe the following project into 3 professional bullet points.\n\nProject details:\n- Name: [e.g., Campus Food Delivery App]\n- What you built: [describe plainly]\n- Your role: [led team / did research / built prototypes]\n- Outcome: [award, test users, % improvement]\n\nRequirements:\n- Bullet 1: what you built + role + scope\n- Bullet 2: process (research, testing, design)\n- Bullet 3: outcome with metric\n- Start each with a strong verb — no "I" or "my"`,
    },
    developing: {
      hrQuote: "Projects are underrated by mid-level candidates. A well-framed initiative shows hunger and initiative that standard experience sections often miss. Scannable: problem, what you built, what happened — with numbers.",
      hrName: "Marcus Lee", hrRole: "Tech Lead", hrCompany: "google", hrAvatar: "man",
      aiTitle: "Want to make your project shine?",
      aiSubtext: "Use this prompt to reframe an initiative or side project as a compelling CV entry with measurable impact.",
      aiPrompt: `Act as an expert CV coach for mid-level Product Managers.\n\nReframe the following project as a professional CV entry with 3 bullet points.\n\nContext:\n- Name: [e.g., AI-Powered Onboarding]\n- Problem: [1–2 sentences]\n- Your role: [defined scope / led sprint / coordinated data team]\n- Team: [3 engineers, 1 designer, 1 data scientist]\n- Outcome: [D7 retention +14%, A/B test winner, shipped in 6 weeks]\n\nRequirements:\n- Bullet 1: what shipped + ownership\n- Bullet 2: cross-functional collaboration\n- Bullet 3: measurable impact\n- XYZ formula where possible`,
    },
    ready: {
      hrQuote: "At senior level, I expect initiatives, not projects. Tell me the strategic bet you championed, the cross-org investment you secured, the platform you architected. These entries should feel like mini case studies in leadership.",
      hrName: "David Kim", hrRole: "VP Engineering", hrCompany: "scaleup", hrAvatar: "man",
      aiTitle: "Need to elevate your initiatives?",
      aiSubtext: "Use this prompt to frame a project as an executive-grade strategic initiative.",
      aiPrompt: `Act as an executive CV consultant for senior Product leaders.\n\nElevate the following project to a strategic initiative for a Director/VP CV.\n\nContext:\n- Initiative: [e.g., Enterprise Analytics Platform]\n- Business problem: [company scale]\n- Investment: [e.g., $12M R&D, 4 squads, 12 months]\n- Your role: [product vision owner, exec buy-in]\n- Outcome: [200+ enterprise clients, $X ARR]\n\nRequirements:\n- Bullet 1: strategic context + ownership + investment\n- Bullet 2: stakeholder management + cross-org\n- Bullet 3: company/market scale outcome\n- Vocabulary: Architected, Orchestrated, Championed, Secured`,
    },
  },
  header: {
    starter: {
      hrQuote: "Don't just write 'Student'. Write 'Aspiring Product Manager' or 'CS Student · PM Track'. It signals intent immediately and helps me route your CV to the right hiring manager — before I've read a single bullet.",
      hrName: "Sarah Thompson", hrRole: "HR Lead", hrCompany: "shopee", hrAvatar: "woman",
      aiTitle: "Not sure how to title yourself?",
      aiSubtext: "Use this prompt to generate 5 professional title variants tailored to your target role.",
      aiPrompt: `Act as an expert CV coach for early-career tech candidates.\n\nGenerate 5 professional CV title options for a student targeting [TARGET ROLE].\n\nContext:\n- Status: [Final-year CS student / Recent graduate]\n- Target: [Associate PM / Junior Product Manager]\n- Track: [data analytics / B2B SaaS / mobile apps]\n\nRequirements:\n- 3–7 words per title\n- Signals target role clearly\n- Professional (avoid: "Passionate about", "Hard-working")\n- ATS-friendly\n\nBonus: one LinkedIn headline variant (max 120 chars)`,
    },
    developing: {
      hrQuote: "I see hundreds of generic 'Product Manager' headers weekly. 'Growth PM — B2B SaaS & Analytics' takes 3 seconds and tells me you're specialised. That specificity alone gets you a second look at 4am screening.",
      hrName: "Marcus Lee", hrRole: "Tech Lead", hrCompany: "google", hrAvatar: "man",
      aiTitle: "Want a sharper header?",
      aiSubtext: "Use this prompt to generate a specialised, role-specific title that stands out in ATS scans.",
      aiPrompt: `Act as an expert CV coach for mid-level Product Managers.\n\nGenerate 5 professional CV title options for a PM with 2–4 years experience.\n\nContext:\n- Current role: [PM at TechCorp]\n- Specialisation: [Growth / Platform / Data / B2B SaaS]\n- Target company: [Series B startup / enterprise SaaS]\n- Target seniority: [Senior PM / Product Lead]\n\nRequirements:\n- Domain-specific — not just "PM"\n- 3–8 words per title\n- 2 variants should include a metric or scope signal\n- ATS-friendly\n\nBonus: LinkedIn headline for the strongest option.`,
    },
    ready: {
      hrQuote: "For senior candidates, your header should scream credibility before I read a bullet. 'Senior Product Lead · $18M ARR · Series C' as a subtitle is more powerful than any buzzword summary. Anchor seniority with scope.",
      hrName: "David Kim", hrRole: "VP Engineering", hrCompany: "scaleup", hrAvatar: "man",
      aiTitle: "Positioning yourself as a senior leader?",
      aiSubtext: "Use this prompt to craft an executive header that signals seniority and strategic scope instantly.",
      aiPrompt: `Act as an executive headhunter for senior Product leadership.\n\nCreate a header and subtitle for a Director/VP/Senior Lead CV.\n\nContext:\n- Current title: [Senior PM / Product Lead]\n- Scope indicator: [$18M ARR / Series C / 3 squads]\n- Industry: [B2B SaaS / Fintech / Enterprise]\n- Target: [Director of Product / Head of Product / VP Product]\n\nDeliverables:\n1. Main title (5–8 words, bold positioning)\n2. Subtitle (10–15 words, include scope/metric)\n3. LinkedIn headline (max 120 chars)\n4. One-line email signature tagline`,
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
  const currentStage = stages[Math.min(stageIndex, 3)];
  const isBad = stageIndex === 0;
  const isFinal = stageIndex === 3;
  const containerRef = useRef<HTMLSpanElement>(null);
  const prevIndexRef = useRef(stageIndex);
  const prevIdsRef = useRef(new Set(currentStage.map((s) => s.id)));

  useEffect(() => {
    if (stageIndex === prevIndexRef.current) return;
    const newIds = new Set(currentStage.map((s) => s.id));
    const addedIds = [...newIds].filter((id) => !prevIdsRef.current.has(id));

    if (containerRef.current && addedIds.length > 0) {
      // Small delay ensures DOM has updated
      requestAnimationFrame(() => {
        addedIds.forEach((id) => {
          if (!containerRef.current) return;
          const span = containerRef.current.querySelector(`[data-seg="${id}"]`);
          if (span) {
            const flash = span.getAttribute("data-flash");
            const cls = flash === "green" ? "seg-flash-green" : "seg-flash-blue";
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
        marginBottom: 10,
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
            color: isBad ? "#ef4444" : "#334155",
            letterSpacing: isTitleStyle ? "-0.02em" : "-0.01em",
            transition: "color 0.4s",
            display: "block",
          }}
        >
          {currentStage.map((seg) => {
            const segColor =
              isBad
                ? "#ef4444"
                : seg.flash === "blue"
                ? "#0E56FA"
                : seg.flash === "green"
                ? "#16a34a"
                : "#334155";
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
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const fn = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const { w, h } = dims;

  const spots = [
    // Step 0: Left CV panel
    { x: 12, y: 68, sw: w * 0.5 - 24, sh: h - 80 },
    // Step 1: Level Switcher in TopBar (center)
    { x: w * 0.5 - 148, y: 8, sw: 296, sh: 42 },
    // Step 2: Checklist area (right panel lower portion)
    { x: w * 0.5 + 10, y: Math.round(h * 0.44), sw: w * 0.5 - 24, sh: Math.round(h * 0.46) },
  ];

  const tooltips = [
    // Step 0: tooltip on the right panel side
    { tx: w * 0.5 + 24, ty: Math.round(h * 0.5) - 110 },
    // Step 1: tooltip below the switcher
    { tx: w * 0.5 - 155, ty: 60 },
    // Step 2: tooltip above the checklist, left area
    { tx: 20, ty: Math.round(h * 0.44) - 185 },
  ];

  const { x, y, sw, sh } = spots[step];
  const { tx, ty } = tooltips[step];
  const content = TOUR_CONTENT[step];
  const isLast = step === 2;
  const DIM = "rgba(2,8,24,0.82)";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999 }}
    >
      {/* 4-panel dim overlay around the spotlight hole */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: y, background: DIM }} />
      <div style={{ position: "absolute", top: y + sh, left: 0, right: 0, bottom: 0, background: DIM }} />
      <div style={{ position: "absolute", top: y, left: 0, width: x, height: sh, background: DIM }} />
      <div style={{ position: "absolute", top: y, left: x + sw, right: 0, height: sh, background: DIM }} />

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
          boxShadow: "0 0 0 6px rgba(14,86,250,0.12), 0 0 48px rgba(14,86,250,0.3)",
          pointerEvents: "none",
        }}
      />

      {/* Tooltip card */}
      <motion.div
        key={`tip-${step}`}
        initial={{ opacity: 0, scale: 0.88, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, type: "spring", stiffness: 480, damping: 30 }}
        style={{
          position: "absolute",
          left: Math.max(12, Math.min(tx, w - 332)),
          top: Math.max(8, Math.min(ty, h - 230)),
          width: 308,
          padding: "18px 20px 16px",
          borderRadius: 16,
          background: "white",
          boxShadow: "0 8px 52px rgba(2,8,24,0.4), 0 2px 10px rgba(2,8,24,0.12)",
          zIndex: 10000,
        }}
      >
        {/* Progress pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 13 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                height: 5,
                width: i === step ? 22 : 6,
                borderRadius: 99,
                background: i < step ? "#16a34a" : i === step ? "#0E56FA" : "#E2E8F0",
                transition: "all 0.3s",
              }}
            />
          ))}
          <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.03em" }}>
            {step + 1} / 3
          </span>
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#020818", letterSpacing: "-0.03em", margin: "0 0 7px" }}>
          {content.title}
        </h3>
        <p style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.63, margin: "0 0 16px", letterSpacing: "-0.01em" }}>
          {content.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={onSkip}
            style={{ fontSize: 11, color: "#94a3b8", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}
          >
            Bỏ qua
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
    <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 3, gap: 2 }}>
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
              color: active ? "white" : "#64748b",
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
  level, onSetLevel, onDownload,
}: {
  level: DiagnosticLevel;
  onSetLevel: (l: DiagnosticLevel) => void;
  onDownload: () => void;
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
        <div
          style={{
            width: 28, height: 28, borderRadius: 8, background: "#020818",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: "0 2px 6px rgba(2,8,24,0.2)",
          }}
        >
          <span style={{ color: "white", fontSize: 10, fontWeight: 900, letterSpacing: "-0.05em" }}>SK</span>
        </div>
        <div style={{ width: 1, height: 16, background: "#E2E8F0", flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: "#020818", letterSpacing: "-0.02em" }}>
          Career Survival Kit
        </span>
        <div style={{ marginLeft: 6, padding: "2px 9px", borderRadius: 99, background: "rgba(14,86,250,0.07)", border: "1px solid rgba(14,86,250,0.13)" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#0E56FA", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Step 3 of 4
          </span>
        </div>
      </div>

      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
        <LevelSwitcher level={level} onChange={onSetLevel} />
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onDownload}
          style={{
            display: "flex", alignItems: "center", gap: 7, padding: "7px 15px",
            borderRadius: 8, background: "transparent", border: "1px solid #CBD5E1",
            color: "#64748b", fontSize: 12, fontWeight: 600, cursor: "pointer",
            transition: "all 0.15s", letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#0E56FA";
            (e.currentTarget as HTMLButtonElement).style.color = "#0E56FA";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#CBD5E1";
            (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
          }}
        >
          <Download size={13} strokeWidth={2} />
          Download Full Guide PDF
        </button>
      </div>
    </div>
  );
}

// ─── CV Section Block ─────────────────────────────────────────────────────────

function CVSectionBlock({
  id, isActive, isHovered, onHover, onClick, children,
}: {
  id: CVSection;
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: CVSection | null) => void;
  onClick: (id: CVSection) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(id)}
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
          <span style={{
            fontSize: 8.5, fontWeight: 800, padding: "2px 8px", borderRadius: 99,
            background: "#0E56FA", color: "white", letterSpacing: "0.07em", textTransform: "uppercase",
          }}>
            Selected
          </span>
        </div>
      )}
      {isHovered && !isActive && (
        <div style={{ position: "absolute", top: -10, right: 10 }}>
          <span style={{
            fontSize: 8.5, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
            background: "#E0EAFF", color: "#0E56FA",
          }}>
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
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <span style={{
        fontSize: 9, fontWeight: 800, letterSpacing: "0.14em",
        color: active ? "#0E56FA" : "#94a3b8", textTransform: "uppercase",
        whiteSpace: "nowrap", transition: "color 0.2s",
      }}>
        {text}
      </span>
      <div style={{
        flex: 1, height: 1,
        background: active ? "linear-gradient(90deg, #BFDBFE 0%, transparent 100%)" : "#F1F5F9",
        transition: "background 0.2s",
      }} />
    </div>
  );
}

// ─── Left CV Column ───────────────────────────────────────────────────────────

function LeftCVColumn({
  level, activeSection, hoveredSection, onHover, onActivate, checks, selectedRole,
}: {
  level: DiagnosticLevel;
  activeSection: CVSection;
  hoveredSection: CVSection | null;
  onHover: (id: CVSection | null) => void;
  onActivate: (id: CVSection) => void;
  checks: [boolean, boolean, boolean];
  selectedRole: string | null;
}) {
  const cv = CV_DATA[level];
  const roleData = getRoleLevelData(selectedRole, level);
  const stageIndex = checks.filter(Boolean).length;

  const ACTION_VERBS = new Set(["led","built","conducted","presented","assisted","attended","redesigned","created","defined","shipped","prioritised","analysed","coordinated","designed","collaborated","optimised","spearheaded","orchestrated","championed","drove","owned","architected","secured"]);

  const renderHighlighted = (text: string): React.ReactNode =>
    text.split(/(\s+)/).map((tok, i) => {
      if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
      const clean = tok.replace(/[.,;:!?()\-]+$/g, "").toLowerCase();
      const isVerb = ACTION_VERBS.has(clean);
      const isMet = /\d|%|\$|£|K\+|M\+/.test(tok);
      return (
        <span key={i} style={{ color: isVerb ? "#0E56FA" : isMet ? "#16a34a" : "#334155", fontWeight: isVerb || isMet ? 700 : 400 }}>
          {tok}
        </span>
      );
    });

  return (
    <>
      <style>{`
        .cv-left-scroll::-webkit-scrollbar { width: 6px; }
        .cv-left-scroll::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 99px; margin: 8px 0; }
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

      <div
        className="cv-left-scroll"
        style={{
          width: "50%",
          overflowY: "auto",
          background: "#F1F5F9",
          borderRight: "1px solid #E2E8F0",
          padding: "28px 24px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Instruction chip */}
        <div style={{
          marginBottom: 18, display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
          borderRadius: 99, background: "white", border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0E56FA", flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 500, color: "#64748b" }}>
            Click any section → check items on the right → watch it transform ✨
          </span>
        </div>

        {/* A4 Paper */}
        <div style={{
          background: "white", width: "100%", maxWidth: 520,
          border: "1px solid #E2E8F0", borderRadius: 6,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.07), 0 24px 56px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}>
          <div style={{ height: 3, background: "linear-gradient(90deg, #020818 0%, #0E56FA 100%)" }} />
          <div style={{ padding: "26px 32px 32px" }}>

            {/* ── HEADER ── */}
            <CVSectionBlock id="header" isActive={activeSection === "header"} isHovered={hoveredSection === "header"} onHover={onHover} onClick={onActivate}>
              <div style={{ fontSize: 19, fontWeight: 800, color: "#020818", letterSpacing: "-0.04em", marginBottom: 3 }}>
                {cv.name}
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#64748b", marginBottom: 8, letterSpacing: "-0.01em" }}>
                {roleData.cvTitle}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {[{ icon: Mail, text: cv.email }, { icon: MapPin, text: cv.location }, { icon: ExternalLink, text: cv.linkedin }].map(({ icon: Icon, text }, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Icon size={9} color="#94a3b8" strokeWidth={2} />
                    <span style={{ fontSize: 10, color: "#64748b" }}>{text}</span>
                  </div>
                ))}
              </div>
              {/* Transform demo for header */}
              {activeSection === "header" && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                    {TRANSFORM.header[level].demoLabel}
                  </div>
                  <TransformBullet section="header" stages={TRANSFORM.header[level].stages} stageIndex={stageIndex} />
                </div>
              )}
            </CVSectionBlock>

            {/* ── SUMMARY ── */}
            <CVSectionBlock id="summary" isActive={activeSection === "summary"} isHovered={hoveredSection === "summary"} onHover={onHover} onClick={onActivate}>
              <SectionDivider text="Professional Summary" active={activeSection === "summary"} />
              {activeSection === "summary" && (
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                    {TRANSFORM.summary[level].demoLabel}
                  </div>
                  <TransformBullet section="summary" stages={TRANSFORM.summary[level].stages} stageIndex={stageIndex} />
                  <div style={{ fontSize: 9, fontWeight: 600, color: "#CBD5E1", marginBottom: 6, marginTop: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Good Examples ↓
                  </div>
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.p key={`sum-${level}-${selectedRole}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                  style={{ fontSize: 11, color: "#334155", lineHeight: 1.65, margin: 0, paddingLeft: 2 }}>
                  {roleData.cvSummary}
                </motion.p>
              </AnimatePresence>
            </CVSectionBlock>

            {/* ── EXPERIENCE ── */}
            <CVSectionBlock id="experience" isActive={activeSection === "experience"} isHovered={hoveredSection === "experience"} onHover={onHover} onClick={onActivate}>
              <SectionDivider text="Experience" active={activeSection === "experience"} />
              {activeSection === "experience" && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                    {TRANSFORM.experience[level].demoLabel}
                  </div>
                  <TransformBullet section="experience" stages={TRANSFORM.experience[level].stages} stageIndex={stageIndex} />
                  <div style={{ fontSize: 9, fontWeight: 600, color: "#CBD5E1", marginBottom: 8, marginTop: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Good Examples ↓
                  </div>
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.div key={`exp-${level}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                  {cv.experience.map((entry, idx) => (
                    <div key={idx} style={{ marginBottom: idx < cv.experience.length - 1 ? 14 : 0, paddingLeft: 10, borderLeft: "2px solid #E2E8F0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 1 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#020818", letterSpacing: "-0.02em" }}>{entry.role}</span>
                          <span style={{ fontSize: 10, color: "#64748b" }}>· {entry.company}</span>
                        </div>
                        <span style={{ fontSize: 9, color: "#CBD5E1", whiteSpace: "nowrap" }}>{entry.dates}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 5 }}>
                        {entry.bullets.map((bullet, bi) => (
                          <div key={bi} style={{ display: "flex", gap: 5, alignItems: "flex-start" }}>
                            <span style={{ fontSize: 9.5, color: activeSection === "experience" ? "#0E56FA" : "#CBD5E1", fontWeight: 700, marginTop: 1.5, flexShrink: 0, transition: "color 0.2s" }}>▸</span>
                            <div style={{ fontSize: 10.5, lineHeight: 1.55, letterSpacing: "-0.01em" }}>{renderHighlighted(bullet)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </CVSectionBlock>

            {/* ── PROJECTS ── */}
            <CVSectionBlock id="projects" isActive={activeSection === "projects"} isHovered={hoveredSection === "projects"} onHover={onHover} onClick={onActivate}>
              <SectionDivider text="Projects" active={activeSection === "projects"} />
              {activeSection === "projects" && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                    {TRANSFORM.projects[level].demoLabel}
                  </div>
                  <TransformBullet section="projects" stages={TRANSFORM.projects[level].stages} stageIndex={stageIndex} />
                  <div style={{ fontSize: 9, fontWeight: 600, color: "#CBD5E1", marginBottom: 8, marginTop: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Good Examples ↓
                  </div>
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.div key={`proj-${level}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                  {cv.projects.map((proj, idx) => (
                    <div key={idx} style={{ paddingLeft: 10, borderLeft: "2px solid #E2E8F0" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: 5 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#020818", letterSpacing: "-0.02em" }}>{proj.name}</span>
                        <span style={{ fontSize: 10, color: "#64748b" }}>· {proj.type}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {proj.bullets.map((bullet, bi) => (
                          <div key={bi} style={{ display: "flex", gap: 5, alignItems: "flex-start" }}>
                            <span style={{ fontSize: 9.5, color: activeSection === "projects" ? "#0E56FA" : "#CBD5E1", fontWeight: 700, marginTop: 1.5, flexShrink: 0, transition: "color 0.2s" }}>▸</span>
                            <div style={{ fontSize: 10.5, lineHeight: 1.55, letterSpacing: "-0.01em" }}>{renderHighlighted(bullet)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </CVSectionBlock>
          </div>

          {/* Legend */}
          <div style={{ padding: "8px 32px 12px", borderTop: "1px solid #F8FAFC", display: "flex", gap: 14 }}>
            {[{ color: "#0E56FA", label: "Action Verb" }, { color: "#16a34a", label: "Metric" }].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, background: color }} />
                <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
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
    const next: [boolean, boolean, boolean] = [...checks] as [boolean, boolean, boolean];
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
              border: `1.5px solid ${done ? "#BBF7D0" : enabled ? "#F1F5F9" : "#F8FAFC"}`,
              background: done ? "#F0FDF4" : enabled ? "#FAFBFF" : "#FAFBFF",
              cursor: enabled ? "pointer" : "not-allowed",
              textAlign: "left",
              transition: "all 0.2s",
              width: "100%",
              opacity: enabled ? 1 : 0.45,
              position: "relative",
            }}
          >
            {/* Step number + checkbox */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flexShrink: 0 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  border: `2px solid ${done ? "#16a34a" : enabled ? "#CBD5E1" : "#E2E8F0"}`,
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
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ duration: 0.14, type: "spring", stiffness: 600 }}>
                      <Check size={12} color="white" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <span style={{ fontSize: 9, fontWeight: 800, color: enabled ? "#94a3b8" : "#CBD5E1" }}>
                      {i + 1}
                    </span>
                  )}
                </AnimatePresence>
              </div>
              {/* Connector line */}
              {i < 2 && (
                <div style={{ width: 2, height: 8, background: done ? "#BBF7D0" : "#E2E8F0", borderRadius: 99, transition: "background 0.3s" }} />
              )}
            </div>

            <div style={{ flex: 1, paddingTop: 1 }}>
              <span style={{
                fontSize: 12.5,
                color: done ? "#16a34a" : enabled ? "#334155" : "#94a3b8",
                fontWeight: done ? 600 : 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.5,
                textDecoration: done ? "line-through #86EFAC" : "none",
                transition: "all 0.2s",
                display: "block",
              }}>
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
  section, level, checks, onChecksChange, onContinue, selectedRole,
}: {
  section: CVSection;
  level: DiagnosticLevel;
  checks: [boolean, boolean, boolean];
  onChecksChange: (c: [boolean, boolean, boolean]) => void;
  onContinue: () => void;
  selectedRole: string | null;
}) {
  const data = PANEL_DATA[section][level];
  const roleData = getRoleLevelData(selectedRole, level);
  // Override HR data and checklist with role-specific content
  const hrQuote = roleData.hrQuote;
  const hrName = roleData.hrName;
  const hrRole = roleData.hrRole;
  const hrCompany = roleData.hrCompany;
  const checklistItems = section === "experience"
    ? roleData.experienceChecklist
    : section === "summary"
    ? roleData.summaryChecklist
    : data.hrCompany && TRANSFORM[section][level].checklistItems;
  const transform = TRANSFORM[section][level];
  const panelKey = `${section}-${level}`;
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"helpful" | "love" | null>(null);
  const stageIndex = checks.filter(Boolean).length;
  const allChecked = stageIndex === 3;
  const companyInfo = COMPANY_INFO[hrCompany];

  const handleCopy = () => {
    navigator.clipboard.writeText(data.aiPrompt).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <style>{`
        .cv-right-scroll::-webkit-scrollbar { width: 6px; }
        .cv-right-scroll::-webkit-scrollbar-track { background: #F8FAFC; border-radius: 99px; margin: 8px 0; }
        .cv-right-scroll::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 99px; }
        .cv-right-scroll::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
      <div
        className="cv-right-scroll"
        onScroll={(e) => handleScrollDepthTracking(e, "Screen3Workspace_HRPanel")}
        style={{ width: "50%", overflowY: "auto", background: "white", display: "flex", flexDirection: "column" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={panelKey}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 22, flex: 1 }}
          >
            {/* ── Panel Header ── */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ padding: "3px 10px", borderRadius: 99, background: "rgba(14,86,250,0.07)", border: "1px solid rgba(14,86,250,0.13)" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#0E56FA", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {SECTION_LABEL[section]}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>
                  {LEVEL_OPTS.find((o) => o.id === level)?.emoji} {LEVEL_LABEL[level]}
                </span>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#020818", letterSpacing: "-0.04em", margin: 0, lineHeight: 1.2 }}>
                Mastering {SECTION_LABEL[section]} ({LEVEL_LABEL[level]})
              </h2>
            </div>

            {/* ── Block 1: HR Quote with Company Logo ── */}
            <div style={{ borderRadius: 14, border: "1px solid #E2E8F0", background: "white", padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #E2E8F0" }}>
                  <img src={data.hrAvatar === "man" ? AVATAR_MAN : AVATAR_WOMAN} alt={hrName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#020818", letterSpacing: "-0.02em" }}>{hrName}</span>
                    {/* Enhanced company badge */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "3px 9px 3px 7px",
                      borderRadius: 6,
                      background: companyInfo.color,
                      boxShadow: `0 2px 8px ${companyInfo.color}55`,
                      flexShrink: 0,
                    }}>
                      <Building2 size={9} color={companyInfo.textColor} strokeWidth={2.5} style={{ opacity: 0.85 }} />
                      <span style={{
                        fontSize: 9.5,
                        fontWeight: 800,
                        color: companyInfo.textColor,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}>
                        {companyInfo.name}
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: 10.5, color: "#94a3b8" }}>{hrRole}</div>
                </div>
                {/* Verified badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "3px 9px",
                  borderRadius: 7,
                  background: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", flexShrink: 0 }} />
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: "#16a34a", letterSpacing: "0.04em", textTransform: "uppercase" }}>Verified</span>
                </div>
              </div>
              <div style={{ padding: "12px 14px", borderRadius: 10, background: "#FAFBFF", border: "1px solid #F1F5F9", position: "relative" }}>
                <span style={{ position: "absolute", top: 8, left: 12, fontSize: 28, color: "#BFDBFE", lineHeight: 1, fontFamily: "Georgia, serif", pointerEvents: "none" }}>"</span>
                <p style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.65, margin: 0, paddingTop: 16, fontStyle: "italic", letterSpacing: "-0.01em" }}>
                  {hrQuote}
                </p>
              </div>
              
              {/* Feedback Loop */}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #F1F5F9" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Was this insight helpful?</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFeedback(feedback === "helpful" ? null : "helpful")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 12px",
                        borderRadius: 99,
                        border: `1.5px solid ${feedback === "helpful" ? "#0E56FA" : "#E2E8F0"}`,
                        background: feedback === "helpful" ? "rgba(14,86,250,0.08)" : "white",
                        color: feedback === "helpful" ? "#0E56FA" : "#64748b",
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <ThumbsUp size={12} strokeWidth={2.5} />
                      Helpful
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFeedback(feedback === "love" ? null : "love")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 12px",
                        borderRadius: 99,
                        border: `1.5px solid ${feedback === "love" ? "#dc2626" : "#E2E8F0"}`,
                        background: feedback === "love" ? "rgba(220,38,38,0.08)" : "white",
                        color: feedback === "love" ? "#dc2626" : "#64748b",
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <Heart size={12} strokeWidth={2.5} fill={feedback === "love" ? "#dc2626" : "none"} />
                      Love it
                    </motion.button>
                  </div>
                </div>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 8 }}
                  >
                    <span style={{ fontSize: 10.5, color: "#16a34a", fontWeight: 600 }}>
                      ✨ Thank you for your feedback!
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── Block 2: Step Checklist ── */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(14,86,250,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={11} color="#0E56FA" strokeWidth={3} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#020818", letterSpacing: "-0.02em" }}>
                  Self-Audit Checklist
                </span>
                {/* Progress indicator */}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ display: "flex", gap: 3 }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{ width: 7, height: 7, borderRadius: 2, background: checks[i] ? "#16a34a" : "#E2E8F0", transition: "background 0.3s" }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: stageIndex === 3 ? "#16a34a" : "#94a3b8" }}>
                    {stageIndex}/3
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 11.5, color: "#64748b", margin: "0 0 10px", letterSpacing: "-0.01em" }}>
                Tick each step — watch the CV bullet transform on the left ←
              </p>
              <StepChecklist
                items={(checklistItems as [string, string, string]) || transform.checklistItems}
                checks={checks}
                onChange={onChecksChange}
              />

              {/* All-done celebration */}
              <AnimatePresence>
                {stageIndex === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, type: "spring", stiffness: 400 }}
                    style={{
                      marginTop: 10, padding: "10px 14px", borderRadius: 10,
                      background: "linear-gradient(135deg, #F0FDF4, #DCFCE7)",
                      border: "1px solid #BBF7D0",
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a" }}>
                      🎉 Perfect! All 3 improvements applied. Your bullet is now HR-ready.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Block 3: AI Prompt (Locked/Unlocked Progressive Disclosure) ── */}
            <div style={{ 
              borderRadius: 14, 
              padding: "18px 20px", 
              position: "relative", 
              overflow: "hidden",
              background: allChecked 
                ? "linear-gradient(135deg, rgba(14,86,250,0.03) 0%, rgba(109,40,217,0.04) 100%)"
                : "linear-gradient(135deg, rgba(148,163,184,0.06) 0%, rgba(203,213,225,0.08) 100%)",
              transition: "background 0.5s",
            }}>
              {/* Gradient border */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: 14, padding: 1.5,
                background: allChecked
                  ? "linear-gradient(135deg, rgba(14,86,250,0.35), rgba(109,40,217,0.35))"
                  : "linear-gradient(135deg, rgba(148,163,184,0.25), rgba(203,213,225,0.25))",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor", maskComposite: "exclude", pointerEvents: "none",
                transition: "background 0.5s",
              }} />
              
              {!allChecked ? (
                /* LOCKED STATE */
                <motion.div 
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ position: "relative", zIndex: 1, textAlign: "center" }}
                >
                  <div style={{ 
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #F1F5F9, #E2E8F0)",
                    marginBottom: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
                  }}>
                    <Lock size={24} color="#94a3b8" strokeWidth={2} />
                  </div>
                  <h3 style={{ 
                    fontSize: 14, 
                    fontWeight: 800, 
                    color: "#020818", 
                    letterSpacing: "-0.02em",
                    margin: "0 0 8px",
                  }}>
                    🔒 Exclusive AI Prompt — Locked
                  </h3>
                  <p style={{ 
                    fontSize: 12, 
                    color: "#64748b", 
                    lineHeight: 1.6, 
                    margin: "0 0 6px",
                    letterSpacing: "-0.01em" 
                  }}>
                    Complete <strong style={{ color: "#0E56FA" }}>3/3 checklist items</strong> above to unlock the premium ChatGPT rewrite prompt.
                  </p>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 10px",
                    borderRadius: 99,
                    background: "rgba(14,86,250,0.08)",
                    border: "1px solid rgba(14,86,250,0.15)",
                    marginTop: 6,
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#0E56FA", letterSpacing: "0.02em" }}>
                      {stageIndex}/3 Completed
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
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
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
                  
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <Sparkles size={15} color="#6d28d9" strokeWidth={2} />
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#020818", letterSpacing: "-0.02em" }}>
                      {data.aiTitle}
                    </span>
                    <span style={{ 
                      fontSize: 9, 
                      fontWeight: 800, 
                      padding: "2px 7px",
                      borderRadius: 99,
                      background: "#16a34a",
                      color: "white",
                      letterSpacing: "0.03em",
                      textTransform: "uppercase"
                    }}>
                      Unlocked
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: "0 0 14px", letterSpacing: "-0.01em" }}>
                    {data.aiSubtext}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      trackEvent("prompt_copied");
                      handleCopy();
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 7, padding: "9px 18px",
                      borderRadius: 9, background: copied ? "#16a34a" : "#0E56FA",
                      border: "none", color: "white", fontSize: 12.5, fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: copied ? "0 3px 12px rgba(22,163,74,0.35)" : "0 3px 12px rgba(14,86,250,0.35)",
                      transition: "background 0.2s, box-shadow 0.2s", letterSpacing: "-0.01em",
                    }}
                  >
                    {copied ? <CheckCheck size={14} strokeWidth={2.5} /> : <Sparkles size={14} strokeWidth={2.5} />}
                    {copied ? "Copied! Paste into ChatGPT →" : "✨ Copy AI Prompt Template"}
                  </motion.button>
                  {copied && (
                    <motion.p 
                      initial={{ opacity: 0, y: 4 }} 
                      animate={{ opacity: 1, y: 0 }}
                      style={{ fontSize: 11, color: "#16a34a", margin: "8px 0 0", fontWeight: 500 }}>
                      Paste this into ChatGPT along with your raw bullet points.
                    </motion.p>
                  )}
                </motion.div>
              )}
            </div>

            {/* ── Continue ── */}
            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 18, display: "flex", justifyContent: "flex-end" }}>
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.97 }}
                onClick={onContinue}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 18px",
                  borderRadius: 9, background: "#020818", border: "none", color: "white",
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 2px 10px rgba(2,8,24,0.18)", letterSpacing: "-0.01em",
                }}
              >
                Continue to Final Summary
                <ArrowRight size={13} strokeWidth={2.5} />
              </motion.button>
            </div>
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
}

export function Screen3Workspace({ level, onSetLevel, selectedRole, onComplete }: Screen3Props) {
  const [activeSection, setActiveSection] = useState<CVSection>("experience");
  const [hoveredSection, setHoveredSection] = useState<CVSection | null>(null);
  const [checks, setChecks] = useState<[boolean, boolean, boolean]>([false, false, false]);

  // ── Tour state ──────────────────────────────────────────────────────────────
  const [tourStep, setTourStep] = useState<number | null>(null);

  useEffect(() => {
    const seen = localStorage.getItem("cv_survival_tour_v1");
    if (!seen) {
      // Brief delay so the workspace has time to render
      const t = setTimeout(() => setTourStep(0), 420);
      return () => clearTimeout(t);
    }
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
  const [microToast, setMicroToast] = useState<{ key: number; step: number } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChecksChange = (newChecks: [boolean, boolean, boolean]) => {
    for (let i = 0; i < 3; i++) {
      if (newChecks[i] && !checks[i]) {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setMicroToast({ key: Date.now(), step: i });
        toastTimerRef.current = setTimeout(() => setMicroToast(null), 2600);
        break;
      }
    }
    setChecks(newChecks);
  };

  // Reset checks whenever section or level changes
  useEffect(() => {
    setChecks([false, false, false]);
  }, [activeSection, level]);

  const handleActivate = (id: CVSection) => {
    setActiveSection(id);
  };

  const handleContinue = () => {
    onComplete("Led cross-functional team to redesign onboarding flow, reducing drop-off by 23%");
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#FAFBFF",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      WebkitFontSmoothing: "antialiased",
    }}>
      <TopNav level={level} onSetLevel={onSetLevel} onDownload={handleContinue} />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <LeftCVColumn
          level={level}
          activeSection={activeSection}
          hoveredSection={hoveredSection}
          onHover={setHoveredSection}
          onActivate={handleActivate}
          checks={checks}
          selectedRole={selectedRole}
        />
        <RightInsightPanel
          section={activeSection}
          level={level}
          checks={checks}
          onChecksChange={handleChecksChange}
          onContinue={handleContinue}
          selectedRole={selectedRole}
        />
      </div>

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
            transition={{ duration: 0.26, type: "spring", stiffness: 500, damping: 28 }}
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
              boxShadow: "0 4px 28px rgba(0,0,0,0.15), 0 1px 5px rgba(0,0,0,0.07)",
              border: `1.5px solid ${MICRO_REACTIONS[microToast.step].color}30`,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {/* Coloured left dot */}
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: MICRO_REACTIONS[microToast.step].color,
              flexShrink: 0,
              boxShadow: `0 0 8px ${MICRO_REACTIONS[microToast.step].color}80`,
            }} />
            <span style={{ fontSize: 16, lineHeight: 1 }}>{MICRO_REACTIONS[microToast.step].emoji}</span>
            <span style={{
              fontSize: 12.5,
              fontWeight: 700,
              color: MICRO_REACTIONS[microToast.step].color,
              letterSpacing: "-0.01em",
            }}>
              {MICRO_REACTIONS[microToast.step].text}
            </span>
            {/* Applied badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "2px 9px",
              borderRadius: 99,
              background: `${MICRO_REACTIONS[microToast.step].color}14`,
              border: `1px solid ${MICRO_REACTIONS[microToast.step].color}30`,
            }}>
              <Wand2 size={9} color={MICRO_REACTIONS[microToast.step].color} strokeWidth={2.5} />
              <span style={{ fontSize: 10, fontWeight: 700, color: MICRO_REACTIONS[microToast.step].color }}>
                Applied to CV ✓
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
