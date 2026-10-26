'use client';

import React from 'react';
import { CaptureSlot } from '@/components/ui/CaptureSlot';
import { SogViewer } from '@/components/SogViewer';
import { ArrowRight } from 'lucide-react';

const WORKFLOW_TAGS = [
  '01. Camera Alignment (RealityScan)',
  '02. Radiance Training (Postshot)',
  '03. Point Hygiene (Houdini SOPs)',
  '04. WebGL2 Streaming (.sog)',
];

const HOUDINI_TAGS = [
  { step: '01', label: 'Raw PLY Ingestion', meta: '1.2M+ Points' },
  { step: '02', label: 'Bounding Box Clipping', meta: 'Perimeter Isolation' },
  { step: '03', label: 'VEX k-NN Floater Culling', meta: 'Outlier Removal' },
  { step: '04', label: 'Clean PLY Serialization', meta: '340K Points (-72%)' },
];

export const CaseStudyCapture: React.FC = () => {
  return (
    <section id="case-01" className="scroll-mt-16 py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">
        {/* Compact Section Header + Visual Pipeline Tags */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/20 mb-3 uppercase tracking-wider">
              CASE STUDY 01 · PERSONAL 3DGS RESEARCH
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              3DGS Reconstruction, Training &amp; Houdini Point Hygiene
            </h2>
          </div>

          {/* 1-Line Pipeline Flow Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {WORKFLOW_TAGS.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-700 shadow-2xs">
                  {tag}
                </span>
                {idx < WORKFLOW_TAGS.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Visual Block 1: RealityScan & Postshot Captures (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CaptureSlot
            imagePath="/assets/case1/realityscan.gif"
            alt="RealityScan Camera Alignment & Point Cloud"
            label="01. RealityScan — Camera Solve & Tie-Point Alignment"
            recommendedSize="Photogrammetry Solve"
          />
          <CaptureSlot
            imagePath="/assets/case1/postshot.gif"
            alt="Postshot 3DGS Radiance Field Training"
            label="02. Postshot — 3DGS Radiance Field Optimization"
            recommendedSize="Splat Convergence"
          />
        </div>

        {/* Visual Block 2: Houdini SOP Point Cloud Hygiene (Full Width Video + Step Pills) */}
        <div className="space-y-4">
          <CaptureSlot
            imagePath="/assets/case1/houdini_filtering.mp4"
            alt="Houdini SOP Point Cloud Hygiene & Heavy PLY Optimization"
            label="03. Houdini SOPs — Procedural Box Clipping & VEX k-NN Floater Culling"
            recommendedSize="1080p Screen Capture"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {HOUDINI_TAGS.map((item) => (
              <div
                key={item.step}
                className="px-4 py-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between font-mono text-xs shadow-2xs"
              >
                <span className="font-bold text-slate-800">
                  <span className="text-[#0085ca] mr-1.5">{item.step}.</span>
                  {item.label}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {item.meta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Block 3: Interactive 3DGS WebGL2 Viewer (The Bowes Museum) */}
        <div>
          <SogViewer
            sogUrl="/assets/case1/the_bowes_museum/meta.json"
            fallbackUrl="/assets/case1/the_bowes_museum/meta.json"
            title="04. Interactive WebGL2 3DGS Streaming Benchmark — The Bowes Museum"
            splatCount="17,493,093 Splats · Chunked SOG Octree"
            isReferenceExample={false}
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
      </div>
    </section>
  );
};
