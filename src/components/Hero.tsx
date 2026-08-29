"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Lanyard from "./Lanyard";
import DecryptedText from "./DecryptedText";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Ensure it updates immediately after hydration
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      video.play().then(() => {
        setIsMuted(false);
      }).catch((err) => {
        console.warn("Audio play error:", err);
        setIsMuted(false);
      });
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  // Start video muted by default on load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => console.warn("Muted video autoplay:", e));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out content on scroll (fully faded by 600px)
      const newOpacity = Math.max(0, 1 - window.scrollY / 600);
      setScrollOpacity(newOpacity);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Backgrounds */}
      <div 
        className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ opacity: scrollOpacity }}
      >
        <video
          ref={blurVideoRef}
          src="/Vagish.dev/assets/mp_.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 w-full h-full object-cover blur-[50px] scale-125 opacity-40"
        />
        <video
          ref={videoRef}
          src="/Vagish.dev/assets/mp_.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        {/* Subtle cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
      </div>

      {/* Lanyard 3D Badge (Foreground) */}
      <div 
        style={{ 
          opacity: scrollOpacity, 
          pointerEvents: scrollOpacity === 0 ? 'none' : 'auto',
          visibility: scrollOpacity === 0 ? 'hidden' : 'visible'
        }}
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-150"
      >
        <Lanyard />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center h-full transition-opacity duration-100"
        style={{ opacity: scrollOpacity, pointerEvents: scrollOpacity === 0 ? 'none' : 'auto' }}
      >
        {/* Corner Brackets for Hero */}
        <div className="absolute -inset-4 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white"></div>
        </div>

        <div className="space-y-8 relative w-full max-w-3xl flex flex-col items-start text-left">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white flex flex-col md:flex-row md:flex-wrap items-start justify-start gap-2 md:gap-4 text-left relative" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            <span>Hi, I'm</span>
            <div className="relative group inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Vagish</span>
            </div>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mt-6 relative z-20 text-left mx-0">
            A <span className="text-white font-medium">Cybersecurity Engineer</span> dedicated to solving complex, real-world problems through high-performance intelligent systems and secure product experiences.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch justify-start gap-4 mt-8 relative z-20 w-full max-w-3xl">
            <a href="#work" className="px-6 py-3.5 bg-white/5 border border-white/20 text-white font-bold rounded-sm hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all transform hover:-translate-y-0.5 text-center flex-1 min-w-[170px]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              EXPLORE WORK &rarr;
            </a>
            <a href="/Vagish.dev/Vagish_Resume.pdf" download className="px-6 py-3.5 bg-white/5 border border-white/20 text-white font-bold rounded-sm hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all transform hover:-translate-y-0.5 text-center flex-1 min-w-[170px]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              DOWNLOAD RESUME &darr;
            </a>
            <button
              type="button"
              onClick={toggleMute}
              suppressHydrationWarning
              className={`px-5 py-3.5 border font-mono text-xs font-bold tracking-widest uppercase rounded-sm backdrop-blur-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer pointer-events-auto relative z-30 min-w-[160px] ${
                isMuted 
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.12)]" 
                  : "bg-indigo-500/25 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] animate-pulse"
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX size={16} className="text-cyan-400 shrink-0" />
                  <span>AUDIO: MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 size={16} className="text-indigo-400 shrink-0" />
                  <span>AUDIO: ACTIVE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
