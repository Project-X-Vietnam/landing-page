import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Project X",
  description: "Summer Fellowship Program",
  images: [
    {
      url: 'https://yourwebsite.com/images/og-image.png',
      width: 1131,
      height: 500,
      alt: 'Project X Vietnam',
    },
  ],
  icons: { icon: "/favicon.svg" },
  url: 'https://projectxvietnam.com',
  type: 'website'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className="bg-white text-md text-primary"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
