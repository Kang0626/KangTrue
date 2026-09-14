code = '''import React from 'react';
import { HeaderNav } from '@/components/HeaderNav';
import { HeroSection } from '@/components/HeroSection';
import { InteractiveStage } from '@/components/InteractiveStage';
import { TechValueSection } from '@/components/TechValueSection';
import { CaseStudyCapture } from '@/components/CaseStudyCapture';
import { CaseStudySynthetic } from '@/components/CaseStudySynthetic';
import { PipelineToolSection } from '@/components/PipelineToolSection';
import { AboutSection } from '@/components/AboutSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0085ca]/20 selection:text-slate-900">
      {/* Executive Header Navigation Bar */}
      <HeaderNav />

      {/* Main Single-Page Narrative Flow */}
      <main>
        <HeroSection />
        <InteractiveStage />
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
            <a href="#stage" className="hover:text-slate-900 transition-colors font-medium">STAGE</a>
            <a href="#strategic-value" className="hover:text-slate-900 transition-colors font-medium">STRATEGY</a>
            <a href="#case-01" className="hover:text-slate-900 transition-colors font-medium">01. CAPTURE</a>
            <a href="#case-02" className="hover:text-slate-900 transition-colors font-medium">02. SYNTHETIC</a>
            <a href="#pipeline-tooling" className="hover:text-slate-900 transition-colors font-medium">PIPELINE</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors font-medium">CONTACT</a>
          </div>
          <p className="text-slate-700 font-medium">
            © 2026 Truescape Production Lead Proposal — Prepared by Kangsik (Kang) Ko | Christchurch, New Zealand
          </p>
          <p className="text-slate-400">
            Engineered with Next.js 14 App Router, Three.js WebGL2 3DGS, and SideFX Houdini Solaris OpenUSD Workflows.
          </p>
        </div>
      </footer>
    </div>
  );
}
'''
with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code.strip() + '\n')
print('src/app/page.tsx written successfully')
