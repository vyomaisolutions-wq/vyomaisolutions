"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  CloudCog,
  Palette,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Terminal,
  Activity,
  ChevronRight,
  Server,
  Database,
  Lock,
  Layers,
  Check,
  Copy,
  Workflow,
  Radio,
  Sliders,
  ExternalLink,
} from "lucide-react";
import { Service } from "@/data/services";
import { Button } from "@/components/ui/Button";

interface ServiceDetailClientProps {
  service: Service;
  otherServices: Service[];
}

export const ServiceDetailClient: React.FC<ServiceDetailClientProps> = ({
  service,
  otherServices,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "pipeline" | "specs">("overview");
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const getIcon = (iconName: string) => {
    const props = { className: "w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" };
    switch (iconName) {
      case "Brain":
        return <Brain {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "Code2":
        return <Code2 {...props} />;
      case "Globe":
        return <Globe {...props} />;
      case "Smartphone":
        return <Smartphone {...props} />;
      case "CloudCog":
        return <CloudCog {...props} />;
      case "Palette":
        return <Palette {...props} />;
      case "Cpu":
        return <Cpu {...props} />;
      default:
        return <Brain {...props} />;
    }
  };

  const getStageInfo = () => [
    {
      phase: "Phase 01",
      title: "Telemetry & Architecture Discovery",
      desc: "Deep-dive analysis into legacy infrastructure, domain schemas, concurrency baselines, and private data pipelines.",
      deliverable: "Architecture Blueprint & Threat Matrix",
    },
    {
      phase: "Phase 02",
      title: "Algorithmic Synthesis & Guardrails",
      desc: "Engineering custom models, retrieval-augmented pipelines (GraphRAG), deterministic validation gates, and low-latency quantization.",
      deliverable: "Production Staging Cluster & Benchmarks",
    },
    {
      phase: "Phase 03",
      title: "Parallel Production Deployment",
      desc: "Zero-downtime blue/green deployment across your private VPC, hybrid clouds, or on-premises GPU infrastructure.",
      deliverable: "99.999% SLA High-Availability Pipeline",
    },
    {
      phase: "Phase 04",
      title: "Continuous Model SRE & Drift Control",
      desc: "24/7 telemetry monitoring for input distribution shift, automated semantic evaluation, and sub-millisecond edge failover.",
      deliverable: "Automated Retraining & Compliance Audit",
    },
  ];

  const stages = getStageInfo();

  const generateTerminalSpec = () => {
    const slug = service.slug || service.id || "service";
    return `apiVersion: vyomai.ai/v2alpha1
kind: EnterpriseCapabilityCluster
metadata:
  name: vyomai-${slug}-pipeline
  namespace: production-core
spec:
  domain: "${service.title}"
  slaTier: "MissionCritical-Tier1"
  deterministicVerification:
    enabled: true
    schemaValidation: "StrictPydanticV2"
    semanticCache: "ZeroLatency-RedisCluster"
  runtimeEngine:
    primaryStack: [${(service.technologies || []).map((t) => `"${t}"`).join(", ")}]
    distributedInference: "vLLM-TensorRT-LLM"
    quantization: "FP8-AWQ-Adaptive"
  security:
    airGappedSupported: true
    dataRetention: "ZeroDataPersistence"
    encryption: "AES-256-GCM + mTLS"
  telemetry:
    metricTarget: "${service.metrics}"
    autoFailoverSLA: "Sub-15ms"`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateTerminalSpec());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="pt-20 pb-20 overflow-hidden bg-[#070b14] text-slate-100 min-h-screen">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-10 sm:pt-14 pb-12 sm:pb-16 overflow-hidden border-b border-slate-900/80">
        {/* Background Neural Matrix & Ambient Glows */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src={service.image || "/images/about-hero-bg.jpg"}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/95 via-[#070b14]/85 to-[#070b14]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-transparent to-[#070b14]" />
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/15 blur-[140px] rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-[450px] h-[250px] bg-blue-600/15 blur-[120px] rounded-full" />
          <div className="absolute inset-0 grid-bg opacity-15" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb & Live System HUD */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-all backdrop-blur-md shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Capability Directory</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Production SRE Ready</span>
              </div>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Domain Protocol // 0X-CORE
              </span>
            </div>
          </div>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 shadow-lg shadow-cyan-500/10">
                  {getIcon(service.iconName)}
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block">
                    Enterprise Capability Specification
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Engineered for mission-critical scale &amp; compliance
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                {service.title}
              </h1>

              {/* Short summary callout */}
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-3xl font-medium">
                {service.shortDesc}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Initiate Technical Consultation
                </Button>
                <button
                  onClick={() => {
                    const el = document.getElementById("architecture-details");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-slate-200 font-medium text-sm transition-all cursor-pointer backdrop-blur-md"
                >
                  Explore Technical Blueprint ↓
                </button>
              </div>
            </div>

            {/* Quick Metrics HUD Card */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,240,255,0.1)] backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 uppercase font-bold tracking-wider">
                    <Activity className="w-4 h-4 text-cyan-400" /> Operational Metrics
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold">
                    Verified
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-mono block">
                      Target SLA &amp; Precision Guarantee:
                    </span>
                    <p className="text-base font-extrabold text-white leading-snug">
                      {service.metrics || "99.4% Model Precision Across Production Pipelines"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">
                        Deployment Velocity
                      </span>
                      <span className="text-sm font-bold text-cyan-300 font-mono">
                        2-4 Sprints
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">
                        Data Sovereignty
                      </span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        Air-Gapped / VPC
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed font-mono">
                    <Shield className="w-3.5 h-3.5 text-cyan-400 inline mr-1.5" />
                    SOC2 Type II, ISO 27001, and Zero-Data-Persistence compliant pipelines.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== INTERACTIVE NAVIGATION TABS ===================== */}
      <section id="architecture-details" className="py-6 border-b border-slate-900 bg-slate-950/60 sticky top-16 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "overview"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Architectural Blueprint</span>
            </button>

            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "pipeline"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>4-Phase Engineering Pipeline</span>
            </button>

            <button
              onClick={() => setActiveTab("specs")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "specs"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Cluster Spec (YAML)</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400 hidden sm:block">
            <span>Capability: </span>
            <span className="text-cyan-400 font-bold">{service.title}</span>
          </div>
        </div>
      </section>

      {/* ===================== MAIN INTERACTIVE TAB CONTENT ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Left Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* TAB 1: OVERVIEW & IN-DEPTH DESCRIPTION */}
            {activeTab === "overview" && (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                {/* Featured Architectural Hero Graphic */}
                {service.image ? (
                  <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      priority
                      unoptimized
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                      <span className="text-xs font-mono bg-slate-950/80 border border-cyan-500/40 text-cyan-300 px-3 py-1.5 rounded-full backdrop-blur-md">
                        Proprietary Engineering Topology
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-cyan-950/40 border border-cyan-500/30 overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="space-y-2">
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                          Autonomous Systems Architecture
                        </span>
                        <h3 className="text-2xl font-bold text-white">
                          Engineered for High-Concurrency Production
                        </h3>
                      </div>
                      <div className="p-4 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                        {getIcon(service.iconName)}
                      </div>
                    </div>
                    <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
                  </div>
                )}

                {/* In-Depth Multi-Paragraph Description */}
                <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight border-b border-slate-800/80 pb-4 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-cyan-400" />
                    <span>Scope of Architecture &amp; Methodology</span>
                  </h2>

                  <div className="space-y-5 text-slate-300 leading-relaxed text-base sm:text-lg">
                    {service.fullDesc ? (
                      service.fullDesc.split("\n\n").map((para, idx) => (
                        <p key={idx} className="text-justify font-sans leading-relaxed">
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="text-justify font-sans leading-relaxed">
                        {service.shortDesc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Core Engineering Deliverables Grid */}
                <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      <span>Production Deliverables &amp; Artifacts</span>
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {service.features?.length || 4} Core Focus Areas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features &&
                      service.features.map((feat, i) => (
                        <div
                          key={i}
                          className="group/item flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-950 transition-all shadow-md"
                        >
                          <div className="p-1.5 rounded-lg bg-cyan-950/70 text-cyan-400 group-hover/item:bg-cyan-500 group-hover/item:text-slate-950 transition-colors shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-slate-100 group-hover/item:text-cyan-200 transition-colors block">
                              {feat}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">
                              Automated validation &amp; CI/CD regression verified
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: 4-PHASE IMPLEMENTATION PIPELINE */}
            {activeTab === "pipeline" && (
              <motion.div
                key="tab-pipeline"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-6">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                      Delivery Methodology
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      From Discovery to Autonomous Production
                    </h3>
                    <p className="text-sm text-slate-300 mt-2">
                      Our proprietary bi-weekly sprint lifecycle engineered for zero disruption to your active operations.
                    </p>
                  </div>

                  {/* Interactive Stage Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {stages.map((stg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStage(idx)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          activeStage === idx
                            ? "bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                        }`}
                      >
                        <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                          {stg.phase}
                        </span>
                        <span className="text-xs font-bold truncate block mt-1">
                          {stg.title.split(" ")[0]} {stg.title.split(" ")[1]}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Active Stage Highlight Card */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/30 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        {stages[activeStage].phase} // Active Scope Detail
                      </span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
                        Milestone Guarantee
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-white">
                      {stages[activeStage].title}
                    </h4>

                    <p className="text-base text-slate-300 leading-relaxed font-sans">
                      {stages[activeStage].desc}
                    </p>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">
                        Formal Client Artifact:
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/30">
                        {stages[activeStage].deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: CLUSTER SPEC (YAML TERMINAL) */}
            {activeTab === "specs" && (
              <motion.div
                key="tab-specs"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl font-mono text-xs">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-slate-400 font-medium text-[11px]">
                        vyomai-{service.slug || "service"}-spec.yaml
                      </span>
                    </div>

                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy YAML</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-6 overflow-x-auto text-cyan-300/90 leading-relaxed bg-[#050811]">
                    <pre>{generateTerminalSpec()}</pre>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enterprise Standards & SLA 4-Pillars Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                  <Shield className="w-4 h-4" /> Zero-Hallucination Guardrails
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Deterministic schema validation and GraphRAG cross-verifiers ensure models never execute untrusted decisions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                  <Server className="w-4 h-4" /> Air-Gapped &amp; Private VPC
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered to deploy inside your AWS, GCP, Azure, or physical on-premises GPU cluster with zero telemetry leakage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                  <Activity className="w-4 h-4" /> Sub-Millisecond Latency
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Kernel-level CUDA optimizations, TensorRT model quantization, and semantic caching for high-concurrency scale.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                  <Lock className="w-4 h-4" /> 24/7 Site Reliability SRE
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automated telemetry, continuous model drift detection, and guaranteed SLA response times by our engineering architects.
                </p>
              </div>
            </div>

            {/* Bottom Strategic Engagement Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-[#070b14] border border-cyan-500/40 shadow-2xl relative overflow-hidden space-y-5">
              <div className="relative z-10 space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block">
                  Next Step // Architecture Scope
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Ready to deploy {service.title}?
                </h3>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Schedule a technical discovery session with our Principal AI Architects to evaluate your data schemas, model requirements, and deployment timeline.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Button
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Initiate Technical Scope
                  </Button>
                  <Button href="/services" variant="secondary" size="lg">
                    Compare Other Capabilities
                  </Button>
                </div>
              </div>
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Sticky Sidebar with Tech Specs & Other Services */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
            {/* Tech Stack Specs Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-cyan-400" /> Stack Specifications
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60 font-semibold">
                  Low-Latency
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-mono block">
                  Primary Tooling &amp; Frameworks:
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.technologies &&
                    service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <Button
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="w-full"
                >
                  Request Architecture Proposal
                </Button>
              </div>
            </div>

            {/* Other Services Navigation List */}
            {otherServices && otherServices.length > 0 && (
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    Complementary Domains
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">Directory</span>
                </div>

                <div className="space-y-2">
                  {otherServices.slice(0, 6).map((s) => (
                    <Link
                      key={s.slug || s.id}
                      href={`/services/${s.slug || s.id}`}
                      className="group flex items-center justify-between p-3 rounded-2xl bg-slate-950/50 hover:bg-slate-950 border border-slate-800/60 hover:border-cyan-500/40 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/60 transition-colors shrink-0">
                          {getIcon(s.iconName)}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate block transition-colors">
                            {s.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 truncate block">
                            {s.metrics}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-center">
                  <Link
                    href="/services"
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>View All Capability Domains</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
