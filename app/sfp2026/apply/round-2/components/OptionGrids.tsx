"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormInput } from "./FormPrimitives";

export function OptionGrid({
  options,
  selected,
  onChange,
  multiple = true,
  maxSelect,
  columns = 2,
  hasOther,
  otherValue,
  onOtherChange,
}: {
  options: string[];
  selected: string[];
  onChange: (s: string[]) => void;
  multiple?: boolean;
  maxSelect?: number;
  columns?: 1 | 2 | 3;
  hasOther?: boolean;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  const toggle = (option: string) => {
    if (multiple) {
      if (selected.includes(option)) onChange(selected.filter((s) => s !== option));
      else if (!maxSelect || selected.length < maxSelect) onChange([...selected, option]);
    } else {
      onChange(selected.includes(option) ? [] : [option]);
    }
  };
  const allOptions = hasOther ? [...options, "Other"] : options;
  const isOtherSelected = selected.includes("Other");
  const gridClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";

  return (
    <div>
      <div className={cn("grid gap-2", gridClass)}>
        {allOptions.map((option) => {
          const isSelected = selected.includes(option);
          const isDisabled =
            multiple && !!maxSelect && selected.length >= maxSelect && !isSelected;
          return (
            <div
              key={option}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => !isDisabled && toggle(option)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  if (!isDisabled) toggle(option);
                }
              }}
              className={cn(
                "flex items-center gap-3 py-2.5 px-3 rounded-lg border cursor-pointer transition-all text-sm select-none",
                isSelected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300",
                isDisabled && "opacity-40 cursor-not-allowed"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center",
                  multiple ? "" : "rounded-full",
                  isSelected ? "border-primary bg-primary" : "border-slate-300"
                )}
              >
                {isSelected &&
                  (multiple ? (
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  ))}
              </div>
              <span className="text-slate-700">{option}</span>
            </div>
          );
        })}
      </div>
      {hasOther && isOtherSelected && (
        <FormInput
          placeholder="Please specify..."
          value={otherValue || ""}
          onChange={(e) => onOtherChange?.(e.target.value)}
          className="mt-2"
        />
      )}
      {multiple && maxSelect && (
        <p className="mt-1.5 text-xs text-slate-400">
          {selected.length}/{maxSelect} selected
        </p>
      )}
    </div>
  );
}

export function GroupedOptionGrid({
  groups,
  selected,
  onChange,
  columns = 2,
  hasOther,
  otherValue,
  onOtherChange,
}: {
  groups: { label: string; options: string[] }[];
  selected: string[];
  onChange: (s: string[]) => void;
  columns?: 1 | 2 | 3;
  hasOther?: boolean;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  const toggle = (option: string) => {
    if (selected.includes(option)) onChange(selected.filter((s) => s !== option));
    else onChange([...selected, option]);
  };
  const isOtherSelected = selected.includes("Other");
  const gridClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
            {group.label}
          </p>
          <div className={cn("grid gap-2", gridClass)}>
            {group.options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <div
                  key={option}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => toggle(option)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggle(option);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 py-2.5 px-3 rounded-lg border cursor-pointer transition-all text-sm select-none",
                    isSelected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center",
                      isSelected ? "border-primary bg-primary" : "border-slate-300"
                    )}
                  >
                    {isSelected && (
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-slate-700">{option}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {hasOther && (
        <div>
          <div
            role="checkbox"
            aria-checked={isOtherSelected}
            tabIndex={0}
            onClick={() => toggle("Other")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                toggle("Other");
              }
            }}
            className={cn(
              "flex items-center gap-3 py-2.5 px-3 rounded-lg border cursor-pointer transition-all text-sm w-full select-none",
              isOtherSelected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center",
                isOtherSelected ? "border-primary bg-primary" : "border-slate-300"
              )}
            >
              {isOtherSelected && (
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              )}
            </div>
            <span className="text-slate-700">Other (Please Specify)</span>
          </div>
          {isOtherSelected && (
            <FormInput
              placeholder="Please specify..."
              value={otherValue || ""}
              onChange={(e) => onOtherChange?.(e.target.value)}
              className="mt-2"
            />
          )}
        </div>
      )}
    </div>
  );
}
