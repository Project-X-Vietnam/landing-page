import { motion, AnimatePresence } from "motion/react";
import { Code2, LayoutGrid, Briefcase, HelpCircle, ArrowRight, ChevronRight, Layers, Cpu, ChevronLeft, ArrowLeft } from "lucide-react";
import { ProjectXLogo } from "./ProjectXLogo";

// ─── PROJECT X BRAND CONSTANTS ────────────────────────────────────────────────
const NAVY = "#010B2D";        // PJX dark navy (kept for accents only)
const NAVY_CARD = "#F8FAFC";   // Light card background
const BLUE = "#0E56FA";        // PJX electric blue (primary CTA)
const CYAN = "#17CAFA";        // PJX cyan (accent / subhead)
const WHITE = "#01001F";       // Dark text on light bg
const MUTED = "rgba(1,0,31,0.45)";
const BORDER = "rgba(14,86,250,0.15)";
const ACTIVE_BG = "rgba(14,86,250,0.06)";
const SCREEN_BG = "#FAFBFF";   // Light background

// ─── PILLAR DATA ──────────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: "engineering",
    Icon: Code2,
    iconBg: "white",
    iconColor: NAVY,
    title: "Engineering",
    subtitle: "Build systems that scale",
    roles: ["Frontend Engineer", "Backend Engineer", "Full Stack Dev", "DevOps", "Mobile Dev"],
    accent: BLUE,
  },
  {
    id: "product",
    Icon: Layers,
    iconBg: "white",
    iconColor: NAVY,
    title: "Product & Analytics",
    subtitle: "Define what gets built",
    roles: ["Product Management (PM)", "Product Growth / Growth PM", "Business Analytics (BA)", "UI/UX / Product Design"],
    accent: BLUE,
  },
  {
    id: "business",
    Icon: Briefcase,
    iconBg: "white",
    iconColor: NAVY,
    title: "Tech-Enabled Business",
    subtitle: "Drive commercial impact",
    roles: ["Sales Engineer", "Solutions Architect", "Partnerships Lead", "Operations"],
    accent: BLUE,
  },
  {
    id: "ai",
    Icon: Cpu,
    iconBg: "white",
    iconColor: NAVY,
    title: "AI Applications",
    subtitle: "Shape the frontier",
    roles: ["AI/ML Engineer", "AI Product Manager", "Prompt Engineer", "Data Scientist"],
    accent: BLUE,
  }
];

// ── Props ─────────────────────────────────────────────────────────

interface Props {
  selectedPillar: string | null;
  selectedRole: string | null;
  onSelectPillar: (id: string) => void;
  onSelectRole: (role: string) => void;
  onNext: () => void;
}

// ── PillarCard ────────────────────────────────────────────────────

function PillarCard({
  pillar,
  isExpanded,
  selectedRole,
  onExpand,
  onSelectRole,
}: {
  pillar: typeof PILLARS[0];
  isExpanded: boolean;
  selectedRole: string | null;
  onExpand: () => void;
  onSelectRole: (role: string) => void;
}) {
  const Icon = pillar.Icon;
  const ac = pillar.accent; // 'ac' for accent color
  const isActive = isExpanded;

  return (
    <motion.div
      layout
      onClick={onExpand}
      transition={{ duration: 0.18 }}
      style={{
        borderRadius: 12,
        border: `1.5px solid ${isActive ? BLUE : "#E2E8F0"}`,
        background: isActive ? ACTIVE_BG : "#FFFFFF",
        overflow: "hidden",
        boxShadow: isActive
          ? `0 0 0 2px ${BLUE}20, 0 4px 16px rgba(14,86,250,0.12)`
          : "0 1px 4px rgba(1,0,31,0.06)",
        transition: "background 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 22px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: isActive ? BLUE : "rgba(14,86,250,0.06)",
            border: isActive ? "none" : `1px solid rgba(14,86,250,0.15)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          <Icon
            size={20}
            color={isActive ? "white" : BLUE}
            strokeWidth={1.8}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#01001F",
              letterSpacing: "-0.02em",
              marginBottom: 2,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {pillar.title}
          </div>
          <div style={{ fontSize: 12, color: MUTED, fontWeight: 400, fontFamily: "'Inter', sans-serif" }}>
            {pillar.subtitle}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} color={isActive ? ac : "#9CA3AF"} />
        </motion.div>
      </div>

      {/* Role Pills Expansion */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="roles"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "0 22px 20px",
                borderTop: `1px solid ${ac}22`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: ac,
                  textTransform: "uppercase",
                  marginBottom: 12,
                  marginTop: 14,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Select a specific role →
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {pillar.roles.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <motion.button
                      key={role}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectRole(role)}
                      style={{
                        padding: "6px 13px",
                        borderRadius: 99,
                        border: `1px solid ${isSelected ? ac : ac + "30"}`,
                        background: isSelected ? ac : ac + "10",
                        color: isSelected ? "white" : ac,
                        fontSize: 12,
                        fontWeight: isSelected ? 600 : 500,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        letterSpacing: "-0.01em",
                        textAlign: "center",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Inter', sans-serif",
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

// ── StatusBar Component ───────────────────────────────────────────────────────
function StatusBar({ dark = false, step = 1, onBack }: { dark?: boolean; step?: number; onBack?: () => void }) {
  const c = dark ? "#fff" : NAVY;
  return (
    <div style={{
      height: 54, paddingTop: 16, paddingLeft: 22, paddingRight: 20,
      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      paddingBottom: 6, background: dark ? "transparent" : "white",
      flexShrink: 0, position: "relative", zIndex: 30,
    }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: c, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif" }}>12:45</span>
      {/* Left: Back or Logo */}
      {onBack ? (
        <button onClick={onBack} style={{
          display: "flex", alignItems: "center", gap: 2,
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <ChevronLeft size={18} color={BLUE} strokeWidth={2.5} />
          <span style={{ fontSize: 15, fontWeight: 500, color: BLUE, letterSpacing: "-0.02em", fontFamily: "'Inter', sans-serif" }}>Back</span>
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0" }}>
            <img src="/favicon.svg" alt="Project X Logo" style={{ width: 22, height: 22, objectFit: "contain" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: WHITE, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
              background: i <= step ? BLUE : BORDER,
              transition: "all 0.3s",
            }} />
          ))}
        </div>
        <span
          style={{
            fontSize: 11,
            color: "#94a3b8",
            fontWeight: 500,
            marginLeft: 6,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {step} of 4
        </span>
      </div>
    </div>
  );
}

// ── Main Screen ───────────────────────────────────────────────────

export function Screen1Pillars({
  selectedPillar,
  selectedRole,
  onSelectPillar,
  onSelectRole,
  onNext,
}: Props) {
  const canProceed = selectedPillar !== null && selectedRole !== null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: SCREEN_BG,
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
          maxWidth: 680,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 0 0",
          marginBottom: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 9,
              background: "#FFFFFF",
              border: "1.5px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
            }}
          >
            <img src="/favicon.svg" alt="Project X Logo" style={{ width: 18, height: 18, objectFit: "contain" }} />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#01001F",
              letterSpacing: "-0.02em",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Career Survival Kit
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: s === 1 ? 24 : 6,
                height: 6,
                borderRadius: 99,
                background: s === 1 ? "#0E56FA" : "#17CAFA",
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
            1 of 4
          </span>
        </div>
      </div>

      {/* ── Hero Text ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        style={{
          width: "100%",
          maxWidth: 680,
          paddingTop: 52,
          paddingBottom: 40,
        }}
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
            Step 1 of 4
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800,
            color: "#01001F",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            marginBottom: 14,
          }}
        >
          Where are you heading?
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#64748b",
            lineHeight: 1.6,
            maxWidth: 480,
          }}
        >
          Choose your career pillar, then pick the role that fits. We'll build
          your workspace around it.
        </p>
      </motion.div>

      {/* ── Pillars Grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        style={{
          width: "100%",
          maxWidth: 680,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {PILLARS.map((pillar) => (
          <PillarCard
            key={pillar.id}
            pillar={pillar}
            isExpanded={selectedPillar === pillar.id}
            selectedRole={selectedRole}
            onExpand={() => onSelectPillar(pillar.id)}
            onSelectRole={onSelectRole}
          />
        ))}
      </motion.div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        style={{ width: "100%", maxWidth: 680 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            {canProceed ? (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  fontSize: 13,
                  color: "#059669",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#059669",
                  }}
                />
                {selectedRole} — Role selected
              </motion.div>
            ) : (
              <span style={{ fontSize: 13, color: "#94a3b8" }}>
                {!selectedPillar
                  ? "Click a pillar to get started"
                  : "Now pick a specific role"}
              </span>
            )}
          </div>

          <motion.button
            whileHover={canProceed ? { scale: 1.02, x: 2 } : {}}
            whileTap={canProceed ? { scale: 0.98 } : {}}
            onClick={canProceed ? onNext : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 26px",
              borderRadius: 12,
              background: canProceed ? "#0E56FA" : "#17CAFA",
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              border: "none",
              cursor: canProceed ? "pointer" : "not-allowed",
              letterSpacing: "-0.02em",
              boxShadow: canProceed
                ? "0 4px 16px rgba(14,86,250,0.3)"
                : "none",
              transition: "all 0.2s",
            }}
          >
            Next Step
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}