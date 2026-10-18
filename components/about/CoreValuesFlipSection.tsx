"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { FlipCard } from "./FlipCard";

const CORE_VALUES_DATA = [
  {
    title: "AI-First Innovation",
    description:
      "We continuously pioneer bleeding-edge AI models, autonomous agents, and automation frameworks to give our clients an unfair competitive advantage.",
  },
  {
    title: "Enterprise Trust & Integrity",
    description:
      "Uncompromising data security, strict regulatory compliance, and transparent delivery standard across all international markets.",
  },
  {
    title: "Client-Centric Growth",
    description:
      "Every line of code and marketing strategy is engineered to deliver measurable ROI and sustained operational velocity.",
  },
  {
    title: "Unmatched Excellence",
    description:
      "Rigorous quality assurance, clean architecture, zero technical debt, and continuous post-launch optimization.",
  },
];

export const CoreValuesFlipSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-slate-950/70 border-t border-slate-900/80 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>WHAT GUIDES US</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight break-words">
            Our Core Values
          </h2>
        </div>

        {/* 4-Column Responsive Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {CORE_VALUES_DATA.map((val, idx) => (
            <FlipCard
              key={val.title}
              title={val.title}
              description={val.description}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
