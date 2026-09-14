stage_code = """'use client';

import React, { useState } from 'react';
import { GaussianViewer } from '@/components/ui/GaussianViewer';
import { Hand, Layers, Eye, Cpu } from 'lucide-react';

interface ModelOption {
  id: string;
  title: string;
  badge: string;
  points: string;
  fps: string;
  size: string;
  tag: string;
  icon: React.ElementType;
}

const MODELS: ModelOption[] = [
  {
    id: 'raw',
    title: 'Raw Drone Ingest (1.2M Splats)',
    badge: 'RAW SWEEP',
    points: '1.2M Splats',
    fps: '48 FPS',
    size: '115MB',
    tag: 'INITIAL CAPTURE',
    icon: Layers,
  },
  {
    id: 'cleaned',
    title: 'Houdini VEX Cleansed (340K Splats)',
    badge: 'SOP HYGIENE',
    points: '340K Splats (-72%)',
    fps: '60 FPS',
    size: '24MB',
    tag: 'PRODUCTION READY',
    icon: Eye,
  },
  {
    id: 'hybrid',
    title: 'Synthetic USD Hybrid Stage',
    badge: 'USD STAGE',
    points: '340K + CAD Pylon',
    fps: '60 FPS',
    size: '28MB',
    tag: 'SOLARIS COMPOSITE',
    icon: Cpu,
  },
];

export const InteractiveStage: React.FC = () => {
  const [activeModel, setActiveModel] = useState<ModelOption>(MODELS[1]);
  const [interacted, setInteracted] = useState(false);

  return (
    <section id="stage" className="scroll-mt-24 py-28 sm:py-36 bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Stage Container (Voxelo-style with light frame) */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden flex flex-col transition-all">
          
          {/* 3D Viewport Area */}
          <div 
            className="relative w-full h-[500px] sm:h-[580px] lg:h-[640px] bg-[#040813] overflow-hidden select-none"
            onMouseDown={() => setInteracted(true)}
            onTouchStart={() => setInteracted(true)}
          >
            {/* Three.js GaussianViewer */}
            <GaussianViewer
              pointsLabel={activeModel.points}
              fpsLabel={activeModel.fps}
              sizeLabel={activeModel.size}
            />

            {/* Floating Top Controls */}
            <div className="absolute top-5 left-5 right-5 flex justify-between items-center pointer-events-none z-20">
              {/* Model Badge with Green Pulse */}
              <div className="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-xs font-mono text-white shadow-xl">
                <span className="pulse" />
                <span className="font-semibold">{activeModel.title}</span>
                <span className="hidden sm:inline-block text-[10px] text-sky-300 bg-[#0085ca]/20 px-2 py-0.5 rounded font-bold border border-[#0085ca]/40">
                  {activeModel.badge}
                </span>
              </div>

              {/* Status Pill */}
              <div className="pointer-events-auto flex items-center gap-2">
                <span className="hidden sm:inline-flex text-[11px] font-mono text-slate-300 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-md">
                  60+ FPS In-Browser WebGL
                </span>
              </div>
            </div>

            {/* Floating Interactive Gesture Prompt Overlay (Dismissed when interacted) */}
            {!interacted && (
              <div
                onClick={() => setInteracted(true)}
                className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-grab z-10 bg-black/25 backdrop-blur-[1px] transition-opacity duration-300"
              >
                <div className="animate-float-interact inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-slate-950/90 backdrop-blur-xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(0,133,202,0.3)] text-white font-sans text-sm font-semibold hover:scale-105 transition-transform">
                  <Hand className="w-4 h-4 text-[#0085ca]" />
                  <span>Click and drag to orbit · Scroll to zoom</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Thumbnail Showcase Selector (Clean Light Styling) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6 bg-slate-50 border-t border-slate-200">
            {MODELS.map((m) => {
              const Icon = m.icon;
              const isSelected = activeModel.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setActiveModel(m);
                    setInteracted(true);
                  }}
                  className={`p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#0085ca]/10 border-[#0085ca] shadow-sm ring-1 ring-[#0085ca]/30'
                      : 'bg-white border-slate-200 hover:border-[#0085ca]/40 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#0085ca] text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-900 truncate font-sans">{m.title}</span>
                    <span className="text-[11px] font-mono text-[#0085ca] font-semibold mt-0.5">{m.tag} →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
"""

with open('src/components/InteractiveStage.tsx', 'w', encoding='utf-8') as f:
    f.write(stage_code)
print('InteractiveStage.tsx updated to light and spacious')
