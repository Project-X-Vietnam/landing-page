"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CursorTooltip from "@/components/CursorTooltip";

const defaultLinks = [
  { label: "About", href: "/about" },
  { label: "Summer Fellowship", href: "/sfp" },
  { label: "Mentors", href: "/mentors" },
  { label: "Partners", href: "/partners" },
  { label: "Our Team", href: "/team" },
];

export default function SiteNav({
  links,
}: {
  links?: { label: string; href: string }[];
}) {
  const pathname = usePathname();
  const navLinks = links ?? defaultLinks;
  const [mobileOpen, setMobileOpen] = useState(false);

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
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={
                  isActive
                    ? "text-sm font-semibold text-[#0E56FA] transition-colors duration-200"
                    : "text-sm font-medium text-[#1f2b46]/68 transition-colors duration-200 hover:text-[#0E56FA]"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <CursorTooltip text="Apply">
            <Button
              asChild
              size="sm"
              className="hidden h-9 rounded-[10px] border border-[#0E56FA] bg-transparent px-4 text-[#0E56FA] shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0E56FA] hover:text-white sm:inline-flex"
            >
              <Link href="/sfp2026/apply">
                Apply Now
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
              </Link>
            </Button>
          </CursorTooltip>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-[#183253] transition-colors hover:bg-[#edf6ff] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.7} /> : <Menu className="h-5 w-5" strokeWidth={1.7} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#dbe5f6]/70 md:hidden"
          >
            <div className="mx-auto flex max-w-[1510px] flex-col gap-1 px-4 py-3 sm:px-6">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      isActive
                        ? "rounded-[10px] bg-[#edf6ff] px-3 py-2.5 text-sm font-semibold text-[#0E56FA]"
                        : "rounded-[10px] px-3 py-2.5 text-sm font-medium text-[#1f2b46]/68 transition-colors hover:bg-[#edf6ff] hover:text-[#0E56FA]"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 border-t border-[#dbe5f6]/70 pt-3">
                <Button
                  asChild
                  size="sm"
                  className="h-9 w-full rounded-[10px] bg-[#0E56FA] px-4 text-white shadow-none transition-all duration-200 hover:bg-[#0b49d8]"
                >
                  <Link href="/sfp2026/apply" onClick={() => setMobileOpen(false)}>
                    Apply Now
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
