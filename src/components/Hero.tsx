"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Lanyard from "./Lanyard";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || isMuted) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      video.play().catch((err) => {
        console.warn("Audio play error:", err);
        video.muted = false;
        setIsMuted(false);
      });
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  // Start video muted by default
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => console.warn("Muted video autoplay:", e));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
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
        {/* Blurred background copy (desktop only) */}
        <video
          src="/Vagish.dev/assets/mp_.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 w-full h-full object-cover blur-[50px] scale-125 opacity-40"
        />
        {/* Main video */}
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
        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Lanyard 3D Badge */}
      <div
        style={{
          opacity: scrollOpacity,
          visibility: scrollOpacity === 0 ? "hidden" : "visible",
        }}
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-150"
      >
        <Lanyard />
      </div>

      {/* Audio toggle — floating pill with high z-index */}
      <button
        type="button"
        onClick={toggleMute}
        suppressHydrationWarning
        style={{ opacity: scrollOpacity, pointerEvents: scrollOpacity === 0 ? "none" : "auto" }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2.5 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-black hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xl shadow-black/70 pointer-events-auto"
      >
        {isMuted ? <VolumeX size={18} className="text-pink-400" /> : <Volume2 size={18} className="text-emerald-400" />}
        <span className="text-xs font-mono tracking-wider uppercase font-semibold">
          {isMuted ? "Tap for sound" : "Sound on"}
        </span>
      </button>

      {/* Hero Content */}
      <div
        className="relative z-30 w-full max-w-7xl mx-auto px-6 flex items-center h-full transition-opacity duration-100 pointer-events-auto"
        style={{ opacity: scrollOpacity, pointerEvents: scrollOpacity === 0 ? "none" : "auto" }}
      >
        {/* Corner Brackets */}
        <div className="absolute -inset-4 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-500" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
        </div>

        <div className="space-y-8 relative w-full max-w-3xl flex flex-col items-start text-left">
          <h1
            className="text-5xl md:text-8xl font-black tracking-tighter text-white flex flex-col md:flex-row md:flex-wrap items-start justify-start gap-2 md:gap-4 text-left relative"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span>Hi, I'm</span>
            <div className="relative group inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Vagish
              </span>
            </div>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mt-6 relative z-20 text-left mx-0">
            A <span className="text-white font-medium">Cybersecurity Engineer</span> dedicated to
            solving complex, real-world problems through high-performance intelligent systems and
            secure product experiences.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-start gap-6 mt-10 relative z-30 w-full max-w-2xl">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const workSection = document.getElementById("work");
                if (workSection) {
                  workSection.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  window.location.hash = "work";
                }
              }}
              className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-sm hover:bg-white/15 hover:border-white/50 backdrop-blur-md transition-all transform hover:-translate-y-1 w-full md:w-auto text-center flex-1 cursor-pointer pointer-events-auto"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              EXPLORE WORK &rarr;
            </a>
            <a
              href="/Vagish.dev/Vagish_Resume.pdf"
              download="Vagish_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                let targetUrl = "/Vagish.dev/Vagish_Resume.pdf";
                if (typeof window !== "undefined") {
                  const saved = localStorage.getItem("vagish_active_resume");
                  if (saved) targetUrl = saved;
                }
                const link = document.createElement("a");
                link.href = targetUrl;
                link.download = "Vagish_Resume.pdf";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-sm hover:bg-white/15 hover:border-white/50 backdrop-blur-md transition-all transform hover:-translate-y-1 w-full md:w-auto text-center flex-1 cursor-pointer pointer-events-auto"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              DOWNLOAD RESUME &darr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
