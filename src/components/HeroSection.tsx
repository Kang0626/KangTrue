'use client';

import React from 'react';
import { Layers, Cpu, Sliders } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-14 pb-12 sm:pt-18 sm:pb-14 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono text-[#0085ca] font-bold tracking-wider uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0085ca]" />
              <span>INDEPENDENT R&amp;D &amp; EMPIRICAL CASE STUDIES · HIT LAB NZ DEMO</span>
            </div>

            {/* Clean Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              3D Gaussian Splatting &amp; <span className="text-[#0085ca]">OpenUSD Compositing</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-500 font-mono mt-2">
              Personal Research &amp; Technical Case Studies by Kangsik (Kang) Ko
            </p>
          </div>

          {/* Compact Quick-Jump Cards */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#case-01"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-[#0085ca] text-slate-800 hover:text-white border border-slate-200 hover:border-[#0085ca] font-mono font-bold text-xs transition-all"
            >
              <Cpu className="w-4 h-4 text-[#0085ca] group-hover:text-white" />
              <span>01. 3DGS Research &amp; Hygiene</span>
            </a>
            <a
              href="#case-02"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-[#0085ca] text-slate-800 hover:text-white border border-slate-200 hover:border-[#0085ca] font-mono font-bold text-xs transition-all"
            >
              <Layers className="w-4 h-4 text-[#0085ca]" />
              <span>02. 3DGS + 3D USD Compositing</span>
            </a>
            <a
              href="#pipeline-tooling"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-[#0085ca] text-slate-800 hover:text-white border border-slate-200 hover:border-[#0085ca] font-mono font-bold text-xs transition-all"
            >
              <Sliders className="w-4 h-4 text-[#0085ca]" />
              <span>03. Custom Pipeline GUI</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
