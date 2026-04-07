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
          ? prev
          : prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  // ✅ Hàm download 2 file
  const downloadSetupFiles = () => {
    const files = [
      { url: "/case-trainer-assets/pjx_casetrainer_casehub.json", filename: "pjx_casetrainer_casehub.json" },
      { url: "/case-trainer-assets/pjx_casetrainer_systemprompt.xml", filename: "pjx_casetrainer_systemprompt.xml" },
    ];

    files.forEach((file, index) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = file.url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, index * 300);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!nameValid || !emailValid) return;

    setSubmitted(true);

    void fetch("https://formsubmit.co/ajax/hello@projectxvietnam.org", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, platforms: platforms.join(", ") }),
    }).catch(() => { });

    downloadSetupFiles(); // ✅ Trigger download
    onSubmit(platforms);
  };

  return (
    <section className="relative flex h-screen items-center justify-center px-5 py-8 sm:px-6 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(23,202,250,0.12),transparent_60%),radial-gradient(ellipse_at_75%_65%,rgba(14,86,250,0.12),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="lumina-glass relative z-10 w-full max-w-[560px] overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-7 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#17CAFA]/10 via-transparent to-transparent" />

        <div className="relative">
          {!hideStepLabel && (
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-6 items-center rounded-full bg-white/5 px-3 text-[0.625rem] font-medium uppercase tracking-[0.15em] text-white/40 ring-1 ring-white/10">
                Step 4 of 6
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          )}

          <h2 className="mb-2 text-[1.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-white">
            Let's Set You Up
          </h2>
          <p className="mb-4 text-[0.875rem] leading-[1.6] text-[rgba(255,255,255,0.45)]">
            Tell us a little about yourself so we can prepare your setup files for your preferred AI tools.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/50">
                <User className="h-3.5 w-3.5" />
                Your name
              </label>
              <input
                type="text"
                placeholder="e.g. Nguyen Minh Anh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                className={cn(
                  "h-12 w-full rounded-2xl border bg-white/[0.03] px-5 text-white",
                  nameError ? "border-red-500/50" : "border-white/10"
                )}
              />
              <AnimatePresence>
                {nameError && (
                  <motion.p className="text-[0.8125rem] text-red-400">
                    Please enter your name.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/50">
                <Mail className="h-3.5 w-3.5" />
                Contact email
              </label>
              <input
                type="email"
                placeholder="e.g. minhanh@university.edu.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={cn(
                  "h-12 w-full rounded-2xl border bg-white/[0.03] px-5 text-white",
                  emailError ? "border-red-500/50" : "border-white/10"
                )}
              />
              <AnimatePresence>
                {emailError && (
                  <motion.p className="text-[0.8125rem] text-red-400">
                    Please enter a valid email address.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Platforms */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/50">
                <Laptop className="h-3.5 w-3.5" />
                Primary AI platform
              </label>
              <div className="flex gap-3">
                {PLATFORMS.map((p) => {
                  const isSelected = platforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={cn(
                        "rounded-2xl px-4 py-2 border",
                        isSelected ? "border-[#17CAFA]" : "border-white/10"
                      )}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <Button
              type="submit"
              disabled={submitted}
              className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] text-white font-medium"
            >
              {submitted ? (
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Preparing Files...
                </span>
              ) : (
                "Get Setup Files →"
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}