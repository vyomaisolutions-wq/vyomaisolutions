"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Menu, Sparkles } from "lucide-react";
import { navItems } from "@/data/navigation";
import { ServicesDropdown } from "./ServicesDropdown";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnterServices = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeaveServices = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 200);
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/15 py-2.5 sm:py-3 shadow-lg shadow-black/40"
            : "bg-transparent py-3.5 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left side: Company Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 sm:gap-3.5 select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 rounded-lg p-1 shrink-0"
              aria-label="VyomAI Homepage"
            >
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 shadow-md shadow-cyan-500/25 group-hover:shadow-cyan-400/50 group-hover:scale-105 transition-all duration-300 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  <Image
                    src="/images/logo.jpg"
                    alt="VyomAI Logo Emblem"
                    width={56}
                    height={56}
                    priority
                    className="w-full h-full object-cover scale-105 group-hover:scale-115 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl md:text-[26px] tracking-tight text-white group-hover:text-cyan-200 transition-colors leading-none">
                  Vyom<span className="text-cyan-400">AI</span>
                </span>
                <span className="text-[10px] sm:text-[11px] md:text-xs uppercase font-mono font-bold tracking-[0.22em] text-slate-400 mt-1 group-hover:text-cyan-300/90 transition-colors">
                  Solutions
                </span>
              </div>
            </Link>

            {/* Center navigation links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner shadow-black/40">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={handleMouseEnterServices}
                      onMouseLeave={handleMouseLeaveServices}
                    >
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        aria-expanded={servicesOpen}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                          servicesOpen || pathname.startsWith("/services")
                            ? "text-cyan-300 bg-cyan-500/10"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesOpen ? "rotate-180 text-cyan-400" : "text-slate-400"
                          }`}
                        />
                      </button>

                      <ServicesDropdown
                        isOpen={servicesOpen}
                        onClose={() => setServicesOpen(false)}
                      />
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "text-cyan-300 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side: CTA button */}
            <div className="hidden sm:flex items-center gap-3">
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                rightIcon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Let&apos;s Talk
              </Button>
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="min-tap-target p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center justify-center cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
};
