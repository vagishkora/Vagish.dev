"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CinematicOutreach.css";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import DecryptedText from "./DecryptedText";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_INITIATIVES = [
  {
    id: "LEAD-ACM-01",
    badge: "CORE LEADERSHIP",
    title: "Technical Co-Head",
    org: "ACM Student Chapter • NMAMIT",
    location: "Nitte, Karnataka",
    date: "2025 — PRESENT",
    description:
      "Spearheading the technical vision and engineering operations for the official ACM student chapter. Architecting campus-wide hackathons, leading CTFs, and mentoring 200+ student developers across cybersecurity and modern distributed software systems.",
    image: "/Vagish.dev/assets/acm_team.jpg",
    tags: ["Technical Leadership", "Hackathons & CTFs", "Workshop Architecture", "Peer Mentorship"],
    accent: "cyan",
  },
  {
    id: "SPK-SEC-02",
    badge: "KEYNOTE SPEAKER",
    title: "Cyber Awareness Speaker",
    org: "Belman PU College",
    location: "Karkala, Karnataka",
    date: "30th Oct 2025",
    description:
      "Delivered live interactive cybersecurity keynotes to 150+ students. Demystified real-world social engineering vectors, phishing attack surfaces, identity defense, and digital hygiene practices for young internet users.",
    image: "/Vagish.dev/assets/speaking.webp",
    tags: ["Keynote Speaker", "Social Engineering", "Scam Detection", "Digital Hygiene"],
    accent: "emerald",
  },
  {
    id: "WRK-IIS-03",
    badge: "WORKSHOP DELEGATE",
    title: "Ethical Hacking Intensive",
    org: "Ethical Edufabrica @ Pravega, IISc Bangalore",
    location: "IISc Bangalore",
    date: "15th & 16th Nov 2025",
    description:
      "Completed an intensive hands-on security workshop at IISc Bangalore exploring defensive security counter-measures, sandboxed penetration testing, virtual machine isolation, and vulnerability assessment.",
    image: "/Vagish.dev/assets/IISc_Banglore.webp",
    tags: ["Kali Linux", "Threat Methodologies", "VM Security", "Sandboxed Testing"],
    accent: "indigo",
  },
];

export default function CinematicOutreach() {
  const [initiatives, setInitiatives] = useState(INITIAL_INITIATIVES);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const frameRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch dynamic outreach initiatives from Supabase
  useEffect(() => {
    async function fetchOutreach() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("outreach")
          .select("*")
          .order("order_index", { ascending: true });

        if (data && data.length > 0 && !error) {
          setInitiatives(data);
        }
      } catch (err) {
        console.warn("Supabase fetch fallback to static outreach:", err);
      }
    }
    fetchOutreach();
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
        const cardPhoto = frame.querySelector(".cinematic-photo-card");
        const badge = frame.querySelector(".cinematic-outreach-frame__badge-row");
        const title = frame.querySelector(".cinematic-outreach-frame__title");
        const meta = frame.querySelector(".cinematic-outreach-frame__meta");
        const desc = frame.querySelector(".cinematic-outreach-frame__desc");
        const tags = frame.querySelector(".cinematic-outreach-frame__tags");

        const textEls = [badge, title, meta, desc, tags].filter(Boolean);

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
        const cardPhoto = frame.querySelector(".cinematic-photo-card");
        const badge = frame.querySelector(".cinematic-outreach-frame__badge-row");
        const title = frame.querySelector(".cinematic-outreach-frame__title");
        const meta = frame.querySelector(".cinematic-outreach-frame__meta");
        const desc = frame.querySelector(".cinematic-outreach-frame__desc");
        const tags = frame.querySelector(".cinematic-outreach-frame__tags");
        const textEls = [badge, title, meta, desc, tags].filter(Boolean);

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
  }, [initiatives]);

  return (
    <section
      ref={sectionRef}
      id="volunteering"
      className="cinematic-outreach"
    >
      {/* Top Section Header */}
      <div className="cinematic-outreach-top-header">
        <div className="cinematic-outreach-watermark">
          <Sparkles size={12} className="text-cyan-400 animate-pulse" />
          <span>[ FIELD_INITIATIVES // IMPACT ]</span>
        </div>
        <h2 className="cinematic-outreach-heading">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400">
            <DecryptedText text="Leadership" animateOn="view" />
          </span>{" "}
          <span className="text-white">
            <DecryptedText text="& Community" animateOn="view" />
          </span>
        </h2>
      </div>

      {/* Prominent Mobile Swipe Indicator */}
      <div className="md:hidden flex items-center justify-center gap-2.5 my-3 px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-teal-500/20 border border-cyan-400/40 rounded-full text-cyan-300 font-mono text-xs font-semibold tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.3)] mx-auto w-fit">
        <span className="animate-pulse text-cyan-400">⟵</span>
        <span>SWIPE CARDS TO VIEW MORE</span>
        <span className="animate-pulse text-cyan-400">⟶</span>
      </div>

      <div ref={trackRef} className="cinematic-outreach-track">
        {initiatives.map((item, i) => (
          <div
            key={item.id || i}
            ref={(el) => {
              frameRefs.current[i] = el;
            }}
            className={`cinematic-outreach-frame cinematic-outreach-frame--${item.accent || "cyan"}`}
          >
            {/* Ambient Background Aura */}
            <div className="cinematic-outreach-ambient-bg" />

            <div className="cinematic-outreach-layout">
              {/* Left Column: Text Dossier */}
              <div className="cinematic-outreach-info">
                <div className="cinematic-outreach-frame__badge-row">
                  <span className="cinematic-outreach-frame__badge">
                    {item.badge}
                  </span>
                  <span className="cinematic-outreach-frame__id">
                    {item.id}
                  </span>
                </div>

                <h3 className="cinematic-outreach-frame__title">
                  {item.title}
                </h3>

                <div className="cinematic-outreach-frame__meta">
                  <span className="text-white font-semibold">{item.org}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <MapPin size={13} className="text-cyan-400" />
                    {item.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-cyan-400 font-mono">
                    <Calendar size={13} />
                    {item.date}
                  </span>
                </div>

                <p className="cinematic-outreach-frame__desc">{item.description}</p>

                <div className="cinematic-outreach-frame__tags">
                  {((Array.isArray(item.tags) ? item.tags : Array.isArray(item.skills) ? item.skills : typeof (item.tags || item.skills) === "string" ? (item.tags || item.skills).split(",").map((s) => s.trim()) : []) || []).map((tag, idx) => (
                    <span key={idx} className="cinematic-outreach-frame__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Crystal-Clear Featured Photo Card */}
              <div className="cinematic-outreach-media">
                <div className="cinematic-photo-card">
                  {/* Photo Corner HUD Brackets */}
                  <div className="cinematic-photo-corner tl" />
                  <div className="cinematic-photo-corner tr" />
                  <div className="cinematic-photo-corner bl" />
                  <div className="cinematic-photo-corner br" />

                  {/* Top Header Tag inside photo */}
                  <div className="cinematic-photo-tag">
                    <span className="cinematic-photo-dot" />
                    {item.title}
                  </div>

                  {/* 100% Unobscured Crystal-Clear Photo */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cinematic-photo-img"
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
      <div className="cinematic-outreach-progress">
        <div ref={progressRef} className="cinematic-outreach-progress__bar" />
      </div>

      {/* Frame counter */}
      <div className="cinematic-outreach-counter">
        <span className="cinematic-outreach-counter__current">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        {" / "}
        {String(initiatives.length).padStart(2, "0")}
      </div>

      {/* Dot nav */}
      <div className="cinematic-outreach-dots">
        {initiatives.map((_, i) => (
          <button
            key={i}
            className={`cinematic-outreach-dot${i === activeIndex ? " cinematic-outreach-dot--active" : ""}`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint (first frame only) */}
      {activeIndex === 0 && (
        <div className="cinematic-outreach-scroll-hint">
          <div className="cinematic-outreach-scroll-hint__mouse">
            <div className="cinematic-outreach-scroll-hint__dot" />
          </div>
          SCROLL
        </div>
      )}
    </section>
  );
}
