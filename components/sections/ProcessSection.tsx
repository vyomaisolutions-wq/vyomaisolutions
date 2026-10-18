"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SearchCode,
  Layers,
  Code,
  ShieldCheck,
  Rocket,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeIn, staggerContainer } from "@/lib/animations";

export const ProcessSection: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" };
    switch (iconName) {
      case "SearchCode":
        return <SearchCode {...props} />;
      case "Layers":
        return <Layers {...props} />;
      case "Code":
        return <Code {...props} />;
      case "ShieldCheck":
        return <ShieldCheck {...props} />;
      case "Rocket":
        return <Rocket {...props} />;
      case "Cpu":
        return <Cpu {...props} />;
      default:
        return <Code {...props} />;
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-slate-950/90 overflow-hidden">
      {/* Background ambient light blooms */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          badge="Disciplined Execution"
          title="From Conceptual Model to"
          gradientText="Production Reality"
          description="A structured, predictable 6-phase engineering lifecycle designed to eliminate architectural drift and guarantee velocity."
        />

        {/* Top Interactive Pipeline Highway Status Bar */}
        <div className="mb-14 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.05] via-slate-900/60 to-cyan-950/20 border border-white/10 backdrop-blur-2xl shadow-lg hidden md:block">
          <div className="flex items-center justify-between relative">
            {/* Glowing connecting track line */}
            <div className="absolute top-1/2 left-8 right-8 h-[2px] -translate-y-1/2 bg-slate-800 -z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_#00f0ff]"
                style={{
                  width:
                    hoveredStep !== null
                      ? `${((hoveredStep + 1) / processSteps.length) * 100}%`
                      : "100%",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {processSteps.map((step, idx) => {
              const isCurrent = hoveredStep === idx;
              const isPassed = hoveredStep !== null && idx <= hoveredStep;

              return (
                <div
                  key={step.step}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                      isCurrent
                        ? "bg-cyan-400 text-slate-950 shadow-[0_0_20px_#00f0ff] scale-125"
                        : isPassed
                        ? "bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                        : "bg-slate-900 border border-slate-700 text-slate-400 group-hover:border-cyan-500/60 group-hover:text-cyan-300"
                    }`}
                  >
                    {step.step}
                  </div>
                  <span
                    className={`text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      isCurrent
                        ? "text-cyan-300 font-bold"
                        : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    {step.title.split("&")[0].trim()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6 Connected Creative Gradient Glass Workflow Cards (3x2 Bento Layout) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              variants={fadeIn("up", idx * 0.08)}
              whileHover={{ y: -6, scale: 1.02 }}
              onMouseEnter={() => setHoveredStep(idx)}
              onMouseLeave={() => setHoveredStep(null)}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] via-slate-900/60 to-cyan-950/30 backdrop-blur-2xl border border-cyan-400/50 hover:border-cyan-300/80 shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(0,240,255,0.22),inset_0_1px_2px_rgba(255,255,255,0.25)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.7),0_0_50px_rgba(0,240,255,0.38),inset_0_1px_2px_rgba(255,255,255,0.45)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer min-w-0"
            >
              {/* Top Laser Edge Highlight in normal state */}
              <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Watermark Big Phase Number in corner */}
              <div className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black font-mono text-white/[0.03] group-hover:text-cyan-400/[0.08] transition-colors pointer-events-none select-none">
                {step.step}
              </div>

              {/* Corner Ambient Glow Blob */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-400/20 rounded-full blur-2xl group-hover:bg-cyan-400/35 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Header: Icon + Phase Pill with glowing cyan in normal state */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-400/50 shadow-[0_0_18px_rgba(0,240,255,0.3)] group-hover:border-cyan-300 group-hover:bg-cyan-950/85 group-hover:shadow-[0_0_26px_rgba(0,240,255,0.45)] transition-all duration-300">
                    {getIcon(step.iconName)}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.18)]">
                    PHASE {step.step}
                  </span>
                </div>

                {/* Subtitle pill */}
                <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/80 mb-1.5 sm:mb-2 font-semibold">
                  {step.subtitle}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors mb-2.5 sm:mb-3 leading-snug break-words">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300/90 group-hover:text-slate-200 transition-colors leading-relaxed mb-5 sm:mb-6 text-left sm:text-justify">
                  {step.description}
                </p>
              </div>

              {/* Deliverables Pills */}
              <div className="relative z-10 pt-3.5 sm:pt-4 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider font-semibold">
                  Deliverables:
                </span>
                <div className="space-y-1.5">
                  {step.deliverables.map((deliv, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-300 group-hover:text-slate-200 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="break-words leading-tight">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
