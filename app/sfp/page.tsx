"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";

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

export default function SummerFellowshipPage() {
  const { isDark, toggle } = useDarkMode();

  const timeline = [
    { date: "Feb 1 – 23", event: "Application Opens", description: "Submit your application online" },
    { date: "March 3", event: "Round 1 Begins", description: "Initial screening and assessment" },
    { date: "March 23", event: "Round 2 Begins", description: "Advanced evaluation stage" },
    { date: "April – May", event: "Interviews & Matching", description: "Company interviews and matching process" },
    { date: "June – August", event: "Fellowship & Internships", description: "Intensive fellowship program and internship placement" },
  ];

  const programComponents = [
    {
      title: "Hard Skills & Personal Growth",
      description: "Master technical skills and personal development through expert-led training sessions",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Real Project Building",
      description: "Work on hands-on projects that build your portfolio and real-world experience",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Multi-Mentor Matching",
      description: "Get paired with 2-3 senior mentors from Google, Meta, Shopee, VNG, MoMo & more",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Career Exploration Webinars",
      description: "Discover various career paths in the tech industry with expert insights",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "AMA with Industry Leaders",
      description: "Ask Me Anything sessions with senior professionals from top tech companies",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Company Visits",
      description: "Visit partner companies and experience their work culture firsthand",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
  ];

  const valueForStudents = [
    {
      title: "Top Mentorship",
      description: "Get matched with 2-3 senior mentors from Google, Meta, Shopee, VNG, MoMo & more",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Real Skills",
      description: "Build real projects and develop hard skills & personal growth through expert-led training",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Community",
      description: "Build lifelong friendships and professional networks with Vietnamese tech peers worldwide",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
  ];

  const valueForCompanies = [
    {
      title: "Pre-Trained Talent",
      description: "Access candidates mentored by senior tech leaders and trained in real projects",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: "Ecosystem",
      description: "Foster a strong network of universities, tech startups, and corporations",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Talent Pipeline",
      description: "Build a pipeline of high-caliber candidates with real-world project experience",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
  ];

  return (
    <main className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
      isDark ? "bg-[#020818]" : "bg-white"
    }`}>
      <DarkModeToggle isDark={isDark} toggle={toggle} />

      <Navbar isDark={isDark} />

      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 overflow-hidden transition-all duration-500">
          {isDark ? (
            <>
              <div className="absolute inset-0 bg-[#020818]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,86,250,0.2)_0%,_transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,209,255,0.15)_0%,_transparent_60%)]" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-cyan-50" />
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
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className={`text-sm font-medium ${isDark ? "text-primary" : "text-primary"}`}>
              Summer 2025 Applications Opening Soon
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
            <span className="block">Summer</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-primary via-pxv-cyan to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                Fellowship Program
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
            Our flagship program transforms high-potential young people into job-ready tech professionals 
            through real project experience, multi-mentor guidance from top tech experts, and parallel internships at leading companies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/recruitment2026">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Apply Now
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
              Partner with Us
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
                { value: 500, suffix: "", label: "Fellows Selected" },
                { value: 100, suffix: "+", label: "Internship Placements" },
                { value: 130, suffix: "+", label: "Universities" },
                { value: 50, suffix: "+", label: "Partner Companies" },
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

      {/* ========== JOURNEY SECTION ========== */}
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
              The Journey
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              From Classroom to Career-Ready
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              A structured, multi-month journey designed to transform high-potential students into industry-ready professionals.
            </p>
          </motion.div>

          {/* Journey Steps */}
          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {[
              {
                step: "01",
                title: "Selection",
                description: "Competitive multi-round application from 130+ universities across 10+ countries",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Development",
                description: "Build real projects, develop hard skills & personal growth from top industry experts",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Mentorship",
                description: "Matched with 2-3 senior mentors from Google, Meta, Shopee, VNG, MoMo & more",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                step: "04",
                title: "Internship",
                description: "Maintain partner internships secured during pre-program recruitment phase",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {i < 3 && (
                  <div className={`hidden md:block absolute top-10 left-[60%] w-[80%] h-px ${
                    isDark ? "bg-white/10" : "bg-slate-200"
                  }`} />
                )}
                
                <div className={`relative z-10 p-6 rounded-2xl border transition-all ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-slate-100 shadow-sm"
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono text-primary/60">{item.step}</span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    isDark ? "text-white" : "text-pxv-dark"
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${
                    isDark ? "text-white/50" : "text-slate-500"
                  }`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TIMELINE SECTION ========== */}
      <section className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-[#020818]" : "bg-white"
      }`}>
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Summer 2025
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Program Timeline
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-px ${
              isDark ? "bg-white/10" : "bg-slate-200"
            }`} />

            {timeline.map((item, i) => (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-center gap-6 mb-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 ${
                  i === timeline.length - 1
                    ? "bg-gradient-to-br from-primary to-cyan-500"
                    : isDark ? "bg-primary/50 border-2 border-primary" : "bg-primary/30 border-2 border-primary"
                }`} />

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                }`}>
                  <div className={`inline-block p-6 rounded-2xl border ${
                    isDark
                      ? "bg-white/5 border-white/10"
                      : "bg-slate-50 border-slate-100"
                  }`}>
                    <span className="text-sm font-bold text-primary">{item.date}</span>
                    <h3 className={`text-lg font-bold mt-1 ${
                      isDark ? "text-white" : "text-pxv-dark"
                    }`}>
                      {item.event}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      isDark ? "text-white/60" : "text-slate-600"
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROGRAM COMPONENTS SECTION ========== */}
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
              What You&apos;ll Get
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Program Components
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Comprehensive training designed to prepare you for success in the tech industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programComponents.map((component, i) => (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:border-primary/30"
                    : "bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center text-primary mb-4">
                  {component.icon}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  isDark ? "text-white" : "text-pxv-dark"
                }`}>
                  {component.title}
                </h3>
                <p className={`text-sm ${
                  isDark ? "text-white/60" : "text-slate-600"
                }`}>
                  {component.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VALUE PROPOSITION SECTION ========== */}
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
              Value Proposition
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              What&apos;s In It For You
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* For Students */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`p-6 md:p-8 rounded-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>
                  For University Students
                </h3>
              </div>

              <div className="space-y-4">
                {valueForStudents.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-pxv-dark"}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* For Companies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`p-6 md:p-8 rounded-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>
                  For Tech Companies
                </h3>
              </div>

              <div className="space-y-4">
                {valueForCompanies.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-pxv-dark"}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== GOALS SECTION ========== */}
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
              Our Goals
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              What We&apos;re Working Towards
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Short-term */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-slate-100 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>
                  Short-Term (Summer 2025)
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Select 500 students from 1,000 applicants after Round 1",
                  "Select 500 students for training and mentorship programs",
                  "Place 100 internship opportunities",
                ].map((goal, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
                      {goal}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Long-term */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`p-8 rounded-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-slate-100 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>
                  Long-Term Vision
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Increase number of internship opportunities offered annually",
                  "Increase number of students trained by Project X year over year",
                  "Expand partnerships with more global tech companies",
                  "Build the largest Vietnamese tech talent network worldwide",
                ].map((goal, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
                      {goal}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== PARTNER COMMITMENT SECTION ========== */}
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
              For Partner Companies
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Partner with Us
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              &ldquo;It does not cost anything to get our support to access the best tech talents.
              We only ask for your commitment.&rdquo;
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Compensation Commitment",
                description: "Companies commit to fair compensation and formal internship contracts",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Company Mentorship",
                description: "Companies provide professional development feedback at least twice during the internship",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Brand & Logo Promotion",
                description: "Partner companies allow Project X to showcase partnership branding",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )
              },
              {
                title: "Other Support",
                description: "Project X is operated by 30+ volunteers worldwide; small donations or in-kind support are appreciated",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold mb-1 ${isDark ? "text-white" : "text-pxv-dark"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Become a Partner
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
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to transform
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                your tech career?
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-xl mx-auto">
              Join the Summer Fellowship Program and get access to mentors, training, 
              and internship opportunities at leading tech companies.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg"
              >
                Start Your Application
              </Button>
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
