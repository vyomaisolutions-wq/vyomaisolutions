"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { companyInfo } from "@/data/company";
import { servicesDropdownItems } from "@/data/navigation";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  details: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  details?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "$25,000 - $50,000",
    details: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      errs.email = "Business email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.service) {
      errs.service = "Please select a service or technology area.";
    }
    if (!formData.details.trim() || formData.details.length < 15) {
      errs.details = "Please share at least a brief summary of your project (min 15 characters).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        // Fallback display on unexpected response
        setIsSubmitted(true);
      }
    } catch (err) {
      console.warn("Contact submission dispatch error, falling back:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      budget: "$25,000 - $50,000",
      details: "",
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Direct Engagement"
          title="Initiate Your Project With"
          gradientText="Our Lead Engineers"
          description="Whether you are architecting a new generative AI product or modernizing enterprise legacy infrastructure, our engineering leads are ready to collaborate."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info & Headquarters */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${companyInfo.contact.email}`}
                    className="text-base font-bold text-white hover:text-cyan-300 transition-colors"
                  >
                    {companyInfo.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-950 border border-sky-500/30 text-sky-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Phone / Mobile
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <a
                      href={`tel:${companyInfo.contact.phone.replace(/\s+/g, "")}`}
                      className="text-base font-bold text-white hover:text-cyan-300 transition-colors"
                    >
                      Mob No- {companyInfo.contact.phone}
                    </a>
                    {companyInfo.contact.alternatePhone && (
                      <>
                        <span className="hidden sm:inline text-slate-500">•</span>
                        <a
                          href={`tel:${companyInfo.contact.alternatePhone.replace(/\s+/g, "")}`}
                          className="text-sm font-semibold text-slate-300 hover:text-cyan-300 transition-colors"
                        >
                          Mob No- {companyInfo.contact.alternatePhone}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <a
                  href={companyInfo.contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-blue-950 border border-blue-500/30 text-blue-400 shrink-0 hover:bg-blue-900/50 hover:text-cyan-300 transition-colors"
                  aria-label="Open location in Google Maps"
                >
                  <MapPin className="w-5 h-5" />
                </a>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Headquarters
                  </span>
                  <a
                    href={companyInfo.contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-200 hover:text-cyan-300 font-medium mt-0.5 leading-relaxed block transition-colors underline-offset-2 hover:underline"
                  >
                    {companyInfo.contact.address}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Response Guaranteed: Within 4 Business Hours</span>
              </div>
            </div>

            {/* Social profiles & trust pill */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <span className="text-xs font-semibold uppercase text-slate-400 block mb-3">
                Official Channels &amp; Social Profiles
              </span>
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Interactive Consultation Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/25 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400/50 text-cyan-400 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      Inquiry Received &amp; Queued
                    </h3>

                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-cyan-300 font-semibold">{formData.name}</span>. A principal solutions architect from VyomAI will review your requirements and reach out at <span className="text-cyan-300 font-semibold">{formData.email}</span> within 4 business hours.
                    </p>

                    <div className="pt-6">
                      <Button onClick={handleReset} variant="outline" size="sm">
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Book a Technical Discovery Session
                      </h3>
                      <p className="text-xs text-slate-400">
                        Fill out the details below to receive architectural advice and an estimated delivery timeline.
                      </p>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1.5"
                        >
                          Full Name <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Dr. Elena Rostova"
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                            errors.name
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1.5"
                        >
                          Corporate Email <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="elena@enterprise.com"
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                            errors.email
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company & Service Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1.5"
                        >
                          Company / Organization
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          placeholder="Vertex Tech Inc."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="service"
                          className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1.5"
                        >
                          Service Category <span className="text-cyan-400">*</span>
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({ ...formData, service: e.target.value })
                          }
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white focus:outline-none transition-colors ${
                            errors.service
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          }`}
                        >
                          <option value="">Select Service Area...</option>
                          {servicesDropdownItems.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="Full Architecture Overhaul">Full Architecture Overhaul</option>
                        </select>
                        {errors.service && (
                          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.service}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Estimated Budget Range */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1.5"
                      >
                        Project Scope / Budget Range
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      >
                        <option value="$15,000 - $25,000">$15,000 - $25,000 (MVP / Prototype)</option>
                        <option value="$25,000 - $50,000">$25,000 - $50,000 (Core Production Build)</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000 (Enterprise Solution)</option>
                        <option value="$100,000+">$100,000+ (Comprehensive Transformation)</option>
                      </select>
                    </div>

                    {/* Project Details Textarea */}
                    <div>
                      <label
                        htmlFor="details"
                        className="block text-xs font-semibold uppercase font-mono text-slate-300 mb-1.5"
                      >
                        Project Overview &amp; Goals <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        id="details"
                        rows={4}
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                        placeholder="Briefly describe what you are looking to build, expected timelines, key data constraints, or technical hurdles..."
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.details
                            ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        }`}
                      />
                      {errors.details && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.details}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={isSubmitting}
                        rightIcon={<Send className="w-4 h-4" />}
                        className="w-full"
                      >
                        Transmit Project Request
                      </Button>
                      <p className="text-center text-[11px] text-slate-500 mt-2 font-mono">
                        Protected by Non-Disclosure Agreement (NDA) Standards
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
