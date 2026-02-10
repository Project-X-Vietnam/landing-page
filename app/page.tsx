"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";

function CursorTooltip({ 
  children, 
  text 
}: { 
  children: React.ReactNode; 
  text: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative inline-block"
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ duration: 0.12 }}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: position.x + 8,
              top: position.y + 8,
            }}
          >
            <div className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-full whitespace-nowrap shadow-lg">
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
    }
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      localStorage.setItem("theme", newValue ? "dark" : "light");
      return newValue;
    });
  };

  return { isDark, toggle };
}

function GradientOrb({
  className,
  color,
  delay = 0,
}: {
  className: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ background: color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
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
        } else {
          setDisplayValue(Math.floor(current));
        }
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

function LogoCarousel({ isDark }: { isDark: boolean }) {
  const logos = [
    { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" },
    { name: "Microsoft", logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png" },
    { name: "VNG", logo: "/images/partners/vng_logo.png" },
    { name: "Shopee", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/1200px-Shopee.svg.png" },
    { name: "Grab", logo: "/images/partners/grab_logo.png" },
    { name: "Tiki", logo: "/images/partners/tiki_logo.png" },
    { name: "FPT", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png" },
    { name: "Chợ Tốt", logo: "/images/partners/chotot-logo.png" },
    { name: "One Mount", logo: "/images/partners/one-mount-logo.png" },
    { name: "Holistics", logo: "/images/partners/holistics-logo.svg" },
  ];

  return (
    <div className="relative overflow-hidden py-4">
      <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 ${
        isDark 
          ? "bg-gradient-to-r from-[#020818] to-transparent" 
          : "bg-gradient-to-r from-white to-transparent"
      }`} />
      <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 ${
        isDark 
          ? "bg-gradient-to-l from-[#020818] to-transparent" 
          : "bg-gradient-to-l from-white to-transparent"
      }`} />

      <motion.div
        className="flex gap-16 items-center"
        animate={{ x: [0, -1200] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo.logo}
            alt={logo.name}
            className={`flex-shrink-0 h-8 max-w-[120px] w-auto object-contain ${
              isDark ? "brightness-0 invert opacity-50" : "opacity-60 grayscale"
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
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
          isDark
            ? "bg-white/10 border-white/20"
            : "bg-white border-slate-200 shadow-slate-200/50"
        }`}
      >
        <svg
          className={`w-4 h-4 transition-colors ${
            isDark ? "text-white/40" : "text-amber-500"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>

        <button
          onClick={toggle}
          aria-label="Toggle dark mode"
          className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            isDark ? "bg-primary" : "bg-slate-200"
          } ${isDark ? "focus:ring-offset-[#020818]" : "focus:ring-offset-white"}`}
        >
          <motion.div
            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
            animate={{ x: isDark ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>

        <svg
          className={`w-4 h-4 transition-colors ${
            isDark ? "text-primary" : "text-slate-400"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    </motion.div>
  );
}

function FellowshipSection({ isDark }: { isDark: boolean }) {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      id: "selection",
      title: "Selection",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      headline: "Rigorous, merit-based selection",
      description: "We receive thousands of applications each cohort from 130+ universities across 10+ countries. Our multi-round evaluation process identifies high-potential students regardless of background—assessing problem-solving ability, learning agility, and growth mindset.",
      stats: [
        { value: "2,000+", label: "Applications per cohort" },
        { value: "130+", label: "Universities represented" },
        { value: "10+", label: "Countries" },
      ],
      highlights: ["Multi-round evaluation", "Background agnostic", "Growth mindset focus"],
      image: "/images/3F730A75-358C-4699-AA78-C55A5B2B368A.png",
    },
    {
      id: "training",
      title: "Development",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      headline: "Professional & personal growth",
      description: "Beyond traditional workshops, fellows engage in building real projects and learning cutting-edge hard skill, e.g., AI and Automation, delivered by top industry experts from leading tech companies. Our program focuses on both professional excellence and personal development.",
      stats: [
        { value: "40+", label: "Hours of training" },
        { value: "10+", label: "Industry experts" },
        { value: "14", label: "Training topics" },
      ],
      highlights: ["Hard skills", "Real project building", "Expert-led sessions"],
      image: "/images/IMG_6482.jpg",
    },
    {
      id: "mentorship",
      title: "Mentorship",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      headline: "Guidance from top industry experts",
      description: "Fellows are matched with senior mentors holding high-level positions at world-class tech companies including Google, Meta, Shopee, VNG, MoMo, and more. Some lucky fellows even get paired with 2–3 mentors for comprehensive guidance across multiple areas.",
      stats: [
        { value: "85+", label: "Senior mentors" },
        { value: "2-3", label: "Mentors per fellow" },
        { value: "4+", label: "Weeks of mentorship" },
      ],
      highlights: ["Senior-level mentors", "Multi-mentor matching", "Top tech companies"],
      image: "/images/IMG_6661.jpg",
    },
    {
      id: "internship",
      title: "Internship",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      headline: "Partner internship experience",
      description: "During the Summer Fellowship Program, fellows maintain and grow in the internships they secured from our partners during the pre-program recruitment phase. This parallel experience combines real work impact with structured fellowship support.",
      stats: [
        { value: "35+", label: "Partner companies" },
        { value: "100%", label: "Paid internships" },
        { value: "50%", label: "Return offer rate" },
      ],
      highlights: ["Pre-matched internships", "Parallel fellowship", "Career launchpad"],
      image: "/images/IMG_6745.jpg",
    },
  ];

  const activeStepData = steps[activeStep];

  return (
    <section id="fellowship" className={`py-24 md:py-32 transition-colors duration-500 ${
      isDark ? "bg-[#020818]" : "bg-slate-50"
    }`}>
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
            Summer Fellowship Program
          </p>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
            isDark ? "text-white" : "text-pxv-dark"
          }`}>
            From discovery to{" "}
            <span className="text-primary">career-ready</span>
          </h2>
          <p className={`mt-4 text-lg max-w-2xl ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}>
            Our flagship program transforms high-potential young people into job-ready professionals across all tech disciplines through a structured & personalized journey.
          </p>
        </motion.div>

        {/* Balanced two-column layout with sticky navigation */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left: Sticky Navigation */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-2">
              {steps.map((step, i) => (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-300 group ${
                    activeStep === i
                      ? isDark
                        ? "bg-white/10 border border-primary/30"
                        : "bg-white border border-primary/20 shadow-lg shadow-primary/5"
                      : isDark
                        ? "bg-white/5 border border-white/5 hover:bg-white/8 hover:border-white/10"
                        : "bg-white/50 border border-slate-100 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      activeStep === i
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : isDark
                          ? "bg-white/10 text-white/50 group-hover:text-white/70"
                          : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                    }`}>
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-base transition-colors ${
                        activeStep === i
                          ? "text-primary"
                          : isDark
                            ? "text-white/80 group-hover:text-white"
                            : "text-slate-700 group-hover:text-slate-900"
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`mt-1 text-sm leading-relaxed line-clamp-2 ${
                        activeStep === i
                          ? isDark ? "text-white/60" : "text-slate-600"
                          : isDark ? "text-white/40" : "text-slate-400"
                      }`}>
                        {step.headline}
                      </p>
                      
                      {/* Mini stats for active step */}
                      <AnimatePresence>
                        {activeStep === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 flex flex-wrap gap-2"
                          >
                            {step.highlights.map((highlight) => (
                              <span
                                key={highlight}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
                                  isDark
                                    ? "bg-primary/20 text-primary"
                                    : "bg-primary/10 text-primary"
                                }`}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {highlight}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Content Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl overflow-hidden ${
                  isDark
                    ? "bg-gradient-to-br from-white/8 to-white/4 border border-white/10"
                    : "bg-white border border-slate-100 shadow-xl"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={activeStepData.image}
                    alt={activeStepData.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Step indicator overlay */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                      isDark 
                        ? "bg-white/10 text-white border border-white/20" 
                        : "bg-white/80 text-primary border border-white/50 shadow-sm"
                    }`}>
                      Step {activeStep + 1} of 4
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Header with icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDark
                        ? "bg-primary/20 text-primary"
                        : "bg-primary/10 text-primary"
                    }`}>
                      <div className="scale-110">{activeStepData.icon}</div>
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold ${
                      isDark ? "text-white" : "text-pxv-dark"
                    }`}>
                      {activeStepData.headline}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-6 ${
                    isDark ? "text-white/60" : "text-slate-600"
                  }`}>
                    {activeStepData.description}
                  </p>

                  {/* Stats in a compact horizontal layout */}
                  <div className={`grid grid-cols-3 gap-4 p-4 rounded-xl ${
                    isDark ? "bg-white/5" : "bg-slate-50"
                  }`}>
                    {activeStepData.stats.map((stat, i) => (
                      <div key={stat.label} className={`text-center ${
                        i < 2 ? isDark ? "border-r border-white/10" : "border-r border-slate-200" : ""
                      }`}>
                        <p className={`text-2xl md:text-3xl font-bold ${
                          isDark ? "text-white" : "text-pxv-dark"
                        }`}>
                          {stat.value}
                        </p>
                        <p className={`text-xs mt-0.5 ${
                          isDark ? "text-white/40" : "text-slate-500"
                        }`}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function HomePage() {
  const { isDark, toggle } = useDarkMode();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <main className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
      isDark ? "bg-[#020818]" : "bg-white"
    }`}>
      {/* Dark Mode Toggle */}
      <DarkModeToggle isDark={isDark} toggle={toggle} />

      {/* ========== NAVIGATION ========== */}
      <Navbar isDark={isDark} />

      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden transition-all duration-500">
          {isDark ? (
            <>
              <div className="absolute inset-0 bg-[#020818]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,86,250,0.15)_0%,_transparent_70%)]" />
              <GradientOrb
                className="w-[600px] h-[600px] -top-40 -right-40 opacity-40"
                color="rgba(14, 86, 250, 0.3)"
                delay={0}
              />
              <GradientOrb
                className="w-[400px] h-[400px] bottom-20 -left-20 opacity-30"
                color="rgba(0, 209, 255, 0.2)"
                delay={5}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(14,86,250,0.3) 1px, transparent 1px),
                                   linear-gradient(to bottom, rgba(14,86,250,0.3) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="absolute top-20 left-20 w-32 h-32 rounded-full border border-primary/20" />
              <div className="absolute top-24 left-24 w-24 h-24 rounded-full border border-primary/30" />
              <div className="absolute bottom-32 right-20 w-40 h-40 rounded-full border border-cyan-500/20" />
              <div className="absolute bottom-36 right-24 w-32 h-32 rounded-full border border-cyan-500/30" />
              <div className="absolute bottom-20 left-16 w-6 h-6 rounded-full bg-primary/30 border-2 border-primary/50" />
              <div className="absolute top-32 right-32 w-4 h-4 rounded-full bg-cyan-400/30 border-2 border-cyan-400/50" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary/5" />
              <GradientOrb
                className="w-[600px] h-[600px] -top-40 -right-40"
                color="linear-gradient(135deg, rgba(14, 86, 250, 0.15) 0%, rgba(0, 209, 255, 0.1) 100%)"
                delay={0}
              />
              <GradientOrb
                className="w-[500px] h-[500px] top-1/3 -left-40"
                color="linear-gradient(135deg, rgba(0, 209, 255, 0.1) 0%, rgba(14, 86, 250, 0.08) 100%)"
                delay={3}
              />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(to right, #0E56FA 1px, transparent 1px),
                                   linear-gradient(to bottom, #0E56FA 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
            </>
          )}
        </div>

        {/* Main Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-20"
        >
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-sm mb-8 max-w-full ${
                isDark
                  ? "bg-primary/10 border-primary/30"
                  : "bg-gradient-to-r from-primary/5 via-pxv-cyan/5 to-primary/5 border-primary/15"
              }`}
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className={`text-sm font-medium ${
                isDark ? "text-primary" : "text-primary"
              }`}>
                Recruiting Organizing Team 2026 — Applications Open
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight ${
                isDark ? "text-white" : "text-pxv-dark"
              }`}
            >
              <span className="block">Move Forward</span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-primary via-pxv-cyan to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                  The Next Generation
                </span>
              </span>
              <span className="block mt-2">of Tech Youth</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`mt-6 md:mt-8 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              Vietnam&apos;s premier fellowship program connects ambitious young people
              with industry mentors and internship opportunities across all tech disciplines at 60+ leading partners.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <CursorTooltip text="Let's go!">
                <Link href="/recruitment2026">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    Apply as Organizing Team
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Button>
                </Link>
              </CursorTooltip>
              <Link href="/partners">
                <Button
                  size="lg"
                  variant="outline"
                  className={`rounded-full px-8 py-6 text-base font-semibold transition-all hover:scale-[1.02] ${
                    isDark
                      ? "border-white/20 text-white hover:bg-white/10"
                      : "border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  Partner with Us
                </Button>
              </Link>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-16"
            >
              <div className={`inline-flex flex-wrap justify-center items-center gap-4 md:gap-6 px-6 py-5 rounded-2xl backdrop-blur-xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/60 border-slate-100/80 shadow-lg"
              }`}>
                {[
                  { value: 85, suffix: "+", label: "Mentors" },
                  { value: 60, suffix: "+", label: "Companies" },
                  { value: 6000, suffix: "+", label: "Applications" },
                  { value: 130, suffix: "+", label: "Universities" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    {i > 0 && (
                      <div className={`hidden sm:block w-px h-8 ${
                        isDark ? "bg-white/20" : "bg-slate-200"
                      }`} />
                    )}
                    <div className="text-center px-2">
                      <div className={`text-2xl md:text-3xl font-bold ${
                        isDark ? "text-white" : "text-pxv-dark"
                      }`}>
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className={`text-xs md:text-sm font-medium ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 ${
              isDark ? "border-white/30" : "border-slate-300"
            }`}
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== LOGO CAROUSEL ========== */}
      <section className={`relative z-10 py-12 border-y transition-colors duration-500 ${
        isDark
          ? "bg-[#020818] border-white/10"
          : "bg-white border-slate-100"
      }`}>
        <p className={`text-center text-sm mb-6 font-medium uppercase tracking-wider ${
          isDark ? "text-white/40" : "text-slate-400"
        }`}>
          Our previous partners & mentors from
        </p>
        <LogoCarousel isDark={isDark} />
      </section>

      {/* ========== VALUE PROPOSITION - BENTO GRID ========== */}
      <section className={`py-24 md:py-32 transition-colors duration-500 relative overflow-hidden ${
        isDark
          ? "bg-[#020818]"
          : "bg-gradient-to-b from-white to-slate-50"
      }`}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl ${
            isDark ? "bg-primary/5" : "bg-primary/5"
          }`} />
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-secondary/5" : "bg-secondary/5"
          }`} />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          {/* Header - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Summer Fellowship Program
            </p>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Your launchpad to{" "}
              <span className="text-primary">tech excellence</span>
            </h2>
            <p className={`text-lg leading-relaxed ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}>
              Project X Vietnam provides a summer fellowship program where young people thriving in tech can access professional &amp; personal development resources while gaining internship opportunities from our tech partners annually.
            </p>
          </motion.div>

          {/* Four Pillars - 4 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Mentorship",
                description: "Paired with professionals from leading tech companies",
                color: "primary",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: "Workshops",
                description: "Hands-on sessions on real-world skills",
                color: "secondary",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Networking",
                description: "Connect with industry leaders & peers",
                color: "primary",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Projects",
                description: "Build portfolio-worthy real projects",
                color: "secondary",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className={`group p-6 rounded-xl text-center transition-all duration-300 ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border border-white/10"
                    : "bg-white hover:bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 ${
                  pillar.color === "primary"
                    ? isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                    : isDark ? "bg-secondary/20 text-secondary" : "bg-secondary/10 text-secondary"
                }`}>
                  {pillar.icon}
                </div>
                <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-pxv-dark"}`}>
                  {pillar.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats + CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className={`flex flex-col lg:flex-row items-center justify-between gap-8 p-6 lg:p-8 rounded-2xl ${
              isDark 
                ? "bg-gradient-to-r from-primary/15 to-secondary/10 border border-primary/20" 
                : "bg-gradient-to-r from-primary/10 to-secondary/5 border border-primary/15"
            }`}
          >
            {/* Stats */}
            <div className="flex items-center gap-8 lg:gap-12">
              {[
                { value: "35+", label: "Tech Partners" },
                { value: "6", label: "Weeks Intensive" },
                { value: "Annual", label: "Program" },
              ].map((stat, i) => (
                <div key={stat.label} className={`text-center ${
                  i < 2 ? isDark ? "pr-8 lg:pr-12 border-r border-white/20" : "pr-8 lg:pr-12 border-r border-primary/20" : ""
                }`}>
                  <p className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>
                    {stat.value}
                  </p>
                  <p className={`text-xs md:text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <div className="text-center lg:text-right">
                <p className={`font-semibold ${isDark ? "text-white" : "text-pxv-dark"}`}>
                  Ready to start your journey?
                </p>
                <p className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>
                  Summer 2025 applications open
                </p>
              </div>
              <Link href="/recruitment2026">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-3 font-medium shadow-md shadow-primary/20 whitespace-nowrap">
                  Apply Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section id="about" className={`py-24 md:py-32 transition-colors duration-500 ${
        isDark ? "bg-[#0a0f1a]" : "bg-white"
      }`}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-6">
              Our Mission
            </p>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              We exist to{" "}
              <span className="text-primary">empower aspiring tech professionals</span>
              {" "}regardless of background with early-career exposure, rigorous training, and meaningful mentorship—building Vietnam&apos;s next generation of technology leaders across all disciplines.
            </h2>
            <p className={`mt-8 text-lg max-w-3xl mx-auto ${
              isDark ? "text-white/60" : "text-slate-600"
            }`}>
              Founded in 2022, Project X Vietnam is a non-profit organization bridging the gap between academic learning and real-world tech careers. We believe talent is everywhere—opportunity shouldn&apos;t be limited by where you start.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== FELLOWSHIP JOURNEY SECTION - INTERACTIVE TABS ========== */}
      <FellowshipSection isDark={isDark} />

      {/* ========== FOR WHOM SECTION - BALANCED 3-COLUMN GRID ========== */}
      <section className={`py-24 md:py-32 transition-colors duration-500 relative overflow-hidden ${
        isDark ? "bg-[#0a0f1a]" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Who We Serve
            </p>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Building bridges across the{" "}
              <span className="text-primary">ecosystem</span>
            </h2>
            <p className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDark ? "text-white/60" : "text-slate-600"
            }`}>
              We connect ambitious students with leading companies and visionary sponsors to create Vietnam&apos;s strongest tech talent pipeline.
            </p>
          </motion.div>

          {/* Balanced 3-Column Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: "students",
                label: "For Students",
                title: "Launch your tech career",
                description: "Transform from classroom learner to industry-ready professional with multi-mentor guidance and real experience.",
                benefits: [
                  "2-3 senior mentors from top companies",
                  "Hard skills & personal development training",
                  "Parallel internship experience",
                ],
                cta: "Apply Now",
                href: "/recruitment2026",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                ),
                isPrimary: true,
              },
              {
                id: "companies",
                label: "For Companies",
                badge: "35+ Partners",
                title: "Access pre-trained talent",
                description: "Reduce hiring friction with candidates mentored by senior tech leaders and trained in real projects.",
                benefits: [
                  "130+ universities represented",
                  "Structured evaluation framework",
                  "No hidden costs or fees",
                ],
                cta: "Partner with Us",
                href: "/partners",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                isPrimary: false,
              },
              {
                id: "sponsors",
                label: "For Sponsors",
                badge: "Social Impact",
                title: "Drive ecosystem forward",
                description: "Support Vietnam's tech workforce development while building your brand among future tech leaders.",
                benefits: [
                  "ESG-aligned initiatives",
                  "Workforce development",
                  "Brand visibility & reach",
                ],
                cta: "Become a Sponsor",
                href: "/partners",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                isPrimary: false,
              },
            ].map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl p-6 md:p-8 flex flex-col h-full ${
                  card.isPrimary
                    ? isDark
                      ? "bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white"
                      : "bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-white"
                    : isDark
                      ? "bg-white/5 border border-white/10"
                      : "bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    card.isPrimary
                      ? "bg-white/20"
                      : isDark
                        ? "bg-primary/20 text-primary"
                        : "bg-primary/10 text-primary"
                  }`}>
                    {card.icon}
                  </div>
                  {card.badge && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      isDark
                        ? "bg-white/10 text-white/80"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Label */}
                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  card.isPrimary
                    ? "text-white/70"
                    : isDark ? "text-primary" : "text-primary"
                }`}>
                  {card.label}
                </p>

                {/* Title */}
                <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
                  card.isPrimary
                    ? "text-white"
                    : isDark ? "text-white" : "text-pxv-dark"
                }`}>
                  {card.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-6 ${
                  card.isPrimary
                    ? "text-white/80"
                    : isDark ? "text-white/60" : "text-slate-600"
                }`}>
                  {card.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {card.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        card.isPrimary
                          ? "bg-white/20"
                          : isDark ? "bg-primary/20" : "bg-primary/10"
                      }`}>
                        <svg className={`w-3 h-3 ${
                          card.isPrimary ? "text-white" : "text-primary"
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-sm ${
                        card.isPrimary
                          ? "text-white/90"
                          : isDark ? "text-white/70" : "text-slate-600"
                      }`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={card.href} className="mt-auto">
                  <Button
                    className={`w-full rounded-lg font-semibold ${
                      card.isPrimary
                        ? "bg-white text-primary hover:bg-white/90"
                        : isDark
                          ? "bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30"
                          : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                    }`}
                  >
                    {card.cta}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SKILL AREAS SECTION ========== */}
      <section className={`py-24 md:py-32 transition-colors duration-500 ${
        isDark ? "bg-[#020818]" : "bg-slate-50"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Disciplines
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Comprehensive tech skill areas
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {[
              "Software Engineering",
              "Data Science & Analytics",
              "AI & Machine Learning",
              "Cloud Computing",
              "Cybersecurity",
              "Product Management",
              "UI/UX Design",
              "Product Growth",
              "Research & Hardware",
            ].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:scale-105 ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white/70 hover:border-primary/50 hover:text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary shadow-sm"
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className={`py-24 md:py-32 transition-colors duration-500 ${
        isDark ? "bg-[#020818]" : "bg-slate-50"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Testimonials
            </p>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Hear from our community
            </h2>
            <p className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDark ? "text-white/60" : "text-slate-600"
            }`}>
              Stories from fellows, mentors, and partners who have been part of our journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Project X gave me the confidence and skills to land my dream internship at Shopee. The mentorship from senior engineers was invaluable—they didn't just teach me technical skills, but also how to navigate a real tech career. The connections I made and the projects I worked on completely transformed my trajectory.",
                name: "Gia Hung",
                role: "Fellow '23",
                company: "Shopee",
                type: "fellow",
                image: "/images/team/nguyenvugiahung.jpeg",
              },
              {
                quote: "The quality of candidates from Project X is exceptional. Unlike typical interns, they come prepared with real project experience, strong mentorship backgrounds, and a genuine motivation to contribute from day one. We've hired multiple fellows and they consistently outperform expectations.",
                name: "Minh Hung",
                role: "Partner '24",
                company: "SNDQ",
                type: "partner",
                image: "/images/team/minhhung.jpg",
              },
              {
                quote: "This program filled the gap between what I learned in university and what companies actually need. Having multiple mentors from different backgrounds gave me perspectives I never would have gotten otherwise. The parallel internship experience at Infina made me truly job-ready.",
                name: "Ngoc Linh",
                role: "Fellow '24",
                company: "Infina",
                type: "fellow",
                image: "/images/team/ngoclinh.jpg",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative p-5 md:p-6 rounded-xl border flex flex-col h-full ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                }`}
              >
                {/* Header: Quote icon + Type badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    isDark ? "bg-primary/20" : "bg-primary/10"
                  }`}>
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[12px] font-medium ${
                    testimonial.type === "fellow"
                      ? isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                      : isDark ? "bg-slate-600/50 text-slate-300" : "bg-slate-700 text-white"
                  }`}>
                    {testimonial.type === "fellow" ? "Fellow" : "Partner"}
                  </span>
                </div>

                {/* Quote - flex-grow to push footer to bottom */}
                <blockquote className={`text-md leading-relaxed flex-grow ${
                  isDark ? "text-white/80" : "text-slate-600"
                }`}>
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                
                {/* Divider */}
                <div className={`my-4 border-t ${
                  isDark ? "border-white/10" : "border-slate-100"
                }`} />

                {/* Footer: Avatar + Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${
                      isDark ? "text-white" : "text-pxv-dark"
                    }`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-xs truncate ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}>
                      {testimonial.role}
                    </p>
                  </div>
                  <div className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                    isDark ? "bg-white/10 text-white/60" : "bg-slate-100 text-slate-600"
                  }`}>
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0a1a4a 50%, #0E56FA 100%)' }}
      >
        {/* Decorative rotating circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border border-white/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full border border-white/10"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to join the
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                next generation?
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-xl mx-auto">
              Transform your potential into impact. Join thousands of students 
              who&apos;ve launched their tech careers through Project X Vietnam.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <CursorTooltip text="Join us!">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg"
                >
                  Start Your Application
                </Button>
              </CursorTooltip>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className={`py-12 border-t transition-colors duration-500 ${
        isDark
          ? "bg-[#020818] border-white/10"
          : "bg-white border-slate-100"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/favicon.svg"
                alt="Project X Vietnam"
                className="h-7 w-7"
              />
              <span className={`text-sm font-medium ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}>
                © 2025 Project X Vietnam
              </span>
            </div>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm font-medium transition-colors ${
                    isDark
                      ? "text-white/40 hover:text-primary"
                      : "text-slate-500 hover:text-primary"
                  }`}
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
