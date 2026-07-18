"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  BarChart3,
  TrendingUp,
  Users,
  Palette,
  Brain,
  MessageSquare,
  Map,
  FileText,
  Globe,
  Monitor,
  ArrowRight,
  Check,
} from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import AnimatedCounter from "@/components/AnimatedCounter";

// ============================================
// MAIN MENTORS PAGE
// ============================================
export default function MentorsPage() {
  const mentorRoles = [
    { role: "Software Engineering", icon: <Code2 className="w-5 h-5" strokeWidth={1.7} />, count: "40+" },
    { role: "Product Management", icon: <BarChart3 className="w-5 h-5" strokeWidth={1.7} />, count: "20+" },
    { role: "Data Science & Analytics", icon: <TrendingUp className="w-5 h-5" strokeWidth={1.7} />, count: "15+" },
    { role: "Engineering Management", icon: <Users className="w-5 h-5" strokeWidth={1.7} />, count: "10+" },
    { role: "UI/UX Design", icon: <Palette className="w-5 h-5" strokeWidth={1.7} />, count: "8+" },
    { role: "AI & Machine Learning", icon: <Brain className="w-5 h-5" strokeWidth={1.7} />, count: "7+" },
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
      icon: <MessageSquare className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Career Guidance",
      description: "Navigate your career path with advice from those who've been there",
      icon: <Map className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Resume & Interview Prep",
      description: "Get your resume reviewed and practice interviews with industry experts",
      icon: <FileText className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Industry Insights",
      description: "Learn what it's really like to work at top tech companies",
      icon: <Globe className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Network Building",
      description: "Connect with a community of mentors and like-minded peers",
      icon: <Users className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Project Feedback",
      description: "Get expert feedback on your projects and portfolio work",
      icon: <Monitor className="w-6 h-6" strokeWidth={1.7} />,
    },
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fbfcff] text-[#183253]">
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_22%_8%,rgba(14,86,250,0.065),transparent_28%),linear-gradient(180deg,#fbfcff_0%,#f6f9ff_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.28] [background-image:linear-gradient(rgba(14,86,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,86,250,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />

      {/* Navigation */}
      <SiteNav />

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-24">
        <div className="relative z-10 mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-[8px] border border-[#cfe8ff] bg-[#edf6ff] mb-8"
          >
            <span className="text-sm font-medium text-[#0E56FA]">
              85+ Senior Mentors · 2-3 Mentors per Fellow
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#183253] leading-[1.1] tracking-tight"
          >
            <span className="block">Learn from</span>
            <span className="block mt-2">
              <span className="text-[#0E56FA]">Industry Leaders</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 md:mt-8 text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-[#52617b]"
          >
            Our mentors are senior engineers, product managers, data scientists, and leaders
            from Google, Meta, Shopee, VNG, MoMo, and top tech companies worldwide. Fellows are matched with 2-3 mentors for comprehensive guidance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/sfp2026">
              <Button
                size="lg"
                className="rounded-[10px] bg-[#0E56FA] hover:bg-[#0b49d8] text-white px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Apply to Get Matched
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-[10px] border-[#dbe5f6] text-[#183253] hover:bg-[#f6f9ff] hover:border-[#0E56FA]/30 px-8 py-6 text-base font-semibold transition-all hover:scale-[1.02]"
            >
              Become a Mentor
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16"
          >
            <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-6 px-6 py-5 rounded-[18px] bg-white border border-[#dbe5f6] shadow-lg">
              {[
                { value: 85, suffix: "+", label: "Senior Mentors" },
                { value: 35, suffix: "+", label: "Partner Companies" },
                { value: 12, suffix: "+", label: "Countries" },
                { value: 2, suffix: "-3", label: "Mentors per Fellow" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-4">
                  {i > 0 && (
                    <div className="hidden sm:block w-px h-8 bg-[#dbe5f6]" />
                  )}
                  <div className="text-center px-2">
                    <div className="text-2xl md:text-3xl font-normal text-[#183253]">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-[#52617b]">
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
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <Eyebrow>Expertise Areas</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-normal text-[#183253] mt-4 mb-4">
              Mentors Across Every Domain
            </h2>
            <p className="max-w-2xl mx-auto text-[#52617b]">
              Our mentors cover the full spectrum of tech roles, from engineering to product to design.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorRoles.map((item, i) => (
              <Reveal key={item.role} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 rounded-[18px] bg-white border border-[#dbe5f6] transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-[12px] bg-[#edf6ff] flex items-center justify-center text-[#0E56FA]">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-normal text-[#0E56FA]">
                      {item.count}
                    </span>
                  </div>
                  <h3 className="text-lg font-normal text-[#183253]">
                    {item.role}
                  </h3>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED MENTORS SECTION ========== */}
      <section className="py-16 md:py-24 bg-[#f6f9ff]">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <Eyebrow>Mentor Profiles</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-normal text-[#183253] mt-4 mb-4">
              Meet Some of Our Mentors
            </h2>
            <p className="max-w-2xl mx-auto text-[#52617b]">
              Professionals working at global technology companies and startups across engineering, product, data, and management roles.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMentors.map((mentor, i) => (
              <Reveal key={mentor.name + mentor.company} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-[18px] bg-white border border-[#dbe5f6] transition-shadow hover:shadow-md"
                >
                  {/* Gradient header */}
                  <div className={`h-24 bg-gradient-to-r ${mentor.color}`} />

                  {/* Avatar */}
                  <div className="absolute top-12 left-6">
                    <div className="w-24 h-24 rounded-[14px] overflow-hidden border-4 border-white">
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
                    <h3 className="text-lg font-normal text-[#183253]">
                      {mentor.name}
                    </h3>
                    <p className="text-sm mb-4 text-[#52617b]">
                      {mentor.role} @ {mentor.company}
                    </p>
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#0E56FA] transition-colors hover:text-[#0b49d8]"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn Profile
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4} className="text-center mt-8">
            <p className="text-[#52617b]">
              And many more mentors participate each year...
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== MENTORSHIP BENEFITS SECTION ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <Eyebrow>What You Get</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-normal text-[#183253] mt-4 mb-4">
              Mentorship Benefits
            </h2>
            <p className="max-w-2xl mx-auto text-[#52617b]">
              Personalized guidance tailored to your career goals and aspirations.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorshipBenefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 rounded-[18px] bg-white border border-[#dbe5f6] transition-shadow hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-[12px] bg-[#edf6ff] flex items-center justify-center text-[#0E56FA] mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-normal text-[#183253] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#52617b]">
                    {benefit.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SPEAKERS SECTION ========== */}
      <section className="py-16 md:py-24 bg-[#f6f9ff]">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <Eyebrow>Speaker Series</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-normal text-[#183253] mt-4 mb-4">
              Learn from Industry Experts
            </h2>
            <p className="max-w-2xl mx-auto text-[#52617b]">
              Our speakers include engineers, founders, and leaders from global tech companies sharing insights on:
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {speakerTopics.map((topic, i) => (
                <motion.span
                  key={topic}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 py-3 rounded-[8px] bg-[#edf6ff] border border-[#cfe8ff] text-[#0E56FA] text-sm font-medium transition-all hover:scale-105"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4} className="text-center mt-8">
            <p className="text-[#52617b]">
              And many more speakers across cohorts...
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== BECOME A MENTOR SECTION ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <Eyebrow>Give Back</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-normal text-[#183253] mt-4 mb-6">
                Become a Mentor
              </h2>
              <p className="mb-6 text-[#52617b]">
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
                    <Check className="w-5 h-5 text-[#0E56FA] flex-shrink-0 mt-0.5" strokeWidth={1.7} />
                    <span className="text-sm text-[#52617b]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="rounded-[10px] bg-[#0E56FA] hover:bg-[#0b49d8] text-white px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Apply to Mentor
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-8 rounded-[18px] bg-white border border-[#dbe5f6]">
                <h3 className="text-xl font-normal text-[#183253] mb-6">
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
                      <span className="text-sm text-[#52617b]">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-[#183253]">
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section
        className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
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

        <div className="relative z-10 mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight">
              Ready to accelerate
              <span className="block mt-2 text-cyan-400">
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
                  className="bg-white text-[#0E56FA] hover:bg-white/90 rounded-[10px] px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg"
                >
                  Apply Now
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-[10px] px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all"
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
