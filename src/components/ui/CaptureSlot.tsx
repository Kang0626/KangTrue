'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Video as VideoIcon, Maximize2 } from 'lucide-react';

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
  recommendedSize,
  aspectRatio = 'video',
  className = "",
}) => {
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const aspectClass = {
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    square: 'aspect-square',
  }[aspectRatio];

  const isVideo = !!imagePath && /\.(mp4|mov|webm)$/i.test(imagePath);
  const hasValidMedia = imagePath && !hasError;

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-[#0085ca]/50 transition-all shadow-sm flex flex-col justify-between group ${className}`}>
      {/* Clean Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/90 border-b border-slate-200/80 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {isVideo ? (
            <VideoIcon className="w-4 h-4 text-[#0085ca] shrink-0" />
          ) : (
            <ImageIcon className="w-4 h-4 text-[#0085ca] shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 truncate">{label}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {recommendedSize && (
            <span className="hidden sm:inline-block text-[10px] font-mono text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
              {recommendedSize}
            </span>
          )}
          {hasValidMedia && (
            <button
              type="button"
              onClick={() => setIsZoomed(true)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white hover:bg-[#0085ca] text-slate-600 hover:text-white border border-slate-200 hover:border-[#0085ca] text-[10px] font-mono font-semibold transition-colors cursor-pointer"
              title="Expand Fullscreen"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden md:inline">Expand</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Media Slot — Unobstructed for Live Presentation */}
      <div className={`relative w-full ${aspectClass} bg-slate-950 flex items-center justify-center overflow-hidden`}>
        {hasValidMedia && (
          <>
            {isVideo ? (
              <video
                src={imagePath}
                autoPlay
                loop
                muted
                playsInline
                onError={() => setHasError(true)}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsZoomed(true)}
              />
            ) : (
              <img
                src={imagePath}
                alt={alt}
                onError={() => setHasError(true)}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsZoomed(true)}
              />
            )}
          </>
        )}
      </div>

      {/* Optional Minimal 1-Line Caption Bar */}
      {description && (
        <div className="px-4 py-2.5 bg-slate-50/70 border-t border-slate-200/70 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-mono truncate">
            {description}
          </span>
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {isZoomed && hasValidMedia && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-7xl w-full max-h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <video
                src={imagePath}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-auto max-h-[84vh] object-contain rounded-xl bg-black"
              />
            ) : (
              <img
                src={imagePath}
                alt={alt}
                className="w-full h-auto max-h-[84vh] object-contain rounded-xl bg-black"
              />
            )}
            <div className="flex items-center justify-between px-4 py-2.5 text-xs font-mono text-slate-300">
              <span className="font-bold text-white">{label}</span>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors font-semibold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
