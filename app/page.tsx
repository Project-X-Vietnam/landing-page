"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Hero from "@/components/case-trainer/Hero";
import RegistrationForm from "@/components/case-trainer/RegistrationForm";
import SamplePrompts from "@/components/case-trainer/SamplePrompts";
import SetupGuide from "@/components/case-trainer/SetupGuide";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { trackCaseTrainerBottomClick, trackCaseTrainerScrollDepth } from "@/lib/analytics/case-trainer";

const quickStartTips = [
  {
    number: "01",
    title: "Use the sample prompts.",
    description:
      "Skip this and the AI won't know how to start. Always copy from the prompts section below.",
  },
  {
    number: "02",
    title: "Upload both files together.",
    description:
      "System Prompt and Case Hub must both be present. One file alone won't work.",
  },
  {
    number: "03",
    title: "Paste Role Instructions exactly.",
    description:
      "Copy-paste only. No edits, no paraphrasing. Altered instructions break the coaching behavior.",
  },
];

type View = "landing" | "form";

export default function HomePage() {
  const [view, setView] = useState<View>("landing");
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [shouldScrollToSetup, setShouldScrollToSetup] = useState(false);
  const setupRef = useRef<HTMLElement | null>(null);
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const onScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const percent = Math.round((window.scrollY / scrollableHeight) * 100);
      const checkpoints: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];

      checkpoints.forEach((checkpoint) => {
        if (percent >= checkpoint && !trackedDepths.current.has(checkpoint)) {
          trackedDepths.current.add(checkpoint);
          trackCaseTrainerScrollDepth(checkpoint);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    if (view !== "landing") {
      setIsNavbarScrolled(false);
      return;
    }

    const heroSection = document.getElementById("hero-section");

    if (!heroSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavbarScrolled(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    if (view !== "landing" || !shouldScrollToSetup) {
      return;
    }

    let secondFrame = 0;

    const scrollToSetup = () => {
      if (setupRef.current) {
        setupRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        setShouldScrollToSetup(false);
      }
    };

    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(scrollToSetup);
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame) {
        cancelAnimationFrame(secondFrame);
      }
    };
  }, [shouldScrollToSetup, view]);

  const openForm = () => {
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const returnToSetup = () => {
    setShouldScrollToSetup(true);
    setView("landing");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <div className="lumina-orb lumina-orb--1" />
      <div className="lumina-orb lumina-orb--2" />
      <div className="lumina-orb lumina-orb--3" />
      {view === "landing" ? (
        <div id="navbar" className={isNavbarScrolled ? "scrolled" : undefined}>
          <div className="flex items-center">
            <img
              src="/preview_icon.png"
              alt="Project X Vietnam"
              className="h-9 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-6">
            <nav id="navbar-links">
              <a href="#setup-guide">Setup Guide</a>
              <a href="#sample-prompts">Sample Prompts</a>
            </nav>
            <button
              id="navbar-cta"
              type="button"
              onClick={openForm}
            >
              Get the Files →
            </button>
          </div>
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <PageTransition>
              <Hero onGetFiles={openForm} />

              <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-5 pb-24 sm:px-6 lg:px-8">
                <section ref={setupRef} id="setup-guide" className="reveal">
                  <SetupGuide />
                </section>

                <section className="reveal space-y-8">
                  <div className="max-w-3xl">
                    <p className="lumina-gradient-text font-md3-mono text-[0.6875rem] font-normal uppercase leading-[1.4] tracking-[0.15em]">
                      QUICK START TIPS
                    </p>
                    <h2 className="lumina-headline-inline mt-4 font-md3-serif text-white">
                      Before you start —{" "}
                      <span className="lumina-gradient-text">read this.</span>
                    </h2>
                  </div>

                  <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                    <div className="grid grid-cols-1 gap-4 pb-2 md:grid-cols-3">
                      {quickStartTips.map((tip, index) => (
                        <motion.article
                          key={tip.number}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                          className="lumina-glass rounded-2xl p-5"
                        >
                          <p className="lumina-gradient-text font-md3-mono text-[0.75rem] font-normal uppercase leading-[1.4] tracking-[0.17em]">
                            {tip.number}
                          </p>
                          <h3 className="mt-4 text-lg font-semibold leading-[1.2] text-white">
                            {tip.title}
                          </h3>
                          <p className="mt-3 text-sm font-normal leading-[1.7] tracking-[0.01em] text-[rgba(255,255,255,0.65)]">
                            {tip.description}
                          </p>
                        </motion.article>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-[10px] rounded-[10px] border border-[rgba(23,202,250,0.15)] bg-[rgba(23,202,250,0.05)] px-5 py-[14px]">
                    <span className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-[#17CAFA] shadow-[0_0_8px_rgba(23,202,250,0.6)]" />
                    <p className="text-[0.8125rem] font-normal leading-[1.6] tracking-[0.01em] text-[rgba(255,255,255,0.5)]">
                      Claude gives the best results for long sessions. If
                      you&apos;re practicing DS, SWE, or AI/ML roles, expect
                      cases to be highly technical.
                    </p>
                  </div>
                </section>

                <SamplePrompts />

                <section className="reveal final-cta-section">
                  <div className="final-cta-content">
                    <p className="lumina-gradient-text font-md3-mono text-[0.75rem] font-normal uppercase leading-[1.4] tracking-[0.2em]">
                      FINAL STEP
                    </p>
                    <h2 className="mt-5 font-md3-serif text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                      Ready to start{" "}
                      <span className="lumina-gradient-text">training</span>?
                    </h2>
                    <p className="mx-auto mb-10 mt-5 max-w-[480px] text-[1.0625rem] font-normal leading-[1.65] tracking-[0.01em] text-[rgba(255,255,255,0.6)]">
                      Takes 3 minutes to set up. Your first case debrief will
                      be uncomfortable. That&apos;s the point.
                    </p>
                    <Button
                      type="button"
                      onClick={() => {
                        trackCaseTrainerBottomClick();
                        openForm();
                      }}
                      className="final-cta-btn h-auto text-white"
                    >
                      Get the Files →
                    </Button>
                  </div>
                </section>
              </div>
            </PageTransition>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <RegistrationForm onBack={returnToSetup} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
