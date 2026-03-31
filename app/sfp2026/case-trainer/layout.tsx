"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "/sfp2026/case-trainer/about" },
  { label: "Setup", href: "/sfp2026/case-trainer/setup" },
  { label: "Sample Prompts", href: "/sfp2026/case-trainer/sample-prompts" },
  { label: "FAQs", href: "/sfp2026/case-trainer/faqs" },
];

export default function CaseTrainerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-pxv-dark text-[#FAFAFA] font-sans">
      {/* Shared Nav */}
      <nav className="fixed top-0 inset-x-0 h-20 z-50 bg-pxv-dark/80 backdrop-blur-md border-b border-white/10 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link href="/sfp2026/case-trainer">
            <img src="/preview_icon.png" alt="PJX Case Trainer" className="h-10 w-auto" />
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium transition-colors",
                  pathname === link.href
                    ? "text-white border-b-2 border-primary pb-0.5"
                    : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Button
            className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 shadow-[0_0_15px_rgba(14,86,250,0.4)] transition-all hover:scale-105"
            asChild
          >
            <Link href="/sfp2026/case-trainer/setup">Setup Now</Link>
          </Button>
        </div>
      </nav>

      {/* Page content — offset for fixed nav */}
      <div className="pt-20">{children}</div>
    </div>
  );
}
