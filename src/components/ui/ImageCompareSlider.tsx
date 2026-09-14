'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Layers, MoveHorizontal } from 'lucide-react';

interface ImageCompareSliderProps {
  caption?: string;
}

export const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({
  caption = "Early-stage case study demonstrating seamless radiance integration between synthetic CAD assets and real-world drone scan environments.",
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clamped);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[380px] md:h-[460px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 select-none shadow-2xl cursor-ew-resize"
      >
        {/* RIGHT LAYER: Hybrid Composite (After - Synthetic CAD 3DGS depth-sorted into drone scan) */}
        <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center flex flex-col justify-end p-6"
            style={{
              backgroundImage: `radial-gradient(ellipse at center, rgba(0, 133, 202, 0.15) 0%, rgba(2, 6, 23, 0.95) 75%), linear-gradient(135deg, #091322 0%, #030712 100%)`,
            }}
          >
            {/* Visual simulation representation of Hybrid Depth-Sorted CAD */}
            <div className="absolute inset-0 flex items-center justify-center opacity-85">
              <div className="relative w-72 h-72 border border-dashed border-[#0085ca]/40 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                <Layers className="w-12 h-12 text-[#0085ca] mb-3 animate-pulse" />
                <span className="text-sm font-semibold text-white font-mono">HYBRID RADIANCE COMPOSITE</span>
                <span className="text-xs text-sky-200 mt-1 max-w-xs">
                  Synthetic USD Pylon Infrastructure geometry depth-sorted into real-world 3DGS terrain.
                </span>
                <span className="mt-3 px-2 py-0.5 rounded bg-[#0085ca]/20 border border-[#0085ca]/40 text-[10px] font-mono text-sky-300">
                  Depth Sorting · Contact Shadow Aligned
                </span>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-[#0085ca]/50 px-3 py-1.5 rounded text-xs font-mono text-[#0085ca] shadow-lg">
            RIGHT: Hybrid Composite (CAD 3DGS + Drone Scan)
          </div>
        </div>

        {/* LEFT LAYER: Reality Background Scan Only (Before - Drone Scan Radiance) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="w-full h-full bg-cover bg-center flex flex-col justify-end p-6"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              backgroundImage: `radial-gradient(ellipse at center, rgba(30, 41, 59, 0.4) 0%, rgba(2, 6, 23, 0.95) 80%), linear-gradient(135deg, #0f172a 0%, #020617 100%)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-60">
              <div className="relative w-64 h-64 border border-slate-700/50 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs font-mono text-slate-400 mb-1">RAW DRONE SCAN ONLY</span>
                <span className="text-xs text-slate-500">Unmodified site topography radiance field</span>
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded text-xs font-mono text-slate-300 shadow-lg">
            LEFT: Reality Background Scan (3DGS)
          </div>
        </div>

        {/* Vertical Divider Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#0085ca] shadow-[0_0_12px_rgba(0,133,202,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-[#0085ca] flex items-center justify-center shadow-2xl text-white">
            <MoveHorizontal className="w-4 h-4 text-[#0085ca]" />
          </div>
        </div>
      </div>

      {/* Caption (Spec Requirement) */}
      <p className="text-xs font-mono text-slate-400 italic text-center px-4">
        &ldquo;{caption}&rdquo;
      </p>
    </div>
  );
};
