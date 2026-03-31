"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCircle2 } from "lucide-react";
import { trackCaseTrainerCopyPrompt } from "@/lib/analytics/case-trainer";

const prompts = [
  {
    tag: "DEFINE",
    text: '"Start a new case focusing on market entry in the EV sector. Focus on competitive benchmarking."',
  },
  {
    tag: "DECOMPOSE",
    text: '"How should I structure a profitability case for an airline with high fixed costs?"',
  },
  {
    tag: "HYPOTHESIZE",
    text: '"Is it likely that cannibalization is the root cause of the decline in flagship sales?"',
  },
  {
    tag: "ANALYZE",
    text: '"Can you provide the raw dataset for the Q3 logistics overhead per unit?"',
  },
  {
    tag: "RECOMMEND",
    text: '"Synthesize the findings into a 2-minute elevator pitch for the CEO."',
  },
  {
    tag: "FEEDBACK",
    text: '"Audit my previous response. Where did I fail to maintain MECE principles?"',
  },
  {
    tag: "DRILL",
    text: '"Give me a mental math drill related to market sizing in the semiconductor industry."',
  },
  {
    tag: "START SESSION",
    text: '"Give me a Product case."',
  },
];

export default function SamplePromptsPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text.replace(/^"|"$/g, ""));
      setCopiedIdx(idx);
      trackCaseTrainerCopyPrompt();
      setTimeout(() => setCopiedIdx(null), 2000);
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Reference</p>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">Sample Prompts</h2>
          <p className="text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
            Use these prompts to navigate the coaching session. Click any card to copy the prompt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {prompts.map((prompt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              onClick={() => handleCopy(prompt.text, i)}
              className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/40 hover:bg-white/8 cursor-pointer transition-all"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-pxv-cyan mb-3 block">{prompt.tag}</span>
                <p className="font-mono text-xs text-white/70 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/10">
                  {prompt.text}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                {copiedIdx === i ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-white/30 group-hover:text-primary transition-colors" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
