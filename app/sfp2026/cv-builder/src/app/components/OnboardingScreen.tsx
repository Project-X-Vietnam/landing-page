import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  UploadCloud, Link2, LayoutTemplate, ArrowRight, CheckCircle2,
  LayoutGrid, Cpu, Code2, BarChart3,
} from "lucide-react";
import { ExperienceLevel, FormatChoice, CareerTrack } from "../types";

interface Props {
  selectedLevel: ExperienceLevel | null;
  onSelectLevel: (l: ExperienceLevel) => void;
  selectedTrack: CareerTrack | null;
  onSelectTrack: (t: CareerTrack) => void;
  selectedFormat: FormatChoice | null;
  onSelectFormat: (f: FormatChoice) => void;
  onEnter: () => void;
}

const LEVELS: { id: ExperienceLevel; label: string; note: string }[] = [
  { id: "beginner", label: "Beginner", note: "0–2 yrs" },
  { id: "mid", label: "Mid-Level", note: "2–5 yrs" },
  { id: "expert", label: "Expert", note: "5+ yrs" },
];

const TRACKS: {
  id: CareerTrack; icon: React.ElementType;
  name: string; desc: string; color: string; bg: string;
}[] = [
  { id: "pm", icon: LayoutGrid, name: "Product Manager", desc: "Roadmaps · OKRs · PRDs", color: "#6D28D9", bg: "#F5F3FF" },
  { id: "aiml", icon: Cpu, name: "AI / ML Engineer", desc: "Models · Pipelines · Research", color: "#0284C7", bg: "#EFF6FF" },
  { id: "swe", icon: Code2, name: "Software Engineer", desc: "Systems · APIs · Architecture", color: "#059669", bg: "#F0FDF4" },
  { id: "da", icon: BarChart3, name: "Data / BA Analyst", desc: "SQL · Insights · Dashboards", color: "#D97706", bg: "#FFFBEB" },
];

const FORMATS: { id: FormatChoice; icon: React.ElementType; title: string; desc: string }[] = [
  { id: "upload", icon: UploadCloud, title: "Upload Existing PDF", desc: "Analyse your current CV" },
  { id: "portfolio", icon: Link2, title: "Link Portfolio", desc: "Pull from your online presence" },
  { id: "blank", icon: LayoutTemplate, title: "Start with Blank Skeleton", desc: "Recruiter-validated template" },
];

// ── Miniature document graphic (right panel) ──────────────────────
function DocumentGraphic() {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "#ECEEF2" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #C8CDD8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.55,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
        style={{
          width: 248, background: "#ffffff", borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 4px 28px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <div style={{ height: 2, background: "#020818" }} />
        <div style={{ padding: "20px 20px 24px" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ height: 11, width: 128, background: "#1e293b", borderRadius: 6, marginBottom: 8 }} />
            <div style={{ height: 7, width: 84, background: "#CBD5E1", borderRadius: 4, marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 6 }}>
              {[58, 46, 64].map((w, i) => (
                <div key={i} style={{ height: 16, width: w, background: "#F1F5F9", borderRadius: 4, border: "1px solid #E2E8F0" }} />
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 18, opacity: 0.28 }}>
            <div style={{ height: 5, width: 52, background: "#94a3b8", borderRadius: 99, marginBottom: 9 }} />
            {[100, 84, 66].map((w, i) => (
              <div key={i} style={{ height: 5, width: `${w}%`, background: "#E2E8F0", borderRadius: 99, marginBottom: 6 }} />
            ))}
          </div>
          <div style={{ paddingLeft: 10, borderLeft: "2px solid #0E56FA", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <div style={{ height: 5, width: 58, background: "#0E56FA", borderRadius: 99, opacity: 0.8 }} />
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.06em", padding: "1px 5px", borderRadius: 99, background: "#EEF2FF", color: "#0E56FA", fontFamily: "Inter, sans-serif" }}>
                ACTIVE
              </div>
            </div>
            <div style={{ height: 8, width: "78%", background: "#334155", borderRadius: 4, marginBottom: 8 }} />
            {[100, 90, 78, 94].map((w, i) => (
              <div key={i} style={{ height: 5, width: `${w}%`, background: i === 0 ? "#CBD5E1" : "#E2E8F0", borderRadius: 99, marginBottom: 5 }} />
            ))}
          </div>
          <div style={{ opacity: 0.28 }}>
            <div style={{ height: 5, width: 52, background: "#94a3b8", borderRadius: 99, marginBottom: 9 }} />
            {[100, 74, 58].map((w, i) => (
              <div key={i} style={{ height: 5, width: `${w}%`, background: "#E2E8F0", borderRadius: 99, marginBottom: 5 }} />
            ))}
          </div>
        </div>
      </motion.div>

      {[
        { label: "↗ 3× more callbacks", delay: 0.5, top: "24%", right: "10%", bg: "white", color: "#020818", border: "#E2E8F0" },
        { label: "ATS-Optimised ✓", delay: 0.65, bottom: "22%", left: "8%", bg: "#020818", color: "white", border: "transparent" },
      ].map((chip, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i === 0 ? 16 : -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: chip.delay, duration: 0.3 }}
          style={{
            position: "absolute", ...(chip.top ? { top: chip.top } : { bottom: chip.bottom }),
            ...(chip.right ? { right: chip.right } : { left: chip.left }),
            padding: "7px 11px", background: chip.bg, border: `1px solid ${chip.border}`,
            borderRadius: 8, fontSize: 11, fontWeight: 600, color: chip.color,
            boxShadow: "0 2px 10px rgba(0,0,0,0.07)", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap",
          }}
        >
          {chip.label}
        </motion.div>
      ))}
    </div>
  );
}

// ── Main portal screen ────────────────────────────────────────────
export function OnboardingScreen({
  selectedLevel, onSelectLevel,
  selectedTrack, onSelectTrack,
  selectedFormat, onSelectFormat,
  onEnter,
}: Props) {
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const canEnter = selectedLevel !== null && selectedTrack !== null && selectedFormat !== null;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FAFBFF" }}>
      {/* ── LEFT: Content ── */}
      <div className="flex flex-col justify-center w-full lg:w-[54%] px-10 md:px-14 xl:px-20 py-12 overflow-y-auto">

        {/* Brand + step indicator */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#020818" }}>
              <span className="text-white font-black tracking-tighter" style={{ fontSize: 10 }}>CV</span>
            </div>
            <span className="text-sm font-semibold" style={{ color: "#020818" }}>Survival Kit</span>
          </div>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-md border" style={{ borderColor: "#E2E8F0", color: "#94a3b8" }}>
            Step 1 of 2
          </span>
        </div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-9">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest mb-4 px-2.5 py-1 rounded" style={{ background: "rgba(14,86,250,0.07)", color: "#0E56FA", border: "1px solid rgba(14,86,250,0.12)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0E56FA" }} />
            Career Tools · 2026
          </div>
          <h1 className="mb-3" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#020818" }}>
            Build Your Application.<br />
            <span style={{ color: "#0E56FA" }}>Without the Guesswork.</span>
          </h1>
          <p className="text-base" style={{ color: "#64748b", lineHeight: 1.6 }}>
            Tell us where you are. We'll set up a recruiter-calibrated workspace for your exact stage.
          </p>
        </motion.div>

        {/* ── Step 01: Level ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.06 }} className="mb-6">
          <StepLabel n="01" label="Select Level" />
          <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
            {LEVELS.map((l, i) => (
              <button key={l.id} onClick={() => onSelectLevel(l.id)}
                className="flex-1 flex flex-col items-center py-2.5 text-sm transition-all duration-150"
                style={{ borderLeft: i > 0 ? "1px solid #E2E8F0" : "none", background: selectedLevel === l.id ? "#020818" : "transparent", color: selectedLevel === l.id ? "#fff" : "#64748b", fontWeight: selectedLevel === l.id ? 600 : 400 }}>
                <span>{l.label}</span>
                <span style={{ fontSize: 10, marginTop: 1, color: selectedLevel === l.id ? "rgba(255,255,255,0.5)" : "#CBD5E1" }}>{l.note}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Step 02: Track ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="mb-6">
          <StepLabel n="02" label="Select Your Track" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {TRACKS.map((t) => {
              const Icon = t.icon;
              const active = selectedTrack === t.id;
              return (
                <button key={t.id} onClick={() => onSelectTrack(t.id)}
                  style={{ padding: "12px", borderRadius: 12, border: `1px solid ${active ? t.color : "#E2E8F0"}`, background: active ? t.bg : "white", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: active ? t.color : "#F8FAFC", border: active ? "none" : "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon style={{ width: 14, height: 14, color: active ? "white" : "#94a3b8" }} />
                    </div>
                    {active && <span style={{ fontSize: 9, fontWeight: 700, color: t.color }}>✓</span>}
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#020818", marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontSize: 10, color: "#94a3b8" }}>{t.desc}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Step 03: Format ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.14 }} className="mb-8">
          <StepLabel n="03" label="Import Format" />
          <div className="flex flex-col gap-2">
            {FORMATS.map((f) => {
              const Icon = f.icon;
              const active = selectedFormat === f.id;
              return (
                <div key={f.id}>
                  <button onClick={() => onSelectFormat(f.id)}
                    className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all duration-150"
                    style={{ border: `1px solid ${active ? "#020818" : "#E2E8F0"}`, background: active ? "#FAFBFF" : "white" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: active ? "#020818" : "#F8FAFC", border: active ? "none" : "1px solid #E2E8F0" }}>
                      <Icon className="w-4 h-4" style={{ color: active ? "#fff" : "#94a3b8" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold" style={{ color: active ? "#020818" : "#334155" }}>{f.title}</div>
                      <div className="text-xs mt-0.5 truncate" style={{ color: "#94a3b8" }}>{f.desc}</div>
                    </div>
                    {active ? <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#020818" }} /> : <ArrowRight className="w-3.5 h-3.5 shrink-0" style={{ color: "#E2E8F0" }} />}
                  </button>
                  <AnimatePresence>
                    {f.id === "portfolio" && active && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden">
                        <div className="mt-1.5 px-1">
                          <input type="url" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} placeholder="https://your-portfolio.com" autoFocus
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg outline-none transition-all"
                            style={{ border: "1px solid #E2E8F0", color: "#020818", background: "white" }}
                            onFocus={(e) => { e.target.style.borderColor = "#0E56FA"; e.target.style.boxShadow = "0 0 0 3px rgba(14,86,250,0.08)"; }}
                            onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: 0.2 }}>
          <button onClick={onEnter} disabled={!canEnter}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-150"
            style={{ background: canEnter ? "#0E56FA" : "#E2E8F0", color: canEnter ? "#fff" : "#94a3b8", cursor: canEnter ? "pointer" : "not-allowed" }}>
            Enter Workspace
            <ArrowRight className="w-4 h-4" />
          </button>
          {!canEnter && (
            <p className="text-xs mt-2" style={{ color: "#CBD5E1" }}>
              {!selectedLevel ? "Select your level first" : !selectedTrack ? "Choose your track" : "Pick a starting format"}
            </p>
          )}
        </motion.div>
      </div>

      {/* ── RIGHT: Abstract Graphic ── */}
      <div className="hidden lg:block flex-1 relative">
        <DocumentGraphic />
      </div>
    </div>
  );
}

function StepLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2 mb-3">
      <span className="font-mono text-[11px]" style={{ color: "#CBD5E1" }}>{n}</span>
      <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#94a3b8" }}>{label}</span>
    </div>
  );
}
