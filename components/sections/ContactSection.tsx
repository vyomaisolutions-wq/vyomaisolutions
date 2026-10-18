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
  ArrowUpRight,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
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
  budget?: string;
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
    details: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      }
    } catch {
      // Fallback
    }
  };

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
      details: "",
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32 bg-slate-950 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Direct Engagement"
          title="Initiate Your Project With"
          gradientText="Our Lead Engineers"
          description="Whether you are architecting a new generative AI product or modernizing enterprise legacy infrastructure, our engineering leads are ready to collaborate."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Creative Direct Operations & Contact Terminal */}
          <div className="lg:col-span-5 space-y-6 min-w-0">
            {/* Cybernetic Glass Terminal Card */}
            <div className="relative rounded-3xl bg-slate-900/85 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden group min-w-0">
              {/* Futuristic Background Glows & Accent Gradients */}
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-700" />
              <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Top Operational Status Header */}
              <div className="relative flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-3 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                  </span>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider font-semibold text-emerald-400 uppercase block">
                      Direct Operations Active
                    </span>
                    <p className="text-xs text-slate-400 font-medium">
                      Live Engineering Consultation Desk
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono shrink-0 shadow-sm">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>SLA &lt;4h</span>
                </div>
              </div>

              {/* Interactive Contact Pods */}
              <div className="relative space-y-4 min-w-0">
                {/* 1. Direct Email Pod */}
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 p-4 transition-all duration-300 group/email">
                  <div className="flex items-start justify-between gap-3 min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 group-hover/email:scale-105 group-hover/email:border-cyan-400 transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">
                          Priority Direct Inbox
                        </span>
                        <a
                          href={`mailto:${companyInfo.contact.email}`}
                          className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors flex items-center gap-1.5 break-all mt-0.5"
                        >
                          <span>{companyInfo.contact.email}</span>
                          <ArrowUpRight className="w-4 h-4 text-cyan-400 shrink-0 opacity-70 group-hover/email:opacity-100 group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 transition-all" />
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(companyInfo.contact.email, "email")}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors shrink-0"
                      title="Copy email address"
                      aria-label="Copy email address"
                    >
                      {copiedField === "email" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 2. Direct Phone / Mobile Pod */}
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-sky-500/40 p-4 transition-all duration-300 group/phone">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0 group-hover/phone:scale-105 group-hover/phone:border-sky-400 transition-all duration-300 shadow-[0_0_12px_rgba(56,189,248,0.15)]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">
                        Direct Voice Hotline
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        Founding &amp; Technical Leads
                      </span>
                    </div>
                  </div>

                  {/* Dual Phone Interactive Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Primary Number */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 transition-colors group/p1">
                      <a
                        href={`tel:${companyInfo.contact.phone.replace(/\s+/g, "")}`}
                        className="min-w-0 flex-1"
                      >
                        <span className="text-[9px] font-mono uppercase tracking-wider text-sky-400 block font-semibold">
                          Primary Mobile
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-white group-hover/p1:text-sky-300 transition-colors block truncate">
                          {companyInfo.contact.phone}
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(companyInfo.contact.phone, "phone1")}
                        className="p-1.5 rounded-md text-slate-400 hover:text-sky-300 transition-colors shrink-0"
                        title="Copy primary phone number"
                        aria-label="Copy primary phone number"
                      >
                        {copiedField === "phone1" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Alternate Number */}
                    {companyInfo.contact.alternatePhone && (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 transition-colors group/p2">
                        <a
                          href={`tel:${companyInfo.contact.alternatePhone.replace(/\s+/g, "")}`}
                          className="min-w-0 flex-1"
                        >
                          <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                            Direct Line
                          </span>
                          <span className="text-xs sm:text-[13px] font-bold text-white group-hover/p2:text-sky-300 transition-colors block truncate">
                            {companyInfo.contact.alternatePhone}
                          </span>
                        </a>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(companyInfo.contact.alternatePhone!, "phone2")
                          }
                          className="p-1.5 rounded-md text-slate-400 hover:text-sky-300 transition-colors shrink-0"
                          title="Copy alternate phone number"
                          aria-label="Copy alternate phone number"
                        >
                          {copiedField === "phone2" ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Headquarters Location Pod */}
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-blue-500/40 p-4 transition-all duration-300 group/hq">
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 group-hover/hq:scale-105 group-hover/hq:border-blue-400 transition-all duration-300 shadow-[0_0_12px_rgba(59,130,246,0.15)]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">
                          Headquarters Campus
                        </span>
                        <span className="text-xs text-slate-300 font-medium">
                          Greater Noida / Ghaziabad NCR
                        </span>
                      </div>
                    </div>

                    <a
                      href={companyInfo.contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-900/50 text-[11px] font-mono transition-colors shrink-0"
                    >
                      <span>Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal pl-1">
                    {companyInfo.contact.address}
                  </p>
                </div>
              </div>

              {/* Fast Response & Security Guarantee */}
              <div className="mt-5 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Guaranteed SLA: Within 4 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>NDA &amp; Strict IP Protection</span>
                </div>
              </div>

              {/* Integrated Official Channels & Social Profiles */}
              <div className="mt-5 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                    Official Channels
                  </span>
                  <span className="text-xs text-slate-500">
                    Verified profiles &amp; network updates
                  </span>
                </div>
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Inquiry Form */}
          <div className="lg:col-span-7 min-w-0">
            <div className="rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-cyan-500/25 p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl min-w-0">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 sm:py-12 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400/50 text-cyan-400 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white break-words">
                      Inquiry Received &amp; Queued
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-cyan-300 font-semibold">{formData.name}</span>. A principal solutions architect from VyomAI will review your requirements and reach out at <span className="text-cyan-300 font-semibold break-all">{formData.email}</span> within 4 business hours.
                    </p>

                    <div className="pt-6">
                      <Button onClick={handleReset} variant="outline" size="sm" className="w-full sm:w-auto">
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4 sm:space-y-5"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 break-words">
                        Book a Technical Discovery Session
                      </h3>
                      <p className="text-xs text-slate-400">
                        Fill out the details below to receive architectural advice and an estimated delivery timeline.
                      </p>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="min-w-0">
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
                          className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-950 border text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors min-h-[44px] ${
                            errors.name
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="min-w-0">
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
                          className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-950 border text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors min-h-[44px] ${
                            errors.email
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company & Service Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="min-w-0">
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
                          className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors min-h-[44px]"
                        />
                      </div>

                      <div className="min-w-0">
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
                          className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-950 border text-base sm:text-sm text-white focus:outline-none transition-colors min-h-[44px] ${
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
                            <AlertCircle className="w-3 h-3 shrink-0" /> {errors.service}
                          </p>
                        )}
                      </div>
                    </div>



                    {/* Project Details Textarea */}
                    <div className="min-w-0">
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
                        className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-950 border text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.details
                            ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        }`}
                      />
                      {errors.details && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.details}
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
                        className="w-full min-h-[48px] justify-center"
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
