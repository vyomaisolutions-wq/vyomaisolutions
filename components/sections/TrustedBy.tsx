"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Shield, Zap, Cpu } from "lucide-react";
import { companyHighlights } from "@/data/company";
import { fadeIn, staggerContainer } from "@/lib/animations";

export const TrustedBy: React.FC = () => {
  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" };
    switch (iconName) {
      case "Sparkles":
        return <Sparkles {...props} />;
      case "Users":
        return <Users {...props} />;
      case "Shield":
        return <Shield {...props} />;
      case "Zap":
        return <Zap {...props} />;
      default:
        return <Cpu {...props} />;
    }
  };

  return (
    <section className="relative py-16 bg-slate-950/60 border-y border-cyan-500/10 overflow-hidden">
      {/* Background ambient light blooms */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Company Core Highlights - Gradient Glass Transparent Shadow Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {companyHighlights.map((item, idx) => (
            <motion.div
              key={item.label}
              variants={fadeIn("up", idx * 0.1)}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] via-slate-900/40 to-cyan-950/20 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_25px_rgba(0,240,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.6),0_0_45px_rgba(0,240,255,0.28),inset_0_1px_2px_rgba(255,255,255,0.35)] transition-all duration-300 flex items-start gap-4 overflow-hidden cursor-pointer min-w-0"
            >
              {/* Top ambient highlight line on hover */}
              <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Inner ambient glowing corner blob */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-400/10 rounded-full blur-2xl group-hover:bg-cyan-400/30 transition-all duration-500 pointer-events-none" />

              {/* Glass Icon Container */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 group-hover:border-cyan-400/60 group-hover:bg-cyan-950/70 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-300 shrink-0 relative z-10">
                {getIcon(item.iconName)}
              </div>

              {/* Card Texts */}
              <div className="relative z-10 flex-1 min-w-0">
                <div className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-200 transition-colors tracking-tight truncate">
                  {item.metric}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-white mt-0.5 tracking-tight truncate">
                  {item.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 group-hover:text-slate-300 mt-1 leading-relaxed transition-colors">
                  {item.subtext}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
