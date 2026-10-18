"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Activity } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { fadeIn } from "@/lib/animations";

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: "Autonomous Agent Architectures",
      desc: "Deterministic multi-agent workflows engineered with strict boundary controls and audit lineages.",
    },
    {
      title: "High-Throughput Cloud Fabrics",
      desc: "Distributed Kubernetes clusters and event-driven microservices built for sub-millisecond concurrency.",
    },
    {
      title: "Enterprise Security & Compliance",
      desc: "End-to-end encryption, strict role-based access, and continuous adherence to SOC 2 and HIPAA standards.",
    },
    {
      title: "Sprint-Driven Engineering Velocity",
      desc: "Bi-weekly sprint release cycles with real-time staging previews and transparent GitOps delivery.",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-slate-950/90 overflow-hidden">
      {/* Background ambient light blooms */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative & Pillars */}
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Top Heading in exactly TWO lines with text-justify on description */}
            <SectionHeading
              badge="About VyomAI"
              title={<span className="block text-white leading-tight">Where Infinite Vision</span>}
              gradientText={
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 leading-tight">
                  Meets Cognitive Intelligence
                </span>
              }
              description="Founded on the belief that software and AI should be inherently symbiotic, VyomAI architects future-proof software ecosystems that elevate human potential and enterprise capability."
              descriptionClassName="text-justify leading-relaxed"
              align="left"
              className="mb-6"
            />

            {/* Core Capability Pillars in Gradient Glass styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-gradient-to-br from-white/[0.07] via-slate-900/40 to-cyan-950/20 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/40 shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-relaxed transition-colors text-justify">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button linking to About page */}
            <div className="pt-3 sm:pt-4">
              <Button
                href="/about"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
                className="w-full sm:w-auto text-center"
              >
                Learn More About Our Team &amp; Story
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Cinematic 3D AI Architecture Image */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-6 w-full min-w-0"
          >
            <div className="relative group">
              {/* Outer Glowing Border Frame */}
              <div className="relative rounded-3xl p-1 sm:p-1.5 bg-gradient-to-tr from-cyan-400/50 via-sky-500/30 to-blue-600/50 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(0,240,255,0.2)] group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_55px_rgba(0,240,255,0.35)] transition-all duration-500 overflow-hidden">
                <div className="relative h-[260px] sm:h-[360px] lg:h-[450px] w-full rounded-[22px] overflow-hidden bg-slate-950">
                  <Image
                    src="/images/about-hero-bg.jpg"
                    alt="VyomAI Neural Architecture & 3D AI Core"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient sheen overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-cyan-500/10 pointer-events-none" />

                  {/* Top-left Holographic Status Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/40 backdrop-blur-md text-[10px] sm:text-xs font-mono text-cyan-300 shadow-lg max-w-[85%]">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                    <span className="truncate">AI_CORE // NEURAL_FABRIC</span>
                  </div>

                  {/* Bottom-right Floating Telemetry Metric */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 p-2 sm:p-3 rounded-2xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-xl shadow-xl flex items-center gap-2.5 max-w-[90%] sm:max-w-xs">
                    <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/40 shrink-0">
                      <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-bold text-white block truncate">Active Neural Fabric</span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-cyan-300 block truncate">Sub-12ms Multi-Agent Latency</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ambient radial blur behind image */}
              <div className="absolute -inset-4 bg-cyan-500/15 rounded-3xl blur-2xl -z-10 group-hover:bg-cyan-500/25 transition-all duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
