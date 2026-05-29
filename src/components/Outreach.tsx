"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Users, HeartHandshake } from "lucide-react";
import DecryptedText from "./DecryptedText";
import Image from "next/image";

export default function Outreach() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const outreachItems = [
    {
        title: "Ethical Hacking Workshop",
        org: "Participant • Ethical Edufabrica @ Pravega, IISc Bangalore",
        date: "15th & 16th Nov 2025",
        img: "/assets/IISc_Banglore.jpeg",
        desc: "Completed a two-day intensive workshop gaining hands-on exposure to cybersecurity concepts and defensive techniques.",
        curriculum: ["Kali Linux & Tools", "Threat Methodologies", "VM Security", "Phishing & SQL Injection(for educational purpose only)"],
        color: "pink-500"
    },
    {
        title: "Cyber Awareness Speaker",
        org: "Speaker • Belman PU College",
        date: "30th Oct 2025",
        img: "/assets/speaking.png",
        desc: "Leading interactive sessions to educate students on digital safety and the evolving threat landscape.",
        curriculum: ["Scam Detection", "Social Engineering", "Fake Giveaways", "Digital Hygiene"],
        color: "indigo-500"
    }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="volunteering" className="py-24 relative overflow-hidden bg-surface/30">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" suppressHydrationWarning>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-pink-500/10 rounded-full" suppressHydrationWarning></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          <DecryptedText text="Community Outreach" animateOn="view" />
        </h2>
        
        <div className="relative w-full">
          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar relative z-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {outreachItems.map((item, idx) => (
              <div 
                key={idx}
                className="w-full md:min-w-[800px] bg-white/5 border border-white/10 rounded-xl p-5 md:p-8 snap-center hover:bg-white/10 transition-all group relative overflow-hidden flex-shrink-0"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center h-full relative z-10">
                  <div className="shrink-0 relative w-full md:w-72 h-40 md:h-48 rounded-lg overflow-hidden border border-white/10 transition-colors">
                      <Image 
                        src={item.img} 
                        alt={item.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                  </div>

                  <div className="flex-1 space-y-2 text-left">
                      <div>
                          <h3 className="text-xl font-bold text-white transition-colors">{item.title}</h3>
                          <p className="text-gray-400 font-mono text-sm mt-1">{item.org}</p>
                          <p className="text-gray-500 text-xs mt-1">{item.date}</p>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                      <ul className="grid grid-cols-2 gap-2 text-xs text-gray-400 mt-4">
                          {item.curriculum.map((c, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="text-pink-500">➜</span> {c}
                            </li>
                          ))}
                      </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          {outreachItems.length > 1 && (
            <div className="flex justify-center gap-4 mt-4">
              <button 
                onClick={() => scroll("left")}
                suppressHydrationWarning
                className="p-3 rounded-full bg-black/50 border border-white/20 hover:bg-white/10 text-white transition-all hover:scale-110 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll("right")}
                suppressHydrationWarning
                className="p-3 rounded-full bg-black/50 border border-white/20 hover:bg-white/10 text-white transition-all hover:scale-110 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
