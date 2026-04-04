"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { trackCaseTrainerCopyPrompt } from "@/lib/analytics/case-trainer";

type PromptCard = {
  id: string;
  tag: string;
  text: string;
  stepBadge?: string;
  hint?: string;
};

type PromptPhase = {
  id: string;
  tabLabel: string;
  phaseLabel: string;
  title: string;
  description: string;
  prompts: PromptCard[];
};

const phases: PromptPhase[] = [
  {
    id: "phase-1",
    tabLabel: "Start",
    phaseLabel: "Phase 1",
    title: "Starting a session",
    description:
      "Use this to launch a new case. Fill in the three brackets with your target role, domain, and preferred difficulty.",
    prompts: [
      {
        id: "session-starter",
        tag: "Session Starter",
        text: "Give me a [Role] case in [Domain] at [Difficulty] level.",
        hint: "Replace [Role] with PM/PO, BA/DA, DS, SWE, or AI/ML · [Domain] with Fintech, Edtech, Proptech, Enterprise SaaS, or Cybersecurity · [Difficulty] with Easy, Medium, or Hard",
      },
    ],
  },
  {
    id: "phase-2",
    tabLabel: "Coach",
    phaseLabel: "Phase 2",
    title: "Working through the case",
    description:
      "The AI coaches you through five steps: Define → Decompose → Hypothesize → Analyze → Recommend. Use these prompts to signal your readiness to advance.",
    prompts: [
      {
        id: "opening-approach",
        tag: "Opening your approach",
        stepBadge: "Define → Structure",
        text: "I have read the context. I'm ready to present my Problem Framing and initial Structure. Can we begin?",
      },
      {
        id: "move-analysis",
        tag: "Moving into analysis",
        stepBadge: "Analyze",
        text: "I've finished my breakdown. I'd like to move into the Analyze phase.",
      },
      {
        id: "request-data",
        tag: "Requesting data",
        stepBadge: "Analyze",
        text: "I have completed my initial [Decomposition/Framework] and identified my key hypotheses. To move into the Analyze step, do you have any specific [Data Points/Exhibits] or [Metric Trends] available for this [Domain] scenario that I should evaluate?",
      },
    ],
  },
  {
    id: "phase-3",
    tabLabel: "Evaluate",
    phaseLabel: "Phase 3",
    title: "Requesting your evaluation",
    description:
      "Once you've delivered your final recommendation, use this prompt to close the coaching session and trigger the Evaluator for your 5-dimension score.",
    prompts: [
      {
        id: "final-submission",
        tag: "Final Submission",
        text: "I have completed my recommendation and final synthesis. Please end the coaching session and trigger the Evaluator to provide my 5-dimension score.",
      },
    ],
  },
  {
    id: "phase-4",
    tabLabel: "Review",
    phaseLabel: "Phase 4",
    title: "Learning from your score",
    description:
      "After your score breakdown, use these to go deeper on any dimension, understand what a stronger answer looks like, or get career-specific guidance.",
    prompts: [
      {
        id: "score-deep-dive",
        tag: "Score Deep Dive",
        text: "My score for Insight was low (15%). Can you explain what 'non-obvious' observations I missed in this specific Fintech case?",
      },
      {
        id: "framework-check",
        tag: "Framework Check",
        text: "What would a 'Strong Response' look like for the Structure step of this problem? Which framework (RICE, CIRCLES, etc.) would have been more effective?",
      },
      {
        id: "career-advice",
        tag: "Career Advice",
        text: "Based on my performance in this BA case, what technical or business domain areas should I study more for a real interview?",
      },
    ],
  },
  {
    id: "phase-5",
    tabLabel: "Next",
    phaseLabel: "Phase 5",
    title: "Retrying or starting fresh",
    description:
      "Iterate on the same case with a different pressure level, adjust difficulty, or move to a new domain entirely.",
    prompts: [
      {
        id: "retry-pressure",
        tag: "Retry With More Pressure",
        text: "I want to retry this exact case. Please reset the session, but this time act as a more pressuring interviewer to test my Communication under stress.",
      },
      {
        id: "adjust-difficulty",
        tag: "Adjust Difficulty",
        text: "I found this case manageable / too difficult. Can we try an easier / more advanced version of this same scenario to see how it changes?",
      },
      {
        id: "start-new-session",
        tag: "Start New Session",
        text: "Session complete. Take me back to the Case Hub so I can select a different domain for my next practice.",
      },
    ],
  },
];

function HighlightVariables({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);

  return (
    <>
      {parts.map((part, index) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={`${part}-${index}`} className="text-[#17CAFA]">
            {part}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

export default function SamplePrompts() {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const handleCopy = async (promptId: string, promptText: string) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedPromptId(promptId);
      trackCaseTrainerCopyPrompt();
      window.setTimeout(() => setCopiedPromptId(null), 1500);
    } catch (error) {
      console.error("Failed to copy sample prompt", error);
    }
  };

  return (
    <section id="sample-prompts" className="reveal scroll-mt-16 space-y-8">
      <div className="max-w-4xl">
        <p className="lumina-gradient-text font-md3-mono text-[0.6875rem] font-normal uppercase leading-[1.4] tracking-[0.15em]">
          Sample prompts
        </p>
        <h2 className="lumina-headline-inline mt-4 font-md3-serif text-white">
          Your first prompt,{" "}
          <span className="lumina-gradient-text">ready to copy.</span>
        </h2>
      </div>

      <Tabs defaultValue="phase-1" className="gap-8">
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <TabsList className="lumina-glass h-auto w-max min-w-full gap-2 rounded-full p-1.5 sm:min-w-0">
            {phases.map((phase) => (
              <TabsTrigger
                key={phase.id}
                value={phase.id}
                className="lumina-tab-trigger rounded-full border border-transparent px-4 py-2.5 font-md3-mono text-xs font-normal uppercase leading-[1.4] tracking-[0.17em] text-[rgba(255,255,255,0.65)] data-[state=active]:border-[#17CAFA]/30 data-[state=active]:bg-[rgba(23,202,250,0.14)] data-[state=active]:font-semibold data-[state=active]:text-white"
              >
                <span className="lumina-tab-label data-[state=active]:lumina-gradient-text">
                  {phase.tabLabel}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {phases.map((phase) => (
          <TabsContent key={phase.id} value={phase.id} className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="max-w-3xl">
                <p className="lumina-gradient-text font-md3-mono text-[0.6875rem] font-normal uppercase leading-[1.4] tracking-[0.17em]">
                  {phase.phaseLabel}
                </p>
                <h3 className="mt-3 text-[1.125rem] font-semibold leading-[1.2] text-white">
                  {phase.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] font-normal leading-[1.6] tracking-[0.01em] text-[rgba(255,255,255,0.65)]">
                  {phase.description}
                </p>
              </div>

              <div className="grid gap-4">
                {phase.prompts.map((prompt, index) => {
                  const copied = copiedPromptId === prompt.id;

                  return (
                    <motion.article
                      key={prompt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="lumina-glass rounded-2xl p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-3">
                          {prompt.stepBadge ? (
                            <div className="lumina-glass inline-flex rounded-full px-3 py-1 font-md3-mono text-[0.75rem] font-normal leading-[1.4] text-[rgba(255,255,255,0.5)]">
                              {prompt.stepBadge}
                            </div>
                          ) : null}

                          <p className="font-md3-mono text-[0.6875rem] font-normal uppercase leading-[1.4] tracking-[0.12em] text-[rgba(255,255,255,0.5)]">
                            {prompt.tag}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => void handleCopy(prompt.id, prompt.text)}
                          className="lumina-glass inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 font-md3-mono text-[0.75rem] font-normal uppercase leading-[1.4] tracking-[0.12em] text-[rgba(255,255,255,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17CAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071331]"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {copied ? (
                              <motion.span
                                key="copied"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="inline-flex items-center gap-2"
                              >
                                <Check className="h-3.5 w-3.5" />
                                Copied
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="inline-flex items-center gap-2"
                              >
                                <Copy className="h-3.5 w-3.5" />
                                Copy
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>

                      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-md3-mono text-[0.8125rem] font-normal leading-[1.6] text-[rgba(255,255,255,0.85)]">
                        <code>
                          <HighlightVariables text={prompt.text} />
                        </code>
                      </pre>

                      {prompt.hint ? (
                        <p className="mt-4 text-sm font-normal leading-[1.6] tracking-[0.01em] text-[rgba(255,255,255,0.5)]">
                          <HighlightVariables text={prompt.hint} />
                        </p>
                      ) : null}
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
