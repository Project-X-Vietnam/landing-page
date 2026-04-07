"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  onNext: () => void;
  hideStepLabel?: boolean;
}

export default function Hero({ onNext, hideStepLabel }: HeroProps) {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-6 lg:px-8">
      {/* Mesh gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(14,86,250,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(23,202,250,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_75%,rgba(14,86,250,0.10),transparent_45%)]" />
      </div>

      {/* Decorative rings */}
      <div className="lumina-ring pointer-events-none absolute left-[4%] top-[10%] h-[200px] w-[200px] rounded-full" />
      <div className="lumina-dot pointer-events-none absolute right-[10%] top-[20%] h-[10px] w-[10px] rounded-full bg-[#00cfff] opacity-70" />
      <div className="lumina-ring pointer-events-none absolute bottom-[8%] right-[3%] h-[300px] w-[300px] rounded-full" />
      <div className="lumina-dot pointer-events-none absolute bottom-[22%] left-[5%] h-[12px] w-[12px] rounded-full bg-[rgba(0,150,255,0.6)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Headline — SF Pro Medium */}
          <h1 className="mb-3 text-[clamp(2.5rem,6vw,4.8rem)] font-medium leading-[1.08] tracking-[-0.04em] text-white">
            Train Smarter.
            <br />
            <span
              className="bg-gradient-to-r from-[#0E56FA] via-[#17CAFA] to-[#0E56FA] bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto", animation: "gradient-x 4s ease infinite" }}
            >
              Interview Better.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-4 max-w-[600px] text-[1.0625rem] font-normal leading-[1.65] tracking-[0.01em] text-[rgba(255,255,255,0.65)]">
            PJX Case Trainer is your AI-powered practice coach — built to help
            you think in structure, communicate under pressure, and walk into any
            tech interview ready.
          </p>

          {/* Step indicator */}
          {!hideStepLabel && (
            <p className="mb-4 font-sans text-[0.6875rem] font-normal uppercase leading-[1.4] tracking-[0.2em] text-[rgba(255,255,255,0.3)]">
              Step 1 of 6
            </p>
          )}

          {/* CTA */}
          <Button
            onClick={onNext}
            size="lg"
            className={cn(
              "lumina-primary-glow rounded-full bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] px-10 py-7 text-[1.125rem] font-medium text-white transition-all hover:scale-[1.02] active:scale-[0.98]",
              "border-none hover:shadow-[0_0_30px_rgba(23,202,250,0.4)]"
            )}
          >
            Explore the Product
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
