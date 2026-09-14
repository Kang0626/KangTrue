'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ABOUT_PROFILE } from '@/lib/constants';
import { Mail, Copy, Check, Clock, ShieldCheck, Users, Wrench } from 'lucide-react';

const ICONS = [Clock, ShieldCheck, Users, Wrench];

export const AboutSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kang0626@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-28 sm:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0085ca]/10 text-[#0085ca] border border-[#0085ca]/25 mb-4 uppercase tracking-wider">
            {ABOUT_PROFILE.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight truescape-title-bar mb-4">
            {ABOUT_PROFILE.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-light">
            {ABOUT_PROFILE.leadSubtitle}
          </p>
        </div>

        {/* Unified 2-Column Card (7 cols Competencies + 5 cols Contact & Status) */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-7 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left: 4 Production Lead Pillars (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#0085ca] font-bold">
                  Role Alignment &amp; Competencies
                </span>
                <span className="text-[11px] font-mono text-slate-400">4 Core Pillars</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {ABOUT_PROFILE.pillars.map((item, idx) => {
                  const IconComp = ICONS[idx] || ShieldCheck;
                  return (
                    <div
                      key={item.title}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#0085ca]/40 transition-all shadow-2xs flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 rounded-lg bg-[#0085ca]/10 text-[#0085ca] group-hover:scale-105 transition-transform">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono uppercase font-bold text-[#0085ca] bg-sky-50 border border-sky-100 px-2 py-0.5 rounded">
                            {item.tag}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 font-sans mb-1.5 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Looking for in-depth engineering documentation?</span>
                <Link
                  href="/specs/"
                  className="inline-flex items-center gap-1.5 text-[#0085ca] hover:text-[#006ba8] font-bold hover:underline"
                >
                  <span>Technical Specs ↗</span>
                </Link>
              </div>
            </div>

            {/* Right: Verification & Contact (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#0085ca] font-bold">
                  Direct Verification &amp; Contact
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold">Local Resident</span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-semibold text-emerald-700 uppercase tracking-wider">
                    <span className="pulse" />
                    <span>Immediate Start · Riccarton Office</span>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-500">Location</span>
                      <span className="text-slate-800 font-semibold">Christchurch, NZ (Local)</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-500">Work Rights</span>
                      <span className="text-emerald-700 font-bold">Full NZ Rights (No Visa Delay)</span>
                    </div>
                  </div>
                </div>

                {/* Copyable & Clickable Email Chip */}
                <div className="pt-4">
                  <div
                    onClick={handleCopyEmail}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0085ca] hover:bg-sky-50/40 flex items-center justify-between cursor-pointer transition-all group shadow-2xs"
                    title="Click to copy email address"
                  >
                    <div className="flex items-center gap-2.5 font-mono text-xs text-slate-700 group-hover:text-slate-900">
                      <Mail className="w-4 h-4 text-[#0085ca]" />
                      <span className="font-semibold">kang0626@gmail.com</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 group-hover:text-[#0085ca] flex items-center gap-1 font-semibold">
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Available for on-site meetings</span>
                <span className="text-slate-600 font-medium">Christchurch Central / Riccarton</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
