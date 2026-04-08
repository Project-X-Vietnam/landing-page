import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import StepProgress from "./StepProgress";

interface HowItWorksProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  onNavigate: (step: number, direct?: boolean) => void;
  hideStepLabel?: boolean;
}

const steps = [
  {
    label: "DEFINE",
    description:
      "Before you touch the problem, state the goal, the user, and at least one constraint. Scope first — always.",
  },
  {
    label: "DECOMPOSE",
    description:
      "Break the problem into components that don't overlap and don't leave gaps. This is where MECE thinking shows up.",
  },
  {
    label: "HYPOTHESIZE",
    description:
      "Commit to what you think is happening — and why — before you start analyzing. No hypothesis, no direction.",
  },
  {
    label: "ANALYZE",
    description:
      "Test your hypothesis. Walk through the data you'd look at, the trade-offs you'd weigh, and the reasoning behind each move.",
  },
  {
    label: "RECOMMEND",
    description:
      "Land the plane. Give a clear recommendation, your top reasons, how you'd measure success, and what could go wrong.",
  },
];

const rubric = [
  { dimension: "Problem Framing", weight: 25 },
  { dimension: "Structure", weight: 25 },
  { dimension: "Logic & Evidence", weight: 20 },
  { dimension: "Insight", weight: 15 },
  { dimension: "Communication", weight: 15 },
];

export default function HowItWorks({ onNext, onBack, currentStep, onNavigate, hideStepLabel }: HowItWorksProps) {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 py-20 sm:px-6 lg:px-8">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(23,202,250,0.10),transparent_65%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[960px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <StepProgress currentStep={currentStep} onNavigate={onNavigate} />
          {!hideStepLabel && (
            <p className="lumina-gradient-text mb-4 font-sans text-[0.75rem] font-normal uppercase leading-[1.4] tracking-[0.2em]">
              Step 3 of 6
            </p>
          )}
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
            Your thinking, coached step by step.
          </h2>
        </motion.div>

        {/* Main content: 2-column sticky layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-10 md:grid-cols-[58%_38%] md:gap-[4%]"
        >
          {/* Left column: 5 steps */}
          <div className="text-left">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className={cn("relative pl-16", index < steps.length - 1 ? "pb-7" : "pb-0")}
              >
                <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#2563EB] bg-transparent text-[12px] font-semibold text-[#2563EB]">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-[13px] top-7 h-[calc(100%+28px)] w-[2px] bg-[rgba(255,255,255,0.12)]" />
                )}
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A9EFF]">
                  {step.label}
                </p>
                <p className="text-[16px] font-normal leading-[1.7] text-[rgba(255,255,255,0.85)]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right column: sticky scoring card */}
          <div className="md:sticky md:top-20 md:self-start">
            <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-6">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(255,255,255,0.45)]">
                How You&apos;re Scored
              </p>

              <div>
                {rubric.map((row, index) => (
                  <div key={row.dimension} className={cn(index < rubric.length - 1 ? "mb-4" : "")}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[14px] font-medium text-[rgba(255,255,255,0.9)]">{row.dimension}</span>
                      <span className="text-[13px] text-[#4A9EFF]">{row.weight}%</span>
                    </div>
                    <div className="h-[3px] w-full rounded-full bg-[rgba(255,255,255,0.08)]">
                      <div className="h-[3px] rounded-full bg-[#2563EB]" style={{ width: `${row.weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-4 border-t border-white/10" />

              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(255,255,255,0.45)]">
                Score Ranges
              </p>
              <p className="mb-3.5 text-[13px] leading-[1.5] text-[rgba(255,255,255,0.50)]">
                Your session score is out of 10. Here&apos;s what each range means:
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center">
                  <span className="whitespace-nowrap rounded-full border border-[#22c55e] px-2.5 py-[3px] text-[12px] font-semibold text-[#22c55e]">8-10</span>
                  <span className="mx-2.5 flex-1 text-[13px] font-medium text-[rgba(255,255,255,0.88)]">Strong</span>
                  <span className="whitespace-nowrap text-right text-[12px] text-[rgba(255,255,255,0.40)]">Ready for most interviews</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap rounded-full border border-[#4A9EFF] px-2.5 py-[3px] text-[12px] font-semibold text-[#4A9EFF]">6-7.5</span>
                  <span className="mx-2.5 flex-1 text-[13px] font-medium text-[rgba(255,255,255,0.80)]">Adequate</span>
                  <span className="whitespace-nowrap text-right text-[12px] text-[rgba(255,255,255,0.40)]">One or two gaps to address</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.35)] px-2.5 py-[3px] text-[12px] font-semibold text-[rgba(255,255,255,0.55)]">4-5.5</span>
                  <span className="mx-2.5 flex-1 text-[13px] font-medium text-[rgba(255,255,255,0.65)]">Developing</span>
                  <span className="whitespace-nowrap text-right text-[12px] text-[rgba(255,255,255,0.40)]">Needs more structured practice</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap rounded-full border border-[rgba(239,68,68,0.60)] px-2.5 py-[3px] text-[12px] font-semibold text-[rgba(239,68,68,0.75)]">&lt; 4</span>
                  <span className="mx-2.5 flex-1 text-[13px] font-medium text-[rgba(255,255,255,0.55)]">Weak</span>
                  <span className="whitespace-nowrap text-right text-[12px] text-[rgba(255,255,255,0.40)]">Revisit the fundamentals first</span>
                </div>
              </div>

              <div className="my-3.5 border-t border-white/10" />

              <p className="text-center text-[12px] italic leading-[1.5] text-[rgba(255,255,255,0.28)]">
                Scores are for practice reference only and do not reflect official PJX assessment outcomes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="mx-auto mt-12 max-w-[560px] text-center text-[14px] leading-[1.6] text-[rgba(255,255,255,0.4)]">
          Two AI modes power each session — Prompt A coaches you through the 5 steps without giving answers. Prompt B evaluates your full transcript after.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-center justify-center gap-4">
            <button type="button" onClick={onBack} className="text-[16px] font-semibold text-white/80 transition-colors hover:text-white">
              ← Back
            </button>
            <Button
              onClick={onNext}
              size="lg"
              className={cn(
                "lumina-primary-glow group h-[60px] rounded-full bg-[#1D4ED8] px-14 text-[16px] font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#1E40AF] active:bg-[#1E3A8A]",
                "border border-white/45 shadow-[0_0_0_1px_rgba(255,255,255,0.28),0_0_38px_rgba(29,78,216,0.62)]"
              )}
            >
              Start your first case
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
