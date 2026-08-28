import DockNav from "@/components/DockNav";
import SocialSidebar from "@/components/SocialSidebar";
import Education from "@/components/Education";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EducationPage() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      <DockNav />
      <SocialSidebar />
      
      {/* Return to Base Button */}
      <div className="fixed top-24 left-4 md:left-8 z-40">
        <Link 
          href="/"
          className="group flex items-center gap-2 px-4 py-2 bg-black/80 border border-white/20 text-white font-mono text-xs tracking-widest hover:border-indigo-500 hover:text-indigo-400 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          RETURN_TO_BASE
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full pt-20">
        <Education />
      </div>
    </main>
  );
}
