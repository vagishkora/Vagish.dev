import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vagish.dev — Admin Control Center",
  description: "Dynamic content manager for portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
