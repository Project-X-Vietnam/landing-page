"use client";

import { type ReactNode } from "react";

export default function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-[#0E56FA]">{children}</p>;
}
