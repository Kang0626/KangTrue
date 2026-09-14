'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, FileText, Lock } from 'lucide-react';

export const HeaderNav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout/', { method: 'POST' });
    } finally {
      window.location.href = '/login/';
    }
  };

  const navLinks = [
    { label: 'OVERVIEW', href: '/#hero' },
    { label: 'STRATEGY', href: '/#strategic-value' },
    { label: '01. CAPTURE', href: '/#case-01' },
    { label: '02. SYNTHETIC', href: '/#case-02' },
    { label: 'PIPELINE', href: '/#pipeline-tooling' },
    { label: 'CONTACT', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 h-20 flex items-center shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex items-center justify-between">
        {/* Left: KANGSIK KO & PRODUCTION LEAD PROPOSAL */}
        <Link href="/#hero" className="flex items-center gap-3 group">
          <div className="flex flex-col w-fit">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-sans group-hover:text-[#0085ca] transition-colors select-none leading-none whitespace-nowrap">
              KANGSIK KO
            </span>
            <div className="w-full flex items-center justify-between text-[7.5px] sm:text-[8.5px] font-mono font-bold text-[#0085ca] uppercase select-none mt-1.5 tracking-[0.06em]">
              <span>PRODUCTION</span>
              <span>LEAD</span>
              <span className="-mr-[0.06em]">PROPOSAL</span>
            </div>
          </div>
        </Link>

        {/* Right: Desktop Navigation Links + Specs Badge */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-slate-600 hover:text-[#0085ca] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/specs/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/30 hover:bg-[#0085ca] hover:text-white transition-all shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>SPECS ↗</span>
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Lock Portal (Log Out)"
            aria-label="Lock Portal"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
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
          <Link
            href="/specs/"
            onClick={() => setMobileOpen(false)}
            className="py-2 text-[#0085ca] flex items-center justify-between border-b border-slate-100 transition-colors"
          >
            <span>FULL TECHNICAL SPECS</span>
            <FileText className="w-4 h-4" />
          </Link>
          <div className="pt-2 space-y-2">
            <a
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center block py-3 rounded-xl bg-[#0085ca] hover:bg-[#006ba8] text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-md shadow-[#0085ca]/20"
            >
              Direct Inquiry
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 text-xs font-mono font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
