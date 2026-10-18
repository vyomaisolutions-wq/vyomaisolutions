"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface FlipCardProps {
  title: string;
  description: string;
  badge?: string;
  year?: string;
  index?: number;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  title,
  description,
  badge,
  year,
  index = 0,
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
      aria-label={`${title}. Click or press space to reveal details.`}
      aria-expanded={isFlipped}
      onKeyDown={handleKeyDown}
      onClick={handleToggle}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="group relative w-full h-[270px] sm:h-[290px] md:h-[300px] [perspective:1000px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl sm:rounded-3xl select-none"
    >
      {/* 3D Rotator Container */}
      <div
        className={`relative w-full h-full rounded-2xl sm:rounded-3xl transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.35,0,0.25,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${
          isFlipped ? "[transform:rotateY(-180deg)]" : "[transform:rotateY(0deg)]"
        }`}
      >
        {/* ================= FRONT FACE (Default State) ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(0deg)] bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-slate-950/95 border border-cyan-500/25 group-hover:border-cyan-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,240,255,0.04)] group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(0,240,255,0.18)] transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
        >
          {/* Top Ambient Glow & Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Content: Optional Badge / Year */}
          {(year || badge) ? (
            <div className="flex items-center justify-start">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold tracking-wider">
                {year || badge}
              </span>
            </div>
          ) : (
            <div />
          )}

          {/* Center: Card Title */}
          <div className="my-auto py-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-200 transition-colors break-words">
              {title}
            </h3>
          </div>

          {/* Bottom Content: Stylish Right-Pointing Arrow Icon */}
          <div className="flex items-center justify-end pt-4 border-t border-slate-800/80 group-hover:border-cyan-500/30 transition-colors">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:scale-110 transition-all duration-300 shadow-md shadow-cyan-500/15 shrink-0">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* ================= BACK FACE (Flipped State) ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-slate-950 via-slate-900/95 to-cyan-950/40 border border-cyan-400/50 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_35px_rgba(0,240,255,0.22)] p-6 sm:p-7 flex items-center justify-center overflow-hidden"
        >
          {/* Ambient Lighting & Accent Border */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Only Description Text - text-justify */}
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal relative z-10 max-w-xs break-words text-justify">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
