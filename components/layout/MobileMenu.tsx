"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { navItems, servicesDropdownItems, ServiceDropdownItem } from "@/data/navigation";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  pathname,
}) => {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [items, setItems] = useState<ServiceDropdownItem[]>(servicesDropdownItems);

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const res = await fetch(`/api/services?_t=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        const json = await res.json();
        if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: ServiceDropdownItem[] = json.data.map((s: any, idx: number) => {
            const slug = s.slug || s.id || s._id;
            return {
              id: slug,
              title: s.title,
              description: s.shortDesc || "",
              href: `/services/${slug}`,
              iconName: s.iconName || "Brain",
              badge: idx === 0 ? "Core" : idx === 1 ? "Trending" : undefined,
            };
          });
          if (isMounted) {
            setItems(mapped);
          }
        }
      } catch {
        // Fallback gracefully
      }
    };

    if (isOpen || servicesExpanded) {
      fetchServices();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, servicesExpanded]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Slide-out drawer from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] sm:max-w-sm bg-slate-950 border-l border-cyan-500/20 shadow-2xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto overscroll-contain safe-pb"
          >
            <div>
              {/* Header with Logo and Close button */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800/80">
                <Link href="/" onClick={onClose} className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 shadow-md shadow-cyan-500/30 shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                      <Image
                        src="/images/logo.jpg"
                        alt="VyomAI Logo"
                        width={44}
                        height={44}
                        className="w-full h-full object-cover scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                      Vyom<span className="text-cyan-400">AI</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-slate-400 mt-1">
                      Solutions
                    </span>
                  </div>
                </Link>

                <button
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="min-tap-target p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="mt-5 space-y-1.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  if (item.hasDropdown) {
                    return (
                      <div key={item.label} className="py-1">
                        <button
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className="w-full min-h-[44px] flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900/80 hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-cyan-400 transition-transform duration-200 ${
                              servicesExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-3 pr-1 py-2 space-y-1 bg-slate-900/40 rounded-xl my-1 border border-slate-800/60"
                            >
                              {items.map((s) => (
                                <Link
                                  key={s.id}
                                  href={s.href}
                                  onClick={onClose}
                                  className="flex items-center justify-between px-3 py-2.5 min-h-[40px] text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-900/80 rounded-lg transition-colors"
                                >
                                  <span className="truncate pr-2">{s.title}</span>
                                  {s.badge && (
                                    <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800 shrink-0">
                                      {s.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                              <Link
                                href="/services"
                                onClick={onClose}
                                className="flex items-center gap-1.5 px-3 py-2.5 min-h-[40px] text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                              >
                                <span>View All Services</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center min-h-[44px] px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                          : "text-slate-200 hover:bg-slate-900/80 hover:text-cyan-300"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 border-t border-slate-800">
              <Button href="/contact" variant="primary" size="md" className="w-full min-h-[44px]" onClick={onClose}>
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
