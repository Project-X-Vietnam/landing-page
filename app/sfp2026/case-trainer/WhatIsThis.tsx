import { motion } from "framer-motion";
import { Brain, MessageCircle, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatIsThisProps {
  onNext: () => void;
  hideStepLabel?: boolean;
}

const features = [
  {
    icon: Brain,
    title: "Structured Thinking",
    description:
      "Most candidates fail not from lack of knowledge, but because they can't structure thinking under pressure. PJX Case Trainer fixes that.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: MessageCircle,
    title: "AI-Guided Coaching",
    description:
      "A Socratic AI coach walks you through 5 structured steps — Define, Decompose, Hypothesize, Analyze, Recommend — without giving answers.",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    icon: BarChart3,
    title: "Evidence-Based Feedback",
    description:
      "After each session, an AI evaluator scores you across 5 dimensions: Problem Framing, Structure, Logic, Insight, and Communication.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

export default function WhatIsThis({ onNext, hideStepLabel }: WhatIsThisProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-28 sm:px-6 lg:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(14,86,250,0.12),transparent_60%)]" />

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
          className="mb-14 text-center"
        >
          {!hideStepLabel && (
            <p className="lumina-gradient-text mb-4 font-md3-mono text-[0.6875rem] font-normal uppercase leading-[1.4] tracking-[0.2em]">
              Step 2 of 6
            </p>
          )}
          <h2 className="font-jakarta text-[clamp(1.75rem,4vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            What is PJX Case Trainer?
          </h2>
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
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "lumina-glass flex flex-col p-6 rounded-[24px] group transition-all duration-300",
                  "hover:-translate-y-2 hover:border-primary/30"
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
                <h3 className="font-jakarta mb-3 text-[1.125rem] font-bold leading-[1.3] text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[0.9375rem] font-normal leading-[1.6] text-[rgba(255,255,255,0.6)]">
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
          className="mt-10 flex justify-center"
        >
          <Button
            onClick={onNext}
            size="lg"
            className={cn(
              "lumina-primary-glow group rounded-full bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] px-10 py-7 text-[1rem] font-bold text-white transition-all hover:scale-[1.02]",
              "border-none"
            )}
          >
            How It Works
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
