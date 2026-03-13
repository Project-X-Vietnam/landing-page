import { motion, AnimatePresence } from "motion/react";
import { Code2, LayoutGrid, Briefcase, BrainCircuit, ArrowRight, ChevronRight } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: "engineering",
    icon: Code2,
    title: "Engineering",
    subtitle: "Build systems that scale",
    emoji: "⚙️",
    color: "#059669",
    borderActive: "#059669",
    bg: "#F0FDF4",
    tagBg: "rgba(5,150,105,0.08)",
    tagColor: "#059669",
    roles: ["Frontend Engineer", "Backend Engineer", "Full Stack", "DevOps / Platform", "Mobile Engineer", "Systems Engineer"],
  },
  {
    id: "product",
    icon: LayoutGrid,
    title: "Product & Analytics",
    subtitle: "Define what gets built",
    emoji: "🧩",
    color: "#6D28D9",
    borderActive: "#6D28D9",
    bg: "#F5F3FF",
    tagBg: "rgba(109,40,217,0.08)",
    tagColor: "#6D28D9",
    roles: ["Product Manager", "Business Analyst", "Growth Analyst", "UX Researcher", "Strategy Lead", "Data PM"],
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Tech-Enabled Business",
    subtitle: "Drive commercial impact",
    emoji: "💼",
    color: "#D97706",
    borderActive: "#D97706",
    bg: "#FFFBEB",
    tagBg: "rgba(217,119,6,0.08)",
    tagColor: "#D97706",
    roles: ["Business Development", "Consulting", "Operations", "FinTech Associate", "EdTech Lead", "Partnerships"],
  },
  {
    id: "ai",
    icon: BrainCircuit,
    title: "AI Applications",
    subtitle: "Shape the frontier",
    emoji: "🤖",
    color: "#0284C7",
    borderActive: "#0284C7",
    bg: "#EFF6FF",
    tagBg: "rgba(2,132,199,0.08)",
    tagColor: "#0284C7",
    roles: ["ML Engineer", "Data Scientist", "AI Researcher", "Prompt Engineer", "AI Product Manager", "MLOps Engineer"],
  },
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
  const Icon = pillar.icon;

  return (
    <motion.div
      layout
      onClick={onExpand}
      style={{
        border: `1px solid ${isExpanded ? pillar.color : "#E2E8F0"}`,
        borderRadius: 16,
        background: isExpanded ? pillar.bg : "white",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.2s, background 0.2s",
        boxShadow: isExpanded
          ? `0 0 0 3px ${pillar.color}18, 0 4px 20px rgba(0,0,0,0.06)`
          : "0 1px 4px rgba(0,0,0,0.04)",
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
            background: isExpanded ? pillar.color : "#F8FAFC",
            border: isExpanded ? "none" : "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          <Icon
            size={20}
            color={isExpanded ? "white" : "#94a3b8"}
            strokeWidth={1.8}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#020818",
              letterSpacing: "-0.02em",
              marginBottom: 2,
            }}
          >
            {pillar.title}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400 }}>
            {pillar.subtitle}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} color={isExpanded ? pillar.color : "#CBD5E1"} />
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
                borderTop: `1px solid ${pillar.color}22`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: pillar.color,
                  textTransform: "uppercase",
                  marginBottom: 12,
                  marginTop: 14,
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
                        border: `1px solid ${isSelected ? pillar.color : pillar.color + "30"}`,
                        background: isSelected ? pillar.color : pillar.tagBg,
                        color: isSelected ? "white" : pillar.tagColor,
                        fontSize: 12,
                        fontWeight: isSelected ? 600 : 500,
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
              background: "#020818",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(2,8,24,0.2)",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              SK
            </span>
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
                background: s === 1 ? "#0E56FA" : "#E2E8F0",
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
            color: "#020818",
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
              <span style={{ fontSize: 13, color: "#CBD5E1" }}>
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
              background: canProceed ? "#0E56FA" : "#E2E8F0",
              color: canProceed ? "white" : "#94a3b8",
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