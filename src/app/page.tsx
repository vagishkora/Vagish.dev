import DockNav from "@/components/DockNav";
import Hero from "@/components/Hero";
import SocialSidebar from "@/components/SocialSidebar";
import Skills from "@/components/Skills";
import CinematicProjects from "@/components/CinematicProjects";
import Certificates from "@/components/Certificates";
import CinematicOutreach from "@/components/CinematicOutreach";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative w-full bg-black min-h-screen">
      <DockNav />
      <SocialSidebar />
      <Hero />
      <CinematicProjects />
      <Skills />
      <Certificates />
      <CinematicOutreach />
      <Hobbies />
      <Contact />
    </main>
  );
}
