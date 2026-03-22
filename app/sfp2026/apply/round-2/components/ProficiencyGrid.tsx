"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const PROFICIENCY_SCALE = [1, 2, 3, 4, 5] as const;

interface ProficiencyGridProps {
  items: string[];
  ratings: Record<string, string>;
  onChange: (r: Record<string, string>) => void;
  otherValue?: string;
}

export function ProficiencyGrid({ items, ratings, onChange, otherValue }: ProficiencyGridProps) {
  const rateableItems = items.filter((i) => i !== "Other");
  const otherLabel = otherValue?.trim();
  if (otherLabel && items.includes("Other")) rateableItems.push(otherLabel);
  if (rateableItems.length === 0) return null;
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-0">
      <div className="hidden sm:grid sm:grid-cols-[1fr_repeat(5,32px)] gap-0.5 mb-3 px-1">
        <span />
        <span className="text-[9px] text-slate-400 text-center">Novice</span>
        <span />
        <span className="text-[9px] text-slate-400 text-center">Good</span>
        <span />
        <span className="text-[9px] text-slate-400 text-center">Expert</span>
      </div>
      {rateableItems.map((item) => {
        const current = parseInt(ratings[item] || "0", 10);
        return (
          <div
            key={item}
            className="flex flex-col sm:grid sm:grid-cols-[1fr_repeat(5,32px)] gap-2 sm:gap-0.5 py-3 border-b border-slate-100 last:border-0 items-center"
          >
            <p
              className="text-sm font-medium text-slate-700 truncate w-full mb-2 sm:mb-0"
              title={item}
            >
              {item}
            </p>
            <div className="flex gap-1 sm:contents">
              {PROFICIENCY_SCALE.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange({ ...ratings, [item]: String(n) })}
                  className="flex justify-center items-center p-0.5 rounded transition-colors hover:bg-slate-200/50"
                  title={`${n} / 5`}
                  aria-label={`Rate ${n} out of 5`}
                >
                  <Star
                    className={cn(
                      "w-5 h-5 transition-colors",
                      n <= current ? "fill-primary text-primary" : "fill-slate-200 text-slate-300"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
