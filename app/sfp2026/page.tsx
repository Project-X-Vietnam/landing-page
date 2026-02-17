"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence, animate, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackSFP2026Event(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

const COUNTDOWN_TARGET = new Date("2026-02-20T00:00:00Z");

const SECTION_IDS = ["impact", "about-pjx", "about-sfp", "mission", "partners", "roles", "journey", "testimonials", "faq"] as const;
const SECTION_LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  impact: "Impact",
  "about-pjx": "About PJX",
  "about-sfp": "About SFP",
  mission: "Mission",
  partners: "Partners",
  roles: "Opportunities",
  journey: "Timeline",
  testimonials: "Testimonials",
  faq: "FAQs",
};

function useTypingText(text: string, speed = 60) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
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
  }, [text, speed]);
  return typed;
}

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) setIsDark(true);
  }, []);
  const toggle = () => {
    setIsDark((prev) => {
      const v = !prev;
      localStorage.setItem("theme", v ? "dark" : "light");
      return v;
    });
  };
  return { isDark, toggle };
}

function DarkModeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-xl shadow-lg border transition-all duration-300 ${isDark ? "bg-white/10 border-white/20" : "bg-white border-slate-200 shadow-slate-200/50"
          }`}
      >
        <svg className={`w-4 h-4 ${isDark ? "text-white/40" : "text-amber-500"}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
        <button
          onClick={toggle}
          aria-label="Toggle dark mode"
          className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isDark ? "bg-primary" : "bg-slate-200"} ${isDark ? "focus:ring-offset-[#020818]" : "focus:ring-offset-white"}`}
        >
          <motion.div
            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
            animate={{ x: isDark ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <svg className={`w-4 h-4 ${isDark ? "text-primary" : "text-slate-400"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    </motion.div>
  );
}

function Countdown({ isDark }: { isDark: boolean }) {
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
      <p className={`text-center text-sm md:text-base font-medium mb-4 ${isDark ? "text-white/70" : "text-slate-600"}`}>
        Application closes in
      </p>
      <div className={`p-6 md:p-8 rounded-3xl border backdrop-blur-xl max-w-lg mx-auto ${isDark ? "bg-white/10 border-white/20" : "bg-white/80 border-white shadow-lg"}`}>
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8">
          {[
            [d, "Days"],
            [h, "Hours"],
            [m, "Minutes"],
            [s, "Seconds"],
          ].map(([val, label]) => (
            <div key={String(label)} className="text-center">
              <div className={`text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums min-w-[3rem] md:min-w-[4rem] ${isDark ? "text-primary" : "text-primary"}`}>
                {String(val).padStart(2, "0")}
              </div>
              <div className={`text-xs sm:text-sm font-medium mt-2 ${isDark ? "text-white/60" : "text-slate-600"}`}>{label}</div>
            </div>
          ))}
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

function StickySectionNav({ isDark }: { isDark: boolean }) {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setVisible(e.boundingClientRect.top < 80),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    const el = document.getElementById("impact");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTION_IDS.map(id => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { id, top: rect.top };
      }).filter(Boolean);

      const current = sections.find(s => s && s.top >= 0);
      if (current) {
        setActiveSection(current.id);
      } else if (sections.length > 0) {
        const last = sections[sections.length - 1];
        if (last) setActiveSection(last.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-40 py-3 px-4 md:px-8 backdrop-blur-xl border-b transition-colors ${isDark ? "bg-[#020818]/90 border-white/10" : "bg-white/90 border-slate-200/50"
        }`}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-xs md:text-sm font-medium px-3 py-1.5 rounded-full transition-all ${activeSection === id
              ? isDark
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-primary/10 text-primary border border-primary/30"
              : isDark
                ? "text-white/50 hover:text-primary hover:bg-white/10"
                : "text-slate-500 hover:text-primary hover:bg-slate-100"
              }`}
          >
            {SECTION_LABELS[id]}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

export default function SFP2026Page() {
  const { isDark, toggle } = useDarkMode();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const aboutPJXTyped = useTypingText("Project X Vietnam");
  const aboutSFPTyped = useTypingText("Summer Fellowship Program 2026");
  const [missionCardIndex, setMissionCardIndex] = useState(0);
  const [isOrbitalPaused, setIsOrbitalPaused] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef, { once: true });
  const outerRotate = useMotionValue(0);
  const middleRotate = useMotionValue(0);
  const outerCounterRotate = useTransform(outerRotate, (v) => -v);
  const middleCounterRotate = useTransform(middleRotate, (v) => -v);
  const outerControls = useRef<ReturnType<typeof animate> | null>(null);
  const middleControls = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (isOrbitalPaused) {
      outerControls.current?.stop();
      middleControls.current?.stop();
      return;
    }
    outerControls.current = animate(outerRotate, 360, { duration: 20, repeat: Infinity, ease: "linear" });
    middleControls.current = animate(middleRotate, 360, { duration: 15, repeat: Infinity, ease: "linear" });
    return () => {
      outerControls.current?.stop();
      middleControls.current?.stop();
    };
  }, [isOrbitalPaused, outerRotate, middleRotate]);

  useEffect(() => {
    if (!missionInView) return;
    const interval = setInterval(() => {
      setMissionCardIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, [missionInView]);

  const testimonials = [
    { name: "Fellow 2024", role: "Product", quote: "Not just work, but a world where they see their future. That's what PJX gave me.", avatar: null },
    { name: "Mentee 2024", role: "Software Engineer", quote: "The mentors and training gave me clarity and confidence. I landed my first tech role.", avatar: null },
    { name: "Alumni", role: "Data Science", quote: "The community and support are unmatched. Forever grateful.", avatar: null },
    { name: "Fellow SFP 2024", role: "Engineering", quote: "SFP connected me with mentors and a real internship. It was the turning point in my career.", avatar: null },
    { name: "Fellow SFP 2025", role: "Product Design", quote: "Long-term transformation, not just a summer—I still lean on my cohort and mentors today.", avatar: null },
  ];

  const faqItems = [
    { q: "Who can apply to the Project X Summer Fellowship Program 2026?", a: "The program is open to students and early-career individuals who are passionate about technology-related fields, regardless of academic background or university, as long as they demonstrate strong motivation and commitment." },
    { q: "Do I need prior work or internship experience?", a: "No. Project X is designed to support students at different stages. What matters most is your potential, mindset, and willingness to learn." },
    { q: "Is this a paid program?", a: "Project X is a non-profit initiative. Any program-related fees (if applicable) are transparently communicated and reinvested to maintain program quality, operations, and community impact." },
    { q: "Is an internship guaranteed?", a: "Internship opportunities are provided through our partner network. While placements depend on performance and partner requirements, Project X offers exclusive access, preparation, and matching support to maximize your chances." },
    { q: "How competitive is the selection process?", a: "Project X receives thousands of applications each year. Our selection process focuses on potential, motivation, and alignment, not just academic achievements." },
    { q: "What makes SFP2026 different from other programs?", a: "SFP2026 combines career orientation, practical training, mentorship, and real industry access into one cohesive journey supported by a strong, long-term community rather than a one-off experience." },
  ];

  const journeySteps = [
    { date: "20/02 - 13/03", title: "Official Application", desc: "Application period opens for Project X Summer Fellowship Program 2026." },
    { date: "16/03 - 28/03", title: "Round 1", desc: "Selection and screening of all applications." },
    { date: "30/03 - 25/04", title: "Round 2", desc: "Final evaluation and interviews." },
    { date: "09/07 - 22/08", title: "SFP 2026", desc: "Summer Fellowship Program with internships and professional development." },
  ];

  const impactStats = [
    { value: 6000, suffix: "+", label: "Applicants in 2025" },
    { value: 60, suffix: "+", label: "Tech partners" },
    { value: 180, suffix: "+", label: "Exclusive internship opportunities" },
    { value: 85, suffix: "+", label: "Mentors across diverse domains" },
    { value: 95, suffix: "%", label: "Partner satisfaction rate post-internship" },
  ];

  const missionPillars = [
    { num: "01", title: "Empower", text: "Equip students with early career direction and essential foundations." },
    { num: "02", title: "Nurture", text: "Develop a high-quality pool of future tech professionals aligned with industry trends." },
    { num: "03", title: "Support", text: "Contribute to the growth of tech startups and companies through young talent development." },
  ];

  const partnerRoles = [
    { title: "Exclusive internships", desc: "Providing exclusive internship opportunities for fellows.", count: "" },
    { title: "Mentorship & workshops", desc: "Participating in mentorship, workshops, and company tours.", count: "" },
    { title: "Future-ready talent", desc: "Supporting the development of future-ready tech talent.", count: "" },
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
  const [exitingCard, setExitingCard] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const rotatingRef = useRef<HTMLDivElement>(null);
  const rotationTimer = useRef<NodeJS.Timeout | null>(null);

  const rotatingInView = useInView(rotatingRef, {
    once: true,
    amount: 0.2,
  });

  const getStackPosition = (index: number) => {
    return (index - activeCard + rotatingCards.length) % rotatingCards.length;
  };

  useEffect(() => {
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
    }, 100);

    return () => {
      clearTimeout(startDelay);
      if (rotationTimer.current) clearInterval(rotationTimer.current);
    };
  }, [rotatingInView, activeCard]);


  return (
    <main className={`overflow-x-hidden transition-colors duration-500 scroll-smooth snap-y snap-mandatory h-screen overflow-y-scroll ${isDark ? "bg-[#020818]" : "bg-white"}`}>
      <DarkModeToggle isDark={isDark} toggle={toggle} />
      <Navbar isDark={isDark} />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16 snap-start">
        <div className="absolute inset-0 overflow-hidden transition-all duration-500">
          {isDark ? (
            <>
              <div className="absolute inset-0 bg-[#020818]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,86,250,0.2)_0%,_transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,209,255,0.15)_0%,_transparent_60%)]" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(to right, rgba(14,86,250,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,86,250,0.3) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-cyan-50" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right, #0E56FA 1px, transparent 1px), linear-gradient(to bottom, #0E56FA 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
            </>
          )}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight ${isDark ? "text-white" : "text-pxv-dark"}`}
          >
            Illuminate your tech career path
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mt-6 text-base md:text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}
          >
            As technology outpaces education, students need more than theory.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`mt-2 text-base md:text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}
          >
            Project X Summer Fellowship Program 2026 was built to connect learning with real-world impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/recruitment2026" onClick={() => trackSFP2026Event("sfp2026_cta_apply_click")}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02]">
                Apply Now
                <svg className="ml-2 w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Button>
            </Link>
            <a href="#impact">
              <Button size="lg" variant="outline" className={`rounded-full px-8 py-6 text-base font-semibold ${isDark ? "border-white/20 text-white hover:bg-white/10" : "border-slate-200 hover:bg-slate-50"}`}>
                Learn More
              </Button>
            </a>
          </motion.div>
          <div className={isDark ? "text-white" : "text-pxv-dark"}>
            <Countdown isDark={isDark} />
          </div>
        </div>
      </section>

      <StickySectionNav isDark={isDark} />

      {/* Our Impact So Far */}
      <section id="impact" className={`min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start ${isDark ? "bg-[#0a0f1a]" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>Our Impact So Far</h2>
            <p className={`mt-4 max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Project X Summer Fellowship Program has grown into one of Vietnam&apos;s most impactful student-led tech initiatives - an integrated talent development ecosystem shaping the next generation of tech leaders.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {impactStats.map((stat, i) => {
              const labelParts = stat.label.split(" in ");
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-full max-w-[260px] px-8 py-8 rounded-2xl border flex flex-col justify-between items-start h-full ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-lg"}`}
                >
                  <div className="space-y-1 flex-1">
                    {labelParts.map((part, idx) => (
                      <p key={idx} className={`text-sm font-sm  ${isDark ? "text-white/70" : "text-slate-600"}`}>
                        {part}
                      </p>
                    ))}
                  </div>
                  <div className={`text-6xl md:text-7xl font-bold mt-auto ${isDark ? "text-primary" : "text-primary"}`}>
                    {stat.suffix === "%" ? `~${stat.value}${stat.suffix}` : <><AnimatedCounter value={stat.value} suffix={stat.suffix} /></>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Project X Vietnam */}
      <section id="about-pjx" ref={aboutRef} className={`min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start ${isDark ? "bg-[#020818]" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold mb-16 text-left ${isDark ? "text-white" : "text-pxv-dark"}`}
          >
            <span>About</span>
            <span className="mx-2 text-primary">|</span>
            <span className="text-primary">{aboutPJXTyped}</span>
            <span className="inline-block w-0.5 h-8 bg-primary animate-pulse align-middle ml-1" />
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div className="space-y-6">
              <div>
                <p className={`text-base md:text-lg leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  Founded in 2022, Project X Vietnam is a NGO with the mission to bridge the gap between young talents and companies in the Vietnam’s tech ecosystem via our annual flagship, called Project X Summer Fellowship Program.                </p>
                <br />
                <p className={`text-base md:text-lg leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  Our mission is built on three core pillars: <strong>Empower, Nurture & Support.</strong>
                </p>
              </div>
            </div>
            <div className={`p-8 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-lg"}`}>
              <div className={`background-gradient'`}></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About SFP2026 */}
      <section
        id="about-sfp"
        className={`min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start ${isDark ? "bg-[#0a0f1a]" : "bg-slate-50"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold mb-16 text-left ${isDark ? "text-white" : "text-pxv-dark"}`}
          >
            <span>About</span>
            <span className="mx-2 text-primary"></span>
            <span className="text-primary">{aboutSFPTyped}</span>
            <span className="inline-block w-0.5 h-8 bg-primary animate-pulse align-middle ml-1" />
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p
                className={`text-md md:text-base font-medium ${isDark ? "text-white" : "text-pxv-dark"
                  }`}
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
                          duration: 3.0,
                          ease: [0.4, 0.4, 0.2, 1],
                        },
                        duration: 0.7,
                      }}
                      style={{
                        position: "absolute",
                        zIndex: 100 - position,
                        top: 0,
                        left: 0,
                        right: 0,
                      }}
                      className={`h-24 md:h-28 p-6 rounded-2xl ${isDark
                          ? "bg-[#111827] shadow-lg"
                          : "bg-white shadow-lg"
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`text-3xl md:text-4xl font-bold ${isDark ? "text-primary/90" : "text-primary"
                            }`}
                        >
                          {index + 1}
                        </span>

                        <div
                          className={`text-md md:text-lg font-semibold leading-relaxed ${isDark ? "text-white" : "text-pxv-dark"
                            }`}
                        >
                          {item}
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className={`p-8 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-lg"}`}>
              <div className={`background-gradient'`}></div>
            </div>
          </div>
        </div>
      </section>


      {/* Our Mission */}
      <section id="mission" ref={missionRef} className={`min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start ${isDark ? "bg-[#0a0f1a]" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-center ${isDark ? "text-white" : "text-pxv-dark"}`}>
            Our Mission
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Orbital Motion Graphics */}
            <motion.div ref={orbitalRef} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative w-full aspect-square flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 400" style={{ maxWidth: "500px" }}>
                {/* Outer Ring (20s rotation) */}
                <motion.g style={{ rotate: outerRotate, transformOrigin: "200px 200px" }}>
                  <circle cx="200" cy="200" r="150" fill="none" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} strokeWidth="2" />
                  {/* Outer Ring Icon - Support */}
                  <motion.g style={{ rotate: outerCounterRotate, transformOrigin: "200px 50px" }}>
                    <g
                      transform="translate(200, 50)"
                      className="cursor-pointer"
                      onMouseEnter={(event) => {
                        setIsOrbitalPaused(true);
                        setHoveredPillar("support");
                        const rect = orbitalRef.current?.getBoundingClientRect();
                        if (rect) setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
                      }}
                      onMouseMove={(event) => {
                        const rect = orbitalRef.current?.getBoundingClientRect();
                        if (rect) setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
                      }}
                      onMouseLeave={() => {
                        setIsOrbitalPaused(false);
                        setHoveredPillar(null);
                        setTooltipPos(null);
                      }}
                    >
                      <circle cx="0" cy="0" r="24" className={`transition-all ${hoveredPillar === "support" ? "fill-primary/60" : isDark ? "fill-white/20" : "fill-slate-200"}`} />
                      <circle cx="0" cy="-6" r="5" fill="white" />
                      <path d="M-10 12c0-6 20-6 20 0" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <rect x="-32" y="22" width="64" height="18" rx="9" fill="#1f2937" />
                      <text x="0" y="35" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">Support</text>
                    </g>
                  </motion.g>
                </motion.g>

                {/* Middle Ring (15s rotation) */}
                <motion.g style={{ rotate: middleRotate, transformOrigin: "200px 200px" }}>
                  <circle cx="200" cy="200" r="100" fill="none" stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"} strokeWidth="2" />
                  {/* Middle Ring Icons */}
                  {[{ angle: -90, label: "⚡", title: "Empower" }, { angle: 30, label: "🌱", title: "Nurture" }].map((item) => {
                    const rad = (item.angle * Math.PI) / 180;
                    const x = 200 + 100 * Math.cos(rad);
                    const y = 200 + 100 * Math.sin(rad);
                    return (
                      <motion.g key={item.angle} style={{ rotate: middleCounterRotate, transformOrigin: `${x}px ${y}px` }}>
                        <g
                          transform={`translate(${x}, ${y})`}
                          className="cursor-pointer"
                          onMouseEnter={(event) => {
                            setIsOrbitalPaused(true);
                            setHoveredPillar(item.title.toLowerCase());
                            const rect = orbitalRef.current?.getBoundingClientRect();
                            if (rect) setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
                          }}
                          onMouseMove={(event) => {
                            const rect = orbitalRef.current?.getBoundingClientRect();
                            if (rect) setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
                          }}
                          onMouseLeave={() => {
                            setIsOrbitalPaused(false);
                            setHoveredPillar(null);
                            setTooltipPos(null);
                          }}
                        >
                          <circle cx="0" cy="0" r="20" className={`transition-all ${hoveredPillar === item.title.toLowerCase() ? "fill-primary/60" : isDark ? "fill-white/30" : "fill-slate-300"}`} />
                          <circle cx="0" cy="-6" r="4" fill="white" />
                          <path d="M-8 10c0-5 16-5 16 0" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                          <rect x="-30" y="20" width="60" height="16" rx="8" fill="#1f2937" />
                          <text x="0" y="32" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">{item.title}</text>
                        </g>
                      </motion.g>
                    );
                  })}
                </motion.g>

                {/* Inner Ring - Static */}
                <circle cx="200" cy="200" r="50" fill="none" stroke={isDark ? "rgba(14,86,250,0.3)" : "rgba(14,86,250,0.2)"} strokeWidth="2" />
                <circle cx="200" cy="200" r="30" className={isDark ? "fill-white/10" : "fill-slate-100"} />
                <text x="200" y="208" textAnchor="middle" className="text-xs font-bold" fill={isDark ? "white" : "black"}>2022</text>
              </svg>

              {/* Tooltip for hovered pillar */}
              <AnimatePresence>
                {hoveredPillar && tooltipPos && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{ left: tooltipPos.x, top: tooltipPos.y }}
                    className={`pointer-events-none absolute -translate-x-1/2 -translate-y-full mb-4 px-4 py-3 rounded-lg text-sm font-medium border max-w-xs ${isDark ? "bg-white/10 border-white/20 text-white" : "bg-slate-900 text-white border-slate-800"}`}
                  >
                    {hoveredPillar === "support" && "Contribute to tech ecosystem growth through young talent development."}
                    {hoveredPillar === "empower" && "Equip students with early career direction and essential foundations."}
                    {hoveredPillar === "nurture" && "Develop a high-quality pool of future tech professionals."}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Stacked Mission Cards */}
            <div className="relative space-y-0 h-fit">
              <AnimatePresence mode="wait">
                {missionPillars.map((p, idx) => {
                  const isActive = idx === missionCardIndex;
                  const position = isActive ? 0 : (idx - missionCardIndex + 3) % 3;
                  const zIndex = isActive ? 30 : 20 - position;
                  const scale = isActive ? 1 : 1 - position * 0.08;
                  const offsetY = isActive ? 0 : position * 16;

                  return (
                    <motion.div
                      key={p.num}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0.8 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        position: isActive ? "relative" : "absolute",
                        zIndex,
                        transform: isActive ? "scale(1)" : `translateY(${offsetY}px) scale(${scale})`,
                      }}
                      className={`w-full p-6 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}
                    >
                      {/* Number behind card */}
                      <div className={`absolute top-2 right-2 text-5xl md:text-6xl font-bold opacity-[0.15] ${isDark ? "text-white" : "text-slate-900"}`}>
                        {p.num}
                      </div>
                      <div className="relative z-10">
                        <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-pxv-dark"}`}>{p.title}</h3>
                        <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>{p.text}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section id="partners" className={`min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start ${isDark ? "bg-[#020818]" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-pxv-dark"}`}>Trusted by Multiple Partners</h2>
            <p className={`text-base md:text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Project X collaborates with a growing network of leading technology companies, startups, and innovation-driven organizations across Vietnam and globally.
            </p>
          </motion.div>

          {/* Partner logos carousel */}
          <div className="overflow-hidden mb-12">
            <motion.div className="flex gap-8 py-6" animate={{ x: [0, -1200] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
              {[...Array(3)].map((_, set) => (
                <div key={set} className="flex gap-8 flex-shrink-0">
                  {["PwC", "Partner", "Logo", "Tech Co", "Startup"].map((name, i) => (
                    <div key={`${set}-${i}`} className={`w-28 h-16 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${isDark ? "bg-white/10 text-white/70 hover:bg-white/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                      {name}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Partner roles */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {partnerRoles.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${isDark ? "bg-primary/20" : "bg-primary/10"}`}>
                  {i === 0 && (
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 7H7v6h6V7z" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a6 6 0 00-9-5.5A6 6 0 004 18v1h12z" />
                    </svg>
                  )}
                </div>
                <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-pxv-dark"}`}>{card.title}</h3>
                <p className={`text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className={`text-center mb-12 ${isDark ? "text-white/60" : "text-slate-600"}`}>
            Our partners play a critical role in shaping the Fellowship experience by providing exclusive internship opportunities, participating in mentorship and workshops, and supporting the development of future-ready tech talent.
          </motion.p>

          {/* Mentors section */}
          <div>
            <h3 className={`text-2xl font-bold mb-8 text-center ${isDark ? "text-white" : "text-pxv-dark"}`}>Meet Our Top Mentors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-4">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-16 h-16 rounded-full mb-3 flex items-center justify-center text-sm font-semibold ${isDark ? "bg-white/10 text-white/70" : "bg-slate-200 text-slate-600"}`}>
                    M{i + 1}
                  </div>
                  <p className={`text-xs font-semibold ${isDark ? "text-white/80" : "text-slate-700"}`}>Mentor {i + 1}</p>
                  <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>Engineer</p>
                </motion.div>
              ))}
            </div>
            <p className={`text-center text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>and many more mentors across diverse tech domains</p>
          </div>
        </div>
      </section>

      {/* Targeted Roles & Domains */}
      <section id="roles" className={`min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start ${isDark ? "bg-[#0a0f1a]" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-pxv-dark"}`}>Targeted Roles & Domains</h2>
            <p className={`mt-4 max-w-2xl mx-auto text-base md:text-lg ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Project X Summer Fellowship Program 2026 supports a comprehensive range of tech and tech-related positions, including:
            </p>
          </motion.div>

          {/* Scrolling roles - Multi-line with alternating directions */}
          <div className="space-y-6">
            {/* Line 1 - Left to Right */}
            <div className={`py-6 overflow-hidden rounded-2xl ${isDark ? "bg-white/5" : "bg-white/50"}`}>
              <motion.div
                className="flex gap-8 px-4"
                animate={{ x: [0, -2400] }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(3)].map((_, set) => (
                  <div key={set} className="flex gap-8 flex-shrink-0">
                    {rolesList.slice(0, Math.ceil(rolesList.length / 2)).map((role, i) => (
                      <div key={`${set}-${i}`} className={`text-lg md:text-2xl font-semibold whitespace-nowrap transition-all ${isDark ? "text-white/80 hover:text-primary" : "text-slate-700 hover:text-primary"}`}>
                        • {role}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Line 2 - Right to Left */}
            <div className={`py-6 overflow-hidden rounded-2xl ${isDark ? "bg-white/5" : "bg-white/50"}`}>
              <motion.div
                className="flex gap-8 px-4"
                animate={{ x: [-2400, 0] }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(3)].map((_, set) => (
                  <div key={set} className="flex gap-8 flex-shrink-0">
                    {rolesList.slice(0, Math.ceil(rolesList.length / 2)).map((role, i) => (
                      <div key={`${set}-${i}`} className={`text-lg md:text-2xl font-semibold whitespace-nowrap transition-all ${isDark ? "text-white/80 hover:text-primary" : "text-slate-700 hover:text-primary"}`}>
                        • {role}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center text-base md:text-lg ${isDark ? "text-white/70" : "text-slate-600"}`}
          >
            Whether you pursue deep technical expertise or business-driven tech roles, Project X Summer Fellowship Program 2026 offers a pathway tailored to your ambitions.
          </motion.p>
        </div>
      </section>

      {/* The Fellowship Journey 2026 */}
      <section id="journey" className={`min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start ${isDark ? "bg-[#020818]" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>The Fellowship Journey 2026</h2>
            <p className={`mt-4 ${isDark ? "text-white/60" : "text-slate-600"}`}>A structured journey from selection to internship placement and professional development.</p>
          </motion.div>
          <div className="relative">
            <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 ${i === journeySteps.length - 1 ? "bg-gradient-to-br from-primary to-cyan-500" : isDark ? "bg-primary/50 border-2 border-primary" : "bg-primary/30 border-2 border-primary"}`} />
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className={`inline-block p-6 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100"}`}>
                    <span className="text-sm font-bold text-primary">{step.date}</span>
                    <h3 className={`text-lg font-bold mt-1 ${isDark ? "text-white" : "text-pxv-dark"}`}>{step.title}</h3>
                    <p className={`text-sm mt-1 ${isDark ? "text-white/60" : "text-slate-600"}`}>{step.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How SFP Shapes Our Fellows */}
      <section id="testimonials" className={`min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start ${isDark ? "bg-[#0a0f1a]" : "bg-slate-50"}`}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <p className={`text-sm md:text-base font-medium ${isDark ? "text-white/60" : "text-slate-600"}`}>
              HOW PROJECT X SUMMER FELLOWSHIP PROGRAM SHAPES OUR FELLOWS
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 ${isDark ? "text-white" : "text-pxv-dark"}`}
          >
            Not just skills, but a shift in how they see their future.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center text-sm md:text-base mb-12 ${isDark ? "text-white/60" : "text-slate-600"}`}
          >
            —Voices from our Fellows (Class of 2025)
          </motion.p>

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className={`p-3 rounded-full border flex-shrink-0 z-10 ${isDark ? "border-white/20 hover:bg-white/10" : "border-slate-200 hover:bg-slate-100"}`}
                aria-label="Previous"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>

              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  {[-1, 0, 1].map((offset) => {
                    const idx = (testimonialIndex + offset + testimonials.length) % testimonials.length;
                    const isCenter = offset === 0;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: isCenter ? 1 : 0.4, scale: isCenter ? 1 : 0.8, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className={`flex-shrink-0 transition-all ${isCenter ? "w-full max-w-md" : "hidden md:block md:max-w-sm"}`}
                      >
                        <div className={`p-8 rounded-2xl border h-full ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}>
                          <div className="relative mb-6">
                            <div className={`text-6xl font-bold ${isDark ? "text-white/10" : "text-slate-200"}`}>&ldquo;</div>
                            <p className={`text-lg md:text-xl leading-relaxed -mt-4 ${isDark ? "text-white/90" : "text-slate-700"}`}>
                              {testimonials[idx].quote}
                            </p>
                            <div className={`text-6xl font-bold text-right ${isDark ? "text-white/10" : "text-slate-200"}`}>&rdquo;</div>
                          </div>
                          <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0" }}>
                            <div className={`w-12 h-12 rounded-full flex-shrink-0 ${isDark ? "bg-white/20" : "bg-slate-200"}`} />
                            <div>
                              <div className={`font-bold text-sm ${isDark ? "text-white" : "text-pxv-dark"}`}>{testimonials[idx].name}</div>
                              <div className={`text-xs ${isDark ? "text-white/60" : "text-slate-500"}`}>{testimonials[idx].role}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                className={`p-3 rounded-full border flex-shrink-0 z-10 ${isDark ? "border-white/20 hover:bg-white/10" : "border-slate-200 hover:bg-slate-100"}`}
                aria-label="Next"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === testimonialIndex ? "bg-primary w-8" : isDark ? "bg-white/20" : "bg-slate-300"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`min-h-screen flex flex-col justify-center py-24 transition-colors duration-500 snap-start ${isDark ? "bg-[#020818]" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? "text-white" : "text-pxv-dark"}`}>
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-xl border overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-medium ${isDark ? "text-white" : "text-pxv-dark"}`}
                >
                  {item.q}
                  <span className={`flex-shrink-0 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className={`px-6 pb-4 pt-0 ${isDark ? "text-white/70" : "text-slate-600"} text-sm`}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0f1a 0%, #0a1a4a 50%, #0E56FA 100%)" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
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
            <Link href="/recruitment2026" onClick={() => trackSFP2026Event("sfp2026_cta_apply_click")}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg">
                Apply now and shape your future in tech
                <svg className="ml-2 w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t transition-colors duration-500 ${isDark ? "bg-[#020818] border-white/10" : "bg-white border-slate-100"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <Image src="/favicon.svg" alt="Project X Vietnam" width={32} height={32} />
              <span className={`text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>© 2026 Project X Vietnam</span>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-pxv-dark"}`}>Links</h4>
              <div className="flex flex-col gap-2">
                {["About", "Contact", "Privacy", "Terms"].map((label) => (
                  <a key={label} href="#" className={`text-sm ${isDark ? "text-white/60 hover:text-primary" : "text-slate-600 hover:text-primary"}`}>{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-pxv-dark"}`}>Social</h4>
              <div className="flex gap-4">
                {["Facebook", "LinkedIn", "Twitter"].map((s) => (
                  <a key={s} href="#" className={`text-sm ${isDark ? "text-white/60 hover:text-primary" : "text-slate-600 hover:text-primary"}`}>{s}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-pxv-dark"}`}>Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className={`flex-1 min-w-0 px-4 py-2 rounded-lg border text-sm ${isDark ? "bg-white/5 border-white/20 text-white placeholder:text-white/50" : "bg-slate-50 border-slate-200"}`}
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
