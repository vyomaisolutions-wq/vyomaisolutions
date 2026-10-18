"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { sampleTestimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? sampleTestimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === sampleTestimonials.length - 1 ? 0 : prev + 1));
  };

  const current = sampleTestimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 lg:py-32 bg-slate-950 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Sample Client Showcase"
          title="What Technical Leaders Say About"
          gradientText="Our Engineering Standards"
          description="A demonstration of client feedback patterns and verified architectural results. (Clearly labeled as sample enterprise feedback)"
        />

        {/* Testimonials Carousel Card */}
        <div className="max-w-3xl mx-auto min-w-0">
          <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-cyan-500/25 p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-xl min-w-0">
            {/* Ambient icon */}
            <div className="absolute top-4 sm:top-5 right-4 sm:right-6 text-cyan-500/15 pointer-events-none">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-5 min-w-0"
              >
                {/* Metric pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono max-w-full">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Verified Outcome: {current.metric}</span>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1 text-cyan-400">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-base sm:text-lg md:text-xl text-slate-100 font-medium leading-relaxed italic pr-6 sm:pr-10 break-words">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Author Info & Sample disclaimer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 sm:pt-5 border-t border-slate-800/80 min-w-0">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-slate-950 shadow-md shadow-cyan-500/20 text-sm shrink-0">
                      {current.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-white truncate">{current.name}</h4>
                      <p className="text-xs text-slate-400 truncate">
                        {current.role} • <span className="text-cyan-300">{current.company}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider self-start sm:self-center shrink-0">
                    Demonstration Content Only
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-slate-800/60">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer min-tap-target shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-slate-400 select-none">
                0{currentIndex + 1} / 0{sampleTestimonials.length}
              </span>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer min-tap-target shrink-0"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
