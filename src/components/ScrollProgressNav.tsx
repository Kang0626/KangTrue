'use client';

import React, { useEffect, useState } from 'react';

interface Section {
  id: string;
  step: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', step: '01', label: 'Overview' },
  { id: 'strategic-value', step: '02', label: 'Strategic Value' },
  { id: 'case-01', step: '03', label: 'Case 01: Capture' },
  { id: 'case-02', step: '04', label: 'Case 02: Synthetic' },
  { id: 'pipeline-tooling', step: '05', label: 'Pipeline Tooling' },
  { id: 'contact', step: '06', label: 'Candidate Profile' },
];

export const ScrollProgressNav: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('hero');
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-4 xl:left-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start select-none"
    >
      <div className="relative flex flex-col items-center gap-2.5 py-3 px-1.5 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
        {/* Continuous progress track line */}
        <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-slate-200 rounded-full overflow-hidden pointer-events-none">
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
                aria-label={`Scroll to ${sec.label}`}
                aria-current={isActive ? 'true' : 'false'}
                className="relative z-10 flex items-center justify-center p-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0085ca]"
              >
                {/* Pill indicator matching user sketch */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2 h-7 bg-[#0085ca] shadow-sm shadow-[#0085ca]/60 scale-105 ring-2 ring-[#0085ca]/20'
                      : 'w-1.5 h-4 bg-slate-300 group-hover:bg-slate-400 group-hover:h-5'
                  }`}
                />
              </button>

              {/* Tooltip Label on Hover / Active */}
              <div
                className={`absolute left-full ml-3 pointer-events-none transition-all duration-200 flex items-center ${
                  isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                <div className="bg-slate-900/90 text-white text-[11px] font-mono px-2.5 py-1 rounded-md shadow-md border border-slate-800/80 backdrop-blur-xs flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-[#0085ca] font-bold">{sec.step}</span>
                  <span className="text-slate-200 font-medium">{sec.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
