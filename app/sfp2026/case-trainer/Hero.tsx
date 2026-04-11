"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTA_BLUE_BUTTON } from "./constants";

interface HeroProps {
  onNext: () => void;
}

const TITLE_CLASS = "text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white";

export default function Hero({ onNext }: HeroProps) {
  return (
    <section className="relative flex h-full items-start justify-center overflow-hidden px-5 pb-10 pt-24 sm:px-6 lg:px-8">
      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-col items-center justify-center pt-8 text-center sm:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Headline */}
          <h1 className="mb-6 text-[32px] font-bold leading-[1.05] tracking-[-0.04em] text-white md:text-[42px] lg:text-[52px] xl:text-[62px]">
            <span className="block text-white">Most candidates fail</span>
            <span
              className="block whitespace-nowrap bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto", animation: "gradient-x 4s ease infinite" }}
            >
              not from lack of knowledge
            </span>
            <span className="block text-white italic">but from unstructured thinking</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-9 max-w-[600px] text-center text-[19px] font-normal leading-[1.65] tracking-[0.01em] text-[rgba(255,255,255,0.6)] break-normal whitespace-normal">
            Project X Case Trainer is an AI coach that trains you to structure
            thinking through real interview scenarios and score you on it.
          </p>

          {/* CTA */}
          <Button
            onClick={onNext}
            size="lg"
            className={cn(
              CTA_BLUE_BUTTON,
              "px-7 py-6 text-[16px]",
              "border-none hover:shadow-[0_0_30px_rgba(23,202,250,0.4)]"
            )}
          >
            Explore The Product
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Trust line */}
          <p className="mt-4 text-medium font-normal text-[rgba(255,255,255,0.38)]">
            Works with Claude · Gemini · ChatGPT
          </p>
        </motion.div>
      </div>
    </section>
  );
}
