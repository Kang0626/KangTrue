'use client';

import React from 'react';
import { MHIT_PROPOSAL } from '@/lib/constants';
import { Layers, Workflow, Camera, Cpu, Sparkles, CheckCircle2, ArrowDown } from 'lucide-react';

export const MhitPipelineSection: React.FC = () => {
  const { pipelineArchitecture } = MHIT_PROPOSAL;

  return (
    <section id="pipeline" className="py-24 sm:py-32 bg-slate-50 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 mb-4 uppercase tracking-wider">
            {pipelineArchitecture.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            {pipelineArchitecture.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            {pipelineArchitecture.subtitle}
          </p>
        </div>

        {/* Visual Architectural Flow Diagram */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0085ca] font-bold uppercase tracking-wider mb-8">
            <Workflow className="w-4 h-4" />
            <span>End-to-End Procedural Data Flow</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {pipelineArchitecture.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between relative group hover:border-[#0085ca]/50 hover:bg-white transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-[#0085ca]">
                      {step.num}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0085ca]/30 group-hover:bg-[#0085ca] transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-300 text-slate-400 items-center justify-center text-xs shadow-xs">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Technical Contributions for HIT Lab NZ Projects */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Key Technical Contributions for HIT Lab NZ Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pipelineArchitecture.technicalContributions.map((contrib, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#0085ca]/40 transition-all space-y-3"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 font-sans">
                    {contrib.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {contrib.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
