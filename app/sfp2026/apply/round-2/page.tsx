"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Send,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import SuccessScreen from "./SuccessScreen";
import { RightPanel } from "./RightPanel";
import {
  INITIAL_FORM,
  STEP_LABELS,
  R2_STEP_NAMES,
  isFormClosed,
} from "./data/constants";
import type { Round2FormData } from "./data/types";
import { validateStep } from "./utils/validation";
import { preparePayload } from "./utils/payload";
import { Step1, Step2, Step3, Step4, Step5 } from "./steps";
import {
  trackApplicationFormStart,
  trackApplicationPageView,
  trackFormStepComplete,
  trackFormValidationError,
  trackApplicationSubmitted,
  trackFormSessionRestored,
  trackFormExit,
  trackFormReset,
  setSfpUserProperties,
  type FormPhase as AnalyticsFormPhase,
  type FormExitElement,
} from "@/lib/analytics/sfp2026";

export default function ApplyRound2Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Round2FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLabel, setSubmitLabel] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [closed, setClosed] = useState(false);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  const hasTrackedFormStart = useRef(false);
  const formStartTimeRef = useRef<number>(0);
  const analyticsPhase = "round-2" as unknown as AnalyticsFormPhase;

  useEffect(() => {
    setClosed(isFormClosed());
    const id = setInterval(() => setClosed(isFormClosed()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sfp2026-apply-round-2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) {
          const restored = { ...INITIAL_FORM, ...parsed.formData };
          if (!Array.isArray(restored.portfolioEntries)) {
            const legacy = restored.portfolioLinks as Record<string, string> | undefined;
            if (legacy && typeof legacy === "object") {
              restored.portfolioEntries = Object.entries(legacy)
                .filter(([, v]) => v?.trim())
                .map(([k, v]) => ({ platform: k, url: v }));
            }
            if (!restored.portfolioEntries || restored.portfolioEntries.length === 0) {
              restored.portfolioEntries = [{ platform: "github", url: "" }];
            }
          }
          setFormData(restored);
        }
        if (typeof parsed.step === "number" && parsed.step >= 0 && parsed.step < STEP_LABELS.length) {
          setCurrentStep(parsed.step);
          const hasProgress =
            parsed.step > 0 || (parsed.formData?.email && parsed.formData.email.trim() !== "");
          if (hasProgress) {
            trackFormSessionRestored(parsed.step, analyticsPhase);
          }
        }
      }
    } catch {
      /* ignore */
    }
    setIsHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!closed) {
      setSfpUserProperties({ sfp_form_phase: analyticsPhase });
      trackApplicationPageView(analyticsPhase);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closed]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(
      "sfp2026-apply-round-2",
      JSON.stringify({ formData, step: currentStep })
    );
  }, [formData, currentStep, isHydrated]);

  const trackFormStartOnce = useCallback(() => {
    if (!hasTrackedFormStart.current && !closed) {
      hasTrackedFormStart.current = true;
      formStartTimeRef.current = Date.now();
      trackApplicationFormStart(analyticsPhase);
      setSfpUserProperties({ sfp_application_status: "started" });
    }
  }, [closed, analyticsPhase]);

  const update = useCallback(
    <K extends keyof Round2FormData>(key: K, value: Round2FormData[K]) => {
      trackFormStartOnce();
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [trackFormStartOnce]
  );

  const scrollToTop = useCallback(() => {
    leftPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToStep = (step: number) => {
    setErrors([]);
    setCurrentStep(step);
    scrollToTop();
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      toast.error(stepErrors[0]);
      trackFormValidationError(
        currentStep,
        R2_STEP_NAMES[currentStep] as unknown as Parameters<typeof trackFormValidationError>[1],
        stepErrors.length,
        stepErrors[0]
      );
      return;
    }
    setErrors([]);
    trackFormStepComplete(
      currentStep,
      R2_STEP_NAMES[currentStep] as unknown as Parameters<typeof trackFormStepComplete>[1],
      analyticsPhase
    );
    setCurrentStep((p) => p + 1);
    scrollToTop();
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(currentStep, formData);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      toast.error(stepErrors[0]);
      trackFormValidationError(
        currentStep,
        R2_STEP_NAMES[currentStep] as unknown as Parameters<typeof trackFormValidationError>[1],
        stepErrors.length,
        stepErrors[0]
      );
      return;
    }
    if (isFormClosed()) {
      toast.error("The application period has ended.");
      return;
    }
    setIsSubmitting(true);
    setSubmitLabel("Submitting...");

    const slowTimer = setTimeout(
      () => setSubmitLabel("Almost there — hang tight..."),
      8_000
    );
    const verySlowTimer = setTimeout(
      () => setSubmitLabel("Still processing — please don't close this page"),
      25_000
    );

    try {
      const res = await fetch("/api/apply/round-2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparePayload(formData)),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || (json && !json.success)) {
        const msg = json?.error || "Submission failed. Please try again.";
        throw new Error(msg);
      }

      trackFormStepComplete(
        currentStep,
        R2_STEP_NAMES[currentStep] as unknown as Parameters<typeof trackFormStepComplete>[1],
        analyticsPhase
      );
      const completionSeconds = formStartTimeRef.current
        ? (Date.now() - formStartTimeRef.current) / 1000
        : 0;
      trackApplicationSubmitted(analyticsPhase, completionSeconds);
      setSfpUserProperties({ sfp_application_status: "submitted" });

      setIsSubmitted(true);
      localStorage.removeItem("sfp2026-apply-round-2");
      toast.success("Application submitted successfully!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit. Please try again.";
      toast.error(message);
      console.error("Submit error:", error);
    } finally {
      clearTimeout(slowTimer);
      clearTimeout(verySlowTimer);
      setIsSubmitting(false);
      setSubmitLabel("");
    }
  };

  const handleReset = () => {
    if (window.confirm("Clear all form data? This cannot be undone.")) {
      trackFormReset(currentStep, analyticsPhase);
      setFormData(INITIAL_FORM);
      setCurrentStep(0);
      setErrors([]);
      localStorage.removeItem("sfp2026-apply-round-2");
      toast.success("Form has been reset.");
    }
  };

  if (closed) {
    return (
      <main
        className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #060085 0%, #01001F 25%)" }}
      >
        <img
          src="/images/sfp2026/radiant_top_right.png"
          alt=""
          className="absolute top-0 right-0 w-1/2 max-w-[600px] h-auto pointer-events-none select-none"
        />
        <img
          src="/images/sfp2026/radiant_bottom_left.png"
          alt=""
          className="absolute bottom-0 left-0 w-1/2 max-w-[600px] h-auto pointer-events-none select-none"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
            <Clock className="w-10 h-10 text-white/40" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Applications Closed</h1>
          <p className="text-white/50 text-sm mb-8">
            The Round 2 application period for SFP 2026 has ended. Follow us for
            updates on next steps.
          </p>
          <Link href="/sfp2026">
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8">
              Back to SFP 2026
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  if (isSubmitted) {
    const firstName = formData.fullName.split(" ")[0] || "there";
    return (
      <SuccessScreen firstName={firstName} email={formData.email} />
    );
  }

  return (
    <main className="min-h-screen lg:h-screen lg:overflow-hidden bg-white">
      <div
        ref={leftPanelRef}
        className="w-full lg:w-1/2 min-h-screen lg:h-screen lg:overflow-y-auto scrollbar-hide"
      >
        <div className="max-w-2xl mx-auto px-6 lg:px-12 py-10 lg:py-12">
          <Link
            href="/sfp2026"
            onClick={() => trackFormExit("logo", currentStep, analyticsPhase)}
            className="inline-block mb-8"
          >
            <img
              src="/preview_icon.png"
              alt="Project X Vietnam"
              className="h-10"
            />
          </Link>

          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => i < currentStep && goToStep(i)}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    i < currentStep
                      ? "bg-primary text-white cursor-pointer"
                      : i === currentStep
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-400"
                  )}
                >
                  {i < currentStep ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    i + 1
                  )}
                </button>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={cn(
                      "w-6 lg:w-8 h-0.5 mx-1",
                      i < currentStep ? "bg-primary" : "bg-slate-100"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {currentStep === 0 && <Step1 data={formData} update={update} />}
              {currentStep === 1 && <Step2 data={formData} update={update} />}
              {currentStep === 2 && <Step3 data={formData} update={update} />}
              {currentStep === 3 && <Step4 data={formData} update={update} />}
              {currentStep === 4 && <Step5 data={formData} update={update} />}
            </motion.div>
          </AnimatePresence>

          {errors.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <ul className="space-y-1">
                {errors.map((err, i) => (
                  <li key={i} className="text-sm text-red-600">
                    • {err}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
            <Button
              variant="ghost"
              onClick={() => goToStep(currentStep - 1)}
              disabled={currentStep === 0}
              className={cn(
                "text-slate-500",
                currentStep === 0 && "opacity-0 pointer-events-none"
              )}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            {currentStep < STEP_LABELS.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6"
              >
                Continue <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {submitLabel}
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pb-4">
            <p className="text-xs text-slate-400">
              By submitting, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block fixed top-0 right-0 w-1/2 h-screen overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #060085 0%, #01001F 25%)" }}
      >
        <img
          src="/images/sfp2026/radiant_top_right.png"
          alt=""
          className="absolute top-0 right-0 w-3/4 h-auto pointer-events-none select-none"
        />
        <img
          src="/images/sfp2026/radiant_bottom_left.png"
          alt=""
          className="absolute bottom-0 left-0 w-3/4 h-auto pointer-events-none select-none"
        />
        <RightPanel
          currentStep={currentStep}
          data={formData}
          onExit={(el) => trackFormExit(el, currentStep, analyticsPhase)}
        />
      </div>
    </main>
  );
}
