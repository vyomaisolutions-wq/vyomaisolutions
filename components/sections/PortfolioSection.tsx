"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Activity, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const categories = ["All", "AI & ML", "Web & Cloud", "Enterprise Systems", "Mobile"] as const;

export const PortfolioSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) {
          setProjects(data.data);
        }
      })
      .catch((err) => console.warn("Dynamic portfolio fetch error:", err));
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      {/* Background Image with Cinematic Overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <Image
          src="/images/about-hero-bg.jpg"
          alt="VyomAI Portfolio Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />
      </div>

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Engineering"
          title="Case Studies &amp; Architectural"
          gradientText="Breakthroughs"
          description="Explore how our AI models and custom software architectures drive tangible metrics and transform mission-critical operations."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-cyan-300 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <span>{category}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-cyan-950/80 border border-cyan-500/40 rounded-full -z-10 shadow-sm shadow-cyan-500/20"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 text-slate-400 col-span-full w-full">
                <p className="text-sm">Projects and case studies will appear here once published in the Admin Panel.</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project._id || project.slug || project.id}
                  project={project}
                  onOpenModal={(p) => setSelectedProject(p)}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            href="/portfolio"
            variant="secondary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
            className="w-full sm:w-auto text-center"
          >
            Explore Complete Portfolio &amp; Technical Whitepapers
          </Button>
        </div>
      </div>

      {/* Case Study Modal Preview */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-8 lg:p-10 shadow-2xl z-10 space-y-4 sm:space-y-6 overscroll-contain my-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="min-tap-target absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pr-10">
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {selectedProject.category}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-medium text-slate-400">
                  {selectedProject.clientIndustry}
                </span>
                {selectedProject.sampleBadge && (
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/30">
                    {selectedProject.sampleBadge}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white break-words">
                {selectedProject.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-cyan-500/20">
                <span className="text-[11px] font-mono text-cyan-400 block mb-1">
                  Verified Outcome:
                </span>
                <p className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
                  <span className="break-words">{selectedProject.results}</span>
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400 block">
                  Tech Stack Deployed:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] sm:text-xs font-mono text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
                  className="w-full sm:w-auto text-center"
                >
                  Commission a Similar Architecture
                </Button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="min-tap-target py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
