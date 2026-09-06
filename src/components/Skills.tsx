"use client";

import { useEffect, useState } from "react";
import DecryptedText from "./DecryptedText";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

export interface SkillItem {
  id: string;
  name: string;
  icon: string;
  category?: string;
  order_index?: number;
}

const INITIAL_SKILLS: SkillItem[] = [
  { id: "SYS_01", name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { id: "SYS_02", name: "C Programming", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { id: "SYS_03", name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { id: "SYS_04", name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { id: "SYS_05", name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { id: "SYS_06", name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { id: "SYS_07", name: "HTML5 / CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { id: "SYS_08", name: "MySQL", icon: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg" },
  { id: "SYS_09", name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { id: "SYS_10", name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { id: "SYS_11", name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { id: "SYS_12", name: "Wireshark", icon: "https://www.vectorlogo.zone/logos/wireshark/wireshark-icon.svg" },
  { id: "SYS_13", name: "SQL Injection", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqldeveloper/sqldeveloper-original.svg" },
  { id: "SYS_14", name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { id: "SYS_15", name: "Supabase", icon: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" }
];

export default function Skills() {
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);

  // Fetch dynamic skills from Supabase
  useEffect(() => {
    async function fetchSkills() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("order_index", { ascending: true });

        if (data && data.length > 0 && !error) {
          const filtered = data.filter(
            (s: any) => s.id !== "SETTINGS_RESUME" && s.category !== "CONFIG"
          );
          if (filtered.length > 0) {
            setSkills(filtered);
          }
        }
      } catch (err) {
        console.warn("Supabase fetch fallback to static skills:", err);
      }
    }
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Centered Section Header */}
      <div className="text-center mb-12 sm:mb-16 space-y-2.5 sm:space-y-3 px-2">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest backdrop-blur-md">
          <Sparkles size={12} className="text-cyan-400 animate-pulse" />
          <span>[ CORE_CAPABILITIES // ARSENAL ]</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400">
            <DecryptedText text="Technical" animateOn="view" />
          </span>{" "}
          <span className="text-white">
            <DecryptedText text="Arsenal" animateOn="view" />
          </span>
        </h2>

        <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto font-mono">
          Languages, frameworks, database architectures, and security analysis tools.
        </p>
      </div>

      {/* ── MOBILE: Auto-scrolling marquee (no user interaction needed) ── */}
      <div className="block md:hidden overflow-hidden relative">
        {/* Left + right fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className="flex gap-4 mb-4" style={{ animation: "marquee-left 28s linear infinite", width: "max-content" }}>
          {[...skills, ...skills].map((skill, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 border border-cyan-500/15 bg-[#0a0a0f] rounded-lg p-3 w-20"
            >
              <Image src={skill.icon} alt={skill.name} width={32} height={32} className="object-contain" unoptimized />
              <span className="text-[9px] text-gray-400 font-mono text-center leading-tight">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex gap-4" style={{ animation: "marquee-right 24s linear infinite", width: "max-content" }}>
          {[...skills.slice().reverse(), ...skills.slice().reverse()].map((skill, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 border border-indigo-500/15 bg-[#0a0a0f] rounded-lg p-3 w-20"
            >
              <Image src={skill.icon} alt={skill.name} width={32} height={32} className="object-contain" unoptimized />
              <span className="text-[9px] text-gray-400 font-mono text-center leading-tight">{skill.name}</span>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-gray-500 font-mono">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
          ALL {skills.length} MODULES OPERATIONAL
        </div>
      </div>

      {/* ── DESKTOP: Terminal grid ── */}
      <div suppressHydrationWarning className="hidden md:block cyber-terminal w-full max-w-4xl mx-auto bg-black/90 border border-cyan-500/20 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)] font-mono relative">
        {/* Terminal Scanline Background */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10" />
        
        {/* Terminal Header */}
        <div className="bg-[#141419] px-4 py-3 flex items-center border-b border-cyan-500/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-cyan-400 ml-5 text-xs tracking-[2px] uppercase drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
            root@interceptor:~# ./view_skills.sh
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="group relative border border-cyan-500/10 hover:border-cyan-500/50 bg-[#0a0a0f] p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)]"
              >
                {/* Tech Corner Accents */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500/30 group-hover:border-cyan-400" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyan-500/30 group-hover:border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyan-500/30 group-hover:border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500/30 group-hover:border-cyan-400" />

                {/* ID Tag */}
                <span className="text-[10px] text-gray-500 font-mono self-start group-hover:text-cyan-400 transition-colors">
                  {skill.id}
                </span>

                {/* Icon */}
                <div className="relative w-10 h-10 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.6)] transition-all">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Name */}
                <span className="text-xs text-gray-300 font-mono tracking-wider text-center group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-cyan-500/10 flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              ALL MODULES OPERATIONAL
            </span>
            <span>TOTAL MODULES: {skills.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

