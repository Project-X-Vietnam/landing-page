"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  Brain,
  Check,
  ChevronRight,
  Copy,
  Menu,
  MessageCircle,
  User,
} from "lucide-react";

type Platform = "Claude" | "ChatGPT" | "Gemini";
type PromptCategory =
  | "All"
  | "Product"
  | "Growth"
  | "Data & Analytics"
  | "Business"
  | "Technical"
  | "Behavioral";

type PromptItem = {
  id: string;
  category: Exclude<PromptCategory, "All">;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  role: string;
  prompt: string;
};

const stepLabels = [
  "Hero",
  "What is this?",
  "How it works",
  "Setup form",
  "Setup guide",
  "Sample prompts",
];

const featureCards = [
  {
    icon: Brain,
    title: "Structured Thinking Practice",
    description:
      "Most candidates fail interviews not from lack of knowledge, but because they can't structure their thinking under pressure. PJX Case Trainer fixes that.",
  },
  {
    icon: MessageCircle,
    title: "AI-Guided Coaching",
    description:
      "A Socratic AI coach walks you through 5 structured steps — Define, Decompose, Hypothesize, Analyze, Recommend — without giving you the answers.",
  },
  {
    icon: BarChart2,
    title: "Evidence-Based Feedback",
    description:
      "After each session, an AI evaluator scores you across 5 dimensions: Problem Framing, Structure, Logic & Evidence, Insight, and Communication.",
  },
];

const workflowSteps = [
  {
    label: "DEFINE",
    description:
      "Clarify the goal, user, and at least one constraint before solving anything.",
  },
  {
    label: "DECOMPOSE",
    description:
      "Break the problem into logical, non-overlapping components (MECE thinking).",
  },
  {
    label: "HYPOTHESIZE",
    description:
      "State what you believe is happening — and why — before diving into analysis.",
  },
  {
    label: "ANALYZE",
    description:
      "Test your hypothesis with reasoning chains, data references, and trade-offs.",
  },
  {
    label: "RECOMMEND",
    description:
      "Deliver a structured answer: recommendation + reasons + success metrics + risks.",
  },
];

const rubricRows = [
  {
    dimension: "Problem Framing",
    weight: "25%",
    assessed: "Scope, user, constraint defined clearly",
  },
  {
    dimension: "Structure",
    weight: "25%",
    assessed: "Logical, non-overlapping components",
  },
  {
    dimension: "Logic & Evidence",
    weight: "20%",
    assessed: "Claims supported by reasoning or data",
  },
  {
    dimension: "Insight",
    weight: "15%",
    assessed: "Non-obvious implications identified",
  },
  {
    dimension: "Communication",
    weight: "15%",
    assessed: "Coherent and easy to follow",
  },
];

const setupContent: Record<
  Platform,
  {
    title: string;
    steps: string[];
    tip: string;
  }
> = {
  Claude: {
    title: "Setting Up on Claude (Recommended)",
    steps: [
      'Go to claude.ai → Projects → Create Project → name it "PJX Case Trainer"',
      "Paste Prompt A (Coach) into Project Instructions → Save",
      "Open a new chat inside the project and start your session",
      'After completing all 5 steps, swap to Prompt B (Evaluator) in a new chat, paste your transcript, and type: "Please evaluate my performance across all 5 dimensions now."',
    ],
    tip: "💡 Pro tip: Claude supports voice input on mobile. Tap the microphone icon to speak your answers — great for practicing out loud like a real interview.",
  },
  ChatGPT: {
    title: "Setting Up on ChatGPT",
    steps: [
      'Go to chatgpt.com → Explore GPTs → Create → name it "PJX Case Trainer"',
      "Paste Prompt A (Coach) into the Instructions field → Save (Only me)",
      "Start a new session and work through all 5 steps",
      "Create a second GPT with Prompt B (Evaluator), paste the transcript, and request your evaluation",
    ],
    tip: "💡 Pro tip: ChatGPT on mobile supports voice input. Use it to practice speaking your answers as you would in a real interview.",
  },
  Gemini: {
    title: "Setting Up on Gemini",
    steps: [
      'Go to gemini.google.com → Gems → Create a Gem → name it "PJX Case Trainer"',
      "Paste Prompt A (Coach) into the Instructions field → Save",
      "Open the Gem and start your session",
      "Use a separate Gem instance with Prompt B (Evaluator) for your post-session debrief",
    ],
    tip: "💡 Pro tip: Gemini supports voice input on Android and in the mobile app. Speaking your answers aloud builds the muscle memory you need for real interviews.",
  },
};

const promptItems: PromptItem[] = [
  {
    id: "product-1",
    category: "Product",
    title: "Improve Retention in a Music App",
    difficulty: "Beginner",
    role: "PM/PO",
    prompt:
      "Give me a Product case: A mobile music streaming app has seen a 15% drop in D30 retention over the past quarter. The core listener experience hasn't changed. How would you diagnose and address this?",
  },
  {
    id: "product-2",
    category: "Product",
    title: "Prioritise Checkout Features",
    difficulty: "Intermediate",
    role: "PM/PO",
    prompt:
      "Give me a Product case: You're the PM for an e-commerce platform. Engineering has capacity for one feature this sprint. You have three checkout improvement options: saved payment methods, one-click reorder, and guest checkout. How do you decide?",
  },
  {
    id: "growth-1",
    category: "Growth",
    title: "Increase Acquisition for a Fintech App",
    difficulty: "Intermediate",
    role: "PM/PO, BA",
    prompt:
      "Give me a Growth case: A fintech app for personal budgeting has strong retention (D30 = 45%) but low top-of-funnel acquisition. Monthly new installs have plateaued at 8,000 for three months. How would you approach growing acquisition?",
  },
  {
    id: "growth-2",
    category: "Growth",
    title: "Re-activate Churned Users",
    difficulty: "Advanced",
    role: "PM/PO, BA",
    prompt:
      "Give me a Growth case: 30% of your previously active users have not opened the app in 60+ days. Re-engagement email CTR is 2%. How would you build a re-activation strategy?",
  },
  {
    id: "data-1",
    category: "Data & Analytics",
    title: "Diagnose a 20% Drop in DAU",
    difficulty: "Beginner",
    role: "BA/DA",
    prompt:
      "Give me a Data case: Your DAU has dropped 20% over the past two weeks. No new features were shipped. Walk me through how you would diagnose the root cause.",
  },
  {
    id: "data-2",
    category: "Data & Analytics",
    title: "Interpret A/B Test Results",
    difficulty: "Intermediate",
    role: "BA/DA",
    prompt:
      "Give me a Data case: An A/B test on your onboarding flow showed a 12% improvement in activation rate for the variant, but a 5% decrease in D7 retention. How do you interpret these results and what do you recommend?",
  },
  {
    id: "business-1",
    category: "Business",
    title: "Market Entry to Da Nang",
    difficulty: "Intermediate",
    role: "BA/DA, PM",
    prompt:
      "Give me a Business case: A Vietnamese food delivery startup operating in Hanoi and HCMC is considering expanding to Da Nang. How would you assess the opportunity and structure a go/no-go recommendation?",
  },
  {
    id: "business-2",
    category: "Business",
    title: "Monetisation Strategy for a Marketplace",
    difficulty: "Advanced",
    role: "BA/DA, PM",
    prompt:
      "Give me a Business case: A peer-to-peer service marketplace (like Fiverr) currently takes 0% commission to grow GMV. The board wants to introduce monetisation. What model would you recommend and why?",
  },
  {
    id: "technical-1",
    category: "Technical",
    title: "Design a Scalable Notification System",
    difficulty: "Intermediate",
    role: "SWE, AI/ML",
    prompt:
      "Give me a Technical case: Design a notification system that can support 10 million users receiving push, email, and in-app notifications. Walk through your architecture decisions and key trade-offs.",
  },
  {
    id: "technical-2",
    category: "Technical",
    title: "Explain Microservices Trade-offs",
    difficulty: "Advanced",
    role: "SWE",
    prompt:
      "Give me a Technical case: Your team is considering migrating a monolithic application to microservices. What are the key trade-offs, and how would you structure the decision?",
  },
  {
    id: "behavioral-1",
    category: "Behavioral",
    title: "Walk Through a Project Trade-off",
    difficulty: "Beginner",
    role: "All",
    prompt:
      "Give me a Behavioral case: Tell me about a time you had to make a trade-off between speed and quality on a project. How did you approach it and what was the outcome?",
  },
  {
    id: "behavioral-2",
    category: "Behavioral",
    title: "Describe a Stakeholder Disagreement",
    difficulty: "Intermediate",
    role: "All",
    prompt:
      "Give me a Behavioral case: Describe a situation where you disagreed with a stakeholder or manager on a key decision. How did you handle it?",
  },
];

function getDifficultyClasses(level: PromptItem["difficulty"]) {
  if (level === "Beginner") {
    return "border-emerald-400/25 bg-emerald-400/12 text-emerald-200";
  }

  if (level === "Intermediate") {
    return "border-amber-400/25 bg-amber-400/12 text-amber-200";
  }

  return "border-rose-400/25 bg-rose-400/12 text-rose-200";
}

function ScreenFrame({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-dm text-xs uppercase tracking-[0.28em] text-[#00C9B1]/85">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-syne text-4xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
            {title}
          </h2>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [activePlatform, setActivePlatform] = useState<Platform>("Claude");
  const [activeFilter, setActiveFilter] = useState<PromptCategory>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const visiblePlatforms = useMemo<Platform[]>(
    () =>
      selectedPlatforms.length ? selectedPlatforms : ["Claude", "ChatGPT", "Gemini"],
    [selectedPlatforms],
  );

  useEffect(() => {
    if (!visiblePlatforms.includes(activePlatform)) {
      setActivePlatform(visiblePlatforms[0]);
    }
  }, [activePlatform, visiblePlatforms]);

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform],
    );
  };

  const handleSetupSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setFormError("Please enter your name and email before continuing.");
      return;
    }

    setFormError("");
    goToStep(5);
  };

  const handleCopyPrompt = async (id: string, prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1400);
    } catch (error) {
      console.error("Failed to copy prompt", error);
    }
  };

  const filteredPrompts =
    activeFilter === "All"
      ? promptItems
      : promptItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Syne:wght@700;800&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          background: #0d1117;
          color: #ffffff;
          font-family: "DM Sans", sans-serif;
        }

        .font-syne {
          font-family: "Syne", sans-serif;
        }

        .font-dm {
          font-family: "DM Sans", sans-serif;
        }
      `}</style>

      <main className="relative min-h-screen overflow-hidden bg-[#0D1117] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,201,177,0.12),transparent_0,transparent_30%),radial-gradient(circle_at_85%_18%,rgba(0,201,177,0.08),transparent_0,transparent_28%),radial-gradient(circle_at_50%_85%,rgba(0,201,177,0.06),transparent_0,transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.8px)] [background-position:0_0] [background-size:7px_7px]" />

        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#0D1117]/70 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-5">
            <div className="font-syne text-base font-bold tracking-[-0.03em] text-white sm:text-lg">
              PJX Case Trainer
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
              aria-label="Toggle navigation"
            >
              <Menu className="h-4 w-4" />
            </button>

            <nav className="hidden items-center gap-6 md:flex">
              <button
                type="button"
                onClick={() => goToStep(5)}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Setup Guide
              </button>
              <button
                type="button"
                onClick={() => goToStep(6)}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Sample Prompts
              </button>
            </nav>
          </div>

          {menuOpen ? (
            <div className="mx-auto mt-3 flex max-w-7xl flex-col gap-2 rounded-3xl border border-white/10 bg-[#111826]/90 p-4 backdrop-blur-xl md:hidden">
              <button
                type="button"
                onClick={() => goToStep(5)}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-sm text-white/78"
              >
                Setup Guide
              </button>
              <button
                type="button"
                onClick={() => goToStep(6)}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-sm text-white/78"
              >
                Sample Prompts
              </button>
            </div>
          ) : null}
        </header>

        <div className="fixed inset-x-0 top-[86px] z-40 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-4 rounded-2xl border border-white/10 bg-[#0F1624]/70 px-4 py-3 backdrop-blur-xl">
            <div className="hidden min-w-0 items-center gap-2 md:flex">
              {stepLabels.map((label, index) => {
                const step = index + 1;
                const active = step === currentStep;
                const complete = step < currentStep;

                return (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                        active
                          ? "bg-[#00C9B1] text-[#081017]"
                          : complete
                            ? "bg-white/15 text-white"
                            : "bg-white/6 text-white/45"
                      }`}
                    >
                      {step}
                    </div>
                    <span
                      className={`text-xs ${
                        active ? "text-white" : "text-white/45"
                      }`}
                    >
                      {label}
                    </span>
                    {step < stepLabels.length ? (
                      <ChevronRight className="h-3.5 w-3.5 text-white/20" />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="md:hidden">
              <p className="text-xs uppercase tracking-[0.24em] text-[#00C9B1]/85">
                Step {currentStep} of {stepLabels.length}
              </p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: direction > 0 ? 72 : -72 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -72 : 72 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentStep === 1 ? (
              <section className="relative flex min-h-screen items-center justify-center px-4 pb-12 pt-32 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,201,177,0.16),transparent_0,transparent_42%)]" />
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#00C9B1]/85 backdrop-blur-md">
                    Project X Vietnam
                  </div>
                  <h1 className="mt-8 font-syne text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                    Train Smarter.
                    <br />
                    Interview Better.
                  </h1>
                  <p className="mt-6 max-w-3xl text-balance text-base leading-8 text-white/72 sm:text-lg">
                    PJX Case Trainer is your AI-powered practice coach — built
                    to help you think in structure, communicate under pressure,
                    and walk into any tech interview ready.
                  </p>
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#00C9B1] px-8 py-4 font-medium text-[#081017] shadow-[0_0_40px_rgba(0,201,177,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
                  >
                    Explore the Product
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </section>
            ) : null}

            {currentStep === 2 ? (
              <ScreenFrame eyebrow="Step 1" title="What is PJX Case Trainer?">
                <div className="grid gap-6 lg:grid-cols-3">
                  {featureCards.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <article
                        key={feature.title}
                        className="rounded-[28px] border border-white/10 bg-white/[0.045] p-7 shadow-[0_18px_48px_rgba(0,0,0,0.16)] backdrop-blur-md"
                      >
                        <div className="inline-flex rounded-2xl border border-[#00C9B1]/20 bg-[#00C9B1]/10 p-3 text-[#00C9B1]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="mt-6 font-syne text-2xl font-bold tracking-[-0.03em] text-white">
                          {feature.title}
                        </h3>
                        <p className="mt-4 text-base leading-7 text-white/68">
                          {feature.description}
                        </p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-7 py-4 text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#00C9B1]/30 hover:bg-[#00C9B1]/10"
                  >
                    Next: How It Works
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </ScreenFrame>
            ) : null}

            {currentStep === 3 ? (
              <ScreenFrame eyebrow="Step 2" title="How It Works">
                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {workflowSteps.map((step, index) => (
                      <article
                        key={step.label}
                        className="rounded-[26px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-md"
                      >
                        <p className="font-dm text-xs uppercase tracking-[0.18em] text-[#00C9B1]/85">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-4 font-syne text-xl font-bold tracking-[-0.03em] text-white">
                          {step.label}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-white/68">
                          {step.description}
                        </p>
                      </article>
                    ))}
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-md">
                    <h3 className="font-syne text-2xl font-bold tracking-[-0.03em] text-white">
                      Scoring rubric
                    </h3>
                    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                      <div className="grid grid-cols-[1.1fr_0.45fr_1.35fr] bg-white/[0.05] px-4 py-3 text-xs uppercase tracking-[0.16em] text-white/55">
                        <span>Dimension</span>
                        <span>Weight</span>
                        <span>What&apos;s Assessed</span>
                      </div>
                      {rubricRows.map((row) => (
                        <div
                          key={row.dimension}
                          className="grid grid-cols-[1.1fr_0.45fr_1.35fr] border-t border-white/8 px-4 py-4 text-sm text-white/72"
                        >
                          <span>{row.dimension}</span>
                          <span>{row.weight}</span>
                          <span>{row.assessed}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#00C9B1] px-8 py-4 font-medium text-[#081017] shadow-[0_0_40px_rgba(0,201,177,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
                  >
                    Get Started
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </ScreenFrame>
            ) : null}

            {currentStep === 4 ? (
              <ScreenFrame
                eyebrow="Step 3"
                title="Let&apos;s Set You Up"
              >
                <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-8">
                  <p className="text-center text-base leading-7 text-white/68">
                    Tell us a little about yourself so we can show you the exact
                    setup for your tools.
                  </p>

                  <div className="mt-8 grid gap-5">
                    <div>
                      <label className="text-sm text-white/80">Name</label>
                      <div className="relative mt-2">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                        <input
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="Your name"
                          className="h-12 w-full rounded-2xl border border-white/10 bg-[#121826] pl-11 pr-4 text-white outline-none transition focus:border-[#00C9B1]/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white/80">Email</label>
                      <div className="relative mt-2">
                        <Copy className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="Your email"
                          className="h-12 w-full rounded-2xl border border-white/10 bg-[#121826] pl-11 pr-4 text-white outline-none transition focus:border-[#00C9B1]/40"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-white/80">
                        Which AI platform do you use?
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {(["Claude", "ChatGPT", "Gemini"] as Platform[]).map(
                          (platform) => {
                            const selected = selectedPlatforms.includes(platform);
                            return (
                              <button
                                key={platform}
                                type="button"
                                onClick={() => togglePlatform(platform)}
                                className={`rounded-full border px-4 py-2.5 text-sm transition ${
                                  selected
                                    ? "border-[#00C9B1]/35 bg-[#00C9B1]/16 text-white"
                                    : "border-white/10 bg-white/[0.03] text-white/68 hover:border-white/20 hover:text-white"
                                }`}
                              >
                                {platform}
                                {platform === "Claude" ? " (recommended)" : ""}
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>

                    {formError ? (
                      <p className="text-sm text-rose-300">{formError}</p>
                    ) : null}

                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={handleSetupSubmit}
                        className="inline-flex items-center gap-2 rounded-full bg-[#00C9B1] px-8 py-4 font-medium text-[#081017] shadow-[0_0_40px_rgba(0,201,177,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
                      >
                        Show My Setup Guide
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

            {currentStep === 5 ? (
              <ScreenFrame
                eyebrow="Step 4"
                title="Your Setup Guide"
              >
                <div id="setup-guide" className="scroll-mt-32">
                  <p className="mx-auto max-w-3xl text-center text-base leading-7 text-white/68">
                    Follow the steps below for each platform you selected.
                  </p>

                  <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-md sm:p-8">
                    <div className="rounded-[24px] border border-white/8 bg-[#111827] p-5">
                      <p className="font-dm text-xs uppercase tracking-[0.18em] text-[#00C9B1]/85">
                        Before you start
                      </p>
                      <ul className="mt-4 space-y-3">
                        <li className="text-sm leading-6 text-white/72">
                          • You have an AI account (ChatGPT / Claude / Gemini)
                        </li>
                        <li className="text-sm leading-6 text-white/72">
                          • You have 30–45 minutes
                        </li>
                        <li className="text-sm leading-6 text-white/72">
                          • You will copy the system prompt (do not modify it)
                        </li>
                      </ul>
                      <div className="mt-4 rounded-2xl border border-[#00C9B1]/18 bg-[#00C9B1]/10 px-4 py-3 text-sm text-white/78">
                        Tip: You can use voice input to interact faster with
                        the AI.
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
                      {visiblePlatforms.map((platform) => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => setActivePlatform(platform)}
                          className={`rounded-full border px-4 py-2.5 text-sm transition ${
                            activePlatform === platform
                              ? "border-[#00C9B1]/35 bg-[#00C9B1]/16 text-white"
                              : "border-white/10 bg-white/[0.03] text-white/68 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 rounded-[28px] border border-white/10 bg-[#111826] p-6">
                      <h3 className="font-syne text-3xl font-bold tracking-[-0.03em] text-white">
                        {setupContent[activePlatform].title}
                      </h3>

                      <ol className="mt-6 space-y-4">
                        {setupContent[activePlatform].steps.map((step, index) => (
                          <li
                            key={`${activePlatform}-${step}`}
                            className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
                          >
                            <span className="mt-0.5 font-dm text-xs uppercase tracking-[0.18em] text-[#00C9B1]/85">
                              {index + 1}
                            </span>
                            <span className="text-sm leading-6 text-white/76">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>

                      <div className="mt-6 rounded-2xl border border-[#00C9B1]/20 bg-[#00C9B1]/10 px-4 py-4 text-sm leading-6 text-white/80">
                        {setupContent[activePlatform].tip}
                      </div>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-[24px] border border-amber-400/20 bg-amber-400/[0.08] p-5">
                        <p className="text-sm leading-6 text-white/80">
                          ⚠️ Important: Do not modify the system prompt. Any
                          changes may break the step-tracking logic or
                          evaluation output. Copy it exactly as provided.
                        </p>
                      </div>

                      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                        <p className="font-dm text-xs uppercase tracking-[0.18em] text-[#00C9B1]/85">
                          Difficulty Progression
                        </p>
                        <div className="mt-4 space-y-3 text-sm leading-6 text-white/72">
                          <p>
                            <span className="font-medium text-white">
                              Sessions 1–3:
                            </span>{" "}
                            Beginner — get familiar with the 5-step structure
                          </p>
                          <p>
                            <span className="font-medium text-white">
                              Sessions 4–8:
                            </span>{" "}
                            Intermediate — deepen reasoning and framework
                            application
                          </p>
                          <p>
                            <span className="font-medium text-white">
                              Sessions 9+:
                            </span>{" "}
                            Advanced — practice under pressure and ambiguity
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex justify-center">
                      <button
                        type="button"
                        onClick={() => goToStep(6)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#00C9B1] px-8 py-4 font-medium text-[#081017] shadow-[0_0_40px_rgba(0,201,177,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
                      >
                        See Sample Prompts
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScreenFrame>
            ) : null}

            {currentStep === 6 ? (
              <ScreenFrame
                eyebrow="Step 5"
                title="Sample Prompts to Get Started"
              >
                <div id="sample-prompts" className="scroll-mt-32">
                  <p className="mx-auto max-w-3xl text-center text-base leading-7 text-white/68">
                    Copy any of these into your active coaching session to begin
                    practicing.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {(
                      [
                        "All",
                        "Product",
                        "Growth",
                        "Data & Analytics",
                        "Business",
                        "Technical",
                        "Behavioral",
                      ] as PromptCategory[]
                    ).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`rounded-full border px-4 py-2.5 text-sm transition ${
                          activeFilter === filter
                            ? "border-[#00C9B1]/35 bg-[#00C9B1]/16 text-white"
                            : "border-white/10 bg-white/[0.03] text-white/68 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredPrompts.map((item) => (
                      <article
                        key={item.id}
                        className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.16)] backdrop-blur-md"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[#00C9B1]/25 bg-[#00C9B1]/12 px-3 py-1 text-xs text-[#79F7E5]">
                            {item.category}
                          </span>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs ${getDifficultyClasses(
                              item.difficulty,
                            )}`}
                          >
                            {item.difficulty}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/62">
                            {item.role}
                          </span>
                        </div>

                        <h3 className="mt-5 font-syne text-2xl font-bold tracking-[-0.03em] text-white">
                          {item.title}
                        </h3>
                        <p className="mt-4 flex-1 text-sm leading-7 text-white/72">
                          {item.prompt}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleCopyPrompt(item.id, item.prompt)}
                          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/75 transition hover:-translate-y-0.5 hover:border-[#00C9B1]/30 hover:bg-[#00C9B1]/10 hover:text-white"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy Prompt
                            </>
                          )}
                        </button>
                      </article>
                    ))}
                  </div>

                  <footer className="mt-12 border-t border-white/8 pt-8 text-center text-sm text-white/42">
                    PJX Case Trainer · Project X Vietnam · projectxvietnam.org ·
                    {" "}Internal Use Only
                  </footer>
                </div>
              </ScreenFrame>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}
