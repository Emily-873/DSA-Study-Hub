import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Lock, Code2, Route, GitBranch, ArrowUpDown, Network, Package, Database } from 'lucide-react';
import { useRouter } from 'next/router';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  requiredPrograms: string[]; // Programs needed to unlock this
  side: 'left' | 'right';
}

const roadmapNodes: RoadmapNode[] = [
  {
    id: 'arrays',
    title: 'Arrays & Strings',
    description: 'Master memory allocation, pointers, and pattern matching.',
    icon: <Code2 size={20} />,
    route: '/program/program1',
    requiredPrograms: [],
    side: 'left'
  },
  {
    id: 'stacks',
    title: 'Stacks & Queues',
    description: 'LIFO & FIFO logic. Solve Hanoi, Postfix, and Buffers.',
    icon: <Database size={20} />,
    route: '/program/program3',
    requiredPrograms: ['program1', 'program2'], // Example: req array basics
    side: 'right'
  },
  {
    id: 'linked_lists',
    title: 'Linked Lists',
    description: 'Dynamic data, SLL, DLL, and Circular structures.',
    icon: <Network size={20} />,
    route: '/program/program7',
    requiredPrograms: ['program3', 'program6'], // Req stack/queue basics
    side: 'left'
  },
  {
    id: 'trees',
    title: 'Trees & BST',
    description: 'Hierarchical data and fast searching.',
    icon: <GitBranch size={20} />,
    route: '/tree-graph',
    requiredPrograms: ['program7', 'program8'], // Req linked list basics
    side: 'right'
  },
  {
    id: 'graphs',
    title: 'Graph Traversal',
    description: 'BFS/DFS and adjacency matrices.',
    icon: <Route size={20} />,
    route: '/visualizer', // Pathfinding uses graphs
    requiredPrograms: ['program10'], // Req BST
    side: 'left'
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Organize data efficiently. Quick, Merge, Heap.',
    icon: <ArrowUpDown size={20} />,
    route: '/sorting',
    requiredPrograms: [], // Usually can be learned independently
    side: 'right'
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Optimize with Knapsack and subproblems.',
    icon: <Package size={20} />,
    route: '/knapsack',
    requiredPrograms: ['program11'], // Advanced
    side: 'left'
  },
];

interface InteractiveRoadmapProps {
  completedPrograms: string[];
}

export const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({ completedPrograms }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Scroll progress for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate if a node is unlocked
  const isNodeUnlocked = (reqs: string[]) => {
    if (reqs.length === 0) return true;
    return reqs.some(req => completedPrograms.includes(req));
  };

  return (
    <section ref={containerRef} className="relative w-full max-w-5xl mx-auto py-24 px-4 sm:px-6 z-10">
      <div className="text-center mb-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          The <span className="text-cyan-400">DSA Journey</span>
        </h2>
        <p className="text-slate-400 font-code text-sm tracking-wider">
          Complete previous modules to unlock advanced topics.
        </p>
      </div>

      <div className="relative w-full">
        {/* Animated SVG Path Timeline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 hidden md:block">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
             {/* The glowing trail that follows scroll */}
             <motion.line
               x1="50" y1="0" x2="50" y2="1000"
               stroke="rgba(6, 182, 212, 0.8)"
               strokeWidth="4"
               strokeLinecap="round"
               style={{ pathLength: scrollYProgress }}
               className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
             />
             {/* Background dimmed line */}
             <line
               x1="50" y1="0" x2="50" y2="1000"
               stroke="rgba(6, 182, 212, 0.1)"
               strokeWidth="4"
             />
          </svg>
        </div>

        {/* Nodes */}
        <div className="relative flex flex-col gap-12 md:gap-24">
          {roadmapNodes.map((node, index) => {
            const unlocked = isNodeUnlocked(node.requiredPrograms);
            const isLeft = node.side === 'left';

            return (
              <div 
                key={node.id} 
                className={`relative flex flex-col md:flex-row items-center justify-between ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} w-full`}
              >
                
                {/* Connecting horizontal line for zigzag (Desktop only) */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-2rem)] h-[2px] ${isLeft ? 'right-[50%]' : 'left-[50%]'} bg-gradient-to-${isLeft ? 'l' : 'r'} from-cyan-500/50 to-transparent opacity-30`} />

                {/* Content Card */}
                <div className={`w-full md:w-[45%] flex ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onClick={() => unlocked && router.push(node.route)}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 w-full max-w-sm
                      ${unlocked 
                        ? 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] cursor-pointer' 
                        : 'bg-slate-900/40 border-slate-800 opacity-60 cursor-not-allowed grayscale'
                      }
                    `}
                    style={{ backdropFilter: 'blur(12px)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg ${unlocked ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                        {node.icon}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-code text-[10px] tracking-widest text-slate-500 uppercase">Step 0{index + 1}</span>
                        {!unlocked && (
                          <div className="flex items-center gap-1 mt-1 text-rose-500/80">
                            <Lock size={12} />
                            <span className="text-[10px] font-bold tracking-wider uppercase">Locked</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className={`font-display text-lg font-bold mb-2 ${unlocked ? 'text-white' : 'text-slate-400'}`}>
                      {node.title}
                    </h3>
                    <p className={`text-sm ${unlocked ? 'text-slate-400' : 'text-slate-500'}`}>
                      {node.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Node / Dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#070B14] bg-slate-900 z-10">
                  <div className={`w-4 h-4 rounded-full transition-all duration-500 ${unlocked ? 'bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,1)] animate-pulse' : 'bg-slate-700'}`} />
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
