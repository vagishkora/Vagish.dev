import { Car, Music, Plane, Cpu, Code2, Sparkles } from "lucide-react";
import DecryptedText from "./DecryptedText";

export default function Hobbies() {
  const hobbies = [
    { id: "HB-001", name: "Automobiles", icon: Car },
    { id: "HB-002", name: "Music", icon: Music },
    { id: "HB-003", name: "Travelling", icon: Plane },
    { id: "HB-004", name: "Hardware Mods", icon: Cpu },
    { id: "HB-005", name: "Coding", icon: Code2 },
  ];

  return (
    <section id="hobbies" className="py-28 bg-black/40 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" suppressHydrationWarning>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-indigo-500/20 rounded-full" suppressHydrationWarning></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        {/* Centered Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs uppercase tracking-widest backdrop-blur-md">
            <Sparkles size={12} className="text-cyan-400 animate-pulse" />
            <span>[ LIFESTYLE // PASSIONS ]</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight flex justify-center items-center gap-2">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {hobbies.map((hobby) => {
            const Icon = hobby.icon;
            return (
              <div
                key={hobby.id}
                className="relative bg-white/5 border border-white/10 p-10 text-center transition-all duration-300 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center group hover:border-indigo-500 hover:bg-indigo-500/5 hover:-translate-y-1"
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

                <div className="w-10 h-10 mb-4 flex items-center justify-center text-gray-500 transition-all duration-300 group-hover:text-white group-hover:scale-110">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 transition-colors duration-300 group-hover:text-white">
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
