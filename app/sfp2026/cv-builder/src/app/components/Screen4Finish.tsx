import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Download, ExternalLink, RotateCcw, Check, ArrowLeft } from "lucide-react";
import { PROMPTS_DATA, SectionPrompts } from "../../data/promptsData";
import { ROLE_TO_PROMPT_KEY } from "../../data/rolePromptMapping";

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
          color:
            CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
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
  aiPrompt?: string;
  bullet?: string;
  onRestart: () => void;
  onBack?: () => void;
  selectedRole?: string | null;
}

// Build combined master prompt from all 3 CV sections
function buildCombinedPrompt(role: string | null): string {
  const safeRole = role || "Product Management (PM)";
  const promptKey = ROLE_TO_PROMPT_KEY[safeRole] ?? "Product Management (PM)";
  const sectionData = PROMPTS_DATA[promptKey];
  if (!sectionData) return "Prompt not available.";
  const summary = sectionData["summary" as keyof SectionPrompts] ?? "";
  const experience = sectionData["experience" as keyof SectionPrompts] ?? "";
  const projects = sectionData["projects" as keyof SectionPrompts] ?? "";
  return `=== YOUR COMPLETE CV REWRITE PROMPT FOR: ${safeRole.toUpperCase()} ===\n\n--- PART 1: PROFESSIONAL SUMMARY ---\n${summary}\n\n--- PART 2: EXPERIENCE BULLETS ---\n${experience}\n\n--- PART 3: PROJECTS SECTION ---\n${projects}\n\n=== END OF PROMPT ===\nPaste each section into ChatGPT, Claude, or Gemini individually for best results.`;
}

// ── Main Screen ───────────────────────────────────────────────────

export function Screen4Finish({ aiPrompt, bullet, onRestart, onBack, selectedRole }: Props) {
  const combinedPrompt = buildCombinedPrompt(selectedRole ?? null);
  const currentPrompt = combinedPrompt || aiPrompt || "Prompt not available — please restart.";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            Your AI rewrite prompt is
            <br />
            <span style={{ color: "#0E56FA" }}>ready 🎯</span>
          </h1>

          <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6 }}>
            Your complete CV prompt package is ready — covering Summary, Experience, and Projects.
            <br />Paste each part into ChatGPT, Claude, or Gemini to rewrite your full CV.
          </p>
        </motion.div>

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
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#CBD5E1";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#E2E8F0";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 1px 4px rgba(0,0,0,0.04)";
            }}
          >
            <Download size={15} strokeWidth={2} />
            Download Full PJX CV Template &amp; Action Verb Checklist
          </button>

          
          {/* Primary CTA */}
          <button
            onClick={handleCopy}
            style={{
              width: "100%",
              padding: "20px 32px",
              borderRadius: 12,
              background: copied ? "#22C55E" : "#0E56FA",
              color: "white",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              border: "none",
              boxShadow: "0 8px 24px rgba(14,86,250,0.25)",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              if(!copied) Object.assign(e.currentTarget.style, { transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(14,86,250,0.35)' });
            }}
            onMouseOut={(e) => {
              if(!copied) Object.assign(e.currentTarget.style, { transform: 'translateY(0)', boxShadow: '0 8px 24px rgba(14,86,250,0.25)' });
            }}
          >
            {copied ? "Copied! ✓" : "Copy Your AI Rewrite Prompt ✨"}
          </button>

          <div
            style={{
              fontSize: 12,
              color: "#6B7280",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Works with ChatGPT, Claude, Gemini & more
          </div>

        </motion.div>

        {/* Actions row: Back & Restart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 24,
            justifyContent: "center"
          }}
        >
          {/* Back to edit */}
          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 99,
                border: "none",
                background: "transparent",
                color: "#94a3b8",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#0E56FA";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
              }}
            >
              <ArrowLeft size={14} />
              Back to edit
            </button>
          )}

          {/* Start over */}
          <button
            onClick={onRestart}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 99,
              border: "none",
              background: "transparent",
              color: "#94a3b8",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
            }}
          >
            <RotateCcw size={14} />
            Start over
          </button>
        </motion.div>

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
            Built for university students and early-career professionals
            applying for tech roles in 2026.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
