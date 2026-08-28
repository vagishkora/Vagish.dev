"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CinematicProjects.css";
import { Sparkles, ExternalLink } from "lucide-react";
import DecryptedText from "./DecryptedText";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_PROJECTS = [
  {
    id: "PROJ-WEB-000",
    badge: "INTERACTIVE EXP",
    title: "Birthday Site",
    description:
      "High-performance interactive web experience featuring 60fps canvas particles, 3D holographic tilt-cards, dynamic sound integration, and a gamified constellation puzzle.",
    image: "/Vagish.dev/assets/Birthday.webp",
    link: "https://github.com/vagishkora/Birthday-template",
    tags: ["Vanilla JS", "HTML5 Canvas", "Web Audio", "Interactive 3D"],
    accent: "indigo",
  },
  {
    id: "PROJ-FIN-000",
    badge: "AI FINTECH PWA",
    title: "Wealth Nest — AI Finance",
    description:
      "Intelligent financial assistant and Progressive Web App for tracking equities, mutual funds, automated portfolio rebalancing, and smart budget analytics with real-time telemetry.",
    image: "/Vagish.dev/assets/Wealthnest.webp",
    link: "https://github.com/vagishkora/WealthNest",
    tags: ["Next.js", "LIVE PWA", "Tailwind CSS", "Financial AI"],
    accent: "emerald",
  },
  {
    id: "PROJ-SEC-001",
    badge: "CYBER SECURITY",
    title: "AI for Identifying Threats",
    description:
      "Deep dive into dynamic and static malware analysis techniques in sandboxed environments, utilizing machine learning models for automated heuristic threat detection.",
    image: "/Vagish.dev/assets/cybersecurity.webp",
    link: "https://github.com/vagishkora/-AI-for-Identifying-Cybersecurity-Threats",
    tags: ["Security", "Reverse Engineering", "Threat Modeling", "Python"],
    accent: "cyan",
  },
  {
    id: "PROJ-AI-002",
    badge: "COMPUTER VISION",
    title: "Face Recognition Biometrics",
    description:
      "Real-time edge biometric surveillance and identity verification system using OpenCV computer vision pipelines and deep neural network embeddings.",
    image: "/Vagish.dev/assets/face-recognition.webp",
    link: "https://github.com/vagishkora",
    tags: ["Python", "OpenCV", "Deep Learning", "Biometrics"],
    accent: "indigo",
  },
];

const CinematicProjects = () => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const frameRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch dynamic projects from Supabase
  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order_index", { ascending: true });

        if (data && data.length > 0 && !error) {
          setProjects(data);
        }
      } catch (err) {
        console.warn("Supabase fetch fallback to static projects:", err);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop: Pin & scrub horizontally
    mm.add("(min-width: 768px)", () => {
      const frames = frameRefs.current.filter(Boolean);
      const totalFrames = frames.length;
      if (totalFrames === 0) return;

      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
            const idx = Math.min(
              Math.floor(self.progress * totalFrames),
              totalFrames - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      frames.forEach((frame, index) => {
        const cardPhoto = frame.querySelector(".cinematic-projects-photo-card");
        const badge = frame.querySelector(".cinematic-projects-frame__badge-row");
        const title = frame.querySelector(".cinematic-projects-frame__title");
        const desc = frame.querySelector(".cinematic-projects-frame__desc");
        const tags = frame.querySelector(".cinematic-projects-frame__tags");
        const link = frame.querySelector(".cinematic-projects-frame__link");

        const textEls = [badge, title, desc, tags, link].filter(Boolean);

        if (index === 0) {
          gsap.set(textEls, { opacity: 1, x: 0 });
          if (cardPhoto) gsap.set(cardPhoto, { opacity: 1, scale: 1, y: 0 });
        } else {
          gsap.fromTo(
            textEls,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: frame,
                containerAnimation: scrollTween,
                start: "left 85%",
                end: "left 35%",
                toggleActions: "play none none reverse",
              },
            }
          );

          if (cardPhoto) {
            gsap.fromTo(
              cardPhoto,
              { opacity: 0, scale: 0.92, y: 20 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: frame,
                  containerAnimation: scrollTween,
                  start: "left 80%",
                  end: "left 35%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }
      });
    });

    // Mobile: Clean, natural flow without fixed pinning (zero section collision)
    mm.add("(max-width: 767px)", () => {
      const frames = frameRefs.current.filter(Boolean);
      frames.forEach((frame) => {
        const cardPhoto = frame.querySelector(".cinematic-projects-photo-card");
        const badge = frame.querySelector(".cinematic-projects-frame__badge-row");
        const title = frame.querySelector(".cinematic-projects-frame__title");
        const desc = frame.querySelector(".cinematic-projects-frame__desc");
        const tags = frame.querySelector(".cinematic-projects-frame__tags");
        const link = frame.querySelector(".cinematic-projects-frame__link");
        const textEls = [badge, title, desc, tags, link].filter(Boolean);

        gsap.set(textEls, { opacity: 1, x: 0, clearProps: "all" });
        if (cardPhoto) gsap.set(cardPhoto, { opacity: 1, scale: 1, y: 0, clearProps: "all" });
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="cinematic-projects"
    >
      {/* Top Section Header */}
      <div className="cinematic-projects-top-header">
        <div className="cinematic-projects-watermark">
          <Sparkles size={12} className="text-indigo-400 animate-pulse" />
          <span>[ ARCHITECTURE & FEATURED WORK ]</span>
        </div>
        <h2 className="cinematic-projects-heading">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
            <DecryptedText text="Featured" animateOn="view" />
          </span>{" "}
          <span className="text-white">
            <DecryptedText text="Projects" animateOn="view" />
          </span>
        </h2>
        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-2 py-1 px-3.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-[11px] uppercase tracking-widest backdrop-blur-md">
          <span>⟵</span>
          <span>SWIPE TO VIEW MORE</span>
          <span>⟶</span>
        </div>
      </div>

      <div ref={trackRef} className="cinematic-projects-track">
        {projects.map((project, i) => (
          <div
            key={project.id || i}
            ref={(el) => {
              frameRefs.current[i] = el;
            }}
            className={`cinematic-projects-frame cinematic-projects-frame--${project.accent || "indigo"}`}
          >
            {/* Ambient Background Aura */}
            <div className="cinematic-projects-ambient-bg" />

            <div className="cinematic-projects-layout">
              {/* Left Column: Text Dossier */}
              <div className="cinematic-projects-info">
                <div className="cinematic-projects-frame__badge-row">
                  <span className="cinematic-projects-frame__badge">
                    {project.badge}
                  </span>
                  <span className="cinematic-projects-frame__id">
                    {project.id}
                  </span>
                </div>

                <h3 className="cinematic-projects-frame__title">
                  {project.title}
                </h3>

                <p className="cinematic-projects-frame__desc">
                  {project.description}
                </p>

                <div className="cinematic-projects-frame__tags">
                  {(project.tags || []).map((tag) => (
                    <span key={tag} className="cinematic-projects-frame__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cinematic-projects-frame__link"
                  >
                    <span>View Repository & Live Demo</span>
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>

              {/* Right Column: Crystal-Clear Unobscured Project Preview Card */}
              <div className="cinematic-projects-media">
                <div className="cinematic-projects-photo-card">
                  {/* HUD Corner Brackets */}
                  <div className="cinematic-projects-photo-corner tl" />
                  <div className="cinematic-projects-photo-corner tr" />
                  <div className="cinematic-projects-photo-corner bl" />
                  <div className="cinematic-projects-photo-corner br" />

                  {/* Floating Top Tag */}
                  <div className="cinematic-projects-photo-tag">
                    <span className="cinematic-projects-photo-dot" />
                    {project.title}
                  </div>

                  {/* 100% Unobscured Project Screenshot */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="cinematic-projects-photo-img"
                    draggable="false"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="cinematic-projects-progress">
        <div ref={progressRef} className="cinematic-projects-progress__bar" />
      </div>

      {/* Frame counter */}
      <div className="cinematic-projects-counter">
        <span className="cinematic-projects-counter__current">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        {" / "}
        {String(projects.length).padStart(2, "0")}
      </div>

      {/* Dot nav */}
      <div className="cinematic-projects-dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`cinematic-projects-dot${i === activeIndex ? " cinematic-projects-dot--active" : ""}`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint (first frame only) */}
      {activeIndex === 0 && (
        <div className="cinematic-projects-scroll-hint">
          <div className="cinematic-projects-scroll-hint__mouse">
            <div className="cinematic-projects-scroll-hint__dot" />
          </div>
          SCROLL
        </div>
      )}
    </section>
  );
};

export default CinematicProjects;
