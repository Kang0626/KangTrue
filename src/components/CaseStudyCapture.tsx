'use client';

import React from 'react';
import Link from 'next/link';
import { CASE_STUDY_01 } from '@/lib/constants';
import { CaptureSlot } from '@/components/ui/CaptureSlot';
import { SogViewer } from '@/components/SogViewer';
import { Camera, Cpu, Layers, FileCode, Globe, ArrowRight, Zap } from 'lucide-react';

const STEP_ICONS: Record<string, React.ElementType> = {
  Camera,
  Cpu,
  Layers,
  FileCode,
  Globe,
};

export const CaseStudyCapture: React.FC = () => {

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

        {/* 1. Procedural Reality Ingestion Workflow (5-Step Pipeline Flowchart) */}
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

        {/* 2. RealityScan & Postshot Raw Footage Evidence */}
        <div className="mb-24">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] font-bold block mb-2">
              Verification Gallery — Photogrammetry &amp; Ingestion Tooling
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
              RealityScan &amp; Postshot Raw Footage Evidence
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Real-world photogrammetry camera alignment in RealityScan and iterative 3DGS radiance field convergence in Postshot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CaptureSlot
              imagePath="/assets/case1/realityscan.gif"
              alt="RealityScan Photogrammetry Camera Trajectory &amp; Dense Point Cloud"
              label="RealityScan: Drone Camera Solve &amp; Point Cloud Alignment"
              description="Photogrammetry camera solve showing orbital drone camera frustums, tie-point convergence, and bounding volume alignment."
              recommendedSize="Looping GIF (10 FPS)"
            />
            <CaptureSlot
              imagePath="/assets/case1/postshot.gif"
              alt="Postshot 3DGS Volumetric Splat Training &amp; Radiance Convergence"
              label="Postshot: Real-Time 3DGS Radiance Field Training"
              description="Volumetric splat optimization, spherical harmonics solving, and live training telemetry converging to photorealism."
              recommendedSize="Looping GIF (10 FPS)"
            />
          </div>
        </div>

        {/* 3. 3DGS Training & Radiance Field Synthesis */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
                {CASE_STUDY_01.trainingShowcase.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg font-light leading-relaxed">
              {CASE_STUDY_01.trainingShowcase.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDY_01.trainingShowcase.datasets.map((dataset) => (
              <CaptureSlot
                key={dataset.id}
                imagePath={dataset.imagePath}
                alt={dataset.alt}
                label={dataset.label}
                description={dataset.description}
                recommendedSize={dataset.recommendedSize}
              />
            ))}
          </div>
        </div>

        {/* Interactive 3DGS Web Viewer: The Bowes Museum (.sog) */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-mono text-amber-500 uppercase tracking-[0.2em] font-bold block mb-2">
                REFERENCE PROTOTYPE · FOR ILLUSTRATIVE PURPOSES
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
                The Bowes Museum: Real-Time 3DGS Ingestion &amp; Orbit Viewer
              </h3>
            </div>
            <p className="text-sm text-slate-600 max-w-md font-light leading-relaxed">
              ※ <strong className="font-semibold text-slate-800">Open Reference Benchmark</strong>: Demonstrating large-scale 17.5M splat WebGL2 streaming. Subsequent photogrammetry solves and Houdini cleanups were directly authored by the applicant.
            </p>
          </div>

          <SogViewer
            sogUrl="/assets/case1/the_bowes_museum/meta.json"
            fallbackUrl="/assets/case1/the_bowes_museum/meta.json"
            title="The Bowes Museum — Real-Time 3DGS Radiance Field (Reference Example)"
            splatCount="17,493,093 Splats · Reference Benchmark"
            isReferenceExample={true}
            initialDistance={68.0}
            initialPitch={18.0}
            initialYaw={25.0}
            initialTarget={{ x: 0, y: 0, z: 0 }}
            initialUpright={true}
            modelCenter={{ x: 0.78, y: -0.74, z: 5.2 }}
            minDistance={8.0}
            maxDistance={350.0}
            enableAutoRotate={true}
          />
        </div>

        {/* 4. Houdini SOP Hygiene & Heavy PLY Optimization */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] font-bold block mb-2">
                {CASE_STUDY_01.houdiniCleanup.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
                {CASE_STUDY_01.houdiniCleanup.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg font-light leading-relaxed">
              {CASE_STUDY_01.houdiniCleanup.lead}
            </p>
          </div>

          {/* Executive Core Capability Callout: Why Houdini */}
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-10 h-10 rounded-xl bg-[#0085ca]/20 border border-[#0085ca]/40 flex items-center justify-center text-[#38bdf8] shrink-0 mt-0.5 shadow-lg">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">
                    Core Architectural Advantage
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-mono text-slate-400">Why Houdini</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight mb-1">
                  {CASE_STUDY_01.houdiniCleanup.whyHoudini.headline}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {CASE_STUDY_01.houdiniCleanup.whyHoudini.subline}
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
              <div className="text-left md:text-right font-mono">
                <span className="text-[11px] text-slate-400 block mb-0.5">Scale Handling Ceiling</span>
                <span className="text-sm font-bold text-emerald-400">100M+ Points Stable</span>
                <span className="text-[10px] text-slate-500 block">Zero Viewport Bottleneck</span>
              </div>
            </div>
          </div>

          {/* Row 1: Video Showcase (Left 7 cols) & 4 Procedural Steps (Right 5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
            {/* Left: Video Card (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <CaptureSlot
                imagePath={CASE_STUDY_01.houdiniCleanup.video.imagePath}
                alt={CASE_STUDY_01.houdiniCleanup.video.alt}
                label={CASE_STUDY_01.houdiniCleanup.video.label}
                description={CASE_STUDY_01.houdiniCleanup.video.description}
                recommendedSize={CASE_STUDY_01.houdiniCleanup.video.recommendedSize}
                className="h-full"
              />
            </div>

            {/* Right: 4 Procedural Pipeline Steps (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              {CASE_STUDY_01.houdiniCleanup.steps.map((s) => (
                <div key={s.step} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#0085ca]/40 transition-colors flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#0085ca] font-bold">{s.step}.</span>
                    <span className="text-xs font-bold text-slate-900 font-mono">{s.name}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-light pl-5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Telemetry Summary Pill Bar (4 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white border border-slate-200 text-center font-mono shadow-xs mb-6">
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Raw Ingestion</span>
              <span className="text-sm text-slate-800 font-bold">{CASE_STUDY_01.houdiniCleanup.telemetry.pointsBefore}</span>
            </div>
            <div className="border-l border-slate-200">
              <span className="text-xs text-[#0085ca] block mb-0.5">Houdini Filtered</span>
              <span className="text-sm text-[#0085ca] font-bold">{CASE_STUDY_01.houdiniCleanup.telemetry.pointsAfter}</span>
            </div>
            <div className="border-l border-slate-200">
              <span className="text-xs text-emerald-700 block mb-0.5">Payload Slashed</span>
              <span className="text-sm text-emerald-700 font-bold">{CASE_STUDY_01.houdiniCleanup.telemetry.reduction}</span>
            </div>
            <div className="border-l border-slate-200">
              <span className="text-xs text-sky-700 block mb-0.5">Export Status</span>
              <span className="text-sm text-sky-700 font-bold">{CASE_STUDY_01.houdiniCleanup.telemetry.integrationStatus}</span>
            </div>
          </div>

          {/* Row 3: Link to Technical Specs */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-mono gap-3">
            <span className="text-slate-600">
              Need to inspect the exact VEX k-NN wrangles and memory benchmarks?
            </span>
            <Link
              href="/specs/#houdini-hygiene"
              className="inline-flex items-center gap-1.5 font-bold text-[#0085ca] hover:text-[#006ba8] transition-colors"
            >
              <span>View Houdini Hygiene Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
