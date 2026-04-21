"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Check, Sparkles, User, Mail, Laptop } from "lucide-react";
import type { Platform } from "./types";
import { BACK_BUTTON, CARD_SURFACE, CTA_BLUE_BUTTON } from "./constants";
import { sendGAEvent } from "@next/third-parties/google";

interface SetupFormProps {
  onSubmit: (platforms: Platform[]) => void;
  onBack: () => void;
}

const PLATFORMS: { id: Platform; label: string; logo: string; recommended?: boolean }[] = [
  { id: "claude", label: "Claude", logo: "/images/logos/claude-logo.png", recommended: true },
  { id: "chatgpt", label: "ChatGPT", logo: "/images/logos/chatgpt-logo.png" },
  { id: "gemini", label: "Gemini", logo: "/images/logos/gemini-logo.png" },
];

export default function SetupForm({ onSubmit, onBack }: SetupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>(["claude"]);
  const [touched, setTouched] = useState({ name: false, email: false });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  // Start both downloads directly from the submit interaction.
  const downloadSetupFiles = () => {
    const files = [
      { url: "/case-trainer-assets/components/pjx_casetrainer_casehub.json", filename: "pjx_casetrainer_casehub.json" },
      { url: "/case-trainer-assets/components/pjx_casetrainer_systemprompt.xml", filename: "pjx_casetrainer_systemprompt.xml" },
    ];

    files.forEach((file) => {
      const a = document.createElement("a");
      a.href = file.url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    setSubmitError("");
    if (!nameValid || !emailValid) return;

    setSubmitted(true);
    sendGAEvent({
      event: "case_trainer_download_clicked",
      value: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        platforms,
      },
    });
    downloadSetupFiles();

    try {
      const response = await fetch("/api/case-trainer/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          platforms,
          platformLabels: platforms.join(", "),
          submittedAt: new Date().toISOString(),
          source: "case-trainer-setup-form",
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to send setup form to n8n webhook:", error);
      setSubmitError(
        "We could not send your info right now. Please try again in a moment."
      );
      setSubmitted(false);
      return;
    }

    onSubmit(platforms);
  };

  return (
    <section className="relative flex h-full items-center justify-center overflow-hidden px-5 pb-8 pt-15 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(CARD_SURFACE, "relative z-10 w-full max-w-[560px] overflow-hidden rounded-[32px] p-6 sm:p-7")}
      >
        <div className="relative">
          <h2 className="mb-2 text-[1.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-white">
            Let's Set You Up
          </h2>
          <p className="mb-4 text-[0.9375rem] leading-[1.6] text-[rgba(255,255,255,0.45)]">
            Tell us a little about yourself so we can prepare your setup files for your preferred AI tools.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-white/50">
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
                  "h-12 w-full rounded-2xl border px-5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 bg-transparent",
                  nameError
                    ? "border-red-500/50"
                    : nameValid
                    ? "border-white"
                    : "border-white/10"
                )}
              />
              <AnimatePresence>
                {nameError && (
                  <motion.p className="text-[0.875rem] text-red-400">
                    Please enter your name.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-white/50">
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
                  "h-12 w-full rounded-2xl border px-5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 bg-transparent",
                  emailError
                    ? "border-red-500/50"
                    : emailValid
                    ? "border-white"
                    : "border-white/10"
                )}
              />
              <AnimatePresence>
                {emailError && (
                  <motion.p className="text-[0.875rem] text-red-400">
                    Please enter a valid email address.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Platforms */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-white/50">
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
                        "flex flex-1 flex-col items-center gap-2.5 rounded-2xl px-4 py-4 border transition-all duration-200 cursor-pointer",
                        isSelected
                          ? "border-white"
                          : "border-white/20 hover:border-white/40"
                      )}
                    >
                      <Image
                        src={p.logo}
                        alt={`${p.label} logo`}
                        width={36}
                        height={36}
                        className="rounded-xl"
                      />
                      <span className={cn(
                        "text-[0.95rem] font-medium transition-colors duration-200",
                        isSelected ? "text-white" : "text-white/60"
                      )}>{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onBack}
                className={BACK_BUTTON}
              >
                ← Back
              </button>
              <Button
                type="submit"
                disabled={submitted}
                className={cn(CTA_BLUE_BUTTON, "h-12 flex-1")}
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
            </div>
            <AnimatePresence>
              {submitError && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[0.875rem] text-red-400"
                >
                  {submitError}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </section>
  );
}