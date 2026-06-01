"use client";

import { useState, useEffect } from "react";
import FuzzyText from "./FuzzyText";

export default function NetworkStatus() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black pointer-events-none"></div>
      
      <div className="relative z-10 text-center">
        <FuzzyText 
          color="#06b6d4" 
          baseIntensity={0.2} 
          hoverIntensity={0.8}
          glitchMode={true}
          glitchInterval={1500}
          glitchDuration={300}
          className="mx-auto"
        >
          OFFLINE
        </FuzzyText>
        
        <p className="text-cyan-500 font-mono mt-8 text-sm md:text-base tracking-[0.2em] uppercase animate-pulse">
          Connection Terminated
        </p>
        <p className="text-gray-400 font-mono mt-2 text-xs md:text-sm tracking-widest max-w-md mx-auto">
          System is attempting to reconnect to the mainframe. Please check your network connection to restore access.
        </p>
      </div>
    </div>
  );
}
