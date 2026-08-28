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

  const toggleMute = () => {
    if (videoRef.current) {
      const willBeMuted = !videoRef.current.muted;
      videoRef.current.muted = willBeMuted;
      setIsMuted(willBeMuted);
      
      // If we are unmuting, restart the video from the beginning
      if (!willBeMuted) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
    if (blurVideoRef.current) {
      blurVideoRef.current.muted = true;
    }
  };

  // Start video muted by default, respecting browser and user privacy
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => console.warn("Muted video autoplay:", e));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Auto-mute immediately if scrolled past Hero section (50px)
      if (window.scrollY > 50) {
        if (videoRef.current && !videoRef.current.muted) {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      }
      
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
          muted={isMuted}
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

      <button
        onClick={toggleMute}
        suppressHydrationWarning
        style={{ opacity: scrollOpacity, pointerEvents: scrollOpacity === 0 ? 'none' : 'auto' }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/15 rounded-full text-white/90 hover:text-white hover:bg-black/80 transition-all cursor-pointer shadow-lg shadow-black/50"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        <span className="text-xs font-mono tracking-wider uppercase">
          {isMuted ? "Tap for sound" : "Sound on"}
        </span>
      </button>

      {/* Geometric Decor */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-100"
        style={{ opacity: scrollOpacity }}
      >
        {/* Tech Pattern Accents */}
        <div className="absolute top-20 left-10 font-mono text-xs text-indigo-500/50 tracking-widest">[ HUD_STATUS: ACTIVE ]</div>
        <div className="absolute top-40 left-1/4 font-mono text-xs text-indigo-500/50">04 // SYSTEM_CORE</div>
        <div className="absolute bottom-40 left-20 font-mono text-xs text-indigo-500/50">LAT: 12.9716° N / LONG: 77.5946° E</div>
        <div className="absolute top-1/3 right-10 rotate-90 font-mono text-xs text-indigo-500/50">ENGINEERING_v2.4</div>
        <div className="absolute bottom-20 right-20 font-mono text-xs text-indigo-500/50">ENCRYPTION: AES_256_GCM</div>
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

          <div className="flex flex-col md:flex-row items-center justify-start gap-6 mt-10 relative z-20 w-full max-w-2xl">
            <a href="#work" className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-sm hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all transform hover:-translate-y-1 w-full md:w-auto text-center flex-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              EXPLORE WORK &rarr;
            </a>
            <a href="/Vagish.dev/Vagish_Resume.pdf" download className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-sm hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all transform hover:-translate-y-1 w-full md:w-auto text-center flex-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              DOWNLOAD RESUME &darr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
