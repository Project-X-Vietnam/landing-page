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
    <div className="mb-4 flex flex-col items-center justify-center gap-2.5">
      <div className="flex items-center justify-center gap-2">
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
                    ? "h-3 w-3 bg-secondary"
                    : isCompleted
                    ? "h-3 w-3 bg-white/30"
                    : "h-3 w-3 border border-white/25 bg-transparent hover:border-secondary/40"
                )}
              />
              {index < STEP_LABELS.length - 1 && <div className="h-px w-6 bg-white/20" />}
            </div>
          );
        })}
      </div>
      <p className="mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-sm font-medium uppercase tracking-[0.2em] text-transparent">
        STEP {currentStep} OF 6
      </p>
    </div>
  );
}
