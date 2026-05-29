import DecryptedText from "./DecryptedText";

export default function About() {
  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-100">
        <DecryptedText text="Target Profile" animateOn="view" />
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            I am Vagish N Kora, a 19-year-old software engineer and cybersecurity enthusiast with a deep passion for building secure, scalable, and intelligent systems.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            My expertise lies in integrating artificial intelligence with robust web architectures, ensuring zero-day resilience while maintaining a seamless user experience. I thrive in high-stakes environments where cryptography meets performance.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-md backdrop-blur-sm">
              <div className="text-indigo-400 font-mono text-sm uppercase tracking-wider mb-1">Clearance Level</div>
              <div className="text-xl font-bold text-white">Top Secret / SCI</div>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-md backdrop-blur-sm">
              <div className="text-pink-400 font-mono text-sm uppercase tracking-wider mb-1">Known Aliases</div>
              <div className="text-xl font-bold text-white">"V" / "Interceptor"</div>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-md backdrop-blur-sm">
              <div className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-1">Status</div>
              <div className="text-xl font-bold text-white">Active Duty</div>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
          <div className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 font-mono text-xs text-gray-400">profile_data.sys</div>
            </div>
            <div className="p-6 font-mono text-sm text-gray-300 space-y-2">
              <div><span className="text-indigo-400">const</span> <span className="text-blue-300">target</span> = {'{'}</div>
              <div className="pl-4"><span className="text-cyan-300">designation:</span> <span className="text-green-300">"Vagish N Kora"</span>,</div>
              <div className="pl-4"><span className="text-cyan-300">age:</span> <span className="text-orange-300">19</span>,</div>
              <div className="pl-4"><span className="text-cyan-300">location:</span> <span className="text-green-300">"[REDACTED]"</span>,</div>
              <div className="pl-4"><span className="text-cyan-300">specialty:</span> [<span className="text-green-300">"Full-Stack"</span>, <span className="text-green-300">"CyberSec"</span>, <span className="text-green-300">"AI"</span>],</div>
              <div className="pl-4"><span className="text-cyan-300">threatLevel:</span> <span className="text-orange-300">9000</span></div>
              <div>{'}'};</div>
              <div className="pt-4 text-gray-500">// System ready...</div>
              <div className="animate-pulse text-indigo-400">_</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
