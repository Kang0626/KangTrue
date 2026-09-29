import React from 'react';
import { HeaderNav } from '@/components/HeaderNav';
import { HeroSection } from '@/components/HeroSection';
import { TechValueSection } from '@/components/TechValueSection';
import { CaseStudyCapture } from '@/components/CaseStudyCapture';
import { CaseStudySynthetic } from '@/components/CaseStudySynthetic';
import { PipelineToolSection } from '@/components/PipelineToolSection';
import { AboutSection } from '@/components/AboutSection';
import { ScrollProgressNav } from '@/components/ScrollProgressNav';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Private Technical Showcase | Kangsik Ko',
  description: 'Authorized production case studies, procedural hygiene, and spatial pipeline tooling.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0085ca]/20 selection:text-slate-900">
      {/* Authorized Private Banner */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2.5 px-6 border-b border-slate-800 flex items-center justify-between sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-mono font-semibold text-white">AUTHORIZED PRIVATE SHOWCASE</span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">Strict Access Mode Active</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors font-mono text-[11px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to MHIT Proposal</span>
          </Link>
        </div>
      </div>

      {/* Floating Vertical Section Scroll Tracker */}
      <ScrollProgressNav />

      {/* Executive Header Navigation Bar */}
      <HeaderNav />

      {/* Main Single-Page Narrative Flow */}
      <main className="pt-2">
        <HeroSection />
        <TechValueSection />
        <CaseStudyCapture />
        <CaseStudySynthetic />
        <PipelineToolSection />
        <AboutSection />
      </main>

      {/* Clean Minimalist Light Footer */}
      <footer className="py-20 border-t border-slate-200 bg-slate-50 text-center text-xs font-mono text-slate-500">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 mb-2">
            <a href="#hero" className="hover:text-slate-900 transition-colors font-medium">OVERVIEW</a>
            <a href="#strategic-value" className="hover:text-slate-900 transition-colors font-medium">STRATEGY</a>
            <a href="#case-01" className="hover:text-slate-900 transition-colors font-medium">01. CAPTURE</a>
            <a href="#case-02" className="hover:text-slate-900 transition-colors font-medium">02. SYNTHETIC</a>
            <a href="#pipeline-tooling" className="hover:text-slate-900 transition-colors font-medium">PIPELINE</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors font-medium">CONTACT</a>
          </div>
          <p className="text-slate-700 font-medium">
            © 2026 Kangsik (Kang) Ko · Confidential Production Case Studies &amp; Procedural Tooling
          </p>
          <p className="text-slate-400">
            Engineered with Next.js 14 App Router, Three.js WebGL2 3DGS, and SideFX Houdini Solaris OpenUSD Workflows.
          </p>
        </div>
      </footer>
    </div>
  );
}
