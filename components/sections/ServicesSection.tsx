"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) {
          setServices(data.data);
        }
      })
      .catch((err) => console.warn("Dynamic services fetch error:", err));
  }, []);

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      {/* Background Image with Cinematic Overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <Image
          src="/images/about-hero-bg.jpg"
          alt="VyomAI Services Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />
      </div>

      {/* Background glowing accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="End-to-End Capabilities"
          title="Architectural Precision Across Every"
          gradientText="Technology Domain"
          description="From frontier generative AI models to fault-tolerant enterprise software, we engineer complete digital ecosystems built for velocity, security, and exponential scale."
        />

        {services.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm">Solutions and capabilities will appear here once published in the Admin Panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.slug || service.id} service={service} index={index} />
            ))}
          </div>
        )}

        {/* Bottom Callout banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Need a bespoke architecture or technical feasibility audit?
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              Speak directly with our senior AI research engineers and systems architects.
            </p>
          </div>
          <Button
            href="/contact"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0"
          >
            Request Architectural Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};
