"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const steps = [
  {
    num: 1,
    label: "DEFINE",
    desc: "Frame the objective clearly.",
    elaboration: {
      what: "Establish the exact problem to be solved. Identify key stakeholders, business context, and success criteria before touching structure.",
      prompt: "\"Before I dive into options, let me make sure I understand the core objective. We're trying to [goal] within [constraint], where success means [metric]. Is that accurate?\"",
      tip: "A poorly defined problem wastes all downstream effort. The AI coach will penalise you if you skip this step.",
    },
  },
  {
    num: 2,
    label: "DECOMPOSE",
    desc: "Break down the value chain.",
    elaboration: {
      what: "Use MECE (Mutually Exclusive, Collectively Exhaustive) logic to split the problem into distinct, non-overlapping workstreams.",
      prompt: "\"I'd like to structure this across three lenses: [A], [B], and [C]. These are independent drivers, so let me walk through each.\"",
      tip: "Avoid overlapping branches. Use frameworks (Profitability = Revenue − Cost) as a starting scaffold, not a rigid script.",
    },
  },
  {
    num: 3,
    label: "HYPOTHESIZE",
    desc: "Formulate testable theories.",
    elaboration: {
      what: "For each branch, generate a directional hypothesis before asking for data. This shows you're hypothesis-driven, not data-dependent.",
      prompt: "\"My hypothesis is that [X] is the primary driver because [reason]. I'd want to test this by looking at [data point].\"",
      tip: "State your hypothesis confidently, then invite challenge. Consultants don't wait for data — they guide the analysis.",
    },
  },
  {
    num: 4,
    label: "ANALYZE",
    desc: "Execute data-driven audit.",
    elaboration: {
      what: "Interrogate the data or AI-provided prompts to confirm or reject each hypothesis. Identify root causes, not symptoms.",
      prompt: "\"Based on this, [X] is confirmed/rejected because [evidence]. This shifts our focus to [new direction].\"",
      tip: "Quantify wherever possible. Vague observations are penalised — link every insight to a number or a causal mechanism.",
    },
  },
  {
    num: 5,
    label: "RECOMMEND",
    desc: "Synthesize actionable path.",
    elaboration: {
      what: "Deliver a structured, prioritised recommendation with clear trade-offs. Lead with the answer — not the reasoning.",
      prompt: "\"My recommendation is [action]. The primary rationale is [key insight]. The main risk is [risk], mitigated by [plan].\"",
      tip: "Use the Pyramid Principle: conclusion first, then support. Interviewers decide within 30 seconds if your structure is sound.",
    },
  },
];


const scoreRows = [
  { category: "Problem Framing", desc: "Ability to isolate core constraints and objectives from complex narratives.", weight: "25%" },
  { category: "Structure", desc: "MECE application and logical grouping of hypotheses and workstreams.", weight: "25%" },
  { category: "Logic & Evidence", desc: "Deduced reasoning and validity of causal links between observations and findings.", weight: "20%" },
  { category: "Insight", desc: "The 'So What?' factor. Identifying non-obvious levers of value creation.", weight: "15%" },
  { category: "Communication", desc: "Clarity, tone, and poise in delivering the final synthesis and recommendation.", weight: "15%" },
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-pxv-dark text-[#FAFAFA] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-pxv-cyan/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(to right, #0E56FA 1px, transparent 1px), linear-gradient(to bottom, #0E56FA 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-24">
        {/* Mechanism */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">The 5-Step Mechanism</h2>
          </div>

          {/* Step cards row */}
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {steps.map((step, i) => {
              const isOpen = activeStep === step.num;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  onClick={() => setActiveStep(isOpen ? null : step.num)}
                  className={`relative z-10 flex-1 backdrop-blur border rounded-2xl p-6 text-center cursor-pointer
                    transition-all duration-300 group select-none
                    ${isOpen
                      ? "border-primary/70 bg-primary/15 shadow-[0_0_35px_-5px_rgba(14,86,250,0.55)]"
                      : "border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_25px_-5px_rgba(14,86,250,0.4)]"
                    }`}
                >
                  {/* Circle */}
                  <div className={`w-10 h-10 rounded-full border font-bold flex items-center justify-center mx-auto mb-4 transition-all duration-300
                    ${isOpen
                      ? "bg-primary border-primary text-white shadow-[0_0_18px_rgba(14,86,250,0.7)]"
                      : "bg-primary/20 border-primary/50 text-pxv-cyan group-hover:bg-primary group-hover:border-primary group-hover:text-white"
                    }`}>
                    {step.num}
                  </div>

                  <h4 className={`font-heading font-bold text-xs tracking-widest uppercase mb-2 transition-colors ${isOpen ? "text-pxv-cyan" : "text-white group-hover:text-pxv-cyan"}`}>
                    {step.label}
                  </h4>
                  <p className={`text-xs leading-relaxed transition-colors ${isOpen ? "text-white/80" : "text-white/60 group-hover:text-white/80"}`}>
                    {step.desc}
                  </p>

                  {/* Chevron */}
                  <ChevronDown
                    className={`w-4 h-4 mx-auto mt-3 transition-transform duration-300 text-white/40 ${isOpen ? "rotate-180 text-pxv-cyan" : ""}`}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Elaboration dropdown panel */}
          <AnimatePresence mode="wait">
            {activeStep !== null && (() => {
              const step = steps.find((s) => s.num === activeStep)!;
              return (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 bg-white/5 backdrop-blur border border-primary/30 rounded-2xl p-8 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-[0_0_14px_rgba(14,86,250,0.6)]">
                        {step.num}
                      </div>
                      <h3 className="text-xl font-bold font-heading text-white uppercase tracking-widest">{step.label}</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* What */}
                      <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">What to Do</p>
                        <p className="text-sm text-white/80 leading-relaxed">{step.elaboration.what}</p>
                      </div>
                      {/* Sample Prompt */}
                      <div className="bg-primary/10 rounded-xl p-5 border border-primary/30">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-pxv-cyan mb-2">Sample Prompt</p>
                        <p className="text-sm text-white/80 leading-relaxed italic">{step.elaboration.prompt}</p>
                      </div>
                      {/* Coach Tip */}
                      <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-pxv-cyan mb-2">Coach Tip</p>
                        <p className="text-sm text-white/80 leading-relaxed">{step.elaboration.tip}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </motion.section>

        {/* Score Breakdown */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <div className="mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Evaluation</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">Score Breakdown</h2>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-white/50">Category</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-white/50">What Is Assessed</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-widest text-white/50 text-right">Weight</th>
                </tr>
              </thead>
              <tbody>
                {scoreRows.map((row, i) => (
                  <tr key={row.category} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i === scoreRows.length - 1 ? "border-0" : ""}`}>
                    <td className="p-5 font-semibold text-primary text-sm">{row.category}</td>
                    <td className="p-5 text-sm text-white/70 leading-relaxed">{row.desc}</td>
                    <td className="p-5 text-right font-mono font-bold text-pxv-cyan text-sm">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 bg-primary/10 border border-primary/30 rounded-xl">
            <p className="text-sm text-white/80 font-medium">
              <span className="text-primary font-bold">Score formula:</span>{" "}
              Each dimension scored 1–4. Final score = weighted sum × 2.5. Target 8+ to pass a competitive interview.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
