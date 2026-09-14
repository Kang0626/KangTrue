'use client';

import React from 'react';
import Link from 'next/link';
import { TECH_VALUES } from '@/lib/constants';
import { Eye, Clock, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

const ICONS = [Eye, Clock, Sparkles, ShieldCheck];

export const TechValueSection: React.FC = () => {
  return (
    <section id="strategic-value" className="scroll-mt-24 py-36 sm:py-44 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0085ca]/10 border border-[#0085ca]/25 text-xs font-mono font-semibold text-[#0085ca] uppercase tracking-wider mb-4">
            Strategic Value Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight truescape-title-bar mb-6">
            Why 3DGS &amp; OpenUSD for Truescape Infrastructure Delivery
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Eliminating historical production bottlenecks — costly on-site re-shoots, prolonged render farm queues, and the severe limitations of single-angle static photomontages — to deliver defensible spatial clarity to municipal councils and commercial stakeholders.
          </p>
        </div>

        {/* 4-Column Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {TECH_VALUES.map((item, i) => {
            const IconComponent = ICONS[i] || Sparkles;
            return (
              <div
                key={item.index}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 sm:p-7 flex flex-col justify-between hover:border-[#0085ca]/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono text-slate-400 font-bold">{item.index}</span>
                    <span className="text-[10px] font-mono text-[#0085ca] uppercase tracking-wider bg-[#0085ca]/10 border border-[#0085ca]/20 px-2.5 py-0.5 rounded-full font-bold">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-[#0085ca]/10 text-[#0085ca] group-hover:scale-105 transition-transform shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm font-semibold text-slate-800 font-sans mb-2 leading-snug">
                    {item.lead}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed font-sans font-light mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Metric Pill */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">{item.metricLabel}</span>
                  <span className="text-base font-mono font-extrabold text-emerald-700">{item.metricValue}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Defensibility & Comparative Matrix Callout */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-900 text-white p-7 sm:p-9 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-[0.16em] font-bold block">
              Workflow Comparative Matrix &amp; Defensibility
            </span>
            <p className="text-sm text-slate-300 font-light max-w-2xl">
              Side-by-side production comparisons between legacy video matchmoving and next-gen 3DGS delivery, including telemetry benchmarks and Environment Court compliance proofs, are detailed in the technical specification.
            </p>
          </div>

          <Link
            href="/specs/#comparative-matrix"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0085ca] hover:bg-[#006ba8] text-white font-sans font-bold text-sm shadow-md shadow-[#0085ca]/25 hover:-translate-y-0.5 transition-all shrink-0"
          >
            <span>Explore Full Defensibility Specs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
