import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SFP 2026 | Summer Fellowship Program 2026 | Project X Vietnam",
  description:
    "Illuminate your tech career path. Join the Summer Fellowship Program 2026—mentorship, training, and internships with leading tech companies. Apply now.",
  openGraph: {
    title: "SFP 2026 | Summer Fellowship Program 2026 | Project X Vietnam",
    description:
      "Join the Summer Fellowship Program 2026. Mentorship, training, and internships with leading tech companies.",
    url: "https://projectxvietnam.org/sfp2026",
  },
};

export default function SFP2026Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
