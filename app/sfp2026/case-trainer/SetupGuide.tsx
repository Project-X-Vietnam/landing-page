"use client";

import { type ReactNode, useMemo, useState } from "react";
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
            Setup Guide
          </h2>
          <p className="mx-auto max-w-[760px] text-[15px] leading-[1.7] text-white/55">
            Coverage scope: Fintech, Edtech, Proptech, Enterprise Operations
            (B2B SaaS), Cybersecurity.
            <br />
            Roles: PM/PO, BA/DA, DS, SWE, AI/ML. Primary focus: PM/PO and
            {" \u00A0"}BA/DA.
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
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-[#22c55e]/15 p-1.5 ring-1 ring-[#22c55e]/35">
                  <Check className="h-4 w-4 shrink-0 text-[#22c55e]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/80">
                    Prerequisites ready
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[12px] font-medium text-white/90">
                      <code className="font-mono">pjx_casetrainer_systemprompt.xml</code>
                    </span>
                    <span className="inline-flex rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[12px] font-medium text-white/90">
                      <code className="font-mono">pjx_casetrainer_casehub.json</code>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(6, true)}
                    className="mt-2 inline-flex text-left text-[13px] text-white/75 transition-colors hover:text-white"
                  >
                    <strong className="font-semibold text-white">Role Description</strong>
                    <span className="ml-1">from Sample Prompts</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-[15px]">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-white/55">Prerequisites:</span>
                <span className="inline-flex items-center rounded-md border border-[rgba(37,99,235,0.30)] bg-[rgba(37,99,235,0.15)] px-3 py-1 text-[13px] font-medium text-[#4A9EFF]">
                  ↓ pjx_casetrainer_systemprompt.xml
                </span>
                <span className="inline-flex items-center rounded-md border border-[rgba(37,99,235,0.30)] bg-[rgba(37,99,235,0.15)] px-3 py-1 text-[13px] font-medium text-[#4A9EFF]">
                  ↓ pjx_casetrainer_casehub.json
                </span>
              </div>
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => onNavigate(6, true)}
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
          <div className="mb-4 flex justify-center">
            <div className="inline-flex gap-2 rounded-2xl border border-[#2A4EC9]/50 bg-[rgba(6,16,70,0.78)] p-1.5 shadow-[0_12px_35px_rgba(14,86,250,0.25)] ring-1 ring-[#5BA8FF]/25 backdrop-blur-md">
              {availableTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "relative rounded-xl px-5 py-2.5 text-[0.82rem] font-semibold uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap",
                      isActive
                        ? "text-white"
                        : "border border-transparent bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 rounded-xl border border-[#76C6FF]/70 bg-[linear-gradient(180deg,rgba(56,120,255,0.44),rgba(31,75,192,0.55))] shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_8px_24px_rgba(30,130,255,0.35)]"
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
                <div className="px-7 py-6 sm:px-8 sm:py-7">
                  {/* Step name */}
                  <p className="mb-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#7FC7FF]">
                    Step {activeStep + 1} of {steps.length}
                  </p>
                  <h3 className="mb-3 text-[1.35rem] font-semibold leading-[1.25] text-white sm:text-[1.45rem]">
                    {step.name}
                  </h3>
                  <p className="mb-4 text-[17px] leading-[1.75] text-white/85 sm:text-[18px]">
                    {step.text}
                  </p>
                  {step.substeps && step.substeps.length > 0 && (
                    <ul className="mb-6 list-disc space-y-2.5 pl-6 text-[15px] leading-[1.7] text-white/75 marker:text-[#7FC7FF] sm:text-[16px]">
                      {step.substeps.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

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
              "lumina-primary-glow group rounded-full bg-[#1D4ED8] px-7 py-6 text-[0.9375rem] font-medium text-white transition-all hover:scale-[1.02] hover:bg-[#1E40AF] active:bg-[#1E3A8A]",
              "border-none"
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