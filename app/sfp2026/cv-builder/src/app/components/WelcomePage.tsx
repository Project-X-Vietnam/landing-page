import { motion } from "motion/react";

interface Props {
  onStart: () => void;
}

export function WelcomePage({ onStart }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            flexShrink: 0,
          }}
        >
          <img src="/favicon.svg" alt="Project X Logo" style={{ width: 22, height: 22, objectFit: "contain" }} />
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#01001F", letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
            border: "1px solid #17CAFA",
            borderRadius: 99,
            padding: "6px 16px",
            marginBottom: 36,
            boxShadow: "0 2px 8px rgba(1,0,31,0.06)",
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
          <span style={{ fontSize: 13, color: "#01001F", fontWeight: 600 }}>
            Summer Fellowship 2026 — Round 1 Now Open
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)", // slightly smaller to prevent extreme overlap if resized
            fontWeight: 800,
            color: "#01001F",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            margin: "0 0 20px",
            whiteSpace: "nowrap", // Keep on one line
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
          <p style={{ fontSize: 16, color: "#01001F", margin: 0, fontWeight: 400 }}>
            Turn your experiences and proven works into
          </p>
          <p style={{ fontSize: 16, color: "#0E56FA", margin: 0, fontWeight: 700 }}>
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
                borderRadius: 12,
                padding: "24px 22px",
                textAlign: "left",
                border: "1px solid #17CAFA",
                boxShadow: "0 2px 12px rgba(1,0,31,0.04)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Subtle geometric line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #0E56FA 0%, transparent 100%)", opacity: 0.8 }} />
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: "#01001F", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                {card.title}
              </p>
              <p style={{ fontSize: 13.5, color: "#01001F", margin: 0, lineHeight: 1.55 }}>
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
          <p style={{ fontSize: 14, color: "#01001F", margin: "0 0 16px" }}>
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
              borderRadius: 8,
              background: "#0E56FA",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(14,86,250,0.35)",
              letterSpacing: "0.02em",
              textTransform: "uppercase"
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
