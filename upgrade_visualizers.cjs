const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const replacements = [
  // 1. Main visualizer container borders/shadows in dark mode
  {
    regex: /dark:bg-slate-900 border-2 border-black dark:border-white shadow-\[6px_6px_0px_0px_rgba\(0,0,0,1\)\] dark:shadow-\[6px_6px_0px_0px_rgba\(255,255,255,1\)\]/g,
    replacement: "neo-brutalism bg-white dark:bg-[#0D1424]/80 dark:border-0 dark:border dark:border-cyan-500/20 dark:shadow-[0_0_15px_rgba(6,182,212,0.15)] dark:backdrop-blur-xl rounded-xl"
  },
  {
    regex: /dark:bg-gray-900 border-2 border-black dark:border-white shadow-\[4px_4px_0px_0px_rgba\(0,0,0,1\)\] dark:shadow-\[4px_4px_0px_0px_rgba\(255,255,255,1\)\]/g,
    replacement: "neo-brutalism bg-white dark:bg-[#0D1424]/80 dark:border-0 dark:border dark:border-cyan-500/20 dark:shadow-[0_0_15px_rgba(6,182,212,0.15)] dark:backdrop-blur-xl rounded-xl"
  },
  {
    regex: /bg-white dark:bg-slate-900 border-2 border-black dark:border-white shadow-\[6px_6px_0px_0px_rgba\(0,0,0,1\)\] dark:shadow-\[6px_6px_0px_0px_rgba\(255,255,255,1\)\]/g,
    replacement: "neo-brutalism bg-white dark:bg-[#0D1424]/80 dark:border-0 dark:border dark:border-cyan-500/20 dark:shadow-[0_0_15px_rgba(6,182,212,0.15)] dark:backdrop-blur-xl rounded-xl"
  },
  
  // 2. Info panels (orange backgrounds)
  {
    regex: /bg-orange-50 dark:bg-orange-950\/20 border border-orange-200 dark:border-orange-900\/50/g,
    replacement: "bg-orange-50 dark:bg-cyan-500/5 border border-orange-200 dark:border-cyan-500/20"
  },
  {
    regex: /text-orange-800 dark:text-orange-300/g,
    replacement: "text-orange-800 dark:text-cyan-300 dark:font-code"
  },
  {
    regex: /text-orange-500 shrink-0/g,
    replacement: "text-orange-500 dark:text-cyan-400 shrink-0"
  },
  
  // 3. Orange icons/buttons
  {
    regex: /bg-orange-500 rounded-xl text-white/g,
    replacement: "bg-orange-500 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border dark:border-cyan-500/30 rounded-xl text-white"
  },
  {
    regex: /text-orange-500/g,
    replacement: "text-orange-500 dark:text-cyan-400"
  },
  
  // 4. Header text display font
  {
    regex: /text-gray-900 dark:text-white/g,
    replacement: "text-gray-900 dark:text-white dark:font-display"
  },

  // 5. Input fields / textareas
  {
    regex: /bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700/g,
    replacement: "bg-white dark:bg-[#070B14] border border-gray-300 dark:border-cyan-500/30 dark:text-slate-200"
  },
  
  // 6. Sub-cards
  {
    regex: /bg-gray-50\/50 dark:bg-gray-800\/20/g,
    replacement: "bg-gray-50/50 dark:bg-[#070B14]/50"
  },
  {
    regex: /dark:border-gray-800/g,
    replacement: "dark:border-cyan-500/20"
  }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') && file.includes('Visualizer') || file === 'TowerOfHanoi.tsx' || file === 'CircularQueue.tsx' || file === 'PostfixEvaluator.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

processDirectory(componentsDir);
console.log('Done upgrading visualizers.');
