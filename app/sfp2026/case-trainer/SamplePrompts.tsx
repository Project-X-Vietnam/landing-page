"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Terminal, Zap, ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PromptCard = {
  id: string;
  label: string;
  prompt: string;
  helper?: string;
  note?: string;
};

type Phase = {
  id: string;
  tabLabel: string;
  phaseLabel: string;
  title: string;
  description: string;
  cards: PromptCard[];
};

const phases: Phase[] = [
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
    title: "Coaching Logic",
    description:
      "Signal readiness to advance between steps. The coach only moves when you explicitly confirm completion.",
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
          "I have completed my initial [Decomposition/Framework] and identified my key hypotheses. Do you have any specific [Data Points] or [Metric Trends] available for this [Domain] scenario?",
        helper:
          "Replace [Framework] with your method · [Data Points] with the data type · [Domain] with case domain",
      },
    ],
  },
  {
    id: "evaluate",
    tabLabel: "EVALUATE",
    phaseLabel: "PHASE 3",
    title: "Requesting Evaluation",
    description:
      "Once you finish your recommendation, use this phrase to trigger the Evaluator mode.",
    cards: [
      {
        id: "final-submission",
        label: "FINAL SUBMISSION",
        prompt:
          "I have completed my recommendation and final synthesis. Please end the coaching session and trigger the Evaluator to provide my 5-dimension score.",
        note: "Swap in Prompt B according to Step 5 instructions before sending this.",
      },
    ],
  },
  {
    id: "review",
    tabLabel: "REVIEW",
    phaseLabel: "PHASE 4",
    title: "Learning & Debrief",
    description:
      "Understand exactly what you missed and what a 'Strong' response would have looked like.",
    cards: [
      {
        id: "deep-dive",
        label: "DEEP DIVE ON A DIMENSION",
        prompt:
          "My score for [Dimension] was low ([Weight]%). Can you explain what non-obvious observations I missed in this [Domain] case?",
        helper:
          "Replace [Dimension] with rubric label · [Weight] with score % · [Domain] with case domain",
      },
      {
        id: "framework-check",
        label: "FRAMEWORK CHECK",
        prompt:
          "What would a 'Strong Response' look like for the Structure step? Which framework (RICE, CIRCLES) would be more effective?",
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
    <div className="lumina-glass group relative flex flex-col rounded-3xl border border-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/[0.04]">
      {/* Label and Badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-white/30" />
          <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40">
            {card.label}
          </span>
        </div>
        <button
          onClick={handleCopy}
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
      <div className="relative mb-4 rounded-2xl bg-black/20 p-5 ring-1 ring-white/5">
        <pre className="whitespace-pre-wrap font-sans text-[0.875rem] font-medium leading-[1.5] text-white/90">
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
            <p className="text-[0.8125rem] font-medium leading-[1.6] text-white/40 italic">
              <HighlightBrackets text={card.helper} />
            </p>
          </div>
        )}
        {card.note && (
          <div className="flex items-center gap-2 px-1">
            <Zap className="h-3 w-3 text-amber-400" />
            <p className="text-[0.75rem] font-medium text-amber-500/80 uppercase tracking-tighter">
              {card.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SamplePrompts({ hideStepLabel }: { hideStepLabel?: boolean }) {
  const [activePhase, setActivePhase] = useState("start");
  const phase = phases.find((p) => p.id === activePhase) ?? phases[0];

  return (
    <section id="sample-prompts" className="relative h-screen px-5 py-6 sm:px-6 lg:px-8 overflow-hidden">
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
          {!hideStepLabel && (
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="flex h-6 items-center rounded-full bg-white/5 px-3 text-[0.625rem] font-medium uppercase tracking-[0.15em] text-white/40 ring-1 ring-white/10">
                Step 6 of 6
              </span>
            </div>
          )}
          <h2 className="mb-2 text-[clamp(1.8rem,5vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
            Sample Prompts
          </h2>
          <p className="mx-auto max-w-xl text-[0.9375rem] font-normal leading-[1.6] text-[rgba(255,255,255,0.45)]">
            Copy these specialized prompts into your coaching session to guide the 
            AI through each phase of the case structure.
          </p>
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
                  onClick={() => setActivePhase(p.id)}
                  className={cn(
                    "relative rounded-xl px-6 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-all duration-300",
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
              <span className="lumina-gradient-text mb-2 inline-block font-sans text-[0.65rem] font-medium uppercase tracking-[0.25em]">
                {phase.phaseLabel}
              </span>
              <h3 className="mb-3 text-[1.25rem] font-medium leading-[1.1] text-white">
                {phase.title}
              </h3>
              <p className="text-[0.875rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.4)]">
                {phase.description}
              </p>
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
             <p className="mb-6 text-[0.8125rem] font-medium text-white/40">
               Ready to sharpen your architectural edge?
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Button
                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                 size="lg"
                 className={cn(
                   "lumina-primary-glow group rounded-full bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] px-10 py-5 text-[0.9375rem] font-medium text-white transition-all hover:scale-[1.05] active:scale-[0.95]",
                   "border-none"
                 )}
               >
                 RESTART WIZARD
                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
               </Button>
               
               <Link 
                 href="/sfp2026"
                 className={cn(
                   "group flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 py-5 text-[0.9375rem] font-medium text-white/80 transition-all hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
                   "ring-1 ring-white/5 shadow-[0_0_20px_-5px_rgba(255,255,255,0.05)]"
                 )}
               >
                 RETURN TO HOME
               </Link>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
