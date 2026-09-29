'use client';

import React from 'react';
import { MHIT_PROPOSAL } from '@/lib/constants';
import { SogViewer } from '@/components/SogViewer';
import { Sparkles, Eye, Zap, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const MhitViewerSection: React.FC = () => {
  const { interactiveShowcase } = MHIT_PROPOSAL;

  return (
    <section id="viewer" className="py-24 sm:py-32 bg-slate-950 text-white scroll-mt-20 border-b border-slate-800 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0085ca]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/20 text-[#38bdf8] border border-[#0085ca]/40 mb-4 uppercase tracking-wider">
            {interactiveShowcase.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {interactiveShowcase.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            {interactiveShowcase.subtitle} Interactive WebGL2 inspection demonstrating procedural boundary clipping, k-NN statistical noise pruning, and compressed octree streaming.
          </p>
        </div>

        {/* Metric Comparison Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {interactiveShowcase.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg flex flex-col justify-between"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] block mb-2">
                {metric.label}
              </span>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs text-slate-500 line-through font-mono">
                  {metric.before}
                </span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  → {metric.after}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {metric.note}
              </span>
            </div>
          ))}
        </div>

        {/* Embedded Interactive 3DGS Viewer Container */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl p-4 sm:p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE WEBGL2 THREE.JS 3DGS ENGINE</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Model: caseStudy10_dc_fast.sog</span>
            </div>
            <div className="text-xs font-mono text-slate-500">
              Left Click: Orbit · Right Click: Pan · Scroll: Zoom
            </div>
          </div>

          <div className="w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden bg-black/60 relative">
            <SogViewer sogUrl={interactiveShowcase.sogUrl} />
          </div>
        </div>

        {/* Bottom Context Callout */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <strong className="text-white block font-sans text-sm mb-0.5">Procedural Pipeline Provenance</strong>
            <span>Direct output of Houdini SOP hygiene &amp; deterministic 50-camera Solaris LOPs sampling.</span>
          </div>
          <Link
            href="/specs#sog-compression"
            className="inline-flex items-center gap-1.5 text-[#38bdf8] hover:text-white transition-colors shrink-0 font-bold"
          >
            <span>Read SOG Compression Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
