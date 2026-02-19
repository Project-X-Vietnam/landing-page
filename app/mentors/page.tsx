"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

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
// MAIN MENTORS PAGE
// ============================================
export default function MentorsPage() {
  const { isDark, toggle } = useDarkMode();

  const mentorRoles = [
    { role: "Software Engineering", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ), count: "40+" },
    { role: "Product Management", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ), count: "20+" },
    { role: "Data Science & Analytics", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ), count: "15+" },
    { role: "Engineering Management", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ), count: "10+" },
    { role: "UI/UX Design", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ), count: "8+" },
    { role: "AI & Machine Learning", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ), count: "7+" },
  ];

  const featuredMentors = [
    {
      name: "Tien Dao",
      role: "Product Designer II",
      company: "Microsoft",
      image: "/images/mentors/tien dao.jpeg",
      linkedin: "https://www.linkedin.com/in/tiendt/",
      color: "from-primary to-blue-400"
    },
    {
      name: "Van Ha",
      role: "Senior Product Manager",
      company: "Amazon",
      image: "/images/mentors/van ha.jpeg",
      linkedin: "https://www.linkedin.com/in/van-ha-bb895945/",
      color: "from-blue-500 to-cyan-400"
    },
    {
      name: "Trung Do",
      role: "Senior Product Manager",
      company: "SAP",
      image: "/images/mentors/trung do.jpeg",
      linkedin: "https://www.linkedin.com/in/trungdotech/",
      color: "from-primary to-blue-400"
    },
    {
      name: "Jackie Trang Nguyen",
      role: "Software Engineer",
      company: "Meta",
      image: "/images/mentors/jackie trang nguyen.jpg",
      linkedin: "https://www.linkedin.com/in/jackie-nguyen-893011131/",
      color: "from-blue-500 to-cyan-400"
    },
    {
      name: "Quang Nguyen",
      role: "Software Engineer",
      company: "Microsoft",
      image: "/images/mentors/quang nguyen.jpeg",
      linkedin: "https://www.linkedin.com/in/quang1401/",
      color: "from-primary to-blue-400"
    },
    {
      name: "Tuan Doan Nguyen",
      role: "Staff Data Scientist",
      company: "Quora",
      image: "/images/mentors/tuan doan nguyen.png",
      linkedin: "https://www.linkedin.com/in/tuan-nguyen-doan/",
      color: "from-blue-500 to-cyan-400"
    },
  ];

  const speakerTopics = [
    "AI & Emerging Technologies",
    "Healthcare Innovation",
    "Southeast Asia Tech Ecosystem",
    "Silicon Valley Insights",
    "Entrepreneurship & Startups",
    "Career Growth Strategies",
    "Technical Leadership",
    "Product Development",
  ];

  const mentorshipBenefits = [
    {
      title: "Multi-Mentor Matching",
      description: "Get paired with 2-3 senior mentors for comprehensive guidance across multiple areas",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      title: "Career Guidance",
      description: "Navigate your career path with advice from those who've been there",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: "Resume & Interview Prep",
      description: "Get your resume reviewed and practice interviews with industry experts",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Industry Insights",
      description: "Learn what it's really like to work at top tech companies",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Network Building",
      description: "Connect with a community of mentors and like-minded peers",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Project Feedback",
      description: "Get expert feedback on your projects and portfolio work",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
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
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-24">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden transition-all duration-500">
          {isDark ? (
            <>
              <div className="absolute inset-0 bg-[#020818]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,86,250,0.2)_0%,_transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,209,255,0.15)_0%,_transparent_50%)]" />
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
              85+ Senior Mentors · 2-3 Mentors per Fellow
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
            <span className="block">Learn from</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-primary via-pxv-cyan to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                Industry Leaders
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
            Our mentors are senior engineers, product managers, data scientists, and leaders 
            from Google, Meta, Shopee, VNG, MoMo, and top tech companies worldwide. Fellows are matched with 2-3 mentors for comprehensive guidance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/sfp2026">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Apply to Get Matched
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
            <Button
              size="lg"
              variant="outline"
              className={`rounded-full px-8 py-6 text-base font-semibold transition-all hover:scale-[1.02] ${
                isDark
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              Become a Mentor
            </Button>
          </motion.div>

          {/* Quick Stats */}
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
                { value: 85, suffix: "+", label: "Senior Mentors" },
                { value: 35, suffix: "+", label: "Partner Companies" },
                { value: 12, suffix: "+", label: "Countries" },
                { value: 2, suffix: "-3", label: "Mentors per Fellow" },
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
      </section>

      {/* ========== MENTOR ROLES SECTION ========== */}
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
              Expertise Areas
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Mentors Across Every Domain
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Our mentors cover the full spectrum of tech roles, from engineering to product to design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorRoles.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:border-primary/30"
                    : "bg-slate-50 border-slate-100 hover:shadow-md hover:border-primary/20"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                  }`}>
                    {item.icon}
                  </div>
                  <span className={`text-2xl font-bold ${
                    isDark ? "text-primary" : "text-primary"
                  }`}>
                    {item.count}
                  </span>
                </div>
                <h3 className={`text-lg font-bold ${
                  isDark ? "text-white" : "text-pxv-dark"
                }`}>
                  {item.role}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED MENTORS SECTION ========== */}
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
              Mentor Profiles
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Meet Some of Our Mentors
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Professionals working at global technology companies and startups across engineering, product, data, and management roles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMentors.map((mentor, i) => (
              <motion.div
                key={mentor.name + mentor.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-2xl border ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-slate-100 shadow-sm"
                }`}
              >
                {/* Gradient header */}
                <div className={`h-24 bg-gradient-to-r ${mentor.color}`} />
                
                {/* Avatar */}
                <div className="absolute top-12 left-6">
                  <div className={`w-24 h-24 rounded-2xl overflow-hidden border-4 ${
                    isDark ? "border-[#0a0f1a]" : "border-white"
                  }`}>
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="pt-16 p-6">
                  <h3 className={`text-lg font-bold ${
                    isDark ? "text-white" : "text-pxv-dark"
                  }`}>
                    {mentor.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    isDark ? "text-white/60" : "text-slate-600"
                  }`}>
                    {mentor.role} @ {mentor.company}
                  </p>
                  <a
                    href={mentor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                      isDark
                        ? "text-primary hover:text-primary/80"
                        : "text-primary hover:text-primary/80"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn Profile
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`text-center mt-8 ${isDark ? "text-white/50" : "text-slate-500"}`}
          >
            And many more mentors participate each year...
          </motion.p>
        </div>
      </section>

      {/* ========== MENTORSHIP BENEFITS SECTION ========== */}
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
              What You Get
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Mentorship Benefits
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Personalized guidance tailored to your career goals and aspirations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorshipBenefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                  isDark
                    ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-primary/30"
                    : "bg-gradient-to-br from-slate-50 to-white border-slate-100 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-pxv-cyan/10 flex items-center justify-center text-primary mb-4">
                  {benefit.icon}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  isDark ? "text-white" : "text-pxv-dark"
                }`}>
                  {benefit.title}
                </h3>
                <p className={`text-sm ${
                  isDark ? "text-white/60" : "text-slate-600"
                }`}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SPEAKERS SECTION ========== */}
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
              Speaker Series
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Learn from Industry Experts
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Our speakers include engineers, founders, and leaders from global tech companies sharing insights on:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {speakerTopics.map((topic, i) => (
              <motion.span
                key={topic}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`px-5 py-3 rounded-full text-sm font-medium border transition-all hover:scale-105 ${
                  isDark
                    ? "bg-gradient-to-r from-primary/10 to-pxv-cyan/10 border-primary/20 text-white/80 hover:border-primary/50"
                    : "bg-gradient-to-r from-primary/5 to-pxv-cyan/5 border-primary/10 text-slate-700 hover:border-primary/30"
                }`}
              >
                {topic}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`text-center mt-8 ${isDark ? "text-white/50" : "text-slate-500"}`}
          >
            And many more speakers across cohorts...
          </motion.p>
        </div>
      </section>

      {/* ========== BECOME A MENTOR SECTION ========== */}
      <section className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-[#020818]" : "bg-white"
      }`}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                Give Back
              </p>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? "text-white" : "text-pxv-dark"
              }`}>
                Become a Mentor
              </h2>
              <p className={`mb-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Share your experience and help shape the next generation of Vietnamese tech talent. 
                Whether you have 2 years or 20 years of experience, your insights can make a difference.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Flexible time commitment (2-4 hours/month)",
                  "Connect with motivated, talented students",
                  "Give back to the Vietnamese tech community",
                  "Join a network of 85+ senior professionals",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Apply to Mentor
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`p-8 rounded-3xl ${
                isDark
                  ? "bg-gradient-to-br from-primary/20 via-pxv-cyan/10 to-transparent border border-primary/20"
                  : "bg-gradient-to-br from-primary/10 via-pxv-cyan/5 to-white border border-primary/10"
              }`}
            >
              <h3 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-pxv-dark"}`}>
                Mentor Requirements
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Experience", value: "2+ years in tech industry" },
                  { label: "Location", value: "Anywhere in the world" },
                  { label: "Time", value: "2-4 hours per month" },
                  { label: "Passion", value: "Desire to help others grow" },
                ].map((item) => (
                  <li key={item.label} className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>
                      {item.label}
                    </span>
                    <span className={`text-sm font-medium ${isDark ? "text-white" : "text-pxv-dark"}`}>
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0a1a4a 50%, #0E56FA 100%)' }}
      >
        {/* Decorative elements */}
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
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to accelerate
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                your career growth?
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-xl mx-auto">
              Get matched with a mentor who&apos;s been where you want to go. 
              Join the Summer Fellowship Program and start your journey.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sfp2026">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg"
                >
                  Apply Now
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all"
                >
                  Back to Home
                </Button>
              </Link>
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
