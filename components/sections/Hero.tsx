"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Eye } from "lucide-react";
import { InteractiveHeroBackground } from "@/components/ui/InteractiveHeroBackground";
import { InteractiveHeroButton } from "@/components/ui/InteractiveHeroButton";
import { fadeIn, staggerContainer } from "@/lib/animations";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Interactive Cursor-Tracking Cosmic Particle Wave Background */}
      <InteractiveHeroBackground />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Top Pill Badge matching screenshot */}
          <motion.div variants={fadeIn("up", 0.1)} className="inline-block">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-slate-900/60 border border-cyan-400/30 text-cyan-200 text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-black/40">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>AI Optimization &amp; Software Platform</span>
            </div>
          </motion.div>

          {/* Centered Large Bold Headline matching screenshot */}
          <motion.h1
            variants={fadeIn("up", 0.2)}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] max-w-4xl mx-auto"
          >
            Smarter AI Tools For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
              Better Decisions
            </span>
          </motion.h1>

          {/* Supporting Paragraph matching screenshot */}
          <motion.p
            variants={fadeIn("up", 0.3)}
            className="text-base sm:text-lg lg:text-xl text-slate-300/95 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            VyomAI is an AI-powered enterprise platform designed to help businesses automate complex processes, generate real-time predictive insights, and optimize mission-critical workflows with confidence. Built for speed, accuracy, and infinite scale.
          </motion.p>

          {/* Two Centered Action Buttons with Interactive Cursor-Move Spotlight Effect */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-3"
          >
            <InteractiveHeroButton href="/contact" variant="primary">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
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
