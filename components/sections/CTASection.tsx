"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-10 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl px-5 py-7 sm:px-10 sm:py-10 lg:px-14 lg:py-12 bg-gradient-to-r from-slate-900 via-cyan-950/60 to-blue-950/80 border border-cyan-500/30 shadow-2xl overflow-hidden text-center min-w-0">
          {/* Animated decorative radiant glow inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-400/20 blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5 max-w-full">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
            <span className="truncate">Ready to Elevate Your Technology?</span>
          </div>

          {/* Headline */}
          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-4xl lg:max-w-5xl mx-auto leading-tight break-words">
            Have an Idea? Let&apos;s Build Something{" "}
            <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400">
              Intelligent &amp; Unstoppable
            </span>
            .
          </h2>

          {/* Subtext */}
          <p className="relative z-10 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
            Collaborate with our elite team of AI researchers, distributed systems architects, and full-stack product designers. Turn computational complexity into competitive superiority.
          </p>

          {/* Buttons */}
          <div className="relative z-10 mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-xl shadow-cyan-500/30 min-h-[48px] justify-center"
            >
              Start Your Project
            </Button>
            <Button
              href="/contact#discovery"
              variant="secondary"
              size="lg"
              leftIcon={<Calendar className="w-4 h-4 text-cyan-400" />}
              className="w-full sm:w-auto min-h-[48px] justify-center"
            >
              Schedule Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
