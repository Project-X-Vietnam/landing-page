"use client";

import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
  onNavigate: (step: number, direct?: boolean) => void;
}

const STEP_LABELS = [
  "Intro",
  "What is PJX",
  "How It Works",
  "Setup Form",
  "Setup Guide",
  "Sample Prompts",
];

export default function StepProgress({ currentStep, onNavigate }: StepProgressProps) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2">
      {STEP_LABELS.map((label, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <div key={label} className="flex items-center gap-2">
            <button
              type="button"
              title={label}
              aria-label={`Go to ${label}`}
              onClick={() => onNavigate(step, true)}
              className={cn(
                "rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17CAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01001F]",
                isActive
                  ? "h-2.5 w-2.5 bg-[#17CAFA]"
                  : isCompleted
                  ? "h-2.5 w-2.5 bg-white/60"
                  : "h-2.5 w-2.5 border border-white/25 bg-transparent hover:border-white/50"
              )}
            />
            {index < STEP_LABELS.length - 1 && <div className="h-px w-6 bg-white/20" />}
          </div>
        );
      })}
    </div>
  );
}
