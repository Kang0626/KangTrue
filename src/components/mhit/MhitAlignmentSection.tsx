'use client';

import React from 'react';
import { MHIT_PROPOSAL } from '@/lib/constants';
import { Sparkles, Users, Layers, Activity, ArrowRight } from 'lucide-react';

export const MhitAlignmentSection: React.FC = () => {
  const { hitLabAlignment } = MHIT_PROPOSAL;

  return (
    <section id="alignment" className="py-24 sm:py-32 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 mb-4 uppercase tracking-wider">
            {hitLabAlignment.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            {hitLabAlignment.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            {hitLabAlignment.subtitle}
          </p>
        </div>

        {/* Alignment Table & Matrix */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-white">
          <div className="hidden lg:grid grid-cols-12 bg-slate-100/80 px-8 py-4 text-xs font-mono font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
            <div className="col-span-4">HIT Lab Research Domain</div>
            <div className="col-span-4">Technical Pipeline Contribution</div>
            <div className="col-span-4">Potential Collaborative Output</div>
          </div>

          <div className="divide-y divide-slate-100">
            {hitLabAlignment.domains.map((row, idx) => (
              <div
                key={idx}
                className="p-6 lg:px-8 lg:py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 hover:bg-slate-50/80 transition-colors"
              >
                {/* Domain */}
                <div className="lg:col-span-4 space-y-1">
                  <span className="lg:hidden text-[10px] font-mono uppercase tracking-widest text-[#0085ca] font-bold block">
                    HIT Lab Research Domain
                  </span>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#0085ca] mt-2 shrink-0" />
                    <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                      {row.domain}
                    </h3>
                  </div>
                </div>

                {/* Technical Pipeline Contribution */}
                <div className="lg:col-span-4 space-y-1">
                  <span className="lg:hidden text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    Technical Contribution
                  </span>
                  <p className="text-sm text-slate-700 font-light leading-relaxed">
                    {row.contribution}
                  </p>
                </div>

                {/* Potential Collaborative Output */}
                <div className="lg:col-span-4 space-y-1">
                  <span className="lg:hidden text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold block">
                    Collaborative Output
                  </span>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                    {row.output}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
