"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import DecryptedText from "./DecryptedText";
import Image from "next/image";

export default function Certificates() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const certificates = [
    { title: "Ethical Hacking Workshop", issuer: "Ethical Edufabrica Pvt Ltd", key: "/certificates/iicsbanglore.jpeg" },
    { title: "Cybersecurity Job Simulation", issuer: "Mastercard", key: "/certificates/Cybersecurity Job Simulation Mastercard_page-0001.jpg" },
    { title: "Cybersecurity Analyst", issuer: "Tata", key: "/certificates/Cybersecurity Analyst Job Simulation TATA - Forage_page-0001.jpg" },
    { title: "AI & Data Analytics", issuer: "AICTE", key: "/certificates/Vagish N Kora_AICTE_Certificate_page-0001.jpg" },
    { title: "Internship Completion", issuer: "Karunadu Tech", key: "/certificates/karunadu internship certificate_page-0001.jpg" },
    { title: "Data Visualization", issuer: "Accenture", key: "/certificates/accenture data_visulatization_completion_certificate_page-0001.jpg" },
    { title: "Data Plus Overview", issuer: "TCS", key: "/certificates/TSC Data Plus Overview Course_page-0001.jpg" },
    { title: "Hashgraph Developer", issuer: "Hedera", key: "/certificates/Vagish_Kora_Hashgraph Developer Course_certificate_page-0001.jpg" },
    { title: "Career Edge", issuer: "TCS", key: "/certificates/Tcs Certificate._page-0001.jpg" },
    { title: "Fundamentals of AI & ML", issuer: "Course Completion", key: "/certificates/Fundamentals of AI&ML certification_page-0001.jpg" },
    { title: "AI for Metaverse", issuer: "Metaverse Cert", key: "/certificates/Introduction to AI For Metaverse Certification_page-0001.jpg" },
    { title: "Info & Cyber Security", issuer: "Fundamentals", key: "/certificates/Fundamentals of Information Security-Cyber Security_page-0001.jpg" }
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
    <section id="certifications" className="py-24 relative overflow-hidden bg-background border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-background to-background pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            <DecryptedText text="Certifications" animateOn="view" />
          </span>
        </h2>
        
        <div className="relative w-full">
          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar relative z-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {certificates.map((cert, idx) => (
              <div 
                key={idx}
                className="min-w-[300px] md:min-w-[400px] bg-white/5 border border-white/10 rounded-xl p-8 snap-center hover:bg-white/10 transition-all group relative overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => window.open(cert.key, "_blank")}
                suppressHydrationWarning
              >
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={cert.key} 
                    alt={cert.title} 
                    fill
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-500 blur-[2px] group-hover:blur-none" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent group-hover:bg-black/50 transition-colors duration-500"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-xs font-mono text-indigo-400 mb-4 bg-black/50 inline-block px-2 py-1 rounded backdrop-blur-sm">CERT-{String(idx + 1).padStart(3, '0')}</div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-indigo-300 transition-colors drop-shadow-md">{cert.title}</h3>
                    <p className="text-gray-300 font-medium drop-shadow-md">{cert.issuer}</p>
                  </div>
                  <div className="mt-8 text-sm text-gray-400 font-mono flex justify-between items-center bg-black/50 px-3 py-2 rounded backdrop-blur-sm">
                    <span>ISSUED</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 font-bold">VIEW &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-4">
            <button 
              onClick={() => scroll("left")}
              suppressHydrationWarning
              className="p-3 rounded-full bg-black/50 border border-white/20 hover:bg-white/10 text-white transition-all hover:scale-110 backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")}
              suppressHydrationWarning
              className="p-3 rounded-full bg-black/50 border border-white/20 hover:bg-white/10 text-white transition-all hover:scale-110 backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Hide scrollbar global style specifically for this component if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
