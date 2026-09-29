'use client';

import React from 'react';
import { SogViewer } from '@/components/SogViewer';
import { Layers, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const MhitViewerSection: React.FC = () => {
  return (
    <section id="viewer" className="py-24 sm:py-32 bg-slate-950 text-white scroll-mt-20 border-b border-slate-800 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0085ca]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/20 text-[#38bdf8] border border-[#0085ca]/40 mb-4 uppercase tracking-wider">
            03. INTERACTIVE TECHNICAL SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Real-Time Radiance Field Streaming Benchmark
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            Interactive WebGL2 inspection demonstrating client-side octree level-of-detail (LOD) streaming, view-dependent spherical harmonics, and responsive 6-DoF camera navigation.
          </p>
        </div>

        {/* Technical Specification Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] block mb-1">
              Gaussian Splat Volume
            </span>
            <span className="text-2xl font-black text-white font-mono block mb-1">
              17.4M Points
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Procedurally partitioned for multi-resolution streaming
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] block mb-1">
              Serialization Format
            </span>
            <span className="text-2xl font-black text-white font-mono block mb-1">
              SOG Chunked LOD
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              16-bit WebP spatial coordinate packing &amp; quantization
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] block mb-1">
              Client Target Framerate
            </span>
            <span className="text-2xl font-black text-white font-mono block mb-1">
              60 FPS WebGL2
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Hardware-accelerated sorting &amp; rasterization
            </span>
          </div>
        </div>

        {/* Interactive 3DGS Viewer */}
        <div className="mb-8">
          <SogViewer
            sogUrl="/assets/case1/the_bowes_museum/meta.json"
            fallbackUrl="/assets/case1/the_bowes_museum/meta.json"
            title="Spatial Radiance Field Benchmark — 3DGS WebGL2"
            splatCount="17.4M Splats (Chunked LOD)"
            initialDistance={68.0}
            initialPitch={18.0}
            initialYaw={25.0}
            initialTarget={{ x: 0, y: 0, z: 0 }}
            initialUpright={true}
            enableAutoRotate={true}
            modelCenter={{ x: 0.78, y: -0.74, z: 5.2 }}
            minDistance={6.0}
            maxDistance={350.0}
            isReferenceExample={false}
            enableCameraInspector={false}
            showCameraInspectorDefault={false}
          />
        </div>

        {/* Bottom Technical Context */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <strong className="text-white block font-sans text-sm mb-0.5">Interaction Instructions</strong>
            <span>Left-click &amp; drag to orbit · Right-click &amp; drag to pan · Scroll wheel to zoom · View presets in top bar.</span>
          </div>
          <Link
            href="/specs/#sog-compression"
            className="inline-flex items-center gap-1.5 text-[#38bdf8] hover:text-white transition-colors shrink-0 font-bold"
          >
            <span>Examine Compression Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
