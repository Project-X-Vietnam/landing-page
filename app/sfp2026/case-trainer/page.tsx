"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CaseTrainerNavbar from "./CaseTrainerNavbar";
import Hero from "./Hero";
import WhatIsThis from "./WhatIsThis";
import HowItWorks from "./HowItWorks";
import SetupForm from "./SetupForm";
import SetupGuide from "./SetupGuide";
import SamplePrompts from "./SamplePrompts";
import StepProgress from "./StepProgress";
import type { Platform } from "./types";

const HEADER_VARIANTS = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

const FADE_VARIANTS = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};


const TITLE_CLASS = "text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white";

export default function CaseTrainerPage() {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [filesReady, setFilesReady] = useState(false);

  const goTo = (target: number, direct = false) => {
    setStep(target);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const next = () => goTo(step + 1, false);
  const prev = () => goTo(Math.max(1, step - 1), false);

  const restartWizard = () => {
    setSelectedPlatforms([]);
    setFilesReady(false);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Hero key="step-1" onNext={next} />;
      case 2:
        return <WhatIsThis key="step-2" hideTitle onNext={next} onBack={prev} />;
      case 3:
        return <HowItWorks key="step-3" hideTitle onNext={next} onBack={prev} />;
      case 4:
        return (
          <SetupForm
            key="step-4"
            onBack={prev}
            onSubmit={(platforms) => {
              setSelectedPlatforms(platforms);
              setFilesReady(true);
              next();
            }}
          />
        );
      case 5:
        return (
          <SetupGuide
            key="step-5"
            hideTitle
            onBack={prev}
            filesReadyFromFlow={filesReady}
            selectedPlatforms={selectedPlatforms}
            onNext={next}
          />
        );
      case 6:
        return <SamplePrompts key="step-6" hideTitle onBack={prev} onRestart={restartWizard} />;
      default:
        return <Hero key="step-1" onNext={next} />;
    }
  };

  const renderHeader = () => {
    switch (step) {
      case 1:
      case 4:
        return null;
      case 2:
        return (
          <div className="mx-auto max-w-5xl pt-2 text-center sm:pt-3">
            <h2 className={TITLE_CLASS}>Stop memorizing. Start thinking.</h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[1.125rem] font-normal leading-[1.65] text-[rgba(255,255,255,0.6)]">
              Project X Case Trainer is an AI coach that puts you through real
              interview scenarios — and trains your thinking, not your memory.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="mx-auto max-w-[960px] pt-2 text-center sm:pt-3">
            <h2 className={TITLE_CLASS}>Your thinking, coached step by step.</h2>
          </div>
        );
      case 5:
        return (
          <div className="mx-auto max-w-5xl pt-2 text-center sm:pt-3">
            <h2 className={TITLE_CLASS}>Setup Guide</h2>
            <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.7] text-white/55">
              Coverage scope: Fintech, Edtech, Proptech, Enterprise Operations
              (B2B SaaS), Cybersecurity.
              <br />
              Roles: PM/PO, BA/DA, DS, SWE, AI/ML. Primary focus: PM/PO and BA/DA.
            </p>
          </div>
        );
      case 6:
        return (
          <div className="mx-auto max-w-5xl pt-2 text-center sm:pt-3">
            <h2 className={TITLE_CLASS}>Sample Prompts</h2>
          </div>
        );
      default:
        return null;
    }
  };

  const hasSeparatedHeader = step !== 1 && step !== 4;

  return (
    <div
      className={`relative h-dvh overflow-x-hidden bg-primary/5 text-white ${
        step === 6 ? "overflow-y-hidden" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(14,86,250,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(14,86,250,0.10)_1px,transparent_1px),linear-gradient(180deg,rgba(14,86,250,0.10),rgba(1,0,31,1))] bg-[size:56px_56px,56px_56px,100%_100%] opacity-100"
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="lumina-dot absolute right-[10%] top-[20%] h-[10px] w-[10px] rounded-full bg-[#00cfff] opacity-70" />
        <div className="lumina-ring absolute bottom-[8%] right-[3%] h-[300px] w-[300px] rounded-full" />
        <div className="lumina-dot absolute bottom-[22%] left-[5%] h-[12px] w-[12px] rounded-full bg-[rgba(0,150,255,0.6)]" />
      </div>

      <CaseTrainerNavbar currentStep={step} onNavigate={goTo} />

      <div className="relative z-10 mx-auto mt-20 flex w-full max-w-[960px] justify-center px-5 sm:px-6 lg:px-8">
        <StepProgress currentStep={step} onNavigate={goTo} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`header-${step}`}
          variants={HEADER_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 px-5 sm:px-6 lg:px-8"
        >
          {renderHeader()}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`fade-${step}`}
          variants={FADE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 ${hasSeparatedHeader ? "-mt-8" : ""}`}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}