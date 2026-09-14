code = '''use client';

import React, { useState } from 'react';
import { Image as ImageIcon, UploadCloud, Maximize2 } from 'lucide-react';

interface CaptureSlotProps {
  imagePath?: string;
  alt: string;
  label: string;
  description?: string;
  recommendedSize?: string;
  aspectRatio?: 'video' | 'wide' | 'square';
  className?: string;
}

export const CaptureSlot: React.FC<CaptureSlotProps> = ({
  imagePath,
  alt,
  label,
  description,
  recommendedSize = "1920x1080 (16:9)",
  aspectRatio = 'video',
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const aspectClass = {
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    square: 'aspect-square',
  }[aspectRatio];

  const hasValidImage = imagePath && !imgError;

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-white hover:border-[#0085ca]/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group ${className}`}>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/70">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-3.5 h-3.5 text-[#0085ca]" />
          <span className="text-xs font-mono font-semibold text-slate-800">{label}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
          {recommendedSize}
        </span>
      </div>

      {/* Main Image or Placeholder Slot */}
      <div className={`relative w-full ${aspectClass} bg-slate-100/70 flex items-center justify-center overflow-hidden`}>
        {hasValidImage ? (
          <>
            <img
              src={imagePath}
              alt={alt}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover cursor-pointer group-hover:scale-[1.03] transition-transform duration-500"
              onClick={() => setIsZoomed(true)}
            />
            {/* Hover Launch/Zoom Badge */}
            <div
              onClick={() => setIsZoomed(true)}
              className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-[2px]"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-slate-200 text-slate-900 text-xs font-mono font-semibold shadow-xl group-hover:scale-105 transition-transform">
                <Maximize2 className="w-3.5 h-3.5 text-[#0085ca]" />
                <span>Expand Capture Evidence</span>
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-200 m-2 rounded-xl bg-slate-50/60 hover:bg-slate-100/50 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#0085ca]/10 border border-[#0085ca]/25 flex items-center justify-center text-[#0085ca] mb-3 shadow-2xs">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 font-sans mb-1">
              {label}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mb-2.5 font-sans leading-relaxed">
              {description || "Dropzone slot for actual Houdini node screenshots, viewport comparisons, or UI captures."}
            </p>
            {imagePath && (
              <span className="text-[10px] font-mono text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                Target: {imagePath}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div className="px-4 py-3 bg-slate-50/60 border-t border-slate-200/70 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-sans truncate pr-2">
          {alt}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#0085ca] bg-[#0085ca]/10 border border-[#0085ca]/20 px-2 py-0.5 rounded shrink-0 font-semibold">
          3DGS Evidence
        </span>
      </div>

      {/* Full-Screen Lightbox Zoom Modal */}
      {isZoomed && hasValidImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl p-2">
            <img src={imagePath} alt={alt} className="w-full h-auto max-h-[84vh] object-contain rounded-xl" />
            <div className="text-center py-2.5 text-xs font-mono text-slate-600">
              {alt} — Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
'''
with open('src/components/ui/CaptureSlot.tsx', 'w', encoding='utf-8') as f:
    f.write(code.strip() + '\n')
print('CaptureSlot.tsx written successfully')
