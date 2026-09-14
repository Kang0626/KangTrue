code = '''use client';

import React, { useState } from 'react';
import { PIPELINE_TOOLING } from '@/lib/constants';
import { CaptureSlot } from '@/components/ui/CaptureSlot';
import { Terminal, Copy, Check, Network, ArrowRight } from 'lucide-react';

export const PipelineToolSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PIPELINE_TOOLING.mcp.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pipeline-tooling" className="scroll-mt-24 py-36 sm:py-44 bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
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

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-24">
          {/* Left: Architecture & Studio Reusability (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-9 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-200">
                <Terminal className="w-5 h-5 text-[#0085ca]" />
                <h3 className="text-xl font-bold text-slate-900 font-sans">
                  {PIPELINE_TOOLING.mcp.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
                {PIPELINE_TOOLING.mcp.desc}
              </p>

              {/* Studio Reusability Highlight Card */}
              <div className="p-5 rounded-xl bg-sky-50/80 border border-sky-200 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#0085ca] font-bold mb-2">
                  <Network className="w-4 h-4" />
                  <span>Studio Reusability & Zero-Debt Deployment</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {PIPELINE_TOOLING.mcp.reusability}
                </p>
              </div>

              {/* Workflow Highlights */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-start gap-2.5 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0085ca] mt-1.5 shrink-0" />
                  <span>Natural language prompts → Automated LOPs stage construction</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0085ca] mt-1.5 shrink-0" />
                  <span>Asynchronous TOPs scheduler dispatch (Dirty & Cook)</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0085ca] mt-1.5 shrink-0" />
                  <span>Structured JSON telemetry catching exceptions instantaneously</span>
                </div>
              </div>
            </div>

            {/* Integration Flow Box */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between text-xs font-mono">
              <div className="text-center">
                <span className="text-slate-400 block mb-1">Agent CLI</span>
                <span className="text-slate-900 font-bold">Natural Prompt</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0085ca]" />
              <div className="text-center">
                <span className="text-[#0085ca] block mb-1">Antigravity MCP</span>
                <span className="text-slate-900 font-bold">JSON RPC Pipe</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0085ca]" />
              <div className="text-center">
                <span className="text-emerald-600 block mb-1">SideFX Houdini</span>
                <span className="text-slate-900 font-bold">hou Python API</span>
              </div>
            </div>
          </div>

          {/* Right: Code Snippet UI (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 shadow-xl overflow-hidden">
            {/* Terminal Window Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-slate-700 mx-2" />
                <span className="text-xs font-mono text-slate-300">
                  truescape_mcp_houdini_service.py
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors font-semibold border border-slate-700"
                title="Copy Script"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Content */}
            <div className="p-6 overflow-x-auto text-xs font-mono leading-relaxed bg-[#060608] text-sky-200 max-h-[480px]">
              <pre>
                <code>{PIPELINE_TOOLING.mcp.codeSnippet}</code>
              </pre>
            </div>

            {/* Terminal Bottom Info */}
            <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Python 3.10+ · Houdini 20.0/20.5 Py3 · Headless RPC</span>
              <span className="text-emerald-400 font-semibold">✓ Ready for Studio Storage</span>
            </div>
          </div>
        </div>

        {/* Dedicated Research Capture Slots */}
        <div className="pt-20 border-t border-slate-200">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] font-bold block mb-2">
              Verification Gallery — Tooling & Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
              Pipeline Tooling & Controller UI Slots
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed font-light">
              Designated dropzone slots for custom pipeline GUI controller screenshots and MCP system architecture diagrams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CaptureSlot
              imagePath="/assets/controller-ui.png"
              alt="Points & Reality 3DGS Custom Pipeline Controller UI"
              label="Points & Reality 3DGS Controller (v2.248)"
              description="Dropzone for custom pipeline GUI interface unifying FFmpeg, RealityCapture, Postshot, and Houdini handoffs."
              recommendedSize="1920x1080 (16:9)"
            />
            <CaptureSlot
              imagePath="/assets/pipeline/mcp_diagram.svg"
              alt="Houdini and Google Antigravity MCP Architecture Diagram"
              label="MCP Agent & Studio Storage Architecture Diagram"
              description="Dropzone for architecture diagram showing natural language agent RPC communication with Houdini hou API."
              recommendedSize="1920x1080 (16:9)"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
'''
with open('src/components/PipelineToolSection.tsx', 'w', encoding='utf-8') as f:
    f.write(code.strip() + '\n')
print('PipelineToolSection.tsx written successfully')
