"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import type { Round2FormData } from "./data/types";
import type { FormExitElement } from "@/lib/analytics/sfp2026";
import { FORM_CLOSE_DEADLINE } from "./data/constants";

const STEP_CONTEXT: { title: string; tip: string }[] = [
  {
    title: "Verify your identity",
    tip: "Use the same email from Round 1 — this links your application data across rounds.",
  },
  {
    title: "Your academic profile",
    tip: "Be accurate with your institution and GPA — companies use this for initial screening.",
  },
  {
    title: "Show your skills",
    tip: "Be honest about your proficiency levels. This helps us match you with the right opportunities.",
  },
  {
    title: "Where & when",
    tip: "Being flexible with location and timing significantly increases your matching chances.",
  },
  {
    title: "Almost there!",
    tip: "Tell us what you've improved since Round 1 — growth mindset matters to our partners.",
  },
];

function CountdownTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center font-medium">
      <span className="text-[40px] xl:text-[52px] 2xl:text-[56px] font-medium text-white tabular-nums leading-none tracking-tight">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[11px] text-white/50 font-medium mt-1.5">
        {label}
      </span>
    </div>
  );
}

interface RightPanelProps {
  currentStep: number;
  data: Round2FormData;
  onExit?: (element: FormExitElement) => void;
}

export function RightPanel({ currentStep, data, onExit }: RightPanelProps) {
  const [[d, h, m, s], setTime] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, FORM_CLOSE_DEADLINE.getTime() - Date.now());
      setTime([
        Math.floor(diff / 86400000),
        Math.floor((diff / 3600000) % 24),
        Math.floor((diff / 60000) % 60),
        Math.floor((diff / 1000) % 60),
      ]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const ctx = STEP_CONTEXT[currentStep] || STEP_CONTEXT[0];

  return (
    <div className="relative z-10 h-full flex flex-col p-6 xl:p-8 2xl:p-10">
      <div className="shrink-0">
        <Link
          href="/sfp2026"
          onClick={() => onExit?.("back_link")}
          className="text-xs text-white/50 hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> SFP 2026
        </Link>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto scrollbar-hide">
        <div className="my-auto w-full flex flex-col items-center">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide backdrop-blur-md bg-primary/20 text-blue-300 border border-primary/30 shadow-[0_0_20px_rgba(14,86,250,0.25)]">
                <span className="w-2 h-2 rounded-full animate-pulse bg-primary" />
                Round 2 Application
              </div>
            </div>
            <h2
              className="uppercase font-bold text-white tracking-wide mb-4 flex flex-col gap-2 xl:gap-3"
              style={{ fontFamily: "Plus Jakarta Sans, -apple-system, sans-serif" }}
            >
              <span className="text-2xl xl:text-3xl 2xl:text-[2.5rem] leading-none">
                Summer Fellowship
              </span>
              <span className="text-2xl xl:text-3xl 2xl:text-[2.5rem] leading-none">
                Program 2026
              </span>
            </h2>
            <p className="text-white/70 text-[13px] leading-relaxed max-w-lg mx-auto">
              Complete your Round 2 application to continue in the SFP 2026
              selection process. Share your skills, preferences, and availability.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <GlassCard className="shrink-0">
              <div className="px-12 py-4">
                <p className="text-[13px] font-medium text-white/60 text-center mb-3">
                  Application closes in
                </p>
                <div className="flex items-start justify-between">
                  <CountdownTile value={d} label="days" />
                  <span className="text-[32px] xl:text-[42px] 2xl:text-[46px] font-light text-white leading-none mt-[2px]">
                    :
                  </span>
                  <CountdownTile value={h} label="hours" />
                  <span className="text-[32px] xl:text-[42px] 2xl:text-[46px] font-light text-white leading-none mt-[2px]">
                    :
                  </span>
                  <CountdownTile value={m} label="minutes" />
                  <span className="text-[32px] xl:text-[42px] 2xl:text-[46px] font-light text-white leading-none mt-[2px]">
                    :
                  </span>
                  <CountdownTile value={s} label="seconds" />
                </div>
              </div>
            </GlassCard>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard className="shrink-0">
                  <div className="px-5 py-4">
                    <p className="text-white font-semibold text-sm mb-1">
                      {ctx.title}
                    </p>
                    <p className="text-white/55 text-xs leading-relaxed">
                      {ctx.tip}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>


          </div>
        </div>
      </div>
    </div>
  );
}
