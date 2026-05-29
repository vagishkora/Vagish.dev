"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
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
    <section id="contact" className="py-24 bg-black/50 border-t border-white/5">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          <DecryptedText text="Let's Connect" animateOn="view" />
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Reach out for collaborations or opportunities.<br />
          <a href="mailto:vagishkora2003@gmail.com" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
            vagishkora2003@gmail.com
          </a>
        </p>

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
