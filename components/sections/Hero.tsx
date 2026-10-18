"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Eye } from "lucide-react";
import { InteractiveHeroBackground } from "@/components/ui/InteractiveHeroBackground";
import { InteractiveHeroButton } from "@/components/ui/InteractiveHeroButton";
import { fadeIn, staggerContainer } from "@/lib/animations";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Interactive Cursor-Tracking Cosmic Particle Wave Background */}
      <InteractiveHeroBackground />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center min-w-0 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-6 sm:space-y-8"
        >
          {/* Top Pill Badge matching screenshot */}
          <motion.div variants={fadeIn("up", 0.1)} className="inline-block max-w-full">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 rounded-full bg-slate-900/70 border border-cyan-400/30 text-cyan-200 text-[10px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-black/40 max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
              <span className="truncate">AI Optimization &amp; Software Platform</span>
            </div>
          </motion.div>

          {/* Centered Large Bold Headline matching screenshot */}
          <motion.h1
            variants={fadeIn("up", 0.2)}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.14] sm:leading-[1.12] max-w-4xl mx-auto break-words"
          >
            Smarter AI Tools For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
              Better Decisions
            </span>
          </motion.h1>

          {/* Supporting Paragraph matching screenshot */}
          <motion.p
            variants={fadeIn("up", 0.3)}
            className="text-sm sm:text-base lg:text-lg text-slate-300/95 leading-relaxed max-w-2xl mx-auto font-normal px-2 sm:px-0"
          >
            VyomAI is an AI-powered enterprise platform designed to help businesses automate complex processes, generate real-time predictive insights, and optimize mission-critical workflows with confidence. Built for speed, accuracy, and infinite scale.
          </motion.p>

          {/* Two Centered Action Buttons with Interactive Cursor-Move Spotlight Effect */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 pt-2 sm:pt-4 w-full max-w-sm sm:max-w-none mx-auto"
          >
            <InteractiveHeroButton href="/contact" variant="primary">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </InteractiveHeroButton>

            <InteractiveHeroButton href="/services" variant="secondary">
              <span>View Features</span>
            </InteractiveHeroButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
