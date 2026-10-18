"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

interface ServicesSectionProps {
  initialServices?: any[];
  limit?: number;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ initialServices, limit = 8 }) => {
  const [services, setServices] = useState<any[]>(
    initialServices ? initialServices.slice(0, limit) : []
  );

  useEffect(() => {
    if (!initialServices || initialServices.length === 0) {
      fetch("/api/services")
        .then((res) => res.json())
        .then((data) => {
          if (data?.data && Array.isArray(data.data)) {
            setServices(data.data.slice(0, limit));
          }
        })
        .catch((err) => console.warn("Dynamic services fetch error:", err));
    }
  }, [initialServices, limit]);

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

        {/* View All Services Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Button
            href="/services"
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
            className="w-full sm:w-auto"
          >
            Explore All Capabilities &amp; Specialized Services
          </Button>
        </div>

        {/* Bottom Callout banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Need a bespoke architecture or technical feasibility audit?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our senior AI research engineers and systems architects.
            </p>
          </div>
          <Button
            href="/contact"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
            className="w-full sm:w-auto shrink-0 text-center"
          >
            Request Architectural Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};
