import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Code2, User, ChevronDown, Cpu, X, Menu, Search, Bug, BookOpen, Route, ArrowUpDown, GitFork, Package, Monitor } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { programsData } from "../data/programs";
import { GoogleAuth, GoogleUser } from "./GoogleAuth";

interface NavbarProps {
  resetProgramState: () => void;
  toggleAdminModal: () => void;
  completedPrograms: string[];
  user?: GoogleUser | null;
  onLogin?: (user: GoogleUser) => void;
  onLogout?: () => void;
}

const programGroups = [
  {
    title: "Linear Data Structures",
    color: "text-sky-400",
    borderColor: "border-sky-500/30",
    bgColor: "bg-sky-500/5",
    dotColor: "bg-sky-400",
    items: [
      { name: "program1",  label: "Weekly Activity Calendar",     desc: "Array ops & dynamic memory" },
      { name: "program2",  label: "String Pattern Matching",       desc: "Pattern match & replace" },
      { name: "program3",  label: "Stack & Palindromes",           desc: "Push, pop, palindrome check" },
      { name: "program4",  label: "Infix → Postfix Conversion",    desc: "Operator precedence stack" },
      { name: "program5a", label: "Postfix Evaluator",             desc: "Stack-based evaluation" },
      { name: "program5b", label: "Tower of Hanoi",                desc: "Recursive peg movement" },
      { name: "program6",  label: "Circular Queue",                desc: "Insert, delete, overflow" },
    ],
  },
  {
    title: "Linked Lists",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
    dotColor: "bg-emerald-400",
    items: [
      { name: "program7", label: "Singly Linked List (SLL)",         desc: "Node insert, delete, traverse" },
      { name: "program8", label: "Doubly Linked List (DLL)",         desc: "Bidirectional insert & delete" },
      { name: "program9", label: "Circular Linked List",             desc: "Polynomial eval & addition" },
    ],
  },
  {
    title: "Non-Linear Structures",
    color: "text-violet-400",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/5",
    dotColor: "bg-violet-400",
    items: [
      { name: "program10", label: "Binary Search Tree (BST)",  desc: "In/Pre/Post traversal & search" },
      { name: "program11", label: "Graph BFS / DFS",           desc: "Adjacency matrix traversal" },
      { name: "program12", label: "Hash Table Resolution",     desc: "Linear probing collision fix" },
    ],
  },
];

/* ─────────── Nav Link Button ─────────── */
const NavLink: React.FC<{
  onClick?: () => void;
  href?: string;
  isActive: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  hasArrow?: boolean;
  arrowOpen?: boolean;
  id?: string;
}> = ({ onClick, href, isActive, icon, children, hasArrow, arrowOpen, id }) => {
  const content = (
    <button
      id={id}
      onClick={onClick}
      className={`group flex items-center gap-1.5 px-2 py-2 rounded-lg font-code text-[10px] xl:text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer select-none ${
        isActive
          ? "bg-cyan-500/10 border border-cyan-500/35 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
          : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
      }`}
    >
      <span className={`transition-colors duration-200 ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`}>
        {icon}
      </span>
      {children}
      {hasArrow && (
        <ChevronDown
          size={11}
          className={`ml-0.5 transition-transform duration-200 ${arrowOpen ? "rotate-180 text-cyan-400" : ""}`}
        />
      )}
    </button>
  );

  if (href) {
    return <Link href={href} onClick={onClick}>{content}</Link>;
  }
  return content;
};

export const Navbar = ({ resetProgramState, toggleAdminModal, completedPrograms, user, onLogin, onLogout }: NavbarProps) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const { id } = router.query;
  const activeProgram = typeof id === "string" ? id : null;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsProgramsOpen(false);
      }
      if (modulesRef.current && !modulesRef.current.contains(e.target as Node)) {
        setIsModulesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setIsProgramsOpen(false);
    setIsModulesOpen(false);
  }, [router.asPath]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#070B14]/90 backdrop-blur-xl border-b border-cyan-500/[0.12] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between gap-4">

            {/* ── Logo ── */}
            <Link href="/" onClick={resetProgramState} className="flex items-center gap-2.5 group shrink-0 cursor-pointer">
              <div className="relative w-8 h-8 rounded-lg flex items-center justify-center border border-cyan-500/40 bg-cyan-500/10 group-hover:border-cyan-400/70 group-hover:bg-cyan-500/20 transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <Cpu size={15} className="text-cyan-400" />
              </div>
              <div className="flex items-baseline gap-0">
                <span className="font-display text-xs font-bold tracking-[0.15em] text-white group-hover:text-cyan-300 transition-colors duration-200">
                  DSA
                </span>
                <span className="font-display text-xs font-bold tracking-[0.1em] text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">
                  ://
                </span>
                <span className="font-display text-xs font-bold tracking-[0.15em] text-white group-hover:text-cyan-300 transition-colors duration-200">
                  HUB
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex flex-nowrap items-center gap-0.5 lg:gap-1 relative">
              <NavLink href="/" isActive={router.pathname === "/"} icon={<Home size={13} />}>
                Home
              </NavLink>

              {/* Programs with dropdown */}
              <div ref={menuRef} className="relative">
                <NavLink
                  id="nav-programs-btn"
                  onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                  isActive={router.pathname.startsWith("/program")}
                  icon={<Code2 size={13} />}
                  hasArrow
                  arrowOpen={isProgramsOpen}
                >
                  Programs
                </NavLink>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {isProgramsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[820px] max-w-[95vw] rounded-2xl overflow-hidden"
                      style={{
                        background: "rgba(9, 14, 26, 0.97)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(6,182,212,0.18)",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(6,182,212,0.06), 0 0 40px rgba(6,182,212,0.05)",
                      }}
                    >
                      {/* Dropdown Header */}
                      <div className="px-6 py-4 flex items-center justify-between border-b border-cyan-500/10">
                        <div>
                          <p className="font-display text-[10px] tracking-[0.2em] text-cyan-400 uppercase mb-0.5">
                            Laboratory Modules
                          </p>
                          <p className="text-xs text-slate-500">
                            Select a module to view C implementation + interactive visualizer
                          </p>
                        </div>
                        <span className="neon-badge text-[10px]">12 Programs</span>
                      </div>

                      {/* Program Grid */}
                      <div className="p-6 grid grid-cols-3 gap-6">
                        {programGroups.map((group) => (
                          <div key={group.title}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-1.5 h-1.5 rounded-full ${group.dotColor}`} />
                              <h4 className={`font-code text-[9px] font-bold tracking-[0.18em] uppercase ${group.color}`}>
                                {group.title}
                              </h4>
                            </div>
                            <div className="space-y-1.5">
                              {group.items.map((item) => {
                                const isActive = activeProgram === item.name;
                                const pData = programsData.find(p => p.id === item.name);
                                return (
                                  <Link
                                    key={item.name}
                                    href={`/program/${item.name}`}
                                    onClick={() => setIsProgramsOpen(false)}
                                    className={`w-full block text-left px-3 py-2.5 rounded-xl border transition-all duration-150 cursor-pointer group/item ${
                                      isActive
                                        ? `${group.bgColor} ${group.borderColor}`
                                        : "border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]"
                                    }`}
                                  >
                                    <span className={`font-code text-[9px] font-bold tracking-widest uppercase block mb-0.5 ${
                                      isActive ? group.color : "text-slate-600 group-hover/item:text-slate-400"
                                    }`}>
                                      {pData ? pData.name : item.name.toUpperCase()}
                                    </span>
                                    <span className={`text-xs font-medium block leading-tight ${
                                      isActive ? "text-slate-200" : "text-slate-400 group-hover/item:text-slate-300"
                                    }`}>
                                      {item.label}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modules Dropdown */}
              <div ref={modulesRef} className="relative">
                <NavLink
                  id="nav-modules-btn"
                  onClick={() => setIsModulesOpen(!isModulesOpen)}
                  isActive={router.pathname.startsWith("/module")}
                  icon={<BookOpen size={13} />}
                  hasArrow
                  arrowOpen={isModulesOpen}
                >
                  Notes
                </NavLink>
                <AnimatePresence>
                  {isModulesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden"
                      style={{
                        background: "rgba(9, 14, 26, 0.97)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(6,182,212,0.18)",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.65)",
                      }}
                    >
                      <div className="p-2 space-y-1">
                        {[1, 2, 3, 4, 5].map((mod) => (
                          <Link
                            key={mod}
                            href={`/module/${mod}`}
                            onClick={() => setIsModulesOpen(false)}
                            className="w-full block text-left px-3 py-2.5 rounded-lg border border-transparent transition-all duration-150 hover:bg-white/[0.04] hover:border-white/[0.06] group/mod"
                          >
                            <span className="font-code text-xs font-bold tracking-widest text-slate-300 group-hover/mod:text-cyan-300">
                              MODULE {mod}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink href="/knapsack" isActive={router.pathname === "/knapsack"} icon={<Package size={13} />}>
                Knapsack
              </NavLink>

              <NavLink href="/visualizer" isActive={router.pathname === "/visualizer"} icon={<Route size={13} />}>
                PathFinder
              </NavLink>

              <NavLink href="/sorting" isActive={router.pathname === "/sorting"} icon={<ArrowUpDown size={13} />}>
                Sorter
              </NavLink>

              <NavLink href="/tree-graph" isActive={router.pathname === "/tree-graph"} icon={<GitFork size={13} />}>
                Trees
              </NavLink>

              <NavLink href="/system-design" isActive={router.pathname === "/system-design"} icon={<Monitor size={13} />}>
                System Design
              </NavLink>

              <NavLink href="/about" isActive={router.pathname === "/about"} icon={<User size={13} />}>
                About me
              </NavLink>

              <NavLink href="/report" isActive={router.pathname === "/report"} icon={<Bug size={13} />}>
                Report Bug
              </NavLink>
            </div>

            {/* ── Right Status Badge + Mobile Hamburger ── */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Status indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/[0.18] bg-cyan-500/[0.04] cursor-pointer hover:bg-cyan-500/10 transition-colors" onClick={toggleAdminModal}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-code text-[9px] tracking-[0.2em] text-cyan-400/60 uppercase">Lab v2.0</span>
              </div>

              {onLogin && onLogout && (
                <div className="flex items-center">
                  <GoogleAuth
                    user={user || null}
                    onLogin={onLogin}
                    onLogout={onLogout}
                    hideTrigger={false}
                  />
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all duration-200"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden overflow-hidden border-t border-cyan-500/10"
              style={{
                background: "rgba(7, 11, 20, 0.98)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div className="px-5 py-4 space-y-1">
                <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent">
                  <Home size={14} /> Home
                </Link>

                {/* Mobile Programs */}
                <div className="space-y-1 pt-3">
                  <p className="font-code text-[9px] tracking-[0.2em] uppercase text-slate-600 px-2 pb-1">Laboratory Modules</p>
                  {programGroups.map((group) => (
                    <div key={group.title} className="mb-3">
                      <p className={`font-code text-[9px] tracking-[0.15em] uppercase px-2 py-1 ${group.color}`}>
                        {group.title}
                      </p>
                      {group.items.map((item) => {
                        const pData = programsData.find(p => p.id === item.name);
                        return (
                          <Link
                            href={`/program/${item.name}`}
                            key={item.name}
                            className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                              activeProgram === item.name
                                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/25"
                                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                            }`}
                          >
                            <span className="font-code text-[9px] tracking-wider text-slate-600 w-16 shrink-0">{pData ? pData.name : item.name.toUpperCase()}</span>
                            <span className="text-xs">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Mobile Notes */}
                <div className="space-y-1 pt-2 border-b border-cyan-500/10 pb-3">
                  <p className="font-code text-[9px] tracking-[0.2em] uppercase text-slate-600 px-2 pb-1">Notes</p>
                  {[1, 2, 3, 4, 5].map((mod) => (
                    <Link
                      key={mod}
                      href={`/module/${mod}`}
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                    >
                      <span className="font-code text-[9px] tracking-wider text-slate-600 w-16 shrink-0">MOD {mod}</span>
                      <span className="text-xs">Module {mod}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Visualizers */}
                <div className="space-y-1 pt-2 border-b border-cyan-500/10 pb-3">
                  <p className="font-code text-[9px] tracking-[0.2em] uppercase text-slate-600 px-2 pb-1">Visualizers</p>
                  <Link href="/knapsack" className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent">
                    <Package size={14} /> Knapsack
                  </Link>
                  <Link href="/visualizer" className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent">
                    <Route size={14} /> PathFinder
                  </Link>
                  <Link href="/sorting" className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent">
                    <ArrowUpDown size={14} /> Sorter
                  </Link>
                  <Link href="/tree-graph" className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent">
                    <GitFork size={14} /> Trees
                  </Link>
                  <Link href="/system-design" className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent">
                    <Monitor size={14} /> System Design
                  </Link>
                </div>

                <Link href="/about" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent">
                  <User size={14} /> About me
                </Link>

                <Link href="/report" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent">
                  <Bug size={14} /> Report Bug
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
