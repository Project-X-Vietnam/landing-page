"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trackClickApplyCta } from "@/lib/analytics/sfp2026";

// ============================================
// CURSOR TOOLTIP - Shows text near cursor on hover
// ============================================
function CursorTooltip({ 
  children, 
  text 
}: { 
  children: React.ReactNode; 
  text: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
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
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ duration: 0.12 }}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: position.x + 8,
              top: position.y + 8,
            }}
          >
            <div className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-full whitespace-nowrap shadow-lg">
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// NAVBAR COMPONENT
// ============================================
interface NavbarProps {
  isDark: boolean;
  links?: { label: string; href: string }[];
  showCta?: boolean;
  logoHref?: string;
  enableScrollPill?: boolean;
  logoSrc?: string;
}

export default function Navbar({
  isDark,
  links,
  showCta = true,
  logoHref = "/",
  enableScrollPill = false,
  logoSrc = "/preview_icon.png",
}: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const navLinks =
    links ??
    [
      { label: "About", href: "/about" },
      { label: "Summer Fellowship", href: "/sfp" },
      { label: "Mentors", href: "/mentors" },
      { label: "Partners", href: "/partners" },
      { label: "Our Team", href: "/team" },
    ];

  const anchorLinks = useMemo(
    () => navLinks.filter((item) => item.href.startsWith("#")),
    [navLinks]
  );

  useEffect(() => {
    if (!enableScrollPill) return;
    const onScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [enableScrollPill]);

  useEffect(() => {
    if (!enableScrollPill || anchorLinks.length === 0) return;
    const onScroll = () => {
      let current: string | null = anchorLinks[0]?.href ?? null;
      anchorLinks.forEach((item) => {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = item.href;
      });
      setActiveHash(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [enableScrollPill, anchorLinks]);

  if (!enableScrollPill) {
    return (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
          isDark
            ? "bg-[#020818]/80 border-white/10"
            : "bg-white/70 border-slate-100/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-2">
          <div className="flex items-center justify-between">
            <Link href={logoHref} className="flex items-center group">
              <img
                src={logoSrc}
                alt="Project X Vietnam"
                className="h-12 transition-transform group-hover:scale-105"
              />
            </Link>

            <div className="hidden md:flex items-center gap-6 overflow-x-auto max-w-[60vw]">
              <div className="flex items-center gap-6 whitespace-nowrap">
                {navLinks.map((item) => {
                  const isActive = item.href.startsWith("#") ? false : pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`text-sm transition-colors ${
                        isActive
                          ? "font-bold text-primary"
                          : isDark
                            ? "font-medium text-white/60 hover:text-primary"
                            : "font-medium text-slate-600 hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {showCta && (
              <div className="hidden sm:flex items-center gap-3">
                <CursorTooltip text="Apply">
                  <Link href="/sfp2026/apply" onClick={() => trackClickApplyCta("navbar")}>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white rounded-full px-5"
                    >
                      Apply Now
                    </Button>
                  </Link>
                </CursorTooltip>
              </div>
            )}
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex justify-center px-4 md:px-8 pt-4">
        <motion.div
          animate={{
            width: isScrolled ? "90%" : "100%",
            maxWidth: isScrolled ? "1100px" : "100%",
            borderRadius: isScrolled ? "9999px" : "0px",
            backgroundColor: isScrolled
              ? "rgba(10,15,30,0.8)"
              : "rgba(0,0,0,0)",
            borderColor: isScrolled
              ? "rgba(255,255,255,0.2)"
              : "rgba(255,255,255,0)",
            backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
            boxShadow: isScrolled
              ? "0 10px 30px rgba(0,0,0,0.35)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="border px-4 md:px-6 py-3"
        >
          <div className="flex items-center justify-between gap-6">
            <Link href={logoHref} className="flex items-center group">
              <img
                src={logoSrc}
                alt="Project X Vietnam"
                className="h-5 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            <div className="hidden md:flex items-center gap-6 overflow-x-auto max-w-[60vw]">
              <div className="flex items-center gap-6 whitespace-nowrap">
                {navLinks.map((item) => {
                  const isActive = item.href.startsWith("#")
                    ? activeHash === item.href
                    : pathname === item.href;
                  const baseClass = isScrolled
                    ? isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                    : "text-white/90 hover:text-white";
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`text-sm transition-colors ${baseClass}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {showCta && (
              <div className="flex items-center gap-3">
                <CursorTooltip text="Apply">
                  <Link href="/sfp2026/apply" onClick={() => trackClickApplyCta("navbar")}>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white rounded-full px-5"
                    >
                      Apply Now
                    </Button>
                  </Link>
                </CursorTooltip>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
