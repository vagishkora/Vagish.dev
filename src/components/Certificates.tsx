"use client";

import DecryptedText from "./DecryptedText";
import CertificateGrid from "./CertificateGrid";

export default function Certificates() {
  const certificates = [
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

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-background border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-background to-background pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center overflow-visible">
        <h2 className="text-4xl font-extrabold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            <DecryptedText text="Certifications" animateOn="view" />
          </span>
        </h2>

        {/* ── All Certificates (Scrollable Grid) ──────── */}
        <div className="w-full">
          <CertificateGrid certificates={certificates} />
        </div>
      </div>
    </section>
  );
}
