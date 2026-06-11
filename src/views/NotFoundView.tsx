import React from "react";
import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export const NotFoundView = () => {
  return (
    <main className="min-h-[85vh] flex flex-col items-center justify-center p-6 pt-28 pb-12 text-center relative z-10 overflow-hidden">
      {/* Background decorations specific to 404 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] -z-10" />

      {/* Main Content */}
      <div className="glass-panel p-10 md:p-16 rounded-2xl border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)] relative max-w-2xl w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 animate-pulse">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Glitch text effect container */}
        <div className="relative inline-block mb-4">
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600 font-code tracking-tighter drop-shadow-lg">
            404
          </h1>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-wide">
          SYSTEM BREACH: <span className="text-cyan-400">PAGE NOT FOUND</span>
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
          The coordinates you entered lead to an empty sector. The data you're looking for has either been moved, deleted, or never existed in this timeline.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-cyber flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto text-lg font-bold">
            <Home size={20} />
            Return to Base
          </Link>
          <Link href="/program/1" className="px-8 py-4 w-full sm:w-auto rounded-lg font-bold border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 transition-all duration-300 text-lg text-center">
            View Programs
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex justify-center gap-4 text-sm text-slate-500 font-code">
          <span>ERR_CODE: 0x00000194</span>
          <span>•</span>
          <span>STATUS: OFFLINE</span>
        </div>
      </div>
    </main>
  );
};
