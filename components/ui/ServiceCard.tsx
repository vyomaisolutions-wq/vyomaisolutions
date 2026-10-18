"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  CloudCog,
  Palette,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const getIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" };
    switch (iconName) {
      case "Brain":
        return <Brain {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "Code2":
        return <Code2 {...props} />;
      case "Globe":
        return <Globe {...props} />;
      case "Smartphone":
        return <Smartphone {...props} />;
      case "CloudCog":
        return <CloudCog {...props} />;
      case "Palette":
        return <Palette {...props} />;
      case "Cpu":
        return <Cpu {...props} />;
      default:
        return <Brain {...props} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative flex flex-col justify-between p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.07] via-slate-900/40 to-cyan-950/20 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_25px_rgba(0,240,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.6),0_0_45px_rgba(0,240,255,0.25),inset_0_1px_2px_rgba(255,255,255,0.35)] transition-all duration-300 overflow-hidden cursor-pointer min-w-0"
    >
      {/* Top subtle gradient highlight on hover */}
      <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-400/25 transition-all duration-500" />

      <div>
        {/* Icon & Metrics badge */}
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 group-hover:border-cyan-400/60 group-hover:bg-cyan-950/70 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-300">
            {getIcon(service.iconName)}
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400/90 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-800/40 font-semibold">
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors duration-200 mb-3 sm:mb-4 leading-snug min-h-0 sm:min-h-[56px] flex items-center break-words">
          {service.title}
        </h3>

        {/* Key Features Bullet List */}
        <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 border-t border-white/10 pt-3.5 sm:pt-4">
          {service.features.slice(0, 3).map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-300 min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer link */}
      <div className="pt-2">
        <Link
          href={`/services/${service.slug || service.id}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors py-1.5"
        >
          <span>Learn More &amp; Architecture</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" />
        </Link>
      </div>
    </motion.div>
  );
};
