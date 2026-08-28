"use client";

import { useState } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import DecryptedText from "./DecryptedText";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 bg-black/50 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-4">
        {/* Centered Section Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs uppercase tracking-widest backdrop-blur-md">
            <Sparkles size={12} className="text-cyan-400 animate-pulse" />
            <span>[ INITIATE_HANDSHAKE // SECURE_CHANNEL ]</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight flex justify-center items-center gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
              <DecryptedText text="Let's" animateOn="view" />
            </span>{" "}
            <span className="text-white">
              <DecryptedText text="Connect" animateOn="view" />
            </span>
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto font-mono">
            Open for collaborations, security consulting, or engineering roles.<br />
            <a href="mailto:vagishkora2003@gmail.com" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
              vagishkora2003@gmail.com
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input
              type="text"
              id="name"
              required
              suppressHydrationWarning
              className="peer w-full h-12 bg-transparent border-b-2 border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500 placeholder-transparent transition-colors"
              placeholder="Name"
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-4 text-xs text-indigo-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-indigo-400 cursor-text"
            >
              Name
            </label>
          </div>

          <div className="relative group">
            <input
              type="email"
              id="email"
              required
              suppressHydrationWarning
              className="peer w-full h-12 bg-transparent border-b-2 border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500 placeholder-transparent transition-colors"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-4 text-xs text-indigo-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-indigo-400 cursor-text"
            >
              Email
            </label>
          </div>

          <div className="relative group">
            <textarea
              id="message"
              required
              rows={4}
              suppressHydrationWarning
              className="peer w-full bg-transparent border-b-2 border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500 placeholder-transparent transition-colors resize-none py-2"
              placeholder="Message"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-0 -top-4 text-xs text-indigo-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-indigo-400 cursor-text"
            >
              Message
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            suppressHydrationWarning
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
