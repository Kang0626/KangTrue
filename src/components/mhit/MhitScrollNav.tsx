'use client';

import React, { useEffect, useState, useRef } from 'react';
import { clsx } from 'clsx';

interface SectionTarget {
  id: string;
  shortLabel: string;
  fullLabel: string;
  category: string;
}

const SECTIONS: SectionTarget[] = [
  { id: 'motivation', shortLabel: '01. MOTIVATION', fullLabel: 'Executive Summary', category: 'RESEARCH MOTIVATION' },
  { id: 'hypotheses', shortLabel: '02. HYPOTHESES', fullLabel: 'Empirical Hypotheses', category: 'AREAS OF INQUIRY' },
  { id: 'viewer', shortLabel: '03. 3DGS VIEWER', fullLabel: 'Live Radiance Field', category: 'TECHNICAL SHOWCASE' },
  { id: 'pipeline', shortLabel: '04. PIPELINE', fullLabel: 'Solaris to 3DGS Synthesis', category: 'PIPELINE ARCHITECTURE' },
  { id: 'alignment', shortLabel: '05. HIT LAB NZ', fullLabel: 'HIT Lab NZ Research Streams', category: 'RESEARCH DOMAINS' },
  { id: 'credentials', shortLabel: '06. CREDENTIALS', fullLabel: 'Applicant Background', category: 'ACADEMIC CREDENTIALS' },
];

export const MhitScrollNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('motivation');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1400);

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      const scrollPosition = scrollTop + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const activeObj = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <aside
      aria-label="Research Proposal Section Tracker"
      className={clsx(
        'fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none transition-opacity duration-500 ease-out select-none',
        isScrolling ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Current Active Section Tooltip Pill */}
      <div className="bg-slate-950/90 text-white backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-xl shadow-xl flex flex-col items-end animate-in fade-in duration-300 max-w-[200px] text-right pointer-events-auto">
        <span className="text-[9px] font-mono text-[#38bdf8] font-bold tracking-widest uppercase">
          {activeObj.category}
        </span>
        <span className="text-xs font-sans font-bold text-slate-100 truncate w-full">
          {activeObj.fullLabel}
        </span>
      </div>

      {/* Vertical Track with Indicator Dots */}
      <div className="flex flex-col items-center gap-2 p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl pointer-events-auto">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              aria-label={`Jump to ${sec.fullLabel}`}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
            >
              <span
                className={clsx(
                  'rounded-full transition-all duration-300 block',
                  isActive
                    ? 'w-2.5 h-6 bg-[#0085ca] shadow-md shadow-[#0085ca]/50 ring-2 ring-[#0085ca]/30'
                    : 'w-2 h-2 bg-slate-600 group-hover:bg-slate-300 group-hover:scale-125'
                )}
              />
            </a>
          );
        })}
      </div>

      {/* Scroll percentage badge */}
      <div className="text-[10px] font-mono font-bold text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded-full border border-slate-800">
        {Math.round(scrollProgress)}%
      </div>
    </aside>
  );
};
