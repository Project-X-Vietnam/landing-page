"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import TeamMemberCard, { TeamMember } from "@/components/TeamMemberCard";
import Link from "next/link";
import { Users, Code, TrendingUp, ClipboardList, Megaphone, Mail } from "lucide-react";

// Extended TeamMember type with required cohort for filtering
interface TeamMemberWithCohort extends TeamMember {
  cohort: string;
}

// ============================================
// MAIN TEAM PAGE
// ============================================
export default function TeamPage() {
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
    {
      name: "Nguyen Vu Gia Hung",
      role: "Head of Partnership",
      linkedin: "http://linkedin.com/in/hungnguyenvg",
      email: "hungnvg1.pjxvietnam@gmail.com",
      image: "/images/team/nguyenvugiahung.jpeg",
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
      linkedin: "http://linkedin.com/in/hungnguyenvg",
      image: "/images/team/nguyenvugiahung.jpeg",
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
      icon: <Users className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      name: "Product",
      description: "Product development and user experience",
      icon: <Code className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      name: "Growth",
      description: "Marketing, branding, and community growth",
      icon: <TrendingUp className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      name: "Operations",
      description: "Program management and logistics",
      icon: <ClipboardList className="w-6 h-6" strokeWidth={1.7} />,
    },
  ];

  const departments2024 = [
    {
      name: "External Relations",
      description: "Partnerships, sponsorships, and external communications",
      icon: <Users className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      name: "Product & Tech",
      description: "Platform development and technical infrastructure",
      icon: <Code className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      name: "Marketing & Media",
      description: "Branding, social media, and community engagement",
      icon: <Megaphone className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      name: "Operations",
      description: "Program management, partnerships, and logistics",
      icon: <ClipboardList className="w-6 h-6" strokeWidth={1.7} />,
    },
  ];

  // Select departments based on active filter
  const departments = (activeFilter === "all" || activeFilter === "2025-2026")
    ? departments2025
    : departments2024;

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fbfcff] text-[#183253]">
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_22%_8%,rgba(14,86,250,0.065),transparent_28%),linear-gradient(180deg,#fbfcff_0%,#f6f9ff_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.28] [background-image:linear-gradient(rgba(14,86,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,86,250,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />

      {/* Navigation */}
      <SiteNav />

      {/* ========== HERO SECTION ========== */}
      <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden pt-24">
        <div className="relative z-10 mx-auto max-w-[1510px] px-4 py-20 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow>The People Behind Project X</Eyebrow>
          </Reveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl font-normal leading-[1.1] tracking-tight text-[#183253] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">Our</span>
            <span className="mt-2 block">
              <span className="text-[#0E56FA]">Team</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#52617b] md:mt-8 md:text-lg"
          >
            We are a community of responsible citizens, ambitious thinkers, purpose-driven hustlers,
            and capable talents in today&apos;s rapidly changing world of innovative technologies and emerging economies.
          </motion.p>
        </div>
      </section>

      {/* ========== FILTER TABS ========== */}
      <section className="border-b border-[#dbe5f6] bg-[#fbfcff]/82 py-8 backdrop-blur-xl">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <nav
              className="inline-flex items-center gap-1 rounded-full border border-[#dbe5f6] bg-[#f6f9ff] p-1.5"
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
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfcff] ${
                    activeFilter === option.id
                      ? "text-white"
                      : "text-[#52617b] hover:text-[#183253]"
                  }`}
                >
                  {activeFilter === option.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-primary"
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#f6f9ff] py-16 md:py-24"
          >
            <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
              <Reveal className="mb-12 text-center">
                <Eyebrow>Leadership</Eyebrow>
                <h2 className="mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
                  Meet Our Leadership
                </h2>
              </Reveal>

              {/* flex + justify-center so a partially filled last row stays centered */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
                {filteredLeadership.map((member, i) => (
                  <div
                    key={`${member.name}-${member.cohort}`}
                    className="w-full sm:w-[calc(50%_-_0.75rem)] md:w-[calc(33.333%_-_1rem)] lg:w-[calc(25%_-_1.125rem)]"
                  >
                    <TeamMemberCard member={member} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========== DEPARTMENTS SECTION (for 2024-2025 and 2025-2026) ========== */}
      {(activeFilter === "all" || activeFilter === "2025-2026" || activeFilter === "2024-2025") && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-12 text-center">
              <Eyebrow>Our Structure</Eyebrow>
              <h2 className="mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
                Departments
              </h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {departments.map((dept, i) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[18px] border border-[#dbe5f6] bg-white p-6 text-center transition-shadow hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[12px] bg-[#edf6ff] text-[#0E56FA]">
                    {dept.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-normal text-[#183253]">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-[#52617b]">
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
        className="bg-[#f6f9ff] py-16 md:py-24"
        id={`panel-${activeFilter}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeFilter}`}
      >
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <Eyebrow>
              {activeFilter === "all" ? "All Members" : `${activeFilter} Cohort`}
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
              Team Members
            </h2>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap justify-center gap-x-6 gap-y-10"
            >
              {filteredMembers.map((member, i) => (
                <div
                  key={`${member.name}-${member.cohort}`}
                  className="w-full sm:w-[calc(50%_-_0.75rem)] md:w-[calc(33.333%_-_1rem)] lg:w-[calc(25%_-_1.125rem)] xl:w-[calc(20%_-_1.2rem)]"
                >
                  <TeamMemberCard member={member} index={i} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredMembers.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center text-[#52617b]"
            >
              No team members found for this cohort.
            </motion.p>
          )}
        </div>
      </section>

      {/* ========== JOIN THE TEAM CTA ========== */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{ background: "linear-gradient(135deg, #0a0f1a 0%, #0a1a4a 50%, #0E56FA 100%)" }}
      >
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -right-1/4 -top-1/2 h-[800px] w-[800px] rounded-full border border-white/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/4 h-[600px] w-[600px] rounded-full border border-white/10"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-normal leading-tight text-white md:text-4xl lg:text-5xl">
              Want to join
              <span className="mt-2 block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                our team?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/60 md:text-lg">
              We&apos;re always looking for passionate individuals who want to make a difference
              in Vietnam&apos;s tech community. Apply to become an organizer or volunteer.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:info.projectxvietnam@gmail.com"
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="rounded-full bg-white px-8 py-6 text-base font-semibold text-primary shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90"
                >
                  Get in Touch
                  <Mail className="ml-2 h-4 w-4" strokeWidth={1.7} />
                </Button>
              </a>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/30 px-8 py-6 text-base font-semibold text-white transition-all hover:scale-[1.02] hover:bg-white/10"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <SiteFooter />
    </main>
  );
}
