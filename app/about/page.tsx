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
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";

export async function generateMetadata(): Promise<Metadata> {
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
  const leadership = [
    {
      name: "Aarav Sharma",
      role: "Founder & Chief AI Architect",
      bio: "Former Principal ML Researcher with a focus on multimodal foundation models, high-throughput transformer inference, and agent swarms.",
      initials: "AS",
    },
    {
      name: "Dr. Elena Rostova",
      role: "VP of Cognitive Engineering",
      bio: "Ph.D. in Computer Vision and Neural Networks. Specialist in zero-shot medical imaging, document parsing, and ethical AI guardrails.",
      initials: "ER",
    },
    {
      name: "Marcus Vance",
      role: "Principal Systems Architect",
      bio: "Over 14 years architecting distributed Kubernetes fabrics, financial trading pipelines, and sub-millisecond gRPC services.",
      initials: "MV",
    },
  ];

  const values = [
    {
      title: "Mathematical Precision",
      desc: "We validate every pipeline with rigorous benchmarking, stress testing, and empirical evaluation.",
      icon: Cpu,
    },
    {
      title: "Deterministic Guardrails",
      desc: "Our AI systems operate under strict boundary controls to eliminate hallucination risk and data leakage.",
      icon: ShieldCheck,
    },
    {
      title: "Radical Transparency",
      desc: "No black boxes. We deliver auditable architectures, transparent GitOps commits, and direct developer communication.",
      icon: Users,
    },
    {
      title: "Infinite Velocity",
      desc: "We combine modern Next.js frontends, automated CI/CD, and pre-tested ML primitives to deploy at 10x standard agency speed.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="pt-20 pb-16 overflow-hidden">
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>The VyomAI Narrative</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 sm:mb-5">
            Pioneering the Next Frontier of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500">
              Cognitive Software
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            &ldquo;Vyom&rdquo; translates to the infinite cosmos. We exist to build software architectures and AI models that operate without technological bounds.
          </p>
        </div>
      </section>

      {/* Creative Mission & Vision Section */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-y border-slate-900/80">
        {/* Background Ambient Glows & Tech Grid */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Sub-heading */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Foundational Philosophy</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Driven by Purpose,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
                Anchored in Vision
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Mission Card */}
            <div className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-cyan-500/30 hover:border-cyan-400/60 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              {/* Top Neon Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Watermark Icon */}
              <Target className="absolute -bottom-10 -right-10 w-64 h-64 text-cyan-500/5 stroke-1 pointer-events-none group-hover:text-cyan-500/10 group-hover:scale-105 transition-all duration-700" />

              <div>
                {/* Header Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300">
                    <Target className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span>ACTIVE MANDATE</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Our Mission
                </h3>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed relative z-10 text-justify">
                  {companyInfo.mission}
                </p>

                {/* Key Strategic Pillars */}
                <div className="mt-8 space-y-2.5 relative z-10">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-cyan-500/15 group-hover:border-cyan-500/30 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">
                      Deterministic AI Guardrails &amp; Zero-Hallucination SLAs
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-cyan-500/15 group-hover:border-cyan-500/30 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">
                      High-Throughput Distributed Microservice Architecture
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-cyan-500/15 group-hover:border-cyan-500/30 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">
                      Enterprise-Grade Security, Privacy &amp; VPC Compliance
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-sky-500/30 hover:border-sky-400/60 shadow-2xl shadow-sky-950/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              {/* Top Neon Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Watermark Icon */}
              <Compass className="absolute -bottom-10 -right-10 w-64 h-64 text-sky-500/5 stroke-1 pointer-events-none group-hover:text-sky-500/10 group-hover:scale-105 transition-all duration-700" />

              <div>
                {/* Header Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-600/10 border border-sky-400/40 text-sky-300 flex items-center justify-center shadow-lg shadow-sky-500/10 group-hover:scale-105 transition-transform duration-300">
                    <Compass className="w-7 h-7 text-sky-400" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-500/30 text-[11px] font-mono text-sky-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    <span>STRATEGIC VECTOR</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Our Vision
                </h3>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed relative z-10 text-justify">
                  {companyInfo.vision}
                </p>

                {/* Key Strategic Pillars */}
                <div className="mt-8 space-y-2.5 relative z-10">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-sky-500/15 group-hover:border-sky-500/30 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">
                      Autonomous Agent Swarms with Advanced Cognitive Reasoning
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-sky-500/15 group-hover:border-sky-500/30 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-sky-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">
                      Frictionless Symbiosis Augmenting Human Creative Capacity
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-sky-500/15 group-hover:border-sky-500/30 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 text-sky-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">
                      Architectures Engineered for Boundless Infinite Growth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Guiding Principles"
            title="Core Values That Guide Every"
            gradientText="Line of Code"
            description="Our engineering culture is rooted in deep mathematical precision, architectural discipline, and human-first ethics."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group p-6 rounded-2xl bg-slate-900/80 hover:bg-transparent border border-slate-800 hover:border-cyan-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-md"
                >
                  <div className="p-3 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 w-fit mb-4 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/60 group-hover:text-cyan-300 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed text-justify">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-slate-950/80 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Leaders"
            title="Built by Seasoned Architects &amp;"
            gradientText="AI Researchers"
            description="Meet the core team steering algorithmic research, cloud orchestration, and product delivery at VyomAI."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="group p-8 rounded-3xl bg-slate-900/80 hover:bg-transparent border border-slate-800 hover:border-cyan-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-xl text-slate-950 mb-6 shadow-md shadow-cyan-500/20 group-hover:scale-105 group-hover:shadow-cyan-400/40 transition-transform duration-300">
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mb-4">{member.role}</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 group-hover:border-cyan-500/30 text-xs text-slate-400 font-mono transition-colors">
                  VyomAI Core Engineering
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
