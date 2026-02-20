"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { Calendar, Users, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Package, TrendingUp } from "lucide-react";
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
    <div className="mt-10">
      
      <div className="mx-auto p-[1px] rounded-3xl bg-gradient-to-tr from-transparent via-secondary/5 to-primary/20 border border-white/20">
        <div className="relative p-8 md:p-10 lg:p-12 rounded-3xl backdrop-blur-lg">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 blur-xl opacity-60" />
          <p className="text-center text-sm md:text-base font-medium mb-4 text-slate-300">
        Application closes in
      </p>
          {/* Content Layer */}
          <div className="relative z-10 flex justify-center items-center gap-[clamp(0.5rem,2vw,1.75rem)]">
            {[
              [d, "Days"],
              [h, "Hours"],
              [m, "Minutes"],
              [s, "Seconds"],
            ].map(([val, label], idx) => (
              <div key={String(label)} className="flex flex-col items-center">
                <div className="flex items-center">
                  <div className="font-bold tabular-nums min-w-[clamp(2rem,5vw,5rem)] text-white text-center" style={{ fontSize: "clamp(2rem, 8vw, 8rem)" }}>
                    {String(val).padStart(2, "0")}
                  </div>
                  {idx < 3 && (
                    <div className="text-white/40 ml-[clamp(0.25rem,1vw,1rem)] font-light" style={{ fontSize: "clamp(1.5rem, 6vw, 7rem)" }}>:</div>
                  )}
                </div>
                <div className="font-medium mt-2 text-slate-300" style={{ fontSize: "clamp(0.625rem, 1.5vw, 0.875rem)" }}>{label}</div>
              </div>
            ))}
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
      avatar: null,
    },
    {
      name: "Le Huong Giang",
      roleLines: ["National Economics University", "Founder Associate @NaviEdu"],
      quote: "Project X SFP is a catalyst, connecting me with the right people at the right time and contributing to the path I am pursuing now.",
      avatar: null,
    },
    {
      name: "Bui Quynh Giao",
      roleLines: ["Foreign Trade University", "Performance Marketing Intern @ GiveAsia"],
      quote: "Project X SFP turned mentorship into a meaningful, human connection - not just advice, but real guidance.",
      avatar: null,
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
    { date: "30/03 - 25/04", title: "Round 2", desc: "Enhance interview readiness before and during job application." },
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
    { title: "Exclusive internships", desc: "Providing exclusive internship opportunities for fellows.", count: "" },
    { title: "Mentorship & workshops", desc: "Participating in mentorship, workshops, and company tours.", count: "" },
    { title: "Future-ready talent", desc: "Supporting the development of future-ready tech talent.", count: "" },
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

  const partnerLogosSmall = [
    { src: "/images/partners/vng_logo.png", alt: "VNG" },
    { src: "/images/partners/grab_logo.png", alt: "Grab" },
    { src: "/images/partners/asilla-logo.jpg", alt: "Asilla" },
    { src: "/images/partners/lg-logo.png", alt: "LG" },
    { src: "/images/partners/one-mount-logo.png", alt: "One Mount" },
  ];

  const partnerLogosAll = [
    { src: "/images/partners/appota-logo.png", alt: "Appota" },
    { src: "/images/partners/chotot-logo.png", alt: "Chotot" },
    { src: "/images/partners/geek-up-logo.png", alt: "Geek Up" },
    { src: "/images/partners/got-it-logo.png", alt: "Got It" },
    { src: "/images/partners/grab_logo.png", alt: "Grab" },
    { src: "/images/partners/holistics-logo.svg", alt: "Holistics" },
    { src: "/images/partners/shopee-logo.png", alt: "Shopee" },
    { src: "/images/partners/tiki_logo.png", alt: "Tiki" },
    { src: "/images/partners/vng_logo.png", alt: "VNG" },
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
    "Adjacent tech-business roles",
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
      className="relative transition-colors duration-200 scroll-smooth bg-[#01001F]"
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
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-8 snap-start">
        <div className="pointer-events-none absolute top-0 left-1/4 rotate-[60deg] -translate-y-1/4 w-[100vw] h-[100vh] overflow-hidden">
          <Image
            src="/images/sfp2026/light.svg"
            alt=""
            width={3600}
            height={1200}
            priority
            className="w-full h-full object-cover opacity-80 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
          />
        </div>


        {/* Main Content Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          {/* Main Headline with Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent">
              Illuminate
            </span>
            <span className="text-white"> your tech <br /> career path</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-slate-300 leading-relaxed"
            style={{ fontFamily: "SF Pro Display, -apple-system, sans-serif" }}
          >
            Project X Summer Fellowship Program 2026 is the guiding light <br /> that turns potential into clear direction in tech          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/sfp2026/apply" onClick={() => trackClickApplyCta("hero", "hero")}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] hover:from-[#0E56FA]/90 hover:to-[#17CAFA]/90 text-white rounded-full px-10 py-6 text-base md:text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02] w-full sm:w-auto"
              >
                Register now
              </Button>
            </Link>
            <a href="#impact">
              <Button
                size="lg"
                variant="outline"
                className="group rounded-full px-10 py-6 text-base md:text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all w-full sm:w-auto"
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
      <section id="impact" className="relative min-h-screen flex flex-col justify-center py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden">
        <div className="max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative text-center mb-12">
            <div className="pointer-events-none absolute left-1/2 top-4 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Our <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent">impact</span> so far
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-slate-300">
              Project X Summer Fellowship Program has grown into one of Vietnam&apos;s most impactful tech initiatives - an integrated talent development ecosystem shaping the next generation of tech leaders.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 justify-items-center">
            {impactStats.map((stat, i) => {
              const labelParts = stat.label.split(" in ");
              const lines = labelParts.length > 1 ? labelParts.slice(0, 2) : [labelParts[0], ""];
              const positionClass =
                i === 0
                  ? "lg:col-span-2"
                  : i === 1
                    ? "lg:col-span-2"
                    : i === 2
                      ? "lg:col-span-2"
                      : i === 3
                        ? "lg:col-span-2 lg:col-start-2"
                        : i === 4
                          ? "lg:col-span-2 lg:col-start-4"
                          : "";
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative w-full max-w-[260px] p-[1px] rounded-2xl bg-gradient-to-br from-[#0E56FA]/40 via-white/5 to-[#17CAFA]/40  ${positionClass}`}
                >
                  {/* Inner Glass Container */}
                  <div
                    className="relative px-8 py-8 rounded-2xl 
    bg-white/[0.04] backdrop-blur-lg 
    shadow-[0_15px_50px_rgba(0,0,0,0.25)] 
    overflow-hidden flex flex-col justify-between items-start"
                  >
                    {/* Inner Gradient Blur Light */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl 
      bg-gradient-to-br from-[#0E56FA]/10 via-transparent to-[#17CAFA]/10 
      blur-xl opacity-60"
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-1 pb-2">
                      {lines.map((part, idx) => (
                        <p
                          key={idx}
                          className="text-sm font-medium text-white/75"
                          style={{ fontFamily: "SF Pro Display, -apple-system, sans-serif" }}
                        >
                          {part}
                        </p>
                      ))}
                    </div>

                    <div
                      className="relative z-10 text-5xl md:text-6xl font-bold mt-auto text-white leading-none tracking-tight"
                      style={{ fontFamily: "Plus Jakarta Sans, -apple-system, sans-serif" }}
                    >
                      {stat.suffix === "%"
                        ? `~${stat.value}${stat.suffix}`
                        : <><AnimatedCounter value={stat.value} suffix={stat.suffix} /></>}
                    </div>
                  </div>
                </motion.div>

              );
            })}
          </div>
        </div>
      </section>

      {/* About Project X Vietnam */}
      <section id="about-pjx" ref={aboutRef} className="relative min-h-screen flex flex-col justify-center py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 z-0 w-[80vw]">
          <Image src="/images/sfp2026/cloud.svg" alt="" width={1200} height={800} className="w-full" />
        </div>
        <div className="relative z-10 max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10">
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
                className="text-3xl md:text-4xl font-bold text-left text-white"
              >
                <span>About </span>
                <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent">{aboutPJXTyped}</span>
                <span className="inline-block w-0.5 h-8 bg-primary animate-cursor-blink align-middle ml-1" />
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
        className="relative min-h-screen flex flex-col justify-center py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden"
      >
        <div className="pointer-events-none absolute top-0 right-0 z-0 translate-x-1/4 -translate-y-1/4 w-[80vw]  scale-y-[-1]">
          <Image src="/images/sfp2026/cloud.svg" alt="" width={1200} height={800} className="w-full" />
        </div>
        <div className="relative z-10 max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-16 text-left text-white"
          >
            <span>About </span>
            <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent">{aboutSFPTyped}</span>
            <span className="inline-block w-0.5 h-8 bg-primary animate-cursor-blink align-middle ml-1" />
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p
                className="text-md md:text-base font-medium text-slate-200"
              >
                Through mentorship, hands-on learning, and a strong community,
                Project X helps you:
              </p>
              <div ref={rotatingRef} className="relative h-[420px] w-full">
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
              <div className="relative h-[420px]">
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
      <section id="partners" className="relative min-h-screen flex flex-col justify-center py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden">
        <div className="max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-2xl animate-pulse [animation-duration:8s]">
            <Image src="/images/sfp2026/cloud.svg" alt="" width={1600} height={900} className="w-full" />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="pointer-events-none absolute left-1/2 top-4 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Trusted by <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent">Multiple Partners</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-slate-300">
              Project X collaborates with a growing network of leading technology companies, startups, and innovation-driven organizations across Vietnam and globally.
            </p>
          </motion.div>

          {/* Partner logos grid (small) */}
          <div className="mb-12 lg:hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center">
              {partnerLogosSmall.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <div className="relative w-24 h-12 sm:w-28 sm:h-14">
                    <Image src={logo.src} alt={logo.alt} fill className="object-contain brightness-0 invert" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner logos marquee (large) */}
          <div className="mb-12 hidden lg:block overflow-hidden">
            <div className="marquee">
              <div className="marquee__track gap-6 py-6">
                {[...Array(2)].map((_, set) => (
                  <div key={set} className="marquee__group gap-6 pr-6">
                    {partnerLogosAll.map((logo) => (
                      <div key={`${set}-${logo.alt}`} className="flex items-center justify-center">
                        <div className="relative w-28 h-14 xl:w-32 xl:h-16">
                          <Image src={logo.src} alt={logo.alt} fill className="object-contain brightness-0 invert" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partner roles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {partnerRoles.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative w-full p-[1px] rounded-2xl bg-gradient-to-br from-[#0E56FA]/40 via-white/5 to-[#17CAFA]/40"
              >
                <div
                  className="relative px-6 py-6 rounded-2xl
                  overflow-hidden flex flex-col justify-between items-start"
                >

                  <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-primary">
                    {i === 0 && <Package className="w-6 h-6 text-white" />}
                    {i === 1 && <Users className="w-6 h-6 text-white" />}
                    {i === 2 && <TrendingUp className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="relative z-10 font-bold text-lg mb-2 text-white">{card.title}</h3>
                  <p className="relative z-10 text-sm text-slate-300">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mentors section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-white">Meet Our Top Mentors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4 mb-4">
              {featuredMentors.map((mentor, i) => (
                <motion.div
                  key={mentor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 md:w-18 md:h-18 rounded-full mb-3 overflow-hidden border border-white/10 bg-gradient-to-br from-[#0E56FA]/40 via-white/5 to-[#17CAFA]/40 backdrop-blur-lg">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold text-white">{mentor.name}</p>
                  <p className="text-[11px] text-slate-300">{mentor.role}</p>
                  <p className="text-[11px] text-slate-400">@{mentor.company}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-400">and many more mentors across diverse tech domains</p>
          </div>
        </div>
      </section>

      {/* Targeted Roles & Domains */}
      <section id="roles" className="min-h-screen flex flex-col justify-center py-24 transition-colors duration-200 snap-start bg-[#01001F] overflow-hidden">
        <div className="max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="pointer-events-none absolute left-1/2 top-4 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
      
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Targeted <span className="bg-gradient-to-r from-[#0E56FA] to-[#17CAFA] bg-clip-text text-transparent">Roles & Domains</span></h2>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-500">
Project X Summer Fellowship Program 2026 supports a comprehensive range of tech and tech-related positions, including:            </p>
          </motion.div>

          {/* Scrolling roles - Multi-line with alternating directions */}
          <div className="space-y-6 overflow-hidden">
              <div className="marquee">
                <div className="marquee__track gap-4 sm:gap-6 lg:gap-8 px-4">
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
                <div className="marquee__track gap-4 sm:gap-6 lg:gap-8 px-4" style={{ animationDuration: "34s" }}>
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
            <p className="mt-4 mx-auto text-base md:text-lg text-slate-300 text-center">
              Whether you pursue deep technical expertise or business-driven tech roles,<br/>Project X Summer Fellowship Program 2026 <strong className="text-secondary">offers a pathway tailored to your ambitions.</strong>
            </p>          
          </div>
        </div>
      </section>

      {/* The Fellowship Journey 2026 */}
      <section id="journey" className="relative min-h-screen flex flex-col justify-center py-24 transition-colors duration-200 snap-start bg-[#01001F]">
        <div className="max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">The Fellowship Journey 2026</h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              A high-contrast, tech-forward roadmap from application to launch.
            </p>
          </motion.div>

          <div ref={journeyRef} className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
            <motion.div
              style={{ scaleY: journeyProgress, transformOrigin: "top" }}
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-primary"
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
                      className={`ml-12 md:ml-0 ${i % 2 === 0 ? "md:pr-24" : "md:pl-24"}`}
                    >
                      <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 12 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: i * 0.08 + 0.1 }}
                        className="group relative w-[320px] md:w-[380px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#0E56FA]/40 via-white/5 to-[#17CAFA]/40 backdrop-blur-lg text-white"
                      >
                        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-primary/40 transition-colors" />
                        <div className="relative px-6 py-5 space-y-2">
                          <div className="flex items-center gap-3 text-primary">
                            <Icon className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#17CAFA] bg-[#17CAFA]/10 border border-[#17CAFA]/30 rounded-full px-2.5 py-1">
                              {step.date}
                            </span>
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
      <section id="testimonials" className="relative min-h-screen flex flex-col justify-center py-24 transition-colors duration-200 snap-start bg-[#01001F]">
        <div className="max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10">
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-white"
          >
            Not just skills, but a shift in <br /> how they see their future
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-sm md:text-base mb-12 text-slate-300"
          >
            — Voices from our Fellows (Class of 2025)
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => {
              const [university, role] = testimonial.roleLines;
              return (
                <motion.div
                  key={testimonial.name}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0E56FA]/10 via-white/5 to-[#17CAFA]/10 backdrop-blur-lg p-8"
                >
                  <div className="pointer-events-none absolute right-[-20%] top-[-20%] h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />
                  <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/10 backdrop-blur-lg" />
                  <div className="relative z-10 mb-6 space-y-1">
                    <div className="text-lg font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{university}</div>
                    <div className="text-xs text-slate-400">{role}</div>
                  </div>

                  <div className="relative z-10">
                    <div className="absolute -top-4 left-0 text-5xl font-bold text-white/20">&ldquo;</div>
                    <p className="pt-6 text-base md:text-lg leading-relaxed text-white">
                      {testimonial.quote}
                    </p>
                    <div className="absolute -bottom-6 right-0 text-5xl font-bold text-white/20">&rdquo;</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start bg-[#01001F]">
        <div className="max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Frequently Asked Questions
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
      <section id="cta" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(135deg, #01001F 0%, #0E56FA 55%, #17CAFA 100%)" }}>
        <div className="relative z-10 max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Where Your Tech Career Takes Shape
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-6 text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            For tech-driven students seeking clear direction, real-world skills, industry mentorship, and long-term professional networks, SFP2026 is where your tech career takes shape.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="mt-4 text-white/90 font-medium">
            Project X Summer Fellowship Program 2026 is your next step.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-10">
            <Link href="/sfp2026/apply" onClick={() => trackClickApplyCta("bottom_cta", "cta")}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg">
                Apply now and shape your future in tech
                <svg className="ml-2 w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t transition-colors duration-500 bg-[#01001F] border-white/10">
        <div className="max-w-[75vw] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <Image src="/favicon.svg" alt="Project X Vietnam" width={32} height={32} />
              <span className="text-sm text-slate-300">© 2026 Project X Vietnam</span>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Links</h4>
              <div className="flex flex-col gap-2">
                {["About", "Contact", "Privacy", "Terms"].map((label) => (
                  <a key={label} href="#" className="text-sm text-slate-300 hover:text-primary">{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Social</h4>
              <div className="flex gap-4">
                {["Facebook", "LinkedIn", "Twitter"].map((s) => (
                  <a key={s} href="#" className="text-sm text-slate-300 hover:text-primary">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 min-w-0 px-4 py-2 rounded-lg border text-sm bg-white/5 border-white/10 text-slate-200"
                />
                <Button size="sm" className="rounded-lg bg-primary text-white flex-shrink-0">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
