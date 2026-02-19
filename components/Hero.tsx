"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  MotionValue,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Smooth spring config for scroll-based animations
const smoothSpring = { stiffness: 100, damping: 30, restDelta: 0.001 };

// Section wrapper with scroll-triggered animations
function ScrollSection({
  children,
  className = "",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.section
      ref={ref}
      id={id}
      style={style}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Animated text reveal - word by word
function RevealText({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = children.split(" ");

  return (
    <motion.span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Scroll-based floating image - Microsoft AI style
// Images scale and fade based on continuous scroll progress
function ScrollImage({
  alt,
  className,
  scrollProgress,
  startOffset = 0,
  endOffset = 1,
  yOffset = 0,
  scaleRange = [0.6, 1],
  opacityRange = [0, 1],
}: {
  alt: string;
  className?: string;
  scrollProgress: MotionValue<number>;
  startOffset?: number;
  endOffset?: number;
  yOffset?: number;
  scaleRange?: [number, number];
  opacityRange?: [number, number];
}) {
  // Map scroll progress to animation values with offset for staggered timing
  const adjustedProgress = useTransform(
    scrollProgress,
    [startOffset, endOffset],
    [0, 1]
  );
  
  // Smooth the values with springs
  const smoothProgress = useSpring(adjustedProgress, smoothSpring);
  
  // Transform scroll to scale (starts small, grows to full size)
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [scaleRange[0], scaleRange[1], scaleRange[1]]);
  
  // Transform scroll to opacity
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [opacityRange[0], 1, 1, opacityRange[1]]);
  
  // Parallax Y movement
  const y = useTransform(smoothProgress, [0, 1], [yOffset, yOffset * -0.5]);

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className={className}
    >
      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 shadow-sm flex items-center justify-center overflow-hidden">
        <span className="text-slate-400 text-sm font-medium">{alt}</span>
      </div>
    </motion.div>
  );
}

// Animated counter with scroll trigger
function AnimatedStat({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
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
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-pxv-dark tabular-nums">
        {displayValue}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="mt-3 text-base md:text-lg text-muted-foreground">{label}</p>
    </motion.div>
  );
}

// People Section with Microsoft AI-style scroll animations
function PeopleSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth the overall scroll progress
  const smoothScrollProgress = useSpring(scrollYProgress, smoothSpring);

  // Center card animations
  const centerCardScale = useTransform(smoothScrollProgress, [0.2, 0.5], [0.8, 1]);
  const centerCardOpacity = useTransform(smoothScrollProgress, [0.2, 0.4], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Floating photo grid - organic arrangement with scroll-based animations */}
        <div className="relative h-[600px] md:h-[700px] lg:h-[800px]">
          
          {/* Image 1 - Top Left */}
          <ScrollImage
            alt="Mentor"
            className="absolute top-[5%] left-[3%] w-40 h-52 md:w-52 md:h-64 lg:w-60 lg:h-72"
            scrollProgress={scrollYProgress}
            startOffset={0}
            endOffset={0.6}
            yOffset={40}
            scaleRange={[0.5, 1]}
          />

          {/* Image 2 - Top Right */}
          <ScrollImage
            alt="Student"
            className="absolute top-[8%] right-[5%] w-44 h-56 md:w-56 md:h-68 lg:w-64 lg:h-80"
            scrollProgress={scrollYProgress}
            startOffset={0.05}
            endOffset={0.65}
            yOffset={60}
            scaleRange={[0.4, 1]}
          />

          {/* Image 3 - Middle Left */}
          <ScrollImage
            alt="Workshop"
            className="absolute top-[35%] left-[8%] w-48 h-60 md:w-60 md:h-72 lg:w-72 lg:h-88"
            scrollProgress={scrollYProgress}
            startOffset={0.1}
            endOffset={0.7}
            yOffset={30}
            scaleRange={[0.5, 1]}
          />

          {/* Image 4 - Middle Right */}
          <ScrollImage
            alt="Team"
            className="absolute top-[25%] right-[12%] w-40 h-52 md:w-52 md:h-64 lg:w-56 lg:h-72"
            scrollProgress={scrollYProgress}
            startOffset={0.08}
            endOffset={0.68}
            yOffset={50}
            scaleRange={[0.45, 1]}
          />

          {/* Image 5 - Bottom Center-Left */}
          <ScrollImage
            alt="Event"
            className="absolute bottom-[8%] left-[25%] w-44 h-56 md:w-56 md:h-68 lg:w-64 lg:h-80"
            scrollProgress={scrollYProgress}
            startOffset={0.15}
            endOffset={0.75}
            yOffset={20}
            scaleRange={[0.5, 1]}
          />

          {/* Image 6 - Bottom Right */}
          <ScrollImage
            alt="Collaboration"
            className="absolute bottom-[5%] right-[3%] w-36 h-48 md:w-48 md:h-60 lg:w-52 lg:h-68"
            scrollProgress={scrollYProgress}
            startOffset={0.12}
            endOffset={0.72}
            yOffset={35}
            scaleRange={[0.55, 1]}
          />

          {/* Center text overlay - appears after images start scaling */}
          <motion.div
            style={{
              scale: centerCardScale,
              opacity: centerCardOpacity,
            }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="text-center bg-white/90 backdrop-blur-md rounded-3xl p-10 md:p-14 max-w-xl shadow-lg border border-white/50">
              <p className="text-sm text-primary font-semibold tracking-wide uppercase mb-5">
                Project X Vietnam
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-pxv-dark leading-snug">
                A collective of mentors, students, and innovators
              </h2>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Hero parallax effects
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const decorativeRotate = useTransform(heroScrollProgress, [0, 1], [0, 30]);
  const decorativeScale = useTransform(heroScrollProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="relative bg-white">
      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-pxv-light to-white" />
        
        {/* Decorative floating elements with parallax */}
        <motion.div
          style={{ rotate: decorativeRotate, scale: decorativeScale }}
          className="absolute top-20 right-[10%] w-32 h-32 md:w-48 md:h-48 opacity-[0.06]"
        >
          <img src="/favicon.svg" alt="" className="w-full h-full" />
        </motion.div>
        <motion.div
          style={{ 
            y: useTransform(heroScrollProgress, [0, 1], [0, 100]),
            rotate: useTransform(heroScrollProgress, [0, 1], [0, -20]),
          }}
          className="absolute bottom-40 left-[5%] w-24 h-24 md:w-36 md:h-36 opacity-[0.04]"
        >
          <img src="/favicon.svg" alt="" className="w-full h-full" />
        </motion.div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-0 left-0 right-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/favicon.svg"
                  alt="Project X Vietnam"
                  className="h-9 w-9"
                />
                <span className="text-lg font-semibold text-pxv-dark tracking-tight">
                  Project <span className="text-primary">X</span>
                </span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <a href="#mission" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
                <a href="#impact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Impact
                </a>
                <a href="#fellowship" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Fellowship
                </a>
                <a href="#join" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Join
                </a>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-32 md:pt-40"
        >
          <div className="max-w-4xl">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-pxv-dark leading-[1.05] tracking-tight"
            >
              <span className="italic text-primary">Nurturing</span>
              <br />
              <span className="block mt-2">Vietnam&apos;s Next</span>
              <span className="block mt-2">Generation of</span>
              <span className="block mt-2 text-primary">Tech Talent</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 md:mt-12 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Bridging the gap between academic learning and real-world tech careers.
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== PEOPLE SECTION ========== */}
      <PeopleSection />

      {/* ========== MISSION SECTION ========== */}
      <ScrollSection id="mission" className="relative py-24 md:py-32 lg:py-40">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-pxv-dark leading-tight">
              <RevealText>
                We exist to empower tech students with early-career exposure, rigorous training, and meaningful mentorship—regardless of background.
              </RevealText>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 md:mt-24 max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
              Founded in 2022, Project X Vietnam is building the bridge between 
              Vietnam&apos;s universities and its rapidly growing tech ecosystem. 
              We believe talent is everywhere—opportunity shouldn&apos;t be limited by 
              where you start.
            </p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* ========== IMPACT SECTION ========== */}
      <ScrollSection id="impact" className="relative py-24 md:py-32 lg:py-40 bg-pxv-light">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-24"
          >
            <p className="text-sm text-primary font-medium tracking-wide uppercase mb-4">
              Our Impact
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pxv-dark">
              Growing together since 2022
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <AnimatedStat value={100} suffix="+" label="Industry Mentors" delay={0} />
            <AnimatedStat value={50} suffix="+" label="Partner Companies" delay={0.1} />
            <AnimatedStat value={2600} suffix="+" label="Students Impacted" delay={0.2} />
            <AnimatedStat value={20} suffix="+" label="Countries" delay={0.3} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 md:mt-24 text-center text-muted-foreground max-w-2xl mx-auto"
          >
            Fellows from 130+ universities across 10+ countries, mentored by 
            engineers, founders, and leaders from the world&apos;s top tech companies.
          </motion.p>
        </div>
      </ScrollSection>

      {/* ========== FELLOWSHIP SECTION ========== */}
      <ScrollSection id="fellowship" className="relative py-24 md:py-32 lg:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm text-primary font-medium tracking-wide uppercase mb-4">
                  The Fellowship
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pxv-dark leading-tight">
                  From classroom to 
                  <span className="text-primary"> career-ready</span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 text-lg text-muted-foreground leading-relaxed"
              >
                Our flagship program transforms high-potential students into 
                job-ready tech professionals through structured mentorship, 
                real-world projects, and direct company matching.
              </motion.p>

              {/* Journey steps */}
              <div className="mt-12 space-y-6">
                {[
                  { step: "01", title: "Selection", desc: "Competitive application from 130+ universities" },
                  { step: "02", title: "Training", desc: "Technical skills, interview prep, and career guidance" },
                  { step: "03", title: "Mentorship", desc: "1-on-1 guidance from industry professionals" },
                  { step: "04", title: "Placement", desc: "Matched with partner companies for real internships" },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <span className="text-sm font-mono text-primary/60">{item.step}</span>
                    <div>
                      <h3 className="font-semibold text-pxv-dark">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-28 h-28 mx-auto mb-6 rounded-2xl bg-white shadow-soft flex items-center justify-center p-4">
                    <img
                      src="/favicon.svg"
                      alt="Project X"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-xl font-bold text-pxv-dark">
                    Summer Fellowship 2025
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Applications now open
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* ========== QUOTE SECTION ========== */}
      <ScrollSection className="relative py-24 md:py-32 lg:py-40 bg-pxv-light">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-pxv-dark leading-relaxed italic">
              &ldquo;We believe every student in Vietnam deserves access to 
              world-class mentorship and opportunities—not just those at 
              top universities or with existing connections.&rdquo;
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-soft flex items-center justify-center p-3">
              <img src="/favicon.svg" alt="Project X" className="w-full h-full" />
            </div>
            <p className="mt-4 font-semibold text-pxv-dark">Project X Vietnam</p>
            <p className="text-sm text-muted-foreground">Founding Team</p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* ========== DISCIPLINES SECTION ========== */}
      <ScrollSection className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm text-primary font-medium tracking-wide uppercase mb-4">
              Skill Areas
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-pxv-dark">
              Comprehensive tech disciplines
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              "Software Engineering",
              "Data Science & Analytics",
              "AI & Machine Learning",
              "Cloud Computing",
              "Cybersecurity",
              "Product Management",
              "UI/UX Design",
              "Research & Hardware",
            ].map((discipline, i) => (
              <motion.span
                key={discipline}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-2.5 rounded-full bg-white border border-border text-sm font-medium text-pxv-dark hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-default shadow-sm"
              >
                {discipline}
              </motion.span>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* ========== CTA SECTION ========== */}
      <ScrollSection
        id="join"
        className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #01001F 0%, #0E56FA 100%)" }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border border-white/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full border border-white/20"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Ready to shape Vietnam&apos;s
              <span className="block text-secondary"> tech future?</span>
            </h2>

            <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Join thousands of students and industry professionals building 
              the next generation of Vietnamese tech talent.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/sfp2026">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold"
                >
                  Apply as Student
                </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/partners">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold"
                >
                  Partner as Company
                </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 md:py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img
                src="/favicon.svg"
                alt="Project X Vietnam"
                className="h-6 w-6"
              />
              <span className="text-sm text-muted-foreground">
                © 2025 Project X Vietnam
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

