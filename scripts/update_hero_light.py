hero_code = """'use client';

import React from 'react';
import { HERO_CONTENT } from '@/lib/constants';
import { ArrowRight, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-44 pb-28 sm:pt-52 sm:pb-36 bg-white overflow-hidden text-center">
      {/* Subtle Atmospheric Truescape Blue Aura */}
      <div className="absolute top-0 right-1/4 w-[750px] h-[400px] bg-[#0085ca]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[650px] h-[350px] bg-sky-100/40 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Eyebrow Pill with Pulse Live Indicator */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-[#0085ca] tracking-wider uppercase mb-10 shadow-xs">
          <span className="pulse" />
          <span className="font-semibold">{HERO_CONTENT.eyebrow}</span>
        </div>

        {/* Grand Headline with Truescape Proportions */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] max-w-5xl mb-8">
          Next-Gen Spatial Visualization: <br className="hidden sm:inline" />
          <span className="text-[#0085ca]">OpenUSD & 3DGS Pipeline</span>
        </h1>

        {/* Spacious Subheadline */}
        <p className="text-lg sm:text-2xl text-slate-600 font-light leading-relaxed max-w-3xl mb-12">
          {HERO_CONTENT.subheadline}
        </p>

        {/* Executive Thesis Callout (Clean Editorial Box) */}
        <div className="relative p-8 sm:p-10 rounded-2xl bg-slate-50/90 border-l-4 border-[#0085ca] border-y border-r border-slate-200 max-w-4xl mb-14 text-left shadow-xs">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0085ca] font-bold block mb-2">
            Production Lead Executive Thesis
          </span>
          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-normal italic">
            &ldquo;{HERO_CONTENT.leadQuote}&rdquo;
          </p>
        </div>

        {/* Spacious Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#stage"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0085ca] hover:bg-[#006ba8] text-white font-sans font-bold text-sm shadow-md shadow-[#0085ca]/25 hover:-translate-y-0.5 transition-all"
          >
            <span>Explore Live 3DGS Stage ↓</span>
          </a>
          <a
            href="#case-01"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-sans font-semibold text-sm shadow-xs hover:-translate-y-0.5 transition-all"
          >
            <span>01. Reality Capture</span>
          </a>
          <a
            href="#case-02"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-sans font-semibold text-sm shadow-xs hover:-translate-y-0.5 transition-all"
          >
            <span>02. Synthetic USD</span>
          </a>
          <a
            href="#pipeline-tooling"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-sans font-medium text-sm shadow-xs hover:-translate-y-0.5 transition-all"
          >
            <span>Pipeline Tooling</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/30 font-sans font-semibold text-sm hover:bg-[#0085ca] hover:text-white hover:-translate-y-0.5 transition-all"
          >
            <span>Discuss Role 💬</span>
          </a>
        </div>
      </div>
    </section>
  );
};
"""

with open('src/components/HeroSection.tsx', 'w', encoding='utf-8') as f:
    f.write(hero_code)
print('HeroSection.tsx updated to light and spacious')
