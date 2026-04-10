"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type Platform } from "./page";
import StepProgress from "./StepProgress";

// ─────────────────────────────────────────────
// HOW TO ADD YOUR GIF FILES
// ─────────────────────────────────────────────
// 1. Copy all .gif files into: /public/images/setup/
//    Your folder should look like:
//      /public/images/setup/claude1.gif
//      /public/images/setup/claude2.gif
//      ... etc.
//
// 2. The gifSrc values below already map to those paths.
//    Just drop the files in and they'll load automatically.
// ─────────────────────────────────────────────

interface SetupGuideProps {
  selectedPlatforms: Platform[];
  filesReadyFromFlow?: boolean;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  onNavigate: (step: number, direct?: boolean) => void;
  hideStepLabel?: boolean;
}

type Step = {
  name: string;
  text: string;
  gifSrc: string;
};

type TabContent = {
  id: Platform;
  label: string;
  recommended?: boolean;
  steps: Step[];
};

const FALLBACK_GIF = "/images/setup/setup-guide-fallback.png";

const ALL_TABS: TabContent[] = [
  {
    id: "claude",
    label: "Claude",
    recommended: true,
    steps: [
      {
        name: "Download your files",
        text: "Your two files — the System Prompt and Case Hub — are already in your downloads folder. You'll need both in the next steps.",
        gifSrc: "/images/setup/claude1.gif",
      },
      {
        name: "Create a new project",
        text: 'Go to claude.ai → Projects → New Project. Name it exactly: PJX Case Trainer.',
        gifSrc: "/images/setup/claude2.gif",
      },
      {
        name: "Upload both files",
        text: "Inside your project, find the Files section. Click + and upload the System Prompt and Case Hub files you downloaded.",
        gifSrc: "/images/setup/claude3.gif",
      },
      {
        name: "Paste your instructions",
        text: "Open the Instructions section in the project. Paste the Role Instructions you received from the PJX team, then click Save.",
        gifSrc: "/images/setup/claude4.gif",
      },
      {
        name: "Start your first session",
        text: "Open a new chat inside the project. Your coach is ready — start with any case prompt.",
        gifSrc: "/images/setup/claude6.gif",
      },
    ],
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    steps: [
      {
        name: "Download your files",
        text: "Your two files are already in your downloads folder. Find them before moving to the next step.",
        gifSrc: "/images/setup/chatgpt1.gif",
      },
      {
        name: "Create a new project",
        text: "Go to chatgpt.com → Projects in the left sidebar → name it PJX Case Trainer → Create project.",
        gifSrc: "/images/setup/chatgpt2.gif",
      },
      {
        name: "Upload your files",
        text: "Click into your project. Under the chat bar, click Sources → upload both files from your downloads folder.",
        gifSrc: "/images/setup/chatgpt3.gif",
      },
      {
        name: "Start your first session",
        text: "You're all set. Start a new chat inside the project to begin.",
        gifSrc: "/images/setup/chatgpt4.gif",
      },
    ],
  },
  {
    id: "gemini",
    label: "Gemini",
    steps: [
      {
        name: "Download your files",
        text: "Your two files are already in your downloads folder. Find them before moving to the next step.",
        gifSrc: "/images/setup/gem1.gif",
      },
      {
        name: "Create a Gem",
        text: "Go to gemini.google.com → Gems in the sidebar → + New Gem → name it PJX Case Trainer.",
        gifSrc: "/images/setup/gem2.gif",
      },
      {
        name: "Add your instructions",
        text: "In the Instructions box, paste the Role Instructions you received from the PJX team.",
        gifSrc: "/images/setup/gem3.gif",
      },
      {
        name: "Upload your files",
        text: "Scroll to the Knowledge section → click + → upload both files from your downloads folder.",
        gifSrc: "/images/setup/gem4.gif",
      },
      {
        name: "Start your first session",
        text: "Click Save to finish creating the Gem. Open it and start your first chat.",
        gifSrc: "/images/setup/gem5.gif",
      },
    ],
  },
];

export default function SetupGuide({
  selectedPlatforms,
  filesReadyFromFlow = false,
  onNext,
  onBack,
  currentStep,
  onNavigate,
  hideStepLabel,
}: SetupGuideProps) {
  const searchParams = useSearchParams();
  const availableTabs =
    selectedPlatforms.length > 0
      ? ALL_TABS.filter((t) => selectedPlatforms.includes(t.id))
      : ALL_TABS;

  const [activeTab, setActiveTab] = useState<Platform>(
    availableTabs[0]?.id ?? "claude"
  );
  const [activeStep, setActiveStep] = useState(0);

  const activeContent =
    availableTabs.find((t) => t.id === activeTab) ?? availableTabs[0];
  const steps = activeContent?.steps ?? [];
  const step = steps[activeStep];
  const isFirst = activeStep === 0;
  const isLast = activeStep === steps.length - 1;

  const filesReadyParam = searchParams.get("filesReady");
  const isFilesReady = useMemo(() => {
    if (filesReadyParam === "true") return true;
    if (filesReadyParam === "false") return false;
    return filesReadyFromFlow;
  }, [filesReadyFromFlow, filesReadyParam]);

  // Reset step when tab changes
  const handleTabChange = (id: Platform) => {
    setActiveTab(id);
    setActiveStep(0);
  };

  return (
    <section
      id="setup-guide"
      className="relative min-h-screen overflow-hidden px-5 pb-12 pt-28 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(14,86,250,0.1),transparent_65%)]" />

      <div className="relative z-10 mx-auto w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-center"
        >
          <StepProgress currentStep={currentStep} onNavigate={onNavigate} />
          {!hideStepLabel && (
            <div className="mb-4 flex items-center justify-center">
              <span className="flex h-6 items-center rounded-full bg-white/5 px-3 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white/40 ring-1 ring-white/10">
                Step 5 of 6
              </span>
            </div>
          )}
          <h2 className="mb-2 text-[clamp(1.75rem,4vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
            Set Up Your Coach
          </h2>
          <p className="mx-auto max-w-[520px] text-[16px] leading-[1.7] text-white/45">
            Follow the steps below to get your AI coach running in a few
            minutes.
          </p>
        </motion.div>

        {/* Files banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-6"
        >
          {isFilesReady ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-[13px] text-white">
              <Check className="h-4 w-4 shrink-0 text-[#22c55e]" />
              Both files are ready in your downloads folder.
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-[13px]">
              <span className="text-white/55">You need two files:</span>
              <a
                href="/case-trainer-assets/pjx_casetrainer_systemprompt.xml"
                download="pjx_casetrainer_systemprompt.xml"
                className="inline-flex items-center rounded-md border border-[rgba(37,99,235,0.30)] bg-[rgba(37,99,235,0.15)] px-3 py-1 text-[12px] font-medium text-[#4A9EFF] transition-colors hover:bg-[rgba(37,99,235,0.25)]"
              >
                ↓ System Prompt
              </a>
              <a
                href="/case-trainer-assets/pjx_casetrainer_casehub.json"
                download="pjx_casetrainer_casehub.json"
                className="inline-flex items-center rounded-md border border-[rgba(37,99,235,0.30)] bg-[rgba(37,99,235,0.15)] px-3 py-1 text-[12px] font-medium text-[#4A9EFF] transition-colors hover:bg-[rgba(37,99,235,0.25)]"
              >
                ↓ Case Hub
              </a>
              <span className="text-white/35">
                ·{" "}
                <a
                  href="mailto:hello@projectxvietnam.org?subject=Request%20Role%20Instructions%20for%20PJX%20Case%20Trainer"
                  className="text-white/55 underline-offset-2 hover:underline"
                >
                  Get Role Instructions
                </a>{" "}
                from PJX team
              </span>
            </div>
          )}
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <div className="mb-4 flex justify-center">
            <div className="inline-flex gap-1.5 rounded-2xl bg-white/[0.03] p-1.5 ring-1 ring-white/10 backdrop-blur-md">
              {availableTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "relative rounded-xl px-5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap",
                      isActive
                        ? "text-white"
                        : "text-white/40 hover:text-white/70"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 rounded-xl bg-white/[0.06] ring-1 ring-white/10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.5,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {tab.label}
                      {tab.recommended && (
                        <span className="text-[0.6rem] text-[#17CAFA]">★</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step card */}
          <AnimatePresence mode="wait">
            {activeContent && step && (
              <motion.div
                key={`${activeTab}-${activeStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="lumina-glass overflow-hidden rounded-[24px] border border-white/10"
              >
                {/* GIF — full width, prominent */}
                <div className="relative w-full bg-white/[0.03]">
                  <img
                    src={step.gifSrc}
                    alt={step.name}
                    className="h-auto w-full object-cover"
                    style={{ display: "block" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_GIF;
                    }}
                  />
                  {/* Step counter badge */}
                  <div className="absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-[11px] font-medium text-white/80 backdrop-blur-sm ring-1 ring-white/15">
                    {activeStep + 1}
                  </div>
                </div>

                {/* Text + navigation */}
                <div className="px-6 py-5">
                  {/* Step name */}
                  <p className="mb-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/35">
                    Step {activeStep + 1} of {steps.length}
                  </p>
                  <h3 className="mb-2 text-[1.05rem] font-medium text-white">
                    {step.name}
                  </h3>
                  <p className="mb-5 text-[14.5px] leading-[1.7] text-white/60">
                    {step.text}
                  </p>

                  {/* Step dots + prev/next */}
                  <div className="flex items-center justify-between">
                    {/* Dots */}
                    <div className="flex gap-1.5">
                      {steps.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveStep(i)}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            i === activeStep
                              ? "w-5 bg-[#17CAFA]"
                              : "w-1.5 bg-white/20 hover:bg-white/40"
                          )}
                          aria-label={`Go to step ${i + 1}`}
                        />
                      ))}
                    </div>

                    {/* Prev / Next */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveStep((s) => Math.max(0, s - 1))
                        }
                        disabled={isFirst}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/30 hover:text-white/80 disabled:pointer-events-none disabled:opacity-25"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveStep((s) =>
                            Math.min(steps.length - 1, s + 1)
                          )
                        }
                        disabled={isLast}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/30 hover:text-white/80 disabled:pointer-events-none disabled:opacity-25"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-white/25 px-6 py-3 text-[15px] text-white/65 transition hover:border-white/50 hover:text-white/90"
          >
            ← Back
          </button>
          <Button
            onClick={onNext}
            size="lg"
            className={cn(
              "lumina-primary-glow group rounded-full bg-[#1D4ED8] px-10 py-5 text-[0.9375rem] font-medium text-white transition-all hover:scale-[1.02] hover:bg-[#1E40AF] active:bg-[#1E3A8A]",
              "border-none"
            )}
          >
            See Sample Prompts
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}