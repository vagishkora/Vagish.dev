"use client";

import { useEffect, useState } from "react";
import {
  Car,
  Music,
  Plane,
  Cpu,
  Code2,
  Gamepad2,
  Gamepad,
  Sparkles,
  Camera,
  Dices,
  Trophy,
  BookOpen,
  Bike,
  Flame,
  Coffee,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";
import DecryptedText from "./DecryptedText";
import { supabase } from "@/lib/supabase";

const ICON_MAP: Record<string, LucideIcon> = {
  car: Car,
  automobiles: Car,
  music: Music,
  plane: Plane,
  travel: Plane,
  travelling: Plane,
  cpu: Cpu,
  hardware: Cpu,
  code: Code2,
  code2: Code2,
  coding: Code2,
  games: Gamepad2,
  gaming: Gamepad2,
  gamepad: Gamepad2,
  gamepad2: Gamepad2,
  camera: Camera,
  photography: Camera,
  dices: Dices,
  trophy: Trophy,
  book: BookOpen,
  bike: Bike,
  flame: Flame,
  coffee: Coffee,
};

export interface HobbyItem {
  id: string;
  name: string;
  icon_name: string;
  order_index?: number;
}

const INITIAL_HOBBIES: HobbyItem[] = [
  { id: "HB-001", name: "Automobiles", icon_name: "Car" },
  { id: "HB-002", name: "Music", icon_name: "Music" },
  { id: "HB-003", name: "Travelling", icon_name: "Plane" },
  { id: "HB-004", name: "Hardware Mods", icon_name: "Cpu" },
  { id: "HB-005", name: "Coding", icon_name: "Code2" },
];

export default function Hobbies() {
  const [hobbies, setHobbies] = useState<HobbyItem[]>(INITIAL_HOBBIES);

  // Fetch dynamic hobbies from Supabase
  useEffect(() => {
    async function fetchHobbies() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("hobbies")
          .select("*")
          .order("order_index", { ascending: true });

        if (data && data.length > 0 && !error) {
          setHobbies(data);
        }
      } catch (err) {
        console.warn("Supabase fetch fallback to static hobbies:", err);
      }
    }
    fetchHobbies();
  }, []);

  return (
    <section id="hobbies" className="py-28 bg-black/40 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" suppressHydrationWarning>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-indigo-500/20 rounded-full" suppressHydrationWarning></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        {/* Centered Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-2.5 sm:space-y-3 px-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest backdrop-blur-md">
            <Sparkles size={12} className="text-cyan-400 animate-pulse" />
            <span>[ LIFESTYLE // PASSIONS ]</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400">
              <DecryptedText text="Personal" animateOn="view" />
            </span>{" "}
            <span className="text-white">
              <DecryptedText text="Passions" animateOn="view" />
            </span>
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto font-mono">
            Automotive engineering, music production, travels, and hardware hacking.
          </p>
        </div>

        {/* Dynamic 2-column mobile combo, auto-centering on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto px-2">
          {hobbies.map((hobby) => {
            const normalizedKey = (hobby.icon_name || hobby.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
            const Icon = ICON_MAP[normalizedKey] || ICON_MAP[hobby.icon_name] || Gamepad2 || Code2;

            return (
              <div
                key={hobby.id}
                className="relative w-full lg:w-[190px] xl:w-[210px] bg-white/5 border border-white/10 p-4 sm:p-7 text-center transition-all duration-300 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center group hover:border-indigo-500 hover:bg-indigo-500/5 hover:-translate-y-1 rounded-xl sm:rounded-none"
              >
                {/* M-Stripe Accents */}
                <div className="absolute top-0 left-0 w-[3px] h-0 bg-gradient-to-b from-blue-400 via-blue-600 to-red-600 transition-all duration-500 group-hover:h-full"></div>
                
                {/* Corners */}
                <div className="absolute w-2 h-2 border border-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity top-1 left-1 border-r-0 border-b-0"></div>
                <div className="absolute w-2 h-2 border border-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity top-1 right-1 border-l-0 border-b-0"></div>
                <div className="absolute w-2 h-2 border border-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity bottom-1 left-1 border-r-0 border-t-0"></div>
                <div className="absolute w-2 h-2 border border-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity bottom-1 right-1 border-l-0 border-t-0"></div>

                <div className="absolute bottom-1 right-2 font-mono text-[8px] text-white/20 tracking-widest">
                  {hobby.id}
                </div>

                <div className="relative mb-4 text-gray-400 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300">
                  <Icon size={38} strokeWidth={1.5} />
                </div>
                <span className="text-xs font-mono tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors">
                  {hobby.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
