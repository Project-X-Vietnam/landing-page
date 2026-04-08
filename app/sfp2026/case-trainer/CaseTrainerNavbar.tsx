"use client";

import Image from "next/image";
import Link from "next/link";
import { type Platform } from "./page";

interface CaseTrainerNavbarProps {
  currentStep: number;
  onNavigate: (step: number, direct?: boolean) => void;
}

export default function CaseTrainerNavbar({
  currentStep,
  onNavigate,
}: CaseTrainerNavbarProps) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10">
      {/* Glass background layer */}
      <div className="pointer-events-none absolute inset-0 border-b border-white/[0.07] bg-[#01001F]/80 backdrop-blur-xl" />

      {/* Logo */}
      <Link 
        href="/sfp2026/case-trainer" 
        onClick={() => onNavigate(1, false)}
        className="relative z-10 flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <Image
          src="/preview_icon.png"
          alt="Project X Vietnam"
          width={120}
          height={32}
          className="h-8 w-auto brightness-0 invert"
          priority
        />
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="h-3.5 w-px rounded-full bg-white/20" />
          <span className="font-sans text-[0.65rem] font-normal uppercase leading-[1.4] tracking-[0.18em] text-white/40">
            Case Trainer
          </span>
        </span>
      </Link>

      {/* Nav links */}
      <div className="relative z-10 flex items-center gap-1">
        <button
          type="button"
          onClick={() => onNavigate(5, true)}
          className={`rounded-full px-4 py-2 font-sans text-sm font-normal uppercase leading-[1.4] tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17CAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01001F] ${
            currentStep === 5
              ? "bg-[rgba(23,202,250,0.12)] text-white"
              : "text-white/50 hover:bg-white/5 hover:text-white/80"
          }`}
        >
          Setup Guide
        </button>
        <button
          type="button"
          onClick={() => onNavigate(6, true)}
          className={`rounded-full px-4 py-2 font-sans text-sm font-normal uppercase leading-[1.4] tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17CAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01001F] ${
            currentStep === 6
              ? "bg-[rgba(23,202,250,0.12)] text-white"
              : "text-white/50 hover:bg-white/5 hover:text-white/80"
          }`}
        >
          Sample Prompts
        </button>
      </div>
    </nav>
  );
}
