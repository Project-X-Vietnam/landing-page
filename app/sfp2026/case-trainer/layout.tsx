import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PJX Case Trainer | AI-Powered Interview Prep | Project X Vietnam",
  description:
    "Train smarter. Interview better. PJX Case Trainer is your AI-powered practice coach – structured thinking, Socratic coaching, and evidence-based feedback.",
  openGraph: {
    title: "PJX Case Trainer | AI-Powered Interview Prep",
    description:
      "Walk into any tech interview ready. AI-guided coaching through 5 structured steps — Define, Decompose, Hypothesize, Analyze, Recommend.",
    url: "https://projectxvietnam.org/sfp2026/case-trainer",
  },
};

export default function CaseTrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
