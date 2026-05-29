import DecryptedText from "./DecryptedText";
import Image from "next/image";

export default function Skills() {
  const skills = [
    { id: "SYS_01", name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { id: "SYS_02", name: "C Programming", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { id: "SYS_03", name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { id: "SYS_04", name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { id: "SYS_05", name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { id: "SYS_06", name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { id: "SYS_07", name: "HTML5 / CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { id: "SYS_08", name: "MySQL", icon: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg" },
    { id: "SYS_09", name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { id: "SYS_10", name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { id: "SYS_11", name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { id: "SYS_12", name: "Wireshark", icon: "https://www.vectorlogo.zone/logos/wireshark/wireshark-icon.svg" },
    { id: "SYS_13", name: "SQL Injection", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqldeveloper/sqldeveloper-original.svg" },
    { id: "SYS_14", name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { id: "SYS_15", name: "Supabase", icon: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" }
  ];

  return (
    <section id="skills" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-100">
        <DecryptedText text="Technical Arsenal" animateOn="view" />
      </h2>
      
      <div suppressHydrationWarning className="cyber-terminal w-full max-w-4xl mx-auto bg-black/90 border border-cyan-500/20 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)] font-mono relative">
        {/* Terminal Scanline Background */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10"></div>
        
        {/* Terminal Header */}
        <div className="bg-[#141419] px-4 py-3 flex items-center border-b border-cyan-500/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-cyan-400 ml-5 text-xs tracking-[2px] uppercase drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
            root@interceptor:~# ./view_skills.sh
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-fuchsia-500 text-lg mb-4 drop-shadow-[0_0_8px_rgba(255,0,255,0.6)] flex items-center gap-2 before:content-['>'] before:text-cyan-400">
              Core Capabilities
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="group relative bg-cyan-500/5 border border-cyan-500/10 p-3 flex flex-col items-center gap-3 text-white text-xs transition-all duration-300 overflow-hidden rounded hover:bg-cyan-500/15 hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:-translate-y-0.5 hover:text-cyan-400"
                >
                  {/* Sweep Animation Effect */}
                  <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent group-hover:left-full transition-all duration-500 ease-out"></div>
                  
                  <Image 
                    src={skill.icon} 
                    alt={skill.name} 
                    width={32}
                    height={32}
                    className="w-8 h-8 filter grayscale brightness-150 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100" 
                  />
                  <span className="font-mono text-[10px] tracking-wider relative z-10">{skill.name}</span>
                  
                  {/* Schematic ID */}
                  <span className="absolute bottom-1 right-1 text-[8px] text-white/20">{skill.id}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-gray-400 text-sm flex items-center mt-6">
            <span className="text-green-400 mr-2">interceptor@sys:~$</span> _
            <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-[blink_1s_step-end_infinite]"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
