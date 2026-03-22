"use client";

import {
  FormField,
  OptionGrid,
} from "../components";
import {
  TECH_INDUSTRIES,
  DURATION_OPTIONS,
  START_DATE_OPTIONS,
} from "../data/options";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
          description="What is the earliest month you can start?"
        >
          <Select
            value={data.startDate}
            onValueChange={(v) => update("startDate", v)}
          >
            <SelectTrigger className="w-full h-10 rounded-lg border-slate-200">
              <SelectValue placeholder="Select month..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {START_DATE_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      </div>
    </div>
  );
}
