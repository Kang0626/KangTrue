'use client';

import React from 'react';
import Link from 'next/link';
import { CASE_STUDY_02 } from '@/lib/constants';
import { CaptureSlot } from '@/components/ui/CaptureSlot';
import { SogViewer } from '@/components/SogViewer';
import { Play, Sparkles, Zap, ArrowRight } from 'lucide-react';

export const CaseStudySynthetic: React.FC = () => {
  return (
    <section id="case-02" className="scroll-mt-24 py-36 sm:py-44 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 mb-4 uppercase tracking-wider">
            {CASE_STUDY_02.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight truescape-title-bar mb-6">
            {CASE_STUDY_02.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            {CASE_STUDY_02.subtitle}
          </p>
        </div>

        {/* Executive Core Strategic Callout: Universal 3D Asset Integration & Client Feedback */}
        <div className="mb-20 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-10 h-10 rounded-xl bg-[#0085ca]/20 border border-[#0085ca]/40 flex items-center justify-center text-[#38bdf8] shrink-0 mt-0.5 shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">
                  {CASE_STUDY_02.strategicAdvantage.badge}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs font-mono text-slate-400">
                  {CASE_STUDY_02.strategicAdvantage.subtitle}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight mb-1">
                {CASE_STUDY_02.strategicAdvantage.headline}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {CASE_STUDY_02.strategicAdvantage.subline}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
            <div className="text-left md:text-right font-mono">
              <span className="text-[11px] text-slate-400 block mb-0.5">Commercial Value</span>
              <span className="text-sm font-bold text-emerald-400">
                {CASE_STUDY_02.strategicAdvantage.callout}
              </span>
              <span className="text-[10px] text-slate-500 block">
                {CASE_STUDY_02.strategicAdvantage.calloutSub}
              </span>
            </div>
          </div>
        </div>

        {/* Live Pipeline Video Showcase & Procedural Breakdown */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] font-bold block mb-2">
                {CASE_STUDY_02.videoShowcase.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
                {CASE_STUDY_02.videoShowcase.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg font-light leading-relaxed">
              {CASE_STUDY_02.videoShowcase.lead}
            </p>
          </div>

          {/* Row 1: Video Card (Left 7 cols) & 4 Procedural Steps (Right 5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
            {/* Left: Video Player Card (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <CaptureSlot
                imagePath={CASE_STUDY_02.videoShowcase.video.imagePath}
                alt={CASE_STUDY_02.videoShowcase.video.alt}
                label={CASE_STUDY_02.videoShowcase.video.label}
                description={CASE_STUDY_02.videoShowcase.video.description}
                recommendedSize={CASE_STUDY_02.videoShowcase.video.recommendedSize}
                className="h-full"
              />
            </div>

            {/* Right: 4 Procedural Steps (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              {CASE_STUDY_02.videoShowcase.steps.map((s) => (
                <div
                  key={s.step}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-[#0085ca]/40 hover:bg-white transition-all flex-1 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#0085ca] font-bold">{s.step}.</span>
                    <span className="text-xs font-bold text-slate-900 font-mono">{s.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans pl-5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Telemetry Summary Pill Bar (4 cols) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono shadow-xs">
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Asset Ingestion</span>
              <span className="text-sm text-slate-800 font-bold">
                {CASE_STUDY_02.videoShowcase.telemetry.assetCompatibility}
              </span>
            </div>
            <div className="border-l border-slate-200">
              <span className="text-xs text-[#0085ca] block mb-0.5">Camera Rig</span>
              <span className="text-sm text-[#0085ca] font-bold">
                {CASE_STUDY_02.videoShowcase.telemetry.trainingRig}
              </span>
            </div>
            <div className="border-l border-slate-200">
              <span className="text-xs text-emerald-700 block mb-0.5">ML Optimization</span>
              <span className="text-sm text-emerald-700 font-bold">
                {CASE_STUDY_02.videoShowcase.telemetry.mlConvergence}
              </span>
            </div>
            <div className="border-l border-slate-200">
              <span className="text-xs text-sky-700 block mb-0.5">Business Value</span>
              <span className="text-sm text-sky-700 font-bold">
                {CASE_STUDY_02.videoShowcase.telemetry.clientImpact}
              </span>
            </div>
          </div>
        </div>

        {/* Dedicated Verification Gallery: Research Evidence */}
        <div className="pt-16 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] font-bold block mb-2">
              {CASE_STUDY_02.verificationGallery.badge}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-sans">
              {CASE_STUDY_02.verificationGallery.title}
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {CASE_STUDY_02.verificationGallery.subtitle}
            </p>
          </div>

          {/* Interactive 3DGS Model Preview (caseStudy10_dc_fast.sog) */}
          <div className="mb-10">
            <SogViewer
              sogUrl={CASE_STUDY_02.sogViewer.sogUrl}
              title={CASE_STUDY_02.sogViewer.title}
              splatCount={CASE_STUDY_02.sogViewer.splatCount}
              initialDistance={33.4}
              initialPitch={28.9}
              initialYaw={203}
              initialTarget={{ x: -8.06, y: 1.86, z: -9.45 }}
              initialUpright={true}
              modelCenter={{ x: -1.72, y: 3.14, z: 0.07 }}
              minDistance={3.0}
              maxDistance={180.0}
              enableAutoRotate={false}
              enableCameraInspector={true}
              showCameraInspectorDefault={false}
            />
          </div>

          {/* High-Resolution Production Stills (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDY_02.verificationGallery.slots.map((slot) => (
              <CaptureSlot
                key={slot.label}
                imagePath={slot.imagePath}
                alt={slot.alt}
                label={slot.label}
                description={slot.description}
                recommendedSize={slot.recommendedSize}
              />
            ))}
          </div>

          {/* Direct Link to Technical Specs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-mono gap-3">
            <span className="text-slate-600">
              Need to inspect the 50-camera spherical dome geometry and ML training convergence curves?
            </span>
            <Link
              href="/specs/#solaris-ml"
              className="inline-flex items-center gap-1.5 font-bold text-[#0085ca] hover:text-[#006ba8] transition-colors"
            >
              <span>View Solaris &amp; ML Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
