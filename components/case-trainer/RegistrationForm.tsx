"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { trackCaseTrainerAssetDownload } from "@/lib/analytics/case-trainer";

interface RegistrationFormProps {
  onBack: () => void;
}

type FormValues = {
  fullName: string;
  email: string;
  role: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type FormStatus = "form" | "loading" | "success";

const roleOptions = [
  "PM / PO — Product Manager / Product Owner",
  "BA / DA — Business Analyst / Data Analyst",
  "DS — Data Scientist",
  "SWE — Software Engineer",
  "AI / ML — AI or Machine Learning Engineer",
];

const initialValues: FormValues = {
  fullName: "",
  email: "",
  role: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createDownload(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function RegistrationForm({ onBack }: RegistrationFormProps) {
  const [status, setStatus] = useState<FormStatus>("form");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    fullName: false,
    email: false,
    role: false,
  });

  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.role) {
    errors.role = "Please choose the role you're practicing for.";
  }

  const hasErrors = Object.keys(errors).length > 0;

  const markTouched = (field: keyof FormValues) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const submitRegistration = async () => {
    const payload = {
      name: values.fullName.trim(),
      email: values.email.trim(),
      role: values.role,
      submittedAt: new Date().toISOString(),
    };

    console.log("PJX Case Trainer registration", payload);

    try {
      // TODO: Replace with actual form submission endpoint (e.g. Airtable, Notion API, or Formsubmit)
      await fetch("https://formsubmit.co/ajax/pjx@example.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Registration submission failed", error);
    }
  };

  const triggerDownloads = () => {
    createDownload(
      "System_Prompt.md",
      "# PJX Case Trainer — System Prompt\n\n[Full system prompt content provided by PJX team]",
      "text/markdown;charset=utf-8",
    );
    trackCaseTrainerAssetDownload("system_prompt");

    createDownload(
      "Case_Hub.csv",
      "case_id,domain,role,difficulty,title\n[Full case hub content provided by PJX team]",
      "text/csv;charset=utf-8",
    );
    trackCaseTrainerAssetDownload("case_hub");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({
      fullName: true,
      email: true,
      role: true,
    });

    if (hasErrors) {
      return;
    }

    setStatus("loading");

    await submitRegistration();

    window.setTimeout(() => {
      triggerDownloads();
      setStatus("success");
    }, 1500);
  };

  const showError = (field: keyof FormValues) => touched[field] && errors[field];

  return (
    <section id="get-files-section" className="relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(23,202,250,0.16),transparent_0,transparent_28%),radial-gradient(circle_at_80%_30%,rgba(14,86,250,0.22),transparent_0,transparent_30%)]" />

      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-6 z-20 inline-flex items-center gap-2 font-md3-mono text-xs font-normal uppercase leading-[1.4] tracking-[0.17em] text-[rgba(255,255,255,0.5)] transition hover:text-[#8BEAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17CAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01001F] sm:left-6 lg:left-8"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="lumina-glass relative z-10 w-full max-w-[520px] overflow-hidden rounded-[30px] p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-[#17CAFA]/10 blur-3xl" />

        <AnimatePresence mode="wait">
          {status === "form" ? (
            <motion.div
              key="registration-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p className="lumina-gradient-text font-md3-mono text-[0.75rem] font-normal uppercase leading-[1.4] tracking-[0.17em]">
                Step 1 of 1
              </p>
              <h1 className="mt-4 font-md3-serif text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
                Almost there — tell us who you are.
              </h1>
              <p className="mt-4 text-[0.9375rem] font-normal leading-[1.7] tracking-[0.01em] text-[rgba(255,255,255,0.65)]">
                We use this to track which roles are getting the most practice
                and improve the Case Hub over time. No spam, ever.
              </p>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-[0.875rem] font-normal leading-[1.4] text-[rgba(255,255,255,0.8)]"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="e.g. Nguyen Minh Anh"
                    value={values.fullName}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        fullName: event.target.value,
                      }))
                    }
                    onBlur={() => markTouched("fullName")}
                    aria-invalid={Boolean(showError("fullName"))}
                    className={cn(
                      "lumina-glass h-12 text-[0.9375rem] font-normal text-white placeholder:text-[rgba(255,255,255,0.4)] focus-visible:ring-[#17CAFA]/50",
                      showError("fullName") && "border-red-400 focus-visible:ring-red-400/40",
                    )}
                  />
                  {showError("fullName") ? (
                    <p className="text-sm text-red-300">{errors.fullName}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-[0.875rem] font-normal leading-[1.4] text-[rgba(255,255,255,0.8)]"
                  >
                    Work or School Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. minhanh@university.edu.vn"
                    value={values.email}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    onBlur={() => markTouched("email")}
                    aria-invalid={Boolean(showError("email"))}
                    className={cn(
                      "lumina-glass h-12 text-[0.9375rem] font-normal text-white placeholder:text-[rgba(255,255,255,0.4)] focus-visible:ring-[#17CAFA]/50",
                      showError("email") && "border-red-400 focus-visible:ring-red-400/40",
                    )}
                  />
                  {showError("email") ? (
                    <p className="text-sm text-red-300">{errors.email}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label className="text-[0.875rem] font-normal leading-[1.4] text-[rgba(255,255,255,0.8)]">
                    Target Role
                  </Label>
                  <Select
                    value={values.role}
                    onValueChange={(value) => {
                      setValues((current) => ({ ...current, role: value }));
                      setTouched((current) => ({ ...current, role: true }));
                    }}
                  >
                    <SelectTrigger
                      aria-invalid={Boolean(showError("role"))}
                      className={cn(
                        "lumina-glass h-12 text-[0.9375rem] font-normal text-white",
                        showError("role") && "border-red-400",
                      )}
                    >
                      <SelectValue placeholder="Select the role you're practicing for" />
                    </SelectTrigger>
                    <SelectContent className="lumina-glass bg-[#08162E]/90 text-[0.9375rem] font-normal text-white">
                      {roleOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {showError("role") ? (
                    <p className="text-sm text-red-300">{errors.role}</p>
                  ) : null}
                </div>

                <Button
                  type="submit"
                  className="lumina-primary-glow mt-2 h-auto w-full rounded-md bg-[#17CAFA] px-6 py-4 text-[0.9375rem] font-semibold leading-[1.4] text-white hover:bg-[#6BE0FF]"
                >
                  Download Files &amp; Get Started ↓
                </Button>
              </form>
            </motion.div>
          ) : null}

          {status === "loading" ? (
            <motion.div
              key="registration-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[420px] flex-col items-center justify-center text-center"
            >
              <div className="h-16 w-16 animate-spin rounded-full border-[3px] border-white/10 border-t-[#17CAFA]" />
              <p className="lumina-gradient-text mt-8 font-md3-mono text-xs font-normal uppercase leading-[1.4] tracking-[0.17em]">
                Preparing your files…
              </p>
            </motion.div>
          ) : null}

          {status === "success" ? (
            <motion.div
              key="registration-success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex min-h-[420px] flex-col items-center justify-center text-center"
            >
              <CheckCircle2 className="h-16 w-16 text-[#17CAFA]" />
              <h2 className="mt-6 font-md3-serif text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
                You&apos;re set up. Start training.
              </h2>
              <p className="mt-4 max-w-md text-[0.9375rem] font-normal leading-[1.7] tracking-[0.01em] text-[rgba(255,255,255,0.65)]">
                Your files are downloading now. Follow the setup guide on the
                previous page to configure your AI platform.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="lumina-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-normal leading-[1.4] text-[rgba(255,255,255,0.4)]">
                  <Download className="h-4 w-4" />
                  ✓ System_Prompt.md
                </span>
                <span className="lumina-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-normal leading-[1.4] text-[rgba(255,255,255,0.4)]">
                  <Download className="h-4 w-4" />
                  ✓ Case_Hub.csv
                </span>
              </div>

              <button
                type="button"
                onClick={onBack}
                className="mt-10 font-md3-mono text-[0.8125rem] font-normal uppercase leading-[1.4] tracking-[0.17em] text-[rgba(255,255,255,0.4)] transition hover:text-[#8BEAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17CAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01001F]"
              >
                ← Back to Setup Guide
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
