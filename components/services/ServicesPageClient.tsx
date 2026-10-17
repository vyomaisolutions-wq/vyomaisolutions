"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
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
  ChevronDown,
  Layers,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pagination } from "@/components/ui/Pagination";

export const ServicesPageClient: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  React.useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setServices(data.data);
        }
      })
      .catch((err) => console.warn("Dynamic services fetch:", err));
  }, []);

  const totalServices = services.length;
  const paginatedServices = services.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById("services-breakdown");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "How does VyomAI eliminate hallucinations in enterprise Generative AI systems?",
      a: "We implement multi-layered deterministic guardrails: semantic caching, hybrid vector & graph retrieval (GraphRAG), self-consistency cross-verifiers, and strict schema validation outputs (JSON schema / Pydantic models). The AI model never acts as an unverified decision maker.",
    },
    {
      q: "Can our models and data remain strictly on-premises or in our private VPC?",
      a: "Yes, 100%. We routinely engineer air-gapped and private VPC architectures using open-weights models (such as Llama 3, Mistral, and DeepSeek) running on dedicated private GPU clusters with zero external data telemetry.",
    },
    {
      q: "What is your typical project engagement structure?",
      a: "We operate in agile, bi-weekly milestone sprints. Every engagement starts with a 1-to-2 week Technical Architecture Discovery phase, followed by rapid iterative builds with real-time staging environments and weekly progress demos.",
    },
    {
      q: "Do you offer post-deployment Site Reliability Engineering (SRE) and model maintenance?",
      a: "Yes. All production deployments are backed by our 24/7 SRE monitoring team with guaranteed response SLAs. We continuously monitor model drift, input distribution shifts, and latency bottlenecks.",
    },
  ];

  const getIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-cyan-400" };
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

  return (
    <div className="pt-20 pb-16 overflow-hidden">
      {/* Hero Header with Reduced Padding & Cosmic Neural Background Image */}
      <section className="relative py-12 sm:py-16 text-center overflow-hidden border-b border-slate-900/80">
        {/* Background Image with Cinematic Overlays */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src="/images/about-hero-bg.jpg"
            alt="VyomAI Services Background"
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
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Comprehensive Solutions Spectrum</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 sm:mb-5">
            Enterprise Architecture &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500">
              AI Solutions
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            From bespoke neural network training to resilient distributed cloud fabrics, explore how we engineer high-throughput systems tailored for scale.
          </p>
        </div>
      </section>

      {/* Detailed Services Breakdown */}
      <section id="services-breakdown" className="py-12 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {paginatedServices.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p>No services published yet. Custom architectures and solutions will appear here once added in the Admin Panel.</p>
            </div>
          ) : (
            paginatedServices.map((service, index) => {
              const isEven = index % 2 === 0;
              const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

              return (
                <div
                  key={service.slug || service.id}
                  id={service.slug || service.id}
                  className="scroll-mt-32 p-8 sm:p-12 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className={`lg:col-span-7 space-y-5 ${isEven ? "" : "lg:order-2"}`}>
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                          {getIcon(service.iconName)}
                        </div>
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                          Domain 0{globalIndex}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                        {service.title}
                      </h2>

                      <p className="text-base text-slate-300 leading-relaxed">
                        {service.fullDesc}
                      </p>

                      <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20">
                        <span className="text-xs font-mono text-cyan-400 block mb-1">
                          Key Engineering Metric:
                        </span>
                        <p className="text-sm font-semibold text-white">{service.metrics}</p>
                      </div>

                      <div className="pt-2">
                        <span className="text-xs font-mono uppercase text-slate-400 block mb-3">
                          Technical Focus &amp; Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {Array.isArray(service.features) && service.features.map((feat: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`lg:col-span-5 ${isEven ? "" : "lg:order-1"}`}>
                      <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Stack Specifications
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800">
                            Active Ready
                          </span>
                        </div>

                        <div className="space-y-3">
                          <span className="text-xs text-slate-400 font-mono block">
                            Primary Technologies Used:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(service.technologies) && service.technologies.map((tech: string) => (
                              <span
                                key={tech}
                                className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 space-y-2.5">
                          <Button
                            href={`/services/${service.slug || service.id}`}
                            variant="secondary"
                            size="sm"
                            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                            className="w-full"
                          >
                            View Full Details &amp; Architecture
                          </Button>
                          <Button
                            href="/contact"
                            variant="primary"
                            size="sm"
                            className="w-full text-xs"
                          >
                            Initiate Scope for {service.title}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* 4 Cards Pagination Controls */}
          {totalServices > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalItems={totalServices}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              itemLabel="service domains"
            />
          )}
        </div>
      </section>

      {/* Architectural FAQ Section */}
      <section className="py-24 bg-slate-950/80 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Architectural &amp; Engagement"
            gradientText="Clarifications"
            description="Answers to common technical, compliance, and deployment questions about our AI engineering process."
          />

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
