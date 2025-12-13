"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TeamMemberCard, { TeamMember } from "@/components/TeamMemberCard";
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

// Extended TeamMember type with required cohort for filtering
interface TeamMemberWithCohort extends TeamMember {
  cohort: string;
}

// ============================================
// MAIN TEAM PAGE
// ============================================
export default function TeamPage() {
  const { isDark, toggle } = useDarkMode();
  const [activeFilter, setActiveFilter] = useState("2025-2026");

  // Cohort filter options
  const filterOptions = [
    { id: "all", label: "All" },
    { id: "2025-2026", label: "2025-2026" },
    { id: "2024-2025", label: "2024-2025" },
    { id: "2023-2024", label: "2023-2024" },
    { id: "2021-2022", label: "2021-2022" },
  ];

  // Leadership team (displayed prominently)
  const leadership: TeamMemberWithCohort[] = [
    // 2025-2026 Leadership (Current)
    {
      name: "Kelly Tran",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/kellytranha/",
      email: "lamha.kelly@gmail.com",
      image: "/images/team/lamha.jpg",
      cohort: "2025-2026",
    },
    {
      name: "Liam Minh Le",
      role: "President",
      linkedin: "https://www.linkedin.com/in/liamleminh/",
      email: "hunglm.pjxvietnam@gmail.com",
      image: "/images/team/liamminhle.jpg",
      cohort: "2025-2026",
    },
    {
      name: "Diu Nguyen",
      role: "Vice President",
      linkedin: "https://www.linkedin.com/in/diu-nguyen27/",
      email: "diunt.pjxvietnam@gmail.com",
      image: "/images/team/diunguyen.jpg",
      cohort: "2025-2026",
    },
    {
      name: "Ngoc Linh Tran",
      role: "Head of Product",
      image: "/images/team/ngoclinh.jpg",
      cohort: "2025-2026",
    },
    {
      name: "Phi Long",
      role: "Deputy Head of Product",
      linkedin: "https://www.linkedin.com/in/phi-long-nguyen-duc-188687290/",
      image: "/images/team/philong.jpeg",
      cohort: "2025-2026",
    },
    {
      name: "Bo Nguyen",
      role: "Head of Growth",
      linkedin: "https://www.linkedin.com/in/anh-nguyen76/",
      image: "/images/team/bo-nguyen.jpg",
      cohort: "2025-2026",
    },
    {
      name: "Dan Nhi",
      role: "Deputy Head of Growth",
      linkedin: "https://www.linkedin.com/in/dannhitruongle/",
      image: "/images/team/dannhi.jpg",
      cohort: "2025-2026",
    },
    {
      name: "Tran Lam Minh Thu",
      role: "Head of Operations",
      image: "/images/team/tran-lam-minh-thu.jpg",
      cohort: "2025-2026",
    },
    {
      name: "Giang Le",
      role: "Deputy Head of Operations",
      linkedin: "https://www.linkedin.com/in/giang-l%C3%AA-79aa11151/",
      image: "/images/team/giangle.jpg",
      cohort: "2025-2026",
    },
    // 2024-2025 Leadership
    {
      name: "Kelly Tran",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/kellytranha/",
      email: "lamha.kelly@gmail.com",
      image: "/images/team/lamha.jpg",
      cohort: "2024-2025",
    },
    {
      name: "Liam Minh Le",
      role: "President",
      linkedin: "https://www.linkedin.com/in/liamleminh/",
      email: "hunglm.pjxvietnam@gmail.com",
      image: "/images/team/liamminhle.jpg",
      cohort: "2024-2025",
    },
    {
      name: "Phuong Nga",
      role: "Head of External Relations",
      linkedin: "https://www.linkedin.com/in/ngaphuongng/",
      image: "/images/team/phuongnga.jpeg",
      cohort: "2024-2025",
    },
    {
      name: "Nguyen Duc Ha Nam",
      role: "Head of Operations",
      linkedin: "https://www.linkedin.com/in/hanam-nguyenduc/",
      image: "/images/team/hanam.jpeg",
      cohort: "2024-2025",
    },
    {
      name: "Quynh Anh Tran",
      role: "Deputy Head of Operations",
      linkedin: "https://www.linkedin.com/in/jenathejenia",
      image: "/images/team/quynhanhtran.jpg",
      cohort: "2024-2025",
    },
    {
      name: "Nguyen Minh Ngoc",
      role: "Head of Marketing & Media",
      linkedin: "https://www.linkedin.com/in/nguy%E1%BB%85n-minh-ng%E1%BB%8Dc-12b83929b/",
      image: "/images/team/nguyenminhngoc.jpg",
      cohort: "2024-2025",
    },
    {
      name: "Bo Nguyen",
      role: "Deputy Head of Marketing & Media",
      linkedin: "https://www.linkedin.com/in/anh-nguyen76/",
      image: "/images/team/bo-nguyen.jpg",
      cohort: "2024-2025",
    },
    {
      name: "Diu Nguyen",
      role: "Head of Product & Tech",
      linkedin: "https://www.linkedin.com/in/diu-nguyen27/",
      email: "diunt.pjxvietnam@gmail.com",
      image: "/images/team/diunguyen.jpg",
      cohort: "2024-2025",
    },
    {
      name: "Nguyen Gia Hung",
      role: "Deputy Head of Product & Tech",
      image: "/images/team/giahung.jpg",
      cohort: "2024-2025",
    },
    // 2023-2024 Leadership
    {
      name: "Kelly Tran",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/kellytranha/",
      email: "lamha.kelly@gmail.com",
      image: "/images/team/lamha.jpg",
      cohort: "2023-2024",
    },
    {
      name: "Nhi Dang",
      role: "President",
      linkedin: "https://www.linkedin.com/in/nhittdang/",
      image: "/images/team/nhi-dang.jpg",
      cohort: "2023-2024",
    },
    {
      name: "Bin Nguyen",
      role: "Co-President",
      image: "/images/team/bin-nguyen.jpg",
      cohort: "2023-2024",
    },
    // 2021-2022 Leadership (Founding team)
    {
      name: "Kelly Tran",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/kellytranha/",
      email: "lamha.kelly@gmail.com",
      image: "/images/team/lamha.jpg",
      cohort: "2021-2022",
    },
    {
      name: "Yhuong Tran Thi",
      role: "President",
      image: "/images/team/yhuong-tran-thi.jpg",
      cohort: "2021-2022",
    },
    {
      name: "Bin Nguyen",
      role: "Co-President",
      image: "/images/team/bin-nguyen.jpg",
      cohort: "2021-2022",
    },
  ];

  // All team members organized by cohort (non-leadership roles)
  const teamMembers: TeamMemberWithCohort[] = [
    // 2024-2025 Members
    {
      name: "Phi Long",
      role: "Member",
      department: "Product & Tech",
      linkedin: "https://www.linkedin.com/in/phi-long-nguyen-duc-188687290/",
      image: "/images/team/philong.jpeg",
      cohort: "2024-2025",
    },
    {
      name: "Ngoc Linh Tran",
      role: "Member",
      department: "Product & Tech",
      image: "/images/team/ngoclinh.jpg",
      cohort: "2024-2025",
    },
    {
      name: "Tran Lam Minh Thu",
      role: "Member",
      department: "Operations",
      image: "/images/team/tran-lam-minh-thu.jpg",
      cohort: "2024-2025",
    },
    {
      name: "Dan Nhi",
      role: "Member",
      department: "Marketing & Media",
      linkedin: "https://www.linkedin.com/in/dannhitruongle/",
      image: "/images/team/dannhi.jpg",
      cohort: "2024-2025",
    },
    {
      name: "Minh Huy",
      role: "Member",
      department: "Marketing & Media",
      image: "/images/team/minhhuy.jpg",
      cohort: "2024-2025",
    },
  ];

  // Filter team members based on active filter
  // When "all" is selected, deduplicate by name (keep first/most recent occurrence)
  const filteredMembers = activeFilter === "all"
    ? teamMembers.filter((member, index, self) => 
        self.findIndex(m => m.name === member.name) === index
      )
    : teamMembers.filter((member) => member.cohort === activeFilter);

  // Filter leadership based on active filter
  // When "all" is selected, deduplicate by name (keep first/most recent occurrence)
  const filteredLeadership = activeFilter === "all"
    ? leadership.filter((member, index, self) => 
        self.findIndex(m => m.name === member.name) === index
      )
    : leadership.filter((member) => member.cohort === activeFilter);

  // Departments - different structure based on cohort
  const departments2025 = [
    {
      name: "Partnership",
      description: "Building strategic partnerships and external relations",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: "Product",
      description: "Product development and user experience",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      name: "Growth",
      description: "Marketing, branding, and community growth",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      name: "Operations",
      description: "Program management and logistics",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  const departments2024 = [
    {
      name: "External Relations",
      description: "Partnerships, sponsorships, and external communications",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: "Product & Tech",
      description: "Platform development and technical infrastructure",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      name: "Marketing & Media",
      description: "Branding, social media, and community engagement",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
    {
      name: "Operations",
      description: "Program management, partnerships, and logistics",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  // Select departments based on active filter
  const departments = (activeFilter === "all" || activeFilter === "2025-2026")
    ? departments2025
    : departments2024;

  return (
    <main
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        isDark ? "bg-[#020818]" : "bg-white"
      }`}
    >
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
              The People Behind Project X
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
            <span className="block">Our</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-primary via-pxv-cyan to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                Team
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
            We are a community of responsible citizens, ambitious thinkers, purpose-driven hustlers, 
            and capable talents in today&apos;s rapidly changing world of innovative technologies and emerging economies.
          </motion.p>
        </div>
      </section>

      {/* ========== FILTER TABS ========== */}
      <section className={`py-8 sticky top-[65px] z-40 backdrop-blur-xl transition-colors duration-500 ${
        isDark ? "bg-[#020818]/90" : "bg-white/90"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex justify-center">
            <nav
              className={`inline-flex items-center gap-1 p-1.5 rounded-full border ${
                isDark ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
              }`}
              role="tablist"
              aria-label="Filter team members by cohort"
            >
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  role="tab"
                  aria-selected={activeFilter === option.id}
                  aria-controls={`panel-${option.id}`}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isDark ? "focus-visible:ring-offset-[#020818]" : "focus-visible:ring-offset-white"
                  } ${
                    activeFilter === option.id
                      ? isDark
                        ? "text-white"
                        : "text-white"
                      : isDark
                        ? "text-white/60 hover:text-white/80"
                        : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {activeFilter === option.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{option.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ========== LEADERSHIP SECTION ========== */}
      <AnimatePresence mode="wait">
        {filteredLeadership.length > 0 && (
          <motion.section
            key="leadership"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`py-16 transition-colors duration-500 ${
              isDark ? "bg-[#0a0f1a]" : "bg-slate-50"
            }`}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                  Leadership
                </p>
                <h2
                  className={`text-3xl md:text-4xl font-bold ${
                    isDark ? "text-white" : "text-pxv-dark"
                  }`}
                >
                  Meet Our Leadership
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {filteredLeadership.map((member, i) => (
                  <TeamMemberCard key={`${member.name}-${member.cohort}`} member={member} index={i} isDark={isDark} />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========== DEPARTMENTS SECTION (for 2024-2025 and 2025-2026) ========== */}
      {(activeFilter === "all" || activeFilter === "2025-2026" || activeFilter === "2024-2025") && (
        <section
          className={`py-20 transition-colors duration-500 ${
            isDark ? "bg-[#020818]" : "bg-white"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                Our Structure
              </p>
              <h2
                className={`text-3xl md:text-4xl font-bold ${
                  isDark ? "text-white" : "text-pxv-dark"
                }`}
              >
                Departments
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, i) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:border-primary/30"
                      : "bg-slate-50 border-slate-100 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {dept.icon}
                  </div>
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      isDark ? "text-white" : "text-pxv-dark"
                    }`}
                  >
                    {dept.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-white/60" : "text-slate-600"
                    }`}
                  >
                    {dept.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== TEAM MEMBERS GRID ========== */}
      <section
        className={`py-20 transition-colors duration-500 ${
          isDark ? "bg-[#0a0f1a]" : "bg-slate-50"
        }`}
        id={`panel-${activeFilter}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeFilter}`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              {activeFilter === "all" ? "All Members" : `${activeFilter} Cohort`}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDark ? "text-white" : "text-pxv-dark"
              }`}
            >
              Team Members
            </h2>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredMembers.map((member, i) => (
                <TeamMemberCard key={`${member.name}-${member.cohort}`} member={member} index={i} isDark={isDark} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredMembers.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-12 ${isDark ? "text-white/50" : "text-slate-500"}`}
            >
              No team members found for this cohort.
            </motion.p>
          )}
        </div>
      </section>

      {/* ========== JOIN THE TEAM CTA ========== */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0f1a 0%, #0a1a4a 50%, #0E56FA 100%)" }}
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
              Want to join
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                our team?
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-xl mx-auto">
              We&apos;re always looking for passionate individuals who want to make a difference
              in Vietnam&apos;s tech community. Apply to become an organizer or volunteer.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:info.projectxvietnam@gmail.com"
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg"
                >
                  Get in Touch
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </Button>
              </a>
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
      <footer
        className={`py-12 border-t transition-colors duration-500 ${
          isDark ? "bg-[#020818] border-white/10" : "bg-white border-slate-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/favicon.svg" alt="Project X Vietnam" className="h-7 w-7" />
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-white/60" : "text-slate-600"
                }`}
              >
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

