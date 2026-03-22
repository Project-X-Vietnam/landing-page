"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FormField,
  OptionGrid,
  GroupedOptionGrid,
  ProficiencyGrid,
} from "../components";
import {
  CAREER_TRACK_OPTIONS,
  TECH_DOMAINS,
  PROGRAMMING_LANGUAGES,
  FRAMEWORKS_GROUPS,
  CROSS_TRACK_ENG_OPTIONS,
  CROSS_TRACK_BIZ_OPTIONS,
} from "../data/options";
import { BizTrackSection } from "./BizTrackSection";
import type { StepProps } from "./types";

export function Step3({ data, update }: StepProps) {
  const isEng = data.careerTrack === "Engineering / Technical Track";
  const isBiz = data.careerTrack === "Product / Business Track";

  return (
    <div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
        Step 3
      </span>
      <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">
        Career Track & Skills
      </h1>
      <p className="text-slate-500 text-sm mb-6">
        Select your career track to see relevant skills questions.
      </p>
      <div className="space-y-6">
        <FormField
          label="Which career track are you pursuing for this internship?"
          required
          description="This determines which questions you'll see next."
        >
          <OptionGrid
            options={CAREER_TRACK_OPTIONS}
            selected={data.careerTrack ? [data.careerTrack] : []}
            onChange={(v) => update("careerTrack", v[0] || "")}
            multiple={false}
            columns={1}
          />
        </FormField>

        <AnimatePresence mode="wait">
          {isEng && (
            <motion.div
              key="engineering"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="space-y-6">
                <div className="border-t border-slate-200 pt-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    Engineering / Technical Track
                  </h2>
                </div>

                <FormField
                  label="Technical domains/specializations"
                  required
                  description="Select all areas you have experience or strong interest in."
                >
                  <OptionGrid
                    options={TECH_DOMAINS}
                    selected={data.techDomains}
                    onChange={(v) => update("techDomains", v)}
                    columns={1}
                    hasOther
                    otherValue={data.techDomainsOther}
                    onOtherChange={(v) => update("techDomainsOther", v)}
                  />
                </FormField>

                <FormField
                  label="Which programming languages do you use?"
                  required
                  description="Select all that apply."
                >
                  <OptionGrid
                    options={PROGRAMMING_LANGUAGES}
                    selected={data.programmingLanguages}
                    onChange={(v) => update("programmingLanguages", v)}
                    columns={3}
                    hasOther
                    otherValue={data.programmingLanguagesOther}
                    onOtherChange={(v) => update("programmingLanguagesOther", v)}
                  />
                </FormField>

                {data.programmingLanguages.filter((l) => l !== "Other").length >
                  0 && (
                  <FormField
                    label="Rate your proficiency in selected languages"
                    required
                  >
                    <ProficiencyGrid
                      items={data.programmingLanguages}
                      ratings={data.languageProficiency}
                      onChange={(r) => update("languageProficiency", r)}
                    />
                  </FormField>
                )}

                <FormField
                  label="Which frameworks/libraries/tools do you use?"
                  required
                  description="Select all that apply."
                >
                  <GroupedOptionGrid
                    groups={FRAMEWORKS_GROUPS}
                    selected={data.frameworks}
                    onChange={(v) => update("frameworks", v)}
                    columns={3}
                    hasOther
                    otherValue={data.frameworksOther}
                    onOtherChange={(v) => update("frameworksOther", v)}
                  />
                </FormField>

                {data.frameworks.filter((f) => f !== "Other").length > 0 && (
                  <FormField
                    label="Rate your proficiency in selected frameworks/tools"
                    required
                  >
                    <ProficiencyGrid
                      items={data.frameworks}
                      ratings={data.frameworkProficiency}
                      onChange={(r) => update("frameworkProficiency", r)}
                    />
                  </FormField>
                )}

                <FormField
                  label="Are you also interested in Product/Business internship opportunities?"
                  required
                >
                  <OptionGrid
                    options={CROSS_TRACK_ENG_OPTIONS}
                    selected={data.crossTrackEng ? [data.crossTrackEng] : []}
                    onChange={(v) => update("crossTrackEng", v[0] || "")}
                    multiple={false}
                    columns={1}
                  />
                </FormField>

                {data.crossTrackEng.startsWith("Yes") && (
                  <BizTrackSection data={data} update={update} />
                )}
              </div>
            </motion.div>
          )}

          {isBiz && (
            <motion.div
              key="business"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="space-y-6">
                <BizTrackSection data={data} update={update} />

                <FormField
                  label="Are you also interested in Engineering/Technical internship opportunities?"
                  required
                >
                  <OptionGrid
                    options={CROSS_TRACK_BIZ_OPTIONS}
                    selected={data.crossTrackBiz ? [data.crossTrackBiz] : []}
                    onChange={(v) => update("crossTrackBiz", v[0] || "")}
                    multiple={false}
                    columns={1}
                  />
                </FormField>

                {data.crossTrackBiz.startsWith("Yes") && (
                  <div className="space-y-6 border-t border-slate-200 pt-6">
                    <h2 className="text-lg font-bold text-slate-900">
                      Engineering / Technical Track
                    </h2>

                    <FormField
                      label="Technical domains/specializations"
                      required
                      description="Select all areas you have experience or strong interest in."
                    >
                      <OptionGrid
                        options={TECH_DOMAINS}
                        selected={data.techDomains}
                        onChange={(v) => update("techDomains", v)}
                        columns={1}
                        hasOther
                        otherValue={data.techDomainsOther}
                        onOtherChange={(v) => update("techDomainsOther", v)}
                      />
                    </FormField>

                    <FormField
                      label="Which programming languages do you use?"
                      required
                      description="Select all that apply."
                    >
                      <OptionGrid
                        options={PROGRAMMING_LANGUAGES}
                        selected={data.programmingLanguages}
                        onChange={(v) => update("programmingLanguages", v)}
                        columns={3}
                        hasOther
                        otherValue={data.programmingLanguagesOther}
                        onOtherChange={(v) =>
                          update("programmingLanguagesOther", v)
                        }
                      />
                    </FormField>

                    {data.programmingLanguages.filter(
                      (l) => l !== "Other"
                    ).length > 0 && (
                      <FormField
                        label="Rate your proficiency in selected languages"
                        required
                      >
                        <ProficiencyGrid
                          items={data.programmingLanguages}
                          ratings={data.languageProficiency}
                          onChange={(r) =>
                            update("languageProficiency", r)
                          }
                        />
                      </FormField>
                    )}

                    <FormField
                      label="Which frameworks/libraries/tools do you use?"
                      required
                      description="Select all that apply."
                    >
                      <GroupedOptionGrid
                        groups={FRAMEWORKS_GROUPS}
                        selected={data.frameworks}
                        onChange={(v) => update("frameworks", v)}
                        columns={3}
                        hasOther
                        otherValue={data.frameworksOther}
                        onOtherChange={(v) => update("frameworksOther", v)}
                      />
                    </FormField>

                    {data.frameworks.filter((f) => f !== "Other").length > 0 && (
                      <FormField
                        label="Rate your proficiency in selected frameworks/tools"
                        required
                      >
                        <ProficiencyGrid
                          items={data.frameworks}
                          ratings={data.frameworkProficiency}
                          onChange={(r) =>
                            update("frameworkProficiency", r)
                          }
                        />
                      </FormField>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
