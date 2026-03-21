import { motion } from "motion/react";
import { Code, LayoutGrid, Briefcase, BrainCircuit, Database, ArrowRight } from "lucide-react";

// ── Track Data ────────────────────────────────────────────────────────────

const TRACKS = [
  {
    id: "pm",
    title: "Product Management",
    icon: LayoutGrid,
    description: "Define what gets built",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "ba",
    title: "Business Analysis",
    icon: Briefcase,
    description: "Bridge tech and business",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "da",
    title: "Data Analytics",
    icon: Database,
    description: "Turn data into insights",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "swe",
    title: "Software Engineering",
    icon: Code,
    description: "Build systems that scale",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    id: "aiml",
    title: "AI / Machine Learning",
    icon: BrainCircuit,
    description: "Shape the frontier",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

// ── Props ─────────────────────────────────────────────────────────────────

interface PJXTrackSelectionProps {
  selectedTrack: string | null;
  onSelectTrack: (trackId: string) => void;
  onNext: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────

export function PJXTrackSelection({
  selectedTrack,
  onSelectTrack,
  onNext,
}: PJXTrackSelectionProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFBFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 24px",
        position: "relative",
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40vh",
          background: "radial-gradient(ellipse at top, rgba(14,86,250,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content Container */}
      <div
        style={{
          width: "100%",
          maxWidth: 1080,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            paddingTop: 40,
            paddingBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <img src="/favicon.svg" alt="Project X Logo" style={{ width: 24, height: 24, objectFit: "contain" }} />
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#020818",
              letterSpacing: "-0.02em",
            }}
          >
            PJX Career Guide
          </span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            paddingTop: 60,
            paddingBottom: 80,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#020818",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Where are you heading?
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Choose your career track and we'll show you how top companies evaluate your CV.
          </p>
        </motion.div>

        {/* Track Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 48,
          }}
        >
          {TRACKS.map((track, idx) => {
            const isSelected = selectedTrack === track.id;
            const Icon = track.icon;

            return (
              <motion.button
                key={track.id}
                onClick={() => onSelectTrack(track.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + idx * 0.08 }}
                whileHover={{
                  y: -6,
                  boxShadow: isSelected
                    ? "0 20px 40px rgba(14,86,250,0.25), 0 0 0 3px rgba(14,86,250,0.15)"
                    : "0 12px 32px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  position: "relative",
                  padding: 28,
                  borderRadius: 16,
                  border: isSelected ? "2px solid #0E56FA" : "1px solid #E2E8F0",
                  background: isSelected ? "#FAFBFF" : "white",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isSelected
                    ? "0 12px 32px rgba(14,86,250,0.15), 0 0 0 3px rgba(14,86,250,0.08)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                }}
              >
                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#0E56FA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(14,86,250,0.3)",
                    }}
                  >
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5.5L5 9.5L13 1.5"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Gradient Icon Background */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: track.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <Icon size={28} color="white" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#111827",
                    letterSpacing: "-0.02em",
                    marginBottom: 8,
                  }}
                >
                  {track.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#64748b",
                    lineHeight: 1.5,
                  }}
                >
                  {track.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 80,
          }}
        >
          <motion.button
            onClick={onNext}
            disabled={!selectedTrack}
            whileHover={selectedTrack ? { scale: 1.03, x: 2 } : {}}
            whileTap={selectedTrack ? { scale: 0.98 } : {}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 36px",
              borderRadius: 12,
              background: selectedTrack ? "#0E56FA" : "#E2E8F0",
              color: selectedTrack ? "white" : "#94a3b8",
              fontSize: 16,
              fontWeight: 700,
              border: "none",
              cursor: selectedTrack ? "pointer" : "not-allowed",
              letterSpacing: "-0.02em",
              boxShadow: selectedTrack ? "0 8px 24px rgba(14,86,250,0.35)" : "none",
              transition: "all 0.3s",
            }}
          >
            Enter Workspace
            <ArrowRight size={18} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
