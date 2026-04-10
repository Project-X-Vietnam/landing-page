import { motion } from "framer-motion";
import { Brain, MessageCircle, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StepProgress from "./StepProgress";

interface WhatIsThisProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  onNavigate: (step: number, direct?: boolean) => void;
  hideStepLabel?: boolean;
}

const features = [
  {
    icon: Brain,
    title: "You think out loud. We catch the gaps.",
    description:
      "Most candidates fail not from lack of knowledge — but because they can't structure ambiguous problems under pressure. PJX fixes that.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "border-t-[#0E56FA]",
  },
  {
    icon: MessageCircle,
    title: "A coach that never gives you the answer.",
    description:
      "Our Socratic AI walks you through 5 steps: Define, Decompose, Hypothesize, Analyze, Recommend — asking questions until you get there yourself.",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    borderColor: "border-t-[#17CAFA]",
  },
  {
    icon: BarChart3,
    title: "Scored. Specific. No fluff.",
    description:
      "After each session, an AI evaluator scores you across Problem Framing, Structure, Logic, Insight, and Communication — with evidence from your actual responses.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "border-t-[#2E8BFA]",
  },
];

export default function WhatIsThis({ onNext, onBack, currentStep, onNavigate, hideStepLabel }: WhatIsThisProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-10 pt-28 sm:px-6 lg:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(14,86,250,0.12),transparent_60%)]" />



      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-center"
        >
          <StepProgress currentStep={currentStep} onNavigate={onNavigate} />
          {!hideStepLabel && (
            <p className="lumina-gradient-text mb-4 font-sans text-[0.75rem] font-normal uppercase leading-[1.4] tracking-[0.2em]">
              Step 2 of 6
            </p>
          )}
          <h2 className="text-[clamp(1.75rem,4vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
            Stop memorising. Start thinking.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[1.125rem] font-normal leading-[1.65] text-[rgba(255,255,255,0.6)]">
            Project X Case Trainer is an AI coach that puts you through real
            interview scenarios — and trains your thinking, not your memory.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "lumina-glass group flex min-h-[280px] flex-col rounded-[24px] border-t-2 p-7 transition-all duration-300",
                  "hover:-translate-y-2 hover:border-primary/30",
                  feature.borderColor
                )}
              >
                {/* Icon Container */}
                <div className={cn(
                  "mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  feature.iconBg,
                  feature.iconColor
                )}>
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-[1.2rem] font-medium leading-[1.3] text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[1rem] font-normal leading-[1.7] text-[rgba(255,255,255,0.6)]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-6 flex justify-center"
        >
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-white/25 px-6 py-3 text-[15px] font-normal text-white/65 transition-colors hover:border-white/50 hover:text-white/90"
            >
              ← Back
            </button>
            <Button
              onClick={onNext}
              size="lg"
              className={cn(
                "lumina-primary-glow group rounded-full bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] px-7 py-6 text-[1rem] font-medium text-white transition-all hover:scale-[1.02]",
                "border-none"
              )}
            >
              See how it works
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
