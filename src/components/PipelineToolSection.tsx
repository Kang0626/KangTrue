'use client';

import React from 'react';
import { CaptureSlot } from '@/components/ui/CaptureSlot';
import { ArrowRight } from 'lucide-react';

const TOOLCHAIN_STEPS = [
  '01. FFmpeg Frame Extraction',
  '02. RealityScan Alignment',
  '03. Postshot / Lichtfeld Training',
  '04. Houdini SOP & WebGL Export',
];

export const PipelineToolSection: React.FC = () => {
  return (
    <section
      id="pipeline-tooling"
      className="scroll-mt-16 py-16 sm:py-20 bg-slate-50/70"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-10">
        {/* Compact Section Header + Toolchain Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 mb-3 uppercase tracking-wider">
              CASE STUDY 03 · CUSTOM R&amp;D AUTOMATION TOOLING
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Custom Python 3DGS Pipeline Controller GUI
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {TOOLCHAIN_STEPS.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-700 shadow-2xs">
                  {tag}
                </span>
                {idx < TOOLCHAIN_STEPS.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Full-Width Controller UI Screenshot */}
        <CaptureSlot
          imagePath="/assets/controller-ui.png"
          alt="Points & Reality 3DGS Pipeline Controller Desktop GUI"
          label="Points & Reality — Custom Python Desktop 3DGS Pipeline Controller (v2.248)"
          recommendedSize="Python / Desktop GUI"
          aspectRatio="video"
        />
      </div>
    </section>
  );
};
