import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  User,
  GraduationCap,
  MapPin,
  Code2,
  Check,
  Trophy,
} from "lucide-react";

const colorClasses: Record<string, string> = {
  orange: "bg-cyan-500",
  blue: "bg-cyan-500", // formerly blue
  cyan: "bg-cyan-500", // formerly cyan
  pink: "bg-cyan-500", // formerly pink
  yellow: "bg-cyan-500", // formerly yellow
  green: "bg-cyan-500", // formerly green
};

export const AboutView = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
        {/* Top Card: Profile & Bio */}
        <div className="glass-panel border border-slate-700 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row">
            {/* Left: Identity */}
            <div className="md:w-1/3 p-8 flex flex-col items-center border-r border-slate-700 bg-slate-900/30">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full opacity-0"></div>
                <div className="relative w-44 h-44 rounded-full border border-cyan-500 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-slate-800">
                  <img
                    src="/screenshots/profile-avatar.png"
                    alt="Pranav Arun"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110 shrink-0 rounded-full"
                    style={{ willChange: "transform" }}
                  />
                </div>
              </div>

              <h2 className="mt-8 text-3xl font-bold text-white text-center">
                Pranav Arun
              </h2>
              <p className="text-cyan-500 font-semibold mt-1">
                Full Stack Developer
              </p>

              <div className="flex gap-3 mt-8">
                <a
                  href="https://github.com/toxicbishop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 btn-ghost-cyber rounded-xl hover:text-cyan-400 text-slate-300 transition-colors">
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/pranav-arun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 btn-ghost-cyber rounded-xl hover:text-cyan-400 text-slate-300 transition-colors">
                  <Linkedin size={20} />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("pranavarun19@gmail.com");
                    setEmailCopied(true);
                    setTimeout(() => setEmailCopied(false), 2000);
                  }}
                  className="relative p-3 btn-ghost-cyber rounded-xl hover:text-cyan-400 text-slate-300 transition-colors">
                  {emailCopied ? <Check size={20} /> : <Mail size={20} />}
                  {emailCopied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg animate-fade-in-up whitespace-nowrap z-10">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Biography & Info */}
            <div className="md:w-2/3 p-8 md:p-12 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="text-cyan-500" /> About Me
                </h3>
                <p className="text-slate-400 font-code leading-relaxed text-lg">
                  Hello! I'm a passionate developer currently pursuing my B.E.
                  in Computer Science & Business Systems at{" "}
                  <strong className="text-white">
                    KSSEM (K.S. School of Engineering and Management)
                  </strong>
                  , Bengaluru.
                </p>
                <p className="text-slate-400 font-code leading-relaxed">
                  My journey in tech is driven by an insatiable curiosity for
                  how things work under the hood. I built{" "}
                  <strong className="text-white">
                    DSA Study Hub
                  </strong>{" "}
                  to bridge the gap between complex algorithms and intuitive
                  learning. Whether it's pathfinding visualizations or dynamic
                  programming breakdowns, I believe technology should make
                  learning accessible and engaging for everyone.
                </p>
                <div className="pt-2">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Professional Background
                  </h4>
                  <p className="text-slate-400 font-code leading-relaxed mb-3">
                    Dedicated to bridging the gap between theoretical computer
                    science and practical software implementation. My focus lies
                    in developing efficient algorithms and making complex data
                    structures intuitive for the next generation of engineers.
                  </p>
                  <p className="text-slate-400 font-code leading-relaxed">
                    Currently pursuing specialized research in Computer Science
                    and Business Systems, focusing on the intersection of
                    algorithmic efficiency and enterprise scalability.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4 p-4 glass-panel border border-slate-700 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all cursor-pointer">
                  <div className="p-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                      Degree
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      B.E in CS&BS
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 glass-panel border border-slate-700 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all cursor-pointer">
                  <div className="p-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                      Location
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      Bengaluru, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Skills & Tech */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 glass-panel border border-slate-700 rounded-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Code2 className="text-cyan-500" /> Technical Arsenal
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "C Language", level: "90%", color: "cyan" },
                { name: "React", level: "85%", color: "blue" },
                { name: "TypeScript", level: "80%", color: "blue" },
                { name: "Tailwind CSS", level: "95%", color: "cyan" },
                { name: "Data Structures", level: "90%", color: "cyan" },
                { name: "Algorithms", level: "85%", color: "pink" },
                { name: "Python", level: "75%", color: "yellow" },
                { name: "Node.js", level: "70%", color: "green" },
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 glass-panel border border-slate-700 rounded-xl text-center group hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                    {skill.name}
                  </p>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700 mt-3">
                    <div
                      className={`h-full ${colorClasses[skill.color] || "bg-cyan-500"} transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.8)]`}
                      style={{ width: skill.level }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 glass-panel border border-slate-700 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="relative">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy size={24} className="text-cyan-500" /> Goals
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="mt-1 flex-shrink-0 text-cyan-500"
                  />
                  <p className="text-sm text-slate-400 font-code">
                    Mastering Advanced Graph Traversal logic.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="mt-1 flex-shrink-0 text-cyan-500"
                  />
                  <p className="text-sm text-slate-400 font-code">
                    Building more intuitive System Design breakdowns.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="mt-1 flex-shrink-0 text-cyan-500"
                  />
                  <p className="text-sm text-slate-400 font-code">
                    Contributing to open-source educational tools.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
