'use client';

import React from 'react';
import { MHIT_PROPOSAL } from '@/lib/constants';
import { Layers, Cpu, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const MhitHypothesesSection: React.FC = () => {
  const { hypotheses } = MHIT_PROPOSAL;

  return (
    <section id="hypotheses" className="py-24 sm:py-32 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 mb-4 uppercase tracking-wider">
            02. CORE RESEARCH HYPOTHESES &amp; INQUIRY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Investigating Perceptual Depth &amp; Streaming Bounds
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Two foundational empirical research questions addressing perceptual fidelity and network bandwidth limitations in immersive multi-user telepresence.
          </p>
        </div>

        {/* Dual Hypothesis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hypotheses.map((item, idx) => {
            const isHypA = item.id === 'hyp-a';

            return (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-slate-50/60 p-8 sm:p-10 flex flex-col justify-between hover:border-[#0085ca]/50 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                {/* Top Header */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0085ca] text-white">
                      <span>{item.code}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0085ca] shadow-2xs">
                      {isHypA ? <Layers className="w-5 h-5" /> : <Cpu className="w-5 h-5" />}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  {/* Problem Block */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Empirical Problem</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                      {item.problem}
                    </p>
                  </div>

                  {/* Proposed Research */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider block">
                      Proposed Research Methodology
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      {item.research}
                    </p>
                  </div>
                </div>

                {/* Quantitative Metric Badges */}
                <div className="pt-8 mt-8 border-t border-slate-200">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3">
                    Target Evaluation Metrics
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white border border-slate-200 text-slate-800 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{m}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
