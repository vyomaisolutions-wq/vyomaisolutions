"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, Check, ChevronUp, Loader2, AlertCircle } from "lucide-react";
import { companyInfo } from "@/data/company";
import { FooterLink } from "./FooterLink";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "info" | "error";
    message: string;
  } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailToSubmit = newsletterEmail.trim();
    if (!emailToSubmit) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailToSubmit,
          source: "Subscribe",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.alreadySubscribed) {
          setFeedback({
            type: "info",
            message: data.message || "You are already subscribed to our newsletter updates!",
          });
        } else {
          setFeedback({
            type: "success",
            message: data.message || "✓ Thank you for subscribing! You're now on our mailing list.",
          });
          setNewsletterEmail("");
        }
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Unable to complete subscription. Please try again.",
        });
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setFeedback({
        type: "error",
        message: "Network error. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-cyan-500/15 overflow-hidden">
      {/* Background ambient cyan glow and subtle grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/10 blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      {/* Upper Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 sm:pt-10 sm:pb-7">
        {/* Top Row: 3 Highlighted Contact Items with Centered Brand-Themed Circles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center pb-6 sm:pb-7">
          {/* Phone */}
          <div className="flex flex-col items-center">
            <a
              href="tel:+919598360224"
              aria-label="Call VyomAI"
              className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center mb-2.5 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 duration-200"
            >
              <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </a>
            <div className="flex flex-col items-center gap-0.5">
              <a
                href="tel:+919598360224"
                className="text-xs sm:text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors"
              >
                +91 9598360224
              </a>
              <a
                href="tel:+918853468637"
                className="text-xs sm:text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors"
              >
                +91 8853468637
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <a
              href="mailto:info@vyomaisolutions.com"
              aria-label="Email VyomAI"
              className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center mb-2.5 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 duration-200"
            >
              <Mail className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </a>
            <a
              href="mailto:info@vyomaisolutions.com"
              className="text-xs sm:text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors"
            >
              info@vyomaisolutions.com
            </a>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Greater+Noida%2C+Ghaziabad%2C+Uttar+Pradesh+201009"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View VyomAI location on Google Maps"
              className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center mb-2.5 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 duration-200 cursor-pointer"
            >
              <MapPin className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Greater+Noida%2C+Ghaziabad%2C+Uttar+Pradesh+201009"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors max-w-sm leading-relaxed text-center underline-offset-2 hover:underline"
            >
              Greater Noida, Ghaziabad, Uttar Pradesh 201009
            </a>
          </div>
        </div>

        {/* Full-width Divider Line */}
        <div className="border-t border-slate-800/80 mb-6 sm:mb-8" />

        {/* Middle Section: Logo at start + 3 Link Columns + Subscribe Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Column 1: Brand Logo & Tagline (At Start) */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-3 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-3.5 group select-none">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 shadow-xl shadow-cyan-500/30 group-hover:shadow-cyan-400/50 group-hover:scale-105 transition-all duration-300 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  <Image
                    src="/images/logo.jpg"
                    alt="VyomAI Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white group-hover:text-cyan-300 transition-colors leading-none">
                  Vyom<span className="text-cyan-400">AI</span>
                </span>
                <span className="text-xs sm:text-[13px] uppercase font-mono font-bold tracking-[0.24em] text-slate-400 group-hover:text-cyan-300/90 transition-colors mt-1">
                  Solutions
                </span>
              </div>
            </Link>

            <div className="space-y-2 text-xs text-slate-400 leading-relaxed max-w-sm">
              <p>
                Architecting state-of-the-art cognitive AI systems, generative workflows, and resilient enterprise cloud software.
              </p>
              <p>
                Engineering high-throughput neural architectures, autonomous agents, and mission-critical cloud platforms for industry leaders.
              </p>
              <p className="text-slate-400/90">
                Accelerating enterprise intelligence with zero-trust security and custom LLM solutions worldwide.
              </p>
            </div>
          </div>

          {/* Column 2: Solutions & Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide mb-3">
              Solutions
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <FooterLink href="/services/ai-ml">AI &amp; Machine Learning</FooterLink>
              </li>
              <li>
                <FooterLink href="/services/gen-ai">Generative AI Solutions</FooterLink>
              </li>
              <li>
                <FooterLink href="/services/custom-software">Custom Software Dev</FooterLink>
              </li>
              <li>
                <FooterLink href="/services/web-dev">Web &amp; Edge Platforms</FooterLink>
              </li>
              <li>
                <FooterLink href="/services/cloud-devops">Cloud &amp; DevOps</FooterLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide mb-3">
              Company
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink
                  href="/careers"
                  badge={
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                      Hiring
                    </span>
                  }
                >
                  Careers
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/#why-us">Why Choose Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/portfolio">Portfolio &amp; Case Studies</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact Us</FooterLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide mb-3">
              Legal &amp; Policy
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <FooterLink href="/privacy-policy">Privacy &amp; Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms-conditions">Terms &amp; Conditions</FooterLink>
              </li>
              <li>
                <FooterLink href="/gdpr">GDPR</FooterLink>
              </li>
              <li>
                <FooterLink href="/blog">Research &amp; Insights</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Technical Discovery</FooterLink>
              </li>
            </ul>
          </div>

          {/* Column 5: Subscribe */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-3">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide mb-3">
              Subscribe
            </h4>
            <form onSubmit={handleSubscribe} className="relative">
              <div
                className={`relative flex items-center rounded-md bg-white overflow-hidden shadow-sm transition-all duration-200 border ${
                  newsletterEmail.trim()
                    ? "border-cyan-400 ring-2 ring-cyan-400/30"
                    : "border-transparent"
                }`}
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (feedback) setFeedback(null);
                  }}
                  placeholder="Email Address"
                  required
                  disabled={isSubmitting}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none pr-11 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newsletterEmail.trim()}
                  aria-label="Subscribe to newsletter"
                  className={`absolute right-1 top-1 bottom-1 px-2.5 rounded flex items-center justify-center transition-all duration-200 ${
                    newsletterEmail.trim() && !isSubmitting
                      ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold hover:from-cyan-400 hover:to-sky-400 shadow-sm shadow-cyan-500/40 hover:scale-105 cursor-pointer"
                      : "text-cyan-600 hover:text-cyan-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : feedback?.type === "success" ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 stroke-[3]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  )}
                </button>
              </div>
            </form>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-2 leading-relaxed">
              Get digital engineering &amp; AI updates in your mailbox
            </p>

            {/* Feedback Alerts */}
            {feedback && (
              <div
                className={`mt-2.5 p-2 rounded-md text-xs flex items-start gap-1.5 leading-snug animate-fadeIn ${
                  feedback.type === "success"
                    ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                    : feedback.type === "info"
                    ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300"
                    : "bg-rose-950/60 border border-rose-500/40 text-rose-300"
                }`}
              >
                {feedback.type === "success" && (
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                )}
                {feedback.type === "info" && (
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-400" />
                )}
                {feedback.type === "error" && (
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Social Icons positioned below Subscribe input */}
            <div className="mt-4 pt-3.5 border-t border-slate-800/80">
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/vyomai-solutions-pvt-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VyomAI on LinkedIn"
                  className="w-8 h-8 rounded-full border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 text-slate-400 flex items-center justify-center transition-all duration-200 text-xs font-bold hover:shadow-md hover:shadow-cyan-500/20"
                >
                  in
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/vyomaisolutions?vrfl=YzA0cWZiYWpsYW9p"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VyomAI on Instagram"
                  className="w-8 h-8 rounded-full border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 text-slate-400 flex items-center justify-center transition-all duration-200 hover:shadow-md hover:shadow-cyan-500/20"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer (Darker Band) */}
      <div className="bg-slate-950/90 py-4 sm:py-5 border-t border-slate-900/90 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center relative">
          {/* Centered Copyright */}
          <p className="text-[11px] sm:text-xs text-slate-500 text-center">
            &copy; 2026 VyomAI Technologies Inc. All Rights Reserved.
          </p>

          {/* Cyan/Blue Scroll-to-Top Button on the Right */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="sm:absolute right-4 sm:right-8 mt-3 sm:mt-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-transform hover:scale-110 duration-200 cursor-pointer"
          >
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
};


