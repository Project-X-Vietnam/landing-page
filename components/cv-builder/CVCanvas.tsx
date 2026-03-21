import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { Mail, Phone, Globe } from "lucide-react";

interface Props {
  addedBullets: string[];
  experienceRef: (el: HTMLDivElement | null) => void;
}

// ── Skeleton primitives ────────────────────────────────────────────

function SkeletonLine({ w = 100, h = 5 }: { w?: number; h?: number }) {
  return (
    <div
      style={{
        width: `${w}%`,
        height: h,
        background: "#E9EDF2",
        borderRadius: 99,
      }}
    />
  );
}

function SkeletonGroup({ widths }: { widths: number[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {widths.map((w, i) => (
        <SkeletonLine key={i} w={w} />
      ))}
    </div>
  );
}

// ── Section label ──────────────────────────────────────────────────

function SectionLabel({
  children,
  accent = false,
}: {
  children: string;
  accent?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent ? "#0E56FA" : "#94a3b8",
          flexShrink: 0,
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: accent ? "rgba(14,86,250,0.15)" : "#F1F5F9",
        }}
      />
    </div>
  );
}

// ── Job row ───────────────────────────────────────────────────────

function JobRow({
  title,
  company,
  dates,
  bullets,
  isLive = false,
}: {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
  isLive?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 3,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: 2,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </p>
          <p style={{ fontSize: 11, color: "#64748b" }}>{company}</p>
        </div>
        <span
          style={{
            fontSize: 10,
            color: "#94a3b8",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            padding: "2px 7px",
            borderRadius: 4,
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          {dates}
        </span>
      </div>

      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        <AnimatePresence>
          {bullets.length > 0 ? (
            bullets.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: i * 0.05 }}
                style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#0E56FA",
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: "#334155",
                    lineHeight: 1.6,
                  }}
                >
                  {b}
                </span>
              </motion.div>
            ))
          ) : (
            <SkeletonGroup
              widths={isLive ? [96, 88, 76, 92] : [90, 82, 72]}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Main CVCanvas ──────────────────────────────────────────────────

export const CVCanvas = React.memo(function CVCanvas({
  addedBullets,
  experienceRef,
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 560,
        background: "white",
        borderRadius: 8,
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.07), 0 20px 60px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.02)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 2, background: "#020818" }} />

      <div style={{ padding: "28px 32px 36px" }}>

        {/* ── CV HEADER ── */}
        <div
          style={{
            marginBottom: 20,
            paddingBottom: 18,
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              marginBottom: 12,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "#F1F5F9",
                border: "1px solid #E2E8F0",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#CBD5E1",
                  letterSpacing: "-0.02em",
                }}
              >
                AC
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#020818",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  marginBottom: 4,
                }}
              >
                Alex Chen
              </p>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.3 }}>
                Senior Product Manager · San Francisco, CA
              </p>
            </div>
          </div>

          {/* Contact chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { icon: Mail, label: "alex.chen@pm.co" },
              { icon: Phone, label: "(415) 555-0192" },
              { icon: Globe, label: "linkedin.com/in/alexchen" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "3px 8px",
                  borderRadius: 5,
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                }}
              >
                <Icon size={9} color="#94a3b8" />
                <span style={{ fontSize: 9, color: "#64748b" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SUMMARY — dimmed ── */}
        <div style={{ marginBottom: 20, opacity: 0.28 }}>
          <SectionLabel>Summary</SectionLabel>
          <SkeletonGroup widths={[100, 88, 72]} />
        </div>

        {/* ── EXPERIENCE — ACTIVE BLOCK ── */}
        <div
          ref={experienceRef}
          style={{ marginBottom: 20 }}
        >
          {/* Highlighted wrapper */}
          <div
            style={{
              border: "2px solid rgba(14,86,250,0.35)",
              borderRadius: 10,
              background: "rgba(14,86,250,0.025)",
              padding: "14px 14px 16px",
            }}
          >
            {/* Section header row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <SectionLabel accent>Experience</SectionLabel>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: "rgba(14,86,250,0.1)",
                  color: "#0E56FA",
                  flexShrink: 0,
                  marginLeft: 8,
                  marginBottom: 10,
                }}
              >
                ● EDITING
              </span>
            </div>

            {/* Job 1 — live bullets from builder */}
            <JobRow
              title="Senior Product Manager"
              company="Notion Inc."
              dates="Jan 2023 – Present"
              bullets={addedBullets}
              isLive
            />

            <div style={{ height: 1, background: "#E2E8F0", margin: "14px 0" }} />

            {/* Job 2 — static skeleton */}
            <JobRow
              title="Product Manager"
              company="Shopify"
              dates="Mar 2020 – Dec 2022"
              bullets={[]}
            />
          </div>
        </div>

        {/* ── EDUCATION — dimmed ── */}
        <div style={{ marginBottom: 20, opacity: 0.28 }}>
          <SectionLabel>Education</SectionLabel>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ height: 9, width: "55%", background: "#334155", borderRadius: 4 }} />
              <div style={{ height: 7, width: 50, background: "#E2E8F0", borderRadius: 4 }} />
            </div>
            <SkeletonLine w={40} h={5} />
          </div>
        </div>

        {/* ── SKILLS — dimmed ── */}
        <div style={{ opacity: 0.28 }}>
          <SectionLabel>Skills</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[54, 70, 46, 62, 52, 74, 44, 58, 48].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 22,
                  width: w,
                  background: "#F1F5F9",
                  borderRadius: 5,
                  border: "1px solid #E2E8F0",
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
});
