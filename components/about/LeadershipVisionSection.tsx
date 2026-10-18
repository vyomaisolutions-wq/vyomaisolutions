"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Cpu } from "lucide-react";

export const LeadershipVisionSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-slate-950 border-t border-slate-900/80 overflow-hidden">
      {/* Dynamic Cosmic Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Top Subtle Divider Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ================= LEFT COLUMN: Futuristic Cyber Portrait Frame ================= */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] group">
              {/* Outer Radiant Glow Aura */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-cyan-400/40 via-sky-500/20 to-blue-600/40 blur-xl opacity-75 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700 pointer-events-none" />

              {/* Multi-layered Glass Frame */}
              <div className="relative rounded-[28px] p-1.5 sm:p-2 bg-gradient-to-br from-cyan-400/50 via-slate-900/80 to-blue-600/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,240,255,0.18)] transition-all duration-500 overflow-hidden">
                <div className="relative h-[400px] sm:h-[480px] w-full rounded-[22px] overflow-hidden bg-slate-950">
                  {/* Executive Portrait Image */}
                  <Image
                    src="/images/leadership-portrait.jpg"
                    alt="VyomAI Executive Leadership"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* High-Tech HUD Cyber Corner Brackets */}
                  <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl z-20 pointer-events-none shadow-[0_0_10px_rgba(0,240,255,0.6)]" />
                  <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr z-20 pointer-events-none shadow-[0_0_10px_rgba(0,240,255,0.6)]" />
                  <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl z-20 pointer-events-none shadow-[0_0_10px_rgba(0,240,255,0.6)]" />
                  <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br z-20 pointer-events-none shadow-[0_0_10px_rgba(0,240,255,0.6)]" />

                  {/* Vignette Gradients for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Floating Holographic Executive Credential Dock */}
                  <div className="absolute bottom-3.5 inset-x-3.5 p-3 sm:p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.15)] flex items-center justify-between gap-3 z-20">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md shadow-cyan-400/30">
                        <ShieldCheck className="w-4 h-4 text-slate-950" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white tracking-wide truncate">
                          VyomAi Solutions
                        </div>
                        <div className="text-[10px] font-mono text-cyan-400 tracking-wider flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                          <span>Executive Office</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Executive Content & Interactive Cards ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 w-fit shadow-[0_0_20px_rgba(0,240,255,0.12)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>LEADERSHIP &amp; VISION</span>
            </div>

            {/* Heading with Dual-Tone Gradient */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 break-words">
              Driven By Innovation,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
                Grounded In Excellence
              </span>
            </h2>

            {/* Statement Narrative with Accent Border */}
            <div className="relative pl-4 sm:pl-5 border-l-2 border-cyan-400/60 mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal text-justify">
                At VyomAi Solutions Pvt Ltd, leadership goes beyond executive management—it is about cultivating a culture of relentless problem-solving, architectural precision, and total client empowerment.
              </p>
            </div>

            {/* 2 High-Tech Interactive Pillar Cards */}
            <div className="space-y-4 mb-8">
              {/* Pillar Card 1 */}
              <div className="group/item relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-950/90 border border-cyan-500/20 hover:border-cyan-400/50 shadow-md hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden flex items-start gap-4 hover:-translate-y-0.5">
                {/* Left Neon Highlight Glow */}
                <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 opacity-60 group-hover/item:opacity-100 transition-opacity" />

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-cyan-500/15 group-hover/item:scale-105 group-hover/item:bg-cyan-500 group-hover/item:text-slate-950 transition-all duration-300 text-cyan-400">
                  <Cpu className="w-5 h-5 transition-colors" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                      Core Discipline
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/70 shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed text-justify">
                    Cross-disciplinary mastery across software engineering, AI LLMs, digital growth, and legal compliance.
                  </p>
                </div>
              </div>

              {/* Pillar Card 2 */}
              <div className="group/item relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-950/90 border border-sky-500/20 hover:border-sky-400/50 shadow-md hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300 overflow-hidden flex items-start gap-4 hover:-translate-y-0.5">
                {/* Left Neon Highlight Glow */}
                <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-sky-400 to-indigo-500 opacity-60 group-hover/item:opacity-100 transition-opacity" />

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-600/10 border border-sky-400/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-sky-500/15 group-hover/item:scale-105 group-hover/item:bg-sky-400 group-hover/item:text-slate-950 transition-all duration-300 text-sky-400">
                  <ShieldCheck className="w-5 h-5 transition-colors" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-semibold">
                      Client Assurance
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400/70 shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed text-justify">
                    Hands-on guidance for every enterprise engagement from discovery to deployment and post-launch SLAs.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button Row */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 group"
              >
                <span>Connect With Leadership</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Direct Discovery Line</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
