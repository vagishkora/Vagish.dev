"use client";

import React, { useState } from "react";
import DecryptedText from "./DecryptedText";
import Image from "next/image";
import { Users, Mic, ShieldAlert, Sparkles, ExternalLink, Calendar, MapPin } from "lucide-react";

interface InitiativeItem {
  id: string;
  badge: string;
  title: string;
  role: string;
  org: string;
  location: string;
  date: string;
  img: string;
  desc: string;
  skills: string[];
  accentColor: "cyan" | "indigo" | "emerald";
  featured?: boolean;
}

const initiatives: InitiativeItem[] = [
  {
    id: "ACM-LEAD-01",
    badge: "CORE LEADERSHIP",
    title: "Technical Co-Head",
    role: "Tech Co-Head",
    org: "ACM Student Chapter",
    location: "NMAMIT, Nitte",
    date: "2025 - PRESENT",
    img: "/Vagish.dev/assets/acm_team.jpg",
    desc: "Spearheading the technical vision and execution for the official ACM student chapter. Architecting flagship hackathons, conducting hands-on cybersecurity & development bootcamps, and mentoring student engineers.",
    skills: ["Technical Leadership", "Hackathons & CTFs", "Workshop Architecture", "Peer Mentorship"],
    accentColor: "cyan",
    featured: true,
  },
  {
    id: "SPK-EDU-02",
    badge: "SPEAKER & OUTREACH",
    title: "Cyber Awareness Speaker",
    role: "Keynote Speaker",
    org: "Belman PU College",
    location: "Karkala, Karnataka",
    date: "30th Oct 2025",
    img: "/Vagish.dev/assets/speaking.webp",
    desc: "Delivered interactive cybersecurity awareness keynotes to 150+ students, breaking down social engineering tactics, scam defense, and foundational cyber hygiene practices.",
    skills: ["Public Speaking", "Scam Detection", "Social Engineering", "Digital Hygiene"],
    accentColor: "emerald",
  },
  {
    id: "IIS-WRK-03",
    badge: "WORKSHOP DELEGATE",
    title: "Ethical Hacking Intensive",
    role: "Delegate • Pravega",
    org: "Ethical Edufabrica @ IISc",
    location: "IISc Bangalore",
    date: "15th & 16th Nov 2025",
    img: "/Vagish.dev/assets/IISc_Banglore.webp",
    desc: "Completed an advanced two-day hands-on security workshop exploring defensive counter-measures, sandboxed penetration testing, and vulnerability assessment.",
    skills: ["Kali Linux & Metasploit", "Threat Modeling", "VM Hardening", "Web App Security"],
    accentColor: "indigo",
  },
];

export default function Outreach() {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const colorStyles = {
    cyan: {
      border: "border-cyan-500/30 hover:border-cyan-400/80",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      tag: "bg-cyan-500/5 text-cyan-300 border-cyan-500/20",
      icon: "text-cyan-400",
    },
    emerald: {
      border: "border-emerald-500/30 hover:border-emerald-400/80",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      tag: "bg-emerald-500/5 text-emerald-300 border-emerald-500/20",
      icon: "text-emerald-400",
    },
    indigo: {
      border: "border-indigo-500/30 hover:border-indigo-400/80",
      glow: "shadow-[0_0_30px_rgba(99,102,241,0.15)]",
      badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tag: "bg-indigo-500/5 text-indigo-300 border-indigo-500/20",
      icon: "text-indigo-400",
    },
  };

  return (
    <section id="volunteering" className="py-28 relative overflow-hidden bg-black/50 border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-indigo-500/5 via-cyan-500/5 to-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles size={12} className="text-cyan-400 animate-pulse" />
            FIELD INITIATIVES & IMPACT
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            <DecryptedText text="Leadership & Community" animateOn="view" />
          </h2>

          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-mono">
            Directing student technical organizations, community cyber-awareness outreach, and hands-on workshops.
          </p>
        </div>

        {/* Dossier Grid Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {initiatives.map((item) => {
            const styles = colorStyles[item.accentColor];

            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl bg-zinc-950/80 border ${styles.border} ${styles.glow} p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 backdrop-blur-xl overflow-hidden`}
              >
                {/* Tech Corner HUD Marks */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-lg" />

                {/* Card Top / Header */}
                <div>
                  {/* Top Badge & ID */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-full border ${styles.badge}`}>
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs text-gray-500">
                      {item.id}
                    </span>
                  </div>

                  {/* Image Cover */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 border border-white/10 group-hover:border-white/20 transition-all">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Floating Date Badge on Image */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[11px]">
                      <Calendar size={12} className={styles.icon} />
                      {item.date}
                    </div>
                  </div>

                  {/* Title & Role */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 font-mono text-xs">
                      <span className="text-white font-semibold">{item.org}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <MapPin size={11} />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300/90 text-xs leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                {/* Skills / Focus Pills */}
                <div className="pt-4 border-t border-white/10 mt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2 py-0.5 text-[11px] font-mono rounded border ${styles.tag}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
