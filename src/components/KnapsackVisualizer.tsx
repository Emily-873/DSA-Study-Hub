import React, { useState } from 'react';
import { Package, Play, Plus, Trash2, Info, RotateCcw } from 'lucide-react';

interface Item {
    id: number;
    weight: number;
    value: number;
}

const KnapsackVisualizer: React.FC = () => {
    const [items, setItems] = useState<Item[]>([
        { id: 1, weight: 2, value: 3 },
        { id: 2, weight: 3, value: 4 },
        { id: 3, weight: 4, value: 5 },
        { id: 4, weight: 5, value: 6 },
    ]);
    const [capacity, setCapacity] = useState(8);
    const [method, setMethod] = useState<'01' | 'greedy'>('01');
    const [dpTable, setDpTable] = useState<number[][]>([]);
    const [currentStep, setCurrentStep] = useState<{ i: number; j: number } | null>(null);
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [speed] = useState(500);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [greedyResult, setGreedyResult] = useState<{ item: Item; fraction: number }[]>([]);

    const resetVisualizer = () => {
        setDpTable([]);
        setCurrentStep(null);
        setIsVisualizing(false);
        setSelectedItems([]);
        setGreedyResult([]);
    };

    const addItem = () => {
        if (items.length >= 6) return;
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        setItems([...items, { id: newId, weight: 1, value: 1 }]);
        resetVisualizer();
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
        resetVisualizer();
    };

    const updateItem = (id: number, field: 'weight' | 'value', val: number) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: Math.max(1, val) } : item));
        resetVisualizer();
    };

    const visualize01 = async () => {
        setIsVisualizing(true);
        const n = items.length;
        const table = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
        setDpTable(table);

        for (let i = 1; i <= n; i++) {
            for (let j = 0; j <= capacity; j++) {
                setCurrentStep({ i, j });
                await new Promise(resolve => setTimeout(resolve, speed));

                if (items[i - 1].weight <= j) {
                    table[i][j] = Math.max(
                        items[i - 1].value + table[i - 1][j - items[i - 1].weight],
                        table[i - 1][j]
                    );
                } else {
                    table[i][j] = table[i - 1][j];
                }
                setDpTable([...table.map(row => [...row])]);
            }
        }

        // Backtrack to find selected items
        let res = table[n][capacity];
        let w = capacity;
        const selected: number[] = [];
        for (let i = n; i > 0 && res > 0; i--) {
            if (res !== table[i - 1][w]) {
                selected.push(items[i - 1].id);
                res -= items[i - 1].value;
                w -= items[i - 1].weight;
            }
        }
        setSelectedItems(selected);
        setIsVisualizing(false);
        setCurrentStep(null);
    };

    const visualizeGreedy = async () => {
        setIsVisualizing(true);
        // Sort items by value/weight ratio
        const sortedItems = [...items].sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
        let remainingCapacity = capacity;
        const result: { item: Item; fraction: number }[] = [];

        for (const item of sortedItems) {
            await new Promise(resolve => setTimeout(resolve, speed * 2));
            if (remainingCapacity <= 0) break;

            if (item.weight <= remainingCapacity) {
                result.push({ item, fraction: 1 });
                remainingCapacity -= item.weight;
            } else {
                result.push({ item, fraction: remainingCapacity / item.weight });
                remainingCapacity = 0;
            }
            setGreedyResult([...result]);
        }
        setIsVisualizing(false);
    };

    const handleVisualize = () => {
        resetVisualizer();
        if (method === '01') visualize01();
        else visualizeGreedy();
    };

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto p-4 animate-fade-in space-y-8 pt-24">
            <div className="text-center space-y-3">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-widest uppercase mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Knapsack <span className="text-cyan-400">Visualizer</span>
                </h1>
                <p className="text-slate-400 font-code tracking-wider text-sm">
                    Compare DP (0/1) vs Greedy (Fractional) Knapsack algorithms.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 w-full">
                <div className="lg:w-1/3 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-6 border-b border-cyan-500/10 pb-4">
                            <h2 className="text-lg font-display tracking-widest text-white uppercase flex items-center gap-2">
                                <Package className="text-cyan-400" size={18} /> Settings
                            </h2>
                            <div className="flex gap-2">
                                <button 
                                    onClick={resetVisualizer}
                                    className="p-2 text-slate-500 hover:text-cyan-400 transition-colors"
                                    title="Reset"
                                >
                                    <RotateCcw size={16} />
                                </button>
                                <button 
                                    onClick={handleVisualize}
                                    disabled={isVisualizing}
                                    className="btn-cyber px-4 py-2 flex items-center gap-2 text-xs"
                                >
                                    <Play size={14} fill="currentColor" /> Solve
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-code tracking-widest text-slate-500 uppercase block mb-3">Algorithm Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => setMethod('01')}
                                        className={`py-2 px-3 text-xs font-code uppercase tracking-wider transition-all rounded-lg border ${method === '01' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-slate-900/50 text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'}`}
                                    >
                                        0/1 (DP)
                                    </button>
                                    <button 
                                        onClick={() => setMethod('greedy')}
                                        className={`py-2 px-3 text-xs font-code uppercase tracking-wider transition-all rounded-lg border ${method === 'greedy' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-slate-900/50 text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'}`}
                                    >
                                        Greedy (Frac)
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-xs font-code tracking-widest text-slate-500 uppercase">Knapsack Capacity</label>
                                    <span className="text-cyan-400 font-code font-bold">{capacity}</span>
                                </div>
                                <input 
                                    type="range" min="1" max="15" value={capacity} 
                                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-xs font-code tracking-widest text-slate-500 uppercase">Items (Max 6)</label>
                                    <button 
                                        onClick={addItem}
                                        className="p-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {items.map((item, idx) => (
                                        <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${selectedItems.includes(item.id) ? 'bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-800/80'}`}>
                                            <span className="font-code text-[10px] text-slate-500 w-4">{idx + 1}</span>
                                            <div className="flex-1 grid grid-cols-2 gap-2">
                                                <div className="relative">
                                                    <span className="absolute -top-2 left-2 px-1 bg-slate-900 text-[9px] text-slate-500 font-code uppercase tracking-widest rounded">Val</span>
                                                    <input 
                                                        type="number" value={item.value} 
                                                        onChange={(e) => updateItem(item.id, 'value', parseInt(e.target.value))}
                                                        className="w-full bg-slate-900/80 border border-slate-700/80 rounded p-2 text-sm font-code text-cyan-100 pt-3 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                                    />
                                                </div>
                                                <div className="relative">
                                                     <span className="absolute -top-2 left-2 px-1 bg-slate-900 text-[9px] text-slate-500 font-code uppercase tracking-widest rounded">Wt</span>
                                                    <input 
                                                        type="number" value={item.weight} 
                                                        onChange={(e) => updateItem(item.id, 'weight', parseInt(e.target.value))}
                                                        className="w-full bg-slate-900/80 border border-slate-700/80 rounded p-2 text-sm font-code text-cyan-100 pt-3 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeItem(item.id)}
                                                className="text-slate-600 hover:text-rose-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20 flex gap-3 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
                        <Info className="text-cyan-400 shrink-0" size={18} />
                        <p className="text-xs text-cyan-200/70 font-code leading-relaxed tracking-wide">
                            {method === '01' ? 
                                "0/1 Knapsack selects whole items using Dynamic Programming to find the maximum possible value." : 
                                "Greedy Knapsack sorts by value-to-weight ratio and can take fractions of items to fill the remaining space."
                            }
                        </p>
                    </div>
                </div>

                <div className="lg:w-2/3 min-h-[500px] flex flex-col">
                    <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col items-center justify-center overflow-x-auto">
                        {method === '01' ? (
                            <div className="w-full">
                                {dpTable.length > 0 ? (
                                    <table className="w-full border-collapse text-xs sm:text-sm mx-auto font-code">
                                        <thead>
                                            <tr>
                                                <th className="p-3 border border-slate-800/50 bg-slate-900 text-slate-400 font-bold uppercase tracking-widest text-[10px]">i \ w</th>
                                                {Array.from({ length: capacity + 1 }).map((_, w) => (
                                                    <th key={w} className="p-3 border border-slate-800/50 bg-slate-900 text-slate-400 font-bold uppercase tracking-widest text-[10px] w-10">{w}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dpTable.map((row, i) => (
                                                <tr key={i}>
                                                    <td className="p-3 border border-slate-800/50 bg-slate-900 text-cyan-200/70 font-bold whitespace-nowrap text-xs">
                                                        {i === 0 ? "Initial" : `Item ${i}`}
                                                    </td>
                                                    {row.map((val, j) => (
                                                        <td 
                                                            key={j} 
                                                            className={`p-3 border border-slate-800/50 text-center font-mono transition-all duration-300 ${
                                                                currentStep?.i === i && currentStep?.j === j ? 'bg-cyan-500 text-[#070B14] font-bold scale-110 z-10 shadow-[0_0_20px_rgba(6,182,212,0.8)]' : 
                                                                dpTable[i][j] > 0 ? 'text-cyan-100 bg-slate-900/30' : 'text-slate-600 bg-slate-900/10'
                                                            }`}
                                                        >
                                                            {val}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-20 text-gray-400">Click Solve to build DP Table</div>
                                )}
                            </div>
                        ) : (
                            <div className="w-full space-y-8 p-4">
                                <h3 className="text-xl font-display font-bold border-b border-cyan-500/20 pb-4 mb-8 flex justify-between items-center text-white">
                                    Greedy Filling Strategy
                                    <span className="text-xs font-code tracking-widest text-slate-500 uppercase">Ratio = Value / Weight</span>
                                </h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {greedyResult.length > 0 ? greedyResult.map((res, idx) => (
                                        <div key={idx} className="relative group">
                                            <div className="flex justify-between items-center mb-2 font-code">
                                                <span className="font-bold flex items-center gap-2 text-slate-300 text-sm">
                                                    Item {items.findIndex(it => it.id === res.item.id) + 1}
                                                    <span className="text-[10px] text-slate-500 tracking-wider">(V:{res.item.value} W:{res.item.weight})</span>
                                                </span>
                                                <span className="text-cyan-400 font-bold text-sm">{(res.fraction * 100).toFixed(0)}% Used</span>
                                            </div>
                                            <div className="w-full h-8 bg-slate-900/50 rounded-full overflow-hidden border border-slate-700 relative">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                                    style={{ width: `${res.fraction * 100}%` }}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                                                    Profit Added: +{(res.fraction * res.item.value).toFixed(1)}
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-20 text-gray-400">Click Solve to visualize Greedy strategy</div>
                                    )}
                                </div>

                                {greedyResult.length > 0 && (
                                    <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex justify-between items-center shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                                        <span className="font-code tracking-widest text-slate-400 uppercase text-xs font-bold">Total Profit:</span>
                                        <span className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                                            {greedyResult.reduce((sum, res) => sum + (res.fraction * res.item.value), 0).toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {method === '01' && dpTable.length > 0 && !isVisualizing && (
                         <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex justify-between items-center animate-fade-in shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                            <span className="font-code tracking-widest text-slate-400 uppercase text-xs font-bold">Optimal Profit:</span>
                            <span className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                                {dpTable[items.length][capacity]}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KnapsackVisualizer;
