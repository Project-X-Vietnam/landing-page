import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project X",
  description: "Summer Fellowship Program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-white text-md text-primary"
      >
        {children}
      </body>
    </html>
  );
}
