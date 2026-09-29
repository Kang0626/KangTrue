import React from 'react';
import { MhitHeaderNav } from '@/components/mhit/MhitHeaderNav';
import { MhitHeroSection } from '@/components/mhit/MhitHeroSection';
import { MhitHypothesesSection } from '@/components/mhit/MhitHypothesesSection';
import { MhitViewerSection } from '@/components/mhit/MhitViewerSection';
import { MhitPipelineSection } from '@/components/mhit/MhitPipelineSection';
import { MhitAlignmentSection } from '@/components/mhit/MhitAlignmentSection';
import { MhitCredentialsSection } from '@/components/mhit/MhitCredentialsSection';
import { MhitScrollNav } from '@/components/mhit/MhitScrollNav';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export const metadata = {
  title: 'High-Fidelity Spatial Computing & Radiance Fields | HIT Lab NZ MHIT Proposal',
  description: 'Master of Human Interface Technology (MHIT) Research Proposal & Interactive Portfolio for HIT Lab NZ, University of Canterbury by Kang (Kangsik) Ko.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0085ca]/20 selection:text-slate-900">
      {/* Header Navigation */}
      <MhitHeaderNav />

      {/* Floating Vertical Section Scroll Tracker */}
      <MhitScrollNav />

      {/* Main Narrative Flow */}
      <main>
        <MhitHeroSection />
        <MhitHypothesesSection />
        <MhitViewerSection />
        <MhitPipelineSection />
        <MhitAlignmentSection />
        <MhitCredentialsSection />
      </main>

      {/* Academic Footer */}
      <footer className="py-20 border-t border-slate-200 bg-slate-50 text-center text-xs font-mono text-slate-500">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 mb-2">
            <a href="#motivation" className="hover:text-[#0085ca] transition-colors font-medium">01. MOTIVATION</a>
            <a href="#hypotheses" className="hover:text-[#0085ca] transition-colors font-medium">02. HYPOTHESES</a>
            <a href="#viewer" className="hover:text-[#0085ca] transition-colors font-medium">03. 3DGS VIEWER</a>
            <a href="#pipeline" className="hover:text-[#0085ca] transition-colors font-medium">04. PIPELINE</a>
            <a href="#alignment" className="hover:text-[#0085ca] transition-colors font-medium">05. HIT LAB NZ</a>
            <a href="#credentials" className="hover:text-[#0085ca] transition-colors font-medium">06. CREDENTIALS</a>
            <Link href="/specs/" className="text-slate-600 hover:text-[#0085ca] transition-colors font-medium">RESEARCH SPECS</Link>
          </div>
          <p className="text-slate-800 font-medium">
            Master of Human Interface Technology (MHIT) Research Proposal — Kang (Kangsik) Ko | Christchurch, New Zealand
          </p>
          <p className="text-slate-400">
            Target Laboratory: Human Interface Technology Laboratory New Zealand (HIT Lab NZ) · University of Canterbury
          </p>
        </div>
      </footer>
    </div>
  );
}
