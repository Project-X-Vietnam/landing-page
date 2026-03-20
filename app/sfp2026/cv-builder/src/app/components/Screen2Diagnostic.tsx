import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { ProjectXLogo } from "./ProjectXLogo";
import { DiagnosticLevel } from "../types";

// ── Data ──────────────────────────────────────────────────────────

const STATEMENTS = [
  {
    id: 0,
    text: "I have a basic draft of my CV ready.",
    sub: "Even a rough Word doc or Google Doc counts",
  },
  {
    id: 1,
    text: "I know which technical skills to highlight for my specific role.",
    sub: "e.g. Python for Data roles, Figma for Product roles",
  },
  {
    id: 2,
    text: "I have used action verbs (e.g., Led, Developed) to describe my work.",
    sub: "Active voice, not passive — 'Built X' not 'Was responsible for X'",
  },
  {
    id: 3,
    text: "I know how to quantify my past results with specific metrics (%, $).",
    sub: "Numbers make bullets 40% more likely to get a callback",
  },
  {
    id: 4,
    text: "My current CV has successfully passed recruiter screenings before.",
    sub: "You've received interview calls or positive feedback on your CV",
  },
];

const MILESTONES: {
  label: string;
  emoji: string;
  level: DiagnosticLevel;
  pct: number;
}[] = [
  { label: "Beginner", emoji: "🌱", level: "starter", pct: 0 },
  { label: "Middle", emoji: "🚀", level: "developing", pct: 50 },
  { label: "Expert", emoji: "🎯", level: "ready", pct: 100 },
];

function computeLevel(count: number): DiagnosticLevel {
  if (count <= 1) return "starter";
  if (count <= 3) return "developing";
  return "ready";
}

// ── Props ─────────────────────────────────────────────────────────

interface Props {
  checks: boolean[];
  onToggle: (i: number) => void;
  onEnter: () => void;
  onBack: () => void;
}

// ── Component ─────────────────────────────────────────────────────

export function Screen2Diagnostic({ checks, onToggle, onEnter, onBack }: Props) {
  const checkedCount = checks.filter(Boolean).length;
  const fillPct = (checkedCount / 5) * 100;
  const currentLevel = computeLevel(checkedCount);

  const LEVEL_META: Record<
    DiagnosticLevel,
    { color: string; bg: string; border: string; message: string }
  > = {
    starter: {
      color: "#16a34a",
      bg: "#F0FDF4",
      border: "#BBF7D0",
      message:
        "You're just getting started — perfect. The workspace will walk you through writing your first strong CV bullets from scratch.",
    },
    developing: {
      color: "#D97706",
      bg: "#FFFBEB",
      border: "#FDE68A",
      message:
        "Solid foundation. Your workspace will help you upgrade vague descriptions into quantified, recruiter-ready impact statements.",
    },
    ready: {
      color: "#0E56FA",
      bg: "#EFF6FF",
      border: "#BFDBFE",
      message:
        "You're ahead of the curve. The workspace will sharpen your bullets to stand out against top candidates at tier-1 companies.",
    },
  };

  const meta = LEVEL_META[currentLevel];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFBFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 20px 80px",
      }}
    >
      {/* ── Top Bar ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 0 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 9,
              background: "#020818",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProjectXLogo size={14} color="#FFFFFF" />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#020818",
              letterSpacing: "-0.02em",
            }}
          >
            Career Survival Kit
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: s === 2 ? 24 : 6,
                height: 6,
                borderRadius: 99,
                background: s <= 2 ? "#0E56FA" : "#E2E8F0",
                transition: "all 0.3s",
              }}
            />
          ))}
          <span
            style={{
              fontSize: 11,
              color: "#94a3b8",
              fontWeight: 500,
              marginLeft: 6,
            }}
          >
            2 of 4
          </span>
        </div>
      </div>

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        style={{ width: "100%", maxWidth: 620, paddingTop: 52, paddingBottom: 36 }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 99,
            background: "rgba(14,86,250,0.06)",
            border: "1px solid rgba(14,86,250,0.12)",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#0E56FA",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#0E56FA",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Step 2 of 4
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(24px, 3.2vw, 38px)",
            fontWeight: 800,
            color: "#020818",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          Let's assess your CV
          <br />
          building experience.
        </h1>
        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6 }}>
          Tick everything that applies to you honestly. This calibrates your
          coaching level in the workspace.
        </p>
      </motion.div>

      {/* ── Progress Milestone Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ width: "100%", maxWidth: 620, marginBottom: 32 }}
      >
        {/* Milestone labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 12,
          }}
        >
          {MILESTONES.map((m) => {
            const isActive = currentLevel === m.level;
            const isPassed =
              (m.level === "starter") ||
              (m.level === "developing" && checkedCount >= 2) ||
              (m.level === "ready" && checkedCount >= 4);
            return (
              <div
                key={m.level}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    m.pct === 0
                      ? "flex-start"
                      : m.pct === 100
                      ? "flex-end"
                      : "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1 }}>{m.emoji}</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#020818" : isPassed ? "#64748b" : "#CBD5E1",
                    letterSpacing: "-0.01em",
                    transition: "color 0.3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Track */}
        <div
          style={{
            position: "relative",
            height: 8,
            background: "#E2E8F0",
            borderRadius: 99,
          }}
        >
          <motion.div
            animate={{ width: `${Math.max(fillPct, 2)}%` }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              borderRadius: 99,
              background: "linear-gradient(90deg, #0E56FA 0%, #60A5FA 100%)",
              boxShadow: "0 0 14px rgba(14,86,250,0.4)",
            }}
          />

          {/* Dot markers at 0%, 50%, 100% */}
          {[0, 50, 100].map((pos, i) => {
            const passed =
              i === 0
                ? true
                : i === 1
                ? checkedCount >= 2
                : checkedCount >= 4;
            return (
              <motion.div
                key={i}
                animate={{
                  background: passed ? "#0E56FA" : "white",
                  boxShadow: passed
                    ? "0 0 0 3px rgba(14,86,250,0.2)"
                    : "0 0 0 2px #E2E8F0",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${pos}%`,
                  transform: "translate(-50%, -50%)",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid white",
                  zIndex: 1,
                }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* ── Level Badge ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLevel}
          initial={{ opacity: 0, y: -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.96 }}
          transition={{ duration: 0.22 }}
          style={{
            width: "100%",
            maxWidth: 620,
            padding: "14px 18px",
            borderRadius: 12,
            background: meta.bg,
            border: `1px solid ${meta.border}`,
            marginBottom: 28,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: meta.color,
              marginTop: 5,
              flexShrink: 0,
            }}
          />
          <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.55, margin: 0 }}>
            <strong style={{ color: meta.color }}>
              {checkedCount === 0
                ? "No selections yet"
                : `${checkedCount}/5 checked`}{" "}
              ·{" "}
              {currentLevel === "starter"
                ? "Beginner"
                : currentLevel === "developing"
                ? "Middle"
                : "Expert"}
            </strong>{" "}
            — {meta.message}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── Checkboxes ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        style={{
          width: "100%",
          maxWidth: 620,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 36,
        }}
      >
        {STATEMENTS.map((stmt, i) => {
          const checked = checks[i];
          return (
            <motion.button
              key={stmt.id}
              whileHover={{ scale: 1.007 }}
              whileTap={{ scale: 0.997 }}
              onClick={() => onToggle(i)}
              style={{
                width: "100%",
                padding: "18px 20px",
                borderRadius: 14,
                border: `1px solid ${checked ? "#0E56FA" : "#E2E8F0"}`,
                background: checked ? "#EFF6FF" : "white",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "all 0.2s",
                boxShadow: checked
                  ? "0 0 0 3px rgba(14,86,250,0.07)"
                  : "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {/* Custom checkbox */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  border: `1.5px solid ${checked ? "#0E56FA" : "#CBD5E1"}`,
                  background: checked ? "#0E56FA" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.18s",
                  boxShadow: checked ? "0 2px 8px rgba(14,86,250,0.25)" : "none",
                }}
              >
                <AnimatePresence>
                  {checked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.14, type: "spring", stiffness: 600 }}
                    >
                      <Check size={12} color="white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: checked ? "#020818" : "#334155",
                    letterSpacing: "-0.015em",
                    marginBottom: 3,
                    transition: "color 0.2s",
                  }}
                >
                  {stmt.text}
                </div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 400, lineHeight: 1.4 }}>
                  {stmt.sub}
                </div>
              </div>

              {/* Index badge */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  background: checked ? "rgba(14,86,250,0.1)" : "#F8FAFC",
                  border: `1px solid ${checked ? "rgba(14,86,250,0.2)" : "#F1F5F9"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: checked ? "#0E56FA" : "#CBD5E1",
                    fontFamily: "monospace",
                    transition: "color 0.2s",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* ── CTA ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "11px 20px",
            borderRadius: 10,
            border: "1px solid #E2E8F0",
            background: "white",
            color: "#64748b",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "-0.01em",
          }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnter}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "13px 28px",
            borderRadius: 12,
            background: "#0E56FA",
            color: "white",
            fontSize: 14,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            letterSpacing: "-0.02em",
            boxShadow: "0 4px 18px rgba(14,86,250,0.32)",
          }}
        >
          Enter Workspace
          <ArrowRight size={16} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}
