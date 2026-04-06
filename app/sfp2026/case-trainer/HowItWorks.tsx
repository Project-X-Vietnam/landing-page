import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HowItWorksProps {
  onNext: () => void;
  hideStepLabel?: boolean;
}

const steps = [
  {
    number: "01",
    label: "DEFINE",
    description: "Clarify the goal, user, and at least one constraint before solving.",
    color: "#0E56FA",
  },
  {
    number: "02",
    label: "DECOMPOSE",
    description: "Break the problem into logical, non-overlapping components (MECE).",
    color: "#2E8BFA",
  },
  {
    number: "03",
    label: "HYPOTHESIZE",
    description: "State what you believe is happening — and why — before analysis.",
    color: "#17CAFA",
  },
  {
    number: "04",
    label: "ANALYZE",
    description: "Test your hypothesis with reasoning chains, data, and trade-offs.",
    color: "#0EAADC",
  },
  {
    number: "05",
    label: "RECOMMEND",
    description: "Deliver a structured answer: recommendation + reasons + risks.",
    color: "#0E56FA",
  },
];

const rubric = [
  { dimension: "Problem Framing", weight: "25%", assessed: "Scope, user, constraint defined clearly" },
  { dimension: "Structure", weight: "25%", assessed: "Logical, non-overlapping components" },
  { dimension: "Logic & Evidence", weight: "20%", assessed: "Claims supported by reasoning or data" },
  { dimension: "Insight", weight: "15%", assessed: "Non-obvious implications identified" },
  { dimension: "Communication", weight: "15%", assessed: "Coherent and easy to follow" },
];

export default function HowItWorks({ onNext, hideStepLabel }: HowItWorksProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-28 sm:px-6 lg:px-8">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(23,202,250,0.10),transparent_65%)]" />

      {/* Font imports for senior alignment */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          {!hideStepLabel && (
            <p className="lumina-gradient-text mb-4 font-md3-mono text-[0.6875rem] font-normal uppercase leading-[1.4] tracking-[0.2em]">
              Step 3 of 6
            </p>
          )}
          <h2 className="font-jakarta text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            How It Works
          </h2>
        </motion.div>

        {/* 5-Step Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          {/* Desktop: horizontal row */}
          <div className="hidden lg:flex lg:items-start lg:gap-0">
            {steps.map((step, index) => (
              <div key={step.label} className="relative flex flex-1 flex-col items-center">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-1/2 top-[18px] h-[1px] w-full opacity-30"
                    style={{
                      background: `linear-gradient(90deg, ${step.color}, ${steps[index + 1].color})`,
                    }}
                  />
                )}

                {/* Number bubble */}
                <div
                  className="relative z-10 mb-2 flex h-9 w-9 items-center justify-center rounded-full border text-[0.7rem] font-bold transition-transform hover:scale-110"
                  style={{
                    borderColor: `${step.color}60`,
                    background: `radial-gradient(circle, ${step.color}30, transparent 80%)`,
                    color: step.color,
                    boxShadow: `0 0 15px ${step.color}20`,
                  }}
                >
                  {step.number}
                </div>

                {/* Label */}
                <p
                  className="font-jakarta mb-1 text-[0.65rem] font-bold uppercase tracking-[0.2em]"
                  style={{ color: step.color }}
                >
                  {step.label}
                </p>

                {/* Description */}
                <p className="px-3 text-center text-[0.8rem] font-normal leading-[1.6] text-[rgba(255,255,255,0.5)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="flex flex-col gap-4 lg:hidden">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="lumina-glass flex gap-5 rounded-2xl p-5"
              >
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] font-bold"
                  style={{
                    borderColor: `${step.color}60`,
                    color: step.color,
                    background: `${step.color}15`,
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <p
                    className="font-jakarta mb-1 text-[0.7rem] font-bold uppercase tracking-[0.18em]"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </p>
                  <p className="text-[0.875rem] font-normal leading-[1.6] text-[rgba(255,255,255,0.5)]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scoring Rubric */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="font-md3-mono text-[0.7rem] font-normal uppercase leading-[1.4] tracking-[0.2em] text-[rgba(255,255,255,0.4)]">
              Evaluation Rubric
            </p>
            <div className="h-px flex-1 ml-6 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="lumina-glass overflow-hidden rounded-[20px]">
            {/* Header row */}
            <div className="grid grid-cols-[1.5fr_0.8fr_3fr] border-b border-white/[0.08] bg-white/[0.02] px-6 py-3">
              {["Dimension", "Weight", "What's Assessed"].map((h) => (
                <span key={h} className="font-md3-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[rgba(255,255,255,0.4)]">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {rubric.map((row, index) => (
              <div
                key={row.dimension}
                className={cn(
                  "grid grid-cols-[1.5fr_0.8fr_3fr] px-6 py-3.5 transition-colors hover:bg-white/[0.03]",
                  index < rubric.length - 1 ? "border-b border-white/[0.06]" : ""
                )}
              >
                <span className="font-jakarta text-[0.875rem] font-semibold text-white">
                  {row.dimension}
                </span>
                <span className="lumina-gradient-text font-md3-mono text-[0.875rem] font-bold">
                  {row.weight}
                </span>
                <span className="text-[0.875rem] font-normal leading-[1.5] text-[rgba(255,255,255,0.5)]">
                  {row.assessed}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            onClick={onNext}
            size="lg"
            className={cn(
              "lumina-primary-glow group rounded-full bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] px-10 py-6 text-[0.9375rem] font-bold text-white transition-all hover:scale-[1.02]",
              "border-none"
            )}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
