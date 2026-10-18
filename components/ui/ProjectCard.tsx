"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpenModal?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-br from-white/[0.08] via-slate-900/60 to-cyan-950/30 backdrop-blur-2xl border border-cyan-400/50 hover:border-cyan-300/80 shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(0,240,255,0.22),inset_0_1px_2px_rgba(255,255,255,0.25)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.7),0_0_50px_rgba(0,240,255,0.38),inset_0_1px_2px_rgba(255,255,255,0.45)] transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top ambient highlight line in normal state */}
      <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

      {/* 3D Visual Header with Real Image */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden border-b border-cyan-500/20 p-4 sm:p-5 flex flex-col justify-between">
        {/* Real 3D Project Image */}
        <Image
          src={project.image || `/images/projects/${project.id || project.slug || "neuro-finance"}.jpg`}
          alt={project.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700"
        />

        {/* Ambient dark gradient overlay to ensure badge contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/60 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-400/20 rounded-full blur-2xl group-hover:bg-cyan-400/35 transition-all duration-500 pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-400/50 text-cyan-300 backdrop-blur-md shadow-[0_0_10px_rgba(0,240,255,0.2)] truncate">
            {project.category}
          </span>
          <span className="text-[9px] sm:text-[10px] font-medium text-slate-200 bg-slate-950/80 px-2 sm:px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-md truncate shrink-0">
            {project.clientIndustry}
          </span>
        </div>

        {/* Dynamic Metric Display inside visual */}
        <div className="relative z-10 p-2.5 sm:p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 min-w-0">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
            <span className="truncate">{project.results}</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="mb-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400/90 font-semibold block truncate">
              {project.sampleBadge}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug mb-2.5 sm:mb-3 break-words">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300/90 group-hover:text-slate-200 leading-relaxed mb-4 transition-colors line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Action Link */}
        <div className="pt-3.5 sm:pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => onOpenModal?.(project)}
            className="inline-flex items-center gap-1.5 py-1 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link cursor-pointer"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0" />
          </button>
          <span className="text-xs text-slate-400 font-mono shrink-0">
            Case #0{String(project.id || project.slug || (project as unknown as { _id?: string })._id || "1").slice(-1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
