"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { CASE_TRAINER_SYSTEM_PROMPT, ROLE_INSTRUCTIONS } from "../lib/prompt";
import { trackCaseTrainerCopyPrompt, trackCaseTrainerAssetDownload, trackCaseTrainerOutboundClick, trackCaseTrainerPlatformSelect } from "@/lib/analytics/case-trainer";

interface PlatformStep {
  n: string;
  text: string;
  tip?: string;
}

interface Platform {
  id: string;
  label: string;
  badge: string | null;
  url: string;
  steps: PlatformStep[];
}

const platforms: Platform[] = [
  {
    id: "claude",
    label: "Platform A — Claude",
    badge: "RECOMMENDED",
    url: "https://claude.ai",
    steps: [
      {
        n: "01",
        text: "Download Files: Download both **System_Prompt.md** and **Case_Hub.csv** from the PJX webpage.",
      },
      {
        n: "02",
        text: "Create a Project: Go to **claude.ai** → Left sidebar → **Projects** → **New Project**. Name it exactly: **PJX Case Trainer**",
      },
      {
        n: "03",
        text: "Upload Files: Inside the project → **Files** → Click **Add Files** button → Upload both **.md** and **.csv** files.",
      },
      {
        n: "04",
        text: "Add Role Instructions: In the project → Find **Instructions** → **Paste your Role Instructions** (provided by PJX team) → **Save**.",
      },
      {
        n: "05",
        text: "Start a Session: Select **System Prompt** & **Case Hub** files → Click **New Chat** → Use sample prompts from the PJX webpage to begin.",
      },
    ],
  },
  {
    id: "gemini",
    label: "Platform B — Gemini",
    badge: null,
    url: "https://gemini.google.com",
    steps: [
      {
        n: "01",
        text: "Download Files: Download both **System_Prompt.md** and **Case_Hub.csv** from the PJX webpage.",
      },
      {
        n: "02",
        text: "Create a Gem: Go to **gemini.google.com** → Sidebar → **Gems** → **Create New Gem**. Name it: **PJX Case Trainer**",
      },
      {
        n: "03",
        text: "Upload Files: In the **Gem creator** → Click **Add files** → Upload both **.md** and **.csv** files.",
      },
      {
        n: "04",
        text: "Add Instructions: In the **Instructions** field → **Paste your Role Instructions** (provided by PJX team) → **Save**.",
      },
      {
        n: "05",
        text: "Start a Session: Open your **saved Gem** → Use sample prompts from the PJX webpage to begin.",
      },
    ],
  },
  {
    id: "chatgpt",
    label: "Platform C — ChatGPT",
    badge: null,
    url: "https://chatgpt.com",
    steps: [
      {
        n: "01",
        text: "Download Files: Download both **System_Prompt.md** and **Case_Hub.csv** from the PJX webpage.",
      },
      {
        n: "02",
        text: "Create a Project: Go to **chatgpt.com** → Left sidebar → **Projects** → **New Project**. Name it: **PJX Case Trainer**",
      },
      {
        n: "03",
        text: "Upload Files: Inside the project → Click **Add files** → Upload both **.md** and **.csv** files.",
      },
      {
        n: "04",
        text: "Add Instructions: In the **project settings** → Find **Project Instructions** → **Paste your Role Instructions** (provided by PJX team) → **Save**.",
      },
      {
        n: "05",
        text: "Start a Session: Click **New Chat inside the project** → Use sample prompts from the PJX webpage to begin.",
        tip: "For long sessions, **start a fresh chat** for each new case to maintain context quality.",
      },
    ],
  },
];

export default function SetupPage() {
  const [copiedRole, setCopiedRole] = useState(false);

  const handleCopyRole = async () => {
    try {
      await navigator.clipboard.writeText(ROLE_INSTRUCTIONS);
      setCopiedRole(true);
      trackCaseTrainerCopyPrompt();
      setTimeout(() => setCopiedRole(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <main className="min-h-screen bg-pxv-dark text-[#FAFAFA] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-pxv-cyan/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(to right, #0E56FA 1px, transparent 1px), linear-gradient(to bottom, #0E56FA 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Onboarding</p>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">Environment Setup</h2>
          <p className="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            Follow our 5-step blueprint to configure your AI coach and start practicing.
          </p>
        </motion.div>

        {/* Pre-Setup Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <CheckCircle2 className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading">⚠️ Important Disclaimers</h3>
            </div>
            <div className="space-y-4 text-sm text-white/70 leading-relaxed relative z-10">
              <p>
                <strong className="text-white">Coverage Scope:</strong> {`**5 Domains** (Fintech, Edtech, Proptech, Enterprise Operations, Cybersecurity) & **5 Job Roles** (**PM/PO**, **BA/DA**, DS, SWE, AI/ML).`.split(/(\*\*.*?\*\*)/).map((part, i) =>
                  part.startsWith("**") && part.endsWith("**")
                    ? <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>
                    : part
                )}
              </p>
              <p className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium italic">
                Primary Focus: {`**PM/PO** and **BA/DA** roles.`.split(/(\*\*.*?\*\*)/).map((part, i) =>
                  part.startsWith("**") && part.endsWith("**")
                    ? <strong key={i} className="text-yellow-400 font-bold">{part.slice(2, -2)}</strong>
                    : part
                )} Other roles are highly technical with limited case interview applicability.
              </p>

              <div className="pt-2 space-y-3 border-t border-white/5 mt-4">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Quick Start Tips</p>
                {[
                  "Always use **sample prompts** from the PJX webpage to trigger cases correctly.",
                  "**Upload both files** (system prompt + case hub) in one step.",
                  "Paste **Role Instructions** exactly as provided by the PJX team."
                ].map((tip, i) => (
                  <div key={i} className="flex gap-2.5 text-[13px] leading-snug">
                    <span className="text-pxv-cyan font-bold">•</span>
                    <span>
                      {tip.split(/(\*\*.*?\*\*)/).map((part, index) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={index} className="text-white font-medium">{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pxv-cyan/30 transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-pxv-cyan/20 text-pxv-cyan">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading">Required Downloads</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="justify-start h-12 bg-white/5 border-white/10 text-white/80 hover:text-white hover:border-primary/50 group/btn" asChild>
                <a href="/System_Prompt.md" download onClick={() => trackCaseTrainerAssetDownload("system_prompt")}>
                  <Download className="mr-2 w-4 h-4 text-primary group-hover/btn:scale-110 transition-transform" />
                  System_Prompt.md
                  <span className="ml-auto text-[10px] text-white/40 uppercase tracking-tighter">Coach Behavior</span>
                </a>
              </Button>
              <Button variant="outline" className="justify-start h-12 bg-white/5 border-white/10 text-white/80 hover:text-white hover:border-pxv-cyan/50 group/btn" asChild>
                <a href="/Case_Hub.csv" download onClick={() => trackCaseTrainerAssetDownload("case_hub")}>
                  <Download className="mr-2 w-4 h-4 text-pxv-cyan group-hover/btn:scale-110 transition-transform" />
                  Case_Hub.csv
                  <span className="ml-auto text-[10px] text-white/40 uppercase tracking-tighter">Case Database</span>
                </a>
              </Button>
              <Button
                onClick={handleCopyRole}
                variant="outline"
                className={cn(
                  "justify-start h-12 bg-white/5 border-white/10 text-white/80 hover:text-white transition-all group/btn",
                  copiedRole ? "border-green-500/50 text-green-400 bg-green-500/5" : "hover:border-primary/50"
                )}
              >
                {copiedRole ? (
                  <CheckCircle2 className="mr-2 w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="mr-2 w-4 h-4 text-primary group-hover/btn:scale-110 transition-transform" />
                )}
                Role Instructions (provided by PJX team)
                <span className="ml-auto text-[10px] text-white/40 uppercase tracking-tighter">
                  {copiedRole ? "Copied!" : "Click to Copy"}
                </span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Platform columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((platform, pi) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + pi * 0.1, duration: 0.5 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
                <span className="font-heading font-bold text-sm tracking-widest uppercase text-white">{platform.label}</span>
                {platform.badge && (
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full">{platform.badge}</span>
                )}
              </div>

              {/* Steps */}
              <div className="p-5 space-y-5 flex-grow">
                {platform.steps.map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <span className="font-bold text-primary text-sm shrink-0">{step.n}.</span>
                    <div className="space-y-2">
                      <p className="text-sm text-white/80 leading-relaxed">
                        {step.text.split(/(\*\*.*?\*\*)/).map((part, i) =>
                          part.startsWith("**") && part.endsWith("**")
                            ? <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>
                            : part
                        )}
                      </p>
                      {step.tip && (
                        <div className="p-3 bg-pxv-cyan/10 border border-pxv-cyan/20 rounded-lg text-xs text-pxv-cyan font-medium">
                          💡 {step.tip.split(/(\*\*.*?\*\*)/).map((part, i) =>
                            part.startsWith("**") && part.endsWith("**")
                              ? <strong key={i} className="text-pxv-cyan font-bold">{part.slice(2, -2)}</strong>
                              : part
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Open platform link */}
              <div className="px-5 pb-5">
                <Button
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 hover:border-primary/40 rounded-xl h-10 text-sm gap-2 transition-all"
                  asChild
                >
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { trackCaseTrainerOutboundClick(platform.id, platform.url); trackCaseTrainerPlatformSelect(platform.id); }}
                  >
                    Open {platform.label.split("— ")[1]} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
