"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I access the trainer for the first time?",
    a: "Follow the Setup guide. Download the System Prompt, create a project in your preferred AI platform (Claude, Gemini, or ChatGPT), paste the prompt into the Project Instructions field, and start a new chat.",
  },
  {
    q: "Which AI model provides the most realistic feedback?",
    a: "Claude is the recommended platform because its Projects feature keeps your coach instructions persistent across all sessions. Once configured, you never repeat the setup.",
  },
  {
    q: "Can I use this for real interview preparation?",
    a: "Yes. The cases are designed around real tech interview frameworks — product thinking, growth strategy, data analysis, business strategy, technical design, and behavioral questions.",
  },
  {
    q: "How does the scoring work?",
    a: "Each session is evaluated across 5 dimensions: Problem Framing (25%), Structure (25%), Logic & Evidence (20%), Insight (15%), and Communication (15%). Each is scored 1–4, giving a total score out of 10.",
  },
  {
    q: "Does the trainer track my scores over time?",
    a: "Scoring is currently session-based. We recommend saving your debrief notes after each session and tracking your lowest dimension to focus your next practice.",
  },
  {
    q: "What should I do if the AI doesn't follow the coaching flow?",
    a: "Start a new chat inside your project. Never continue a previous session with a new case — the coach tracks your step progress within each session. Re-pasting or re-uploading the setup files should not be necessary.",
  },
];

export default function FAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-pxv-dark text-[#FAFAFA] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-pxv-cyan/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(to right, #0E56FA 1px, transparent 1px), linear-gradient(to bottom, #0E56FA 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 space-y-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Support</p>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-white/60 font-medium leading-relaxed">
            Everything you need to know to get started and make the most of your sessions.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <span className="font-semibold text-sm text-white group-hover:text-primary transition-colors pr-4">
                  {faq.q}
                </span>
                <ChevronRight
                  className={cn(
                    "w-4 h-4 shrink-0 text-white/40 transition-transform duration-300",
                    openIdx === i ? "rotate-90 text-primary" : ""
                  )}
                />
              </button>

              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-white/10">
                      <p className="text-sm text-white/70 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
