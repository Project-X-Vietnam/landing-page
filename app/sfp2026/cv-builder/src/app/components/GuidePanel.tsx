import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, Circle, Copy, Check, Plus, Download, Sparkles,
} from "lucide-react";
import { ExperienceLevel, FormulaState } from "../types";

interface Props {
  level: ExperienceLevel;
  formula: FormulaState;
  onFormulaChange: (field: keyof FormulaState, value: string) => void;
  onAddBullet: (bullet: string) => void;
}

// ── Quality-signal helpers ────────────────────────────────────────
const ACTION_VERBS = new Set([
  "led", "built", "drove", "launched", "increased", "reduced", "created",
  "managed", "developed", "designed", "delivered", "scaled", "spearheaded",
  "coordinated", "directed", "optimized", "streamlined", "deployed",
  "implemented", "transformed", "achieved", "exceeded", "generated", "grew",
  "improved", "oversaw", "championed", "negotiated", "facilitated",
  "pioneered", "revamped", "shipped", "architected", "established",
]);

function hasActionVerb(text: string) {
  return text.split(/\s+/).some((w) => ACTION_VERBS.has(w.toLowerCase().replace(/[^a-z]/g, "")));
}

function hasMetric(text: string) {
  return /\b\d+(?:\.\d+)?%|\$[\d,]+|\b\d+\s*(?:K|M|B|million|billion|engineers?|users?|clients?|people|members?)\b/i.test(text);
}

function hasTool(text: string) {
  return /(figma|jira|sql|python|react|agile|scrum|okr|mixpanel|tableau|notion|linear|confluence|amplitude|snowflake|jenkins|terraform|aws|gcp|azure|typescript|kubernetes|ci\/cd|dbt|looker|power\s?bi|bigquery|java|go|rust|swift|kotlin|flutter|rails|django|fastapi|spark|airflow)/i.test(text);
}

// ── FormField sub-component ───────────────────────────────────────
function FormField({
  number, label, question, placeholder, value, onChange, tip, validated, validLabel,
}: {
  number: string;
  label: string;
  question: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  tip: string;
  validated: boolean;
  validLabel: string;
}) {
  const [focused, setFocused] = useState(false);
  const isOk = validated && value.trim().length > 0;

  return (
    <div>
      {/* Label row */}
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="font-mono text-[11px]" style={{ color: "#CBD5E1" }}>{number}</span>
        <span
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: "#94a3b8" }}
        >
          {label}
        </span>
        <AnimatePresence>
          {isOk && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="ml-auto flex items-center gap-1 text-[10px] font-semibold"
              style={{ color: "#22c55e" }}
            >
              <CheckCircle2 className="w-3 h-3" />
              {validLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Question text */}
      <p className="text-xs mb-2" style={{ color: "#64748b" }}>{question}</p>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full text-sm rounded-lg px-3.5 py-2.5 transition-all duration-150 outline-none"
        style={{
          border: `1px solid ${isOk ? "#86efac" : focused ? "#0E56FA" : "#E2E8F0"}`,
          color: "#020818",
          background: "white",
          boxShadow: focused ? "0 0 0 3px rgba(14,86,250,0.08)" : isOk ? "0 0 0 3px rgba(34,197,94,0.06)" : "none",
        }}
      />

      {/* Tip */}
      <p className="text-[11px] mt-1.5" style={{ color: "#CBD5E1" }}>{tip}</p>
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────
export function GuidePanel({ level, formula, onFormulaChange, onAddBullet }: Props) {
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);
  const [exported, setExported] = useState(false);

  const verbOk = hasActionVerb(formula.action);
  const metricOk = hasMetric(formula.impact);
  const toolOk = hasTool(formula.method);

  const qualityScore = [verbOk, metricOk, toolOk].filter(Boolean).length;

  // Assembled sentence
  const parts: string[] = [];
  if (formula.action.trim()) parts.push(formula.action.trim());

  const assembledText = (() => {
    if (!formula.action && !formula.impact && !formula.method) return "";
    const chunks: string[] = [];
    if (formula.action.trim()) chunks.push(formula.action.trim());
    if (formula.impact.trim()) chunks.push(`resulting in ${formula.impact.trim()}`);
    if (formula.method.trim()) chunks.push(`by ${formula.method.trim()}`);
    return chunks.join(", ") + ".";
  })();

  const handleCopy = useCallback(async () => {
    if (!assembledText) return;
    await navigator.clipboard.writeText(assembledText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [assembledText]);

  const handleAdd = useCallback(() => {
    if (!assembledText) return;
    onAddBullet(assembledText);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }, [assembledText, onAddBullet]);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Panel header ── */}
      <div
        className="flex-none px-5 pt-4 pb-3.5 border-b"
        style={{ borderColor: "#E2E8F0" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <span
              className="block font-mono text-[10px] uppercase tracking-widest mb-0.5"
              style={{ color: "#CBD5E1" }}
            >
              Experience Builder
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold" style={{ color: "#020818" }}>
                XYZ Formula
              </span>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  border: "1px solid #E2E8F0",
                  color: "#94a3b8",
                }}
              >
                Google-style
              </span>
            </div>
          </div>

          {/* Quality ring */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i < qualityScore ? "#0E56FA" : "#E2E8F0",
                }}
              />
            ))}
            <span className="text-[10px] font-semibold ml-1" style={{ color: "#94a3b8" }}>
              {qualityScore}/3
            </span>
          </div>
        </div>

        {/* XYZ breakdown */}
        <div
          className="flex items-center gap-1 mt-2.5 text-[10px]"
          style={{ color: "#94a3b8" }}
        >
          <span className="font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: "#F8FAFC", color: "#020818" }}>X</span>
          <span>Action</span>
          <span className="mx-1" style={{ color: "#E2E8F0" }}>·</span>
          <span className="font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: "#EEF2FF", color: "#0E56FA" }}>Y</span>
          <span>Impact</span>
          <span className="mx-1" style={{ color: "#E2E8F0" }}>·</span>
          <span className="font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: "#F8FAFC", color: "#64748b" }}>Z</span>
          <span>Method</span>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

          {/* ── Field 01: Action ── */}
          <FormField
            number="01"
            label="Action"
            question="What did you accomplish?"
            placeholder="e.g. Led a cross-functional team of 7 engineers"
            value={formula.action}
            onChange={(v) => onFormulaChange("action", v)}
            tip="Start with a strong past-tense verb — Led, Built, Drove, Reduced"
            validated={verbOk}
            validLabel="Action verb ✓"
          />

          {/* Connector */}
          {formula.action && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="flex-1 h-px" style={{ background: "#F1F5F9" }} />
              <span className="text-[10px] italic" style={{ color: "#CBD5E1" }}>resulting in…</span>
              <div className="flex-1 h-px" style={{ background: "#F1F5F9" }} />
            </motion.div>
          )}

          {/* ── Field 02: Impact ── */}
          <FormField
            number="02"
            label="Impact"
            question="What was the measurable result?"
            placeholder="e.g. a 40% increase in deployment speed"
            value={formula.impact}
            onChange={(v) => onFormulaChange("impact", v)}
            tip="Include a specific number, percentage, or business outcome"
            validated={metricOk}
            validLabel="Metric detected ✓"
          />

          {/* Connector */}
          {formula.impact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="flex-1 h-px" style={{ background: "#F1F5F9" }} />
              <span className="text-[10px] italic" style={{ color: "#CBD5E1" }}>by doing…</span>
              <div className="flex-1 h-px" style={{ background: "#F1F5F9" }} />
            </motion.div>
          )}

          {/* ── Field 03: Method ── */}
          <FormField
            number="03"
            label="Method"
            question="How did you achieve it?"
            placeholder="e.g. implementing CI/CD automation via Jenkins"
            value={formula.method}
            onChange={(v) => onFormulaChange("method", v)}
            tip="Name the specific tool, framework, or process you used"
            validated={toolOk}
            validLabel="Tool named ✓"
          />

          {/* ── Assembled output ── */}
          <AnimatePresence>
            {assembledText && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Divider */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
                  <span
                    className="font-mono text-[9px] uppercase tracking-widest"
                    style={{ color: "#CBD5E1" }}
                  >
                    Assembled Bullet
                  </span>
                  <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
                </div>

                {/* Output card */}
                <div
                  className="rounded-lg p-3.5 mb-3"
                  style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "#1e293b" }}>
                    {formula.action && (
                      <span className="font-semibold" style={{ color: "#020818" }}>
                        {formula.action}
                      </span>
                    )}
                    {formula.action && formula.impact && (
                      <span style={{ color: "#94a3b8", fontStyle: "italic" }}>, resulting in </span>
                    )}
                    {formula.impact && (
                      <span className="font-semibold" style={{ color: "#0E56FA" }}>
                        {formula.impact}
                      </span>
                    )}
                    {formula.impact && formula.method && (
                      <span style={{ color: "#94a3b8", fontStyle: "italic" }}> by </span>
                    )}
                    {formula.method && (
                      <span style={{ color: "#475569" }}>{formula.method}</span>
                    )}
                    <span style={{ color: "#CBD5E1" }}>.</span>
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{
                      border: "1px solid #E2E8F0",
                      color: copied ? "#22c55e" : "#64748b",
                      background: "white",
                    }}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleAdd}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150"
                    style={{
                      background: added ? "#22c55e" : "#0E56FA",
                    }}
                  >
                    {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    {added ? "Added to CV!" : "Add to CV"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Quality signals ── */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
              <span
                className="font-mono text-[9px] uppercase tracking-widest"
                style={{ color: "#CBD5E1" }}
              >
                Quality Signals
              </span>
              <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Action verb present", ok: verbOk && formula.action.length > 0 },
                { label: "Quantified metric included", ok: metricOk && formula.impact.length > 0 },
                { label: "Tool or method named", ok: toolOk && formula.method.length > 0 },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  {s.ok ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#22c55e" }} />
                  ) : (
                    <Circle className="w-3.5 h-3.5 shrink-0" style={{ color: "#E2E8F0" }} />
                  )}
                  <span
                    className="text-xs"
                    style={{ color: s.ok ? "#334155" : "#CBD5E1" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tip card ── */}
          <div
            className="rounded-lg p-3.5"
            style={{
              background: "#FAFBFF",
              border: "1px solid #E2E8F0",
            }}
          >
            <p
              className="text-[11px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "#94a3b8" }}
            >
              Recruiter Insight
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>
              CVs that use the XYZ formula with quantified metrics are{" "}
              <span className="font-semibold" style={{ color: "#020818" }}>
                3× more likely
              </span>{" "}
              to receive a callback than those with vague descriptions.
            </p>
          </div>

          {/* Spacer for sticky footer */}
          <div style={{ height: 8 }} />
        </div>
      </div>

      {/* ── Sticky export footer ── */}
      <div
        className="flex-none px-5 py-3.5 border-t"
        style={{ borderColor: "#E2E8F0", background: "white" }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs" style={{ color: "#94a3b8" }}>
            When you're done —
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i < qualityScore ? "#0E56FA" : "#E2E8F0" }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {/* Download */}
          <button
            onClick={handleExport}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
            style={{
              border: "1px solid #E2E8F0",
              color: exported ? "#22c55e" : "#334155",
              background: "white",
            }}
          >
            {exported ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            {exported ? "Downloading…" : "Download Draft"}
          </button>

          {/* AI Score */}
          <button
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150"
            style={{
              background: "#020818",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#0E56FA";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#020818";
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Score with AI
          </button>
        </div>

        <p className="text-center text-[10px] mt-2" style={{ color: "#CBD5E1" }}>
          AI scoring redirects to our trusted ATS partner
        </p>
      </div>
    </div>
  );
}
