'use client';

import React from 'react';
import Link from 'next/link';
import { PIPELINE_TOOLING } from '@/lib/constants';
import { CaptureSlot } from '@/components/ui/CaptureSlot';
import {
  Terminal,
  Network,
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle2,
  Eye,
} from 'lucide-react';

export const PipelineToolSection: React.FC = () => {
  const { manifesto, controller, mcp } = PIPELINE_TOOLING;

  return (
    <section
      id="pipeline-tooling"
      className="scroll-mt-24 py-28 sm:py-36 bg-slate-50/70 border-y border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/25 mb-5 uppercase tracking-wider">
            {PIPELINE_TOOLING.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight truescape-title-bar mb-6">
            {PIPELINE_TOOLING.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            {PIPELINE_TOOLING.subtitle}
          </p>
        </div>

        {/* 1. High-Impact Manifesto Card: Visual Leadership & AI Co-Engineering */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50 to-sky-50/50 border border-slate-200/90 shadow-sm p-8 sm:p-12 mb-16">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top Badge & Header */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5" />
                {manifesto.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-purple-500/10 text-purple-700 border border-purple-500/20 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Co-Engineered with AI
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              {manifesto.title}
            </h3>
            <p className="text-sm sm:text-base font-medium text-[#0085ca] mb-8 font-sans">
              {manifesto.lead}
            </p>

            {/* Narrative Body: Two Clear Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700 leading-relaxed font-sans mb-10">
              <div className="p-6 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-2.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0085ca]" />
                  Visual Leadership &amp; Spatial Discernment
                </h4>
                <p className="text-slate-600 font-light">
                  {manifesto.background}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-900 font-bold mb-2.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  Agentic AI Co-Engineering in Practice
                </h4>
                <p className="text-slate-600 font-light">
                  {manifesto.aiCollab}
                </p>
              </div>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              {manifesto.keyPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-4 rounded-xl bg-slate-100/70 border border-slate-200/60"
                >
                  <span className="text-xs font-mono font-bold text-slate-900 mb-1">
                    {pillar.label}
                  </span>
                  <span className="text-xs text-slate-500 font-light leading-snug">
                    {pillar.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Unified Technical Architecture Showcase: Controller GUI + MCP Service */}
        <div>
          {/* Subheader */}
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] font-bold block mb-2">
              Integrated Production Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
              Custom GUI Controller &amp; Headless MCP Automation
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed font-light">
              One unified pipeline bridging artist-friendly desktop capture processing with headless Python agentic orchestration for SideFX Houdini Solaris.
            </p>
          </div>

          {/* Side-by-Side 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column (6 cols): Custom Pipeline Controller GUI */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <Sliders className="w-5 h-5 text-[#0085ca]" />
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-sans leading-tight">
                        {controller.title}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-500">
                        {controller.badge}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    In-House Desktop GUI
                  </span>
                </div>

                {/* Screenshot Capture Slot (Single slot, no duplicates) */}
                <div className="mb-6">
                  <CaptureSlot
                    imagePath={controller.imagePath}
                    alt={controller.alt}
                    label={controller.title}
                    description={controller.desc}
                    recommendedSize="1920x1080 (16:9)"
                    aspectRatio="video"
                  />
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6 font-light">
                  {controller.desc}
                </p>

                {/* Key Features List */}
                <div className="space-y-3 mb-6">
                  {controller.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0085ca] mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Handoff Tag */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>Toolchain: FFmpeg → RealityCapture → Postshot → Houdini</span>
                <span className="text-[#0085ca] font-bold">1:1 Metric Locked</span>
              </div>
            </div>

            {/* Right Column (6 cols): Headless Python & Antigravity MCP Service */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-5 h-5 text-[#0085ca]" />
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-sans leading-tight">
                        {mcp.title}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-500">
                        {mcp.badge}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0085ca] bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md">
                    hou Python API
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6 font-light">
                  {mcp.desc}
                </p>

                {/* Studio Reusability Highlight Card */}
                <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0085ca] font-bold mb-2">
                    <Network className="w-4 h-4" />
                    <span>Studio Reusability &amp; Zero-Debt Deployment</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans font-light">
                    {mcp.reusability}
                  </p>
                </div>

                {/* Workflow Highlights */}
                <div className="space-y-3 mb-6">
                  {mcp.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0085ca] mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Integration Flow Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between text-xs font-mono mb-6">
                  <div className="text-center">
                    <span className="text-slate-400 block text-[10px] uppercase">Agent CLI</span>
                    <span className="text-slate-900 font-bold">Natural Prompt</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0085ca] shrink-0" />
                  <div className="text-center">
                    <span className="text-[#0085ca] block text-[10px] uppercase">Antigravity MCP</span>
                    <span className="text-slate-900 font-bold">JSON RPC Pipe</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0085ca] shrink-0" />
                  <div className="text-center">
                    <span className="text-emerald-600 block text-[10px] uppercase">SideFX Houdini</span>
                    <span className="text-slate-900 font-bold">hou Python API</span>
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>Python 3.10+ · Houdini 20.0/20.5 Py3 · Headless RPC</span>
                <span className="text-emerald-700 font-bold">✓ Ready for Studio Storage</span>
              </div>
            </div>
          </div>

          {/* Direct Link to Technical Specs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-xs font-mono gap-3">
            <span className="text-slate-600">
              Want to inspect the complete Python hou API daemon code and JSON-RPC protocol?
            </span>
            <Link
              href="/specs/#mcp-automation"
              className="inline-flex items-center gap-1.5 font-bold text-[#0085ca] hover:text-[#006ba8] transition-colors"
            >
              <span>View Full Pipeline Controller &amp; MCP Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
