"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Code2,
  GraduationCap,
  Handshake,
  Lightbulb,
  Network,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroLogoPaths = [
  "M45.7624 121L66.9729 99.8764C68.2583 98.5963 68.4904 96.6053 67.5358 95.0651L22.3583 22.2691L1.14781 43.3925C-0.137588 44.6726 -0.369697 46.6636 0.58492 48.2037L45.7624 121Z",
  "M121.498 45.5743L100.288 66.6976C99.0023 67.9778 97.0031 68.2089 95.4566 67.2582L22.3602 22.2664L43.5706 1.1431C44.856 -0.137012 46.8553 -0.368184 48.4018 0.58251L121.498 45.5743Z",
  "M197.238 121L176.027 99.8764C174.742 98.5963 174.51 96.6053 175.464 95.0651L220.642 22.2691L241.852 43.3925C243.138 44.6726 243.37 46.6636 242.415 48.2037L197.238 121Z",
  "M121.498 45.5743L142.711 66.6976C143.996 67.9778 145.996 68.2089 147.542 67.2582L220.639 22.2664L199.428 1.1431C198.143 -0.137012 196.143 -0.368184 194.597 0.58251L121.498 45.5743Z",
  "M45.7624 121L66.9729 142.123C68.2583 143.403 68.4904 145.394 67.5358 146.934L22.3583 219.73L1.14781 198.607C-0.137588 197.327 -0.369697 195.336 0.58492 193.796L45.7624 121Z",
  "M121.498 196.426L100.288 175.302C99.0023 174.022 97.0031 173.791 95.4566 174.742L22.3602 219.734L43.5706 240.857C44.856 242.137 46.8553 242.368 48.4018 241.417L121.498 196.426Z",
  "M197.238 121L176.027 142.123C174.742 143.403 174.51 145.394 175.464 146.934L220.642 219.73L241.852 198.607C243.138 197.327 243.37 195.336 242.415 193.796L197.238 121Z",
  "M121.498 196.426L142.711 175.302C143.996 174.022 145.996 173.791 147.542 174.742L220.639 219.734L199.428 240.857C198.143 242.137 196.143 242.368 194.597 241.417L121.498 196.426Z",
];

const HERO_LOGO_CYCLE_MS = 14000;

function HeroLogoAnimation() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCycle((c) => c + 1), HERO_LOGO_CYCLE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute right-[12%] top-1/2 hidden -translate-y-[55%] overflow-visible xl:right-[16%] lg:block">
      <svg
        key={cycle}
        width="320"
        height="318"
        viewBox="-4 -4 251 250"
        overflow="visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          ${heroLogoPaths.map((_, i) => {
            const isCyan = i === 2 || i === 3;
            const colorDraw = isCyan ? "heroStrokeDrawCyan" : "heroStrokeDrawBlue";
            const colorFill = isCyan ? "heroFillCyan" : "heroFillBlue";
            return `
            .hero-logo-path-${i} {
              fill: transparent;
              stroke: rgba(255, 255, 255, 0.6);
              stroke-width: 3.6;
              stroke-dasharray: 600;
              stroke-dashoffset: 600;
              stroke-linecap: round;
              stroke-linejoin: round;
              animation:
                heroStrokeDraw 2.8s ${0.2 * i}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards,
                heroFillWhite 1s ${3.2 + 0.15 * i}s ease forwards,
                ${colorDraw} 2.8s ${5.5 + 0.2 * i}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards,
                ${colorFill} 1s ${8.5 + 0.15 * i}s ease forwards,
                heroFadeTransparent 1.5s ${10.5 + 0.1 * i}s ease forwards;
            }`;
          }).join("")}
          @keyframes heroStrokeDraw {
            from { stroke-dashoffset: 600; stroke: rgba(255, 255, 255, 0.6); stroke-width: 3.6; }
            to { stroke-dashoffset: 0; stroke: rgba(255, 255, 255, 0.6); stroke-width: 3.6; }
          }
          @keyframes heroFillWhite {
            to { fill: rgba(255, 255, 255, 0.90); stroke: rgba(255, 255, 255, 0.90); }
          }
          @keyframes heroStrokeDrawBlue {
            from { stroke-dashoffset: 600; stroke: #0E56FA; stroke-width: 1.2; }
            to { stroke-dashoffset: 0; stroke: #0E56FA; stroke-width: 1.2; }
          }
          @keyframes heroFillBlue {
            to { fill: #0E56FA; stroke: #0E56FA; }
          }
          @keyframes heroStrokeDrawCyan {
            from { stroke-dashoffset: 600; stroke: #17CAFA; stroke-width: 1.2; }
            to { stroke-dashoffset: 0; stroke: #17CAFA; stroke-width: 1.2; }
          }
          @keyframes heroFillCyan {
            to { fill: #17CAFA; stroke: #17CAFA; }
          }
          @keyframes heroFadeTransparent {
            to { fill-opacity: 0; stroke-opacity: 0; }
          }
        `}</style>
        <defs>
          {heroLogoPaths.map((d, i) => (
            <clipPath key={`clip-${i}`} id={`hero-clip-${i}`}>
              <path d={d} />
            </clipPath>
          ))}
        </defs>
        {heroLogoPaths.map((d, i) => (
          <path key={i} d={d} clipPath={`url(#hero-clip-${i})`} className={`hero-logo-path hero-logo-path-${i}`} />
        ))}
      </svg>
    </div>
  );
}

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Summer Fellowship", href: "/sfp" },
  { label: "Mentors", href: "/mentors" },
  { label: "Partners", href: "/partners" },
  { label: "Our Team", href: "/team" },
];

const partnerLogos = [
  { name: "VNG", logo: "/images/partners/vng_logo.png" },
  { name: "Shopee", logo: "/images/partners/shopee-logo.png" },
  { name: "Grab", logo: "/images/partners/grab_logo.png" },
  { name: "Tiki", logo: "/images/partners/tiki_logo.png" },
  { name: "Chợ Tốt", logo: "/images/partners/chotot-logo.png" },
  { name: "One Mount", logo: "/images/partners/one-mount-logo.png" },
  { name: "Holistics", logo: "/images/partners/holistics-logo.svg" },
  { name: "Appota", logo: "/images/partners/appota-logo.png" },
  { name: "Geek Up", logo: "/images/partners/geek-up-logo.png" },
  { name: "Got It", logo: "/images/partners/got-it-logo.png" },
  { name: "Homebase", logo: "/images/partners/homebase-logo.png" },
];

const heroStats = [
  { value: 85, suffix: "+", label: "Mentors" },
  { value: 60, suffix: "+", label: "Companies" },
  { value: 6000, suffix: "+", label: "Applications" },
  { value: 130, suffix: "+", label: "Universities" },
];

const pillars = [
  {
    icon: <UsersRound />,
    title: "Mentorship",
    description: "Paired with professionals from leading tech companies",
  },
  {
    icon: <Lightbulb />,
    title: "Workshops",
    description: "Hands-on sessions on real-world skills",
  },
  {
    icon: <Network />,
    title: "Networking",
    description: "Connect with industry leaders & peers",
  },
  {
    icon: <Code2 />,
    title: "Projects",
    description: "Build portfolio-worthy real projects",
  },
];

const fellowshipSteps = [
  {
    id: "selection",
    title: "Selection",
    icon: <Check />,
    headline: "Rigorous, merit-based selection",
    description:
      "We receive thousands of applications each cohort from 130+ universities across 10+ countries. Our multi-round evaluation process identifies high-potential students regardless of background, assessing problem-solving ability, learning agility, and growth mindset.",
    stats: [
      { value: "2,000+", label: "Applications per cohort" },
      { value: "130+", label: "Universities represented" },
      { value: "10+", label: "Countries" },
    ],
    highlights: ["Multi-round evaluation", "Background agnostic", "Growth mindset focus"],
    image: "/images/3F730A75-358C-4699-AA78-C55A5B2B368A.png",
  },
  {
    id: "training",
    title: "Development",
    icon: <Lightbulb />,
    headline: "Professional & personal growth",
    description:
      "Beyond traditional workshops, fellows engage in building real projects and learning cutting-edge hard skill, e.g., AI and Automation, delivered by top industry experts from leading tech companies. Our program focuses on both professional excellence and personal development.",
    stats: [
      { value: "40+", label: "Hours of training" },
      { value: "10+", label: "Industry experts" },
      { value: "14", label: "Training topics" },
    ],
    highlights: ["Hard skills", "Real project building", "Expert-led sessions"],
    image: "/images/IMG_6482.jpg",
  },
  {
    id: "mentorship",
    title: "Mentorship",
    icon: <UsersRound />,
    headline: "Guidance from top industry experts",
    description:
      "Fellows are matched with senior mentors holding high-level positions at world-class tech companies including Google, Meta, Shopee, VNG, MoMo, and more. Some lucky fellows even get paired with 2-3 mentors for comprehensive guidance across multiple areas.",
    stats: [
      { value: "85+", label: "Senior mentors" },
      { value: "2-3", label: "Mentors per fellow" },
      { value: "4+", label: "Weeks of mentorship" },
    ],
    highlights: ["Senior-level mentors", "Multi-mentor matching", "Top tech companies"],
    image: "/images/IMG_6661.jpg",
  },
  {
    id: "internship",
    title: "Internship",
    icon: <BriefcaseBusiness />,
    headline: "Partner internship experience",
    description:
      "During the Summer Fellowship Program, fellows maintain and grow in the internships they secured from our partners during the pre-program recruitment phase. This parallel experience combines real work impact with structured fellowship support.",
    stats: [
      { value: "35+", label: "Partner companies" },
      { value: "100%", label: "Paid internships" },
      { value: "50%", label: "Return offer rate" },
    ],
    highlights: ["Pre-matched internships", "Parallel fellowship", "Career launchpad"],
    image: "/images/IMG_6745.jpg",
  },
];

const audienceCards = [
  {
    id: "students",
    label: "For Students",
    title: "Launch your tech career",
    description:
      "Transform from classroom learner to industry-ready professional with multi-mentor guidance and real experience.",
    benefits: [
      "2-3 senior mentors from top companies",
      "Hard skills & personal development training",
      "Parallel internship experience",
    ],
    cta: "Apply Now",
    href: "/sfp2026",
    icon: <GraduationCap />,
  },
  {
    id: "companies",
    label: "For Companies",
    badge: "35+ Partners",
    title: "Access pre-trained talent",
    description:
      "Reduce hiring friction with candidates mentored by senior tech leaders and trained in real projects.",
    benefits: [
      "130+ universities represented",
      "Structured evaluation framework",
      "No hidden costs or fees",
    ],
    cta: "Partner with Us",
    href: "/partners",
    icon: <Building2 />,
  },
  {
    id: "sponsors",
    label: "For Sponsors",
    badge: "Social Impact",
    title: "Drive ecosystem forward",
    description:
      "Support Vietnam's tech workforce development while building your brand among future tech leaders.",
    benefits: [
      "ESG-aligned initiatives",
      "Workforce development",
      "Brand visibility & reach",
    ],
    cta: "Become a Sponsor",
    href: "/partners",
    icon: <Handshake />,
  },
];

const disciplines = [
  "Software Engineering",
  "Data Science & Analytics",
  "AI & Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
  "Product Management",
  "UI/UX Design",
  "Product Growth",
  "Research & Hardware",
];

const testimonials = [
  {
    quote:
      "Project X gave me the confidence and skills to land my dream internship at Shopee. The mentorship from senior engineers was invaluable. They didn't just teach me technical skills, but also how to navigate a real tech career. The connections I made and the projects I worked on completely transformed my trajectory.",
    name: "Gia Hung",
    role: "Fellow '23",
    company: "Shopee",
    type: "Fellow",
    image: "/images/team/nguyenvugiahung.jpeg",
  },
  {
    quote:
      "The quality of candidates from Project X is exceptional. Unlike typical interns, they come prepared with real project experience, strong mentorship backgrounds, and a genuine motivation to contribute from day one. We've hired multiple fellows and they consistently outperform expectations.",
    name: "Minh Hung",
    role: "Partner '24",
    company: "SNDQ",
    type: "Partner",
    image: "/images/team/minhhung.jpg",
  },
  {
    quote:
      "This program filled the gap between what I learned in university and what companies actually need. Having multiple mentors from different backgrounds gave me perspectives I never would have gotten otherwise. The parallel internship experience at Infina made me truly job-ready.",
    name: "Ngoc Linh",
    role: "Fellow '24",
    company: "Infina",
    type: "Fellow",
    image: "/images/team/ngoclinh.jpg",
  },
];

function CursorTooltip({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative inline-block"
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 4 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="fixed pointer-events-none z-[70]"
            style={{
              left: position.x + 10,
              top: position.y + 10,
            }}
          >
            <div className="rounded-[9px] bg-[#07132c] px-3 py-1.5 text-xs font-medium text-white shadow-[0_16px_50px_rgba(7,19,44,0.18)]">
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnimatedCounter({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    hasAnimated.current = true;
    setDisplayValue(0);
    const steps = 50;
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
  }, [duration, isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-[#0E56FA]">{children}</p>;
}

function HomeNav() {
  return (
    <motion.nav
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#dbe5f6]/70 bg-[#fbfcff]/82 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-[1510px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Project X Vietnam home">
          <Image
            src="/preview_icon.png"
            alt="Project X Vietnam"
            width={136}
            height={60}
            priority
            className="h-12 w-auto object-contain transition-transform duration-200 hover:scale-[1.03]"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#1f2b46]/68 transition-colors duration-200 hover:text-[#0E56FA]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <CursorTooltip text="Apply">
          <Button
            asChild
            size="sm"
            className="h-9 rounded-[10px] border border-[#0E56FA] bg-transparent px-4 text-[#0E56FA] shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0E56FA] hover:text-white"
          >
            <Link href="/sfp2026/apply">
              Apply Now
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
            </Link>
          </Button>
        </CursorTooltip>
      </div>
    </motion.nav>
  );
}

function LogoRibbon() {
  return (
    <section className="mt-5 px-4 sm:px-6 md:mt-6 lg:px-8">
      <Reveal className="mx-auto max-w-[1510px]">
        <div className="grid items-center gap-5 rounded-[14px] border border-[#dbe5f6] bg-[#fbfcff] p-5 md:grid-cols-[220px_1fr]">
          <p className="max-w-[210px] text-sm leading-relaxed text-[#52617b]">
            Our previous partners & mentors from
          </p>
          <div className="marquee [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee__track">
              <div className="marquee__group items-center gap-12 pr-12">
                {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                  <Image
                    key={`${logo.name}-${index}`}
                    src={logo.logo}
                    alt={logo.name}
                    width={150}
                    height={52}
                    className="h-8 max-w-[132px] shrink-0 object-contain opacity-65 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ValueBento() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[1510px]">
        <div className="grid gap-3 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="flex flex-col rounded-[18px] border border-[#cfe8ff] bg-[linear-gradient(145deg,#d8f0ff_0%,#f4fbff_56%,#fbfcff_100%)] p-6 md:p-10 lg:col-span-5 lg:min-h-[430px]">
            <Eyebrow>Summer Fellowship Program</Eyebrow>
            <h2 className="mt-5 max-w-xl text-5xl font-normal leading-[0.98] text-[#183253] [text-wrap:balance] md:text-6xl lg:text-[5rem]">
              Your launchpad to <span className="text-[#0E56FA]">tech excellence</span>
            </h2>
            <p className="mt-7 max-w-[58ch] text-base leading-7 text-[#52617b]">
              Project X Vietnam provides a summer fellowship program where young people thriving in tech can access professional &amp; personal development resources while gaining internship opportunities from our tech partners annually.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:mt-auto lg:pt-10">
              {[
                { value: "35+", label: "Tech Partners" },
                { value: "6", label: "Weeks Intensive" },
                { value: "Annual", label: "Program" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[12px] bg-white/58 p-4 ring-1 ring-white/68">
                  <p className="text-2xl font-normal text-[#183253]">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-[#52617b]">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.06} className="grid gap-3 lg:col-span-7 lg:h-full lg:grid-cols-2 lg:grid-rows-2">
            {pillars.map((pillar) => (
              <motion.article
                key={pillar.title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[220px] flex-col rounded-[16px] border border-[#dbe5f6] bg-[#fbfcff] p-6 transition-colors duration-200 hover:border-[#b8cdf3] md:min-h-[260px] lg:min-h-0"
              >
                <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#edf6ff] text-[#0E56FA]">
                  <span className="[&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-[1.5]">{pillar.icon}</span>
                </div>
                <h3 className="text-2xl font-normal text-[#183253]">{pillar.title}</h3>
                <p className="mt-3 max-w-[32ch] text-sm leading-6 text-[#52617b]">
                  {pillar.description}
                </p>
              </motion.article>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-3 grid gap-3 rounded-[18px] border border-[#dbe5f6] bg-[#fbfcff] p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
          <div>
            <p className="text-2xl font-normal text-[#183253]">Ready to start your journey?</p>
            <p className="mt-2 text-sm leading-6 text-[#52617b]">
              Summer 2026 applications open
            </p>
          </div>
          <Button
            asChild
            className="h-11 rounded-[10px] bg-[#0E56FA] px-5 text-white shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b49d8]"
          >
            <Link href="/sfp2026">
              Apply Now
              <ArrowRight strokeWidth={1.7} />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-[1510px] gap-8 border-y border-[#dbe5f6] py-14 lg:grid-cols-[0.78fr_1fr] lg:items-start">
        <Reveal>
          <Eyebrow>Our Mission</Eyebrow>
          <p className="mt-5 max-w-[38ch] text-base leading-7 text-[#52617b]">
            Founded in 2022, Project X Vietnam is a non-profit organization bridging the gap between academic learning and real-world tech careers. We believe talent is everywhere; opportunity shouldn&apos;t be limited by where you start.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-4xl font-normal leading-[1.02] text-[#183253] [text-wrap:balance] md:text-5xl lg:text-[4.6rem]">
            We exist to <span className="text-[#0E56FA]">empower aspiring tech professionals</span> regardless of background with early-career exposure, rigorous training, and meaningful mentorship, building Vietnam&apos;s next generation of technology leaders across all disciplines.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

function FellowshipJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const activeStepData = fellowshipSteps[activeStep];

  return (
    <section id="fellowship" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[1510px]">
        <Reveal className="mb-10 grid gap-5 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Summer Fellowship Program</Eyebrow>
            <h2 className="mt-4 text-5xl font-normal leading-[0.98] text-[#183253] [text-wrap:balance] md:text-6xl lg:text-[5.4rem]">
              From discovery to <span className="text-[#0E56FA]">career-ready</span>
            </h2>
          </div>
          <p className="max-w-[65ch] text-base leading-7 text-[#52617b] lg:justify-self-end">
            Our flagship program transforms high-potential young people into job-ready professionals across all tech disciplines through a structured & personalized journey.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="overflow-hidden rounded-[18px] border border-[#dbe5f6] bg-[#fbfcff]">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col bg-[#edf6ff]">
              <div className="grid grid-cols-2 border-b border-[#dbe5f6] md:grid-cols-4">
                {fellowshipSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "relative flex min-h-14 items-center justify-center gap-2 border-r border-[#dbe5f6] px-3 text-sm font-medium transition-colors duration-200 last:border-r-0",
                      activeStep === index
                        ? "text-[#0E56FA]"
                        : "text-[#52617b] hover:bg-white/62 hover:text-[#183253]"
                    )}
                  >
                    {activeStep === index && (
                      <motion.div
                        layoutId="step-tab-indicator"
                        className="absolute inset-0 bg-white"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-xs text-current/62">0{index + 1}</span>
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>
              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.figure
                    key={activeStepData.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeStepData.image}
                      alt={activeStepData.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07132c]/54 to-transparent" />
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={activeStepData.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-between bg-white p-6 md:p-8 lg:p-10"
              >
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#edf6ff] text-[#0E56FA]">
                    <span className="[&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-[1.5]">
                      {activeStepData.icon}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#0E56FA]">{activeStepData.title}</p>
                  <h3 className="mt-2 text-2xl font-normal leading-[1.1] text-[#183253] md:text-3xl lg:text-[2.5rem]">
                    {activeStepData.headline}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[#52617b] lg:text-base lg:leading-7">
                    {activeStepData.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeStepData.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-[8px] border border-[#dbe5f6] bg-[#fbfcff] px-3 py-1.5 text-xs font-medium text-[#52617b]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-2 border-t border-[#dbe5f6] pt-5">
                  {activeStepData.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-normal text-[#183253]">{stat.value}</p>
                      <p className="mt-1 text-xs leading-4 text-[#52617b]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[1510px]">
        <Reveal className="mb-10 grid gap-5 lg:grid-cols-[0.92fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Who We Serve</Eyebrow>
            <h2 className="mt-4 text-5xl font-normal leading-[1] text-[#183253] [text-wrap:balance] md:text-6xl lg:text-[5rem]">
              Building bridges across the <span className="text-[#0E56FA]">ecosystem</span>
            </h2>
          </div>
          <p className="max-w-[62ch] text-base leading-7 text-[#52617b] lg:justify-self-end">
            We connect ambitious students with leading companies and visionary sponsors to create Vietnam&apos;s strongest tech talent pipeline.
          </p>
        </Reveal>

        <div className="grid gap-3 lg:grid-cols-[1.14fr_0.93fr_0.93fr]">
          {audienceCards.map((card, index) => (
            <Reveal key={card.id} delay={index * 0.05}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex min-h-[390px] flex-col rounded-[18px] border p-6 md:p-8",
                  index === 0
                    ? "border-[#b7dfff] bg-[linear-gradient(145deg,#e3f4ff_0%,#fbfcff_66%)]"
                    : "border-[#dbe5f6] bg-[#fbfcff]"
                )}
              >
                <div className="mb-10 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-white text-[#0E56FA] ring-1 ring-[#dbe5f6]">
                    <span className="[&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-[1.5]">{card.icon}</span>
                  </div>
                  {card.badge && (
                    <span className="rounded-[8px] border border-[#dbe5f6] bg-white px-2.5 py-1 text-xs font-medium text-[#52617b]">
                      {card.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-[#0E56FA]">{card.label}</p>
                <h3 className="mt-3 text-3xl font-normal leading-tight text-[#183253]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#52617b]">{card.description}</p>
                <ul className="mt-7 space-y-3">
                  {card.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-sm leading-6 text-[#52617b]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#0E56FA]" strokeWidth={1.7} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-auto h-auto w-fit rounded-[8px] px-0 pt-8 text-[#0E56FA] hover:bg-transparent hover:text-[#0b49d8]"
                >
                  <Link href={card.href}>
                    {card.cta}
                    <ArrowRight strokeWidth={1.7} />
                  </Link>
                </Button>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DisciplinesSection() {
  return (
    <section id="disciplines" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <Reveal className="mx-auto max-w-[1510px] border-y border-[#dbe5f6] py-12">
        <div className="grid gap-8 lg:grid-cols-[0.62fr_1fr] lg:items-start">
          <div>
            <Eyebrow>Disciplines</Eyebrow>
            <h2 className="mt-4 max-w-[12ch] text-5xl font-normal leading-[1] text-[#183253] md:text-6xl lg:text-[4rem]">
              Comprehensive tech skill areas
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5 lg:pt-11">
            {disciplines.map((skill, index) => (
              <motion.span
                key={skill}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32, delay: index * 0.025 }}
                className="rounded-[8px] border border-[#dbe5f6] bg-[#fbfcff] px-3.5 py-2 text-sm font-medium text-[#52617b] transition-colors duration-200 hover:border-[#0E56FA]/45 hover:text-[#0E56FA]"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="stories" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[1510px]">
        <Reveal className="mb-10 grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="mt-4 text-5xl font-normal leading-[1] text-[#183253] md:text-6xl lg:text-[5rem]">
              Hear from our community
            </h2>
          </div>
          <p className="max-w-[58ch] text-base leading-7 text-[#52617b] lg:justify-self-end">
            Stories from fellows, mentors, and partners who have been part of our journey.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-0 overflow-hidden rounded-[18px] border border-[#dbe5f6] bg-[#fbfcff] md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={cn(
                "flex min-h-[360px] flex-col p-6 md:p-8",
                index > 0 && "border-t border-[#dbe5f6] md:border-l md:border-t-0"
              )}
            >
              <div className="mb-7 flex items-center justify-between">
                <span className="text-5xl font-normal leading-none text-[#0E56FA]">“</span>
                <span className="rounded-[8px] bg-[#edf6ff] px-2.5 py-1 text-xs font-medium text-[#0E56FA]">
                  {testimonial.type}
                </span>
              </div>
              <blockquote className="text-sm leading-6 text-[#52617b]">
                {testimonial.quote}
              </blockquote>
              <div className="mt-auto flex items-center gap-3 pt-8">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-[12px] object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#183253]">{testimonial.name}</p>
                  <p className="truncate text-xs text-[#52617b]">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-4 pb-8 pt-12 sm:px-6 md:pb-10 md:pt-20 lg:px-8">
      <Reveal className="mx-auto grid max-w-[1510px] gap-8 rounded-[18px] border border-[#cfe8ff] bg-[linear-gradient(135deg,#e7f6ff_0%,#fbfcff_58%,#dceeff_100%)] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <p className="text-5xl font-normal leading-[1] text-[#183253] md:text-6xl lg:text-[4.8rem]">
            Ready to join the next generation?
          </p>
          <p className="mt-5 max-w-[58ch] text-base leading-7 text-[#52617b]">
            Transform your potential into impact. Join thousands of students who&apos;ve launched their tech careers through Project X Vietnam.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <CursorTooltip text="Join us">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-[10px] bg-[#0E56FA] px-6 text-white shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b49d8]"
            >
              <Link href="/sfp2026">
                Start Your Application
                <ArrowRight strokeWidth={1.7} />
              </Link>
            </Button>
          </CursorTooltip>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-[10px] border-[#b8cdf3] bg-white/70 px-6 text-[#183253] shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
          >
            <Link href="/sfp2026">
              Learn More
              <ArrowRight strokeWidth={1.7} />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1510px] flex-col gap-6 border-t border-[#dbe5f6] pt-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/favicon.svg"
            alt="Project X Vietnam mark"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="text-sm font-medium text-[#52617b]">© 2025 Project X Vietnam</span>
        </div>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-[#52617b] transition-colors duration-200 hover:text-[#0E56FA]"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -36]);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fbfcff] text-[#183253]">
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_22%_8%,rgba(14,86,250,0.065),transparent_28%),linear-gradient(180deg,#fbfcff_0%,#f6f9ff_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.28] [background-image:linear-gradient(rgba(14,86,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,86,250,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />

      <HomeNav />

      <section
        ref={heroRef}
        className="relative overflow-visible rounded-b-[16px] px-4 pb-8 pt-36 sm:px-6 md:rounded-b-[20px] md:pb-12 md:pt-44 lg:px-8"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            viewBox="0 0 1440 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="hero-blur-lg" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
              </filter>
              <filter id="hero-blur-md" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
              </filter>
              <filter id="hero-blur-sm" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="28" />
              </filter>
            </defs>
            <g filter="url(#hero-blur-lg)">
              <ellipse cx="1100" cy="120" rx="400" ry="320" fill="#0E56FA" fillOpacity="0.28" />
              <ellipse cx="1300" cy="500" rx="350" ry="280" fill="#0E56FA" fillOpacity="0.20" />
              <ellipse cx="800" cy="600" rx="300" ry="250" fill="#93c5fd" fillOpacity="0.35" />
              <ellipse cx="200" cy="700" rx="350" ry="200" fill="#0E56FA" fillOpacity="0.10" />
            </g>
            <g filter="url(#hero-blur-md)">
              <ellipse cx="1050" cy="300" rx="250" ry="200" fill="#bfdbfe" fillOpacity="0.55" />
              <ellipse cx="1350" cy="200" rx="200" ry="180" fill="#dbeafe" fillOpacity="0.50" />
              <ellipse cx="900" cy="150" rx="180" ry="150" fill="#cfe8ff" fillOpacity="0.38" />
            </g>
            <g filter="url(#hero-blur-sm)">
              <ellipse cx="1150" cy="250" rx="120" ry="100" fill="white" fillOpacity="0.45" />
              <ellipse cx="950" cy="400" rx="100" ry="80" fill="white" fillOpacity="0.3" />
            </g>
          </svg>
        </div>

        <div className="relative mx-auto max-w-[1510px]">
          <div className="relative">
            <HeroLogoAnimation />
            <motion.div style={{ y: headlineY }} className="max-w-2xl">
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 inline-flex rounded-[8px] border border-[#cfe8ff] bg-[#edf6ff] px-3 py-1.5 text-sm font-medium text-[#0E56FA]"
              >
                Summer Fellowship Program 2026 - Recruitment Now Open
              </motion.div>
              <motion.h1
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.74, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[560px] text-6xl font-normal leading-[1] text-[#183253] sm:text-7xl lg:text-[4.1rem] xl:text-[4.35rem]"
              >
                Move Forward The Next Generation of Tech Youth
              </motion.h1>
              <motion.p
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-[62ch] text-base leading-7 text-[#52617b]"
              >
                Vietnam&apos;s premier fellowship program connects ambitious young people with industry mentors and internship opportunities across all tech disciplines at 60+ leading partners.
              </motion.p>
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <CursorTooltip text="Let's go">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-[10px] bg-[#0E56FA] px-6 text-white shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b49d8]"
                  >
                    <Link href="/sfp2026">
                      Apply for SFP 2026
                      <ArrowRight strokeWidth={1.7} />
                    </Link>
                  </Button>
                </CursorTooltip>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-[10px] border-[#d0dced] bg-white/68 px-6 text-[#183253] shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
                >
                  <Link href="/partners">
                    Partner with Us
                    <ArrowRight strokeWidth={1.7} />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.64, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-white/30 bg-white/10 shadow-[0_8px_32px_rgba(14,86,250,0.06)] backdrop-blur-md md:grid-cols-4"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-white/25 px-6 py-5 backdrop-blur-sm transition-colors duration-200 hover:bg-white/40">
                <p className="text-3xl font-normal tracking-tight text-[#183253]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm text-[#52617b]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <LogoRibbon />
      <ValueBento />
      <MissionSection />
      <FellowshipJourney />
      <AudienceSection />
      <DisciplinesSection />
      <TestimonialsSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
