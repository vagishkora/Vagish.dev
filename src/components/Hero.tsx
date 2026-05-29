"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Lanyard from "./Lanyard";
import DecryptedText from "./DecryptedText";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);

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

  // Browser auto-play policy workaround & attempt to play with sound
  useEffect(() => {
    const tryPlayVideo = async () => {
      if (videoRef.current) {
        try {
          // Attempt to play the video (it will try with sound because isMuted is false)
          await videoRef.current.play();
        } catch (error) {
          console.warn("Browser blocked autoplay with sound. Falling back to muted autoplay.", error);
          // If browser blocks it, we MUST mute it so the video visuals can at least play
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(e => console.error("Video completely failed to play", e));
        }
      }
    };
    
    tryPlayVideo();

    const handleFirstInteraction = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        // Restart video from the beginning when they interact for the first time
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Auto-mute if scrolled past Hero section
      if (window.scrollY > 150) {
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
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-32 pb-32 md:pt-0 md:pb-0"
    >
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      {/* Video Backgrounds */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          ref={blurVideoRef}
          src="/Vagish.dev/assets/mp_.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover blur-[100px] scale-150 opacity-50 transition-opacity duration-1000 hidden md:block"
          style={{ opacity: scrollOpacity * 0.5 }}
        />
        <video
          ref={videoRef}
          src="/Vagish.dev/assets/mp_.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
      </div>

      <button
        onClick={toggleMute}
        suppressHydrationWarning
        style={{ opacity: scrollOpacity, pointerEvents: scrollOpacity === 0 ? 'none' : 'auto' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/80 hover:text-white hover:bg-black/70 transition-all cursor-pointer animate-bounce"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        <span className="text-sm font-medium tracking-wide">
          {isMuted ? "Tap for sound" : "Muted"}
        </span>
      </button>

      {/* Geometric Decor */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-100"
        style={{ opacity: scrollOpacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-pink-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] border border-cyan-500/10 rounded-full animate-float" style={{ animationDelay: "-2s" }}></div>

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
        <div className="absolute -inset-4 pointer-events-none opacity-20 hidden md:block">
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
            <a href="/Vagish_Resume.pdf" download className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-sm hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all transform hover:-translate-y-1 w-full md:w-auto text-center flex-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              DOWNLOAD RESUME &darr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
