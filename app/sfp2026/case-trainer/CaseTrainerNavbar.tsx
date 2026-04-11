"use client";

import Image from "next/image";
import Link from "next/link";

interface CaseTrainerNavbarProps {
  currentStep: number;
  onNavigate: (step: number, direct?: boolean) => void;
}

export default function CaseTrainerNavbar({
  currentStep,
  onNavigate,
}: CaseTrainerNavbarProps) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-2.5 md:px-10 md:py-3">
      <div className="absolute inset-0 -z-10 rounded-b-[14px] border border-white/10 bg-transparent backdrop-blur-sm" />
      {/* Logo */}
      <Link 
        href="/sfp2026/case-trainer" 
        onClick={() => onNavigate(1, false)}
        className="relative z-10 flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <Image
          src="/preview_icon.png"
          alt="Project X Vietnam"
          width={100}
          height={40}
          className="h-12 w-auto brightness-0 invert"
          priority
        />
        <span className="hidden items-center sm:flex">
          <span className="font-sans text-sm uppercase font-medium tracking-[0.15em] text-white/80">
            Case Trainer
          </span>
        </span>
      </Link>

      {/* Nav links */}
      <div className="relative z-10 flex items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => onNavigate(5, true)}
          className={`rounded-full px-4 py-1.5 font-sans text-sm font-normal transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17CAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01001F] ${
            currentStep === 5
              ? "bg-primary/60 text-white"
              : "text-white/70 hover:bg-white/5 hover:text-white/80"
          }`}
        >
          Setup Guide
        </button>
        <button
          type="button"
          onClick={() => onNavigate(6, true)}
          className={`rounded-full px-4 py-1.5 font-sans text-sm font-normal transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17CAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01001F] ${
            currentStep === 6
              ? "bg-primary/60 text-white"
              : "text-white/70 hover:bg-white/5 hover:text-white/80"
          }`}
        >
          Sample Prompts
        </button>
      </div>
    </nav>
  );
}
