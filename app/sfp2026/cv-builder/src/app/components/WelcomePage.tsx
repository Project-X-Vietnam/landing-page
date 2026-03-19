import { motion } from "motion/react";

interface Props {
  onStart: () => void;
}

export function WelcomePage({ onStart }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0F2F8",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        WebkitFontSmoothing: "antialiased",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Nav */}
      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
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
          <span style={{ color: "white", fontSize: 10, fontWeight: 900, letterSpacing: "-0.05em" }}>SK</span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#020818", letterSpacing: "-0.02em" }}>
          Career Survival Kit
        </span>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Announcement pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "white",
            border: "1px solid #E2E8F0",
            borderRadius: 99,
            padding: "6px 16px",
            marginBottom: 36,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#0E56FA",
              boxShadow: "0 0 0 3px rgba(14,86,250,0.18)",
            }}
          />
          <span style={{ fontSize: 13, color: "#334155", fontWeight: 500 }}>
            Summer Fellowship 2026 — Round 1 Now Open
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          style={{
            fontSize: "clamp(48px, 8vw, 88px)",
            fontWeight: 900,
            color: "#0E56FA",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            margin: "0 0 20px",
            maxWidth: 700,
          }}
        >
          Career Survival Kit
        </motion.h1>

        {/* Sub-headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          style={{ marginBottom: 56 }}
        >
          <p style={{ fontSize: 16, color: "#64748B", margin: 0, fontWeight: 400 }}>
            Turn your experiences and proven works into
          </p>
          <p style={{ fontSize: 16, color: "#020818", margin: 0, fontWeight: 700 }}>
            strong application materials
          </p>
        </motion.div>

        {/* Two pain-point cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            maxWidth: 680,
            width: "100%",
            marginBottom: 52,
          }}
        >
          {[
            {
              title: "Not sure what recruiters actually want to see?",
              body: "We decode real hiring criteria so you focus on what matters.",
            },
            {
              title: "Tired of generic advice that doesn't move your resume forward?",
              body: "Get actionable, track-specific feedback — not cookie-cutter tips.",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "24px 22px",
                textAlign: "left",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 700, color: "#020818", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                {card.title}
              </p>
              <p style={{ fontSize: 13, color: "#94A3B8", margin: 0, lineHeight: 1.55 }}>
                {card.body}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.38 }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontSize: 14, color: "#94A3B8", margin: "0 0 16px" }}>
            Ready to build something recruiters can't ignore?
          </p>
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 99,
              background: "#1A3FA8",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(26,63,168,0.35)",
              letterSpacing: "-0.01em",
            }}
          >
            Start here
            <span style={{ fontSize: 18 }}>→</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
