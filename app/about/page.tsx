"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";

// ============================================
// DARK MODE HOOK
// ============================================
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

// ============================================
// ANIMATED COUNTER
// ============================================
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

// ============================================
// DARK MODE TOGGLE SWITCH
// ============================================
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

// ============================================
// MAIN ABOUT PAGE
// ============================================
export default function AboutPage() {
  const { isDark, toggle } = useDarkMode();

  const countriesRepresented = [
    "Vietnam", "United States", "United Kingdom", "Australia", "Singapore",
    "China", "Germany", "Finland", "Canada", "Qatar", "South Korea", "Netherlands"
  ];

  const partneredSchools = [
    "VinUniversity", "FPT University", "Vietnam National University – Ho Chi Minh City",
    "Ho Chi Minh City University of Technology", "VinUniversity Entrepreneurship Lab",
    "VN-UK Institute for Research & Executive Education"
  ];

  const partnerOrganizations = [
    {
      name: "Global Shapers Community – HCMC Hub",
      description: "An initiative backed by the World Economic Forum, comprising young leaders under 30 addressing local and global challenges"
    },
    {
      name: "Grokking Vietnam",
      description: "A non-profit founded by Vietnamese software engineers to build Vietnam's software engineering community"
    },
    {
      name: "VNOI",
      description: "A non-profit providing free computer science education resources for Vietnamese high school and university students"
    }
  ];

  const skillAreas = [
    "Software Engineering", "Data Science & Analytics", "Artificial Intelligence & Machine Learning",
    "Cloud Computing", "Cybersecurity", "Product / Project Management", "UI / UX Design",
    "Product Growth", "Research", "Hardware"
  ];

  const teamMembers = [
    {
      name: "Kelly Tran",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/kellytranha/",
      email: "lamha.kelly@gmail.com",
      image: "/images/team/lamha.jpg"
    },
    {
      name: "Liam Minh Le",
      role: "President",
      linkedin: "https://www.linkedin.com/in/liamleminh/",
      email: "hunglm.pjxvietnam@gmail.com",
      image: "/images/team/liamminhle.jpg"
    },
    {
      name: "Diu Nguyen",
      role: "Vice President",
      linkedin: "https://www.linkedin.com/in/diu-nguyen27/",
      email: "diunt.pjxvietnam@gmail.com",
      image: "/images/team/diunguyen.jpg"
    }
  ];

  return (
    <main className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
      isDark ? "bg-[#020818]" : "bg-white"
    }`}>
      {/* Dark Mode Toggle */}
      <DarkModeToggle isDark={isDark} toggle={toggle} />

      {/* Navigation */}
      <Navbar isDark={isDark} />

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden pt-24">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden transition-all duration-500">
          {isDark ? (
            <>
              <div className="absolute inset-0 bg-[#020818]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,86,250,0.15)_0%,_transparent_70%)]" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(14,86,250,0.3) 1px, transparent 1px),
                                   linear-gradient(to bottom, rgba(14,86,250,0.3) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary/5" />
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

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-sm mb-8 ${
              isDark
                ? "bg-primary/10 border-primary/30"
                : "bg-gradient-to-r from-primary/5 via-pxv-cyan/5 to-primary/5 border-primary/15"
            }`}
          >
            <span className={`text-sm font-medium ${isDark ? "text-primary" : "text-primary"}`}>
              2024–2025 Organization & Fellowship Profile
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}
          >
            <span className="block">About</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-primary via-pxv-cyan to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                Project X Vietnam
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`mt-6 md:mt-8 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-white/60" : "text-slate-600"
            }`}
          >
            Founded in 2022, Project X is a non-profit organization that seeks to nurture the 
            next generation of talent in Vietnam&apos;s rising wave of innovation and technology development.
          </motion.p>
        </div>
      </section>

      {/* ========== AT A GLANCE SECTION ========== */}
      <section className={`py-20 transition-colors duration-500 ${
        isDark ? "bg-[#0a0f1a]" : "bg-slate-50"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              At a Glance
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Project X Vietnam by the numbers
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 85, suffix: "+", label: "Senior Mentors", sublabel: "from top tech companies" },
              { value: 2000, suffix: "+", label: "Applicants", sublabel: "per cohort" },
              { value: 35, suffix: "+", label: "Partners", sublabel: "hiring & career services" },
              { value: 12, suffix: "+", label: "Countries", sublabel: "global presence" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border text-center ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-slate-100 shadow-sm"
                }`}
              >
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-pxv-dark"
                }`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className={`font-semibold ${isDark ? "text-white/80" : "text-slate-700"}`}>
                  {stat.label}
                </p>
                <p className={`text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
                  {stat.sublabel}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-[#020818]" : "bg-white"
      }`}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Our Mission
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Our Commitments
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                ),
                title: "Empower Tech Students",
                items: [
                  "Early-career consulting exposure",
                  "Industry connections",
                  "Rigorous training in fundamental technical and soft skills"
                ]
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Build & Nurture Talent",
                items: [
                  "Extensive professional development",
                  "Personal development programs",
                  "Project-based learning & structured mentorship"
                ]
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "Support Tech Companies",
                items: [
                  "Access to high-quality talent annually",
                  "Leveraging professional networks",
                  "Branding and recruitment support"
                ]
              }
            ].map((commitment, i) => (
              <motion.div
                key={commitment.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 md:p-8 rounded-2xl border ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                }`}>
                  {commitment.icon}
                </div>
                <h3 className={`text-lg font-bold mb-4 ${
                  isDark ? "text-white" : "text-pxv-dark"
                }`}>
                  {commitment.title}
                </h3>
                <ul className="space-y-3">
                  {commitment.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY NOW SECTION ========== */}
      <section className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-[#0a0f1a]" : "bg-slate-50"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Why Now
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Commitment to Vietnam&apos;s Fourth Industrial Revolution
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Vietnam&apos;s technology landscape is rapidly transforming, creating unprecedented opportunities and challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { value: "$12B+", label: "Invested in Vietnam's tech landscape since 2021" },
              { value: "14,000+", label: "Tech companies and startups" },
              { value: "800,000+", label: "Tech students nationwide" },
              { value: "60%", label: "Companies facing high-quality HR shortages" },
              { value: "78%", label: "Jobs at risk in the next 20 years" },
              { value: "2M+", label: "Tech workers needed by 2030" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? "bg-gradient-to-br from-primary/10 to-transparent border-primary/20"
                    : "bg-white border-primary/10 shadow-sm"
                }`}
              >
                <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                <p className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SKILL AREAS SECTION ========== */}
      <section className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-[#020818]" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Tech Jobs & Tech Talents
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Targeted Skill Areas
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Project X targets a comprehensive range of tech-related skillsets to address human resource gaps within tech companies and startups.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {skillAreas.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:scale-105 ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white/70 hover:border-primary/50 hover:text-white"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== GLOBAL REACH SECTION ========== */}
      <section className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-[#0a0f1a]" : "bg-slate-50"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Global Reach
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              2024 Fellowship Applicants
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Applicants from 130+ universities globally, across 10+ countries and 5 continents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Countries */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-pxv-dark"}`}>
                Countries Represented
              </h3>
              <div className="flex flex-wrap gap-2">
                {countriesRepresented.map((country) => (
                  <span
                    key={country}
                    className={`px-4 py-2 rounded-full text-sm ${
                      isDark
                        ? "bg-white/10 text-white/70"
                        : "bg-white text-slate-600 shadow-sm"
                    }`}
                  >
                    {country}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Academic Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-pxv-dark"}`}>
                Applicant Distribution by Academic Level
              </h3>
              <div className="space-y-4">
                {[
                  { level: "Junior", percentage: 27 },
                  { level: "Sophomore", percentage: 27 },
                  { level: "Senior / Graduate", percentage: 20 },
                  { level: "Freshman", percentage: 20 },
                  { level: "High School", percentage: 6 },
                ].map((item) => (
                  <div key={item.level}>
                    <div className="flex justify-between mb-1">
                      <span className={`text-sm font-medium ${isDark ? "text-white/70" : "text-slate-600"}`}>
                        {item.level}
                      </span>
                      <span className={`text-sm font-medium ${isDark ? "text-white/50" : "text-slate-500"}`}>
                        ~{item.percentage}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-200"}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== MENTORS & PARTNERS SECTION ========== */}
      <section className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-[#020818]" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Our Network
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Mentors & Partners
            </h2>
          </motion.div>

          {/* Partner Organizations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <h3 className={`text-xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-pxv-dark"}`}>
              Partnered Organizations
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {partnerOrganizations.map((org) => (
                <div
                  key={org.name}
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? "bg-white/5 border-white/10"
                      : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-pxv-dark"}`}>
                    {org.name}
                  </h4>
                  <p className={`text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>
                    {org.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Partnered Schools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h3 className={`text-xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-pxv-dark"}`}>
              Partnered Schools & Universities
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {partneredSchools.map((school) => (
                <span
                  key={school}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    isDark
                      ? "bg-pxv-cyan/10 text-pxv-cyan border border-pxv-cyan/20"
                      : "bg-cyan-50 text-primary border border-primary/10"
                  }`}
                >
                  {school}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========== TEAM SECTION ========== */}
      <section className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-[#0a0f1a]" : "bg-slate-50"
      }`}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Leadership
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Meet the Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl ${
                  isDark
                    ? "bg-white/5"
                    : "bg-white shadow-sm hover:shadow-md transition-shadow"
                }`}
              >
                {/* Photo */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Info overlay at bottom */}
                <div className={`p-5 ${
                  isDark ? "bg-white/5" : "bg-white"
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className={`font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>
                        {member.name}
                      </h3>
                      <p className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>
                        {member.role}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? "bg-white/10 hover:bg-primary/20 text-white/60 hover:text-primary"
                            : "bg-slate-100 hover:bg-primary/10 text-slate-500 hover:text-primary"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? "bg-white/10 hover:bg-primary/20 text-white/60 hover:text-primary"
                            : "bg-slate-100 hover:bg-primary/10 text-slate-500 hover:text-primary"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View Full Team Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <p className={`text-sm mb-4 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Project X Vietnam is run by 30+ volunteers across departments including Partnership, Product, Growth, and Operations.
            </p>
            <Link
              href="/team"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-[1.02] ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              Meet the Full Team
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-[#020818]" : "bg-white"
      }`}>
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Contact Us
            </h2>

            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <a
                href="mailto:info.projectxvietnam@gmail.com"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-colors ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info.projectxvietnam@gmail.com
              </a>
              <a
                href="https://www.projectxvietnam.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-colors ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                projectxvietnam.org
              </a>
              <a
                href="https://fb.com/TechXVn"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-colors ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>

            <Link href="/">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Back to Home
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

