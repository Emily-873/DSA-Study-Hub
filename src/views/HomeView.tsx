import React, { useEffect, useState } from "react";
import { ArrowRight, Code2, Layers, GitBranch, Zap, Cpu, User } from "lucide-react";
import { useRouter } from "next/router";
import { InteractiveRoadmap } from "../components/InteractiveRoadmap";

interface HomeViewProps {
  navigateTo: (view: string) => void;
  isNotesOpen: boolean;
  setIsNotesOpen: (val: boolean) => void;
  completedPrograms: string[];
  handleProgramClick: (name: string) => void;
}

const stats = [
  { value: "12", label: "Programs",    icon: <Layers size={14} /> },
  { value: "6",  label: "DS Types",   icon: <GitBranch size={14} /> },
  { value: "RT", label: "Visualizers", icon: <Zap size={14} /> },
];



/* Typewriter hook */
function useTypewriter(text: string, speed = 40, startDelay = 900) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

export const HomeView = ({ navigateTo, completedPrograms = [] }: HomeViewProps) => {
  const router = useRouter();
  
  const { displayed, done } = useTypewriter(
    "Visualize, implement & master core CS fundamentals in real-time.",
    38,
    1000
  );

  return (
    <main className="min-h-screen bg-cyber">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">

        {/* Terminal badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/22 bg-cyan-500/[0.05] mb-10 animate-fade-in"
          style={{ animationFillMode: "both" }}
        >
          <Cpu size={12} className="text-cyan-400" />
          <span className="font-code text-[10px] tracking-[0.25em] text-cyan-400 uppercase">
            Interactive DSA Laboratory
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h1
            className="font-display font-black leading-[0.9] tracking-tight mb-2 animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <span
              className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.12)" }}
            >
              MASTER
            </span>
            <span
              className="block text-gradient-cyan text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mt-1"
              style={{ filter: "drop-shadow(0 0 20px rgba(6,182,212,0.3))" }}
            >
              DATA STRUCTURES
            </span>
          </h1>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] text-slate-500 mt-3 animate-fade-in-up"
            style={{ animationDelay: "0.22s", animationFillMode: "both" }}
          >
            &amp;&nbsp;ALGORITHMS
          </h2>
        </div>

        {/* Typewriter line */}
        <div
          className="flex items-center justify-center gap-2.5 mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.38s", animationFillMode: "both" }}
        >
          <span className="font-code text-cyan-500/60 text-sm select-none">{">"}</span>
          <p className="font-code text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed">
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-0.5 align-middle"
                style={{ animation: "flicker 0.8s step-end infinite" }}
              />
            )}
          </p>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm"
            >
              <span className="text-cyan-500/80">{s.icon}</span>
              <span className="font-display text-sm font-bold text-white">{s.value}</span>
              <span className="font-code text-[10px] text-slate-500 tracking-wider uppercase">{s.label}</span>
            </div>
          ))}
          <div className="hidden sm:flex flex-wrap gap-1.5 pl-1">
            {["Stacks", "Queues", "Trees", "Graphs", "Hash Tables"].map((tag) => (
              <span
                key={tag}
                className="font-code text-[9px] tracking-widest text-slate-700 border border-slate-800 rounded px-2 py-0.5 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.62s", animationFillMode: "both" }}
        >
          <button
            onClick={() => document.getElementById('nav-programs-btn')?.click()}
            className="btn-cyber group relative overflow-hidden px-7 py-3 text-[11px]"
          >
            <Code2 size={14} className="shrink-0" />
            Explore Programs
            <ArrowRight size={13} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent group-hover:translate-x-full transition-transform duration-500 pointer-events-none" />
          </button>

          <button
            onClick={() => router.push('/about')}
            className="btn-ghost-cyber px-7 py-3 text-[11px]"
          >
            <User size={14} className="shrink-0" />
            About Developer
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "1.3s", animationFillMode: "both" }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
          <span className="font-code text-[9px] tracking-[0.3em] text-slate-700 uppercase">scroll</span>
        </div>
      </div>
      </section>

      {/* Interactive Roadmap Section */}
      <InteractiveRoadmap completedPrograms={completedPrograms} />
    </main>
  );
};
