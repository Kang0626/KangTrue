code = """'use client';

import React, { useState } from 'react';
import { ABOUT_PROFILE } from '@/lib/constants';
import { Download, Linkedin, Mail, MapPin, CheckCircle, Quote, Briefcase, Copy, Check, Target, ShieldCheck, Users, Cpu, Layers, Award } from 'lucide-react';

const PILLAR_ICONS = [Target, ShieldCheck, Users, Cpu, Layers, Award];

export const AboutSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kangsik.ko@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-36 sm:py-44 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/25 mb-5 uppercase tracking-wider">
            {ABOUT_PROFILE.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight truescape-title-bar mb-6">
            {ABOUT_PROFILE.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Bringing 16+ years of senior VFX supervision, 5 years of university CG lecturing, and hands-on OpenUSD &amp; 3DGS pipeline engineering to lead Truescape&apos;s Christchurch production delivery.
          </p>
        </div>

        {/* Profile & Leadership Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/70 p-8 sm:p-12 lg:p-14 shadow-sm mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Bio Column (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                    {ABOUT_PROFILE.name}
                  </h3>
                  <span className="px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-xs font-mono font-bold text-[#0085ca]">
                    Candidate for Production Lead
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 mt-2">
                  <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Briefcase className="w-4 h-4 text-[#0085ca]" />
                    {ABOUT_PROFILE.role}
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    {ABOUT_PROFILE.location}
                  </span>
                </div>
                <p className="text-xs text-emerald-600 font-mono mt-2 font-semibold">
                  {ABOUT_PROFILE.workStatus}
                </p>
              </div>

              {/* 3 Metric Badges */}
              <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                {ABOUT_PROFILE.experienceHighlights.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="text-2xl sm:text-4xl font-black text-slate-900 font-mono block">
                      {stat.number}
                    </span>
                    <span className="text-xs text-[#0085ca] font-mono font-bold block mt-0.5">{stat.unit}</span>
                    <span className="text-[11px] text-slate-500 font-sans mt-1 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Career Summary Bullet Points */}
              <div className="space-y-3.5">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-[0.2em] block font-bold">
                  Key Career Track Record
                </span>
                {ABOUT_PROFILE.careerSummary.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 text-sm text-slate-700 font-sans leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-[#0085ca] shrink-0 mt-1" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Positioning Statement Quote Box */}
              <div className="p-7 rounded-2xl bg-white border border-sky-200 relative shadow-sm">
                <Quote className="w-10 h-10 text-sky-100 absolute top-4 right-4 pointer-events-none" />
                <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] block mb-2 font-bold">
                  Positioning Statement to Truescape
                </span>
                <p className="text-sm sm:text-base text-slate-800 italic leading-relaxed font-sans font-light">
                  &ldquo;{ABOUT_PROFILE.positioningStatement}&rdquo;
                </p>
              </div>
            </div>

            {/* Right Contact Card */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-8 sm:p-9 flex flex-col justify-between h-full shadow-sm">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-semibold text-emerald-700 uppercase tracking-wider mb-3">
                  <span className="pulse" />
                  <span>Immediate Availability · Riccarton Office</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-sans mb-2">
                  Direct Contact &amp; Verification
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans mb-6">
                  Available for an immediate in-person interview in Christchurch Central / Riccarton or technical discussion with Elliot Payne and the leadership committee.
                </p>

                {/* Contact List */}
                <div className="space-y-3 text-xs font-mono mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Location</span>
                    <span className="text-slate-800 font-semibold">Christchurch, NZ (Local)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Work Rights</span>
                    <span className="text-emerald-700 font-bold">Full NZ Rights (No Visa Required)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Start Date</span>
                    <span className="text-sky-700 font-bold">Immediate Office Onboarding</span>
                  </div>
                </div>

                {/* Copyable Email Chip */}
                <div
                  onClick={handleCopyEmail}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0085ca] flex items-center justify-between cursor-pointer transition-colors group mb-6 shadow-2xs"
                  title="Click to copy email address"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-700 group-hover:text-slate-900">
                    <Mail className="w-3.5 h-3.5 text-[#0085ca]" />
                    <span>kangsik.ko@gmail.com</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-[#0085ca] flex items-center gap-1">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href="mailto:kangsik.ko@gmail.com?subject=Truescape%20Production%20Lead%20Inquiry%20-%20Kangsik%20Ko"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0085ca] hover:bg-[#006ba8] text-white text-xs font-mono font-bold transition-all shadow-md shadow-[#0085ca]/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email Inquiry</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/kangsik-ko/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-mono font-semibold transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-sky-600" />
                  <span>LinkedIn Profile ↗</span>
                </a>

                <a
                  href="mailto:kangsik.ko@gmail.com?subject=Request%20Full%20CV%20PDF%20-%20Kangsik%20Ko"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-mono font-medium transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Request Full CV (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Production Lead Role Alignment Matrix */}
        <div className="pt-20 border-t border-slate-200">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono text-[#0085ca] uppercase tracking-[0.2em] font-bold block mb-2">
              Role Specification &amp; Deliverables Matrix
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
              Direct Alignment with Truescape Production Lead Role
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-light">
              Addressing each key requirement published in Truescape&apos;s Christchurch job opportunity — from daily stand-ups and WBS scoping to fact-based QA documentation, team mentorship, and AI/3DGS pipeline innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ABOUT_PROFILE.productionLeadMatrix.map((matrixItem, idx) => {
              const IconComp = PILLAR_ICONS[idx] || Target;
              return (
                <div
                  key={matrixItem.title}
                  className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-7 flex flex-col justify-between hover:bg-white hover:border-[#0085ca]/50 hover:shadow-lg transition-all shadow-2xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-[#0085ca]/10 text-[#0085ca] group-hover:scale-105 transition-transform">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#0085ca] bg-[#0085ca]/10 border border-[#0085ca]/20 px-2.5 py-1 rounded-full font-bold">
                        {matrixItem.pillar}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 font-sans mb-2.5">
                      {matrixItem.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans mb-6">
                      {matrixItem.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 space-y-2">
                    {matrixItem.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0085ca] shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
"""

with open("src/components/AboutSection.tsx", "w", encoding="utf-8") as f:
    f.write(code.strip() + "\n")

print("AboutSection.tsx successfully updated with Production Lead Matrix")
