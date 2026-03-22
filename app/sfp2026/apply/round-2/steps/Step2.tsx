"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FormField,
  FormInput,
  OptionGrid,
  SearchableDropdown,
} from "../components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UNIVERSITY_GROUPS,
  GRADUATION_YEAR_OPTIONS,
  INTERNSHIP_EXPERIENCE_OPTIONS,
  LOCATION_OPTIONS,
  RELOCATION_OPTIONS,
} from "../data/options";
import type { StepProps } from "./types";

export function Step2({ data, update }: StepProps) {
  return (
    <div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
        Step 2
      </span>
      <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">
        General Profile & Experience
      </h1>
      <p className="text-slate-500 text-sm mb-6">
        Tell us about your academic background and preferences.
      </p>
      <div className="space-y-5">
        <FormField
          label="University"
          required
          description='Select your university. If not listed: select "Others" and enter your school name.'
        >
          <div className="space-y-2">
            <SearchableDropdown
              value={data.university}
              onChange={(v) => update("university", v)}
              groups={UNIVERSITY_GROUPS}
              placeholder="Search and select your university..."
            />
            {data.university === "Others" && (
              <FormInput
                value={data.universityOther}
                onChange={(e) => update("universityOther", e.target.value)}
                placeholder="Enter your university name..."
                className="mt-2"
              />
            )}
          </div>
        </FormField>

        <FormField label="Graduation Year" required description="Expected graduation year.">
          <Select
            value={data.graduationYear}
            onValueChange={(v) => update("graduationYear", v)}
          >
            <SelectTrigger className="w-full h-10 rounded-lg border-slate-200">
              <SelectValue placeholder="Select year..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {GRADUATION_YEAR_OPTIONS.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          label="Major(s)"
          required
          description="If double major, separate with comma."
        >
          <FormInput
            value={data.majors}
            onChange={(e) => update("majors", e.target.value)}
            placeholder="E.g. Computer Science, Business Administration"
          />
        </FormField>

        <FormField
          label="Cumulative GPA"
          required
          description="On a 4.0 scale. Convert if your university uses a different system."
        >
          <FormInput
            value={data.gpa}
            onChange={(e) => update("gpa", e.target.value)}
            placeholder="E.g. 3.5"
          />
        </FormField>

        <FormField
          label="Have you previously completed any internships or work experience?"
          required
        >
          <OptionGrid
            options={INTERNSHIP_EXPERIENCE_OPTIONS}
            selected={data.internshipExperience ? [data.internshipExperience] : []}
            onChange={(v) => update("internshipExperience", v[0] || "")}
            multiple={false}
            columns={2}
          />
        </FormField>

        <FormField label="Your preferred location for internships" required>
          <OptionGrid
            options={LOCATION_OPTIONS}
            selected={data.preferredLocation ? [data.preferredLocation] : []}
            onChange={(v) => update("preferredLocation", v[0] || "")}
            multiple={false}
            columns={2}
          />
        </FormField>

        <AnimatePresence>
          {data.preferredLocation === "Hanoi" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FormField
                label="If Hanoi, are you willing to relocate to HCMC for internship this summer?"
                required
              >
                <OptionGrid
                  options={RELOCATION_OPTIONS}
                  selected={data.willingToRelocate ? [data.willingToRelocate] : []}
                  onChange={(v) => update("willingToRelocate", v[0] || "")}
                  multiple={false}
                  columns={2}
                />
              </FormField>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
