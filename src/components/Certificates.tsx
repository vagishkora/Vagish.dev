"use client";

import { useEffect, useState } from "react";
import DecryptedText from "./DecryptedText";
import CertificateGrid from "./CertificateGrid";
import { Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

export interface CertificateItem {
  title: string;
  issuer: string;
  key: string;
  vertical?: boolean;
  status?: string;
  view_link?: string;
}

const INITIAL_CERTIFICATES: CertificateItem[] = [
  { title: "Ethical Hacking Workshop", issuer: "Ethical Edufabrica Pvt Ltd", key: "/Vagish.dev/certificates/iicsbanglore.webp" },
  { title: "Cybersecurity Job Simulation", issuer: "Mastercard", key: "/Vagish.dev/certificates/Cybersecurity Job Simulation Mastercard_page-0001.webp" },
  { title: "Cybersecurity Analyst", issuer: "Tata", key: "/Vagish.dev/certificates/Cybersecurity Analyst Job Simulation TATA - Forage_page-0001.webp" },
  { title: "AI & Data Analytics", issuer: "AICTE", key: "/Vagish.dev/certificates/Vagish N Kora_AICTE_Certificate_page-0001.webp", vertical: true },
  { title: "Internship Completion", issuer: "Karunadu Tech", key: "/Vagish.dev/certificates/karunadu internship certificate_page-0001.webp", vertical: true },
  { title: "Data Visualization", issuer: "Accenture", key: "/Vagish.dev/certificates/accenture data_visulatization_completion_certificate_page-0001.webp" },
  { title: "Data Plus Overview", issuer: "TCS", key: "/Vagish.dev/certificates/TSC Data Plus Overview Course_page-0001.webp" },
  { title: "Hashgraph Developer", issuer: "Hedera", key: "/Vagish.dev/certificates/Vagish_Kora_Hashgraph Developer Course_certificate_page-0001.webp" },
  { title: "Career Edge", issuer: "TCS", key: "/Vagish.dev/certificates/Tcs Certificate._page-0001.webp" },
  { title: "Fundamentals of AI & ML", issuer: "Course Completion", key: "/Vagish.dev/certificates/Fundamentals of AI&ML certification_page-0001.webp" },
  { title: "AI for Metaverse", issuer: "Metaverse Cert", key: "/Vagish.dev/certificates/Introduction to AI For Metaverse Certification_page-0001.webp" },
  { title: "Info & Cyber Security", issuer: "Fundamentals", key: "/Vagish.dev/certificates/Fundamentals of Information Security-Cyber Security_page-0001.webp" },
];

export default function Certificates() {
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);

  // Fetch dynamic certificates from Supabase
  useEffect(() => {
    async function fetchCertificates() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from("certifications")
          .select("*")
          .order("order_index", { ascending: true });

        if (data && data.length > 0 && !error) {
          setCertificates(data);
        }
      } catch (err) {
        console.warn("Supabase fetch fallback to static certs:", err);
      }
    }
    fetchCertificates();
  }, []);

  return (
    <section id="certifications" className="py-28 relative overflow-hidden bg-background border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-background to-background pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center overflow-visible">
        {/* Centered Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 font-mono text-xs uppercase tracking-widest backdrop-blur-md">
            <Sparkles size={12} className="text-indigo-400 animate-pulse" />
            <span>[ ACCREDITATIONS // CLEARANCES ]</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight flex justify-center items-center gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              <DecryptedText text="Verified" animateOn="view" />
            </span>{" "}
            <span className="text-white">
              <DecryptedText text="Certifications" animateOn="view" />
            </span>
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto font-mono">
            Industry credentials from Mastercard, Tata, TCS, Accenture, and AICTE.
          </p>
        </div>

        {/* ── All Certificates (Scrollable Grid) ──────── */}
        <div className="w-full">
          <CertificateGrid certificates={certificates} />
        </div>
      </div>
    </section>
  );
}
