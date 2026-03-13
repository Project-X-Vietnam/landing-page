import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Zap } from "lucide-react";
import { ExperienceLevel, FormulaState } from "../types";

interface Props {
  level: ExperienceLevel;
  formula: FormulaState;
  onFormulaChange: (field: keyof FormulaState, value: string) => void;
  onSave: (bullet: string) => void;
  onClose: () => void;
  style?: React.CSSProperties;
}

// ── Level labels ──────────────────────────────────────────────────
const LEVEL_LABEL: Record<ExperienceLevel, string> = {
  beginner: "Beginner",
  mid: "Mid-Level",
  expert: "Expert",
};

const LEVEL_BADGE_STYLE: Record<ExperienceLevel, React.CSSProperties> = {
  beginner: { background: "#EFF6FF", color: "#0284C7", border: "1px solid #BAE6FD" },
  mid: { background: "#FFF7ED", color: "#C2410C", border: "1px solid #FDBA74" },
  expert: { background: "#F5F3FF", color: "#6D28D9", border: "1px solid #C4B5FD" },
};

// ── Coach content ─────────────────────────────────────────────────
const COACH: Record<ExperienceLevel, { icon: string; title: string; text: string; bg: string; border: string; color: string }> = {
  beginner: {
    icon: "💡", title: "Beginner Coach",
    text: "For entry-level, any hands-on task demonstrates initiative. Use strong action verbs and quantify anything you can — academic projects and internship metrics both count.",
    bg: "#EFF6FF", border: "#BAE6FD", color: "#0369A1",
  },
  mid: {
    icon: "🎯", title: "Mid-Level Coach",
    text: "For Mid-level, recruiters expect leadership or cross-functional coordination, not just task execution. Highlight who you collaborated with and the scope of your ownership.",
    bg: "#FFFBEB", border: "#FDE68A", color: "#B45309",
  },
  expert: {
    icon: "⚡", title: "Expert Strategy",
    text: "At Senior level, zoom out. How many teams? What budget? What company-level outcome? Tie every bullet to strategic scale — not just what you did, but what it changed.",
    bg: "#F5F3FF", border: "#DDD6FE", color: "#6D28D9",
  },
};

// ── Helpers ───────────────────────────────────────────────────────
const ACTION_VERBS = new Set([
  "led", "built", "drove", "launched", "increased", "reduced", "created",
  "managed", "developed", "designed", "delivered", "scaled", "shipped",
  "deployed", "implemented", "transformed", "achieved", "improved",
  "optimized", "streamlined", "spearheaded", "coordinated", "directed",
  "oversaw", "championed", "pioneered", "architected", "established",
  "facilitated", "grew", "migrated", "revamped", "generated", "identified",
  "influenced", "introduced", "mentored", "negotiated", "owned", "partnered",
  "produced", "resolved", "secured", "shaped", "simplified", "trained",
]);

function checkVerb(text: string) {
  if (!text.trim()) return false;
  const first = text.trim().split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "");
  return ACTION_VERBS.has(first);
}

function checkMetric(text: string) {
  return /\d+\s*%|\$[\d,]+|\d+\s*[xX]|\d+[kKmMbB]\b|\d+\s*(million|billion|users?|engineers?|clients?|teams?|points?)/i.test(text);
}

function checkTool(text: string) {
  return text.trim().length >= 3;
}

// ── Input field component ─────────────────────────────────────────
function FormInput({
  num, label, placeholder, value, onChange, accent, tip,
}: {
  num: string; label: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  accent: string; tip: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "#CBD5E1" }}>{num}</span>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: "#F1F5F9", marginLeft: 4 }} />
      </div>
      <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 6 }}>{placeholder}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "9px 12px", fontSize: 13, borderRadius: 8,
          border: `1px solid ${focused ? accent : value ? "#E2E8F0" : "#E2E8F0"}`,
          outline: "none", color: "#020818", background: "white", transition: "all 0.15s",
          boxShadow: focused ? `0 0 0 3px ${accent}22` : "none",
        }}
      />
      <p style={{ fontSize: 10, color: "#CBD5E1", marginTop: 5 }}>{tip}</p>
    </div>
  );
}

// ── Checkbox row ──────────────────────────────────────────────────
function CheckRow({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
        background: checked ? "#020818" : "white",
        border: checked ? "none" : "1.5px solid #E2E8F0",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
      }}>
        {checked && <Check size={10} color="white" strokeWidth={3} />}
      </div>
      <span style={{ fontSize: 13, color: checked ? "#1e293b" : "#94a3b8", fontWeight: checked ? 500 : 400, transition: "color 0.15s" }}>
        {label}
      </span>
    </div>
  );
}

// ── Live preview with syntax highlighting ─────────────────────────
function LivePreview({ formula }: { formula: FormulaState }) {
  const { action, impact, method } = formula;
  const hasAny = action || impact || method;

  if (!hasAny) {
    return (
      <p style={{ fontSize: 12, color: "#CBD5E1", fontStyle: "italic", lineHeight: 1.6 }}>
        Start filling in the fields above to see your bullet appear here…
      </p>
    );
  }

  return (
    <div>
      {/* Token legend */}
      <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
        {[
          { dot: "#0E56FA", label: "Action" },
          { dot: "#059669", label: "Impact" },
          { dot: "#D97706", label: "Method" },
        ].map((t) => (
          <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.dot }} />
            <span style={{ fontSize: 10, color: "#94a3b8" }}>{t.label}</span>
          </div>
        ))}
      </div>

      {/* Highlighted sentence */}
      <p style={{ fontSize: 13, lineHeight: 1.7, color: "#475569" }}>
        {action && (
          <span style={{ color: "#0E56FA", fontWeight: 600 }}>{action}</span>
        )}
        {action && impact && (
          <span style={{ color: "#94a3b8" }}>, resulting in </span>
        )}
        {!action && impact && (
          <span style={{ color: "#94a3b8" }}>Resulting in </span>
        )}
        {impact && (
          <span style={{ color: "#059669", fontWeight: 600 }}>{impact}</span>
        )}
        {(action || impact) && method && (
          <span style={{ color: "#94a3b8" }}> by implementing </span>
        )}
        {!action && !impact && method && (
          <span style={{ color: "#94a3b8" }}>By implementing </span>
        )}
        {method && (
          <span style={{ color: "#D97706", fontWeight: 600 }}>{method}</span>
        )}
        {hasAny && <span style={{ color: "#94a3b8" }}>.</span>}
      </p>
    </div>
  );
}

// ── Main ExperiencePopover ────────────────────────────────────────
export function ExperiencePopover({ level, formula, onFormulaChange, onSave, onClose, style }: Props) {
  const [saved, setSaved] = useState(false);

  const verbOk = checkVerb(formula.action);
  const metricOk = checkMetric(formula.impact);
  const toolOk = checkTool(formula.method);

  const assembled = [
    formula.action.trim(),
    formula.impact.trim() && `resulting in ${formula.impact.trim()}`,
    formula.method.trim() && `by implementing ${formula.method.trim()}`,
  ].filter(Boolean).join(", ") + (formula.action || formula.impact || formula.method ? "." : "");

  const coach = COACH[level];

  const handleSave = () => {
    if (!assembled.trim() || assembled === ".") return;
    setSaved(true);
    onSave(assembled);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 400, background: "white", borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.03), 0 25px 50px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.1)",
        overflow: "hidden",
        maxHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: "14px 18px 13px", borderBottom: "1px solid #F1F5F9", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#020818", letterSpacing: "-0.01em" }}>
            Experience Builder
          </h3>
          <button
            onClick={onClose}
            style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid #E2E8F0", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8" }}
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, color: "#94a3b8" }}>Viewing:</span>
          <motion.span
            key={level}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            style={{
              fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
              ...LEVEL_BADGE_STYLE[level],
            }}
          >
            {LEVEL_LABEL[level]} Standards
          </motion.span>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 18px" }}>

        {/* ─ Section A: Checklist ─ */}
        <div style={{ padding: "14px 0 0" }}>
          <SectionHeader label="A" title="Quality Checklist" />
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
            <CheckRow checked={verbOk} label="Action Verb" />
            <CheckRow checked={metricOk} label="Quantified Metric" />
            <CheckRow checked={toolOk} label="Tool / Framework" />
          </div>
          {/* Progress indicator */}
          <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: 3, borderRadius: 99,
                  background: i < [verbOk, metricOk, toolOk].filter(Boolean).length ? "#0E56FA" : "#F1F5F9",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>
        </div>

        {/* ─ Section B: XYZ Builder ─ */}
        <Divider />
        <div style={{ paddingBottom: 18 }}>
          <SectionHeader label="B" title="XYZ Formula Builder" />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <FormInput
              num="01" label="Action"
              placeholder="What did you do?"
              value={formula.action}
              onChange={(v) => onFormulaChange("action", v)}
              accent="#0E56FA"
              tip="Start with a strong past-tense verb — Led, Built, Drove, Reduced"
            />
            <FormInput
              num="02" label="Impact"
              placeholder="Measurable result"
              value={formula.impact}
              onChange={(v) => onFormulaChange("impact", v)}
              accent="#059669"
              tip="Include a specific %, number, or business metric"
            />
            <FormInput
              num="03" label="Method"
              placeholder="How did you do it?"
              value={formula.method}
              onChange={(v) => onFormulaChange("method", v)}
              accent="#D97706"
              tip="Name the tool, framework, or process used"
            />
          </div>
        </div>

        {/* ─ Section C: Live Preview ─ */}
        <Divider />
        <div style={{ paddingBottom: 18 }}>
          <SectionHeader label="C" title="Live Preview" />
          <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 14px", minHeight: 56 }}>
            <LivePreview formula={formula} />
          </div>
        </div>

        {/* ─ Section D: Level-specific Coach ─ */}
        <Divider />
        <div style={{ paddingBottom: 18 }}>
          <SectionHeader label="D" title="Level Coach" />
          <AnimatePresence mode="wait">
            <motion.div
              key={level}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                background: coach.bg,
                border: `1px solid ${coach.border}`,
                borderLeft: `3px solid ${coach.color}`,
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{coach.icon}</span>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: coach.color, marginBottom: 4, letterSpacing: "0.02em" }}>
                    {coach.title}
                  </p>
                  <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.65 }}>
                    {coach.text}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Footer: Save & Apply ── */}
      <div style={{ padding: "12px 18px 16px", borderTop: "1px solid #F1F5F9", flexShrink: 0 }}>
        <button
          onClick={handleSave}
          disabled={!formula.action && !formula.impact && !formula.method}
          style={{
            width: "100%", padding: "11px", borderRadius: 10, border: "none",
            background: saved ? "#16a34a" : "#0E56FA",
            color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background 0.2s", opacity: !formula.action && !formula.impact && !formula.method ? 0.5 : 1,
          }}
        >
          {saved ? (
            <><Check size={14} strokeWidth={2.5} /> Bullet Saved to CV!</>
          ) : (
            <><Zap size={14} /> Save &amp; Apply</>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ width: 18, height: 18, borderRadius: 5, background: "#020818", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: "white", letterSpacing: "0.02em" }}>{label}</span>
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>
        {title}
      </span>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#F1F5F9", margin: "0 0 16px" }} />;
}