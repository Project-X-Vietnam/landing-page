import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Download,
  Lock,
  Unlock,
  Sparkles,
  CheckCircle2,
  Mail,
  MapPin,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { trackEvent, handleScrollDepthTracking } from "../../utils/analytics";

// ── Types ─────────────────────────────────────────────────────────────────

type ExperienceLevel = "junior" | "mid" | "senior";

// ── Level Configuration ───────────────────────────────────────────────────

const LEVEL_CONFIG = {
  junior: {
    emoji: "🌱",
    label: "Junior (0-2y)",
  },
  mid: {
    emoji: "🚀",
    label: "Mid-level (2-5y)",
  },
  senior: {
    emoji: "🎯",
    label: "Senior (5y+)",
  },
};

// ── Track Display Names ───────────────────────────────────────────────────

const TRACK_NAMES: Record<string, string> = {
  pm: "Product Management",
  ba: "Business Analysis",
  da: "Data Analytics",
  swe: "Software Engineering",
  aiml: "AI / Machine Learning",
};

// ── Props ─────────────────────────────────────────────────────────────────

interface PJXWorkspaceProps {
  trackId: string;
  onBack: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────

export function PJXWorkspace({ trackId, onBack }: PJXWorkspaceProps) {
  const [level, setLevel] = useState<ExperienceLevel>("junior");
  const [checkedItems, setCheckedItems] = useState([true, false, false]);
  const [highlightedBullet, setHighlightedBullet] = useState<number | null>(null);

  const checkedCount = checkedItems.filter(Boolean).length;
  const isUnlocked = checkedCount >= 3;

  const handleToggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = prev.map((checked, i) => (i === index ? !checked : checked));
      trackEvent("checklist_toggled", { item_index: index, is_checked: next[index], total_checked: next.filter(Boolean).length });
      return next;
    });

    // Highlight corresponding bullet
    if (!checkedItems[index]) {
      setHighlightedBullet(index);
      setTimeout(() => setHighlightedBullet(null), 2000);
    }
  };

  const trackName = TRACK_NAMES[trackId] || "Product Management";

  return (
    <div
      style={{
        height: "100vh",
        background: "#FAFBFF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Navbar */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #E2E8F0",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        {/* Left: Back + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <ArrowLeft size={18} color="#64748b" strokeWidth={2.5} />
          </motion.button>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "#020818",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                }}
              >
                PJ
              </span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#020818",
                  letterSpacing: "-0.02em",
                }}
              >
                {trackName}
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>
                Interactive Workspace
              </div>
            </div>
          </div>
        </div>

        {/* Center: Level Switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#F8FAFC",
            padding: 4,
            borderRadius: 10,
            border: "1px solid #E2E8F0",
          }}
        >
          {(["junior", "mid", "senior"] as ExperienceLevel[]).map((lvl) => {
            const config = LEVEL_CONFIG[lvl];
            const isActive = level === lvl;

            return (
              <motion.button
                key={lvl}
                onClick={() => {
                  setLevel(lvl);
                  trackEvent("level_switched", { level: lvl });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: isActive ? "#0E56FA" : "transparent",
                  color: isActive ? "white" : "#64748b",
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  letterSpacing: "-0.01em",
                }}
              >
                <span style={{ fontSize: 14 }}>{config.emoji}</span>
                {config.label}
              </motion.button>
            );
          })}
        </div>

        {/* Right: Download Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 10,
            background: "white",
            border: "1px solid #E2E8F0",
            color: "#64748b",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <Download size={16} strokeWidth={2} />
          Export PDF
        </motion.button>
      </div>

      {/* Main Content: 50/50 Split */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          overflow: "hidden",
        }}
      >
        {/* LEFT COLUMN: CV Canvas */}
        <div
          style={{
            background: "#FFFFFF",
            borderRight: "1px solid #E2E8F0",
            padding: "40px 48px",
            overflowY: "auto",
            position: "relative",
          }}
        >
          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "rgba(14,86,250,0.06)",
              border: "1px solid rgba(14,86,250,0.15)",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              color: "#0E56FA",
              fontWeight: 600,
            }}
          >
            <span style={{ fontSize: 16 }}>💡</span>
            <span>
              Check items on the right → watch the CV transform in real-time ✨
            </span>
          </motion.div>

          {/* CV Content */}
          <div
            style={{
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#020818",
                  letterSpacing: "-0.03em",
                  marginBottom: 8,
                }}
              >
                Alex Johnson
              </h2>
              <div
                style={{
                  fontSize: 15,
                  color: "#667eea",
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                Product Manager
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  fontSize: 13,
                  color: "#64748b",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Mail size={14} />
                  alex.johnson@gmail.com
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MapPin size={14} />
                  London, UK
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ExternalLink size={14} />
                  linkedin.com/in/alexj
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  marginBottom: 12,
                }}
              >
                Professional Summary
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "#475569",
                  lineHeight: 1.7,
                }}
              >
                {level === "junior" && (
                  <>
                    Motivated Product Manager with hands-on experience in agile product development.
                    Strong collaborator with engineering teams and passionate about user-centered design.
                  </>
                )}
                {level === "mid" && (
                  <>
                    Data-driven Product Manager with 3+ years building B2B SaaS products.
                    Track record of increasing user retention by 23% through data-led roadmap decisions
                    and cross-functional team leadership.
                  </>
                )}
                {level === "senior" && (
                  <>
                    Strategic Product Leader with 7+ years scaling products from 0→1M users.
                    Expert in building high-performing product teams, driving GTM strategy,
                    and influencing C-suite stakeholders across enterprise accounts.
                  </>
                )}
              </p>
            </div>

            {/* Experience Section */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#94a3b8",
                  }}
                >
                  Experience
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(14,86,250,0.1)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#0E56FA",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  SELECTED
                </div>
              </div>

              {/* Experience Block with transformation */}
              <div
                style={{
                  border: "2px solid #0E56FA",
                  borderRadius: 12,
                  padding: "20px 24px",
                  background: "rgba(14,86,250,0.02)",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#020818",
                        marginBottom: 4,
                      }}
                    >
                      Product Manager
                    </div>
                    <div style={{ fontSize: 13, color: "#667eea", fontWeight: 600 }}>
                      TechCorp Ltd
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#94a3b8",
                      fontWeight: 600,
                    }}
                  >
                    2022–Present
                  </div>
                </div>

                {/* Bullet with Live Transformation */}
                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: checkedItems[0] ? "#16a34a" : "#dc2626",
                        flexShrink: 0,
                      }}
                    />
                    <motion.div
                      animate={{
                        background:
                          highlightedBullet === 0
                            ? "rgba(22,163,74,0.15)"
                            : "transparent",
                      }}
                      transition={{ duration: 0.5 }}
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: "#475569",
                        lineHeight: 1.7,
                        padding: "4px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {level === "junior" && (
                        <>
                          {checkedItems[0] ? (
                            <span>
                              <strong style={{ color: "#16a34a" }}>Wrote</strong> clear PRDs
                              and managed 2-week sprint cycles{" "}
                              <strong style={{ color: "#0E56FA" }}>using Jira</strong>,
                              collaborating with 4 engineers to deliver features on time.
                            </span>
                          ) : (
                            <span style={{ color: "#94a3b8" }}>
                              <span style={{ textDecoration: "line-through" }}>
                                Helped with
                              </span>{" "}
                              product tasks and worked with the team on various projects.
                            </span>
                          )}
                        </>
                      )}
                      {level === "mid" && (
                        <>
                          {checkedItems[0] ? (
                            <span>
                              <strong style={{ color: "#16a34a" }}>Led</strong> cross-functional
                              team of 8 engineers to redesign onboarding flow,{" "}
                              <strong style={{ color: "#0E56FA" }}>reducing</strong> drop-off by{" "}
                              <strong style={{ color: "#f59e0b" }}>23%</strong>
                            </span>
                          ) : (
                            <span style={{ color: "#94a3b8" }}>
                              <span style={{ textDecoration: "line-through" }}>
                                Responsible for
                              </span>{" "}
                              improving the product and the team did better overall.
                            </span>
                          )}
                        </>
                      )}
                      {level === "senior" && (
                        <>
                          {checkedItems[0] ? (
                            <span>
                              <strong style={{ color: "#16a34a" }}>Spearheaded</strong> 0→1
                              product strategy, leading 3 PM reports and 25 engineers to launch
                              enterprise platform, achieving{" "}
                              <strong style={{ color: "#f59e0b" }}>$12M ARR</strong> in first
                              12 months.
                            </span>
                          ) : (
                            <span style={{ color: "#94a3b8" }}>
                              <span style={{ textDecoration: "line-through" }}>
                                Oversaw
                              </span>{" "}
                              product development and various strategic initiatives.
                            </span>
                          )}
                        </>
                      )}
                    </motion.div>
                  </div>

                  {/* Additional bullets */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                      opacity: 0.6,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#94a3b8",
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: "#64748b",
                        lineHeight: 1.7,
                      }}
                    >
                      {level === "junior" && (
                        <>Conducted 15+ user interviews to inform feature prioritization</>
                      )}
                      {level === "mid" && (
                        <>
                          Defined and shipped 3 product features impacting{" "}
                          <strong>80K+</strong> monthly active users
                        </>
                      )}
                      {level === "senior" && (
                        <>
                          Built product vision & roadmap influencing board-level decisions,
                          securing <strong>$8M</strong> Series B funding
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Transformation Label */}
                {checkedItems[0] ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      marginTop: 16,
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "rgba(22,163,74,0.08)",
                      border: "1px solid rgba(22,163,74,0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#16a34a",
                      letterSpacing: "0.02em",
                    }}
                  >
                    <CheckCircle2 size={14} />
                    GOOD CV → HR-ready
                  </motion.div>
                ) : (
                  <div
                    style={{
                      marginTop: 16,
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "rgba(220,38,38,0.08)",
                      border: "1px solid rgba(220,38,38,0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#dc2626",
                      letterSpacing: "0.02em",
                    }}
                  >
                    ✗ BAD CV
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HR Insight Panel */}
        <div
          onScroll={(e) => handleScrollDepthTracking(e, "PJXWorkspace_HRPanel")}
          style={{
            background: "#F8FAFC",
            padding: "40px 48px",
            overflowY: "auto",
          }}
        >
          {/* Section Header */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(14,86,250,0.1)",
              border: "1px solid rgba(14,86,250,0.2)",
              marginBottom: 24,
            }}
          >
            <Sparkles size={14} color="#0E56FA" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#0E56FA",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {trackName}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#667eea",
                padding: "2px 8px",
                borderRadius: 999,
                background: "rgba(102,126,234,0.15)",
              }}
            >
              {LEVEL_CONFIG[level].label}
            </span>
          </div>

          <h3
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#020818",
              letterSpacing: "-0.025em",
              marginBottom: 32,
              lineHeight: 1.25,
            }}
          >
            {level === "junior" && "Building Your Foundation"}
            {level === "mid" && "Showing Impact & Ownership"}
            {level === "senior" && "Demonstrating Strategic Leadership"}
          </h3>

          {/* Mentor Quote */}
          <div
            style={{
              background: "white",
              border: "1px solid #E2E8F0",
              borderRadius: 14,
              padding: "24px 28px",
              marginBottom: 32,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=faces"
                alt="Mentor"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #0E56FA",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#020818" }}>
                    Marcus Lee
                  </div>
                  <div
                    style={{
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: "#0E56FA",
                      color: "white",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                    }}
                  >
                    GOOGLE
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      color: "#16a34a",
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 size={12} />
                    VERIFIED
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12 }}>
                  Senior PM
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#475569",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}
                >
                  {level === "junior" && (
                    <>
                      "For Junior PMs, I want to see <strong>execution and delivery</strong>.
                      Show me you can work smoothly with engineers, run scrums, and ship features.
                      Tool proficiency (Jira, Figma) is a huge plus."
                    </>
                  )}
                  {level === "mid" && (
                    <>
                      "For Mid-level roles, I don't want a list of daily tasks. I scan for{" "}
                      <strong>data-driven results</strong> and <strong>business impact</strong>.
                      Show me the numbers — percentages, user counts. Give me a reason to forward
                      your CV in the first 6 seconds."
                    </>
                  )}
                  {level === "senior" && (
                    <>
                      "For Senior PMs, I'm looking for <strong>strategic vision</strong> and{" "}
                      <strong>team leadership</strong>. You should be influencing roadmaps,
                      mentoring PMs, and making decisions that move company metrics. Show me
                      revenue impact or user scale."
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Self-Audit Checklist */}
          <div
            style={{
              background: "white",
              border: "1px solid #E2E8F0",
              borderRadius: 14,
              padding: "24px 28px",
              marginBottom: 24,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <h4
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#020818",
                  letterSpacing: "-0.01em",
                }}
              >
                Self-Audit Checklist
              </h4>
              <div
                style={{
                  fontSize: 12,
                  color: "#94a3b8",
                  fontWeight: 600,
                }}
              >
                {checkedCount} / 3
              </div>
            </div>

            <p
              style={{
                fontSize: 13,
                color: "#64748b",
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              Tick each step — watch the CV bullet transform on the left ←
            </p>

            {/* Checklist Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {level === "junior" && (
                <>
                  {[
                    "Showed execution (Wrote PRDs, ran scrums).",
                    "Mentioned basic tools (Jira, Figma, basic SQL).",
                    "Demonstrated user empathy (e.g., conducted user interviews).",
                  ].map((item, index) => {
                    const isChecked = checkedItems[index];

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleToggleCheck(index)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: "14px 16px",
                          borderRadius: 10,
                          background: isChecked
                            ? "rgba(22,163,74,0.06)"
                            : "rgba(148,163,184,0.05)",
                          border: `1.5px solid ${isChecked ? "#16a34a" : "#E2E8F0"}`,
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 6,
                            background: isChecked ? "#16a34a" : "white",
                            border: `2px solid ${isChecked ? "#16a34a" : "#CBD5E1"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 1,
                            transition: "all 0.2s",
                          }}
                        >
                          {isChecked && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                            >
                              <path
                                d="M1 5L4.5 8.5L11 1.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </motion.svg>
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 13,
                              color: isChecked ? "#16a34a" : "#475569",
                              fontWeight: isChecked ? 600 : 500,
                              lineHeight: 1.6,
                            }}
                          >
                            {item}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </>
              )}

              {level === "mid" && (
                <>
                  {[
                    'Replace "Responsible for" with a strong Action Verb (Led, Spearheaded, Defined)',
                    "Add cross-functional context: team size, function, and scope",
                    "Quantify the business impact with a specific metric (%, $)",
                  ].map((item, index) => {
                    const isChecked = checkedItems[index];

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleToggleCheck(index)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: "14px 16px",
                          borderRadius: 10,
                          background: isChecked
                            ? "rgba(22,163,74,0.06)"
                            : "rgba(148,163,184,0.05)",
                          border: `1.5px solid ${isChecked ? "#16a34a" : "#E2E8F0"}`,
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 6,
                            background: isChecked ? "#16a34a" : "white",
                            border: `2px solid ${isChecked ? "#16a34a" : "#CBD5E1"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 1,
                            transition: "all 0.2s",
                          }}
                        >
                          {isChecked && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                            >
                              <path
                                d="M1 5L4.5 8.5L11 1.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </motion.svg>
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 13,
                              color: isChecked ? "#16a34a" : "#475569",
                              fontWeight: isChecked ? 600 : 500,
                              lineHeight: 1.6,
                            }}
                          >
                            {item}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </>
              )}

              {level === "senior" && (
                <>
                  {[
                    "Show strategic impact: revenue ($ARR), scale (MAU), or market share",
                    "Highlight leadership: team size, mentorship, cross-org influence",
                    "Prove executive presence: board/C-suite stakeholder management",
                  ].map((item, index) => {
                    const isChecked = checkedItems[index];

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleToggleCheck(index)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: "14px 16px",
                          borderRadius: 10,
                          background: isChecked
                            ? "rgba(22,163,74,0.06)"
                            : "rgba(148,163,184,0.05)",
                          border: `1.5px solid ${isChecked ? "#16a34a" : "#E2E8F0"}`,
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 6,
                            background: isChecked ? "#16a34a" : "white",
                            border: `2px solid ${isChecked ? "#16a34a" : "#CBD5E1"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 1,
                            transition: "all 0.2s",
                          }}
                        >
                          {isChecked && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                            >
                              <path
                                d="M1 5L4.5 8.5L11 1.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </motion.svg>
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 13,
                              color: isChecked ? "#16a34a" : "#475569",
                              fontWeight: isChecked ? 600 : 500,
                              lineHeight: 1.6,
                            }}
                          >
                            {item}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          {/* AI Prompt Locked/Unlocked */}
          <motion.div
            animate={{
              background: isUnlocked
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "rgba(148,163,184,0.1)",
            }}
            transition={{ duration: 0.5 }}
            style={{
              borderRadius: 14,
              padding: 2,
              boxShadow: isUnlocked ? "0 12px 32px rgba(102,126,234,0.3)" : "none",
            }}
          >
            <div
              style={{
                background: isUnlocked ? "white" : "rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
                borderRadius: 12,
                padding: "28px 32px",
                textAlign: "center",
              }}
            >
              {isUnlocked ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      boxShadow: "0 8px 24px rgba(102,126,234,0.3)",
                    }}
                  >
                    <Unlock size={28} color="white" strokeWidth={2.5} />
                  </motion.div>
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#020818",
                      marginBottom: 12,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    🎉 Exclusive AI Prompt — Unlocked
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#64748b",
                      lineHeight: 1.6,
                      marginBottom: 20,
                    }}
                  >
                    You've completed all 3 items! Here's your premium ChatGPT rewrite prompt.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontSize: 14,
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      letterSpacing: "-0.01em",
                      boxShadow: "0 4px 16px rgba(102,126,234,0.3)",
                    }}
                  >
                    <Sparkles size={16} />
                    View AI Prompt
                  </motion.button>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "rgba(148,163,184,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <Lock size={28} color="#94a3b8" strokeWidth={2} />
                  </div>
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#64748b",
                      marginBottom: 12,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    🔒 {LEVEL_CONFIG[level].label} AI Prompt — Locked
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#94a3b8",
                      lineHeight: 1.6,
                    }}
                  >
                    Tick <strong>3/3 boxes</strong> to unlock the AI rewrite prompt.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
