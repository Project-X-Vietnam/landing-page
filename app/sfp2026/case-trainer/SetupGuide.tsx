"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Lightbulb, CheckCircle2, ArrowRight, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type Platform } from "./page";

interface SetupGuideProps {
  selectedPlatforms: Platform[];
  onNext: () => void;
  hideStepLabel?: boolean;
}

type TabContent = {
  id: Platform;
  label: string;
  title: string;
  steps: string[];
  tip: string;
};

const ALL_TABS: TabContent[] = [
  {
    id: "claude",
    label: "Claude",
    title: "Setting Up on Claude (Recommended)",
    steps: [
      "Go to claude.ai → Projects → Create Project → name it \"PJX Case Trainer\"",
      "Paste Prompt A (Coach) into Project Instructions → Save",
      "Open a new chat inside the project and start your session",
      "After completing all 5 steps, swap to Prompt B (Evaluator) in a new chat, paste your transcript, and request evaluation.",
    ],
    tip: "Claude supports voice input on mobile. Tap the microphone icon to practice speaking your answers aloud — just like a real interview.",
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    title: "Setting Up on ChatGPT",
    steps: [
      "Go to chatgpt.com → Explore GPTs → Create → name it \"PJX Case Trainer\"",
      "Paste Prompt A (Coach) into the Instructions field → Save (Only me)",
      "Start a new session and work through all 5 steps",
      "Create a second GPT with Prompt B (Evaluator) for your final debrief and performance score.",
    ],
    tip: "ChatGPT's advanced voice mode is excellent for simulating the pressure of a real-time conversation. Use it to build confidence.",
  },
  {
    id: "gemini",
    label: "Gemini",
    title: "Setting Up on Gemini",
    steps: [
      "Go to gemini.google.com → Gems → Create a Gem → name it \"PJX Case Trainer\"",
      "Paste Prompt A (Coach) into the Instructions field → Save",
      "Open the Gem and start your session",
      "Use a separate Gem instance with Prompt B (Evaluator) to process your transcript and generate an evaluation rubric.",
    ],
    tip: "Gemini's large context window is perfect for long, complex case sessions. Speaking your answers aloud builds essential muscle memory.",
  },
];

const DIFFICULTY_LEVELS = [
  {
    range: "Sessions 1–3",
    level: "Beginner",
    description: "Get familiar with the structure.",
    color: "#17CAFA",
  },
  {
    range: "Sessions 4–8",
    level: "Intermediate",
    description: "Deepen reasoning chain logic.",
    color: "#2E8BFA",
  },
  {
    range: "Sessions 9+",
    level: "Advanced",
    description: "Master ambiguity under pressure.",
    color: "#0E56FA",
  },
];

export default function SetupGuide({
  selectedPlatforms,
  onNext,
  hideStepLabel,
}: SetupGuideProps) {
  const availableTabs = selectedPlatforms.length > 0
    ? ALL_TABS.filter((t) => selectedPlatforms.includes(t.id))
    : ALL_TABS;

  const [activeTab, setActiveTab] = useState<Platform>(availableTabs[0]?.id ?? "claude");
  const activeContent = availableTabs.find((t) => t.id === activeTab) ?? availableTabs[0];

  return (
    <section id="setup-guide" className="relative min-h-[90vh] px-5 py-16 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(14,86,250,0.1),transparent_65%)]" />

      {/* Font imports for senior alignment */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          {!hideStepLabel && (
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="flex h-6 items-center rounded-full bg-white/5 px-3 text-[0.625rem] font-bold uppercase tracking-[0.15em] text-white/40 ring-1 ring-white/10">
                Step 5 of 6
              </span>
            </div>
          )}
          <h2 className="font-jakarta mb-2 text-[clamp(2rem,5vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            Your Setup Guide
          </h2>
          <p className="mx-auto max-w-xl text-[0.9375rem] font-normal leading-[1.6] text-[rgba(255,255,255,0.45)]">
            Follow these specific configurations for your selected platforms to ensure
            the Case Trainer operates correctly.
          </p>
        </motion.div>

        {/* Platform Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          {/* Tab bar */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex gap-2 rounded-2xl bg-white/[0.03] p-1.5 ring-1 ring-white/10 backdrop-blur-md">
              {availableTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative rounded-xl px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap",
                      isActive ? "text-white" : "text-white/40 hover:text-white/70"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 rounded-xl bg-white/[0.05] ring-1 ring-white/10 shadow-[0_0_20px_-5px_rgba(23,202,250,0.2)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                       {tab.label}
                       {tab.id === "claude" && <span className="text-[0.6rem] text-[#17CAFA]">★</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeContent && (
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="lumina-glass flex flex-col md:flex-row gap-6 rounded-[28px] border border-white/10 p-6 sm:p-8"
              >
                <div className="flex-1">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#17CAFA]/10 ring-1 ring-[#17CAFA]/20">
                      <Laptop className="h-4.5 w-4.5 text-[#17CAFA]" />
                    </div>
                    <h3 className="font-jakarta text-[1.125rem] font-extrabold text-white">
                      {activeContent.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {activeContent.steps.map((step, index) => (
                      <div key={index} className="group flex gap-4">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-[0.6rem] font-bold text-[#17CAFA] ring-1 ring-white/10 transition-all group-hover:bg-[#17CAFA]/20 group-hover:ring-[#17CAFA]/30">
                          {index + 1}
                        </div>
                        <p className="text-[0.875rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.6)]">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 md:w-56">
                   <div className="rounded-2xl bg-[#17CAFA]/5 border border-[#17CAFA]/20 p-5 backdrop-blur-sm">
                      <div className="mb-3 flex items-center gap-2">
                         <Lightbulb className="h-3.5 w-3.5 text-[#17CAFA]" />
                         <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[#17CAFA]">Pro Tip</span>
                      </div>
                      <p className="text-[0.75rem] font-medium leading-[1.6] text-[rgba(255,255,255,0.5)] italic">
                        "{activeContent.tip}"
                      </p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Warning and Difficulty section */}
        <div className="grid gap-5 md:grid-cols-1">
           {/* Warning callout */}
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-6 py-4 backdrop-blur-sm"
           >
             <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500/80" strokeWidth={1.5} />
             <p className="text-[0.8125rem] font-medium leading-[1.65] text-[rgba(255,255,255,0.45)]">
               <span className="font-bold text-amber-500/90 uppercase tracking-tighter mr-2">Mandatory:</span>{" "}
               Do not alter the system prompts. Modification breaks the
               underlying step-tracking logic and automated evaluation rubric.
             </p>
           </motion.div>

           {/* Difficulty Progression */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mt-4"
           >
             <div className="mb-4 flex items-center justify-between">
               <p className="font-md3-mono text-[0.65rem] font-normal uppercase leading-[1.4] tracking-[0.2em] text-[rgba(255,255,255,0.4)]">
                 Difficulty Progression
               </p>
               <div className="h-px flex-1 ml-6 bg-gradient-to-r from-white/10 to-transparent" />
             </div>
             <div className="grid gap-3 sm:grid-cols-3">
               {DIFFICULTY_LEVELS.map((d, i) => (
                 <div
                   key={d.level}
                   className="lumina-glass group relative overflow-hidden rounded-xl border border-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/[0.04]"
                 >
                   <div 
                     className="absolute -right-4 -top-4 h-16 w-16 opacity-10 transition-all group-hover:scale-150"
                     style={{ background: `radial-gradient(circle, ${d.color}, transparent 70%)` }}
                   />
                   <p
                     className="mb-0.5 font-md3-mono text-[0.55rem] font-bold uppercase tracking-[0.2em]"
                     style={{ color: d.color }}
                   >
                     {d.range}
                   </p>
                   <h4 className="font-jakarta mb-1 text-[1rem] font-extrabold text-white">
                     {d.level}
                   </h4>
                   <p className="text-[0.75rem] font-medium leading-[1.5] text-[rgba(255,255,255,0.4)]">
                     {d.description}
                   </p>
                 </div>
               ))}
             </div>
           </motion.div>
        </div>

        {/* CTA */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="mt-10 flex justify-center"
        >
          <Button
            onClick={onNext}
            size="lg"
            className={cn(
              "lumina-primary-glow group rounded-full bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] px-10 py-6 text-[0.9375rem] font-bold text-white transition-all hover:scale-[1.02]",
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
