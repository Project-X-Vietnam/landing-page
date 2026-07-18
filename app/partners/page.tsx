"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import AnimatedCounter from "@/components/AnimatedCounter";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  Users,
  CircleDollarSign,
  Zap,
  Star,
  Globe,
  Heart,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Check,
  ArrowRight,
  Calendar,
  Loader2,
} from "lucide-react";

// ============================================
// MAIN PARTNERS PAGE
// ============================================
export default function PartnersPage() {
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
      icon: <Users className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "No Hidden Costs",
      description: "It costs nothing to partner with us and access our talent pool",
      icon: <CircleDollarSign className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Reduced Hiring Friction",
      description: "Fellows come prepared with real project experience, multi-mentor guidance, and hard skills training",
      icon: <Zap className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Brand Visibility",
      description: "Showcase your company to thousands of top Vietnamese tech students",
      icon: <Star className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Ecosystem Building",
      description: "Foster a strong ecosystem of universities, startups, and corporations",
      icon: <Globe className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Social Impact",
      description: "Contribute to Vietnam's tech workforce development and ESG goals",
      icon: <Heart className="w-6 h-6" strokeWidth={1.7} />,
    },
  ];

  const partnerCommitments = [
    {
      title: "Compensation Commitment",
      description: "Companies commit to fair compensation and formal internship contracts",
      icon: <CircleDollarSign className="w-5 h-5" strokeWidth={1.7} />,
    },
    {
      title: "Company Mentorship",
      description: "Companies provide professional development feedback at least twice during the internship",
      icon: <ShieldCheck className="w-5 h-5" strokeWidth={1.7} />,
    },
    {
      title: "Brand & Logo Promotion",
      description: "Partner companies allow Project X to showcase partnership branding",
      icon: <Star className="w-5 h-5" strokeWidth={1.7} />,
    },
    {
      title: "Other Support",
      description: "Project X is operated by 30+ volunteers worldwide; small donations or in-kind support are appreciated",
      icon: <Heart className="w-5 h-5" strokeWidth={1.7} />,
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
      icon: <Briefcase className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Academic Partner",
      description: "Collaborate on student outreach and program development",
      features: ["Joint events and workshops", "Student referral programs", "Co-branded initiatives"],
      icon: <GraduationCap className="w-6 h-6" strokeWidth={1.7} />,
    },
    {
      title: "Community Partner",
      description: "Join forces to strengthen the Vietnamese tech ecosystem",
      features: ["Network sharing", "Event collaboration", "Resource pooling"],
      icon: <Users className="w-6 h-6" strokeWidth={1.7} />,
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
            className="inline-flex items-center gap-2.5 rounded-[8px] border border-[#cfe8ff] bg-[#edf6ff] px-5 py-2.5 mb-8"
          >
            <span className="text-sm font-medium text-[#0E56FA]">
              Building Vietnam&apos;s Tech Ecosystem Together
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-[#183253]"
          >
            <span className="block">Our</span>
            <span className="block mt-2">
              <span className="text-[#0E56FA]">Partners</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 md:mt-8 text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-[#52617b]"
          >
            We collaborate with leading companies, universities, and organizations — at no cost — to create
            opportunities for Vietnam&apos;s next generation of tech talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToForm}
              className="rounded-[10px] bg-[#0E56FA] hover:bg-[#0b49d8] text-white px-8 py-6 text-base font-semibold shadow-lg shadow-[#0E56FA]/25 hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Become a Partner
              <ArrowRight className="ml-2 w-4 h-4" strokeWidth={1.7} />
            </Button>
            <Link href="https://calendar.app.google/tooj5WaUeVvaLoKQA" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="rounded-[10px] border-[#dbe5f6] text-[#183253] hover:bg-[#f6f9ff] hover:border-[#0E56FA]/30 px-8 py-6 text-base font-semibold transition-all hover:scale-[1.02]"
              >
                <Calendar className="mr-2 w-4 h-4" strokeWidth={1.7} />
                Book a Discovery Meeting
              </Button>
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16"
          >
            <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-6 rounded-[18px] border border-[#dbe5f6] bg-white px-6 py-5 shadow-lg">
              {[
                { value: 35, suffix: "+", label: "Partner Companies" },
                { value: 85, suffix: "+", label: "Senior Mentors" },
                { value: 100, suffix: "%", label: "Placement Rate" },
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

      {/* ========== PARTNERSHIP TYPES SECTION ========== */}
      <section className="bg-[#f6f9ff] py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <Eyebrow>Ways to Partner</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-normal text-[#183253] mb-4">
              Partnership Opportunities
            </h2>
            <p className="max-w-2xl mx-auto text-[#52617b]">
              Choose the partnership type that best fits your organization&apos;s goals.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {partnershipTypes.map((type, i) => (
              <Reveal key={type.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-[18px] border border-[#dbe5f6] bg-white"
                >
                  <div className="h-1.5 bg-[#0E56FA]" />
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-[12px] bg-[#edf6ff] flex items-center justify-center flex-shrink-0 text-[#0E56FA]">
                        {type.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-normal text-[#183253]">
                          {type.title}
                        </h3>
                        <p className="text-sm text-[#52617b]">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 mt-6">
                      {type.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-[#0E56FA] flex-shrink-0" strokeWidth={1.7} />
                          <span className="text-sm text-[#52617b]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PARTNER COMPANIES SECTION ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <Eyebrow>Hiring Partners</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-normal text-[#183253] mb-4">
              Partner Companies (2022–2025)
            </h2>
            <p className="max-w-2xl mx-auto text-[#52617b]">
              These companies have partnered with us to recruit top Vietnamese tech talent.
            </p>
          </Reveal>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-12 gap-y-10">
            {partnerCompanies.map((company, i) => (
              <Reveal key={company.name} delay={i * 0.05}>
                <div className="flex items-center justify-center transition-all duration-300 opacity-65 grayscale hover:opacity-100 hover:grayscale-0">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={140}
                    height={64}
                    className={`${company.height} w-auto max-w-[140px] object-contain`}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5} className="text-center mt-8">
            <p className="text-[#52617b]">And many more...</p>
          </Reveal>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section className="bg-[#f6f9ff] py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <Eyebrow>Why Partner With Us</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-normal text-[#183253] mb-4">
              Partnership Benefits
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipBenefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[18px] border border-[#dbe5f6] bg-white p-6 transition-shadow hover:shadow-md"
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

      {/* ========== PARTNER COMMITMENTS SECTION ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1510px] px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <Eyebrow>What We Ask</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-normal text-[#183253] mb-4">
              Partner Commitments
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-[#52617b]">
              &ldquo;It does not cost anything to get our support to access the best tech talents.
              We only ask for your commitment.&rdquo;
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {partnerCommitments.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[18px] border border-[#dbe5f6] bg-white p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-[#edf6ff] flex items-center justify-center flex-shrink-0 text-[#0E56FA]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-normal text-[#183253] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#52617b]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PARTNER INQUIRY FORM ========== */}
      <section
        ref={formRef}
        id="partner-form"
        className="bg-[#f6f9ff] py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <Eyebrow>Get Started</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-normal text-[#183253] mb-4">
              Partner With Us
            </h2>
            <p className="max-w-xl mx-auto text-[#52617b]">
              Fill out the form below and our partnerships team will reach out within 2 business days.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-[18px] border border-[#dbe5f6] bg-white shadow-lg p-8 md:p-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-500" strokeWidth={1.7} />
                  </div>
                  <h3 className="text-2xl font-normal text-[#183253] mb-3">
                    Thank You!
                  </h3>
                  <p className="mb-6 text-[#52617b]">
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
                    className="rounded-[10px] border-[#dbe5f6] text-[#183253] hover:bg-[#f6f9ff] px-6"
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
                        className="text-[#183253]"
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
                        className="rounded-[10px] border-[#dbe5f6] bg-white focus:border-[#0E56FA]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="contactName"
                        className="text-[#183253]"
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
                        className="rounded-[10px] border-[#dbe5f6] bg-white focus:border-[#0E56FA]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-[#183253]"
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
                        className="rounded-[10px] border-[#dbe5f6] bg-white focus:border-[#0E56FA]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-[#183253]"
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
                        className="rounded-[10px] border-[#dbe5f6] bg-white focus:border-[#0E56FA]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="partnershipType"
                      className="text-[#183253]"
                    >
                      Partnership Type <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="partnershipType"
                      name="partnershipType"
                      value={formData.partnershipType}
                      onChange={handleChange}
                      required
                      className={`flex h-10 w-full rounded-[10px] border border-[#dbe5f6] bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0E56FA]/20 focus:border-[#0E56FA] text-[#183253] ${!formData.partnershipType ? "text-[#52617b]/50" : ""}`}
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
                      className="text-[#183253]"
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
                      className="rounded-[10px] border-[#dbe5f6] bg-white focus:border-[#0E56FA] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-[10px] bg-[#0E56FA] hover:bg-[#0b49d8] text-white py-6 text-base font-semibold shadow-lg shadow-[#0E56FA]/25 hover:shadow-xl transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-4 w-4" strokeWidth={1.7} />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Partnership Inquiry"
                    )}
                  </Button>

                  <div className="flex items-center gap-3 justify-center text-[#52617b]">
                    <div className="flex-1 h-px bg-[#dbe5f6]" />
                    <span className="text-xs font-medium uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-[#dbe5f6]" />
                  </div>

                  <Link
                    href="https://calendar.app.google/tooj5WaUeVvaLoKQA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-[10px] border border-[#dbe5f6] text-sm font-semibold text-[#183253] transition-all hover:scale-[1.01] hover:bg-[#f6f9ff] hover:border-[#0E56FA]/30"
                  >
                    <Calendar className="w-4 h-4" strokeWidth={1.7} />
                    Book a Discovery Meeting with our President, Liam Le
                  </Link>

                  <p className="text-xs text-center text-[#52617b]">
                    By submitting this form, you agree to be contacted by our partnerships team.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
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
              Ready to join
              <span className="block mt-2 text-[#0E56FA]">
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
                className="rounded-[10px] bg-white text-[#0E56FA] hover:bg-white/90 px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg"
              >
                Become a Partner
              </Button>
              <Link href="https://calendar.app.google/tooj5WaUeVvaLoKQA" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-[10px] border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold hover:scale-[1.02] transition-all"
                >
                  <Calendar className="mr-2 w-4 h-4" strokeWidth={1.7} />
                  Book a Discovery Meeting
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
