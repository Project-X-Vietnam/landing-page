import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Round 2 Application | SFP 2026 | Project X Vietnam",
  description:
    "Round 2 application for Project X Vietnam's Summer Fellowship Program 2026. Complete your profile, skills assessment, and availability.",
  openGraph: {
    title: "Round 2 Application | SFP 2026 | Project X Vietnam",
    description:
      "Round 2 application for the Summer Fellowship Program 2026 — skills assessment, career track, and availability.",
    url: "https://projectxvietnam.org/sfp2026/apply/round-2",
  },
};

export default function ApplyRound2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
