header_code = """'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const HeaderNav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Exact menu links per user's annotated reference (ABOUT is removed)
  const navLinks = [
    { label: 'OVERVIEW', href: '#hero' },
    { label: 'STAGE', href: '#stage' },
    { label: 'STRATEGY', href: '#strategic-value' },
    { label: '01. CAPTURE', href: '#case-01' },
    { label: '02. SYNTHETIC', href: '#case-02' },
    { label: 'PIPELINE', href: '#pipeline-tooling' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 h-20 flex items-center shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex items-center justify-between">
        {/* Left: KANGSIK KO & PRODUCTION LEAD PROPOSAL (per user's annotated reference) */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-sans group-hover:text-[#0085ca] transition-colors select-none leading-none">
              KANGSIK KO
            </span>
            <span className="text-[10px] font-mono tracking-[0.22em] text-[#0085ca] uppercase font-bold mt-1">
              PRODUCTION LEAD PROPOSAL
            </span>
          </div>
        </a>

        {/* Right: Desktop Navigation Links (OVERVIEW · STAGE · STRATEGY · 01. CAPTURE · 02. SYNTHETIC · PIPELINE · CONTACT) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-slate-600 hover:text-[#0085ca] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-700 hover:text-[#0085ca] p-2 rounded-lg transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-slate-200 px-6 py-6 shadow-xl flex flex-col gap-4 text-sm font-sans font-semibold uppercase tracking-[0.14em] text-slate-800">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#0085ca] border-b border-slate-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center block py-3 rounded-xl bg-[#0085ca] hover:bg-[#006ba8] text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-md shadow-[#0085ca]/20"
            >
              Direct Inquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
"""

with open('src/components/HeaderNav.tsx', 'w', encoding='utf-8') as f:
    f.write(header_code)
print('HeaderNav.tsx updated to match user annotated image')
