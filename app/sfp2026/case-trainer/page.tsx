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

export type Platform = "claude" | "chatgpt" | "gemini";

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const TRANSITION = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function CaseTrainerPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [filesReady, setFilesReady] = useState(false);
  const [isDirectNav, setIsDirectNav] = useState(false);

  const goTo = (target: number, direct = false) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
    setIsDirectNav(direct);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const next = () => goTo(step + 1, false);
  const prev = () => goTo(Math.max(1, step - 1), false);
  const restartWizard = () => {
    setDirection(-1);
    setSelectedPlatforms([]);
    setFilesReady(false);
    setIsDirectNav(false);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStep = () => {
    const commonProps = { hideStepLabel: isDirectNav };

    switch (step) {
      case 1:
        return <Hero key="step-1" onNext={next} currentStep={step} onNavigate={goTo} {...commonProps} />;
      case 2:
        return <WhatIsThis key="step-2" onNext={next} onBack={prev} currentStep={step} onNavigate={goTo} {...commonProps} />;
      case 3:
        return <HowItWorks key="step-3" onNext={next} onBack={prev} currentStep={step} onNavigate={goTo} {...commonProps} />;
      case 4:
        return (
          <SetupForm
            key="step-4"
            {...commonProps}
            onBack={prev}
            currentStep={step}
            onNavigate={goTo}
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
            {...commonProps}
            onBack={prev}
            currentStep={step}
            onNavigate={goTo}
            filesReadyFromFlow={filesReady}
            selectedPlatforms={selectedPlatforms}
            onNext={next}
          />
        );
      case 6:
        return <SamplePrompts key="step-6" {...commonProps} onBack={prev} currentStep={step} onNavigate={goTo} onRestart={restartWizard} />;
      default:
        return <Hero key="step-1" onNext={next} currentStep={step} onNavigate={goTo} {...commonProps} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#01001F]">
      {/* Background grid */}
      <div id="bg-grid" className="pointer-events-none fixed inset-0 z-0" />

      {/* Ambient orbs */}
      <div className="lumina-orb lumina-orb--1" />
      <div className="lumina-orb lumina-orb--2" />
      <div className="lumina-orb lumina-orb--3" />

      {/* Sticky Navbar */}
      <CaseTrainerNavbar currentStep={step} onNavigate={goTo} />

      {/* Step Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={SLIDE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANSITION}
          className="relative z-10"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
