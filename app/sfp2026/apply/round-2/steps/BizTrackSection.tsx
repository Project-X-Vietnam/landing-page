"use client";

import {
  FormField,
  OptionGrid,
  GroupedOptionGrid,
  ProficiencyGrid,
} from "../components";
import {
  BIZ_DOMAINS,
  BIZ_TOOLS_GROUPS,
  ANALYTICAL_TOOLS,
} from "../data/options";
import type { StepProps } from "./types";

export function BizTrackSection({ data, update }: StepProps) {
  return (
    <>
      <div className="border-t border-slate-200 pt-6">
        <h2 className="text-lg font-bold text-slate-900">
          Product / Business Track
        </h2>
      </div>

      <FormField
        label="Business/Product domains"
        required
        description="Select all areas you have experience or strong interest in."
      >
        <OptionGrid
          options={BIZ_DOMAINS}
          selected={data.bizDomains}
          onChange={(v) => update("bizDomains", v)}
          columns={1}
          hasOther
          otherValue={data.bizDomainsOther}
          onOtherChange={(v) => update("bizDomainsOther", v)}
        />
      </FormField>

      <FormField
        label="Which product/business tools do you use?"
        required
        description="Select all that apply."
      >
        <GroupedOptionGrid
          groups={BIZ_TOOLS_GROUPS}
          selected={data.bizTools}
          onChange={(v) => update("bizTools", v)}
          columns={3}
          hasOther
          otherValue={data.bizToolsOther}
          onOtherChange={(v) => update("bizToolsOther", v)}
        />
      </FormField>

      {data.bizTools.filter((t) => t !== "Other").length > 0 && (
        <FormField label="Rate your proficiency in selected tools" required>
          <ProficiencyGrid
            items={data.bizTools}
            ratings={data.bizToolProficiency}
            onChange={(r) => update("bizToolProficiency", r)}
          />
        </FormField>
      )}

      <FormField
        label="Which analytical/technical tools do you use?"
        required
        description="Select all that apply."
      >
        <OptionGrid
          options={ANALYTICAL_TOOLS}
          selected={data.analyticalTools}
          onChange={(v) => update("analyticalTools", v)}
          columns={1}
          hasOther
          otherValue={data.analyticalToolsOther}
          onOtherChange={(v) => update("analyticalToolsOther", v)}
        />
      </FormField>

      {data.analyticalTools.filter((t) => t !== "Other").length > 0 && (
        <FormField
          label="Rate your proficiency in selected analytical tools"
          required
        >
          <ProficiencyGrid
            items={data.analyticalTools}
            ratings={data.analyticalToolProficiency}
            onChange={(r) => update("analyticalToolProficiency", r)}
          />
        </FormField>
      )}
    </>
  );
}
