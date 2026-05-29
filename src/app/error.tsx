"use client"; // Error components must be Client Components

import { useEffect } from "react";
import FuzzyText from "@/components/FuzzyText";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Global System Crash:", error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none"></div>
      
      <div className="relative z-10 text-center flex flex-col items-center">
        <FuzzyText 
          color="#ef4444" 
          baseIntensity={0.2} 
          hoverIntensity={0.8}
          glitchMode={true}
          glitchInterval={1500}
          glitchDuration={300}
          className="mx-auto"
        >
          FATAL ERROR
        </FuzzyText>
        
        <p className="text-red-500 font-mono mt-8 text-sm md:text-base tracking-[0.2em] uppercase animate-pulse">
          System Core Compromised
        </p>
        <p className="text-gray-400 font-mono mt-2 mb-8 text-xs md:text-sm tracking-widest max-w-md mx-auto">
          An unexpected anomaly caused the interface to crash. 
        </p>

        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="px-8 py-3 bg-red-900/30 border border-red-500 text-red-500 font-mono hover:bg-red-500 hover:text-white transition-all rounded uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]"
        >
          [ Reboot System ]
        </button>
      </div>
    </div>
  );
}
