'use client';

import React from 'react';
import { MHIT_PROPOSAL } from '@/lib/constants';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Layers, Activity, Award } from 'lucide-react';
import Link from 'next/link';

export const MhitHeroSection: React.FC = () => {
  const { executiveSummary, applicant } = MHIT_PROPOSAL;

  return (
    <section id="motivation" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#0085ca]/8 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Badges & Research Context */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HIT LAB NZ · UNIVERSITY OF CANTERBURY</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{applicant.immigration}</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1] mb-6 max-w-5xl">
          {MHIT_PROPOSAL.title}
        </h1>

        {/* Subheadline & Motivation */}
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light max-w-4xl mb-12">
          A Master of Human Interface Technology (MHIT) research proposal by{' '}
          <strong className="font-semibold text-slate-900">{applicant.name}</strong> ({applicant.role}).{' '}
          Demonstrating how procedural OpenUSD scene graphs and survey-referenced 3D Gaussian Splatting (3DGS) resolve the critical{' '}
          <span className="text-[#0085ca] font-medium">"Fidelity-Latency Dilemma"</span> in collaborative spatial computing.
        </p>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-4xl">
          {executiveSummary.keyMetrics.map((metric, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#0085ca]/40 transition-all">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0085ca] block mb-1">
                {metric.label}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans block mb-1">
                {metric.value}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {metric.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Section 01: Executive Summary Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0085ca]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0085ca]/20 text-[#38bdf8] border border-[#0085ca]/40">
              <Activity className="w-3.5 h-3.5" />
              <span>{executiveSummary.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white">
              {executiveSummary.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-800/80">
              {/* Problem Statement */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block">
                  The Problem: The Fidelity-Latency Dilemma
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {executiveSummary.problem}
                </p>
              </div>

              {/* Proposed Solution Framework */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                  The Proposed Framework &amp; Hypothesis
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {executiveSummary.framework}
                </p>
              </div>
            </div>

            {/* Direct Jump CTAs */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <a
                href="#viewer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0085ca] hover:bg-[#006ba8] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#0085ca]/25 cursor-pointer"
              >
                <span>Launch Interactive 3DGS Viewer</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#hypotheses"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono font-bold uppercase tracking-wider border border-slate-800 transition-all cursor-pointer"
              >
                <span>Read Research Hypotheses</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
