'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TECHNICAL_SPECS, PIPELINE_TOOLING, WORKFLOW_COMPARISON, SITE_METADATA } from '@/lib/constants';
import {
  ArrowLeft,
  FileText,
  Layers,
  Camera,
  Cpu,
  ShieldCheck,
  Zap,
  Terminal,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Scale,
  Sparkles,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const SECTION_ICONS = [Camera, Layers, Cpu, Zap, Terminal, ShieldCheck, Scale];

export default function TechnicalSpecsPage() {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(PIPELINE_TOOLING.mcp.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 selection:bg-[#0085ca]/20 selection:text-slate-900">
      {/* Sticky Top Document Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 h-16 flex items-center shadow-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-700 hover:text-[#0085ca] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio Review</span>
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">DOC REF:</span>
            <span className="text-xs font-mono font-bold text-[#0085ca] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded">
              TRUESCAPE-3DGS-USD-2026
            </span>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold transition-colors border border-slate-200"
            title="Print / Save as PDF"
          >
            <Download className="w-3.5 h-3.5 text-[#0085ca]" />
            <span>Print / PDF</span>
          </button>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Document Header Title Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/25 mb-4 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            {TECHNICAL_SPECS.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-sans">
            {TECHNICAL_SPECS.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-4xl mb-8">
            {TECHNICAL_SPECS.lead}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-100 text-xs font-mono text-slate-500">
            <div>
              <span className="text-slate-400 block mb-0.5">Author &amp; Role</span>
              <span className="text-slate-900 font-bold">{TECHNICAL_SPECS.author}</span>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <span className="text-slate-400 block mb-0.5">Pipeline Version</span>
              <span className="text-emerald-700 font-bold">{TECHNICAL_SPECS.version}</span>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <span className="text-slate-400 block mb-0.5">Publication Date</span>
              <span className="text-slate-700 font-medium">{TECHNICAL_SPECS.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Sticky Sidebar TOC (4 cols) + Section Detail Cards (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Sticky Table of Contents (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#0085ca] font-bold mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-1 text-xs font-sans">
                {TECHNICAL_SPECS.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-slate-600 hover:text-[#0085ca] hover:bg-sky-50/70 transition-colors group"
                  >
                    <span className="flex items-center gap-2 font-medium min-w-0">
                      <span className="font-mono text-[#0085ca] text-[11px] shrink-0">{sec.number}.</span>
                      <span className="truncate">{sec.shortTitle || sec.title}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0085ca] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                  </a>
                ))}
              </nav>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  href="/#hero"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-semibold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Main Portfolio</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Right: Technical Section Breakdowns (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {TECHNICAL_SPECS.sections.map((sec, idx) => {
              const Icon = SECTION_ICONS[idx] || FileText;
              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm"
                >
                  {/* Section Title Bar */}
                  <div className="flex items-start justify-between pb-6 mb-8 border-b border-slate-200">
                    <div className="flex items-start gap-3.5">
                      <div className="p-3 rounded-2xl bg-[#0085ca]/10 text-[#0085ca] shrink-0 mt-1">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-[#0085ca]">
                            SECTION {sec.number}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
                          {sec.title}
                        </h2>
                        <p className="text-sm text-slate-600 mt-2 font-light leading-relaxed">
                          {sec.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Spec Cards */}
                  <div className="space-y-6 mb-8">
                    {sec.details.map((detail, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-[#0085ca]/40 transition-colors"
                      >
                        <h3 className="text-sm font-bold text-slate-900 font-sans mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#0085ca]" />
                          {detail.label}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-light">
                          {detail.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Special Embedded Showcase for Section 02: VEX Code Snippet */}
                  {sec.id === 'houdini-hygiene' && (
                    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-300">
                        <span>Point VEX: Spatial k-NN Density Floater Culling</span>
                        <span className="text-emerald-400">Attribute Wrangle (SOP)</span>
                      </div>
                      <pre className="p-5 text-xs font-mono text-sky-200 overflow-x-auto bg-[#060608] leading-relaxed">
                        <code>{`// Search radius for neighbor validation (in metric units)
float search_radius = chf("search_radius"); // Default: 0.35m
int min_neighbors = chi("min_neighbors");   // Default: 4

int handle = pcopen(0, "P", @P, search_radius, min_neighbors + 2);
int count = 0;

while (pciterate(handle)) {
    count++;
}
pcclose(handle);

// Cull isolated airborne splats that lack sufficient neighbor density
if (count < min_neighbors) {
    removepoint(0, @ptnum);
}`}</code>
                      </pre>
                    </div>
                  )}

                  {/* Special Embedded Showcase for Section 03: Why This Matters to Truescape */}
                  {sec.id === 'solaris-ml' && (
                    <div className="mt-8 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0085ca]/15 rounded-full blur-3xl pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0085ca]/20 border border-[#0085ca]/40 text-[11px] font-mono text-sky-300 font-bold uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                            Production Lead Value Proposition
                          </span>
                          <span className="text-xs font-mono text-slate-400">Commercial &amp; Regulatory Impact</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans tracking-tight mb-2">
                          Why This Matters to Truescape
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6 max-w-3xl">
                          Transforming complex procedural R&amp;D into decisive commercial ROI: solving the three most resource-intensive bottlenecks in infrastructure consent visualization.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between hover:border-[#0085ca]/50 transition-all shadow-xs">
                            <div>
                              <div className="flex items-center gap-2 mb-2.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span className="text-[10.5px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                                  Cost &amp; Schedule
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-white font-sans mb-2 leading-snug">
                                Zero Re-Shoots for Design Revisions
                              </h4>
                              <p className="text-xs text-slate-300 font-light leading-relaxed">
                                When turbine models change or structural dimensions are revised, swapping the referenced USD asset rebuilds the synthetic 3DGS dataset in under 30 minutes—eliminating expensive field re-shoots and scheduling delays.
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-slate-400">
                              30-Min Automated Turnaround
                            </div>
                          </div>

                          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between hover:border-[#0085ca]/50 transition-all shadow-xs">
                            <div>
                              <div className="flex items-center gap-2 mb-2.5">
                                <span className="w-2 h-2 rounded-full bg-sky-400" />
                                <span className="text-[10.5px] font-mono text-sky-400 font-bold uppercase tracking-wider">
                                  Visual Defensibility
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-white font-sans mb-2 leading-snug">
                                Flawless Foreground Occlusion
                              </h4>
                              <p className="text-xs text-slate-300 font-light leading-relaxed">
                                Tedious manual rotoscoping and paint fixes (masking turbines behind complex tree branches and powerlines) are eliminated; 3DGS volumetric radiance inherently resolves true physical foreground depth.
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-slate-400">
                              Automated Volumetric Depth
                            </div>
                          </div>

                          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between hover:border-[#0085ca]/50 transition-all shadow-xs">
                            <div>
                              <div className="flex items-center gap-2 mb-2.5">
                                <span className="w-2 h-2 rounded-full bg-amber-400" />
                                <span className="text-[10.5px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                                  Council Certainty
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-white font-sans mb-2 leading-snug">
                                Instant Stakeholder Explorable Links
                              </h4>
                              <p className="text-xs text-slate-300 font-light leading-relaxed">
                                Instead of static single-angle photomontages, deliver 360-degree real-time explorable links that allow commissioners and community panels to interactively verify visual and environmental impact live.
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-slate-400">
                              Interactive 360° Web Delivery
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Special Embedded Showcase for Section 05: Python MCP Automation Script */}
                  {sec.id === 'mcp-automation' && (
                    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-300">
                        <span>truescape_mcp_houdini_service.py</span>
                        <button
                          onClick={handleCopyScript}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors font-semibold border border-slate-700"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="p-5 text-xs font-mono text-sky-200 overflow-x-auto bg-[#060608] max-h-80 leading-relaxed">
                        <code>{PIPELINE_TOOLING.mcp.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Special Embedded Showcase for Section 07: Workflow Comparative Matrix */}
                  {sec.id === 'comparative-matrix' && (
                    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 text-white p-6 sm:p-8 shadow-xl overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0085ca]/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="relative z-10 grid grid-cols-1 gap-4">
                        {WORKFLOW_COMPARISON.metrics.map((row) => (
                          <div
                            key={row.dimension}
                            className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
                          >
                            <div className="lg:col-span-4">
                              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1 font-semibold">
                                {row.dimension}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-[11px] font-mono font-bold text-sky-300">
                                <Sparkles className="w-3 h-3" />
                                {row.highlight}
                              </span>
                            </div>

                            <div className="lg:col-span-4 p-3.5 rounded-xl bg-rose-950/25 border border-rose-900/35 text-xs font-sans text-rose-200/80 leading-relaxed">
                              <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[10px] uppercase font-bold mb-1">
                                <XCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>Legacy Video Matchmove</span>
                              </div>
                              {row.legacy}
                            </div>

                            <div className="lg:col-span-4 p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-900/35 text-xs font-sans text-emerald-200/90 leading-relaxed">
                              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] uppercase font-bold mb-1">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                <span>Truescape 3DGS + OpenUSD</span>
                              </div>
                              {row.nextGen}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>

        {/* Bottom Back Navigation Bar */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-sans">Ready to review the interactive 3DGS pipeline in action?</h3>
            <p className="text-xs text-slate-400 mt-1 font-light">
              Explore the live WebGL2 orbit viewers, drone photogrammetry solves, and candidate profile.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0085ca] hover:bg-[#006ba8] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-lg shadow-[#0085ca]/25"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </main>

      {/* Document Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white text-center text-xs font-mono text-slate-500">
        <p className="text-slate-700 font-medium">
          © 2026 Truescape Production Lead Proposal — Prepared by {SITE_METADATA.author} | Christchurch, New Zealand
        </p>
      </footer>
    </div>
  );
}
