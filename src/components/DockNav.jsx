"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Dock from "./Dock";
import {
  Briefcase,
  GraduationCap,
  Cpu,
  Award,
  Gamepad2,
  Mail,
  Home,
  Menu,
  X,
} from "lucide-react";

export default function DockNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDockVisible, setIsDockVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY <= 50) {
        setIsDockVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        // Scrolling DOWN -> hide dock
        setIsDockVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling UP -> show dock
        setIsDockVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (pathname !== "/" && pathname !== "") {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "#Work", href: "/#work" },
    { label: "#Education", href: "/education" },
    { label: "#Skills", href: "/#skills" },
    { label: "#Certifications", href: "/#certifications" },
    { label: "#Hobbies", href: "/#hobbies" },
    { label: "#Contact", href: "/#contact" },
  ];

  const dockItems = [
    {
      icon: <Home strokeWidth={1.5} />,
      label: "Home",
      onClick: () => {
        if (pathname !== "/" && pathname !== "") {
          router.push("/");
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
    },
    {
      icon: <Briefcase strokeWidth={1.5} />,
      label: "Work",
      onClick: () => scrollToSection("work"),
    },
    {
      icon: <GraduationCap strokeWidth={1.5} />,
      label: "Education",
      onClick: () => router.push("/education"),
    },
    { divider: true },
    {
      icon: <Cpu strokeWidth={1.5} />,
      label: "Skills",
      onClick: () => scrollToSection("skills"),
    },
    {
      icon: <Award strokeWidth={1.5} />,
      label: "Certifications",
      onClick: () => scrollToSection("certifications"),
    },
    { divider: true },
    {
      icon: <Gamepad2 strokeWidth={1.5} />,
      label: "Hobbies",
      onClick: () => scrollToSection("hobbies"),
    },
    {
      icon: <Mail strokeWidth={1.5} />,
      label: "Contact",
      onClick: () => scrollToSection("contact"),
    },
  ];

  return (
    <>
      {/* Logo — top left, always visible */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-80 transition-all duration-300 ${
            isScrolled ? "md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto" : "opacity-100"
          }`}
        >
          Vagish N Kora
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none p-2"
          suppressHydrationWarning
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Dock — fixed bottom center */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300 transform ${
          isDockVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-28 opacity-0 pointer-events-none"
        }`}
      >
        <Dock
          items={dockItems}
          magnification={64}
          distance={140}
          panelHeight={56}
          baseItemSize={44}
          spring={{ mass: 0.1, stiffness: 170, damping: 14 }}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-gray-300 hover:text-indigo-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Dock — fixed bottom, smaller */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden transition-all duration-300 transform ${
          isDockVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <Dock
          items={dockItems}
          magnification={52}
          distance={100}
          panelHeight={48}
          baseItemSize={36}
          spring={{ mass: 0.1, stiffness: 170, damping: 14 }}
        />
      </div>
    </>
  );
}
