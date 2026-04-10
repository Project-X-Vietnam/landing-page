"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import StepProgress from "./StepProgress";

interface HeroProps {
  onNext: () => void;
  currentStep: number;
  onNavigate: (step: number, direct?: boolean) => void;
  hideStepLabel?: boolean;
}

export default function Hero({ onNext, currentStep, onNavigate, hideStepLabel }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-start justify-center overflow-hidden px-5 pb-10 pt-28 sm:px-6 lg:px-8">
      {/* Mesh gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(14,86,250,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(23,202,250,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_75%,rgba(14,86,250,0.10),transparent_45%)]" />
      </div>

      {/* Decorative rings */}
      <motion.div
        className="lumina-ring pointer-events-none absolute left-[4%] top-[10%] h-[200px] w-[200px] rounded-full"
        animate={{ x: [0, 8, -6, 0], y: [0, -10, 6, 0], scale: [1, 1.03, 0.99, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="lumina-dot pointer-events-none absolute right-[10%] top-[20%] h-[10px] w-[10px] rounded-full bg-[#00cfff] opacity-70" />
      <div className="lumina-ring pointer-events-none absolute bottom-[8%] right-[3%] h-[300px] w-[300px] rounded-full" />
      <div className="lumina-dot pointer-events-none absolute bottom-[22%] left-[5%] h-[12px] w-[12px] rounded-full bg-[rgba(0,150,255,0.6)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto mt-[16vh] flex w-full max-w-[860px] flex-col items-center justify-center text-center sm:mt-[14vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <StepProgress currentStep={currentStep} onNavigate={onNavigate} />

          {/* Headline */}
          <h1 className="mb-6 text-[32px] font-bold leading-[1.05] tracking-[-0.04em] text-white md:text-[42px] lg:text-[52px] xl:text-[62px]">
            <span className="block text-white">Most candidates fail</span>
            <span
              className="block whitespace-nowrap bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#60A5FA] bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto", animation: "gradient-x 4s ease infinite" }}
            >
              not from lack of knowledge.
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
              "lumina-primary-glow group rounded-full bg-[#1D4ED8] px-7 py-6 text-[16px] font-medium text-white transition-all hover:scale-[1.02] hover:bg-[#1E40AF] active:scale-[0.98] active:bg-[#1E3A8A]",
              "border-none hover:shadow-[0_0_30px_rgba(23,202,250,0.4)]"
            )}
          >
            Explore The Product
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Trust line */}
          <p className="mt-[18px] text-[13px] font-normal text-[rgba(255,255,255,0.38)]">
            Works with Claude · Gemini · ChatGPT
          </p>
        </motion.div>
      </div>
    </section>
  );
}
