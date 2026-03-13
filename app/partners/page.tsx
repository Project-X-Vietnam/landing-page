"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { toast } from "sonner";

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
// MAIN PARTNERS PAGE
// ============================================
export default function PartnersPage() {
  const { isDark, toggle } = useDarkMode();

  const partnerCompanies = [
    { name: "VNG", logo: "/images/partners/vng_logo.png", height: "h-10" },
    { name: "Grab", logo: "/images/partners/grab_logo.png", height: "h-10" },
    { name: "Shopee", logo: "/images/partners/shopee-logo.png", height: "h-12" },
    { name: "Tiki", logo: "/images/partners/tiki_logo.png", height: "h-12" },
    { name: "Chợ Tốt", logo: "/images/partners/chotot-logo.png", height: "h-10" },
    { name: "One Mount", logo: "/images/partners/one-mount-logo.png", height: "h-10" },
    { name: "Holistics", logo: "/images/partners/holistics-logo.svg", height: "h-10" },
    { name: "LG", logo: "/images/partners/lg-logo.png", height: "h-16" },
    { name: "Gitiho", logo: "/images/partners/gitiho-logo.png", height: "h-16" },
    { name: "Homebase", logo: "/images/partners/homebase-logo.png", height: "h-22" },
    { name: "GeekUp", logo: "/images/partners/geek-up-logo.png", height: "h-14" },
    { name: "Got It", logo: "/images/partners/got-it-logo.png", height: "h-16" },
    { name: "Appota", logo: "/images/partners/appota-logo.png", height: "h-10" },
    { name: "Asilla", logo: "/images/partners/asilla-logo.jpg", height: "h-14" },
    { name: "Edtronaut", logo: "/images/partners/edtronaut.png", height: "h-18" },
  ];

  const partnershipBenefits = [
    {
      title: "Access Pre-Trained Talent",
      description: "Connect with candidates mentored by senior tech leaders and trained in real projects",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "No Hidden Costs",
      description: "It costs nothing to partner with us and access our talent pool",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Reduced Hiring Friction",
      description: "Fellows come prepared with real project experience, multi-mentor guidance, and hard skills training",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Brand Visibility",
      description: "Showcase your company to thousands of top Vietnamese tech students",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      title: "Ecosystem Building",
      description: "Foster a strong ecosystem of universities, startups, and corporations",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Social Impact",
      description: "Contribute to Vietnam's tech workforce development and ESG goals",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
  ];

  const partnerCommitments = [
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
  ];

  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.companyName || !formData.contactName || !formData.email || !formData.partnershipType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        toast.success("Thank you! We'll be in touch soon.");
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const partnershipTypes = [
    {
      title: "Hiring Partner",
      description: "Recruit trained fellows for internships and full-time positions",
      features: ["Access to pre-screened candidates", "Direct interview pipeline", "No recruitment fees"],
      color: "from-primary to-cyan-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Academic Partner",
      description: "Collaborate on student outreach and program development",
      features: ["Joint events and workshops", "Student referral programs", "Co-branded initiatives"],
      color: "from-primary to-cyan-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      title: "Community Partner",
      description: "Join forces to strengthen the Vietnamese tech ecosystem",
      features: ["Network sharing", "Event collaboration", "Resource pooling"],
      color: "from-primary to-cyan-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(14,86,250,0.15)_0%,_transparent_50%)]" />
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
              Building Vietnam&apos;s Tech Ecosystem Together
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
                Partners
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
            We collaborate with leading companies, universities, and organizations — at no cost — to create 
            opportunities for Vietnam&apos;s next generation of tech talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToForm}
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
            <Link href="https://calendar.app.google/tooj5WaUeVvaLoKQA" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className={`rounded-full px-8 py-6 text-base font-semibold transition-all hover:scale-[1.02] ${
                  isDark
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Discovery Meeting
              </Button>
            </Link>
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
                { value: 35, suffix: "+", label: "Partner Companies" },
                { value: 85, suffix: "+", label: "Senior Mentors" },
                { value: 100, suffix: "%", label: "Placement Rate" },
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

      {/* ========== PARTNERSHIP TYPES SECTION ========== */}
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
              Ways to Partner
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Partnership Opportunities
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Choose the partnership type that best fits your organization&apos;s goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {partnershipTypes.map((type, i) => (
              <motion.div
                key={type.title}
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
                <div className={`h-1.5 bg-gradient-to-r ${type.color}`} />
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isDark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                    }`}>
                      {type.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-pxv-dark"}`}>
                        {type.title}
                      </h3>
                      <p className={`text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-6">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PARTNER COMPANIES SECTION ========== */}
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
              Hiring Partners
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Partner Companies (2022–2025)
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              These companies have partnered with us to recruit top Vietnamese tech talent.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-12 gap-y-10">
            {partnerCompanies.map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center justify-center transition-all hover:scale-110"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className={`${company.height} w-auto max-w-[140px] object-contain`}
                  style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
                />
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
            And many more...
          </motion.p>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
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
              Why Partner With Us
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Partnership Benefits
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipBenefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                  isDark
                    ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-primary/30"
                    : "bg-gradient-to-br from-white to-slate-50 border-slate-100 shadow-sm hover:shadow-md"
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

      {/* ========== PARTNER COMMITMENTS SECTION ========== */}
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
              What We Ask
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Partner Commitments
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              &ldquo;It does not cost anything to get our support to access the best tech talents.
              We only ask for your commitment.&rdquo;
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {partnerCommitments.map((item, i) => (
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
        </div>
      </section>

      {/* ========== PARTNER INQUIRY FORM ========== */}
      <section
        ref={formRef}
        id="partner-form"
        className={`py-24 transition-colors duration-500 ${
          isDark ? "bg-[#0a0f1a]" : "bg-slate-50"
        }`}
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
              Get Started
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-pxv-dark"
            }`}>
              Partner With Us
            </h2>
            <p className={`max-w-xl mx-auto ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Fill out the form below and our partnerships team will reach out within 2 business days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`rounded-2xl border p-8 md:p-10 ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border-slate-100 shadow-lg"
            }`}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-pxv-dark"}`}>
                  Thank You!
                </h3>
                <p className={`mb-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  We&apos;ve received your partnership inquiry. Our team will review it and get back to you within 2 business days.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      companyName: "",
                      contactName: "",
                      email: "",
                      phone: "",
                      partnershipType: "",
                      message: "",
                    });
                  }}
                  variant="outline"
                  className={`rounded-full px-6 ${
                    isDark
                      ? "border-white/20 text-white hover:bg-white/10"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Submit Another Inquiry
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="companyName"
                      className={isDark ? "text-white/80" : "text-slate-700"}
                    >
                      Company / Organization Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. VNG Corporation"
                      required
                      className={`rounded-lg ${
                        isDark
                          ? "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary"
                          : "bg-white border-slate-200 focus:border-primary"
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contactName"
                      className={isDark ? "text-white/80" : "text-slate-700"}
                    >
                      Contact Person <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                      className={`rounded-lg ${
                        isDark
                          ? "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary"
                          : "bg-white border-slate-200 focus:border-primary"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className={isDark ? "text-white/80" : "text-slate-700"}
                    >
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                      className={`rounded-lg ${
                        isDark
                          ? "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary"
                          : "bg-white border-slate-200 focus:border-primary"
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className={isDark ? "text-white/80" : "text-slate-700"}
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+84 xxx xxx xxx"
                      className={`rounded-lg ${
                        isDark
                          ? "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary"
                          : "bg-white border-slate-200 focus:border-primary"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="partnershipType"
                    className={isDark ? "text-white/80" : "text-slate-700"}
                  >
                    Partnership Type <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleChange}
                    required
                    className={`flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                      isDark
                        ? "bg-white/5 border-white/15 text-white [&>option]:bg-[#0a0f1a] [&>option]:text-white"
                        : "bg-white border-slate-200 text-slate-900"
                    } ${!formData.partnershipType ? (isDark ? "text-white/30" : "text-slate-400") : ""}`}
                  >
                    <option value="" disabled>Select a partnership type</option>
                    <option value="Hiring Partner">Hiring Partner</option>
                    <option value="Academic Partner">Academic Partner</option>
                    <option value="Community Partner">Community Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className={isDark ? "text-white/80" : "text-slate-700"}
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your organization and how you'd like to partner..."
                    className={`rounded-lg resize-none ${
                      isDark
                        ? "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary"
                        : "bg-white border-slate-200 focus:border-primary"
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Partnership Inquiry"
                  )}
                </Button>

                <div className={`flex items-center gap-3 justify-center ${isDark ? "text-white/40" : "text-slate-400"}`}>
                  <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
                  <span className="text-xs font-medium uppercase tracking-wider">or</span>
                  <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
                </div>

                <Link
                  href="https://calendar.app.google/tooj5WaUeVvaLoKQA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-3 w-full py-4 rounded-full border text-sm font-semibold transition-all hover:scale-[1.01] ${
                    isDark
                      ? "border-white/15 text-white/80 hover:bg-white/5 hover:border-white/25"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Discovery Meeting with our President, Liam Le
                </Link>

                <p className={`text-xs text-center ${isDark ? "text-white/40" : "text-slate-400"}`}>
                  By submitting this form, you agree to be contacted by our partnerships team.
                </p>
              </form>
            )}
          </motion.div>
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
              Ready to join
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Vietnam&apos;s tech movement?
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-xl mx-auto">
              Partner with Project X Vietnam at zero cost and access a pipeline of 
              pre-trained, job-ready candidates while shaping the next generation of tech talent.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg"
              >
                Become a Partner
              </Button>
              <Link href="https://calendar.app.google/tooj5WaUeVvaLoKQA" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all"
                >
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Discovery Meeting
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
