"use client";

import Image from "next/image";

export default function SiteFooter() {
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
