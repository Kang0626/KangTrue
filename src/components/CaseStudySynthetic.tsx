'use client';

import React from 'react';
import { CaptureSlot } from '@/components/ui/CaptureSlot';
import { SogViewer } from '@/components/SogViewer';
import { ArrowRight } from 'lucide-react';

const COMPOSITE_STEPS = [
  '01. 3D USD Asset (Solaris LOPs)',
  '02. 50-Camera Dome Rig',
  '03. Synthetic 3DGS Training',
  '04. Real 3DGS + USD Splat Merge (SOPs)',
];

const NODE_TAGS = [
  { step: '01', node: 'IN_Stage (SubLayer)', role: '3D USD Asset Input' },
  { step: '02', node: 'Setup_Camera_Array', role: '50-Cam Hemisphere' },
  { step: '03', node: 'ML_Train_GSplats', role: 'USD → 3DGS Synthesis' },
  { step: '04', node: 'SOP merge1', role: 'Real Scan + USD Splat' },
];

export const CaseStudySynthetic: React.FC = () => {
  return (
    <section id="case-02" className="scroll-mt-16 py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">
        {/* Compact Section Header + 4-Step Flow Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 mb-3 uppercase tracking-wider">
              CASE STUDY 02 · REAL 3DGS + 3D USD COMPOSITING
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hybrid Spatial Compositing: Real-World 3DGS + 3D OpenUSD
            </h2>
          </div>

          {/* 1-Line Pipeline Flow Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {COMPOSITE_STEPS.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-slate-700 shadow-2xs">
                  {tag}
                </span>
                {idx < COMPOSITE_STEPS.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Visual Block 1: Full-Width End-to-End Video (USD to 3DGS + Real Scan Composite) */}
        <div className="space-y-4">
          <CaptureSlot
            imagePath="/assets/case2/usd_to_3dgs.mp4"
            alt="Houdini Solaris USD-to-3DGS Training & Real-World Scan Compositing"
            label="01. End-to-End Process Video — 3D USD to 3DGS Training & Real-World 3DGS Compositing"
            recommendedSize="Full HD 1080p Process Capture"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {NODE_TAGS.map((item) => (
              <div
                key={item.step}
                className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-mono text-xs"
              >
                <span className="font-bold text-slate-800">
                  <span className="text-[#0085ca] mr-1.5">{item.step}.</span>
                  {item.node}
                </span>
                <span className="text-[11px] text-[#0085ca] font-semibold bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Block 2: 4-Stage Visual Synthesis Breakdown (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CaptureSlot
            imagePath="/assets/case2/usd_to_3dgs_training.jpg"
            alt="Houdini Solaris 3D USD Asset Stage & MaterialX"
            label="02-A. Stage 1 — 3D USD Asset Imported in Houdini Solaris (LOPs)"
            recommendedSize="Solaris USD Stage"
          />
          <CaptureSlot
            imagePath="/assets/case2/solaris_camera_dome_rig.png"
            alt="Houdini Solaris 50-Camera Spherical Dome Rig & ML_Train_GSplats"
            label="02-B. Stage 2 — 50-Camera Hemispherical Rig & ML_Train_GSplats"
            recommendedSize="50-Cam Array"
          />
          <CaptureSlot
            imagePath="/assets/case2/usd_to_3dgs_composite.jpg"
            alt="Houdini SOP Dual-Branch Node Graph: Real-World 3DGS Scan + USD 3DGS Splat"
            label="02-C. Stage 3 — Dual-Branch SOP Graph (Real 3DGS Scan + Synthetic USD Splat)"
            recommendedSize="SOP Dual-Branch Merge"
          />
          <CaptureSlot
            imagePath="/assets/case2/sop_hybrid_composite_viewport.png"
            alt="Houdini SOP Final Hybrid Composite of 3D USD Asset in Real-World 3DGS Scan"
            label="02-D. Stage 4 — Final Hybrid Composite (Real 3DGS Environment + 3D USD Asset)"
            recommendedSize="Merged Radiance Viewport"
          />
        </div>

        {/* Visual Block 3: Interactive 3DGS Environment Viewer (caseStudy10_dc_fast.sog) */}
        <div>
          <SogViewer
            sogUrl="/assets/case2/caseStudy10_dc_fast.sog"
            title="03. Interactive 3DGS Environment Viewer — Real-World Captured Site (caseStudy10_dc_fast.sog)"
            splatCount="2,371,074 Splats · Cleaned Radiance Field"
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
      </div>
    </section>
  );
};
