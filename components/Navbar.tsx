"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
}

export default function Navbar({ isDark }: NavbarProps) {
  const pathname = usePathname();

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
          <a href="/" className="flex items-center group">
            <img
              src="/preview_icon.png"
              alt="Project X Vietnam"
              className="h-12 transition-transform group-hover:scale-105"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "About", href: "/about" },
              { label: "Summer Fellowship", href: "/sfp" },
              { label: "Mentors", href: "/mentors" },
              { label: "Partners", href: "/partners" },
              { label: "Our Team", href: "/team" },
            ].map((item) => {
              const isActive = pathname === item.href;
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

          <div className="flex items-center gap-3">
            <CursorTooltip text="Apply">
              <Link href="/recruitment2026">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-5"
                >
                  Apply Now
                </Button>
              </Link>
            </CursorTooltip>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
