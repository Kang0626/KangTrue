capture_code = """'use client';

import React, { useState } from 'react';
import { CASE_STUDY_01 } from '@/lib/constants';
import { NodeModal } from '@/components/ui/NodeModal';
import { CaptureSlot } from '@/components/ui/CaptureSlot';
import { Camera, Cpu, Layers, FileCode, Globe, ArrowRight, Code } from 'lucide-react';

const STEP_ICONS: Record<string, React.ElementType> = {
  Camera,
  Cpu,
  Layers,
  FileCode,
  Globe,
};

export const CaseStudyCapture: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="case-01" className="scroll-mt-24 py-36 sm:py-44 bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 mb-4 uppercase tracking-wider">
            {CASE_STUDY_01.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight truescape-title-bar mb-6">
            {CASE_STUDY_01.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            {CASE_STUDY_01.subtitle}
          </p>
        </div>

        {/* 5-Step Pipeline Flowchart */}
        <div className="mb-24 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0085ca] font-bold">
              Procedural Reality Ingestion Workflow
            </span>
            <span className="text-xs font-mono text-slate-400">End-to-End Survey Ingestion</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CASE_STUDY_01.pipelineSteps.map((step, idx) => {
              const Icon = STEP_ICONS[step.icon] || Layers;
              return (
                <div
                  key={step.label}
                  className="relative p-5 rounded-xl bg-slate-50/60 border border-slate-200 flex flex-col justify-between group hover:border-[#0085ca]/50 hover:bg-white hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-slate-400 font-bold">{step.step}</span>
                      <div className="w-8 h-8 rounded-lg bg-[#0085ca]/10 flex items-center justify-center text-[#0085ca]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900 block mb-1 font-sans">{step.label}</span>
                    <span className="text-xs text-slate-500 font-mono leading-relaxed block">{step.sub}</span>
                  </div>
                  {idx < 4 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Houdini Cleanup Showcase & VEX Terminal (2-Column Deep Dive) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-24">
          {/* Left: 4 Procedural Hygiene Steps (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[#0085ca]" />
                {CASE_STUDY_01.houdiniCleanup.title}
              </h3>
              <button
                onClick={() => setModalOpen(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#0085ca]/10 text-[#0085ca] hover:bg-[#0085ca] hover:text-white transition-colors flex items-center gap-1.5 font-semibold"
              >
                <Code className="w-3.5 h-3.5" />
                <span>VEX Zoom</span>
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
              {CASE_STUDY_01.houdiniCleanup.lead}
            </p>

            <div className="space-y-3.5 mb-6">
              {CASE_STUDY_01.houdiniCleanup.steps.map((s) => (
                <div key={s.step} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#0085ca] font-bold">{s.step}.</span>
                    <span className="text-xs font-bold text-slate-900 font-mono">{s.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans pl-5">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Telemetry Summary Pill Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono">
              <div>
                <span className="text-xs text-slate-500 block mb-0.5">Raw Drone Ingest</span>
                <span className="text-sm text-slate-800 font-bold">{CASE_STUDY_01.houdiniCleanup.telemetry.pointsBefore}</span>
              </div>
              <div className="border-x border-slate-200">
                <span className="text-xs text-[#0085ca] block mb-0.5">Houdini Filtered</span>
                <span className="text-sm text-[#0085ca] font-bold">{CASE_STUDY_01.houdiniCleanup.telemetry.pointsAfter}</span>
              </div>
              <div>
                <span className="text-xs text-emerald-700 block mb-0.5">Payload Slashed</span>
                <span className="text-sm text-emerald-700 font-bold">-72% Storage</span>
              </div>
            </div>
          </div>

          {/* Right: VEX Code Terminal Block (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                Houdini Attribute Wrangle (Point VEX)
              </span>
              <span className="text-sky-300">k-NN Culling</span>
            </div>
            <div className="p-5 overflow-x-auto text-xs font-mono text-sky-200 leading-relaxed max-h-[380px]">
              <pre>
                <code>{CASE_STUDY_01.houdiniCleanup.vexCode}</code>
              </pre>
            </div>
            <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>pcopen() · pcunshaded()</span>
              <span className="text-emerald-400">Validated in SOPs</span>
            </div>
          </div>
        </div>

        {/* Dedicated Research Capture Slots */}
        <div className="pt-20 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] font-bold block mb-2">
              Verification Gallery — Research Evidence
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-sans">
              Case Study 01: Houdini Network & Viewport Evidence Slots
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Designated dropzone slots for Houdini SOP node graphs, k-NN outlier removal evidence, and cleaned viewport screenshots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CaptureSlot
              imagePath="/assets/case1/houdini_node_cleanup.png"
              alt="Houdini SOP Hygiene Network Screen Capture"
              label="Houdini Node Network (Import → Split → VEX Wrangle)"
              description="Dropzone for Houdini SOP network screen capture showing point ingestion, spatial boundary split, and k-NN statistical filter nodes."
              recommendedSize="1920x1080 (16:9)"
            />
            <CaptureSlot
              imagePath="/assets/case1/point_outlier_comparison.png"
              alt="Point Cloud Outlier Removal Comparison"
              label="Viewport Outlier Pruning Evidence (Before / After)"
              description="Dropzone for high-resolution viewport comparison showing airborne floaters and sky noise purged from point field."
              recommendedSize="1920x1080 (16:9)"
            />
          </div>
        </div>

        {/* Modal for VEX zoom */}
        <NodeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Houdini VEX: Statistical Outlier Removal & Opacity Culling"
          description="In Houdini SOPs, this point wrangle iterates across all imported splats to measure mean distance against k-nearest neighbors (pcopen / pcunshaded). Low-density airborne floaters and near-zero opacity artifacts are purged prior to ROP serialization."
          code={CASE_STUDY_01.houdiniCleanup.vexCode}
        />
      </div>
    </section>
  );
};
"""

with open('src/components/CaseStudyCapture.tsx', 'w', encoding='utf-8') as f:
    f.write(capture_code)
print('CaseStudyCapture.tsx updated to light and spacious')
