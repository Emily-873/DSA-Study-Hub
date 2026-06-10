import React, { useState } from 'react';
import { Percent, Plus, Calculator, Info } from 'lucide-react';

interface PolyTerm {
  id: string;
  coef: number;
  xexp: number;
  yexp: number;
  zexp: number;
}

const DEFAULT_TERMS: PolyTerm[] = [
  { id: '1', coef: 3, xexp: 2, yexp: 1, zexp: 1 }, // 3x^2 y z
  { id: '2', coef: -2, xexp: 1, yexp: 2, zexp: 0 }, // -2x y^2
  { id: '3', coef: 5, xexp: 0, yexp: 0, zexp: 3 }, // 5z^3
];

export default function PolynomialVisualizer() {
  const [terms, setTerms] = useState<PolyTerm[]>(DEFAULT_TERMS);
  const [coef, setCoef] = useState('4');
  const [xexp, setXexp] = useState('1');
  const [yexp, setYexp] = useState('1');
  const [zexp, setZexp] = useState('1');

  // Evaluation states
  const [valX, setValX] = useState(2);
  const [valY, setValY] = useState(3);
  const [valZ, setValZ] = useState(1);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const addTerm = () => {
    const c = parseInt(coef, 10);
    const x = parseInt(xexp, 10);
    const y = parseInt(yexp, 10);
    const z = parseInt(zexp, 10);

    if (isNaN(c) || isNaN(x) || isNaN(y) || isNaN(z)) return;

    const newTerm: PolyTerm = {
      id: Math.random().toString(),
      coef: c,
      xexp: x,
      yexp: y,
      zexp: z,
    };
    setTerms((prev) => [...prev, newTerm]);
    setShowEvaluation(false);
  };

  const clearTerms = () => {
    setTerms([]);
    setShowEvaluation(false);
  };

  // Evaluate the circular linked list representing the polynomial
  const calculateResult = () => {
    let sum = 0;
    const steps: string[] = [];

    terms.forEach((term) => {
      const termVal =
        term.coef *
        Math.pow(valX, term.xexp) *
        Math.pow(valY, term.yexp) *
        Math.pow(valZ, term.zexp);
      sum += termVal;
      steps.push(
        `${term.coef}(${valX}^${term.xexp})(${valY}^${term.yexp})(${valZ}^${term.zexp}) = ${termVal}`
      );
    });

    return { sum, steps };
  };

  const { sum, steps } = calculateResult();

  return (
    <div className="p-6 bg-white dark:bg-slate-900 neo-brutalism text-gray-900 dark:text-white font-mono">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-500 rounded-xl text-white">
          <Percent size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-sans">
            Program 9: Singly Circular Linked List for Polynomials
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
            Visual representation of polynomial terms as circular nodes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Controls Panel */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-800">
          <h4 className="font-extrabold text-sm uppercase tracking-wide mb-3 text-orange-500 font-sans">
            Add Term
          </h4>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-[10px] text-gray-400 font-sans font-bold">COEF</label>
              <input
                type="number"
                value={coef}
                onChange={(e) => setCoef(e.target.value)}
                className="w-full px-2 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-sans font-bold">X EXP</label>
              <input
                type="number"
                value={xexp}
                onChange={(e) => setXexp(e.target.value)}
                className="w-full px-2 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-sans font-bold">Y EXP</label>
              <input
                type="number"
                value={yexp}
                onChange={(e) => setYexp(e.target.value)}
                className="w-full px-2 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-sans font-bold">Z EXP</label>
              <input
                type="number"
                value={zexp}
                onChange={(e) => setZexp(e.target.value)}
                className="w-full px-2 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-xs"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addTerm}
              className="flex-1 flex items-center justify-center gap-1 py-2 bg-orange-500 text-white rounded-lg font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow font-sans"
            >
              <Plus size={14} /> Add
            </button>
            <button
              onClick={clearTerms}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg font-bold text-xs hover:bg-red-500 hover:text-white transition-all font-sans"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Evaluation Variables */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-800">
          <h4 className="font-extrabold text-sm uppercase tracking-wide mb-3 text-orange-500 font-sans">
            Variables Valuation
          </h4>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <label className="block text-[10px] text-gray-400 font-sans font-bold">X</label>
              <input
                type="number"
                value={valX}
                onChange={(e) => {
                  setValX(Number(e.target.value));
                  setShowEvaluation(true);
                }}
                className="w-full px-2 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-sans font-bold">Y</label>
              <input
                type="number"
                value={valY}
                onChange={(e) => {
                  setValY(Number(e.target.value));
                  setShowEvaluation(true);
                }}
                className="w-full px-2 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-sans font-bold">Z</label>
              <input
                type="number"
                value={valZ}
                onChange={(e) => {
                  setValZ(Number(e.target.value));
                  setShowEvaluation(true);
                }}
                className="w-full px-2 py-1.5 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-xs"
              />
            </div>
          </div>
          <button
            onClick={() => setShowEvaluation(true)}
            className="w-full flex items-center justify-center gap-1.5 py-2 bg-gray-950 text-white dark:bg-gray-100 dark:text-gray-950 rounded-lg font-bold text-xs hover:scale-[1.02] transition-all font-sans"
          >
            <Calculator size={14} /> Evaluate Polynomial
          </button>
        </div>

        {/* Calculation Logs */}
        <div className="p-4 bg-orange-50/20 dark:bg-orange-950/10 rounded-xl border border-orange-200/40 dark:border-orange-900/20 font-sans text-xs">
          <span className="font-extrabold uppercase text-orange-500 tracking-wider">Evaluation Steps</span>
          {showEvaluation && terms.length > 0 ? (
            <div className="mt-2 space-y-1.5 font-mono text-[10px]">
              {steps.map((step, i) => (
                <div key={i} className="text-gray-700 dark:text-gray-300">
                  {step}
                </div>
              ))}
              <div className="pt-2 border-t border-orange-200/50 dark:border-orange-900/50 text-xs font-bold text-orange-500">
                Final Result = {sum}
              </div>
            </div>
          ) : (
            <p className="mt-2 text-gray-400">Add terms and click Evaluate to resolve values.</p>
          )}
        </div>
      </div>

      {/* Nodes circular display */}
      <div className="p-6 bg-gray-50 dark:bg-gray-950/40 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-4 overflow-x-auto min-h-[160px] pb-4">
        {terms.length === 0 ? (
          <div className="text-sm font-bold text-gray-400 font-sans text-center w-full">
            No terms in Polynomial. Add terms to display nodes.
          </div>
        ) : (
          <>
            {/* Circular Header Node */}
            <div className="p-3 bg-gray-900 text-white rounded-xl border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] shrink-0 font-mono text-[9px] leading-tight text-center">
              <div className="font-bold text-orange-500 mb-1">HEADER</div>
              <div>XExp: -1 | YExp: -1</div>
              <div>ZExp: -1</div>
            </div>

            <div className="flex items-center shrink-0 w-6">
              <div className="w-full h-0.5 bg-orange-500" />
              <div className="border-r-4 border-y-4 border-y-transparent border-r-orange-500 -mr-1" />
            </div>

            {terms.map((term, index) => {
              const formatTerm = () => {
                let s = '';
                if (term.coef >= 0 && index > 0) s += '+';
                s += `${term.coef}`;
                if (term.xexp > 0) s += `x^${term.xexp}`;
                if (term.yexp > 0) s += `y^${term.yexp}`;
                if (term.zexp > 0) s += `z^${term.zexp}`;
                return s;
              };

              return (
                <React.Fragment key={term.id}>
                  <div className="p-3 bg-white dark:bg-gray-800 border-2 border-black dark:border-white rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] shrink-0 min-w-[120px] font-mono text-[9px] leading-tight flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-1 text-orange-500 font-extrabold uppercase">
                      <span>Term {index + 1}</span>
                      <span className="text-[8px] bg-orange-500/10 px-1 rounded text-orange-500 font-bold">
                        {formatTerm()}
                      </span>
                    </div>
                    <div>Coef: <span className="font-bold">{term.coef}</span></div>
                    <div>XExp: <span className="font-bold">{term.xexp}</span> | YExp: <span className="font-bold">{term.yexp}</span></div>
                    <div>ZExp: <span className="font-bold">{term.zexp}</span></div>
                  </div>

                  <div className="flex items-center shrink-0 w-6">
                    <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-700" />
                    <div className="border-r-4 border-y-4 border-y-transparent border-r-gray-400 dark:border-r-gray-700 -mr-1" />
                  </div>
                </React.Fragment>
              );
            })}

            {/* Circular link back to start */}
            <div className="p-2 bg-orange-500 text-white rounded-md text-[9px] font-bold shrink-0 uppercase tracking-widest text-center">
              Link back to Header
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50">
        <Info className="text-orange-500 shrink-0 mt-0.5 font-sans" size={18} />
        <p className="text-xs text-orange-800 dark:text-orange-300 leading-relaxed font-medium font-sans">
          <strong>Polynomial Circular representation:</strong> Storing polynomials in a circular linked list makes adding and updating expressions simple. The final term links back to the dummy header, preventing null pointer crashes and simplifying iteration loops during polynomial addition calculations.
        </p>
      </div>
    </div>
  );
}
