import React from 'react';
import { HeaderNav } from '@/components/HeaderNav';
import { HeroSection } from '@/components/HeroSection';
import { CaseStudyCapture } from '@/components/CaseStudyCapture';
import { CaseStudySynthetic } from '@/components/CaseStudySynthetic';
import { PipelineToolSection } from '@/components/PipelineToolSection';
import { ScrollProgressNav } from '@/components/ScrollProgressNav';

export const metadata = {
  title: '3DGS & OpenUSD R&D Case Studies | Kangsik Ko',
  description: 'Independent 3D Gaussian Splatting research, procedural Houdini hygiene, and 3D USD hybrid compositing case studies.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0085ca]/20 selection:text-slate-900">
      {/* Floating Vertical Section Scroll Tracker */}
      <ScrollProgressNav />

      {/* Sticky Header Navigation Bar */}
      <HeaderNav />

      {/* Visual-First Case Study Flow */}
      <main>
        <HeroSection />
        <CaseStudyCapture />
        <CaseStudySynthetic />
        <PipelineToolSection />
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-800 font-bold">
            Kangsik (Kang) Ko · Independent 3DGS &amp; OpenUSD R&amp;D Case Studies
          </span>
          <span className="text-slate-500">
            HIT Lab NZ Research Demonstration · Christchurch, New Zealand
          </span>
        </div>
      </footer>
    </div>
  );
}
