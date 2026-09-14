synth_code = """'use client';

import React from 'react';
import { CASE_STUDY_02 } from '@/lib/constants';
import { ImageCompareSlider } from '@/components/ui/ImageCompareSlider';
import { CaptureSlot } from '@/components/ui/CaptureSlot';
import { Cpu, CheckCircle } from 'lucide-react';

export const CaseStudySynthetic: React.FC = () => {
  return (
    <section id="case-02" className="scroll-mt-24 py-36 sm:py-44 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
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

        {/* 2-Column Main Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-24">
          {/* Left Column: Solaris/LOPs Pipeline Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-200">
                <Cpu className="w-5 h-5 text-[#0085ca]" />
                <h3 className="text-xl font-bold text-slate-900 font-sans">
                  {CASE_STUDY_02.solarisCard.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
                {CASE_STUDY_02.solarisCard.lead}
              </p>

              {/* Node Graph Flow */}
              <div className="mb-6 p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] block mb-3.5 font-bold">
                  LOPs Node Structure
                </span>
                <div className="space-y-2.5">
                  {CASE_STUDY_02.solarisCard.nodeFlow.map((n) => (
                    <div key={n.step} className="flex items-center gap-2.5 text-xs font-mono">
                      <span className="w-5 h-5 rounded-md bg-[#0085ca]/15 text-[#0085ca] font-bold flex items-center justify-center text-[10px] shrink-0">
                        {n.step}
                      </span>
                      <strong className="text-slate-900 shrink-0">{n.node}</strong>
                      <span className="text-slate-400 hidden sm:inline">→</span>
                      <span className="text-slate-600 truncate">{n.role || n.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Troubleshooting / Lead Competency Highlights */}
              <div className="space-y-3.5">
                <span className="text-xs font-mono text-emerald-700 uppercase tracking-[0.2em] block font-bold">
                  Production Lead Troubleshooting Highlights
                </span>
                {CASE_STUDY_02.solarisCard.troubleshooting.map((t) => (
                  <div key={t.title} className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <span className="text-xs font-bold text-slate-900 font-mono block mb-1 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {t.title}
                    </span>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed pl-5">
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hybrid Composite Visualizer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-700 font-semibold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Hybrid Composite Visualizer (Before / After Swipe)
              </span>
              <span className="text-xs font-mono text-slate-400">Drag Divider Horizontally</span>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-2 shadow-sm">
              <ImageCompareSlider caption={CASE_STUDY_02.caption} />
            </div>

            {/* Explanatory Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono text-slate-900 font-bold block mb-1.5">
                  1:1 Depth Sorting Integration
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Terrain 3DGS point fields and synthetic CAD assets share identical viewport depth buffers for artifact-free radiance occlusion.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono text-[#0085ca] font-bold block mb-1.5">
                  Solar Azimuth & Occlusion
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Synchronizes Christchurch solar coordinates (43.53° S, 172.63° E) to cast accurate contact shadows onto ground proxies.
                </p>
              </div>
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
              Case Study 02: USD Stage & 50-Cam Dome Setup Slots
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Designated dropzone slots for Solaris LOPs stage screenshots, 50-camera dome rigs, and final composite video/renders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CaptureSlot
              imagePath="/assets/case2/solaris_camera_dome.png"
              alt="Houdini Solaris 50 Camera Dome Rig Setup"
              label="Solaris LOPs Stage & 50-Camera Dome Setup"
              description="Dropzone for Solaris LOPs stage showing automated 50-camera spherical dome rig surrounding civil infrastructure asset."
              recommendedSize="1920x1080 (16:9)"
            />
            <CaptureSlot
              imagePath="/assets/case2/hybrid_render.png"
              alt="Hybrid CAD to 3DGS Integrated Render"
              label="Hybrid Composite Final Output (Drone Scan + CAD)"
              description="Dropzone for high-resolution render showing CAD infrastructure model seamlessly integrated into real-world drone scan radiance."
              recommendedSize="1920x1080 (16:9)"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
"""

with open('src/components/CaseStudySynthetic.tsx', 'w', encoding='utf-8') as f:
    f.write(synth_code)
print('CaseStudySynthetic.tsx updated to light and spacious')
