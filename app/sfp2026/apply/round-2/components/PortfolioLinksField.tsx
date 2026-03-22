"use client";

import { useState, useEffect, useRef } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PORTFOLIO_PLATFORMS } from "./PortfolioIcons";
import type { PortfolioEntry } from "../data/types";

function PlatformDropdown({
  entry,
  usedByOthers,
  onSelect,
}: {
  entry: PortfolioEntry;
  usedByOthers: Set<string>;
  onSelect: (platform: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const platform =
    PORTFOLIO_PLATFORMS.find((p) => p.key === entry.platform) ||
    PORTFOLIO_PLATFORMS[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center justify-center w-11 h-full rounded-l-lg border border-r-0 border-slate-200 transition-colors",
          open
            ? "bg-primary/10 text-primary border-primary/30"
            : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        )}
        title={`${platform.label} — click to change`}
      >
        {platform.icon}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className="absolute left-0 bottom-[calc(100%+4px)] z-50 w-48 rounded-lg border border-slate-200 bg-white shadow-lg p-1.5"
          >
            {PORTFOLIO_PLATFORMS.filter(
              (p) => p.key === entry.platform || !usedByOthers.has(p.key)
            ).map((p) => {
              const isCurrent = entry.platform === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => {
                    onSelect(p.key);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors text-left",
                    isCurrent
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <span className="shrink-0 text-slate-400">{p.icon}</span>
                  {p.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PortfolioLinksFieldProps {
  entries: PortfolioEntry[];
  onChange: (entries: PortfolioEntry[]) => void;
}

export function PortfolioLinksField({ entries, onChange }: PortfolioLinksFieldProps) {
  const updateEntry = (idx: number, patch: Partial<PortfolioEntry>) => {
    onChange(
      entries.map((e, i) => (i === idx ? { ...e, ...patch } : e))
    );
  };

  const removeEntry = (idx: number) => {
    onChange(entries.filter((_, i) => i !== idx));
  };

  const addEntry = () => {
    const usedKeys = new Set(entries.map((e) => e.platform));
    const next =
      PORTFOLIO_PLATFORMS.find((p) => !usedKeys.has(p.key)) ??
      PORTFOLIO_PLATFORMS.at(-1)!;
    onChange([...entries, { platform: next.key, url: "" }]);
  };

  return (
    <div className="space-y-2">
      {entries.map((entry, idx) => {
        const platform =
          PORTFOLIO_PLATFORMS.find((p) => p.key === entry.platform) ||
          PORTFOLIO_PLATFORMS[0];
        const usedByOthers = new Set(
          entries
            .filter((_, i) => i !== idx)
            .map((e) => e.platform)
        );
        return (
          <div key={idx} className="flex items-stretch">
            <PlatformDropdown
              entry={entry}
              usedByOthers={usedByOthers}
              onSelect={(key) => updateEntry(idx, { platform: key })}
            />
            <input
              value={entry.url}
              onChange={(e) => updateEntry(idx, { url: e.target.value })}
              placeholder={platform.placeholder}
              className={cn(
                "w-full px-3.5 py-2.5 border border-slate-200 text-slate-900 text-sm",
                "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                entries.length > 1 ? "rounded-none" : "rounded-r-lg"
              )}
            />
            {entries.length > 1 && (
              <button
                type="button"
                onClick={() => removeEntry(idx)}
                className="flex items-center justify-center w-10 shrink-0 rounded-r-lg border border-l-0 border-slate-200 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Remove this link"
              >
                <Minus className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      })}
      {entries.length < PORTFOLIO_PLATFORMS.length && (
        <button
          type="button"
          onClick={addEntry}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors py-1"
        >
          <Plus className="w-4 h-4" /> Add another portfolio link
        </button>
      )}
    </div>
  );
}
