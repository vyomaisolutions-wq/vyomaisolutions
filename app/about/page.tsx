import { Metadata } from "next";
import Image from "next/image";
import {
  Target,
  Compass,
  Sparkles,
  ShieldCheck,
  Cpu,
  Users,
  CheckCircle2,
  Zap,
  Layers,
} from "lucide-react";
import { companyInfo } from "@/data/company";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";
import { LeadershipVisionSection } from "@/components/about/LeadershipVisionSection";
import { CoreValuesFlipSection } from "@/components/about/CoreValuesFlipSection";
import { EvolutionJourneyFlipSection } from "@/components/about/EvolutionJourneyFlipSection";
export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const seo = await getPageSeoFromDb("about");
  return constructMetadata({
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/about",
  });
}

export default function AboutPage() {
  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden w-full min-w-0">
      {/* Hero Header with Reduced Padding & Cosmic Neural Background Image */}
      <section className="relative py-12 sm:py-16 text-center overflow-hidden border-b border-slate-900/80">
        {/* Background Image with Cinematic Overlays */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src="/images/about-hero-bg.jpg"
            alt="VyomAI Cosmic Neural Network"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          {/* Ambient dark gradient overlays to ensure stellar contrast and legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/65 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-cyan-500/15 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5 max-w-full">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">The VyomAI Narrative</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 sm:mb-5 break-words">
            Pioneering the Next Frontier of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500">
              Cognitive Software
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            &ldquo;Vyom&rdquo; translates to the infinite cosmos. We exist to build software architectures and AI models that operate without technological bounds.
          </p>
        </div>
      </section>

      {/* Creative Mission & Vision Section */}
      <section className="relative py-16 sm:py-20 bg-slate-950 overflow-hidden border-y border-slate-900/80">
        {/* Background Ambient Glows & Tech Grid */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Sub-heading */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Foundational Philosophy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight break-words">
              Driven by Purpose,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
                Anchored in Vision
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Mission Card */}
            <div className="group relative p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-cyan-500/30 hover:border-cyan-400/60 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col justify-between min-w-0">
              {/* Top Neon Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Watermark Icon */}
              <Target className="absolute -bottom-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 text-cyan-500/5 stroke-1 pointer-events-none group-hover:text-cyan-500/10 group-hover:scale-105 transition-all duration-700" />

              <div>
                {/* Header Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono text-cyan-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span>ACTIVE MANDATE</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3 sm:mb-4 break-words">
                  Our Mission
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed relative z-10 text-justify">
                  {companyInfo.mission}
                </p>

                {/* Key Strategic Pillars */}
                <div className="mt-6 sm:mt-8 space-y-2.5 relative z-10">
                  <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-cyan-500/15 group-hover:border-cyan-500/30 transition-colors min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium truncate">
                      Deterministic AI Guardrails &amp; Zero-Hallucination SLAs
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-cyan-500/15 group-hover:border-cyan-500/30 transition-colors min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium truncate">
                      High-Throughput Distributed Microservice Architecture
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-cyan-500/15 group-hover:border-cyan-500/30 transition-colors min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium truncate">
                      Enterprise-Grade Security, Privacy &amp; VPC Compliance
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-sky-500/30 hover:border-sky-400/60 shadow-2xl shadow-sky-950/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col justify-between min-w-0">
              {/* Top Neon Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Watermark Icon */}
              <Compass className="absolute -bottom-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 text-sky-500/5 stroke-1 pointer-events-none group-hover:text-sky-500/10 group-hover:scale-105 transition-all duration-700" />

              <div>
                {/* Header Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-600/10 border border-sky-400/40 text-sky-300 flex items-center justify-center shadow-lg shadow-sky-500/10 group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-sky-400" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-sky-950/70 border border-sky-500/30 text-[10px] sm:text-[11px] font-mono text-sky-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    <span>STRATEGIC VECTOR</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3 sm:mb-4 break-words">
                  Our Vision
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed relative z-10 text-justify">
                  {companyInfo.vision}
                </p>

                {/* Key Strategic Pillars */}
                <div className="mt-6 sm:mt-8 space-y-2.5 relative z-10">
                  <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-sky-500/15 group-hover:border-sky-500/30 transition-colors min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium truncate">
                      Autonomous Agent Swarms with Advanced Cognitive Reasoning
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-sky-500/15 group-hover:border-sky-500/30 transition-colors min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-sky-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium truncate">
                      Frictionless Symbiosis Augmenting Human Creative Capacity
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-sky-500/15 group-hover:border-sky-500/30 transition-colors min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 text-sky-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium truncate">
                      Architectures Engineered for Boundless Infinite Growth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Vision Section (Matching Reference Image 1) */}
      <LeadershipVisionSection />

      {/* Interactive Flip Cards: Our Core Values (Matching Reference Image 2) */}
      <CoreValuesFlipSection />

      {/* Interactive Flip Cards: Our Evolution Journey (Matching Reference Image 3) */}
      <EvolutionJourneyFlipSection />

    </div>
  );
}
