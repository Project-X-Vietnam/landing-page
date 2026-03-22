"use client";

import {
  FormField,
  OptionGrid,
  FormTextarea,
} from "../components";
import {
  IMPROVEMENTS_AFTER_R1,
  FELLOWSHIP_COMMITMENT_OPTIONS,
} from "../data/options";
import type { StepProps } from "./types";

export function Step5({ data, update }: StepProps) {
  return (
    <div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
        Step 5
      </span>
      <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">
        Additional Information
      </h1>
      <p className="text-slate-500 text-sm mb-6">
        A few final questions before you submit.
      </p>
      <div className="space-y-6">
        <FormField
          label="What did you improve after Round 1?"
          required
          description="Select all that apply."
        >
          <OptionGrid
            options={IMPROVEMENTS_AFTER_R1}
            selected={data.improvementsAfterR1}
            onChange={(v) => update("improvementsAfterR1", v)}
            columns={1}
            hasOther
            otherValue={data.improvementsAfterR1Other}
            onOtherChange={(v) => update("improvementsAfterR1Other", v)}
          />
        </FormField>

        <FormField
          label="If you don't secure an internship through PJX partners but get one elsewhere, do you still want to join SFP2026?"
          required
          description="This helps us understand your commitment to the fellowship program itself."
        >
          <OptionGrid
            options={FELLOWSHIP_COMMITMENT_OPTIONS}
            selected={data.fellowshipCommitment ? [data.fellowshipCommitment] : []}
            onChange={(v) => update("fellowshipCommitment", v[0] || "")}
            multiple={false}
            columns={1}
          />
        </FormField>

        <FormField
          label="Additional comments"
          description="Any questions, messages, or information you'd like to share with us."
        >
          <FormTextarea
            value={data.additionalComments}
            onChange={(e) => update("additionalComments", e.target.value)}
            placeholder="Share any additional thoughts (optional)"
            rows={4}
            maxWords={300}
          />
        </FormField>
      </div>
    </div>
  );
}
