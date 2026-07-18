"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Users,
  Building2,
  Check,
  Linkedin,
  Mail,
  Globe,
  ArrowRight,
} from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import AnimatedCounter from "@/components/AnimatedCounter";

// ============================================
// MAIN ABOUT PAGE
// ============================================
export default function AboutPage() {
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
    <main className="min-h-screen overflow-x-clip bg-[#fbfcff] text-[#183253]">
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_22%_8%,rgba(14,86,250,0.065),transparent_28%),linear-gradient(180deg,#fbfcff_0%,#f6f9ff_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.28] [background-image:linear-gradient(rgba(14,86,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,86,250,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />

      {/* Navigation */}
      <SiteNav />

      {/* ========== HERO SECTION ========== */}
      <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden pt-24">
        <div className="relative z-10 mx-auto max-w-[1510px] px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-[8px] border border-[#cfe8ff] bg-[#edf6ff] px-5 py-2.5"
          >
            <span className="text-sm font-medium text-[#0E56FA]">
              2024–2025 Organization & Fellowship Profile
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-normal leading-[1.1] tracking-tight text-[#183253] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">About</span>
            <span className="mt-2 block">
              <span className="text-[#0E56FA]">Project X Vietnam</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#52617b] md:mt-8 md:text-lg"
          >
            Founded in 2022, Project X is a non-profit organization that seeks to nurture the
            next generation of talent in Vietnam&apos;s rising wave of innovation and technology development.
          </motion.p>
        </div>
      </section>

      {/* ========== AT A GLANCE SECTION ========== */}
      <section className="bg-[#f6f9ff] py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <Eyebrow>At a Glance</Eyebrow>
            <h2 className="mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
              Project X Vietnam by the numbers
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: 85, suffix: "+", label: "Senior Mentors", sublabel: "from top tech companies" },
              { value: 2000, suffix: "+", label: "Applicants", sublabel: "per cohort" },
              { value: 35, suffix: "+", label: "Partners", sublabel: "hiring & career services" },
              { value: 12, suffix: "+", label: "Countries", sublabel: "global presence" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="rounded-[18px] border border-[#dbe5f6] bg-white p-6 text-center transition-shadow hover:shadow-lg">
                  <div className="mb-2 text-3xl font-normal text-[#183253] md:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="font-semibold text-[#183253]">
                    {stat.label}
                  </p>
                  <p className="text-sm text-[#52617b]">
                    {stat.sublabel}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <Eyebrow>Our Mission</Eyebrow>
            <h2 className="mb-8 mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
              Our Commitments
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <GraduationCap className="h-6 w-6" />,
                title: "Empower Tech Students",
                items: [
                  "Early-career consulting exposure",
                  "Industry connections",
                  "Rigorous training in fundamental technical and soft skills"
                ]
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Build & Nurture Talent",
                items: [
                  "Extensive professional development",
                  "Personal development programs",
                  "Project-based learning & structured mentorship"
                ]
              },
              {
                icon: <Building2 className="h-6 w-6" />,
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
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="rounded-[18px] border border-[#dbe5f6] bg-white p-6 transition-shadow hover:shadow-lg md:p-8"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#edf6ff] text-[#0E56FA]">
                  {commitment.icon}
                </div>
                <h3 className="mb-4 text-lg font-semibold text-[#183253]">
                  {commitment.title}
                </h3>
                <ul className="space-y-3">
                  {commitment.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0E56FA]" />
                      <span className="text-sm text-[#52617b]">
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
      <section className="bg-[#f6f9ff] py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <Eyebrow>Why Now</Eyebrow>
            <h2 className="mb-4 mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
              Commitment to Vietnam&apos;s Fourth Industrial Revolution
            </h2>
            <p className="mx-auto max-w-2xl text-[#52617b]">
              Vietnam&apos;s technology landscape is rapidly transforming, creating unprecedented opportunities and challenges.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="rounded-[18px] border border-[#dbe5f6] bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <p className="mb-2 text-3xl font-normal text-[#0E56FA]">{stat.value}</p>
                <p className="text-sm text-[#52617b]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SKILL AREAS SECTION ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <Eyebrow>Tech Jobs & Tech Talents</Eyebrow>
            <h2 className="mb-4 mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
              Targeted Skill Areas
            </h2>
            <p className="mx-auto max-w-2xl text-[#52617b]">
              Project X targets a comprehensive range of tech-related skillsets to address human resource gaps within tech companies and startups.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {skillAreas.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[8px] border border-[#cfe8ff] bg-[#edf6ff] px-5 py-2.5 text-sm font-medium text-[#0E56FA] transition-all hover:scale-105"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== GLOBAL REACH SECTION ========== */}
      <section className="bg-[#f6f9ff] py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <Eyebrow>Global Reach</Eyebrow>
            <h2 className="mb-4 mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
              2024 Fellowship Applicants
            </h2>
            <p className="mx-auto max-w-2xl text-[#52617b]">
              Applicants from 130+ universities globally, across 10+ countries and 5 continents.
            </p>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Countries */}
            <Reveal>
              <h3 className="mb-6 text-xl font-semibold text-[#183253]">
                Countries Represented
              </h3>
              <div className="flex flex-wrap gap-2">
                {countriesRepresented.map((country) => (
                  <span
                    key={country}
                    className="rounded-[8px] border border-[#cfe8ff] bg-[#edf6ff] px-4 py-2 text-sm text-[#0E56FA]"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Academic Distribution */}
            <Reveal delay={0.1}>
              <h3 className="mb-6 text-xl font-semibold text-[#183253]">
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
                    <div className="mb-1 flex justify-between">
                      <span className="text-sm font-medium text-[#52617b]">
                        {item.level}
                      </span>
                      <span className="text-sm font-medium text-[#52617b]">
                        ~{item.percentage}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#dbe5f6]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-[#0E56FA]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== MENTORS & PARTNERS SECTION ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <Eyebrow>Our Network</Eyebrow>
            <h2 className="mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
              Mentors & Partners
            </h2>
          </Reveal>

          {/* Partner Organizations */}
          <Reveal className="mb-16" delay={0.1}>
            <h3 className="mb-6 text-center text-xl font-semibold text-[#183253]">
              Partnered Organizations
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {partnerOrganizations.map((org) => (
                <div
                  key={org.name}
                  className="rounded-[18px] border border-[#dbe5f6] bg-[#f6f9ff] p-6"
                >
                  <h4 className="mb-2 font-semibold text-[#183253]">
                    {org.name}
                  </h4>
                  <p className="text-sm text-[#52617b]">
                    {org.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Partnered Schools */}
          <Reveal delay={0.2}>
            <h3 className="mb-6 text-center text-xl font-semibold text-[#183253]">
              Partnered Schools & Universities
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {partneredSchools.map((school) => (
                <span
                  key={school}
                  className="rounded-[8px] border border-[#cfe8ff] bg-[#edf6ff] px-4 py-2 text-sm text-[#0E56FA]"
                >
                  {school}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== TEAM SECTION ========== */}
      <section className="bg-[#f6f9ff] py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
              Meet the Team
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-[18px] border border-[#dbe5f6] bg-white transition-shadow hover:shadow-lg"
              >
                {/* Photo */}
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-[#183253]">
                        {member.name}
                      </h3>
                      <p className="text-sm text-[#52617b]">
                        {member.role}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[12px] bg-[#edf6ff] p-2 text-[#52617b] transition-colors hover:bg-[#0E56FA]/10 hover:text-[#0E56FA]"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="rounded-[12px] bg-[#edf6ff] p-2 text-[#52617b] transition-colors hover:bg-[#0E56FA]/10 hover:text-[#0E56FA]"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View Full Team Link */}
          <Reveal delay={0.3} className="mt-10 text-center">
            <p className="mb-4 text-sm text-[#52617b]">
              Project X Vietnam is run by 30+ volunteers across departments including Partnership, Product, Growth, and Operations.
            </p>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#0E56FA] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0b49d8]"
            >
              Meet the Full Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow>Get in Touch</Eyebrow>
            <h2 className="mb-8 mt-4 text-3xl font-normal text-[#183253] md:text-4xl">
              Contact Us
            </h2>

            <div className="mb-10 flex flex-wrap justify-center gap-6">
              <a
                href="mailto:info.projectxvietnam@gmail.com"
                className="flex items-center gap-2 rounded-[18px] border border-[#dbe5f6] bg-[#f6f9ff] px-5 py-3 text-[#52617b] transition-shadow hover:shadow-lg"
              >
                <Mail className="h-5 w-5" />
                info.projectxvietnam@gmail.com
              </a>
              <a
                href="https://www.projectxvietnam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-[18px] border border-[#dbe5f6] bg-[#f6f9ff] px-5 py-3 text-[#52617b] transition-shadow hover:shadow-lg"
              >
                <Globe className="h-5 w-5" />
                projectxvietnam.org
              </a>
              <a
                href="https://fb.com/TechXVn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-[18px] border border-[#dbe5f6] bg-[#f6f9ff] px-5 py-3 text-[#52617b] transition-shadow hover:shadow-lg"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>

            <Link href="/">
              <Button
                size="lg"
                className="rounded-[10px] bg-[#0E56FA] px-8 py-6 text-base font-semibold text-white shadow-lg shadow-[#0E56FA]/25 transition-all hover:bg-[#0b49d8] hover:shadow-xl"
              >
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
