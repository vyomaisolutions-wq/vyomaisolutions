"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  Layers,
  ShieldCheck,
  Rocket,
  Headphones,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChooseUsItems } from "@/data/company";
import { fadeIn, staggerContainer } from "@/lib/animations";

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" };
    switch (iconName) {
      case "BrainCircuit":
        return <BrainCircuit {...props} />;
      case "Code2":
        return <Code2 {...props} />;
      case "Layers":
        return <Layers {...props} />;
      case "ShieldCheck":
        return <ShieldCheck {...props} />;
      case "Rocket":
        return <Rocket {...props} />;
      case "Headphones":
        return <Headphones {...props} />;
      default:
        return <BrainCircuit {...props} />;
    }
  };

  return (
    <section id="why-us" className="relative py-16 sm:py-24 lg:py-32 bg-slate-950/80 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The VyomAI Advantage"
          title="Engineered for Performance,"
          gradientText="Proven for Mission-Critical Reliability"
          description="We combine the algorithmic ambition of frontier AI research with the disciplined rigor of veteran software engineering."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {whyChooseUsItems.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={fadeIn("up", idx * 0.08)}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] via-slate-900/60 to-cyan-950/30 backdrop-blur-2xl border border-cyan-400/50 hover:border-cyan-300/80 shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(0,240,255,0.22),inset_0_1px_2px_rgba(255,255,255,0.25)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.7),0_0_50px_rgba(0,240,255,0.38),inset_0_1px_2px_rgba(255,255,255,0.45)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer min-w-0"
            >
              {/* Top ambient highlight line in normal state */}
              <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute -top-14 -right-14 w-36 h-36 bg-cyan-400/20 rounded-full blur-2xl group-hover:bg-cyan-400/35 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Header Icon + Badge with glowing cyan presence in normal state */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-400/50 shadow-[0_0_18px_rgba(0,240,255,0.3)] group-hover:border-cyan-300 group-hover:bg-cyan-950/85 group-hover:shadow-[0_0_26px_rgba(0,240,255,0.45)] transition-all duration-300">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 font-mono shadow-[0_0_10px_rgba(0,240,255,0.18)]">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300/90 group-hover:text-slate-200 transition-colors leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Number indicator footer */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Core Pillar</span>
                <span className="text-cyan-400/80">0{idx + 1} / 06</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
