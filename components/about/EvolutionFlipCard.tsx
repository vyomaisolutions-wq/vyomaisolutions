"use client";

import React, { useState } from "react";
import { ArrowRight, LucideIcon } from "lucide-react";

interface EvolutionFlipCardProps {
  year: string;
  step: string;
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
  progressPercent: string;
  gradientText: string;
  borderGlow: string;
  iconColor: string;
  accentBar: string;
}

export const EvolutionFlipCard: React.FC<EvolutionFlipCardProps> = ({
  year,
  step,
  phase,
  title,
  description,
  icon: Icon,
  progressPercent,
  gradientText,
  borderGlow,
  iconColor,
  accentBar,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${year} ${title}. Click or press space to reveal details.`}
      aria-expanded={isFlipped}
      onKeyDown={handleKeyDown}
      onClick={handleToggle}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="group relative w-full h-[290px] sm:h-[310px] md:h-[320px] [perspective:1000px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl sm:rounded-3xl select-none"
    >
      {/* 3D Rotator Container */}
      <div
        className={`relative w-full h-full rounded-2xl sm:rounded-3xl transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.35,0,0.25,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${
          isFlipped ? "[transform:rotateY(-180deg)]" : "[transform:rotateY(0deg)]"
        }`}
      >
        {/* ================= FRONT FACE: Creative Chronology Design ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(0deg)] bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950/95 border border-white/10 ${borderGlow} shadow-[0_12px_35px_rgba(0,0,0,0.55),0_0_25px_rgba(0,240,255,0.06)] transition-all duration-500 p-6 sm:p-7 flex flex-col justify-between overflow-hidden`}
        >
          {/* Top Neon Circuit Track Accent */}
          <div className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${accentBar}`} />

          {/* Giant Holographic Watermark Year in Background */}
          <div className="absolute -right-2 top-8 text-6xl sm:text-7xl font-black font-mono text-white/[0.04] tracking-tighter select-none pointer-events-none group-hover:text-cyan-400/[0.08] group-hover:scale-105 transition-all duration-700">
            {year}
          </div>

          {/* Top Header: Phase Capsule + Icon Badge */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            {/* Phase pill with glowing active LED */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="font-semibold tracking-wider">{phase}</span>
            </div>

            {/* Futuristic Milestone Icon Badge */}
            <div className={`w-10 h-10 rounded-2xl bg-slate-950/90 border border-white/10 flex items-center justify-center ${iconColor} shadow-lg shadow-black/40 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300 shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>

          {/* Center Content: Bold Year Hero & Milestone Title */}
          <div className="my-auto py-2 relative z-10">
            {/* Hero Year with Vibrant Gradient */}
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${gradientText} mb-2`}>
              {year}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-200 transition-colors break-words">
              {title}
            </h3>
          </div>

          {/* Bottom Row: Chronology Rail & Arrow Trigger */}
          <div className="relative z-10 pt-4 border-t border-slate-800/80 group-hover:border-cyan-500/30 transition-colors flex items-center justify-between gap-3">
            {/* Timeline Progress Gauge */}
            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="truncate">JOURNEY STEP</span>
                <span className="text-cyan-400 font-bold ml-1">{step} / 04</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5 p-[1px]">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${accentBar} transition-all duration-500`}
                  style={{ width: progressPercent }}
                />
              </div>
            </div>

            {/* Stylish Right-Pointing Arrow Trigger */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:scale-110 transition-all duration-300 shadow-md shadow-cyan-500/15 shrink-0 ml-2">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* ================= BACK FACE: 3D Flipped Description ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-slate-950 via-slate-900/95 to-cyan-950/40 border border-cyan-400/50 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_35px_rgba(0,240,255,0.22)] p-6 sm:p-7 flex items-center justify-center overflow-hidden"
        >
          {/* Ambient Lighting & Accent Border */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Only Description Text - text-justify as requested */}
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal relative z-10 max-w-xs break-words text-justify">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
