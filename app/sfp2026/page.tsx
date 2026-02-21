"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, useScroll, useSpring, useMotionValue } from "framer-motion";
import { Calendar, Rocket, ArrowRight, Briefcase, User, TrendingUp, Users, Building2, GraduationCap, Star, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  trackClickApplyCta,
  trackScrollDepth,
  trackSectionView,
  trackFaqExpand,
  type SectionName,
  type ScrollPercent,
} from "@/lib/analytics/sfp2026";

const COUNTDOWN_TARGET = new Date("2026-03-11T23:59:59+07:00");

const SECTION_IDS = ["impact", "about-pjx", "partners", "roles", "journey", "testimonials", "faq"] as const;
const SECTION_LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  impact: "Impact",
  "about-pjx": "About",
  partners: "Partners",
  roles: "Opportunities",
  journey: "Timeline",
  testimonials: "Testimonials",
  faq: "FAQs",
};

function useTypingText(text: string, speed = 30, enabled = true) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!enabled) {
      setTyped("");
      return;
    }
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      if (i <= text.length) {
        setTyped(text.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, enabled]);
  return typed;
}


function Countdown() {
  const [[d, h, m, s], setTime] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, COUNTDOWN_TARGET.getTime() - now.getTime());
      setTime([
        Math.floor(diff / (1000 * 60 * 60 * 24)),
        Math.floor((diff / (1000 * 60 * 60)) % 24),
        Math.floor((diff / (1000 * 60)) % 60),
        Math.floor((diff / 1000) % 60),
      ]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mt-6 sm:mt-10 w-full max-w-[480px] sm:max-w-[700px] mx-auto">
      <div className="relative" style={{ aspectRatio: "973 / 288" }}>
        <Image
          src="/images/sfp2026/countdown_hero.png"
          alt=""
          fill
          className="object-contain"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-[10%] -translate-y-[6%]"
        >
          <p className="text-xs sm:text-sm font-medium text-white/70 text-center mb-1">
            Application closes in
          </p>
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col items-center font-medium">
              <span className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-medium text-white tabular-nums leading-none tracking-tight">{String(d).padStart(2, "0")}</span>
              <span className="text-[10px] sm:text-sm text-white/70 font-medium">days</span>
            </div>
            <span className="text-2xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-none mt-[2px]">:</span>
            <div className="flex flex-col items-center font-medium">
              <span className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-medium text-white tabular-nums leading-none tracking-tight">{String(h).padStart(2, "0")}</span>
              <span className="text-[10px] sm:text-sm text-white/70 font-medium">hours</span>
            </div>
            <span className="text-2xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-none mt-[2px]">:</span>
            <div className="flex flex-col items-center font-medium">
              <span className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-medium text-white tabular-nums leading-none tracking-tight">{String(m).padStart(2, "0")}</span>
              <span className="text-[10px] sm:text-sm text-white/70 font-medium">minutes</span>
            </div>
            <span className="text-2xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-none mt-[2px]">:</span>
            <div className="flex flex-col items-center font-medium">
              <span className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-medium text-white tabular-nums leading-none tracking-tight">{String(s).padStart(2, "0")}</span>
              <span className="text-[10px] sm:text-sm text-white/70 font-medium">seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedCounter({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else setDisplayValue(Math.floor(current));
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

interface OrbitNodeProps {
  radius: number;
  angleOffset: number;
  label: string;
  pillar: string;
  orbitAngle: number;
  hoveredPillar: string | null;
  setHoveredPillar: (v: string | null) => void;
  setIsOrbitalPaused: (v: boolean) => void;
  setTooltipPos: (v: { x: number; y: number } | null) => void;
  orbitalRef: React.RefObject<HTMLDivElement | null>;
  getOrbitPosition: (r: number, a: number) => { x: number; y: number };
}

const createOrbitNode = ({
  radius,
  angleOffset,
  label,
  pillar,
  orbitAngle,
  hoveredPillar,
  setHoveredPillar,
  setIsOrbitalPaused,
  setTooltipPos,
  orbitalRef,
  getOrbitPosition
}: OrbitNodeProps) => {

  const pos = getOrbitPosition(radius, orbitAngle + angleOffset)
  const isActive = hoveredPillar === pillar
  const iconColor = isActive ? "#17CAFA" : "#0E56FA"
  const labelColor = "#0E56FA"

  const renderIcon = () => {
    if (pillar === "support") {
      return (
        <g stroke={iconColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="0" cy="0" r="7" />
          <line x1="0" y1="-10" x2="0" y2="-5" />
          <line x1="0" y1="5" x2="0" y2="10" />
          <line x1="-10" y1="0" x2="-5" y2="0" />
          <line x1="5" y1="0" x2="10" y2="0" />
        </g>
      )
    }
    if (pillar === "empower") {
      return (
        <g stroke={iconColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="-10,6 -4,0 1,2 8,-6" />
          <line x1="8" y1="-6" x2="8" y2="-10" />
          <line x1="8" y1="-6" x2="12" y2="-6" />
        </g>
      )
    }
    return (
      <g stroke={iconColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="0" cy="-4" r="4" />
        <path d="M -8 10 Q 0 2 8 10 Z" stroke={iconColor} fill="none" strokeWidth="2" />
      </g>
    )
  }

  const safeRef = orbitalRef ?? { current: null }

  return (
    <g
      key={pillar}
      transform={`translate(${pos.x}, ${pos.y})`}
      className="cursor-pointer group"
      onMouseEnter={(event) => {
        setHoveredPillar?.(pillar)
        setIsOrbitalPaused?.(true)
        const rect = safeRef.current?.getBoundingClientRect()
        if (rect) setTooltipPos?.({ x: event.clientX - rect.left, y: event.clientY - rect.top })
      }}
      onMouseMove={(event) => {
        const rect = safeRef.current?.getBoundingClientRect()
        if (rect) setTooltipPos?.({ x: event.clientX - rect.left, y: event.clientY - rect.top })
      }}
      onMouseLeave={() => {
        setHoveredPillar?.(null)
        setIsOrbitalPaused?.(false)
        setTooltipPos?.(null)
      }}
    >
      {/* Icon Circle - now transparent/outline only */}
      <circle
        r="18"
        fill="rgba(14, 86, 250, 0.1)"
        stroke={isActive ? "#17CAFA" : "#0E56FA"}
        strokeWidth={isActive ? 2.5 : 2}
        style={{ transition: "all 0.3s ease" }}
      />
      {renderIcon()}

      {/* Label Pill (stacked below icon) */}
      <rect
        x="-36"
        y="26"
        width="72"
        height="24"
        rx="12"
        fill={labelColor}
      />
      <text
        x="0"
        y="38"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="600"
        fill="#fff"
      >
        {label}
      </text>
    </g>
  )
}


interface TestimonialData {
  name: string;
  roleLines: [string, string];
  quote: string;
  avatar: string | null;
}

function TestimonialFlipCard({ testimonial, index }: { testimonial: TestimonialData; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  const rotateY = useMotionValue(0);
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    rotateY.set(isFlipped ? 180 : 0);
  }, [isFlipped, rotateY]);

  useEffect(() => {
    if (index === 0 && isInView && !hasInteracted) {
      const timer = setTimeout(async () => {
        rotateY.set(8);
        await new Promise((r) => setTimeout(r, 250));
        rotateY.set(-6);
        await new Promise((r) => setTimeout(r, 200));
        rotateY.set(3);
        await new Promise((r) => setTimeout(r, 150));
        rotateY.set(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [index, isInView, hasInteracted, rotateY]);

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsFlipped(true);
      setHasInteracted(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsFlipped(false);
    }
  };

  const handleClick = () => {
    const isMobileViewport = window.innerWidth < 768;
    if (isTouchDevice || isMobileViewport) {
      setIsFlipped((prev) => !prev);
      setHasInteracted(true);
    }
  };

  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const [university, role] = testimonial.roleLines;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="perspective-1200 h-[380px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        style={{ rotateY: springRotateY }}
        className="preserve-3d relative w-full h-full"
      >
        {/* Front Face — visibility fallback for Safari backdrop-blur bug */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0E56FA]/10 via-white/5 to-[#17CAFA]/10 backdrop-blur-lg p-8 flex flex-col items-center justify-center transition-opacity duration-200",
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="pointer-events-none absolute right-[-20%] top-[-20%] h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0E56FA] to-[#17CAFA] opacity-30 blur-xl scale-150" />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-xl shadow-primary/25">
              {testimonial.avatar ? (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0E56FA] to-[#17CAFA] flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{initials}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 text-center space-y-1.5">
            <div className="text-xl font-bold text-white">{testimonial.name}</div>
            <div className="text-sm text-white/60">{university}</div>
            <div className="text-sm font-medium text-white">{role}</div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-white/30">
            <RotateCw className="w-3 h-3" />
            <span className="hidden md:inline">{isTouchDevice ? "Tap" : "Hover"} to read</span>
            <span className="md:hidden">Tap to read</span>
          </div>
        </div>

        {/* Back Face — visibility fallback for Safari backdrop-blur bug */}
        <div
          className={cn(
            "backface-hidden rotate-y-180 absolute inset-0 rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0E56FA]/10 via-white/5 to-[#17CAFA]/10 backdrop-blur-lg p-8 flex flex-col justify-between transition-opacity duration-200",
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="pointer-events-none absolute right-[-20%] top-[-20%] h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-center flex-1">
            <div className="text-5xl font-bold text-white/20 leading-none mb-3">&ldquo;</div>
            <p className="text-base md:text-lg leading-relaxed text-white">
              {testimonial.quote}
            </p>
            <div className="text-5xl font-bold text-white/20 leading-none self-end mt-3">&rdquo;</div>
          </div>

          <div className="relative z-10 text-sm text-slate-400 pt-4 border-t border-white/5">
            — {testimonial.name}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FellowCTACard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateY = useMotionValue(0);
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    rotateY.set(isFlipped ? 180 : 0);
  }, [isFlipped, rotateY]);

  const handleMouseEnter = () => { if (!isTouchDevice) setIsFlipped(true); };
  const handleMouseLeave = () => { if (!isTouchDevice) setIsFlipped(false); };
  const handleClick = () => {
    if (isTouchDevice || window.innerWidth < 768) setIsFlipped((prev) => !prev);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="perspective-1200 h-[380px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        style={{ rotateY: springRotateY }}
        className="preserve-3d relative w-full h-full"
      >
        {/* Front Face */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 rounded-[24px] border border-dashed border-white/30 bg-gradient-to-br from-[#0E56FA]/15 via-white/5 to-[#17CAFA]/15 p-8 flex flex-col items-center justify-center transition-opacity duration-200 overflow-hidden",
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="pointer-events-none absolute right-[-20%] top-[-20%] h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0E56FA] to-[#17CAFA] opacity-15 blur-xl scale-150" />
            <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center">
              <span className="text-4xl font-light text-white/40">?</span>
            </div>
          </div>

          <div className="relative z-10 text-center space-y-2">
            <div className="text-xl font-bold text-white/70">This could be you</div>
            <div className="text-sm text-white/40">Fellow — Class of 2026</div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-white/30">
            <RotateCw className="w-3 h-3" />
            <span className="hidden md:inline">{isTouchDevice ? "Tap" : "Hover"} to read</span>
            <span className="md:hidden">Tap to read</span>
          </div>
        </div>

        {/* Back Face — CTA */}
        <div
          className={cn(
            "backface-hidden rotate-y-180 absolute inset-0 rounded-[24px] border border-dashed border-white/30 bg-gradient-to-br from-[#0E56FA]/15 via-white/5 to-[#17CAFA]/15 p-8 flex flex-col items-center justify-center transition-opacity duration-200 overflow-hidden",
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="pointer-events-none absolute right-[-20%] top-[-20%] h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-5">
            <p className="text-lg md:text-xl leading-relaxed text-white font-medium">
              Ready to write your own story?
            </p>
            <p className="text-sm text-white/50 max-w-[240px]">
              The next chapter of Project X starts with you.
            </p>
            <Link
              href="/sfp2026/apply"
              onClick={(e) => {
                e.stopPropagation();
                trackClickApplyCta("testimonials", "fellow_cta_card");
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300"
            >
              Apply now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SFP2026Page() {
  const sectionLinks = SECTION_IDS.map((id) => ({
    label: SECTION_LABELS[id],
    href: `#${id}`,
  }));
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutSfpRef = useRef<HTMLDivElement>(null);
  const aboutPJXInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const aboutSfpInView = useInView(aboutSfpRef, { once: true, amount: 0.3 });
  const aboutPJXActive = useInView(aboutRef, { amount: 0.2 });
  const aboutSfpActive = useInView(aboutSfpRef, { amount: 0.2 });
  const aboutPJXTyped = useTypingText("Project X Vietnam", 30, aboutPJXInView);
  const aboutSFPTyped = useTypingText("Summer Fellowship Program 2026", 30, aboutSfpInView);

  // ── GA4: Scroll depth tracking (25%, 50%, 75%) ──
  const scrollFiredRef = useRef<Set<ScrollPercent>>(new Set());
  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = (scrollTop / docHeight) * 100;
      const thresholds: ScrollPercent[] = [25, 50, 75];
      for (const t of thresholds) {
        if (pct >= t && !scrollFiredRef.current.has(t)) {
          scrollFiredRef.current.add(t);
          trackScrollDepth(t);
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── GA4: Section view tracking (IntersectionObserver, >=3s visible) ──
  const TRACKED_SECTIONS: { id: string; name: SectionName }[] = [
    { id: "impact", name: "impact" },
    { id: "about-pjx", name: "about_pjx" },
    { id: "about-sfp", name: "about_sfp" },
    { id: "partners", name: "partners" },
    { id: "roles", name: "roles" },
    { id: "journey", name: "journey" },
    { id: "testimonials", name: "testimonials" },
    { id: "faq", name: "faq" },
    { id: "cta", name: "final_cta" },
  ];

  const sectionViewedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    const timers = new Map<string, NodeJS.Timeout>();
    const sectionMap = new Map(TRACKED_SECTIONS.map((s) => [s.id, s.name]));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && !sectionViewedRef.current.has(id)) {
            timers.set(
              id,
              setTimeout(() => {
                if (!sectionViewedRef.current.has(id)) {
                  sectionViewedRef.current.add(id);
                  const name = sectionMap.get(id);
                  if (name) trackSectionView(name);
                }
              }, 3000),
            );
          } else {
            const timer = timers.get(id);
            if (timer) {
              clearTimeout(timer);
              timers.delete(id);
            }
          }
        }
      },
      { threshold: 0.3 },
    );

    for (const { id } of TRACKED_SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── GA4: FAQ expand handler ──
  const handleFaqToggle = useCallback((index: number, question: string) => {
    setOpenFaq((prev) => {
      const opening = prev !== index;
      if (opening) trackFaqExpand(question, index);
      return opening ? index : null;
    });
  }, []);

  const testimonials = [
    {
      name: "Dang Thi Minh Anh",
      roleLines: ["The Chinese University of Hong Kong", "Marketing Analytics Intern @Shopee"],
      quote: "What stayed with me after Project X SFP was not just the advice, but the confidence to seek guidance and shape my own path.",
      avatar: "/images/fellows/minhanh_fellow25.jpg",
    },
    {
      name: "Le Huong Giang",
      roleLines: ["National Economics University", "Founder Associate @NaviEdu"],
      quote: "Project X SFP is a catalyst, connecting me with the right people at the right time and contributing to the path I am pursuing now.",
      avatar: "/images/fellows/huonggiang_fellow25.jpg",
    },
    {
      name: "Phan Trong Dai",
      roleLines: ["VNUHCM - University of Science", "AI Engineer @Viettel Digital Talent"],
      quote: "As an AI engineer, Project X helped me break out of the coder mindset. The mentors, the community, the buddy program — they shaped how I think about my career path, and I still carry those connections today.",
      avatar: "/images/fellows/daitrongphan_fellow25.jpg",
    },
    {
      name: "Long Pham",
      roleLines: ["VNUHCM - University of Science", "Machine Learning Intern @TecAlliance"],
      quote: "Two transformative months of learning from industry seniors, expanding my network, and gaining clearer direction in tech — Project X gave me exactly the push I needed.",
      avatar: "/images/fellows/longpham_fellow25.jpg",
    },
  ];

  const faqItems = [
    { q: "Who can apply to the Project X Summer Fellowship Program 2026?", a: "The program is open to students and early-career individuals who are passionate about technology-related fields, regardless of academic background or university, as long as they demonstrate strong motivation and commitment." },
    { q: "Do I need prior work or internship experience?", a: "No. The Project X Summer Fellowship Program is designed to support students at different stages. What matters most is your potential, mindset, and willingness to learn." },
    { q: "Is this a paid program?", a: "Project X Summer Fellowship Program is a non-profit initiative. Any program-related fees (if applicable) are transparently communicated and reinvested to maintain program quality, operations, and community impact." },
    { q: "Is an internship guaranteed?", a: "Internship opportunities are provided through our partner network. While placements depend on performance and partner requirements, Project X offers exclusive access, preparation, and matching support to maximize your chances." },
    { q: "How competitive is the selection process?", a: "The Project X Summer Fellowship Program receives thousands of applications each year. Our selection process focuses on potential, motivation, and alignment, not just academic achievements." },
    { q: "What makes SFP2026 different from other programs?", a: "Summer Fellowship Program 2026 combines career orientation, practical training, mentorship, and real industry access into one cohesive journey supported by a strong, long-term community rather than a one-off experience." },
  ];

  const journeySteps = [
    { date: "20/02 - 11/03", title: "Official Application", desc: "Application period opens for Project X Summer Fellowship Program 2026." },
    { date: "16/03 - 28/03", title: "Round 1", desc: "Develop a strong, cohesive profile including CV/Resume and Portfolio." },
    { date: "30/03 - 25/04", title: "Round 2", desc: "Enhance interview readiness and apply to partner internship positions." },
    { date: "09/07 - 22/08", title: "Summer Fellowship Program 2026", desc: "Summer Fellowship Program with internships, professional, and personal development." },
  ];

  const impactStats = [
    { value: 6000, suffix: "+", label: "Cumulative applications" },
    { value: 35, suffix: "+", label: "Hiring partners" },
    { value: 85, suffix: "+", label: "Senior mentors" },
    { value: 180, suffix: "+", label: "Internship opportunities" },
    { value: 95, suffix: "%", label: "Partner satisfaction rate" },
  ];

  const partnerRoles = [
    { title: "Exclusive Internship Opportunities", desc: "Providing exclusive internship opportunities & company tour slots", count: "", icon: "briefcase" },
    { title: "Workshops & Mentorship", desc: "Participating in workshops, webinars, and mentorship program", count: "", icon: "person" },
    { title: "Nurturing Future Talent", desc: "Nurturing future tech talent with clear career pathways and strong, long-term professional networks", count: "", icon: "growth" },
  ];

  const featuredMentors = [
    {
      name: "Tien Dao",
      role: "Product Designer II",
      company: "Microsoft",
      image: "/images/mentors/tien dao.jpeg",
    },
    {
      name: "Van Ha",
      role: "Senior Product Manager",
      company: "Amazon",
      image: "/images/mentors/van ha.jpeg",
    },
    {
      name: "Trung Do",
      role: "Senior Product Manager",
      company: "SAP",
      image: "/images/mentors/trung do.jpeg",
    },
    {
      name: "Jackie Trang Nguyen",
      role: "Software Engineer",
      company: "Meta",
      image: "/images/mentors/jackie trang nguyen.jpg",
    },
    {
      name: "Quang Nguyen",
      role: "Software Engineer",
      company: "Microsoft",
      image: "/images/mentors/quang nguyen.jpeg",
    },
    {
      name: "Tuan Doan Nguyen",
      role: "Staff Data Scientist",
      company: "Quora",
      image: "/images/mentors/tuan doan nguyen.png",
    },
    {
      name: "Vu Viet Kien",
      role: "Engagement Product Manager",
      company: "MoMo",
      image: "/images/mentors/vu viet kien.jpg",
    },
  ];

  const partnerLogosAll = [
    { src: "/images/partners/appota-logo.png", alt: "Appota", containerClass: "w-32 h-12 xl:w-36 xl:h-14" },
    { src: "/images/partners/chotot-logo.png", alt: "Chotot", containerClass: "w-24 h-12 xl:w-28 xl:h-14" },
    { src: "/images/partners/geek-up-logo.png", alt: "Geek Up", containerClass: "w-24 h-8 xl:w-28 xl:h-10" },
    { src: "/images/partners/got-it-logo.png", alt: "Got It", containerClass: "w-28 h-16 xl:w-32 xl:h-20" },
    { src: "/images/partners/grab_logo.png", alt: "Grab", containerClass: "w-24 h-10 xl:w-28 xl:h-10" },
    { src: "/images/partners/holistics-logo.svg", alt: "Holistics", containerClass: "w-40 h-12 xl:w-44 xl:h-14" },
    { src: "/images/partners/shopee-logo.png", alt: "Shopee", containerClass: "w-28 h-12 xl:w-32 xl:h-14" },
    { src: "/images/partners/tiki_logo.png", alt: "Tiki", containerClass: "w-32 h-16 xl:w-36 xl:h-20" },
    { src: "/images/partners/vng_logo.png", alt: "VNG", containerClass: "w-16 h-8 xl:w-20 xl:h-10" },
  ];

  const rolesList = [
    "Software Engineering",
    "Data Analytics & Data Science",
    "Artificial Intelligence",
    "Product Management",
    "UI/UX Design",
    "Business Analytics",
    "DevOps",
    "Cybersecurity",
    "Game Development",
    "Tech-business",
  ];

  const rotatingCards = [
    "Build a clear understanding of your role and direction within the tech ecosystem",
    "Develop industry-ready skills, professional mindset, and personal brand",
    "Grow alongside peers and mentors in a community where learning compounds",
    "Form meaningful relationships that last beyond the program",
    "Access real opportunities while continuing to grow even when no one is watching",
  ];

  const [activeCard, setActiveCard] = useState(0);
  const [, setExitingCard] = useState<number | null>(null);
  const [, setHasAnimated] = useState(false);

  // Image carousel state
  const [, setActiveImage] = useState(0);
  const [images] = useState<string[]>([
    "IMG_6482.jpg",
    "IMG_6513.jpg",
    "IMG_6645.jpg",
    "IMG_6661.jpg",
    "IMG_6745.jpg",
  ]);

  const rotatingRef = useRef<HTMLDivElement>(null);
  const rotationTimer = useRef<NodeJS.Timeout | null>(null);
  const imageTimer = useRef<NodeJS.Timeout | null>(null);

  const journeyRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start end", "end start"],
  });
  const journeyProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  const rotatingInView = aboutSfpActive;

  const getStackPosition = (index: number) => {
    return (index - activeCard + rotatingCards.length) % rotatingCards.length;
  };

  useEffect(() => {
    if (rotationTimer.current) clearInterval(rotationTimer.current);
    if (imageTimer.current) clearInterval(imageTimer.current);

    if (!rotatingInView) return;

    setHasAnimated(true);

    const startDelay = setTimeout(() => {
      rotationTimer.current = setInterval(() => {
        // mark current top as exiting
        setExitingCard(activeCard);

        setActiveCard((prev) => (prev + 1) % rotatingCards.length);

        // remove exiting state after animation
        setTimeout(() => setExitingCard(null), 650);
      }, 1800);

      // Image rotation - 3 seconds per image
      imageTimer.current = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % images.length);
      }, 3000);
    }, 100);

    return () => {
      clearTimeout(startDelay);
      if (rotationTimer.current) clearInterval(rotationTimer.current);
      if (imageTimer.current) clearInterval(imageTimer.current);
    };
  }, [rotatingInView, rotatingCards.length, images.length, activeCard]);


  const [orbitAngle, setOrbitAngle] = useState(0)
  const [isOrbitalPaused, setIsOrbitalPaused] = useState(false)
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null)
  const orbitalRef = useRef<HTMLDivElement | null>(null)
  const orbitalInView = aboutPJXActive
  const orbitAngleRef = useRef(0)
  const orbitRafId = useRef<number | null>(null)

  useEffect(() => {
    if (!orbitalInView || isOrbitalPaused) {
      if (orbitRafId.current !== null) {
        cancelAnimationFrame(orbitRafId.current)
        orbitRafId.current = null
      }
      return
    }

    let last = performance.now()
    const tick = (now: number) => {
      const delta = now - last
      last = now
      if (!Number.isFinite(delta)) {
        orbitRafId.current = requestAnimationFrame(tick)
        return
      }

      orbitAngleRef.current = (orbitAngleRef.current + delta * 0.02) % 360
      const next = orbitAngleRef.current
      setOrbitAngle(prev => (Math.abs(next - prev) > 0.01 ? next : prev))
      orbitRafId.current = requestAnimationFrame(tick)
    }

    orbitRafId.current = requestAnimationFrame(tick)
    return () => {
      if (orbitRafId.current !== null) {
        cancelAnimationFrame(orbitRafId.current)
        orbitRafId.current = null
      }
    }
  }, [orbitalInView, isOrbitalPaused])

  const getOrbitPosition = (radius: number, angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180
    return {
      x: 200 + radius * Math.cos(rad),
      y: 200 + radius * Math.sin(rad)
    }
  }

  return (
    <main
      className="relative transition-colors duration-200 scroll-smooth bg-[#01001F] overflow-x-clip scrollbar-hide"
    >
      <Navbar
        isDark={true}
        links={sectionLinks}
        showCta={true}
        logoHref="/"
        enableScrollPill
        logoSrc="/images/logo-white.svg"
      />

      {/* Hero */}
      <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-20 pb-6 sm:pt-24 sm:pb-8 snap-start">
        {/* Mobile light — vertical beam */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden sm:hidden">
          <Image
            src="/images/sfp2026/light.svg"
            alt=""
            width={973}
            height={794}
            priority
            className="absolute -top-[5%] left-1/2 -translate-x-1/2 w-[280%] h-auto opacity-95 scale-y-[1.6]"
          />
        </div>
        {/* Desktop light — horizontal beam */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block">
          <Image
            src="/images/sfp2026/light_hero.svg"
            alt=""
            fill
            priority
            className="object-cover object-right-top"
          />
        </div>


        {/* Main Content Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-center -mt-12 sm:mt-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 text-center">
          {/* Main Headline with Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            <span className="bg-gradient-to-r from-[#0E56FA] from-0% to-[#17CAFA] to-[33%] bg-clip-text text-transparent gradient-clip-fix">
              Illuminate
            </span>
            <span className="text-white"> your<br />tech career path</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl font-medium mx-auto text-white leading-relaxed"
            style={{ fontFamily: "SF Pro Display, -apple-system, sans-serif" }}
          >
            Project X Summer Fellowship Program 2026 is the guiding light<br className="hidden sm:inline" /> that turns potential into clear direction in tech
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link href="/sfp2026/apply" onClick={() => trackClickApplyCta("hero", "hero")}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] hover:from-[#0E56FA]/90 hover:to-[#17CAFA]/90 text-white rounded-full px-10 py-6 text-base md:text-lg font-medium transition-all hover:scale-[1.02] w-full sm:w-auto"
              >
                Apply now
              </Button>
            </Link>
            <a href="#impact">
              <Button
                size="lg"
                className="group rounded-full px-8 py-6 text-base md:text-lg font-medium bg-white text-[#01001F] hover:bg-white/90 transition-all w-full sm:w-auto"
              >
                Learn more
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-white"
          >
            <Countdown />
          </motion.div>
        </div>
      </section>

      {/* Our Impact So Far */}
      <section id="impact" className="relative min-h-[auto] md:min-h-screen flex flex-col justify-center py-16 md:py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden">
        <div className="w-full lg:max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative text-center mb-12">
            <div className="pointer-events-none absolute left-1/2 top-4 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/60 blur-3xl" />
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium mb-4 sm:mb-6 text-white">
              Our <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent gradient-clip-fix">impact</span> so far
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-white/60 leading-none">
              Project X Summer Fellowship Program has grown into one of <span className="font-bold text-white/70">Vietnam&apos;s  most impactful</span> student-led tech initiatives - an integrated talent development ecosystem shaping the next generation of tech leaders.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-0 justify-items-center">
            {impactStats.map((stat, i) => {
              const positionClass =
                i < 3 ? "lg:col-span-2"
                  : i === 3 ? "lg:col-span-2 lg:col-start-2"
                    : "lg:col-span-2 lg:col-start-4";

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04, y: -6 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`group relative w-full max-w-[400px] lg:max-w-none cursor-pointer ${positionClass}`}
                  style={{ marginBottom: "-5.5%" }}
                >
                  <Image
                    src="/images/sfp2026/impact_glass_card.svg"
                    alt=""
                    width={562}
                    height={275}
                    className="w-full h-auto pointer-events-none select-none transition-all duration-300 group-hover:brightness-125"
                  />

                  <div
                    className="pointer-events-none absolute rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ left: "5.07%", right: "5.07%", top: "4.55%", bottom: "16.18%", boxShadow: "inset 0 0 40px rgba(23, 202, 250, 0.15), 0 0 30px rgba(14, 86, 250, 0.2)" }}
                  />

                  <div
                    className="absolute z-10"
                    style={{ left: "5.07%", right: "5.07%", top: "4.55%", bottom: "16.18%" }}
                  >
                    <div className="w-full h-full p-5 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <p
                          className="text-base font-medium text-white/80 transition-colors duration-300 group-hover:text-white"
                          style={{ fontFamily: "SF Pro Display, -apple-system, sans-serif" }}
                        >
                          {stat.label}
                        </p>
                        {[Users, Building2, GraduationCap, Briefcase, Star][i] &&
                          (() => {
                            const Icon = [Users, Building2, GraduationCap, Briefcase, Star][i];
                            return <Icon className="w-5 h-5 text-white/50 flex-shrink-0 transition-all duration-300 group-hover:text-[#17CAFA] group-hover:scale-110" />;
                          })()}
                      </div>

                      <div
                        className="text-6xl md:text-7xl font-medium text-white leading-none tracking-tight transition-transform duration-300 origin-bottom-left group-hover:scale-105"
                        style={{ fontFamily: "SF Pro Display, -apple-system, sans-serif" }}
                      >
                        {stat.suffix === "%"
                          ? `~${stat.value}${stat.suffix}`
                          : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Project X Vietnam */}
      <section id="about-pjx" ref={aboutRef} className="relative min-h-[auto] md:min-h-screen flex flex-col justify-center py-16 md:py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 z-0 w-[150vw] md:w-[80vw]">
          <Image src="/images/sfp2026/cloud.svg" alt="" width={1200} height={800} className="w-full" />
        </div>
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start overflow-visible">
            {/* Left Column - Text Content (60%) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-5xl md:text-6xl font-medium text-left text-white"
              >
                <span>About </span>
                <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent gradient-clip-fix">{aboutPJXTyped}</span>
                <span className="inline-block w-[3px] h-[0.85em] bg-primary animate-cursor-blink align-baseline ml-1 relative top-[0.05em]" />
              </motion.h2>
              <p className="text-base md:text-lg leading-relaxed text-slate-300">
                Founded in 2022, Project X Vietnam is a NGO with the mission to bridge the gap between young talents and companies in the Vietnam&apos;s tech ecosystem via our annual flagship, called Project X Summer Fellowship Program.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-slate-300">
                Our mission is built on three core pillars: <strong className="text-primary">Empower, Nurture & Support.</strong>
              </p>
            </motion.div>

            {/* Right Column - Orbital Graphic (40%) */}
            <motion.div
              ref={orbitalRef}
              onMouseEnter={() => setIsOrbitalPaused(true)}
              onMouseLeave={() => setIsOrbitalPaused(false)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-square max-w-md mx-auto overflow-visible"
            >

              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 400" style={{ overflow: "visible" }}>

                {(() => {
                  const ringColor = "rgba(255,255,255,0.15)";

                  return (
                    <>
                      {/* OUTER ORBIT */}
                      <circle
                        cx="200"
                        cy="200"
                        r="140"
                        fill="none"
                        stroke={ringColor}
                        strokeWidth="2"
                        strokeDasharray="8 8"
                        style={{
                          transformOrigin: "200px 200px",
                          transform: `rotate(${orbitAngle * 0.6}deg)`
                        }}
                      />

                      {/* INNER ORBIT */}
                      <circle
                        cx="200"
                        cy="200"
                        r="90"
                        fill="none"
                        stroke={ringColor}
                        strokeWidth="2"
                        style={{
                          transformOrigin: "200px 200px",
                          transform: `rotate(${orbitAngle * 0.8}deg)`
                        }}
                      />

                      {/* ===== CENTER STAR ===== */}
                      <image
                        href="/images/pjxstar-primary.svg"
                        x="175"
                        y="175"
                        width="50"
                        height="50"
                      />
                      {(() => {

                        return (
                          <>
                            {createOrbitNode({
                              radius: 140,
                              angleOffset: 30,
                              label: "Support",
                              pillar: "support",
                              orbitAngle,
                              hoveredPillar,
                              setHoveredPillar,
                              setIsOrbitalPaused,
                              setTooltipPos,
                              orbitalRef,
                              getOrbitPosition
                            })}
                            {createOrbitNode({
                              radius: 90,
                              angleOffset: 150,
                              label: "Empower",
                              pillar: "empower",
                              orbitAngle,
                              hoveredPillar,
                              setHoveredPillar,
                              setIsOrbitalPaused,
                              setTooltipPos,
                              orbitalRef,
                              getOrbitPosition
                            })}
                            {createOrbitNode({
                              radius: 140,
                              angleOffset: 270,
                              label: "Nurture",
                              pillar: "nurture",
                              orbitAngle,
                              hoveredPillar,
                              setHoveredPillar,
                              setIsOrbitalPaused,
                              setTooltipPos,
                              orbitalRef,
                              getOrbitPosition
                            })}
                          </>

                        )
                      })()}

                    </>
                  );
                })()}
              </svg>

              {/* Tooltip */}
              {hoveredPillar && tooltipPos && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 max-w-xs p-4 rounded-lg shadow-xl bg-[#01001F] border border-white/10"
                  style={{
                    left: `${tooltipPos.x}px`,
                    top: `${tooltipPos.y}px`,
                    transform: "translate(-50%, -120%)",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1 capitalize text-white">
                        {hoveredPillar}
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {hoveredPillar === "support" && "Contribute to the growth of tech startups and companies through young talent development"}
                        {hoveredPillar === "empower" && "Equip students with early career direction and essential foundations"}
                        {hoveredPillar === "nurture" && "Develop a high-quality pool of future tech professionals aligned with industry trends"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* About SFP2026 */}
      <section
        id="about-sfp"
        ref={aboutSfpRef}
        className="relative min-h-[auto] md:min-h-screen flex flex-col justify-center py-14 md:py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden"
      >
        <div className="pointer-events-none absolute top-0 right-0 z-0 translate-x-1/4 -translate-y-1/4 w-[150vw] md:w-[80vw] scale-y-[-1]">
          <Image src="/images/sfp2026/cloud.svg" alt="" width={1200} height={800} className="w-full" />
        </div>
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-medium mb-6 sm:mb-8 md:mb-16 text-left text-white"
          >
            <span>About </span>
            <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent gradient-clip-fix">{aboutSFPTyped}</span>
            <span className="inline-block w-[3px] h-[0.85em] bg-primary animate-cursor-blink align-baseline ml-1 relative top-[0.05em]" />
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
            <div className="space-y-6">
              <p
                className="text-md md:text-base font-medium text-slate-200"
              >
                Through mentorship, hands-on learning, and a strong community,
                Project X helps you:
              </p>
              <div ref={rotatingRef} className="relative h-[240px] md:h-[420px] w-full">
                {rotatingCards.map((item, index) => {

                  const position = getStackPosition(index);
                  if (position > 4) return null;

                  const stackStyles = [
                    { scale: 1, offset: 0 },
                    { scale: 0.95, offset: 22 },
                    { scale: 0.90, offset: 44 },
                    { scale: 0.85, offset: 66 },
                    { scale: 0.80, offset: 88 },
                  ];

                  const stack = stackStyles[position];

                  return (
                    <motion.div
                      key={item}
                      layout
                      initial={{ opacity: 0, y: 80 }}
                      animate={{
                        y: stack.offset,
                        scale: stack.scale,
                        opacity: 1 - position * 0.12,
                        filter: `blur(${position * 0.6}px)`,
                      }}
                      transition={{
                        layout: {
                          duration: 3.4,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        position: "absolute",
                        zIndex: 100 - position,
                        top: 0,
                        left: 0,
                        right: 0,
                      }}
                      className="h-24 md:h-28 p-6 rounded-2xl relative bg-gradient-to-br from-[#0E56FA]/40 via-white/5 to-[#17CAFA]/40 border border-white/10 backdrop-blur-lg"
                    >
                      {/* Number badge overflowing in top right corner - only show on top card */}
                      {position === 0 && (
                        <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 z-[-1]">
                          <span
                            className="text-7xl md:text-8xl font-bold text-white"
                          >
                            {index + 1}
                          </span>
                        </div>
                      )}

                      <div
                        className="text-md md:text-lg font-semibold leading-relaxed text-white"
                      >
                        {item}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-2xl border relative overflow-hidden bg-gradient-to-br from-[#0E56FA]/40 via-white/5 to-[#17CAFA]/40 border-white/10 backdrop-blur-lg">
              <div className="relative h-[280px] md:h-[420px]">
                <Image
                  src="/images/IMG_6661.jpg"
                  alt="Summer Fellowship Program"
                  fill
                  className="object-cover w-full h-full rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section id="partners" className="relative min-h-[auto] md:min-h-screen flex flex-col justify-center py-16 md:py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#0E56FA]/30 to-[#17CAFA]/20 blur-3xl opacity-40" />
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6 md:mb-12">
            <h2 className="text-5xl md:text-6xl font-medium mb-6 text-white">
              Trusted by <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent gradient-clip-fix">multiple partners</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-white/60">
              Project X collaborates with a growing network of <span className="text-white/70 font-bold">leading technology companies, startups, and innovation-driven organizations</span> across Vietnam and globally.
            </p>
          </motion.div>

        </div>

        {/* Partner logos marquee — full width */}
        <div className="mb-6 md:mb-12 overflow-hidden w-full">
          <div className="marquee">
            <div className="marquee__track gap-6 lg:gap-12 py-3 md:py-6 items-center">
              {[...Array(3)].map((_, set) => (
                <div key={set} className="marquee__group gap-6 lg:gap-12 pr-6 lg:pr-12 items-center">
                  {partnerLogosAll.map((logo) => (
                    <div key={`${set}-${logo.alt}`} className="flex items-center justify-center">
                      <div className={`relative ${logo.containerClass}`}>
                        <Image src={logo.src} alt={logo.alt} fill className="object-contain brightness-0 invert" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">

          {/* Partner roles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
            {partnerRoles.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group dark-glass rounded-2xl px-6 py-7 cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 bg-primary/15 border border-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/25">
                  {card.icon === "briefcase" && <Briefcase className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-[#17CAFA]" />}
                  {card.icon === "person" && <User className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-[#17CAFA]" />}
                  {card.icon === "growth" && <TrendingUp className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-[#17CAFA]" />}
                </div>
                <h3 className="font-semibold text-base mb-2 text-white transition-colors duration-300 group-hover:text-[#17CAFA]">{card.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mentors section */}
          <div>
            <h3 className="text-3xl font-medium mb-12 text-center text-white/60 uppercase tracking-wide">Meet Our Past Mentors & Guest Speakers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
              {featuredMentors.map((mentor, i) => (
                <motion.div
                  key={mentor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-18 h-18 md:w-20 md:h-20 rounded-full mb-3 overflow-hidden border border-white/10 bg-gradient-to-br from-[#0E56FA]/40 via-white/5 to-[#17CAFA]/40 backdrop-blur-lg">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-bold text-white">{mentor.name}</p>
                  <p className="text-xs text-white/60">{mentor.role}</p>
                  <p className="text-xs text-white/70">@{mentor.company}</p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: featuredMentors.length * 0.05 }}
                className="flex flex-col items-center justify-center text-center xl:hidden"
              >
                <p className="text-lg font-medium text-white/60">and many more...</p>
              </motion.div>
            </div>
            <div className="hidden xl:flex items-center justify-end">
              <p className="text-xl md:text-3xl font-medium text-white/60">and many more...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Targeted Roles & Domains */}
      <section id="roles" className="relative min-h-[auto] md:min-h-screen flex flex-col justify-center py-16 md:py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="pointer-events-none absolute left-1/2 top-4 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
            <h2 className="text-5xl md:text-6xl font-medium mb-4 text-white">Targeted <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#22D3EE] bg-clip-text text-transparent gradient-clip-fix">Roles & Domains</span></h2>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-white/60">
              Project X Summer Fellowship Program 2026 supports <br /> a comprehensive range of tech and tech-related positions, including:            </p>
          </motion.div>
        </div>

        {/* Scrolling roles - Full width marquee */}
        <div className="w-full space-y-6 mb-4">
            <div className="marquee">
              <div className="marquee__track gap-4 sm:gap-6 lg:gap-8">
                {[...Array(2)].map((_, set) => (
                  <div key={set} className="marquee__group gap-4 sm:gap-6 lg:gap-8 pr-4 sm:pr-6 lg:pr-8">
                    {rolesList.slice(0, Math.ceil(rolesList.length / 2)).flatMap((role, i) => [
                      <div key={`${set}-${i}`} className="text-4xl font-normal whitespace-nowrap transition-all text-slate-500 hover:text-secondary">
                        {role}
                      </div>,
                      i < Math.ceil(rolesList.length / 2) - 1 && (
                        <div key={`${set}-${i}-dot`} className="text-5xl font-normal whitespace-nowrap transition-all text-slate-500">
                          •
                        </div>
                      )
                    ]).filter(Boolean)}
                  </div>
                ))}
            </div>
          </div>

            <div className="marquee marquee--reverse">
              <div className="marquee__track gap-4 sm:gap-6 lg:gap-8" style={{ animationDuration: "34s" }}>
                {[...Array(2)].map((_, set) => (
                  <div key={set} className="marquee__group gap-4 sm:gap-6 lg:gap-8 pr-4 sm:pr-6 lg:pr-8">
                    {rolesList.slice(Math.ceil(rolesList.length / 2)).flatMap((role, i) => [
                      <div key={`${set}-${i}`} className="text-4xl font-normal whitespace-nowrap transition-all text-slate-500 hover:text-secondary">
                        {role}
                      </div>,
                      i < rolesList.length - Math.ceil(rolesList.length / 2) - 1 && (
                        <div key={`${set}-${i}-dot`} className="text-5xl font-normal whitespace-nowrap transition-all text-slate-500">
                          •
                        </div>
                      )
                    ]).filter(Boolean)}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <p className="mt-4 mx-auto text-base md:text-lg text-slate-300 text-center">
            Whether you pursue deep technical expertise or business-driven tech roles,<br/>Project X Summer Fellowship Program 2026 <strong className="text-secondary">offers a pathway tailored to your ambitions.</strong>
          </p>
        </div>
      </section>

      {/* The Fellowship Journey 2026 */}
      <section id="journey" className="relative min-h-[auto] md:min-h-screen flex flex-col justify-center py-16 md:py-24 transition-colors duration-200 snap-start bg-[#01001F]">
        <div className="pointer-events-none absolute -left-[120%] md:-left-[48%] top-1/2 -translate-y-1/2 z-0 w-[200vw] md:w-[90vw] aspect-square md:max-w-[1500px]">
          <Image
            src="/images/sfp2026/moonlight_v2.svg"
            alt=""
            width={1972}
            height={1050}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-5xl md:text-6xl font-medium text-white">The <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent gradient-clip-fix">Fellowship Journey 2026</span></h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
A structured journey from selection to internship placement and professional development</p>
          </motion.div>

          <div ref={journeyRef} className="relative mx-auto w-full md:w-[750px]">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/10" />
            <motion.div
              style={{ scaleY: journeyProgress, transformOrigin: "top" }}
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-primary"
            />

            <div className="space-y-10">
              {journeySteps.map((step, i) => {
                const Icon = i < 3 ? Calendar : Rocket;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`relative flex items-center ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`ml-12 md:ml-0 ${i % 2 === 0 ? "md:text-left md:pr-[calc(50%-189px)]" : "md:text-left md:pl-[calc(50%-189px)]"}`}
                    >
                      <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 12 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: i * 0.08 + 0.1 }}
                        className="group relative w-[300px] md:w-[340px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#0E56FA]/40 via-white/5 to-[#17CAFA]/40 backdrop-blur-lg text-white"
                      >
                        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-primary/40 transition-colors" />
                        <div className="relative px-6 py-5 space-y-2">
                          <div className="flex items-center gap-3 text-primary">
                            <Icon className="w-4 h-4" />       
                              <p className="text-sm text-white">{step.date}</p>
                          </div>
                          <h3 className="text-base md:text-lg font-bold text-white">{step.title}</h3>
                          <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How SFP Shapes Our Fellows */}
      <section id="testimonials" className="relative min-h-[auto] md:min-h-screen flex flex-col justify-center py-16 md:py-24 transition-colors duration-200 snap-start">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-2xl animate-pulse [animation-duration:8s]">
            <Image src="/images/sfp2026/cloud.svg" alt="" width={1600} height={900} className="w-full" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <p className="text-sm md:text-base font-medium text-slate-300">
              How Project X Summer Fellowship Program shapes our fellows
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-center mb-4 text-white"
          >
            Not just skills, but a <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent gradient-clip-fix">shift</span> in <br /> how they see their <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent gradient-clip-fix">future</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-sm md:text-base mb-12 text-slate-300"
          >
            — Voices from our Fellows (Class of 2025)
          </motion.p>

          <div className="flex flex-wrap justify-center gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={testimonial.name} className="w-full md:w-[calc(33.333%-1rem)]">
                <TestimonialFlipCard
                  testimonial={testimonial as TestimonialData}
                  index={i}
                />
              </div>
            ))}
            <div className="w-full md:w-[calc(33.333%-1rem)]">
              <FellowCTACard />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="min-h-[auto] md:min-h-screen flex flex-col justify-center py-16 md:py-24 transition-colors duration-500 snap-start bg-[#01001F]">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-medium text-center mb-12 text-white">
            Frequently Asked <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent gradient-clip-fix">Questions</span>
          </motion.h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden bg-gradient-to-br from-[#0E56FA]/40 via-white/5 to-[#17CAFA]/40 border-white/10 backdrop-blur-lg"
              >
                <button
                  onClick={() => handleFaqToggle(i, item.q)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-medium text-white"
                >
                  {item.q}
                  <span className={`flex-shrink-0 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-4 pt-0 text-slate-300 text-sm">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative py-16 md:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 left-1/2 -translate-x-1/2 max-w-7xl w-full px-4 sm:px-6 lg:px-10 h-full overflow-hidden">
          <Image
            src="/images/sfp2026/moonlight.svg"
            alt=""
            width={1200}
            height={600}
            className="w-full h-full object-cover object-top opacity-50"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight"
          >
            Where your tech career <br/> takes{" "}
            <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent gradient-clip-fix">shape</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }} 
            className="mt-10"
          >
            <Link href="/sfp2026/apply" onClick={() => trackClickApplyCta("bottom_cta", "cta")}>
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-base md:text-lg font-semibold hover:scale-[1.02] transition-all">
                Apply now
                <svg className="ml-2 w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t transition-colors duration-500 bg-[#020818] border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image src="/favicon.svg" alt="Project X Vietnam" width={28} height={28} />
              <span className="text-sm font-medium text-white/60">
                © 2026 Project X Vietnam
              </span>
            </div>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-medium transition-colors text-white/40 hover:text-primary"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
