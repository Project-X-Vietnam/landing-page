import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { trackEvent, handleScrollDepthTracking } from "../../utils/analytics";
import {
  Check,
  Lock,
  Sparkles,
  ThumbsUp,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Wand2,
  CheckCheck,
  MapPin,
  Mail,
  Globe,
  Building2,
  Code2,
  Layers,
  Briefcase,
  Cpu,
} from "lucide-react";
import { DiagnosticLevel } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const AVATAR_MAN =
  "https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80";

// ─── PILLAR DATA ──────────────────────────────────────────────────────────────

type PillarId = "engineering" | "product" | "business" | "ai";
interface Pillar {
  id: PillarId;
  Icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  roles: string[];
  accent: string;
}

const PILLARS: Pillar[] = [
  {
    id: "engineering",
    Icon: Code2,
    iconBg: "#F8FAFC",
    iconColor: "#94A3B8",
    title: "Engineering",
    subtitle: "Build systems that scale",
    roles: ["Frontend Engineer", "Backend Engineer", "Full Stack Dev", "DevOps", "Mobile Dev"],
    accent: "#0EA5E9",
  },
  {
    id: "product",
    Icon: Layers,
    iconBg: "#6D28D9",
    iconColor: "#ffffff",
    title: "Product & Analytics",
    subtitle: "Define what gets built",
    roles: ["Product Manager", "Business Analyst", "Growth Analyst", "UX Researcher", "Strategy Lead", "Data PM"],
    accent: "#6D28D9",
  },
  {
    id: "business",
    Icon: Briefcase,
    iconBg: "#F8FAFC",
    iconColor: "#94A3B8",
    title: "Tech-Enabled Business",
    subtitle: "Drive commercial impact",
    roles: ["Sales Engineer", "Solutions Architect", "Partnerships Lead", "Operations"],
    accent: "#0E56FA",
  },
  {
    id: "ai",
    Icon: Cpu,
    iconBg: "#F8FAFC",
    iconColor: "#94A3B8",
    title: "AI Applications",
    subtitle: "Shape the frontier",
    roles: ["AI/ML Engineer", "AI Product Manager", "Prompt Engineer", "Data Scientist"],
    accent: "#7C3AED",
  },
];

// ─── DIAGNOSTIC DATA ─────────────────────────────────────────────────────────

const DIAG_ITEMS = [
  { main: "I have a basic draft of my CV ready.", hint: "Even a rough Word doc or Google Doc counts" },
  { main: "I know which technical skills to highlight.", hint: "e.g. Python for Data roles, Figma for Product roles" },
  { main: "I have used action verbs to describe my work.", hint: "Active voice, not passive — 'Built X' not 'Was responsible for X'" },
  { main: "I know how to quantify past results with metrics.", hint: "Numbers make bullets 40% more likely to get a callback" },
  { main: "My current CV has passed recruiter screenings.", hint: "You've received interview calls or positive feedback" },
];

function computeLevel(n: number): { level: DiagnosticLevel; label: string; barFill: string } {
  if (n <= 1) return { level: "starter",    label: "Beginner", barFill: "0%" };
  if (n <= 3) return { level: "developing", label: "Middle",   barFill: "50%" };
  return       { level: "ready",            label: "Expert",   barFill: "100%" };
}

// ─── STAGED CV BULLETS ────────────────────────────────────────────────────────

const STAGED_BULLETS = [
  "Responsible for improving the product and the team did better overall.",
  "Led the product team and improved overall performance.",
  "Led a cross-functional team of 5 engineers to redesign the onboarding flow, improving performance.",
  "Led cross-functional team of 5 engineers to redesign onboarding flow, reducing drop-off by 23%.",
];

const ACTION_VERBS = new Set([
  "led","built","conducted","presented","redesigned","created","defined",
  "shipped","prioritised","analysed","coordinated","designed","collaborated",
  "drove","owned","architected","secured","spearheaded","optimised","orchestrated",
]);

function renderHighlighted(text: string) {
  return text.split(/(\s+)/).map((tok, i) => {
    if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
    const clean = tok.replace(/[.,;:!?()—\-]+$/g, "").toLowerCase();
    const isVerb = ACTION_VERBS.has(clean);
    const isMet  = /\d|%|\$|£|K\+|M\+/.test(tok);
    return (
      <span key={i} style={{ color: isVerb ? "#0E56FA" : isMet ? "#16a34a" : "#334155", fontWeight: isVerb || isMet ? 700 : 400 }}>
        {tok}
      </span>
    );
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SHARED — Status Bar
// ═══════════════════════════════════════════════════════════════════════════════

function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "#fff" : "#020818";
  return (
    <div style={{
      height: 54, paddingTop: 16, paddingLeft: 22, paddingRight: 20,
      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      paddingBottom: 6, background: dark ? "transparent" : "white",
      flexShrink: 0, position: "relative", zIndex: 30,
    }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: c, letterSpacing: "-0.02em" }}>9:41</span>
      <div style={{ width: 126 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
          {[5, 8, 11, 14].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, background: c, borderRadius: 1 }} />
          ))}
        </div>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path d="M7 8.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill={c}/>
          <path d="M3.5 5.8C4.5 4.8 5.7 4.2 7 4.2s2.5.6 3.5 1.6" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <path d="M1 3C2.7 1.3 4.7.4 7 .4s4.3.9 6 2.6" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        </svg>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            width: 22, height: 11, borderRadius: 3.5,
            border: `1.5px solid ${dark ? "rgba(255,255,255,0.5)" : "rgba(2,8,24,0.5)"}`,
            padding: "1.5px",
          }}>
            <div style={{ width: "85%", height: "100%", background: c, borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SHARED — Brand Nav Bar
// ═══════════════════════════════════════════════════════════════════════════════

function BrandNav({
  step, onBack,
}: {
  step: 1 | 2 | 3;
  onBack?: () => void;
}) {
  return (
    <div style={{
      height: 44, background: "white",
      borderBottom: "1px solid #F1F5F9",
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      flexShrink: 0, zIndex: 25, position: "relative",
    }}>
      {/* Left: Back or Logo */}
      {onBack ? (
        <button onClick={onBack} style={{
          display: "flex", alignItems: "center", gap: 2,
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <ChevronLeft size={18} color="#0E56FA" strokeWidth={2.5} />
          <span style={{ fontSize: 15, fontWeight: 500, color: "#0E56FA", letterSpacing: "-0.02em" }}>Back</span>
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: "#020818",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 9.5, fontWeight: 900, color: "white", letterSpacing: "-0.05em" }}>SK</span>
          </div>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "#020818", letterSpacing: "-0.02em" }}>
            Career Survival Kit
          </span>
        </div>
      )}

      {/* Right: Step dots */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{
              width: i === step ? 16 : 6, height: 6, borderRadius: 99,
              background: i <= step ? "#0E56FA" : "#E2E8F0",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
        <span style={{ fontSize: 10, fontWeight: 500, color: "#94a3b8" }}>{step} of 4</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SCREEN 1 — Role Selection
// ═══════════════════════════════════════════════════════════════════════════════

function PillarCard({
  pillar,
  isExpanded,
  selectedRole,
  onToggle,
  onSelectRole,
}: {
  pillar: Pillar;
  isExpanded: boolean;
  selectedRole: string | null;
  onToggle: () => void;
  onSelectRole: (r: string) => void;
}) {
  const isActive = isExpanded || pillar.roles.includes(selectedRole ?? "");
  const ac = pillar.accent;

  return (
    <motion.div
      animate={{ borderColor: isActive ? ac : "#E2E8F0" }}
      transition={{ duration: 0.18 }}
      style={{
        borderRadius: 16,
        border: `1.5px solid ${isActive ? ac : "#E2E8F0"}`,
        background: isActive ? (pillar.id === "product" ? "#F5F3FF" : "white") : "white",
        overflow: "hidden",
        boxShadow: isActive
          ? `0 0 0 3px ${ac}15, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "background 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Card Header */}
      <button
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "center", gap: 13,
          padding: "14px 18px", width: "100%",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        {/* Icon box */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: isActive && pillar.id === "product" ? pillar.iconBg : "#F8FAFC",
          border: `1px solid ${isActive && pillar.id === "product" ? "transparent" : "#E2E8F0"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: isActive && pillar.id === "product" ? `0 4px 14px ${ac}40` : "none",
        }}>
          <pillar.Icon size={20} color={isActive && pillar.id === "product" ? pillar.iconColor : "#94A3B8"} strokeWidth={1.8} />
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "#020818", letterSpacing: "-0.02em", marginBottom: 1 }}>
            {pillar.title}
          </div>
          <div style={{ fontSize: 11.5, color: "#94a3b8" }}>{pillar.subtitle}</div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} color={isActive ? ac : "#CBD5E1"} strokeWidth={2} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              borderTop: `1px solid ${ac}20`,
              padding: "12px 18px 16px",
            }}>
              <div style={{
                fontSize: 9.5, fontWeight: 800, color: ac,
                letterSpacing: "0.07em", textTransform: "uppercase",
                marginBottom: 10, display: "flex", alignItems: "center", gap: 4,
              }}>
                Select a specific role →
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {pillar.roles.map(role => {
                  const sel = selectedRole === role;
                  return (
                    <motion.button
                      key={role}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSelectRole(role)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 99,
                        border: `1px solid ${sel ? ac : `${ac}30`}`,
                        background: sel ? ac : `${ac}10`,
                        color: sel ? "white" : ac,
                        fontSize: 12, fontWeight: sel ? 700 : 500,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {role}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Screen1({
  selectedPillar,
  setSelectedPillar,
  selectedRole,
  setSelectedRole,
  onNext,
}: {
  selectedPillar: PillarId | null;
  setSelectedPillar: (p: PillarId | null) => void;
  selectedRole: string | null;
  setSelectedRole: (r: string | null) => void;
  onNext: () => void;
}) {
  const handleToggle = (id: PillarId) => {
    setSelectedPillar(selectedPillar === id ? null : id);
  };
  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#FAFBFF" }}>
      <StatusBar />
      <BrandNav step={1} />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        <style>{`.s1-scroll::-webkit-scrollbar { width: 0; }`}</style>
        <div className="s1-scroll" style={{ padding: "16px 16px 0" }}>

          {/* Step pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "5px 12px 5px 8px",
            borderRadius: 99,
            background: "rgba(14,86,250,0.06)",
            border: "1px solid rgba(14,86,250,0.12)",
            marginBottom: 12,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0E56FA" }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: "#0E56FA", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              Step 1 of 4
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 26, fontWeight: 900, color: "#020818",
            letterSpacing: "-0.05em", lineHeight: 1.18, margin: "0 0 8px",
          }}>
            Where are<br />you heading?
          </h1>
          <p style={{
            fontSize: 13.5, color: "#64748b", lineHeight: 1.6,
            margin: "0 0 18px", letterSpacing: "-0.01em",
          }}>
            Choose your career pillar, then pick the role that fits.
          </p>

          {/* Pillar cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PILLARS.map(pillar => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                isExpanded={selectedPillar === pillar.id}
                selectedRole={selectedRole}
                onToggle={() => handleToggle(pillar.id)}
                onSelectRole={handleSelectRole}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "white",
        borderTop: "1px solid #F1F5F9",
        padding: "12px 16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 30,
      }}>
        {/* Status label */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {selectedRole ? (
            <>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669" }} />
              <span style={{ fontSize: 11.5, fontWeight: 600, color: "#059669", letterSpacing: "-0.01em" }}>
                {selectedRole} — Selected
              </span>
            </>
          ) : (
            <span style={{ fontSize: 11, color: "#94a3b8" }}>No role selected yet</span>
          )}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "11px 20px", borderRadius: 12,
            background: selectedRole ? "#0E56FA" : "#CBD5E1",
            color: "white", fontSize: 13.5, fontWeight: 700,
            border: "none", cursor: selectedRole ? "pointer" : "not-allowed",
            boxShadow: selectedRole ? "0 4px 16px rgba(14,86,250,0.35)" : "none",
            letterSpacing: "-0.01em",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
        >
          Next Step
          <ArrowRight size={15} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SCREEN 2 — Level Diagnostic
// ═══════════════════════════════════════════════════════════════════════════════

function LevelProgressBar({ count }: { count: number }) {
  const { label, barFill } = computeLevel(count);
  const steps = [
    { key: "Beginner", emoji: "🌱", active: true },
    { key: "Middle",   emoji: "🚀", active: count >= 2 },
    { key: "Expert",   emoji: "🎯", active: count >= 4 },
  ];
  const fillPercent = count <= 1 ? 0 : count <= 3 ? 50 : 100;

  return (
    <div style={{ padding: "10px 16px 12px" }}>
      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        {steps.map((s, i) => (
          <div key={s.key} style={{
            display: "flex", flexDirection: "column", alignItems: i === 0 ? "flex-start" : i === 2 ? "flex-end" : "center",
          }}>
            <span style={{ fontSize: 15, marginBottom: 1 }}>{s.emoji}</span>
            <span style={{
              fontSize: 10.5, fontWeight: s.key === label ? 800 : 500,
              color: s.key === label ? "#020818" : "#94a3b8",
              letterSpacing: "-0.01em",
            }}>
              {s.key}
            </span>
          </div>
        ))}
      </div>

      {/* Track */}
      <div style={{
        height: 6, borderRadius: 99, background: "#E2E8F0",
        position: "relative", overflow: "hidden",
      }}>
        <motion.div
          animate={{ width: `${fillPercent}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #0E56FA, #6D28D9)" }}
        />
        {/* Moving thumb */}
        <motion.div
          animate={{ left: fillPercent === 0 ? "0%" : fillPercent === 50 ? "50%" : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "50%",
            transform: "translate(-50%, -50%)",
            width: 12, height: 12, borderRadius: "50%",
            background: "white", border: "2px solid #0E56FA",
            boxShadow: "0 2px 6px rgba(14,86,250,0.4)",
          }}
        />
      </div>
    </div>
  );
}

function DiagnosticCard({
  item, index, checked, onChange,
}: {
  item: { main: string; hint: string };
  index: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      onClick={onChange}
      style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        padding: "13px 14px",
        borderRadius: 14,
        border: `1.5px solid ${checked ? "#0E56FA" : "#E2E8F0"}`,
        background: checked ? "rgba(14,86,250,0.03)" : "white",
        cursor: "pointer", textAlign: "left", width: "100%",
        boxShadow: checked ? "0 0 0 3px rgba(14,86,250,0.06)" : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "all 0.18s",
      }}
    >
      {/* Checkbox */}
      <div style={{
        width: 22, height: 22, borderRadius: 7, flexShrink: 0,
        border: `2px solid ${checked ? "#0E56FA" : "#CBD5E1"}`,
        background: checked ? "#0E56FA" : "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.18s",
      }}>
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              transition={{ duration: 0.14, type: "spring", stiffness: 600 }}
            >
              <Check size={12} color="white" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: 13, fontWeight: checked ? 700 : 500, color: "#020818",
          margin: "0 0 2px", letterSpacing: "-0.02em", lineHeight: 1.4,
        }}>
          {item.main}
        </p>
        <p style={{ fontSize: 11, color: "#94a3b8", margin: 0, lineHeight: 1.4 }}>
          {item.hint}
        </p>
      </div>

      {/* Number badge */}
      <div style={{
        width: 26, height: 20, borderRadius: 6, flexShrink: 0,
        background: checked ? "rgba(14,86,250,0.1)" : "#F1F5F9",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 800, letterSpacing: "0.05em",
          color: checked ? "#0E56FA" : "#94a3b8",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.button>
  );
}

function Screen2({
  checks,
  setChecks,
  onBack,
  onNext,
}: {
  checks: boolean[];
  setChecks: (c: boolean[]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const count = checks.filter(Boolean).length;
  const { label } = computeLevel(count);

  const bannerMessages: Record<string, string> = {
    Beginner: "Build your foundation. Let's start from scratch.",
    Middle:   "Solid foundation. We'll help you upgrade vague descriptions.",
    Expert:   "You're ready to compete. We'll fine-tune for perfection.",
  };

  const bannerColors: Record<string, { bg: string; border: string; dot: string; label: string }> = {
    Beginner: { bg: "#FEF3C7", border: "#FDE68A", dot: "#D97706", label: "#92400E" },
    Middle:   { bg: "#FEF3C7", border: "#FDE68A", dot: "#D97706", label: "#92400E" },
    Expert:   { bg: "#F0FDF4", border: "#BBF7D0", dot: "#16a34a", label: "#166534" },
  };
  const bc = bannerColors[label];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#FAFBFF" }}>
      <StatusBar />
      <BrandNav step={2} onBack={onBack} />

      {/* Sticky sub-header */}
      <div style={{
        background: "white",
        borderBottom: "1px solid #F1F5F9",
        flexShrink: 0, zIndex: 22,
      }}>
        <div style={{ padding: "14px 16px 0" }}>
          {/* Step pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "5px 12px 5px 8px",
            borderRadius: 99,
            background: "rgba(14,86,250,0.06)", border: "1px solid rgba(14,86,250,0.12)",
            marginBottom: 10,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0E56FA" }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: "#0E56FA", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              Step 2 of 4
            </span>
          </div>
          <h1 style={{
            fontSize: 21, fontWeight: 900, color: "#020818",
            letterSpacing: "-0.04em", lineHeight: 1.22, margin: "0 0 14px",
          }}>
            Let's assess your<br />CV building experience.
          </h1>
        </div>
        <LevelProgressBar count={count} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        <style>{`.s2-scroll::-webkit-scrollbar { width: 0; }`}</style>
        <div className="s2-scroll" style={{ padding: "14px 16px 0", display: "flex", flexDirection: "column", gap: 8 }}>

          {/* Feedback banner */}
          <div style={{
            padding: "10px 14px",
            borderRadius: 12,
            background: bc.bg, border: `1px solid ${bc.border}`,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: bc.dot, marginTop: 4, flexShrink: 0 }} />
              <p style={{ fontSize: 12, color: bc.label, lineHeight: 1.55, margin: 0, letterSpacing: "-0.01em" }}>
                <strong>{count}/5 checked · {label}</strong>
                {" — "}{bannerMessages[label]}
              </p>
            </div>
          </div>

          {/* Diagnostic cards */}
          {DIAG_ITEMS.map((item, i) => (
            <DiagnosticCard
              key={i}
              item={item}
              index={i}
              checked={checks[i]}
              onChange={() => {
                const next = [...checks];
                next[i] = !next[i];
                setChecks(next);
              }}
            />
          ))}
        </div>
      </div>

      {/* Sticky bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "white", borderTop: "1px solid #F1F5F9",
        padding: "12px 16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 30,
      }}>
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "10px 16px", borderRadius: 12,
            background: "#F8FAFC", border: "1px solid #E2E8F0",
            color: "#64748b", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "11px 20px", borderRadius: 12,
            background: "#0E56FA", color: "white",
            fontSize: 13.5, fontWeight: 700, border: "none", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(14,86,250,0.35)",
            letterSpacing: "-0.01em",
          }}
        >
          Enter Workspace
          <ArrowRight size={15} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SCREEN 3 — Workspace (sub-components)
// ═══════════════════════════════════════════════════════════════════════════════

const LEVELS = [
  { id: "starter"    as DiagnosticLevel, label: "Beginner", emoji: "🌱" },
  { id: "developing" as DiagnosticLevel, label: "Mid",      emoji: "🚀" },
  { id: "ready"      as DiagnosticLevel, label: "Expert",   emoji: "🎯" },
];

const WS_CHECKLIST = [
  "Strong action verbs used throughout",
  "Impact quantified with % or $ metrics",
  "Cross-functional context provided",
];

const COMPANY_BADGE = { name: "Google", bg: "#4285F4", fg: "#fff" };

function WorkspaceNavHeader({
  level, onLevelChange, onBack,
}: {
  level: DiagnosticLevel;
  onLevelChange: (l: DiagnosticLevel) => void;
  onBack: () => void;
}) {
  return (
    <div style={{ background: "white", borderBottom: "1px solid #F1F5F9", flexShrink: 0, zIndex: 25 }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 16px 6px", height: 44,
      }}>
        <button onClick={onBack} style={{
          display: "flex", alignItems: "center", gap: 2,
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <ChevronLeft size={20} color="#0E56FA" strokeWidth={2.5} />
          <span style={{ fontSize: 15, fontWeight: 500, color: "#0E56FA", letterSpacing: "-0.02em" }}>Guide</span>
        </button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#020818", letterSpacing: "-0.02em" }}>Workspace</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#94a3b8" }}>Step 2 of 3</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              width: i === 3 ? 14 : 6, height: 6, borderRadius: 99,
              background: i <= 3 ? "#0E56FA" : "#E2E8F0",
            }} />
          ))}
        </div>
      </div>
      <div style={{ padding: "0 16px 10px" }}>
        <div style={{
          display: "flex", background: "rgba(120,120,128,0.12)", borderRadius: 10, padding: 2, gap: 2,
        }}>
          {LEVELS.map(opt => {
            const active = level === opt.id;
            return (
              <button key={opt.id} onClick={() => onLevelChange(opt.id)} style={{
                flex: 1, padding: "6px 4px", borderRadius: 8,
                border: "none",
                background: active ? "white" : "transparent",
                color: active ? "#020818" : "#64748b",
                fontSize: 12, fontWeight: active ? 700 : 500, cursor: "pointer",
                boxShadow: active ? "0 1px 4px rgba(0,0,0,0.15)" : "none",
                transition: "all 0.18s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              }}>
                <span style={{ fontSize: 13 }}>{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CVCanvas3({ stageIndex, activeSection, onSectionTap }: {
  stageIndex: number;
  activeSection: string;
  onSectionTap: (s: string) => void;
}) {
  const activeBullet = STAGED_BULLETS[Math.min(stageIndex, 3)];

  function SectionWrapper({ id, children }: { id: string; children: React.ReactNode }) {
    const isActive = id === activeSection;
    return (
      <div onClick={() => onSectionTap(id)} style={{
        borderRadius: 10, padding: "10px 12px",
        border: isActive ? "1.5px solid #0E56FA" : "1.5px solid transparent",
        background: isActive ? "rgba(14,86,250,0.035)" : "transparent",
        opacity: !isActive ? 0.38 : 1,
        cursor: "pointer", transition: "all 0.22s", marginBottom: 2,
        filter: !isActive ? "grayscale(0.3)" : "none",
        position: "relative",
      }}>
        {isActive && (
          <div style={{
            position: "absolute", top: -10, right: 8,
            background: "#0E56FA", color: "white",
            fontSize: 8, fontWeight: 800, padding: "2px 7px",
            borderRadius: 99, letterSpacing: "0.06em", textTransform: "uppercase",
          }}>Active</div>
        )}
        {children}
      </div>
    );
  }

  return (
    <div style={{ padding: "0 10px 20px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: "5px 10px", borderRadius: 99,
        background: "white", border: "1px solid #E2E8F0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        marginBottom: 12, width: "fit-content",
      }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#0E56FA" }} />
        <span style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>Tap any section to explore</span>
      </div>

      <div style={{
        background: "white", borderRadius: 12, border: "1px solid #E2E8F0",
        overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <div style={{ height: 3, background: "linear-gradient(90deg, #020818, #0E56FA)" }} />
        <div style={{ padding: "14px 14px 18px", display: "flex", flexDirection: "column", gap: 4 }}>

          <SectionWrapper id="header">
            <div style={{ fontSize: 15, fontWeight: 800, color: "#020818", letterSpacing: "-0.04em", marginBottom: 2 }}>Alex Johnson</div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 5 }}>Product Manager · B2B SaaS</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ icon: Mail, text: "alex.j@gmail.com" }, { icon: MapPin, text: "London, UK" }].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Icon size={8} color="#94a3b8" />
                  <span style={{ fontSize: 9, color: "#94a3b8" }}>{text}</span>
                </div>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="summary">
            <div style={{ fontSize: 8, fontWeight: 800, color: "#0E56FA", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              Summary <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
            </div>
            <p style={{ fontSize: 9.5, color: "#334155", lineHeight: 1.55, margin: 0 }}>
              Data-driven PM with 2+ years building B2B SaaS. Track record of increasing retention{" "}
              <span style={{ color: "#16a34a", fontWeight: 700 }}>23%</span>.
            </p>
          </SectionWrapper>

          <SectionWrapper id="experience">
            <div style={{ fontSize: 8, fontWeight: 800, color: "#0E56FA", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7, display: "flex", alignItems: "center", gap: 6 }}>
              Experience <div style={{ flex: 1, height: 1, background: "rgba(14,86,250,0.2)" }} />
            </div>
            <div style={{
              padding: "5px 8px", borderRadius: 7,
              background: stageIndex === 0 ? "#FFF5F5" : stageIndex === 3 ? "rgba(22,163,74,0.04)" : "rgba(14,86,250,0.04)",
              border: `1px solid ${stageIndex === 0 ? "#FECACA" : stageIndex === 3 ? "#BBF7D0" : "#BFDBFE"}`,
              marginBottom: 7,
            }}>
              <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: "0.05em", color: stageIndex === 0 ? "#ef4444" : stageIndex === 3 ? "#16a34a" : "#0E56FA", textTransform: "uppercase", marginBottom: 2 }}>
                {stageIndex === 0 ? "❌ Weak" : stageIndex === 3 ? "✅ HR-Ready" : "✏️ Improving..."}
              </div>
              <div style={{ fontSize: 9, color: "#334155", lineHeight: 1.5 }}>{renderHighlighted(activeBullet)}</div>
            </div>
            <div style={{ borderLeft: "2px solid #BFDBFE", paddingLeft: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#020818" }}>Product Manager <span style={{ color: "#64748b", fontWeight: 400 }}>· TechCorp</span></span>
                <span style={{ fontSize: 8, color: "#CBD5E1" }}>2022–Now</span>
              </div>
              {["Led 5-eng team → ↓drop-off 23%", "Shipped 3 features, 50K+ MAU", "NPS 34→61"].map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 4, alignItems: "flex-start", marginTop: 2 }}>
                  <span style={{ fontSize: 8, color: "#0E56FA", fontWeight: 800, marginTop: 1 }}>▸</span>
                  <span style={{ fontSize: 9, color: "#334155" }}>{b}</span>
                </div>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="projects">
            <div style={{ fontSize: 8, fontWeight: 800, color: "#0E56FA", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              Projects <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
            </div>
            <div style={{ borderLeft: "2px solid #E2E8F0", paddingLeft: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#020818" }}>AI-Powered Onboarding</span>
              <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                <span style={{ fontSize: 8, color: "#CBD5E1", fontWeight: 800 }}>▸</span>
                <span style={{ fontSize: 9, color: "#334155" }}>↑D7 retention <span style={{ color: "#16a34a", fontWeight: 700 }}>14%</span></span>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}

function WsMentorCard() {
  return (
    <div style={{ borderRadius: 14, border: "1px solid #E8EDF5", background: "white", padding: "12px 14px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #E2E8F0" }}>
          <img src={AVATAR_MAN} alt="Marcus Lee" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#020818", letterSpacing: "-0.02em" }}>Marcus Lee</span>
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "2px 8px 2px 5px", borderRadius: 6,
              background: COMPANY_BADGE.bg, boxShadow: `0 2px 8px ${COMPANY_BADGE.bg}50`,
            }}>
              <Building2 size={9} color={COMPANY_BADGE.fg} strokeWidth={2.5} />
              <span style={{ fontSize: 9, fontWeight: 800, color: COMPANY_BADGE.fg, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {COMPANY_BADGE.name}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 10.5, color: "#64748b" }}>Tech Lead</span>
            <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "1px 6px", borderRadius: 99, background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a" }} />
              <span style={{ fontSize: 8, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.04em" }}>Verified</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "#FAFBFF", border: "1px solid #F1F5F9", borderRadius: 10, padding: "10px 12px 10px 16px", position: "relative" }}>
        <span style={{ position: "absolute", top: 2, left: 7, fontSize: 22, color: "#BFDBFE", lineHeight: 1, fontFamily: "Georgia, serif" }}>"</span>
        <p style={{ fontSize: 12, color: "#334155", lineHeight: 1.65, margin: 0, paddingTop: 10, fontStyle: "italic", letterSpacing: "-0.01em" }}>
          I scan for data-driven results in 6 seconds. Show me the numbers.
        </p>
      </div>
    </div>
  );
}

function WsChecklist({ checks, onChange, feedback, onFeedback }: {
  checks: [boolean, boolean, boolean];
  onChange: (c: [boolean, boolean, boolean]) => void;
  feedback: "helpful" | "love" | null;
  onFeedback: (v: "helpful" | "love" | null) => void;
}) {
  const stageIndex = checks.filter(Boolean).length;
  const handleToggle = (i: number) => {
    const next = [...checks] as [boolean, boolean, boolean];
    if (checks[i]) { for (let j = i; j < 3; j++) next[j] = false; }
    else { for (let j = 0; j <= i; j++) next[j] = true; }
    onChange(next);
    trackEvent("checklist_toggled", { item_index: i, is_checked: next[i], total_checked: next.filter(Boolean).length });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(14,86,250,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Check size={11} color="#0E56FA" strokeWidth={3} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#020818", letterSpacing: "-0.02em" }}>Self-Audit Checklist</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ display: "flex", gap: 2.5 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 7, height: 7, borderRadius: 2, background: checks[i] ? "#16a34a" : "#E2E8F0", transition: "background 0.3s" }} />
            ))}
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: stageIndex === 3 ? "#16a34a" : "#94a3b8" }}>{stageIndex}/3</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {WS_CHECKLIST.map((item, i) => {
          const done = checks[i];
          const enabled = i === 0 || checks[i - 1];
          return (
            <motion.button key={i} onClick={() => enabled && handleToggle(i)} whileTap={enabled ? { scale: 0.98 } : {}} style={{
              display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px",
              borderRadius: 12,
              border: `1.5px solid ${done ? "#BBF7D0" : enabled ? "#E8EDF5" : "#F1F5F9"}`,
              background: done ? "#F0FDF4" : "white",
              cursor: enabled ? "pointer" : "not-allowed",
              textAlign: "left", width: "100%", opacity: enabled ? 1 : 0.4,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                border: `2px solid ${done ? "#16a34a" : "#CBD5E1"}`,
                background: done ? "#16a34a" : "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
                <AnimatePresence>
                  {done ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.14, type: "spring", stiffness: 600 }}>
                      <Check size={12} color="white" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8" }}>{i + 1}</span>
                  )}
                </AnimatePresence>
              </div>
              <div style={{ flex: 1, paddingTop: 2 }}>
                <span style={{
                  fontSize: 12.5, color: done ? "#16a34a" : "#334155",
                  fontWeight: done ? 600 : 400,
                  textDecoration: done ? "line-through #86EFAC" : "none",
                  letterSpacing: "-0.01em", lineHeight: 1.45, display: "block",
                }}>
                  {item}
                </span>
                <AnimatePresence>
                  {done && (
                    <motion.span initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 3, marginTop: 3, fontSize: 9.5, fontWeight: 700, color: "#16a34a", background: "#DCFCE7", border: "1px solid #BBF7D0", padding: "1px 6px", borderRadius: 99 }}>
                      <Wand2 size={8} strokeWidth={2.5} />Applied to CV ✓
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, marginTop: 6, borderTop: "1px solid #F1F5F9" }}>
        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Was this helpful?</span>
        <div style={{ display: "flex", gap: 6 }}>
          {(["helpful", "love"] as const).map(type => (
            <motion.button key={type} whileTap={{ scale: 0.9 }}
              onClick={() => onFeedback(feedback === type ? null : type)}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                padding: "5px 11px", borderRadius: 99,
                border: `1.5px solid ${feedback === type ? (type === "helpful" ? "#0E56FA" : "#dc2626") : "#E2E8F0"}`,
                background: feedback === type ? (type === "helpful" ? "rgba(14,86,250,0.07)" : "rgba(220,38,38,0.07)") : "white",
                color: feedback === type ? (type === "helpful" ? "#0E56FA" : "#dc2626") : "#64748b",
                fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.18s",
              }}>
              {type === "helpful" ? <ThumbsUp size={12} strokeWidth={2.5} /> : <Heart size={12} strokeWidth={2.5} fill={feedback === "love" ? "#dc2626" : "none"} />}
              {type === "helpful" ? "👍" : "❤️"}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WsAIPromptBox({ allChecked, stageIndex }: { allChecked: boolean; stageIndex: number }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ borderRadius: 16, position: "relative", overflow: "hidden", padding: "16px",
      background: allChecked ? "linear-gradient(135deg,rgba(14,86,250,0.05),rgba(109,40,217,0.06))" : "linear-gradient(135deg,rgba(148,163,184,0.06),rgba(203,213,225,0.1))",
      transition: "background 0.5s",
    }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16, padding: 1.5,
        background: allChecked ? "linear-gradient(135deg,rgba(14,86,250,0.4),rgba(109,40,217,0.4))" : "linear-gradient(135deg,rgba(148,163,184,0.3),rgba(203,213,225,0.25))",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
        pointerEvents: "none", transition: "background 0.5s",
      }} />
      {!allChecked ? (
        <div style={{ textAlign: "center", padding: "4px 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#F1F5F9,#E2E8F0)", marginBottom: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
            <Lock size={20} color="#94a3b8" strokeWidth={2} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#020818", letterSpacing: "-0.02em", marginBottom: 5 }}>🔒 AI Prompt — Locked</div>
          <p style={{ fontSize: 11.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
            Tick <strong style={{ color: "#0E56FA" }}>3/3 boxes</strong> above to unlock the your AI rewrite prompt.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99, background: "rgba(14,86,250,0.08)", border: "1px solid rgba(14,86,250,0.15)" }}>
            <div style={{ display: "flex", gap: 3 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i < stageIndex ? "#16a34a" : i === stageIndex ? "#0E56FA" : "#E2E8F0", transition: "background 0.3s" }} />
              ))}
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#0E56FA" }}>{stageIndex}/3 Completed</span>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, type: "spring" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
            <Sparkles size={14} color="#6d28d9" strokeWidth={2} />
            <span style={{ fontSize: 13, fontWeight: 800, color: "#020818", letterSpacing: "-0.02em" }}>AI Prompt Unlocked!</span>
            <span style={{ fontSize: 8.5, fontWeight: 800, padding: "2px 7px", borderRadius: 99, background: "#16a34a", color: "white", textTransform: "uppercase" }}>✓ Unlocked</span>
          </div>
          <p style={{ fontSize: 11.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 12px" }}>Copy to your AI for an HR-approved XYZ format rewrite.</p>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => { 
            setCopied(true); 
            trackEvent("prompt_copied");
            setTimeout(() => setCopied(false), 2200); 
          }} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            padding: "10px 20px", width: "100%", borderRadius: 12, border: "none",
            background: copied ? "#16a34a" : "#0E56FA", color: "white",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            boxShadow: copied ? "0 4px 14px rgba(22,163,74,0.4)" : "0 4px 14px rgba(14,86,250,0.4)",
            transition: "background 0.2s", letterSpacing: "-0.01em",
          }}>
            {copied ? <><CheckCheck size={14} />Copied! Paste to your AI →</> : <><Sparkles size={14} />✨ Copy AI Prompt</>}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

function WsBottomSheet({ checks, onChecksChange, feedback, onFeedback, stageIndex }: {
  checks: [boolean, boolean, boolean];
  onChecksChange: (c: [boolean, boolean, boolean]) => void;
  feedback: "helpful" | "love" | null;
  onFeedback: (v: "helpful" | "love" | null) => void;
  stageIndex: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const allChecked = stageIndex === 3;
  return (
    <motion.div
      animate={{ height: expanded ? "93%" : "62%" }}
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
      style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "white", borderRadius: "24px 24px 0 0",
        boxShadow: "0 -8px 40px rgba(2,8,24,0.12), 0 -2px 8px rgba(2,8,24,0.06)",
        display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 20,
      }}
    >
      <div onClick={() => setExpanded(!expanded)} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0 0", cursor: "pointer", flexShrink: 0 }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: "#E2E8F0", marginBottom: 12 }} />
      </div>
      <div style={{ padding: "0 18px 12px", borderBottom: "1px solid #F1F5F9", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ padding: "3px 10px", borderRadius: 99, background: "rgba(14,86,250,0.08)", border: "1px solid rgba(14,86,250,0.15)" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#0E56FA", letterSpacing: "0.05em", textTransform: "uppercase" }}>Experience</span>
            </div>
            
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setExpanded(!expanded)} style={{
            width: 28, height: 28, borderRadius: 8, background: "#F8FAFC", border: "1px solid #E2E8F0",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.22 }}>
              <ChevronDown size={16} color="#64748b" strokeWidth={2.5} />
            </motion.div>
          </motion.button>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#020818", letterSpacing: "-0.04em", margin: "8px 0 0" }}>Mastering Experience</h2>
      </div>
      <div 
        onScroll={(e) => handleScrollDepthTracking(e, "MobilePreview_BottomSheet")}
        style={{ flex: 1, overflowY: "auto", padding: "16px 18px 20px" }}
      >
        <style>{`.ws-scroll::-webkit-scrollbar { width: 0; }`}</style>
        <div className="ws-scroll" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <WsMentorCard />
          <WsChecklist checks={checks} onChange={onChecksChange} feedback={feedback} onFeedback={onFeedback} />
          <WsAIPromptBox allChecked={allChecked} stageIndex={stageIndex} />
          <div style={{ height: 28 }} />
        </div>
      </div>
    </motion.div>
  );
}

function Screen3({
  level, onLevelChange, onBack,
}: {
  level: DiagnosticLevel;
  onLevelChange: (l: DiagnosticLevel) => void;
  onBack: () => void;
}) {
  const [activeSection, setActiveSection] = useState("experience");
  const [wsChecks, setWsChecks] = useState<[boolean, boolean, boolean]>([true, false, false]);
  const [wsFeedback, setWsFeedback] = useState<"helpful" | "love" | null>(null);
  const stageIndex = wsChecks.filter(Boolean).length;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#FAFBFF" }}>
      <StatusBar />
      <WorkspaceNavHeader level={level} onLevelChange={onLevelChange} onBack={onBack} />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, overflowY: "auto", paddingBottom: "64%" }}>
          <CVCanvas3 stageIndex={stageIndex} activeSection={activeSection} onSectionTap={setActiveSection} />
        </div>
        <WsBottomSheet checks={wsChecks} onChecksChange={setWsChecks} feedback={wsFeedback} onFeedback={setWsFeedback} stageIndex={stageIndex} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  iPhone 15 Pro Frame
// ═══════════════════════════════════════════════════════════════════════════════

function IPhone15ProFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{
        width: 393, height: 852, borderRadius: 54,
        background: "linear-gradient(145deg,#D4D3D3 0%,#9B9B9B 20%,#C5C5C5 40%,#7E7E7E 60%,#B2B2B2 80%,#9A9A9A 100%)",
        padding: 3,
        boxShadow: "0 0 0 0.5px rgba(255,255,255,0.25) inset, 0 60px 120px rgba(0,0,0,0.55), 0 24px 48px rgba(0,0,0,0.35)",
        position: "relative",
      }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 52, overflow: "hidden", background: "#FAFBFF", position: "relative" }}>
          {children}
          <div style={{
            position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
            width: 126, height: 37, borderRadius: 20, background: "#000",
            zIndex: 100, boxShadow: "0 0 0 0.5px rgba(255,255,255,0.08)",
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 40%,rgba(255,255,255,0.02) 100%)", pointerEvents: "none", zIndex: 200, borderRadius: 52 }} />
        </div>
        <div style={{ position: "absolute", left: -3, top: 128, width: 3.5, height: 30, background: "rgba(90,90,90,0.95)", borderRadius: "3px 0 0 3px" }} />
        <div style={{ position: "absolute", left: -3, top: 172, width: 3.5, height: 52, background: "rgba(90,90,90,0.95)", borderRadius: "3px 0 0 3px" }} />
        <div style={{ position: "absolute", left: -3, top: 238, width: 3.5, height: 52, background: "rgba(90,90,90,0.95)", borderRadius: "3px 0 0 3px" }} />
        <div style={{ position: "absolute", right: -3, top: 190, width: 3.5, height: 76, background: "rgba(90,90,90,0.95)", borderRadius: "0 3px 3px 0" }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Annotation data per screen
// ═══════════════════════════════════════════════════════════════════════════════

const SCREEN_META = {
  1: {
    title: "Screen 1 — Role Selection",
    desc: "iPhone 15 Pro · 393 × 852 · Accordion Interaction",
    left: [
      { color: "#0E56FA", label: "Status Bar", desc: "iOS native" },
      { color: "#0E56FA", label: "Brand Nav", desc: "Logo + step dots" },
      { color: "#7c3aed", label: "Step Pill", desc: "STEP 1 OF 4" },
      { color: "#16a34a", label: "Heading", desc: "Where are you heading?" },
      { color: "#F59E0B", label: "Accordion Cards", desc: "4 pillars, tap to expand" },
    ],
    right: [
      { color: "#7c3aed", label: "Expanded Card", desc: "Purple accent state" },
      { color: "#0E56FA", label: "Role Pills", desc: "Tap to select — wrapping" },
      { color: "#16a34a", label: "Selected Role", desc: "Solid fill, white text" },
      { color: "#F59E0B", label: "Collapsed Cards", desc: "Gray icon, chevron right" },
      { color: "#0E56FA", label: "Sticky CTA", desc: "Status + Next Step →" },
    ],
  },
  2: {
    title: "Screen 2 — Level Diagnostic",
    desc: "iPhone 15 Pro · 393 × 852 · Sticky Progress Bar",
    left: [
      { color: "#0E56FA", label: "Brand Nav", desc: "Back + step 2 dots" },
      { color: "#7c3aed", label: "Step Pill", desc: "STEP 2 OF 4" },
      { color: "#0E56FA", label: "Title", desc: "Sticky sub-header" },
      { color: "#F59E0B", label: "Progress Bar", desc: "Beginner→Middle→Expert" },
      { color: "#EC4899", label: "Alert Banner", desc: "3/5 checked · Middle" },
    ],
    right: [
      { color: "#0E56FA", label: "Checked Card", desc: "Blue border + checkmark" },
      { color: "#94a3b8", label: "Unchecked Card", desc: "Gray neutral state" },
      { color: "#F59E0B", label: "Number Badge", desc: "01–05 indexed" },
      { color: "#16a34a", label: "Back Button", desc: "Ghost style ←" },
      { color: "#0E56FA", label: "Enter Workspace", desc: "Full CTA →" },
    ],
  },
  3: {
    title: "Screen 3 — Workspace",
    desc: "iPhone 15 Pro · 393 × 852 · Scrollable Canvas + Bottom Sheet",
    left: [
      { color: "#0E56FA", label: "Level Switcher", desc: "Segmented control (iOS)" },
      { color: "#7c3aed", label: "CV Canvas", desc: "Scrollable, dimmed on tap" },
      { color: "#16a34a", label: "Active Section", desc: "Blue border + Active badge" },
      { color: "#F59E0B", label: "Live Evolution", desc: "Bullet transforms on tick" },
    ],
    right: [
      { color: "#F59E0B", label: "Bottom Sheet", desc: "62% peek → 93% expanded" },
      { color: "#EC4899", label: "Drag Handle", desc: "Tap to expand/collapse" },
      { color: "#0E56FA", label: "Mentor Card", desc: "Avatar + Google badge" },
      { color: "#16a34a", label: "Checklist", desc: "3-step live evolution" },
      { color: "#7c3aed", label: "AI Prompt Box", desc: "Unlocks after 3/3 ✓" },
    ],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
//  Main Export — Mobile Workspace Preview (Full page)
// ═══════════════════════════════════════════════════════════════════════════════

export function MobileWorkspacePreview({ onBack }: { onBack: () => void }) {
  const [mobileStep, setMobileStep] = useState<1 | 2 | 3>(1);
  const [selectedPillar, setSelectedPillar] = useState<PillarId | null>("product");
  const [selectedRole, setSelectedRole] = useState<string | null>("Product Manager");
  const [diagChecks, setDiagChecks] = useState<boolean[]>([true, true, true, false, false]);
  const [wsLevel, setWsLevel] = useState<DiagnosticLevel>("developing");
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  const handleLevelChange = (newLevel: DiagnosticLevel) => {
    setWsLevel(newLevel);
    trackEvent("level_switched", { level: newLevel, context: "mobile" });
  };

  const goTo = (step: 1 | 2 | 3) => {
    setSlideDir(step > mobileStep ? 1 : -1);
    setMobileStep(step);
  };

  const meta = SCREEN_META[mobileStep];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #020818 0%, #0a1628 50%, #020818 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      WebkitFontSmoothing: "antialiased",
      position: "relative", overflow: "auto",
      padding: "28px 24px 48px",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "linear-gradient(rgba(14,86,250,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,86,250,0.04) 1px,transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      {/* Top bar */}
      <div style={{
        width: "100%", maxWidth: 940,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 28, position: "relative", zIndex: 10, flexShrink: 0,
      }}>
        <button onClick={onBack} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 16px", borderRadius: 10,
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600, cursor: "pointer",
          letterSpacing: "-0.01em",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.13)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}
        >
          <ArrowLeft size={15} strokeWidth={2.5} />
          Back to Desktop
        </button>

        {/* Center */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 5 }}>
            <div style={{ padding: "3px 10px", borderRadius: 99, background: "rgba(14,86,250,0.25)", border: "1px solid rgba(14,86,250,0.4)" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#60A5FA", letterSpacing: "0.08em", textTransform: "uppercase" }}>📱 Mobile Preview</span>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.h1 key={mobileStep} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              style={{ fontSize: 17, fontWeight: 800, color: "white", letterSpacing: "-0.04em", margin: 0 }}>
              {meta.title}
            </motion.h1>
          </AnimatePresence>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "3px 0 0", letterSpacing: "-0.01em" }}>
            {meta.desc}
          </p>
        </div>

        {/* Screen switcher tabs */}
        <div style={{
          display: "flex", gap: 4, padding: "4px",
          background: "rgba(255,255,255,0.06)", borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          {([1, 2, 3] as const).map(s => (
            <button key={s} onClick={() => goTo(s)} style={{
              padding: "6px 14px", borderRadius: 8,
              background: mobileStep === s ? "rgba(14,86,250,0.8)" : "transparent",
              color: mobileStep === s ? "white" : "rgba(255,255,255,0.5)",
              border: "none", fontSize: 11.5, fontWeight: 700, cursor: "pointer",
              letterSpacing: "-0.01em", transition: "all 0.18s",
            }}>
              S{s}
            </button>
          ))}
        </div>
      </div>

      {/* Phone + annotations */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 36, position: "relative", zIndex: 10, flexShrink: 0 }}>

        {/* Left annotations */}
        <div style={{ width: 190, display: "flex", flexDirection: "column", gap: 0, paddingTop: 80 }}>
          <AnimatePresence mode="wait">
            <motion.div key={`left-${mobileStep}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {meta.left.map(({ color, label, desc }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 30 }}>
                  <div style={{ textAlign: "right", flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: "-0.01em" }}>{label}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{desc}</div>
                  </div>
                  <div style={{ width: 24, height: 1, background: `${color}60`, flexShrink: 0 }} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The iPhone */}
        <IPhone15ProFrame>
          <AnimatePresence mode="wait">
            <motion.div
              key={`screen-${mobileStep}`}
              initial={{ opacity: 0, x: slideDir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDir * -40 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0 }}
            >
              {mobileStep === 1 && (
                <Screen1
                  selectedPillar={selectedPillar}
                  setSelectedPillar={setSelectedPillar}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                  onNext={() => goTo(2)}
                />
              )}
              {mobileStep === 2 && (
                <Screen2
                  checks={diagChecks}
                  setChecks={setDiagChecks}
                  onBack={() => goTo(1)}
                  onNext={() => {
                    const n = diagChecks.filter(Boolean).length;
                    setWsLevel(n <= 1 ? "starter" : n <= 3 ? "developing" : "ready");
                    goTo(3);
                  }}
                />
              )}
              {mobileStep === 3 && (
                <Screen3
                  level={wsLevel}
                  onLevelChange={handleLevelChange}
                  onBack={() => goTo(2)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </IPhone15ProFrame>

        {/* Right annotations */}
        <div style={{ width: 190, display: "flex", flexDirection: "column", gap: 0, paddingTop: mobileStep === 3 ? 340 : 200 }}>
          <AnimatePresence mode="wait">
            <motion.div key={`right-${mobileStep}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {meta.right.map(({ color, label, desc }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 30 }}>
                  <div style={{ width: 24, height: 1, background: `${color}60`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: "-0.01em" }}>{label}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Flow navigator */}
      <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 10, flexShrink: 0 }}>
        {([1, 2, 3] as const).map((s, idx) => (
          <React.Fragment key={s}>
            <button onClick={() => goTo(s)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 16px", borderRadius: 10,
              background: mobileStep === s ? "rgba(14,86,250,0.25)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${mobileStep === s ? "rgba(14,86,250,0.5)" : "rgba(255,255,255,0.08)"}`,
              color: mobileStep === s ? "#60A5FA" : "rgba(255,255,255,0.45)",
              fontSize: 11.5, fontWeight: mobileStep === s ? 700 : 500, cursor: "pointer",
              transition: "all 0.18s",
            }}>
              {s === 1 ? "🎯 Role Selection" : s === 2 ? "📊 Diagnostic" : "⚡ Workspace"}
            </button>
            {idx < 2 && <ChevronRight size={12} color="rgba(255,255,255,0.2)" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
