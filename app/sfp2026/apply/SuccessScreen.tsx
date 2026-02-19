"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type FormPhase = "early-bird" | "official" | "closed";

interface SuccessScreenProps {
  firstName: string;
  email: string;
  phase: FormPhase;
}

// ─────────────────────────────────────────────────────────────
// Animation helpers
// ─────────────────────────────────────────────────────────────

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: "easeOut" as const },
});

// ─────────────────────────────────────────────────────────────
// Timeline data
// ─────────────────────────────────────────────────────────────

const TIMELINE_STEPS = [
  {
    icon: <Search className="w-4 h-4" />,
    title: "Application Review",
    desc: "Our team carefully reviews every application.",
    time: "After deadline",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    title: "Result Announced",
    desc: "Shortlisted candidates will be notified via email.",
    time: "16/03",
  },
  {
    icon: <Send className="w-4 h-4" />,
    title: "Round 1 Kickstart",
    desc: "Selected applicants begin their first round.",
    time: "20/03",
  },
];

// ─────────────────────────────────────────────────────────────
// Confetti hook
// ─────────────────────────────────────────────────────────────

function useConfetti(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#0E56FA", "#17CAFA", "#6366f1", "#f59e0b", "#10b981", "#ec4899", "#ffffff"];

    interface Particle {
      x: number; y: number; w: number; h: number;
      color: string; rotation: number; rotationSpeed: number;
      vx: number; vy: number; gravity: number; opacity: number;
      decay: number; shape: "rect" | "circle";
    }

    const particles: Particle[] = [];

    const burst = (cx: number, cy: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 4 + Math.random() * 8;
        particles.push({
          x: cx, y: cy,
          w: 4 + Math.random() * 6, h: 2 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 3,
          gravity: 0.12 + Math.random() * 0.05,
          opacity: 1, decay: 0.005 + Math.random() * 0.005,
          shape: Math.random() > 0.5 ? "rect" : "circle",
        });
      }
    };

    setTimeout(() => burst(window.innerWidth * 0.35, -10, 60), 200);
    setTimeout(() => burst(window.innerWidth * 0.65, -10, 60), 400);
    setTimeout(() => burst(window.innerWidth * 0.5, -10, 40), 600);

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;
        if (p.opacity <= 0 || p.y > window.innerHeight + 20) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
      if (particles.length > 0) animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function SuccessScreen({ firstName, email, phase }: SuccessScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useConfetti(canvasRef);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #060085 0%, #01001F 40%, #010520 100%)" }}
    >
      <img src="/images/sfp2026/radiant_top_right.png" alt="" className="absolute top-0 right-0 w-2/3 max-w-[700px] h-auto pointer-events-none select-none opacity-60" />
      <img src="/images/sfp2026/radiant_bottom_left.png" alt="" className="absolute bottom-0 left-0 w-2/3 max-w-[700px] h-auto pointer-events-none select-none opacity-60" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.08] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/[0.06] blur-[100px] pointer-events-none" />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />

      <div className="relative z-10 max-w-[440px] w-full">
        {/* PXV logo with halo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 14 }}
          className="w-24 h-24 mx-auto mb-8 relative"
        >
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30 blur-2xl animate-pulse" />
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-lg" />
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/logo_notext_white.svg"
              alt="Project X Vietnam"
              width={56}
              height={56}
              className="drop-shadow-[0_0_24px_rgba(14,86,250,0.5)]"
              priority
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div {...fade(0.5)} className="text-center mb-2">
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            <span className="text-white">Thank you, {firstName}!</span>
          </h1>
        </motion.div>

        <motion.p {...fade(0.65)} className="text-center text-white/75 text-[15px] leading-relaxed mb-10 max-w-sm mx-auto">
          Your <span className="text-secondary font-semibold">{phase === "early-bird" ? "Early Bird" : "Official"}</span> application
          for SFP 2026 has been received.
          <br />
          We&apos;ll be in touch soon.
        </motion.p>

        {/* Email notice */}
        <motion.div {...fade(0.8)} className="mb-3">
          <GlassCard className="overflow-hidden">
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center shrink-0 border border-white/[0.08]">
                <Mail className="w-[18px] h-[18px] text-secondary" />
              </div>
              <div className="min-w-0">
                <p className="text-white/50 text-[11px] font-medium tracking-wide uppercase">Confirmation will be sent to</p>
                <p className="text-white text-sm font-semibold truncate mt-0.5">{email}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Timeline */}
        <motion.div {...fade(0.95)} className="mb-8">
          <GlassCard className="overflow-hidden">
            <div className="px-5 pt-5 pb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30 mb-4">What happens next</p>
              <div className="space-y-0">
                {TIMELINE_STEPS.map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center text-secondary shrink-0 border border-white/[0.08]">
                        {step.icon}
                      </div>
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-primary/25 via-secondary/15 to-transparent my-1.5" />
                      )}
                    </div>
                    <div className={cn("pb-5", i === TIMELINE_STEPS.length - 1 && "pb-1")}>
                      <p className="text-white font-semibold text-[13px] leading-tight mt-0.5">{step.title}</p>
                      <p className="text-white/50 text-xs mt-1 leading-relaxed">{step.desc}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-secondary bg-secondary/[0.08] px-2.5 py-[3px] rounded-md border border-secondary/[0.12] tracking-wide">
                        {step.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Divider */}
        <motion.div {...fade(1.05)} className="mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        {/* Social proof */}
        <motion.p {...fade(1.1)} className="text-center text-white/75 text-sm leading-relaxed mb-4">
          Follow us on Facebook to stay updated on the latest news!
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(1.2)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="https://www.facebook.com/techXVn" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-8 h-11 font-semibold text-sm shadow-lg shadow-primary/20 transition-all">
              Follow Us
            </Button>
          </a>
          <Link href="/sfp2026">
            <Button variant="outline" className="border-white/[0.12] text-white/50 hover:text-white hover:bg-white/[0.06] hover:border-white/20 rounded-full px-8 h-11 font-semibold text-sm transition-all">
              Back to SFP 2026
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
