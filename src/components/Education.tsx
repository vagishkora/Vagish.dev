"use client";
import DecryptedText from "./DecryptedText";

export default function Education() {
  const nodes = [
    {
      date: "AUG 2025 - 2028",
      ongoing: true,
      title: "B.Tech in CSE (Cybersecurity)",
      school: "NMAMIT, Udupi",
      scoreType: "CGPA",
      score: "6.81"
    },
    {
      date: "2022 - 2025",
      ongoing: false,
      title: "Diploma in CSE",
      school: "NMIT Polytechnic, Yelahanka, Bengaluru",
      scoreType: "CGPA",
      score: "8.42"
    },
    {
      date: "2020 - 2021",
      ongoing: false,
      title: "Class X",
      school: "Vasavi Educational Trust VV Puram, Bengaluru",
      scoreType: "Score",
      score: "68%"
    }
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4 flex justify-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-500">
              <DecryptedText text="Academic" animateOn="view" />
            </span>
            <DecryptedText text="Intel" animateOn="view" />
          </h2>
          <p className="text-gray-400 font-mono tracking-widest text-xs uppercase">MISSION_PROFILE // EDUCATION_TIMELINE</p>
        </div>

        <div className="relative max-w-4xl mx-auto py-10">
          {/* Timeline Trace */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-indigo-500 to-teal-500 md:-translate-x-1/2 opacity-50 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>

          {/* Timeline Nodes */}
          {nodes.map((node, i) => (
            <div key={i} className={`relative w-full mb-16 flex items-center ${i % 2 === 0 ? 'justify-end' : 'justify-start'} group`}>
              
              {/* Glowing Orbit Point */}
              <div className="absolute left-4 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10 transition-transform group-hover:scale-125"></div>
              
              {/* Node Content */}
              <div className="w-[calc(100%-3rem)] ml-12 md:ml-0 md:w-[45%] bg-zinc-900/80 border border-white/10 p-6 relative backdrop-blur-md transition-all duration-300 group-hover:border-indigo-500 group-hover:shadow-[0_10px_30px_rgba(99,102,241,0.1)] group-hover:-translate-y-1">
                
                {/* Connector Line (Desktop) */}
                <div className={`hidden md:block absolute top-1/2 w-[11.11%] h-px bg-indigo-500/50 ${i % 2 === 0 ? '-left-[11.11%]' : '-right-[11.11%]'}`}></div>
                
                {/* Connector Line (Mobile) */}
                <div className="md:hidden absolute top-1/2 -left-6 w-6 h-px bg-indigo-500/50"></div>

                {/* Corner Accents */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-indigo-500/50"></div>
                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-indigo-500/50"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-indigo-500/50"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-indigo-500/50"></div>

                <span className={`font-mono text-xs mb-2 block ${i === 0 ? 'text-teal-500' : 'text-indigo-500'}`}>
                  {node.date} {node.ongoing && <span className="text-cyan-400 ml-2">[ONGOING]</span>}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{node.title}</h3>
                <h4 className="text-gray-400 text-sm mb-4">{node.school}</h4>
                <div className="flex items-center gap-4 mt-4">
                  <div className="bg-indigo-500/20 border border-indigo-500/50 px-3 py-1 rounded-sm">
                    <span className="font-mono text-xs text-indigo-400">{node.scoreType}: </span>
                    <span className="font-mono text-sm font-bold text-white">{node.score}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
