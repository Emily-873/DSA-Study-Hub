import React, { useEffect, useState } from "react";
import { Cpu } from "lucide-react";

const bootLines = [
  "Initializing runtime modules...",
  "Loading data structure engine...",
  "Mounting visualizer subsystems...",
  "Calibrating algorithm cores...",
  "System ready.",
];

const Loader: React.FC = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, bootLines.length - 1));
      setProgress((p) => Math.min(p + 20, 100));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070B14] overflow-hidden">

      {/* Animated cyber grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "grid-move 25s linear infinite",
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Logo icon */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-2xl blur-xl"
            style={{ background: "rgba(6,182,212,0.2)", animation: "pulse-cyan 2s ease-in-out infinite" }}
          />
          <div
            className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(13,20,36,0.9)",
              border: "1px solid rgba(6,182,212,0.4)",
              boxShadow: "0 0 30px rgba(6,182,212,0.2)",
            }}
          >
            <Cpu size={36} className="text-cyan-400" style={{ animation: "spin-slow 8s linear infinite" }} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-black tracking-[0.15em] text-white mb-1">
            DSA<span className="text-cyan-400">://</span>STUDY HUB
          </h1>
          <p className="font-code text-[10px] tracking-[0.3em] text-cyan-500/60 uppercase">
            Interactive Learning Platform
          </p>
        </div>

        {/* Boot terminal */}
        <div
          className="w-72 rounded-xl overflow-hidden"
          style={{
            background: "rgba(6,10,20,0.9)",
            border: "1px solid rgba(6,182,212,0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Terminal title bar */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ borderBottom: "1px solid rgba(6,182,212,0.08)", background: "rgba(6,182,212,0.04)" }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            </div>
            <span className="font-code text-[9px] text-slate-600 tracking-wider">boot.sys</span>
          </div>

          {/* Boot lines */}
          <div className="px-4 py-3 space-y-1.5 min-h-[80px]">
            {bootLines.slice(0, lineIndex + 1).map((line, i) => (
              <p key={i} className="font-code text-[10px] text-cyan-400/70 flex items-start gap-2">
                <span className="text-cyan-600 shrink-0">›</span>
                <span>{line}</span>
              </p>
            ))}
            {/* Cursor */}
            <span
              className="inline-block w-[6px] h-[11px] bg-cyan-400 ml-4"
              style={{ animation: "flicker 0.8s step-end infinite" }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-72 space-y-2">
          <div
            className="w-full h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.15)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #06B6D4, #22D3EE)",
                boxShadow: "0 0 8px rgba(6,182,212,0.6)",
              }}
            />
          </div>
          <div className="flex justify-between">
            <span className="font-code text-[9px] text-slate-700 tracking-wider uppercase">Loading</span>
            <span className="font-code text-[9px] text-cyan-600">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
