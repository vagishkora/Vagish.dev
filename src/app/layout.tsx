import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NetworkStatus from "@/components/NetworkStatus";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vagish N Kora | Security Engineer & AI Solutions Architect",
  description: "Portfolio of Vagish N Kora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-gray-100 font-sans transition-colors duration-300`}
      >
        <NetworkStatus />
        <div className="bg-scanline"></div>
        {children}
      </body>
    </html>
  );
}
