"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, User, Mail, Laptop } from "lucide-react";
import { type Platform } from "./page";

interface SetupFormProps {
  onSubmit: (platforms: Platform[]) => void;
  hideStepLabel?: boolean;
}

const PLATFORMS: { id: Platform; label: string; recommended?: boolean }[] = [
  { id: "claude", label: "Claude", recommended: true },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "gemini", label: "Gemini" },
];

export default function SetupForm({ onSubmit, hideStepLabel }: SetupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>(["claude"]);
  const [touched, setTouched] = useState({ name: false, email: false });
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const nameValid = name.trim().length > 0;

  const nameError = touched.name && !nameValid;
  const emailError = touched.email && !emailValid;

  const togglePlatform = (id: Platform) => {
    setPlatforms((prev) =>
      prev.includes(id)
        ? prev.length === 1
          ? prev // keep at least one
          : prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!nameValid || !emailValid) return;
    setSubmitted(true);
    
    // Fire and forget — no blocking UI
    void fetch("https://formsubmit.co/ajax/hello@projectxvietnam.org", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, platforms: platforms.join(", ") }),
    }).catch(() => {});

    onSubmit(platforms);
  };

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-5 py-16 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(23,202,250,0.12),transparent_60%),radial-gradient(ellipse_at_75%_65%,rgba(14,86,250,0.12),transparent_60%)]" />

      {/* Font imports for senior alignment */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="lumina-glass relative z-10 w-full max-w-[560px] overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
      >
        {/* Inner top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#17CAFA]/10 via-transparent to-transparent" />

        <div className="relative">
          {/* Step label */}
          {!hideStepLabel && (
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-6 items-center rounded-full bg-white/5 px-3 text-[0.625rem] font-bold uppercase tracking-[0.15em] text-white/40 ring-1 ring-white/10">
                Step 4 of 6
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          )}

          {/* Headline */}
          <h2 className="font-jakarta mb-2 text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            Let's Set You Up
          </h2>
          <p className="mb-6 text-[0.875rem] font-normal leading-[1.6] text-[rgba(255,255,255,0.45)]">
            Tell us a little about yourself so we can show you the exact setup for
            your preferred AI tools.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Name Input Group */}
            <div className="space-y-2.5">
              <label
                htmlFor="setup-name"
                className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white/50"
              >
                <User className="h-3.5 w-3.5" />
                Your name
              </label>
              <div className="relative group">
                <input
                  id="setup-name"
                  type="text"
                  placeholder="e.g. Nguyen Minh Anh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  className={cn(
                    "h-14 w-full rounded-2xl border bg-white/[0.03] px-5 text-[0.9375rem] font-normal text-white backdrop-blur-sm transition-all duration-300",
                    "placeholder:text-white/20 outline-none focus:bg-white/[0.06]",
                    nameError
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/10 focus:border-[#17CAFA]/50 focus:shadow-[0_0_20px_-5px_rgba(23,202,250,0.2)]"
                  )}
                />
              </div>
              <AnimatePresence>
                {nameError && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-[0.8125rem] font-medium text-red-400"
                  >
                    Please enter your name.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Input Group */}
            <div className="space-y-2.5">
              <label
                htmlFor="setup-email"
                className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white/50"
              >
                <Mail className="h-3.5 w-3.5" />
                Contact email
              </label>
              <div className="relative group">
                <input
                  id="setup-email"
                  type="email"
                  placeholder="e.g. minhanh@university.edu.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className={cn(
                    "h-14 w-full rounded-2xl border bg-white/[0.03] px-5 text-[0.9375rem] font-normal text-white backdrop-blur-sm transition-all duration-300",
                    "placeholder:text-white/20 outline-none focus:bg-white/[0.06]",
                    emailError
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/10 focus:border-[#17CAFA]/50 focus:shadow-[0_0_20px_-5px_rgba(23,202,250,0.2)]"
                  )}
                />
              </div>
              <AnimatePresence>
                {emailError && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-[0.8125rem] font-medium text-red-400"
                  >
                    Please enter a valid email address.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Platform Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white/50">
                  <Laptop className="h-3.5 w-3.5" />
                  Primary AI platform
                </label>
                <span className="text-[0.625rem] font-medium text-white/30 italic">
                  Select multiple if applicable
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {PLATFORMS.map((p) => {
                  const isSelected = platforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={cn(
                        "group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border px-6 py-3.5 transition-all duration-300",
                        isSelected
                          ? "border-[#17CAFA]/40 bg-[#17CAFA]/10 text-white"
                          : "border-white/5 bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white/70"
                      )}
                    >
                      {/* Active indicator dot */}
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full transition-all duration-300",
                        isSelected ? "bg-[#17CAFA] shadow-[0_0_10px_#17CAFA]" : "bg-white/10"
                      )} />
                      
                      <span className="text-[0.9375rem] font-semibold">{p.label}</span>
                      
                      {p.recommended && (
                        <div className="ml-1 flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 ring-1 ring-white/10">
                          <Sparkles className="h-2 w-2 text-[#17CAFA]" />
                          <span className="text-[0.55rem] font-bold uppercase tracking-wider text-[#17CAFA]/80">rec.</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={submitted}
                className={cn(
                  "lumina-primary-glow group h-14 w-full rounded-2xl bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] text-[1rem] font-extrabold text-white transition-all hover:scale-[1.01] active:scale-[0.99]",
                  "disabled:opacity-50 disabled:hover:scale-100 border-none"
                )}
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Preparing Guide...
                  </span>
                ) : (
                  "Show My Setup Guide →"
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
