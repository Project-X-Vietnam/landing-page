import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	metadataBase: new URL("https://projectxvietnam.com"),
	title: "Project X",
	description: "Summer Fellowship Program",
	openGraph: {
		title: "Project X Vietnam",
		description:
			"Join the Summer Fellowship Program 2025 with Project X Vietnam.",
		images: [
			{
				url: "/preview_icon.png",
				width: 1131,
				height: 500,
				alt: "Project X Vietnam",
			},
		],
		url: "https://projectxvietnam.com",
		type: "website",
	},
	icons: { icon: "/favicon.svg" },
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
			<body className="bg-white text-md text-primary">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
