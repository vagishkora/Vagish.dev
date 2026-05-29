import Link from "next/link";
import { ExternalLink } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import DecryptedText from "./DecryptedText";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      id: "PROJ-WEB-000",
      title: "Birthday Site",
      description: "High-performance interactive web app featuring 60fps canvas particles, 3D holographic tilt-cards, and a gamified constellation puzzle.",
      image: "/assets/Birthday.png",
      link: "https://github.com/vagishkora/Birthday-template",
      tags: ["Vanilla JS", "HTML5 Canvas"],
      accent: "accent-purple",
    },
    {
      id: "PROJ-FIN-000",
      title: "Wealth Nest — AI Finance",
      description: "AI-powered PWA for tracking stocks, mutual funds, and smart expenses.",
      image: "/assets/Wealthnest.jpg",
      link: "https://github.com/vagishkora/WealthNest",
      tags: ["Next.js", "LIVE PWA"],
      accent: "accent-pink",
    },
    {
      id: "PROJ-SEC-001",
      title: "AI Cybersecurity",
      description: "ANN model achieving 90%+ accuracy on network intrusion detection.",
      image: "/assets/cybersecurity.png",
      link: "https://github.com/vagishkora/-AI-for-Identifying-Cybersecurity-Threats",
      tags: ["Python", "ANN"],
      accent: "primary",
    },
    {
      id: "PROJ-BIO-002",
      title: "Face Recognition",
      description: "Real-time contactless authentication system built with OpenCV & LBPH.",
      image: "/assets/face-recognition.png",
      link: "#",
      tags: ["OpenCV", "LBPH"],
      accent: "secondary",
    },
  ];

  return (
    <div className="relative z-10 w-full h-[100vh]">
      <section id="work" className="h-full w-full bg-black/40 pt-16">
        <div className="w-full h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          <h2 className="text-3xl font-bold mb-4 text-center text-white shrink-0">
            <DecryptedText text="Featured Projects" animateOn="view" encryptedClassName="text-indigo-400 font-mono" />
          </h2>
          
          <div className="flex-1 overflow-hidden rounded-3xl mb-8 relative border border-white/5 bg-black/20">
            <ScrollStack 
              itemDistance={60} 
              itemScale={0.03} 
              baseScale={0.9} 
              stackPosition="15%"
            >
              {projects.map((project, idx) => (
                <ScrollStackItem key={project.id}>
                  <article
                    className={`bg-black overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300 group relative w-full h-full rounded-[40px]`}
                  >
                    {/* Schematic Overlay */}
                    <div className="absolute top-4 left-4 z-20 pointer-events-none flex justify-between">
                      <div className="bg-black/80 text-white font-mono text-[10px] px-3 py-1 border border-white/20 rounded-full">
                        {project.id}
                      </div>
                    </div>

                    <div className="h-64 bg-gray-800 relative overflow-hidden group">
                      <Link href={project.link} target="_blank" className="block w-full h-full relative z-10">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                          <span className="text-white font-bold text-lg mb-2 text-center flex items-center gap-2">
                            View Project <ExternalLink size={20} />
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="p-8 relative z-30">
                      <div className="flex items-center justify-between mb-4">
                        <Link href={project.link} target="_blank" className="hover:text-indigo-400 transition-colors">
                          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        </Link>
                        <Link href={project.link} target="_blank" className="text-indigo-500 hover:text-white transition-colors">
                          <ExternalLink size={24} />
                        </Link>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <p className="text-gray-400 text-base h-20 line-clamp-3">
                          <strong className="text-gray-200">System:</strong> {project.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </section>
    </div>
  );
}
