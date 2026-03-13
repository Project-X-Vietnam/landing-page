import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Download, ExternalLink, RotateCcw, Check } from "lucide-react";

// ── Confetti Canvas ────────────────────────────────────────────────

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: "rect" | "circle";
}

const CONFETTI_COLORS = [
  "#0E56FA",
  "#3B82F6",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
  "#a855f7",
  "#020818",
  "#06b6d4",
];

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const pieces: Piece[] = [];

    const origins = [
      { x: canvas.width * 0.2, y: canvas.height * 0.35 },
      { x: canvas.width * 0.5, y: canvas.height * 0.3 },
      { x: canvas.width * 0.8, y: canvas.height * 0.35 },
    ];

    origins.forEach((origin) => {
      for (let i = 0; i < 70; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 3;
        pieces.push({
          x: origin.x,
          y: origin.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5,
          width: Math.random() * 14 + 6,
          height: Math.random() * 8 + 4,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          opacity: 1,
          shape: Math.random() > 0.5 ? "rect" : "circle",
        });
      }
    });

    const startTime = Date.now();
    let animFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let anyVisible = false;
      pieces.forEach((p) => {
        p.vy += 0.28; // gravity
        p.vx *= 0.99; // air resistance
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (elapsed > 2500) p.opacity -= 0.015;
        p.opacity = Math.max(0, p.opacity);

        if (p.opacity > 0) {
          anyVisible = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;

          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
          }

          ctx.restore();
        }
      });

      if (anyVisible) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ── Props ─────────────────────────────────────────────────────────

interface Props {
  bullet: string;
  onRestart: () => void;
}

// ── Main Screen ───────────────────────────────────────────────────

export function Screen4Finish({ bullet, onRestart }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bullet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFBFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Confetti */}
      <ConfettiCanvas />

      {/* Ambient glow */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,86,250,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 560,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 32,
          }}
        >
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: s === 4 ? 24 : 6,
                height: 6,
                borderRadius: 99,
                background: "#0E56FA",
              }}
            />
          ))}
          <span
            style={{
              fontSize: 11,
              color: "#0E56FA",
              fontWeight: 700,
              marginLeft: 6,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Complete
          </span>
        </motion.div>

        {/* Trophy icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 22,
            delay: 0.1,
          }}
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0E56FA 0%, #3B82F6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(14,86,250,0.4)",
            marginBottom: 28,
            fontSize: 40,
          }}
        >
          🎯
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: 99,
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              marginBottom: 16,
            }}
          >
            <Check size={12} color="#16a34a" strokeWidth={3} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#16a34a",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              CV Sections Optimized!
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 48px)",
              fontWeight: 800,
              color: "#020818",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: 14,
            }}
          >
            Your CV is
            <br />
            <span style={{ color: "#0E56FA" }}>recruiter-ready.</span>
          </h1>

          <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6 }}>
            You've applied the XYZ formula across your CV sections. Time to take
            the next step with your full application kit.
          </p>
        </motion.div>

        {/* Bullet Preview Card */}
        {bullet && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{ width: "100%", marginBottom: 32 }}
          >
            <div
              style={{
                background: "white",
                border: "1px solid #E2E8F0",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  height: 3,
                  background: "linear-gradient(90deg, #020818 0%, #0E56FA 100%)",
                }}
              />
              <div style={{ padding: "20px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                    }}
                  >
                    Your Optimized Bullet
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#F1F5F9" }} />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: "#0E56FA",
                      fontWeight: 700,
                      marginTop: 1,
                      flexShrink: 0,
                    }}
                  >
                    ▸
                  </span>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#1e293b",
                      lineHeight: 1.6,
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      margin: 0,
                    }}
                  >
                    {bullet}
                  </p>
                </div>
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopy}
                style={{
                  width: "100%",
                  padding: "11px",
                  borderTop: "1px solid #F1F5F9",
                  background: copied ? "#F0FDF4" : "#FAFBFF",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  color: copied ? "#16a34a" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  transition: "all 0.18s",
                  borderRadius: "0 0 15px 15px",
                }}
              >
                {copied ? (
                  <>
                    <Check size={12} strokeWidth={3} />
                    Copied to clipboard!
                  </>
                ) : (
                  "Click to copy bullet"
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Ghost button */}
          <button
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: 14,
              border: "1px solid #E2E8F0",
              background: "white",
              color: "#020818",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              letterSpacing: "-0.02em",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#CBD5E1";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E8F0";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 1px 4px rgba(0,0,0,0.04)";
            }}
          >
            <Download size={15} strokeWidth={2} />
            Download Full PJX CV Template &amp; Action Verb Checklist
          </button>

          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "18px 24px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #0E56FA 0%, #2563EB 100%)",
              color: "white",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              letterSpacing: "-0.03em",
              boxShadow:
                "0 8px 32px rgba(14,86,250,0.4), 0 2px 8px rgba(14,86,250,0.2)",
            }}
          >
            Apply for SFP Round 2
            <ExternalLink size={16} strokeWidth={2.5} />
          </motion.button>
        </motion.div>

        {/* Restart */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onRestart}
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 99,
            border: "none",
            background: "transparent",
            color: "#94a3b8",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
          }}
        >
          <RotateCcw size={12} />
          Start over
        </motion.button>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: 48,
            padding: "16px 24px",
            borderRadius: 14,
            background: "rgba(14,86,250,0.04)",
            border: "1px solid rgba(14,86,250,0.08)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
            <strong style={{ color: "#020818" }}>Career Survival Kit</strong> ·
            Built for university students and early-career professionals applying
            for tech roles in 2026.
          </p>
        </motion.div>
      </div>
    </div>
  );
}