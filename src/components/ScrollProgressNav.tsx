'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Section {
  id: string;
  step: string;
  shortTag: string;
  subLabel: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', step: '01', shortTag: 'OVERVIEW', subLabel: 'Lead Proposal' },
  { id: 'strategic-value', step: '02', shortTag: 'STRATEGY', subLabel: 'ROI & Defence' },
  { id: 'case-01', step: '03', shortTag: 'CAPTURE', subLabel: '3DGS 17.5M' },
  { id: 'case-02', step: '04', shortTag: 'SYNTHETIC', subLabel: 'USD Stage' },
  { id: 'pipeline-tooling', step: '05', shortTag: 'PIPELINE', subLabel: 'Automation' },
  { id: 'contact', step: '06', shortTag: 'PROFILE', subLabel: 'Candidate' },
];

export const ScrollProgressNav: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('hero');
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal indicator on scroll
      setIsVisible(true);

      // Clear existing hide timer
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      // Hide after 1.6s idle unless hovered
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1600);

      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      setScrollPercent(percent);

      // Section detection: find section nearest to the upper-middle viewport
      const offsetTarget = window.innerHeight * 0.35;
      let currentSection = SECTIONS[0].id;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offsetTarget) {
            currentSection = section.id;
          }
        }
      }
      setActiveId(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 1200);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showIndicator = isVisible || isHovered;

  return (
    <nav
      aria-label="Section navigation"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed left-2.5 xl:left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start select-none transition-all duration-400 ease-out ${
        showIndicator
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 -translate-x-3 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center gap-2 py-2.5 px-1 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md border border-slate-200/70 shadow-xs hover:shadow-md transition-all duration-300">
        {/* Continuous progress track line */}
        <div className="absolute left-1/2 top-3 bottom-3 -translate-x-1/2 w-0.5 bg-slate-200/80 rounded-full overflow-hidden pointer-events-none">
          <div
            className="w-full bg-[#0085ca] transition-all duration-150"
            style={{ height: `${scrollPercent}%` }}
          />
        </div>

        {SECTIONS.map((sec) => {
          const isActive = activeId === sec.id;
          return (
            <div key={sec.id} className="relative group flex items-center">
              <button
                type="button"
                onClick={() => scrollTo(sec.id)}
                aria-label={`Scroll to ${sec.shortTag}`}
                aria-current={isActive ? 'true' : 'false'}
                className="relative z-10 flex items-center justify-center p-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0085ca]"
              >
                {/* Pill indicator */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-1.5 h-6 bg-[#0085ca] shadow-xs shadow-[#0085ca]/50 scale-105 ring-2 ring-[#0085ca]/20'
                      : 'w-1 h-3.5 bg-slate-300 group-hover:bg-slate-500 group-hover:h-4.5'
                  }`}
                />
              </button>

              {/* Compact 2-Line Tooltip Label — Only on Hover */}
              <div className="absolute left-full ml-2 pointer-events-none transition-all duration-200 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 flex items-center">
                <div className="bg-slate-900/95 text-white py-1 px-2 rounded-md shadow-lg border border-slate-700/80 backdrop-blur-md flex flex-col leading-tight min-w-[70px] max-w-[95px]">
                  <span className="text-[#0085ca] font-mono font-bold text-[9px] tracking-wider">
                    {sec.step} · {sec.shortTag}
                  </span>
                  <span className="text-slate-200 font-sans font-medium text-[10px] tracking-tight whitespace-nowrap mt-0.5">
                    {sec.subLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
