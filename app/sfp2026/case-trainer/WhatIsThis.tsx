import { motion } from "framer-motion";
import { Brain, MessageCircle, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BACK_BUTTON, CARD_SURFACE, CTA_BLUE_BUTTON } from "./constants";

interface WhatIsThisProps {
  onNext: () => void;
  onBack: () => void;
  hideTitle?: boolean;
}

const features = [
  {
    icon: Brain,
    title: "You think out loud. We catch the gaps.",
    description:
      "Most candidates fail not from lack of knowledge — but because they can't structure ambiguous problems under pressure. PJX Case Trainer fixes that.",
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

export default function WhatIsThis({ onNext, onBack, hideTitle }: WhatIsThisProps) {
  return (
    <section className="relative flex h-full flex-col items-center justify-center overflow-hidden px-5 pb-10 pt-20 sm:px-6 lg:px-8">

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Header */}
        
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
                  CARD_SURFACE,
                  "group flex min-h-[280px] flex-col rounded-[24px] border-t-2 p-7 transition-all duration-300",
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
              className={BACK_BUTTON}
            >
              ← Back
            </button>
            <Button
              onClick={onNext}
              size="lg"
              className={cn(
                CTA_BLUE_BUTTON,
                "px-7 py-6 text-[1rem]"
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
