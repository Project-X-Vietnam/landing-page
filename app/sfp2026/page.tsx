"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
const ABOUT_TYPING_VARIANTS = ["Project X Vietnam", "Summer Fellowship Program"];

const SECTION_IDS = ["impact", "about", "mission", "what-is-sfp", "partners", "roles", "journey", "testimonials", "faq", "cta"] as const;
const SECTION_LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  impact: "Our Impact",
  about: "About",
  mission: "Our Mission",
  "what-is-sfp": "What is SFP 2026?",
  partners: "Partners",
  roles: "Roles & Domains",
  journey: "Journey 2026",
  testimonials: "How SFP Shapes Fellows",
  faq: "FAQ",
  cta: "Join Now",
};

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
        className={`flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-xl shadow-lg border transition-all duration-300 ${
          isDark ? "bg-white/10 border-white/20" : "bg-white border-slate-200 shadow-slate-200/50"
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
    <div className="flex justify-center gap-3 sm:gap-6 mt-10">
      {[
        [d, "Days"],
        [h, "Hours"],
        [m, "Minutes"],
        [s, "Seconds"],
      ].map(([val, label]) => (
        <div key={String(label)} className="text-center">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums min-w-[2.5rem] md:min-w-[3rem]">
            {String(val).padStart(2, "0")}
          </div>
          <div className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? "text-white/60" : "text-slate-500"}`}>{label}</div>
        </div>
      ))}
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
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setVisible(e.boundingClientRect.top < 80),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    const el = document.getElementById("impact");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);
  if (!visible) return null;
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-40 py-3 px-4 md:px-8 backdrop-blur-xl border-b transition-colors ${
        isDark ? "bg-[#020818]/70 border-white/10" : "bg-white/70 border-slate-200/50"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-xs md:text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
              isDark
                ? "text-white/70 hover:text-primary hover:bg-white/10"
                : "text-slate-600 hover:text-primary hover:bg-slate-100"
            }`}
          >
            {SECTION_LABELS[id]}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

const INTENT_EVENT_KEY = "sfp2026_intent_engaged_sent";

function fireIntentEngagedOnce() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(INTENT_EVENT_KEY)) return;
    sessionStorage.setItem(INTENT_EVENT_KEY, "1");
    trackSFP2026Event("sfp2026_intent_engaged");
  } catch {
    // ignore
  }
}

export default function SFP2026Page() {
  const { isDark, toggle } = useDarkMode();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [aboutTyped, setAboutTyped] = useState("");
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(aboutRef, { once: true });
  const aboutVariantIndex = useRef(0);
  const aboutStarted = useRef(false);

  useEffect(() => {
    if (!aboutInView || aboutStarted.current) return;
    aboutStarted.current = true;
    const typeNext = () => {
      const target = ABOUT_TYPING_VARIANTS[aboutVariantIndex.current % 2];
      let i = 0;
      const id = setInterval(() => {
        if (i <= target.length) {
          setAboutTyped(target.slice(0, i));
          i++;
        } else {
          clearInterval(id);
          aboutVariantIndex.current += 1;
          setTimeout(() => {
            setAboutTyped("");
            if (aboutVariantIndex.current < 2) typeNext();
          }, 3000);
        }
      }, 80);
    };
    typeNext();
  }, [aboutInView]);

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
    { date: "—", title: "Round 1", desc: "Selection and screening." },
    { date: "—", title: "Round 2", desc: "Evaluation and interviews." },
    { date: "—", title: "Internship Application", desc: "Matching with partner companies." },
    { date: "—", title: "SFP 2026", desc: "Summer Fellowship Program and professional development." },
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

  const mentorPlaceholders = [
    { name: "Mentor A", title: "Senior Engineer, Google" },
    { name: "Mentor B", title: "PM, Meta" },
    { name: "Mentor C", title: "Data Scientist, VNG" },
    { name: "Mentor D", title: "Designer, MoMo" },
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

  return (
    <main className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${isDark ? "bg-[#020818]" : "bg-white"}`}>
      <DarkModeToggle isDark={isDark} toggle={toggle} />
      <Navbar isDark={isDark} />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-24 pb-16">
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
      <section id="impact" className={`py-24 transition-colors duration-500 ${isDark ? "bg-[#0a0f1a]" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>Our Impact So Far</h2>
            <p className={`mt-4 max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Project X Summer Fellowship Program has grown into one of Vietnam&apos;s most impactful student-led tech initiatives—more than a summer program, it is a talent development ecosystem shaping the next generation of tech leaders.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`p-6 rounded-2xl border text-center ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}
              >
                <div className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>
                  {stat.suffix === "%" ? `~${stat.value}${stat.suffix}` : <><AnimatedCounter value={stat.value} suffix={stat.suffix} /></>}
                </div>
                <p className={`text-sm font-medium mt-1 ${isDark ? "text-white/50" : "text-slate-500"}`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Project X Vietnam */}
      <section id="about" ref={aboutRef} className={`py-24 transition-colors duration-500 ${isDark ? "bg-[#020818]" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center overflow-hidden">
              <Image src="/preview_icon.png" alt="Project X Vietnam" fill className="object-contain p-8" sizes="(max-width: 1024px) 100vw, 50vw" />
            </motion.div>
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-pxv-dark"}`}>
                About {aboutTyped || " "}
                <span className="inline-block w-0.5 h-8 bg-primary animate-pulse align-middle" />
              </h2>
              <p className={`${isDark ? "text-white/70" : "text-slate-600"} leading-relaxed`}>
                Founded in 2022, Project X Vietnam is a non-profit organization dedicated to connecting young talents with companies across the Vietnamese tech ecosystem through our flagship initiative: <strong>Project X Summer Fellowship Program</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section id="mission" className={`py-24 transition-colors duration-500 ${isDark ? "bg-[#0a0f1a]" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
                <motion.div className="absolute inset-4 rounded-full border-2 border-primary/50" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute inset-8 rounded-full border-2 border-cyan-500/50" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src="/favicon.svg" alt="" width={80} height={80} />
                </div>
                {["Empower", "Nurture", "Support"].map((label, i) => {
                  const angle = (i * 120 - 90) * (Math.PI / 180);
                  const r = 110;
                  return (
                    <div
                      key={label}
                      className="absolute text-sm font-semibold text-primary"
                      style={{ left: "50%", top: "50%", transform: `translate(calc(-50% + ${r * Math.cos(angle)}px), calc(-50% + ${r * Math.sin(angle)}px))` }}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <div className="space-y-6">
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>Our mission</h2>
              {missionPillars.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}
                >
                  <span className="text-sm font-mono text-primary">{p.num}</span>
                  <h3 className={`text-lg font-bold mt-1 ${isDark ? "text-white" : "text-pxv-dark"}`}>{p.title}</h3>
                  <p className={`text-sm mt-2 ${isDark ? "text-white/60" : "text-slate-600"}`}>{p.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is the Project X Summer Fellowship Program 2026? */}
      <section id="what-is-sfp" className={`py-24 transition-colors duration-500 ${isDark ? "bg-[#020818]" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-pxv-dark"}`}
          >
            What is the Project X Summer Fellowship Program 2026?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`space-y-4 text-base leading-relaxed ${isDark ? "text-white/80" : "text-slate-600"}`}
          >
            <p>
              The Project X Summer Fellowship Program 2026 is a structured, summer-long journey designed to support students at different stages of their tech careers—not just through skills training, but through long-term growth.
            </p>
            <p>
              More than a bridge between tech talents and companies, Project X is a career enabler—a place where you are empowered with the knowledge, mindset, and confidence to navigate the tech industry even as it continues to evolve.
            </p>
            <p>Through mentorship, hands-on learning, and a strong community, Project X helps you:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Build a clear understanding of your role and direction within the tech ecosystem</li>
              <li>Develop industry-ready skills, professional mindset, and personal brand</li>
              <li>Grow alongside peers and mentors in a community where learning compounds</li>
              <li>Form meaningful relationships that last beyond the program</li>
              <li>Access real opportunities while continuing to grow even when no one is watching</li>
            </ul>
            <p>
              Project X is not just a summer experience—it is where careers begin to take shape, and growth continues long after the program ends.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <label htmlFor="sfp2026-updates" className={`block text-sm font-medium mb-2 ${isDark ? "text-white/70" : "text-slate-600"}`}>
              Get updates about SFP 2026
            </label>
            <input
              id="sfp2026-updates"
              type="email"
              placeholder="Your email"
              onFocus={fireIntentEngagedOnce}
              onClick={fireIntentEngagedOnce}
              className={`w-full max-w-md px-4 py-3 rounded-xl border text-sm ${isDark ? "bg-white/5 border-white/20 text-white placeholder:text-white/40" : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"}`}
            />
          </motion.div>
        </div>
      </section>

      {/* Our Partners */}
      <section id="partners" className={`py-24 transition-colors duration-500 ${isDark ? "bg-[#020818]" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>Our Partners</h2>
            <p className={`mt-4 max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Project X collaborates with a growing network of leading technology companies, startups, and innovation-driven organizations across Vietnam and globally.
            </p>
            <p className={`mt-3 max-w-2xl mx-auto text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
              Our partners play a critical role in shaping the Fellowship experience by providing exclusive internship opportunities, participating in mentorship and workshops and company tours, and supporting the development of future-ready tech talent.
            </p>
          </motion.div>
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
                {card.count ? <div className="text-2xl font-bold text-primary">{card.count}</div> : null}
                <h3 className={`font-bold ${card.count ? "mt-2" : ""} ${isDark ? "text-white" : "text-pxv-dark"}`}>{card.title}</h3>
                <p className={`text-sm mt-1 ${isDark ? "text-white/60" : "text-slate-600"}`}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="overflow-hidden">
            <motion.div className="flex gap-8 py-4" animate={{ x: [0, -1200] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
              {[...Array(3)].map((_, set) => (
                <div key={set} className="flex gap-8 flex-shrink-0">
                  {["PwC", "Partner", "Logo", "Tech Co", "Startup"].map((name, i) => (
                    <div key={`${set}-${i}`} className={`w-24 h-12 rounded-lg flex items-center justify-center text-xs font-medium ${isDark ? "bg-white/10 text-white/70" : "bg-slate-100 text-slate-500"}`}>
                      {name}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
            <motion.div className="flex gap-8 py-4 mt-4" animate={{ x: [-1200, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
              {[...Array(2)].map((_, set) => (
                <div key={set} className="flex gap-8 flex-shrink-0">
                  {mentorPlaceholders.map((m) => (
                    <div key={`${m.name}-${set}`} className={`flex items-center gap-3 min-w-[200px] ${isDark ? "text-white/80" : "text-slate-700"}`}>
                      <div className={`w-12 h-12 rounded-full flex-shrink-0 ${isDark ? "bg-white/20" : "bg-slate-200"}`} />
                      <div>
                        <div className="font-semibold text-sm">{m.name}</div>
                        <div className="text-xs opacity-70">{m.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
          <p className={`text-center mt-6 text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
            Through these partnerships, Project X ensures that every opportunity offered to fellows is industry-relevant, practical, and impactful.
          </p>
        </div>
      </section>

      {/* Targeted Roles & Domains */}
      <section id="roles" className={`py-24 transition-colors duration-500 ${isDark ? "bg-[#0a0f1a]" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>Targeted Roles & Domains</h2>
            <p className={`mt-4 max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              We prepare fellows for roles across these tech domains. Major or background does NOT restrict eligibility. Whether you pursue deep technical expertise or business-driven tech roles, Project X offers a pathway tailored to your ambitions.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {rolesList.map((role, i) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`inline-flex px-5 py-2.5 rounded-full text-sm font-medium border ${isDark ? "bg-white/5 border-white/20 text-white/90" : "bg-white border-slate-200 text-slate-700"}`}
              >
                {role}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* The Fellowship Journey 2026 */}
      <section id="journey" className={`py-24 transition-colors duration-500 ${isDark ? "bg-[#020818]" : "bg-white"}`}>
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
      <section id="testimonials" className={`py-24 transition-colors duration-500 ${isDark ? "bg-[#0a0f1a]" : "bg-slate-50"}`}>
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold text-center ${isDark ? "text-white" : "text-pxv-dark"}`}
          >
            How SFP Shapes Our Fellows
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-4 text-lg md:text-xl font-medium text-center ${isDark ? "text-white/80" : "text-slate-600"}`}
          >
            SFP is not about short-term training; it is about long-term transformation.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-6 text-xl md:text-2xl font-bold text-center italic ${isDark ? "text-white/90" : "text-pxv-dark"}`}
          >
            &ldquo;Not just work, but a world where they see their future.&rdquo;
          </motion.p>
          <div className="mt-12 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-8 rounded-2xl border mx-auto max-w-lg ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex-shrink-0 ${isDark ? "bg-white/20" : "bg-slate-200"}`} />
                  <div>
                    <div className={`font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>{testimonials[testimonialIndex].name}</div>
                    <div className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>{testimonials[testimonialIndex].role}</div>
                  </div>
                </div>
                <p className={`mt-4 ${isDark ? "text-white/80" : "text-slate-600"}`}>{testimonials[testimonialIndex].quote}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className={`p-2 rounded-full border ${isDark ? "border-white/20 hover:bg-white/10" : "border-slate-200 hover:bg-slate-100"}`}
                aria-label="Previous"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                className={`p-2 rounded-full border ${isDark ? "border-white/20 hover:bg-white/10" : "border-slate-200 hover:bg-slate-100"}`}
                aria-label="Next"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-24 transition-colors duration-500 ${isDark ? "bg-[#020818]" : "bg-white"}`}>
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
