import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://projectxvietnam.com"),
  title: "Project X Vietnam | Nurturing Vietnam's Next-Gen Tech Talent",
  description:
    "A high-impact tech fellowship bridging academic learning and real-world careers. Join 100+ industry mentors and become part of Vietnam's largest student-to-professional tech pipeline.",
  keywords: [
    "Project X Vietnam",
    "tech fellowship",
    "Vietnam tech talent",
    "software engineering",
    "data science",
    "AI machine learning",
    "career development",
    "mentorship program",
    "tech internship Vietnam",
  ],
  authors: [{ name: "Project X Vietnam" }],
  openGraph: {
    title: "Project X Vietnam | Nurturing Vietnam's Next-Gen Tech Talent",
    description:
      "Join the Summer Fellowship Program 2025. A high-impact fellowship bridging academic learning and real-world tech careers with 100+ industry mentors.",
    images: [
      {
        url: "/preview_icon.png",
        width: 1131,
        height: 500,
        alt: "Project X Vietnam - Summer Fellowship Program 2025",
      },
    ],
    url: "https://projectxvietnam.com",
    type: "website",
    locale: "en_US",
    siteName: "Project X Vietnam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project X Vietnam | Nurturing Vietnam's Next-Gen Tech Talent",
    description:
      "Join the Summer Fellowship Program 2025 with 100+ industry mentors from 50+ companies.",
    images: ["/preview_icon.png"],
  },
  icons: { icon: "/favicon.svg" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-white text-foreground antialiased font-primary">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
