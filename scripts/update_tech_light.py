tech_code = """'use client';

import React from 'react';
import { TECH_VALUES } from '@/lib/constants';
import { Sparkles, TrendingUp, Cpu } from 'lucide-react';

const ICONS = [Sparkles, TrendingUp, Cpu];

export const TechValueSection: React.FC = () => {
  return (
    <section id="strategic-value" className="scroll-mt-24 py-36 sm:py-44 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0085ca]/10 border border-[#0085ca]/25 text-xs font-mono font-semibold text-[#0085ca] uppercase tracking-wider mb-4">
            Strategic Value Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight truescape-title-bar mb-6">
            Why 3DGS & OpenUSD for Truescape Infrastructure Delivery
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Eliminating historical production bottlenecks — costly on-site re-shoots, prolonged render farm queues, and the severe limitations of single-angle static photomontages — to deliver defensible spatial clarity to municipal councils and commercial stakeholders.
          </p>
        </div>

        {/* 3-Column Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {TECH_VALUES.map((item, i) => {
            const IconComponent = ICONS[i] || Sparkles;
            return (
              <div
                key={item.index}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-8 sm:p-10 flex flex-col justify-between hover:border-[#0085ca]/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-slate-400 font-bold">{item.index}</span>
                    <span className="text-[11px] font-mono text-[#0085ca] uppercase tracking-wider bg-[#0085ca]/10 border border-[#0085ca]/20 px-3 py-1 rounded-full font-bold">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="p-3 rounded-xl bg-[#0085ca]/10 text-[#0085ca] group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-sans">{item.title}</h3>
                  </div>

                  <p className="text-sm font-semibold text-slate-800 font-sans mb-3">
                    {item.lead}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed font-sans mb-8">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Metric Pill */}
                <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">{item.metricLabel}</span>
                  <span className="text-lg font-mono font-extrabold text-emerald-700">{item.metricValue}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
"""

with open('src/components/TechValueSection.tsx', 'w', encoding='utf-8') as f:
    f.write(tech_code)
print('TechValueSection.tsx updated to light and spacious')
