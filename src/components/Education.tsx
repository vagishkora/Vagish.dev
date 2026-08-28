"use client";

import React from "react";
import { GraduationCap, ShieldCheck, Award, BookOpen, Users } from "lucide-react";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";
import DecryptedText from "./DecryptedText";

const educationTimelineData: TimelineItem[] = [
  {
    id: 1,
    title: "B.Tech in CSE (Cybersecurity)",
    date: "AUG 2025 - 2028",
    content: "Specializing in Cybersecurity, Network Security, and Cryptography at NMAMIT, Udupi. Current CGPA: 6.81.",
    category: "Undergraduate",
    icon: ShieldCheck,
    relatedIds: [2, 4, 5],
    status: "in-progress",
    energy: 100,
  },
  {
    id: 2,
    title: "Diploma in CSE",
    date: "2022 - 2025",
    content: "Completed Diploma in Computer Science & Engineering at NMIT Polytechnic, Bengaluru with a strong 8.42 CGPA.",
    category: "Diploma",
    icon: GraduationCap,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Class X (Secondary)",
    date: "2020 - 2021",
    content: "Graduated secondary education from Vasavi Educational Trust, VV Puram, Bengaluru with 68%.",
    category: "School",
    icon: BookOpen,
    relatedIds: [2],
    status: "completed",
    energy: 75,
  },
  {
    id: 4,
    title: "Technical Co-Head @ ACM",
    date: "2025 - PRESENT",
    content: "Leading technical operations, organizing hackathons, conducting technical workshops, and mentoring student developers in ACM NMAMIT.",
    category: "Leadership",
    icon: Users,
    relatedIds: [1, 5],
    status: "in-progress",
    energy: 100,
  },
  {
    id: 5,
    title: "Cyber Threat Research",
    date: "2024 - PRESENT",
    content: "Active hands-on research in AI threat detection, malware reverse engineering, and defensive architecture.",
    category: "Specialization",
    icon: Award,
    relatedIds: [1, 4],
    status: "in-progress",
    energy: 95,
  },
];

export default function Education() {
  return (
    <section id="education" className="min-h-screen py-16 relative overflow-hidden bg-black/60 flex flex-col justify-center">
      {/* Header Info */}
      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center mb-6">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-3 flex justify-center gap-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-cyan-400 to-teal-400">
            <DecryptedText text="Academic" animateOn="view" />
          </span>
          <DecryptedText text="Orbit" animateOn="view" />
        </h2>
        <p className="text-cyan-400/80 font-mono tracking-widest text-xs uppercase">
          [ MISSION_PROFILE // ORBITAL_EDUCATION_TIMELINE ]
        </p>
        <p className="text-gray-500 font-mono text-[11px] mt-2">
          Click any satellite node to pause orbit and inspect academic clearance dossiers
        </p>
      </div>

      {/* Radial Orbital Interactive Timeline */}
      <div className="w-full relative z-10">
        <RadialOrbitalTimeline timelineData={educationTimelineData} />
      </div>
    </section>
  );
}
