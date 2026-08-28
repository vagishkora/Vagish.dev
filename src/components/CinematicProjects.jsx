"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CinematicProjects.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "PROJ-WEB-000",
    title: "Birthday Site",
    description:
      "High-performance interactive web app featuring 60fps canvas particles, 3D holographic tilt-cards, and a gamified constellation puzzle.",
    image: "/Vagish.dev/assets/Birthday.webp",
    link: "https://github.com/vagishkora/Birthday-template",
    tags: ["Vanilla JS", "HTML5 Canvas"],
  },
  {
    id: "PROJ-FIN-000",
    title: "Wealth Nest — AI Finance",
    description:
      "AI-powered PWA for tracking stocks, mutual funds, and smart expenses with real-time market data.",
    image: "/Vagish.dev/assets/Wealthnest.webp",
    link: "https://github.com/vagishkora/WealthNest",
    tags: ["Next.js", "LIVE PWA"],
  },
  {
    id: "PROJ-SEC-001",
    title: "AI for Identifying Cybersecurity Threats",
    description:
      "Deep dive into dynamic and static malware analysis techniques in sandboxed environments using AI-driven detection.",
    image: "/Vagish.dev/assets/cybersecurity.webp",
    link: "https://github.com/vagishkora/-AI-for-Identifying-Cybersecurity-Threats",
    tags: ["Security", "Reverse Engineering"],
  },
  {
    id: "PROJ-AI-002",
    title: "Face Recognition",
    description:
      "Real-time biometric system using OpenCV and deep learning models for accurate identity verification.",
    image: "/Vagish.dev/assets/face-recognition.webp",
    link: "",
    tags: ["Python", "OpenCV"],
  },
];

const CinematicProjects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const frameRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const frames = frameRefs.current.filter(Boolean);
    const totalFrames = frames.length;

    // ── Main horizontal scroll ────────────────────────
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
          // Progress bar
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
          // Active dot
          const idx = Math.min(
            Math.floor(self.progress * totalFrames),
            totalFrames - 1
          );
          setActiveIndex(idx);
        },
      },
    });

    // ── Per-frame animations ──────────────────────────
    frames.forEach((frame) => {
      const bg = frame.querySelector(".cinematic-frame__bg img");
      const id = frame.querySelector(".cinematic-frame__id");
      const title = frame.querySelector(".cinematic-frame__title");
      const desc = frame.querySelector(".cinematic-frame__desc");
      const tags = frame.querySelector(".cinematic-frame__tags");
      const link = frame.querySelector(".cinematic-frame__link");

      // Ken Burns — subtle scale on scroll
      if (bg) {
        gsap.fromTo(
          bg,
          { scale: 1.15 },
          {
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      }

      // Text reveal
      const textEls = [id, title, desc, tags, link].filter(Boolean);
      gsap.fromTo(
        textEls,
        { opacity: 0, y: (_, el) => (el === title ? 40 : 25) },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frame,
            containerAnimation: scrollTween,
            start: "left 70%",
            end: "left 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      scrollTween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="cinematic-projects"
    >
      <div ref={trackRef} className="cinematic-track">
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (frameRefs.current[i] = el)}
            className="cinematic-frame"
          >
            {/* Full-bleed background */}
            <div className="cinematic-frame__bg">
              <img
                src={project.image}
                alt={project.title}
                draggable="false"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>

            {/* Gradient overlay */}
            <div className="cinematic-frame__overlay" />

            {/* Content */}
            <div className="cinematic-frame__content">
              <span className="cinematic-frame__id">{project.id}</span>

              <h3 className="cinematic-frame__title">{project.title}</h3>

              <p className="cinematic-frame__desc">{project.description}</p>

              <div className="cinematic-frame__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="cinematic-frame__tag">
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cinematic-frame__link"
                >
                  View Project
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="cinematic-progress">
        <div ref={progressRef} className="cinematic-progress__bar" />
      </div>

      {/* Frame counter */}
      <div className="cinematic-counter">
        <span className="cinematic-counter__current">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        {" / "}
        {String(PROJECTS.length).padStart(2, "0")}
      </div>

      {/* Dot nav */}
      <div className="cinematic-dots">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            className={`cinematic-dot${i === activeIndex ? " cinematic-dot--active" : ""}`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint (first frame only) */}
      {activeIndex === 0 && (
        <div className="cinematic-scroll-hint">
          <div className="cinematic-scroll-hint__mouse">
            <div className="cinematic-scroll-hint__dot" />
          </div>
          SCROLL
        </div>
      )}
    </section>
  );
};

export default CinematicProjects;
