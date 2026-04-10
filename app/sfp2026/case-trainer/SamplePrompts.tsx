"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Terminal, Zap, ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import StepProgress from "./StepProgress";

type PromptCard = {
  id: string;
  label: string;
  prompt: string;
  helper?: string;
  note?: string;
  roleCard?: boolean;
};

type Phase = {
  id: string;
  tabLabel: string;
  phaseLabel: string;
  title: string;
  description: string;
  cards: PromptCard[];
  postNote?: string;
  secondaryPhase?: {
    phaseLabel: string;
    title: string;
    description: string;
    cards: PromptCard[];
  };
};

const phases: Phase[] = [
  {
    id: "role-setup",
    tabLabel: "ROLE SETUP",
    phaseLabel: "PHASE 0",
    title: "Activate Your Coach",
    description:
      "Paste this into your AI platform's system/instructions field before starting any session. This is the most important step — it defines how the AI will behave.",
    cards: [
      {
        id: "role-description",
        label: "ROLE DESCRIPTION",
        roleCard: true,
        prompt: `You are PJX Case Trainer, a structured case interview coach built by PJX. Your job is to help candidates from PM/PO, BA/DA, DS, SWE, and AI/ML roles practice case interviews through guided, step-by-step coaching sessions.

You have been given two inputs: a system prompt and a Case Hub file. The system prompt defines all rules, steps, and behaviors you must follow exactly. The Case Hub is the only source of cases you may use — you must never invent, paraphrase, or generate any case not present as a row in that file.

Before every session, you will run a pre-session setup to collect the user's job description or preferences, select the most relevant case from the Case Hub, and confirm their interaction mode. Once the session starts, you will coach the user through five structured thinking steps — Define, Decompose, Hypothesize, Analyze, and Recommend — using only Socratic questions. You do not give answers, but you are welcomed to give users hints referring to data supporting points and domain knowledge if they do not understand. After all five steps are complete, you will produce a scored evaluation debrief based solely on what the user actually said during the session. You will also have a system prompt assisted you uploaded alongside with case hub, so please refer to it.

Follow the system prompt precisely. Do not improvise behavior not described in it. When in doubt, re-read the relevant rule before responding.`,
      },
    ],
  },
  {
    id: "start",
    tabLabel: "START",
    phaseLabel: "PHASE 1",
    title: "Starting a Session",
    description:
      "Use this to launch a new case. Fill in the brackets with your target role, domain, and difficulty.",
    cards: [
      {
        id: "session-starter",
        label: "SESSION STARTER",
        prompt: "Give me a [Role] case in [Domain] at [Difficulty] level.",
        helper:
          "Replace [Role] with PM/PO, BA/DA, DS, SWE, or AI/ML · [Domain] with Fintech, Edtech, Proptech, SaaS · [Difficulty] with Beginner, Intermediate, or Advanced",
      },
    ],
  },
  {
    id: "coach",
    tabLabel: "COACH",
    phaseLabel: "PHASE 2",
    title: "During the Coaching Session",
    description:
      "The AI acts as your coach. Use these prompts to move through the session and request data.",
    cards: [
      {
        id: "start-approach",
        label: "START YOUR APPROACH",
        prompt:
          "I have read the context. I'm ready to present my Problem Framing and initial Structure. Can we begin?",
      },
      {
        id: "move-analysis",
        label: "MOVE TO ANALYSIS",
        prompt:
          "I've finished my breakdown. I'd like to move into the Analyze phase.",
      },
      {
        id: "request-data",
        label: "REQUEST DATA",
        prompt:
          "I have completed my initial [Decomposition/Framework] and identified my key hypotheses. To move into the Analyze step, do you have any specific [Data Points/Exhibits] or [Metric Trends] available for this [Domain] scenario that I should evaluate?",
        helper:
          "Replace [Domain] with your case domain (e.g. Fintech, Edtech)",
      },
    ],
  },
  {
    id: "evaluate",
    tabLabel: "EVALUATE",
    phaseLabel: "PHASE 3",
    title: "Requesting Your Evaluation",
    description:
      "Once you've completed your recommendation, trigger the Evaluator to get your 5-dimension score breakdown.",
    cards: [
      {
        id: "final-submission",
        label: "FINAL SUBMISSION",
        prompt:
          "I have completed my recommendation and final synthesis. Please end the coaching session and trigger the Evaluator to provide my 5-dimension score.",
      },
    ],
    secondaryPhase: {
      phaseLabel: "PHASE 4",
      title: "After Your Scores",
      description:
        "Use these prompts to go deeper on specific dimensions or get career advice based on your performance.",
      cards: [
        {
          id: "deep-dive",
          label: "DEEP DIVE ON A DIMENSION",
          prompt:
            "My score for [Dimension] was low. Can you explain what I missed in this specific [Domain] case?",
          helper:
            "Replace [Dimension] with Problem Framing, Structure, Logic & Evidence, Insight, or Communication",
        },
        {
          id: "framework-check",
          label: "FRAMEWORK CHECK",
          prompt:
            "What would a strong response look like for the [Step] step of this problem? Which framework would have been most effective?",
          helper:
            "Replace [Step] with Define, Decompose, Hypothesize, Analyze, or Recommend",
        },
        {
          id: "career-advice",
          label: "CAREER ADVICE",
          prompt:
            "Based on my performance in this [Role] case, what technical or business domain areas should I study more for a real interview?",
        },
      ],
    },
  },
  {
    id: "retry",
    tabLabel: "RETRY",
    phaseLabel: "PHASE 5",
    title: "Retry or Start Fresh",
    description:
      "Use these to close the loop — change style, adjust difficulty, or move to a new case.",
    cards: [
      {
        id: "retry-style",
        label: "RETRY — CHANGE STYLE",
        prompt:
          "I want to retry this exact case. Please reset the session, but this time act as a [Style] interviewer to test my communication under stress.",
        helper:
          "Replace [Style] with tough, encouraging, fast-paced, or silent (minimal hints)",
      },
      {
        id: "retry-difficulty",
        label: "RETRY — CHANGE DIFFICULTY",
        prompt:
          "I want to retry this exact case at [Difficulty] level.",
        helper:
          "Replace [Difficulty] with Beginner, Intermediate, or Advanced",
      },
      {
        id: "adjust-difficulty",
        label: "ADJUST DIFFICULTY",
        prompt:
          "I found this case [manageable / too difficult]. Can we try an [easier / more advanced] version of this same scenario?",
      },
      {
        id: "new-session",
        label: "START A NEW SESSION",
        prompt:
          "Session complete. Take me back to the Case Hub so I can select a different domain for my next practice.",
      },
    ],
  },
];

function HighlightBrackets({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={i} className="text-[#17CAFA] font-medium">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function PromptCardItem({ card }: { card: PromptCard }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(card.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      className={cn(
        "lumina-glass group relative flex flex-col rounded-3xl border border-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/[0.04]",
        card.roleCard && "rounded-[14px] border-2 border-[rgba(37,99,235,0.40)] bg-[rgba(37,99,235,0.08)] p-6 hover:border-[rgba(37,99,235,0.55)]"
      )}
    >
      {/* Label and Badge */}
      <div className="mb-4 flex items-center justify-between">
        {card.roleCard ? (
          <span className="inline-flex rounded bg-[#2563EB] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
            ROLE DESCRIPTION - PASTE FIRST
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-white/30" />
            <span className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/40">
              {card.label}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${card.label.toLowerCase()} prompt`}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
            copied 
              ? "bg-[#17CAFA]/20 text-[#17CAFA] ring-1 ring-[#17CAFA]/40" 
              : "bg-white/5 text-white/40 hover:bg-white/10 ring-1 ring-white/10 hover:text-white"
          )}
          title="Copy Prompt"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      {/* Prompt Block */}
      <div className={cn("relative mb-4 rounded-2xl bg-black/20 p-5 ring-1 ring-white/5", card.roleCard && "bg-black/10")}>
        <pre className="whitespace-pre-wrap font-sans text-[0.9375rem] font-medium leading-[1.5] text-white/90">
          <code>
            <HighlightBrackets text={card.prompt} />
          </code>
        </pre>
      </div>

        {/* Helper / Footer */}
      <div className="mt-auto flex flex-col gap-3">
        {card.helper && (
          <div className="flex gap-3 bg-white/[0.02] p-4 rounded-xl ring-1 ring-white/5">
            <Info className="h-4 w-4 shrink-0 text-white/20 mt-0.5" />
            <p className="text-[0.875rem] font-medium leading-[1.6] text-white/40 italic">
              <HighlightBrackets text={card.helper} />
            </p>
          </div>
        )}
        {card.note && (
          <div className="flex items-center gap-2 px-1">
            <Zap className="h-3 w-3 text-amber-400" />
            <p className="text-[0.8125rem] font-medium text-amber-500/80 uppercase tracking-tighter">
              {card.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface SamplePromptsProps {
  hideStepLabel?: boolean;
  onBack: () => void;
  currentStep: number;
  onNavigate: (step: number, direct?: boolean) => void;
  onRestart: () => void;
}

export default function SamplePrompts({ hideStepLabel, onBack, currentStep, onNavigate, onRestart }: SamplePromptsProps) {
  const [activePhase, setActivePhase] = useState("role-setup");
  const phase = phases.find((p) => p.id === activePhase) ?? phases[0];

  return (
    <section id="sample-prompts" className="relative min-h-screen overflow-hidden px-5 pb-6 pt-28 sm:px-6 lg:px-8">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(23,202,250,0.08),transparent_60%)]" />



      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-center"
        >
          <StepProgress currentStep={currentStep} onNavigate={onNavigate} />
          {!hideStepLabel && (
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="flex h-6 items-center rounded-full bg-white/5 px-3 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white/40 ring-1 ring-white/10">
                Step 6 of 6
              </span>
            </div>
          )}
          <h2 className="mb-2 text-[clamp(1.8rem,5vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
            Sample Prompts
          </h2>
        </motion.div>

        {/* Phase Tabs */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="mb-4 flex justify-center"
        >
          <div className="inline-flex gap-2 rounded-2xl bg-white/[0.03] p-1.5 ring-1 ring-white/10 backdrop-blur-md">
            {phases.map((p) => {
              const isActive = activePhase === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePhase(p.id)}
                  className={cn(
                    "relative rounded-xl px-6 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-all duration-300",
                    isActive ? "text-white" : "text-white/40 hover:text-white/70"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-phase-indicator"
                      className="absolute inset-0 rounded-xl bg-white/[0.05] ring-1 ring-white/10 shadow-[0_0_20px_-5px_rgba(23,202,250,0.2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{p.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Phase Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {/* Phase info */}
            <div className="mx-auto max-w-2xl text-center">
              <span className="lumina-gradient-text mb-2 inline-block font-sans text-[0.72rem] font-medium uppercase tracking-[0.2em]">
                {phase.phaseLabel}
              </span>
              <h3 className="mb-3 text-[1.25rem] font-medium leading-[1.1] text-white">
                {phase.title}
              </h3>
            </div>

            {/* Cards grid */}
            <div className={cn(
              "grid gap-6",
              phase.cards.length >= 2 ? "md:grid-cols-2" : "max-w-2xl mx-auto"
            )}>
              {phase.cards.map((card) => (
                <PromptCardItem key={card.id} card={card} />
              ))}
            </div>

            {phase.postNote && (
              <p className="mx-auto max-w-3xl text-center text-[13px] text-[rgba(255,255,255,0.40)]">
                {phase.postNote}
              </p>
            )}

            {phase.secondaryPhase && (
              <div className="pt-2">
                <div className="mx-auto max-w-2xl border-t border-white/10 pt-5 text-center">
                  <span className="lumina-gradient-text mb-2 inline-block font-sans text-[0.72rem] font-medium uppercase tracking-[0.2em]">
                    {phase.secondaryPhase.phaseLabel}
                  </span>
                  <h3 className="mb-3 text-[1.25rem] font-medium leading-[1.1] text-white">
                    {phase.secondaryPhase.title}
                  </h3>
                </div>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {phase.secondaryPhase.cards.map((card) => (
                    <PromptCardItem key={card.id} card={card} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Final Actions */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="mt-2 flex flex-col items-center gap-6 border-t border-white/5 pt-2"
        >
           <div className="text-center">
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button
                 type="button"
                 onClick={onBack}
                 className="w-full rounded-full border border-white/25 px-6 py-3 text-[15px] font-normal text-white/65 transition-colors hover:border-white/50 hover:text-white/90 sm:w-[260px]"
               >
                 ← Back
               </button>
               <Button
                 onClick={onRestart}
                 size="lg"
                 className={cn(
                   "lumina-primary-glow group h-12 w-full rounded-full bg-[#1D4ED8] px-8 text-[0.9375rem] font-medium text-white transition-all hover:scale-[1.05] hover:bg-[#1E40AF] active:scale-[0.95] active:bg-[#1E3A8A] sm:w-[260px]",
                   "border-none"
                 )}
               >
                 Return to Home
                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
               </Button>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
