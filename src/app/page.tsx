import DockNav from "@/components/DockNav";
import Hero from "@/components/Hero";
import SocialSidebar from "@/components/SocialSidebar";
import Skills from "@/components/Skills";
import CinematicProjects from "@/components/CinematicProjects";
import Certificates from "@/components/Certificates";
import Outreach from "@/components/Outreach";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import LightRays from "@/components/LightRays";

export default function Home() {
  return (
    <main className="relative w-full">
      <DockNav />
      <SocialSidebar />
      <Hero />
      <div className="relative z-10 w-full bg-black">
        {/* Sticky Parallax Background */}
        <div className="sticky top-0 h-screen w-full z-0 overflow-hidden pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#06b6d4"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>
        
        {/* Main Content overlapping the background */}
        <div className="relative z-10 -mt-[100vh]">
          <CinematicProjects />
          <Skills />
          <Certificates />
          <Outreach />
          <Hobbies />
          <Contact />
        </div>
      </div>
    </main>
  );
}

