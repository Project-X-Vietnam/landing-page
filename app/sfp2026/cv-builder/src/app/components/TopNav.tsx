import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  ChevronDown,
  LayoutGrid,
  BrainCircuit,
  Code2,
  BarChart3,
  Check,
} from "lucide-react";
import { ExperienceLevel, CareerTrack } from "../types";

// ── Data ───────────────────────────────────────────────────────────

const LEVELS: { id: ExperienceLevel; label: string; sub: string }[] = [
  { id: "beginner", label: "Beginner", sub: "0–2 yrs" },
  { id: "mid", label: "Mid-level", sub: "2–5 yrs" },
  { id: "expert", label: "Expert", sub: "5+ yrs" },
];

const TRACKS: {
  id: CareerTrack;
  name: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}[] = [
  { id: "pm", name: "Product Management", icon: LayoutGrid, color: "#6D28D9", bg: "#F5F3FF" },
  { id: "aiml", name: "AI / ML Engineering", icon: BrainCircuit, color: "#0284C7", bg: "#EFF6FF" },
  { id: "swe", name: "Software Engineering", icon: Code2, color: "#059669", bg: "#F0FDF4" },
  { id: "da", name: "Data & Business Analytics", icon: BarChart3, color: "#D97706", bg: "#FFFBEB" },
];

// ── Level Switcher (animated sliding pill) ──────────────────────────

function LevelSwitcher({
  level,
  onSetLevel,
}: {
  level: ExperienceLevel;
  onSetLevel: (l: ExperienceLevel) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#F1F5F9",
        borderRadius: 12,
        padding: 4,
        gap: 2,
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {LEVELS.map((l) => (
        <button
          key={l.id}
          onClick={() => onSetLevel(l.id)}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "7px 20px 6px",
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            background: "none",
            border: "none",
            color: level === l.id ? "white" : "#64748b",
            transition: "color 0.15s",
            zIndex: 1,
            outline: "none",
            lineHeight: 1.2,
            minWidth: 80,
          }}
        >
          {level === l.id && (
            <motion.div
              layoutId="levelPill"
              style={{
                position: "absolute",
                inset: 0,
                background: "#0E56FA",
                borderRadius: 9,
                zIndex: -1,
                boxShadow: "0 2px 12px rgba(14,86,250,0.35)",
              }}
              transition={{ type: "spring", stiffness: 450, damping: 38 }}
            />
          )}
          <span style={{ fontSize: 13, fontWeight: 600 }}>{l.label}</span>
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.04em",
              color: level === l.id ? "rgba(255,255,255,0.7)" : "#CBD5E1",
              marginTop: 1,
            }}
          >
            {l.sub}
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Track Dropdown ─────────────────────────────────────────────────

function TrackDropdown({
  track,
  onSelect,
}: {
  track: CareerTrack;
  onSelect: (t: CareerTrack) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        left: 0,
        background: "white",
        border: "1px solid #E2E8F0",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        minWidth: 240,
        zIndex: 200,
        overflow: "hidden",
        padding: 4,
      }}
    >
      {TRACKS.map((t) => {
        const Icon = t.icon;
        const isActive = track === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              width: "100%",
              padding: "9px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: isActive ? t.bg : "transparent",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              color: isActive ? t.color : "#334155",
              fontWeight: isActive ? 600 : 400,
              textAlign: "left",
              transition: "background 0.12s",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 7,
                background: isActive ? t.color : "#F1F5F9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={12} color={isActive ? "white" : "#94a3b8"} />
            </div>
            <span style={{ flex: 1 }}>{t.name}</span>
            {isActive && <Check size={12} color={t.color} />}
          </button>
        );
      })}
    </motion.div>
  );
}

// ── Main TopNav ─────────────────────────────────────────────────────

interface Props {
  level: ExperienceLevel;
  onSetLevel: (l: ExperienceLevel) => void;
  track: CareerTrack;
  onSetTrack: (t: CareerTrack) => void;
}

export function TopNav({ level, onSetLevel, track, onSetTrack }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentTrack = TRACKS.find((t) => t.id === track)!;
  const TrackIcon = currentTrack.icon;

  return (
    <nav
      style={{
        flexShrink: 0,
        height: 56,
        background: "white",
        borderBottom: "1px solid #F1F5F9",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        position: "relative",
        zIndex: 40,
        boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
      }}
    >
      {/* ── Left: Logo + Track ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
        {/* Project X Logo mark */}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: "#020818",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 6px rgba(2,8,24,0.25)",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: "-0.06em",
              lineHeight: 1,
            }}
          >
            X
          </span>
        </div>

        <div style={{ width: 1, height: 18, background: "#E2E8F0", flexShrink: 0 }} />

        {/* Track selector */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 6px",
              borderRadius: 7,
              transition: "background 0.12s",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                background: currentTrack.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <TrackIcon size={11} color={currentTrack.color} />
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#020818",
                letterSpacing: "-0.01em",
              }}
            >
              {currentTrack.name}
            </span>
            <ChevronDown
              size={13}
              color="#94a3b8"
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.15s",
              }}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <TrackDropdown
                track={track}
                onSelect={(t) => {
                  onSetTrack(t);
                  setDropdownOpen(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Center: Level Switcher (absolute centered) ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        <LevelSwitcher level={level} onSetLevel={onSetLevel} />
      </div>

      {/* ── Right: Download CV ── */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 18px",
            borderRadius: 9,
            background: "#0E56FA",
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(14,86,250,0.3)",
            transition: "all 0.15s",
            outline: "none",
            letterSpacing: "-0.01em",
          }}
        >
          <Download size={14} strokeWidth={2.5} />
          Download CV
        </button>
      </div>
    </nav>
  );
}