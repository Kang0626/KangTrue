'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, FileText, Lock, ShieldCheck } from 'lucide-react';

export const MhitHeaderNav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: '01. MOTIVATION', href: '#motivation' },
    { label: '02. HYPOTHESES', href: '#hypotheses' },
    { label: '03. 3DGS VIEWER', href: '#viewer' },
    { label: '04. PIPELINE', href: '#pipeline' },
    { label: '05. HIT LAB NZ', href: '#alignment' },
    { label: '06. CREDENTIALS', href: '#credentials' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 h-20 flex items-center shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex items-center justify-between">
        {/* Left: Applicant Name & Academic Subtitle */}
        <Link href="#motivation" className="flex items-center gap-3 group">
          <div className="flex flex-col w-fit">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-sans group-hover:text-[#0085ca] transition-colors select-none leading-none whitespace-nowrap">
              KANGSIK KO
            </span>
            <div className="w-full flex items-center justify-between text-[7.5px] sm:text-[8.5px] font-mono font-bold text-[#0085ca] uppercase select-none mt-1.5 tracking-[0.06em]">
              <span>HIT LAB NZ</span>
              <span>·</span>
              <span>MHIT</span>
              <span className="-mr-[0.06em]">RESEARCH</span>
            </div>
          </div>
        </Link>

        {/* Right: Desktop Navigation Links + Specs + Showcase Badge */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] xl:text-xs font-sans font-semibold uppercase tracking-[0.14em] text-slate-600 hover:text-[#0085ca] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/specs/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 hover:bg-[#0085ca] hover:text-white transition-all shadow-2xs border border-slate-200"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>SPECS</span>
          </Link>

          <Link
            href="/showcase/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/30 hover:bg-[#0085ca] hover:text-white transition-all shadow-2xs"
            title="Authorized Private Production Showcase (Access Restricted)"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>SHOWCASE</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/showcase/"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/30"
          >
            <Lock className="w-3 h-3" />
            <span>SHOWCASE</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold tracking-wider text-slate-800 hover:text-[#0085ca] py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="/specs/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-slate-100 text-slate-700"
            >
              <FileText className="w-4 h-4" />
              <span>RESEARCH ARCHITECTURE &amp; SPECS</span>
            </Link>
            <Link
              href="/showcase/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-[#0085ca] text-white shadow-md shadow-[#0085ca]/20"
            >
              <Lock className="w-4 h-4" />
              <span>PRIVATE PRODUCTION SHOWCASE 🔒</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
