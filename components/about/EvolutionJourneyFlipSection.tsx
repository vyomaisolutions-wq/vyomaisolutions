"use client";

import React from "react";
import { Clock, Rocket, ShieldCheck, Cpu, Globe } from "lucide-react";
import { EvolutionFlipCard } from "./EvolutionFlipCard";

const EVOLUTION_JOURNEY_DATA = [
  {
    year: "2021",
    step: "01",
    phase: "PHASE 01",
    title: "Foundation & Vision",
    description:
      "VyomAi was founded to bridge enterprise software engineering with emerging automation tools and digital growth frameworks.",
    icon: Rocket,
    progressPercent: "25%",
    gradientText: "from-cyan-300 via-sky-300 to-blue-400",
    borderGlow: "hover:border-cyan-400/60 hover:shadow-cyan-500/20",
    iconColor: "text-cyan-400 border-cyan-500/30",
    accentBar: "from-cyan-400 to-sky-500",
  },
  {
    year: "2022",
    step: "02",
    phase: "PHASE 02",
    title: "Corporate Legal Advisory",
    description:
      "Expanded service portfolio to include full legal corporate advisory, trademark protection, GST, and statutory compliance consulting.",
    icon: ShieldCheck,
    progressPercent: "50%",
    gradientText: "from-sky-300 via-blue-400 to-indigo-400",
    borderGlow: "hover:border-sky-400/60 hover:shadow-sky-500/20",
    iconColor: "text-sky-400 border-sky-500/30",
    accentBar: "from-sky-400 to-indigo-500",
  },
  {
    year: "2023",
    step: "03",
    phase: "PHASE 03",
    title: "Autonomous AI Agents",
    description:
      "Pioneered RAG architectures and custom LLM chatbots for e-commerce, healthcare, finance, and legal enterprise clients.",
    icon: Cpu,
    progressPercent: "75%",
    gradientText: "from-blue-400 via-indigo-400 to-violet-400",
    borderGlow: "hover:border-indigo-400/60 hover:shadow-indigo-500/20",
    iconColor: "text-indigo-400 border-indigo-500/30",
    accentBar: "from-blue-400 to-violet-500",
  },
  {
    year: "2024+",
    step: "04",
    phase: "EXPANSION",
    title: "Global Expansion",
    description:
      "Extended operations across 12+ countries serving fast-growing scaleups and global corporate brands.",
    icon: Globe,
    progressPercent: "100%",
    gradientText: "from-cyan-300 via-teal-300 to-emerald-400",
    borderGlow: "hover:border-teal-400/60 hover:shadow-teal-500/20",
    iconColor: "text-teal-400 border-teal-500/30",
    accentBar: "from-cyan-400 via-teal-400 to-emerald-400",
  },
];

export const EvolutionJourneyFlipSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-slate-950 border-t border-slate-900/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>COMPANY HISTORY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight break-words">
            Our Evolution Journey
          </h2>
        </div>

        {/* 4-Column Responsive Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {EVOLUTION_JOURNEY_DATA.map((milestone) => (
            <EvolutionFlipCard
              key={milestone.title}
              year={milestone.year}
              step={milestone.step}
              phase={milestone.phase}
              title={milestone.title}
              description={milestone.description}
              icon={milestone.icon}
              progressPercent={milestone.progressPercent}
              gradientText={milestone.gradientText}
              borderGlow={milestone.borderGlow}
              iconColor={milestone.iconColor}
              accentBar={milestone.accentBar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
