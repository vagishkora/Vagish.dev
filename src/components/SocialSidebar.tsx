import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function SocialSidebar() {
  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-8">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-gray-700 to-gray-700"></div>
        
        <Link
          href="https://github.com/vagishkora"
          target="_blank"
          className="text-gray-500 hover:text-pink-500 transition-all transform hover:scale-125"
        >
          <Github size={20} />
        </Link>
        
        <Link
          href="https://www.linkedin.com/in/vagish-n-kora-459149212/"
          target="_blank"
          className="text-gray-500 hover:text-pink-500 transition-all transform hover:scale-125"
        >
          <Linkedin size={20} />
        </Link>
        
        <Link
          href="https://www.instagram.com/vagish__k"
          target="_blank"
          className="text-gray-500 hover:text-pink-500 transition-all transform hover:scale-125"
        >
          <Instagram size={20} />
        </Link>
        
        <div className="w-px h-24 bg-gradient-to-t from-transparent via-gray-700 to-gray-700"></div>
      </div>

      {/* Mobile/Tablet: fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex items-center justify-center gap-8 py-3 bg-black/80 backdrop-blur-md border-t border-white/5">
        <Link
          href="https://github.com/vagishkora"
          target="_blank"
          className="text-gray-400 hover:text-pink-500 transition-all transform hover:scale-125"
        >
          <Github size={20} />
        </Link>
        
        <Link
          href="https://www.linkedin.com/in/vagish-n-kora-459149212/"
          target="_blank"
          className="text-gray-400 hover:text-pink-500 transition-all transform hover:scale-125"
        >
          <Linkedin size={20} />
        </Link>
        
        <Link
          href="https://www.instagram.com/vagish__k"
          target="_blank"
          className="text-gray-400 hover:text-pink-500 transition-all transform hover:scale-125"
        >
          <Instagram size={20} />
        </Link>
      </div>
    </>
  );
}
