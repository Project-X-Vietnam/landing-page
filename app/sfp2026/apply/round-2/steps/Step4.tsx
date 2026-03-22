"use client";

import {
  FormField,
  OptionGrid,
  DatePickerField,
} from "../components";
import {
  TECH_INDUSTRIES,
  DURATION_OPTIONS,
  WORK_ARRANGEMENT_OPTIONS,
} from "../data/options";
import type { StepProps } from "./types";

export function Step4({ data, update }: StepProps) {
  return (
    <div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
        Step 4
      </span>
      <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">
        Industry & Availability
      </h1>
      <p className="text-slate-500 text-sm mb-6">
        Help us match you with the right opportunities.
      </p>
      <div className="space-y-6">
        <FormField
          label="Which tech industries are you interested in?"
          required
          description="Select all that apply."
        >
          <OptionGrid
            options={TECH_INDUSTRIES}
            selected={data.techIndustries}
            onChange={(v) => update("techIndustries", v)}
            columns={2}
          />
        </FormField>

        <FormField
          label="Earliest internship start date"
          required
          description="What is the earliest date you can start an internship?"
        >
          <DatePickerField
            value={data.startDate}
            onChange={(v) => update("startDate", v)}
            placeholder="Select a date..."
          />
        </FormField>

        <FormField label="Preferred internship duration" required>
          <OptionGrid
            options={DURATION_OPTIONS}
            selected={data.preferredDuration ? [data.preferredDuration] : []}
            onChange={(v) => update("preferredDuration", v[0] || "")}
            multiple={false}
            columns={2}
          />
        </FormField>

        <FormField
          label="Work arrangement preference"
          required
          description="Select all that apply."
        >
          <OptionGrid
            options={WORK_ARRANGEMENT_OPTIONS}
            selected={data.workArrangement}
            onChange={(v) => update("workArrangement", v)}
            columns={1}
          />
        </FormField>
      </div>
    </div>
  );
}
