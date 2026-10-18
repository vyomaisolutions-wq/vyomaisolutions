"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Layers, Cpu, Database, Cloud, Layout } from "lucide-react";
import { technologyStack, techStackCategories } from "@/data/technologies";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredTech =
    selectedCategory === "All"
      ? technologyStack
      : technologyStack.filter((item) => item.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "AI & Machine Learning":
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case "Frontend":
        return <Layout className="w-3.5 h-3.5 text-sky-400" />;
      case "Backend":
        return <Layers className="w-3.5 h-3.5 text-blue-400" />;
      case "Databases":
        return <Database className="w-3.5 h-3.5 text-cyan-300" />;
      case "Cloud & DevOps":
        return <Cloud className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technological Mastery"
          title="Battle-Tested Tools &amp;"
          gradientText="Modern Stack Ecosystem"
          description="We select proven, high-concurrency technologies that guarantee developer velocity, mathematical precision, and sustained enterprise stability."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-12">
          {techStackCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative min-h-[38px] flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {cat !== "All" && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Technology Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 hover:bg-slate-900"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-cyan-400 font-mono">
                    {tech.badge}
                  </span>
                  <div className="flex items-center gap-1">
                    {getCategoryIcon(tech.category)}
                  </div>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors mb-1.5">
                  {tech.name}
                </h4>

                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
