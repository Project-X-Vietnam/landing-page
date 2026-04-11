"use client";

import { type ReactNode, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Platform } from "./types";
import { BACK_BUTTON, CARD_SURFACE, CTA_BLUE_BUTTON } from "./constants";

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
  hideTitle?: boolean;
}

type Step = {
  name: string;
  text: ReactNode;
  substeps?: string[];
  gifSrc: string;
};

type TabContent = {
  id: Platform;
  label: string;
  recommended?: boolean;
  steps: Step[];
};

const FALLBACK_GIF = "/images/setup/setup-guide-fallback.png";

const STEP_FADE_VARIANTS = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const ALL_TABS: TabContent[] = [
  {
    id: "claude",
    label: "Claude",
    recommended: true,
    steps: [
      {
        name: "Create a Project",
        text: (
          <>
            Go to <strong>Claude.ai</strong>, open <strong>Projects</strong>,
            and create a <strong>New Project</strong> named{" "}
            <strong>PJX Case Trainer</strong>.
          </>
        ),
        gifSrc: "/case-trainer-assets/claude/claude%201.gif",
      },
      {
        name: "Upload the files",
        text: (
          <>
            In <strong>Files</strong>, upload both required files:{" "}
            <strong>pjx_casetrainer_systemprompt.xml</strong> and{" "}
            <strong>pjx_casetrainer_casehub.json</strong>.
          </>
        ),
        gifSrc: "/case-trainer-assets/claude/claude%202.gif",
      },
      {
        name: "Set project instructions",
        text: (
          <>
            In <strong>Instructions</strong>, paste your{" "}
            <strong>Role Description</strong> from{" "}
            <strong>Sample Prompts</strong>, then click <strong>Save</strong>.
          </>
        ),
        gifSrc: "/case-trainer-assets/claude/claude%203.gif",
      },
    ],
  },
  {
    id: "gemini",
    label: "Gemini",
    steps: [
      {
        name: "Create a Gem",
        text: (
          <>
            Go to <strong>gemini.google.com</strong>, open{" "}
            <strong>Gems</strong>, create a <strong>New Gem</strong>, and name
            it <strong>PJX Case Trainer</strong>.
          </>
        ),
        gifSrc: "/case-trainer-assets/gemini/gem%201.gif",
      },
      {
        name: "Add instructions",
        text: (
          <>
            In the <strong>Instructions</strong> box, paste your{" "}
            <strong>Role Description</strong> from{" "}
            <strong>Sample Prompts</strong>.
          </>
        ),
        gifSrc: "/case-trainer-assets/gemini/gem%202.gif",
      },
      {
        name: "Add knowledge",
        text: (
          <>
            In <strong>Knowledge</strong>, upload{" "}
            <strong>pjx_casetrainer_systemprompt.xml</strong> and{" "}
            <strong>pjx_casetrainer_casehub.json</strong>.
          </>
        ),
        gifSrc: "/case-trainer-assets/gemini/gem%203.gif",
      },
      {
        name: "Start a session",
        text: (
          <>
            Click <strong>Save</strong> to finish setup, then start your first
            chat session in the Gem.
          </>
        ),
        gifSrc: "/case-trainer-assets/gemini/gem%204.gif",
      },
    ],
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    steps: [
      {
        name: "Create a Project",
        text: (
          <>
            Go to <strong>chatgpt.com</strong>, open{" "}
            <strong>Projects</strong>, and create a project named{" "}
            <strong>PJX Case Trainer</strong>.
          </>
        ),
        gifSrc: "/case-trainer-assets/chatgpt/chatgpt%201.gif",
      },
      {
        name: "Upload files",
        text: (
          <>
            Open your project, go to <strong>Sources</strong>, and upload{" "}
            <strong>pjx_casetrainer_systemprompt.xml</strong> and{" "}
            <strong>pjx_casetrainer_casehub.json</strong>.
          </>
        ),
        gifSrc: "/case-trainer-assets/chatgpt/chat%20gpt%202.gif",
      },
      {
        name: "Start a session",
        text: (
          <>
            Paste your <strong>Role Description</strong> from{" "}
            <strong>Sample Prompts</strong> into chat and begin your first
            case session.
          </>
        ),
        gifSrc: "/case-trainer-assets/chatgpt/chatgpt%203.gif",
      },
    ],
  },
];

export default function SetupGuide({
  selectedPlatforms,
  filesReadyFromFlow = false,
  onNext,
  onBack,
  hideTitle,
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

  const handleStepChange = (target: number) => {
    if (target === activeStep) return;
    setActiveStep(target);
  };

  return (
    <section
      id="setup-guide"
      className="relative h-full overflow-hidden px-5 pb-8 pt-16 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Header */}
        {/* Files banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-4"
        >
          {isFilesReady ? (
            <div className={cn(CARD_SURFACE, "mx-auto w-[860px] max-w-full rounded-xl px-4 py-3 text-white") }>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-white/5 p-1.5 ring-1 ring-[#22c55e]/35">
                  <Check className="h-4 w-4 shrink-0 text-[#22c55e]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-md font-semibold uppercase tracking-[0.08em] text-white/80">
                    Prerequisites ready
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-sm font-medium text-white/90">
                      <code className="font-mono">pjx_casetrainer_systemprompt.xml</code>
                    </span>
                    <span className="inline-flex rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-sm font-medium text-white/90">
                      <code className="font-mono">pjx_casetrainer_casehub.json</code>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onNext}
                    className="mt-2 inline-flex text-left text-[13px] text-white/75 transition-colors hover:text-white"
                  >
                    <strong className="font-semibold text-white">Role Description</strong>
                    <span className="ml-1">from Sample Prompts</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={cn(CARD_SURFACE, "mx-auto w-[860px] max-w-full rounded-xl px-5 py-3 text-md") }>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-white/55">Prerequisites:</span>
                <span className="inline-flex items-center rounded-md border border-[rgba(37,99,235,0.30)] bg-[rgba(37,99,235,0.15)] px-3 py-1 text-sm font-medium text-[#4A9EFF]">
                  ↓ pjx_casetrainer_systemprompt.xml
                </span>
                <span className="inline-flex items-center rounded-md border border-[rgba(37,99,235,0.30)] bg-[rgba(37,99,235,0.15)] px-3 py-1 text-sm font-medium text-[#4A9EFF]">
                  ↓ pjx_casetrainer_casehub.json
                </span>
              </div>
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  onClick={onNext}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Get <strong>Role Description</strong> from the Sample Prompts
                  section
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <div className="mb-3 flex justify-center">
            <div className={cn(CARD_SURFACE, "inline-flex gap-5 rounded-xl px-5 py-2") }>
              {availableTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "relative rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap",
                      isActive
                        ? "text-white"
                        : "border border-transparent bg-transparent text-white/70 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 rounded-xl border border-[#76C6FF]/70 bg-transparent shadow-none"
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
                variants={STEP_FADE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className={cn(CARD_SURFACE, "mx-auto w-[860px] max-w-full overflow-hidden rounded-[28px]")}
              >
                  {/* GIF — full width, prominent */}
                  <div className="relative w-full bg-white/[0.03]">
                    <img
                      src={step.gifSrc}
                      alt={step.name}
                      className="h-[clamp(220px,28vh,320px)] w-full object-cover"
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
                  <div className="flex h-[180px] flex-col px-6 py-4 sm:px-7 sm:py-5">
                    <div className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {/* Step name */}
                      <p className="mb-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#7FC7FF]">
                        Step {activeStep + 1} of {steps.length}
                      </p>
                      <h3 className="mb-2 text-[1.2rem] font-semibold leading-[1.25] text-white sm:text-[1.3rem]">
                        {step.name}
                      </h3>
                      <p className="mb-3 text-[15px] leading-[1.65] text-white/85 sm:text-[16px]">
                        {step.text}
                      </p>
                      {step.substeps && step.substeps.length > 0 && (
                        <ul className="mb-2 list-disc space-y-2 pl-6 text-[14px] leading-[1.6] text-white/75 marker:text-[#7FC7FF] sm:text-[15px]">
                          {step.substeps.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Step dots + prev/next */}
                    <div className="mt-3 flex items-center justify-between">
                      {/* Dots */}
                      <div className="flex gap-1.5">
                        {steps.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleStepChange(i)}
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
                          onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
                          disabled={isFirst}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/30 hover:text-white/80 disabled:pointer-events-none disabled:opacity-25"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStepChange(Math.min(steps.length - 1, activeStep + 1))}
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
            className={BACK_BUTTON}
          >
            ← Back
          </button>
          <Button
            onClick={onNext}
            size="lg"
            className={cn(
              CTA_BLUE_BUTTON,
              "px-7 py-6 text-[0.9375rem]"
            )}
          >
            See Sample Prompts
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}