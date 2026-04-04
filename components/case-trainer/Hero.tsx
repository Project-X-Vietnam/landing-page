"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { trackCaseTrainerHeroClick } from "@/lib/analytics/case-trainer";

interface HeroProps {
  onGetFiles: () => void;
}

export default function Hero({ onGetFiles }: HeroProps) {
  return (
    <section id="hero-section" className="reveal relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-5 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,80,255,0.12),transparent_55%)]" />
      <div className="lumina-ring pointer-events-none absolute left-[5%] top-[8%] h-[180px] w-[180px] rounded-full" />
      <div className="lumina-dot pointer-events-none absolute right-[8%] top-[18%] h-[10px] w-[10px] rounded-full bg-[#00cfff] opacity-70" />
      <div className="lumina-ring pointer-events-none absolute bottom-[10%] right-[3%] h-[280px] w-[280px] rounded-full" />
      <div className="lumina-dot pointer-events-none absolute bottom-[20%] left-[4%] h-[12px] w-[12px] rounded-full bg-[rgba(0,150,255,0.6)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02)_0,transparent_22%,transparent_60%,rgba(23,202,250,0.05)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[700px] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <div className="lumina-glass mb-8 inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-[0.875rem] font-normal leading-[1.4] text-[rgba(255,255,255,0.85)]">
            <span className="lumina-dot h-2 w-2 rounded-full bg-[#00cfff]" />
            <span className="lumina-gradient-text">PJX Case Trainer · Now in Beta</span>
          </div>

          <div className="mb-6 text-center font-primary uppercase leading-[1.1] tracking-[-0.02em]">
            <div className="whitespace-nowrap text-[clamp(2.3rem,5vw,4.2rem)] font-bold text-white">
              PROJECT X VIETNAM
            </div>
            <div className="mt-1 whitespace-nowrap text-[clamp(2rem,4.35vw,3.6rem)] font-semibold text-[rgba(255,255,255,0.82)]">
              CASE TRAINER
            </div>
          </div>

          <p className="mx-auto mb-10 max-w-[580px] text-[1rem] font-normal leading-[1.6] tracking-[0.01em] text-[rgba(255,255,255,0.75)] md:text-[1.0625rem] md:whitespace-nowrap">
            No hints. No hand-holding. Just the pressure that builds real interview skill.
          </p>

          <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            <Button
              id="hero-cta-btn"
              type="button"
              onClick={() => {
                trackCaseTrainerHeroClick();
                onGetFiles();
              }}
              className="lumina-primary-glow h-auto border-0 text-[0.9375rem] font-semibold leading-[1.4] text-white hover:bg-[#37d9ff]"
            >
              Get the Files →
            </Button>

            <a
              href="#sample-prompts"
              className="lumina-glass inline-flex items-center justify-center rounded-full px-8 py-[14px] text-[0.9375rem] font-normal leading-[1.4] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17CAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01001F]"
            >
              See Sample Prompts
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
