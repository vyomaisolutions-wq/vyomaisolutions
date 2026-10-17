"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Activity,
  ArrowRight,
  X,
} from "lucide-react";
import { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";

const categories = ["All", "AI & ML", "Web & Cloud", "Enterprise Systems", "Mobile"] as const;

export const PortfolioPageClient: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  React.useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setProjects(data.data);
        }
      })
      .catch((err) => console.warn("Dynamic portfolio fetch:", err));
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const totalProjects = filteredProjects.length;
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById("portfolio-grid-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-20 pb-16 overflow-hidden">
      {/* Hero Header with Reduced Padding & Cosmic Neural Background Image */}
      <section className="relative py-12 sm:py-16 text-center overflow-hidden border-b border-slate-900/80">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src="/images/about-hero-bg.jpg"
            alt="VyomAI Portfolio Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/65 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-cyan-500/15 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Proven Engineering Demonstrations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 sm:mb-5">
            Case Studies &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500">
              Architectural Blueprints
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Deep dive into our engineering engagements across quantitative finance, healthcare, distributed cloud orchestration, and spatial commerce.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section id="portfolio-grid-section" className="py-12 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      layoutId="activePortfolioFilterPill"
                      className="absolute inset-0 bg-cyan-950/80 border border-cyan-500/40 rounded-full -z-10 shadow-sm shadow-cyan-500/20"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {paginatedProjects.length === 0 ? (
                <div className="text-center py-20 text-slate-400 col-span-full w-full">
                  <p>No projects published yet. Case studies will appear here once added in the Admin Panel.</p>
                </div>
              ) : (
                paginatedProjects.map((project) => (
                  <ProjectCard
                    key={project._id || project.slug || project.id}
                    project={project}
                    onOpenModal={(p) => setSelectedProject(p)}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>

          {/* 6 Cards Pagination Controls */}
          {totalProjects > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalItems={totalProjects}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              itemLabel="case studies"
            />
          )}
        </div>
      </section>

      {/* Case Study Modal Preview */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  {selectedProject.sampleBadge}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  {selectedProject.category} • {selectedProject.clientIndustry}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>

              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 mb-6">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Demonstrated Production Impact:
                </span>
                <p className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  {selectedProject.results}
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed mb-6">
                <div>
                  <h4 className="font-semibold text-white mb-1">The Engineering Challenge:</h4>
                  <p>
                    The client required a fault-tolerant distributed system capable of processing real-time multimodal inputs without compromising throughput, security, or audit traceability.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">VyomAI&apos;s Architectural Solution:</h4>
                  <p>{selectedProject.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">
                  Technology Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button
                  onClick={() => setSelectedProject(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
                <Button
                  href="/contact"
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Discuss Similar Project
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
