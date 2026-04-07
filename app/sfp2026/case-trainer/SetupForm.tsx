"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, User, Mail, Laptop, X, Loader2 } from "lucide-react";
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

function FilesModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const nameValid = name.trim().length > 0;

  const nameError = touched.name && !nameValid;
  const emailError = touched.email && !emailValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!nameValid || !emailValid) return;
    setStatus("loading");

    const WEBHOOK_URL = "/api/get-files";

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={status !== "loading" ? onClose : undefined}
        className="fixed inset-0 z-[100] bg-[#01001F]/80 backdrop-blur-sm"
      />
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[#01001F] p-6 sm:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#17CAFA]/10 via-transparent to-transparent" />

          {status !== "loading" && (
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-10 text-white/50 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {status === "success" ? (
            <div className="text-center py-6 relative z-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#17CAFA]/20 text-[#17CAFA]">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="font-jakarta text-[1.5rem] font-extrabold tracking-[-0.03em] text-white mb-2">Files are on the way!</h3>
              <p className="text-white/50 mb-8 text-[0.875rem]">Check your email inbox shortly for the files.</p>
              <Button onClick={onClose} className="h-12 w-full rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/10">
                Close
              </Button>
            </div>
          ) : (
            <div className="relative z-10">
              <h3 className="font-jakarta text-[1.5rem] font-extrabold tracking-[0em] text-white mb-2 leading-[1.2]">Get the Files</h3>
              <p className="mb-6 text-[0.875rem] leading-[1.6] text-[rgba(255,255,255,0.45)]">
                Enter your details to receive the files directly in your inbox.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="modal-name" className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white/50">
                    <User className="h-3.5 w-3.5" />
                    Your Name
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    placeholder="e.g. Nguyen Minh Anh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched(t => ({ ...t, name: true }))}
                    disabled={status === "loading"}
                    className={cn(
                      "h-12 w-full rounded-2xl border bg-white/[0.03] px-4 text-[0.9375rem] text-white outline-none transition-all",
                      "placeholder:text-white/30 focus:bg-white/[0.06]",
                      nameError ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-[#17CAFA]/50"
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="modal-email" className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white/50">
                    <Mail className="h-3.5 w-3.5" />
                    Email Address
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    placeholder="e.g. minhanh@university.edu.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                    disabled={status === "loading"}
                    className={cn(
                      "h-12 w-full rounded-2xl border bg-white/[0.03] px-4 text-[0.9375rem] text-white outline-none transition-all",
                      "placeholder:text-white/30 focus:bg-white/[0.06]",
                      emailError ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-[#17CAFA]/50"
                    )}
                  />
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <p className="text-[0.8125rem] text-red-400 text-center font-medium bg-red-500/10 py-2 rounded-xl mt-2">
                        Something went wrong. Please try again.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                      "h-12 w-full rounded-2xl bg-[#0E56FA] text-[0.9375rem] font-extrabold text-white transition-all hover:bg-[#17CAFA]",
                      "disabled:opacity-50 border-none shadow-[0_0_20px_rgba(14,86,250,0.3)] hover:shadow-[0_0_25px_rgba(23,202,250,0.4)]"
                    )}
                  >
                    {status === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "Receive Files"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default function SetupForm({ onSubmit, hideStepLabel }: SetupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>(["claude"]);
  const [touched, setTouched] = useState({ name: false, email: false });
  const [submitted, setSubmitted] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);

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

    // Fire and forget — no blocking UI
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

      {/* Font imports for senior alignment */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <AnimatePresence>
        {showFilesModal && <FilesModal onClose={() => setShowFilesModal(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="lumina-glass relative z-10 w-full max-w-[560px] overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-7 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#17CAFA]/10 via-transparent to-transparent" />

        <div className="relative">
          {!hideStepLabel && (
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-6 items-center rounded-full bg-white/5 px-3 text-[0.625rem] font-bold uppercase tracking-[0.15em] text-white/40 ring-1 ring-white/10">
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

            {/* Email */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/50">
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
            <div className="pt-4 space-y-3">
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

              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowFilesModal(true)}
                className="h-14 w-full rounded-full border border-white/5 bg-white/[0.02] text-[0.9375rem] font-bold text-white/50 hover:bg-white/5 hover:text-white transition-all"
              >
                Get the files
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}