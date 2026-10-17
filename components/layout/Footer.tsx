"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, Check, ChevronUp } from "lucide-react";
import { companyInfo } from "@/data/company";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail("");
      }, 4000);
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
              href="https://www.google.com/maps/search/?api=1&query=JFFH%2BG2F%2C+Grand+Trunk+Rd%2C+near+Bisrakh+Mod+Police+Chowki%2C+Lal+Kuan%2C+Greater+Noida%2C+Ghaziabad%2C+Uttar+Pradesh+201009"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View VyomAI location on Google Maps"
              className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center mb-2.5 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 duration-200 cursor-pointer"
            >
              <MapPin className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=JFFH%2BG2F%2C+Grand+Trunk+Rd%2C+near+Bisrakh+Mod+Police+Chowki%2C+Lal+Kuan%2C+Greater+Noida%2C+Ghaziabad%2C+Uttar+Pradesh+201009"
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
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-3 space-y-3">
            <Link href="/" className="inline-flex items-center gap-3 group select-none">
              <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  <Image
                    src="/images/logo.jpg"
                    alt="VyomAI Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Vyom<span className="text-cyan-400">AI</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-1">
                  Solutions
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Architecting state-of-the-art cognitive AI systems, generative workflows, and resilient enterprise cloud software.
            </p>
          </div>

          {/* Column 2: Solutions & Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/services/ai-ml" className="hover:text-cyan-300 transition-colors">
                  AI &amp; Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/services/gen-ai" className="hover:text-cyan-300 transition-colors">
                  Generative AI Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/custom-software" className="hover:text-cyan-300 transition-colors">
                  Custom Software Dev
                </Link>
              </li>
              <li>
                <Link href="/services/web-dev" className="hover:text-cyan-300 transition-colors">
                  Web &amp; Edge Platforms
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-devops" className="hover:text-cyan-300 transition-colors">
                  Cloud &amp; DevOps
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide mb-3">
              Company
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span>Careers</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">Hiring</span>
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-cyan-300 transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-cyan-300 transition-colors">
                  Portfolio &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-cyan-300 transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide mb-3">
              Resources
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-cyan-300 transition-colors">
                  Research &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-300 transition-colors">
                  AI Architecture Papers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  Technical Discovery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Subscribe */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-3">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide mb-3">
              Subscribe
            </h4>
            <form onSubmit={handleSubscribe} className="relative">
              <div className="relative flex items-center rounded-md bg-white overflow-hidden shadow-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none pr-9"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 top-1 bottom-1 px-2.5 text-cyan-600 hover:text-cyan-500 font-bold transition-colors flex items-center justify-center cursor-pointer"
                >
                  {isSubscribed ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  ) : (
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  )}
                </button>
              </div>
            </form>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-2 leading-relaxed">
              Get digital engineering &amp; AI updates in your mailbox
            </p>
            {isSubscribed && (
              <p className="text-xs text-cyan-300 mt-1.5 font-medium">
                ✓ Thank you for subscribing to our updates!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sub-Footer (Darker Band) */}
      <div className="bg-slate-950/90 py-4 sm:py-5 border-t border-slate-900/90 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
          {/* Centered Circular Outline Social Icons */}
          <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/vyomai-solutions-pvt-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VyomAI on LinkedIn"
              className="w-8 h-8 rounded-full border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 text-slate-400 flex items-center justify-center transition-all duration-200 text-xs font-bold"
            >
              in
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/vyomaisolutions?vrfl=YzA0cWZiYWpsYW9p"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VyomAI on Instagram"
              className="w-8 h-8 rounded-full border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 text-slate-400 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          {/* Centered Copyright & Admin Link */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <p className="text-[11px] sm:text-xs text-slate-500 text-center">
              &copy; 2026 VyomAI Technologies Inc. All Rights Reserved.
            </p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <Link
              href="/admin"
              className="text-[11px] font-mono text-slate-500 hover:text-cyan-400 transition-colors"
            >
              Admin OS
            </Link>
          </div>

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


