"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { R1_PASSED_EMAILS } from "../r1-passed-emails";
import {
  FormField,
  FormInput,
  OptionGrid,
  PortfolioLinksField,
} from "../components";
import type { StepProps } from "./types";

export function Step1({ data, update }: StepProps) {
  const emailValid =
    data.email.trim() &&
    R1_PASSED_EMAILS.has(data.email.trim().toLowerCase());
  const emailTouched = data.email.trim().length > 0;
  return (
    <div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
        Step 1
      </span>
      <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">
        Verification & General Information
      </h1>
      <p className="text-slate-500 text-sm mb-6">
        Verify your identity and update your general information.
      </p>
      <div className="space-y-5">
        <FormField label="Full Name" required={false}>
          <FormInput
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="E.g. Nguyen Van A"
          />
        </FormField>

        <FormField
          label="Email"
          required
          description="This email must match your Round 1 registration for data linking."
        >
          <FormInput
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="E.g. projectxvietnam@gmail.com"
            className={cn(
              emailTouched && !emailValid && "border-red-300 focus:ring-red-200 focus:border-red-400"
            )}
          />
          {emailTouched && !emailValid && (
            <p className="text-xs text-red-500 mt-1">
              This email was not found in Round 1 records. Please use the same
              email you registered with in Round 1.
            </p>
          )}
          {emailValid && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <Check className="w-3 h-3" /> Email verified.
            </p>
          )}
        </FormField>

        <FormField
          label="Have you updated your CV/portfolio since Round 1?"
          required
        >
          <OptionGrid
            options={["Yes", "No"]}
            selected={data.cvUpdated ? [data.cvUpdated] : []}
            onChange={(v) => update("cvUpdated", v[0] || "")}
            multiple={false}
            columns={2}
          />
        </FormField>

        <FormField
          label="Upload updated CV"
          required
          description="Google Drive link with view-only access. Make sure you have open permission for anyone with the link."
        >
          <FormInput
            value={data.cvLink}
            onChange={(e) => update("cvLink", e.target.value)}
            placeholder="https://drive.google.com/..."
          />
        </FormField>

        <FormField
          label="Portfolio Links"
          description="Optional. Click the icon to change platform type."
        >
          <PortfolioLinksField
            entries={data.portfolioEntries}
            onChange={(v) => update("portfolioEntries", v)}
          />
        </FormField>
      </div>
    </div>
  );
}
