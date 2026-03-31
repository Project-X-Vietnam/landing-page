"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { trackCaseTrainerHeroClick } from "@/lib/analytics/case-trainer";

export default function CaseTrainerHero() {
  return (
    <main className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-pxv-dark text-[#FAFAFA] px-6 selection:bg-primary/30">
      {/* Lumina Path atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-pxv-cyan/5 opacity-80" />
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 blur-[140px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-pxv-cyan/10 blur-[120px] rounded-full animate-float-slow" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, #0E56FA 1px, transparent 1px), linear-gradient(to bottom, #0E56FA 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pxv-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pxv-cyan" />
          </span>
          <span className="text-sm font-semibold text-pxv-cyan uppercase tracking-widest">
            Official Interview Prep Standard · Phase 1 MVP
          </span>
        </motion.div>

        {/* Heading */}
        <h1 className="flex flex-col gap-3">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-heading leading-tight text-white uppercase whitespace-nowrap">
            Project X Vietnam
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold font-heading uppercase tracking-widest gradient-text bg-white/5 inline-block px-8 py-4 rounded-2xl border border-white/10 backdrop-blur-sm self-center">
            AI-powered Case Trainer
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl font-medium text-white/80 max-w-2xl mx-auto border-y border-white/10 py-6 tracking-wide leading-relaxed">
          The architectural blueprint for mastering case interviews. Decompose complexity, reconstruct{" "}
          <strong className="gradient-text italic font-semibold">elite problem-solving frameworks</strong>.
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Button
            size="lg"
            className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-white rounded-full font-semibold shadow-[0_0_30px_-5px_var(--primary)] transition-all hover:scale-[1.02]"
            asChild
          >
            <Link href="/sfp2026/case-trainer/setup" onClick={() => trackCaseTrainerHeroClick()}>
              Setup Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base bg-transparent border border-white/20 text-white/80 hover:border-white/50 hover:text-white rounded-full font-medium transition-all"
            asChild
          >
            <Link href="/sfp2026/case-trainer/about">Learn How It Works</Link>
          </Button>
        </motion.div>

        {/* Role tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto pt-2"
        >
          {["PM/PO", "BA", "DA", "DS", "SWE", "AI/ML"].map((role) => (
            <span
              key={role}
              className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-pxv-cyan uppercase tracking-widest"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="text-[10px] uppercase text-white/30 tracking-[0.3em] pt-4">
          Educational Use Only · Internal Beta v1.0 · Supports PJX ~2,000 applicant pipeline
        </p>
      </motion.div>
    </main>
  );
}
