import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | SFP 2026 | Project X Vietnam",
  description:
    "Apply to Project X Vietnam's Summer Fellowship Program 2026. Mentorship, training, and internships with leading tech companies.",
  openGraph: {
    title: "Apply | SFP 2026 | Project X Vietnam",
    description:
      "Apply to the Summer Fellowship Program 2026 — mentorship, training, and internships.",
    url: "https://projectxvietnam.org/sfp2026/apply",
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
