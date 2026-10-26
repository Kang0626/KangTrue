'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Lock } from 'lucide-react';

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
    { label: '01. 3DGS RESEARCH', href: '#case-01' },
    { label: '02. 3DGS + USD COMPOSITING', href: '#case-02' },
    { label: '03. PIPELINE TOOL', href: '#pipeline-tooling' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 h-16 flex items-center shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex items-center justify-between">
        {/* Left: Presenter & Research Showcase Title */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-sans group-hover:text-[#0085ca] transition-colors leading-none">
              KANGSIK KO
            </span>
            <span className="text-[9px] font-mono font-bold text-[#0085ca] uppercase tracking-[0.14em] mt-1">
              3DGS &amp; OPENUSD R&amp;D CASE STUDIES
            </span>
          </div>
        </a>

        {/* Right: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-[#0085ca] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-[#0085ca] hover:text-white hover:border-[#0085ca] transition-all"
          >
            <span>MHIT PROPOSAL</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Lock Session"
            aria-label="Lock Session"
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
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 px-6 py-5 shadow-xl flex flex-col gap-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
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
            href="/"
            onClick={() => setMobileOpen(false)}
            className="py-2 text-[#0085ca] flex items-center justify-between border-b border-slate-100"
          >
            <span>MHIT PROPOSAL</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 text-xs font-mono font-medium uppercase flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Session</span>
          </button>
        </div>
      )}
    </header>
  );
};
