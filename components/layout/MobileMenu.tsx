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
        const res = await fetch("/api/services");
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
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-slate-950 border-l border-cyan-500/20 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Header with Logo and Close button */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <Link href="/" onClick={onClose} className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-400/50 p-0.5 bg-slate-900">
                    <Image
                      src="/images/logo.jpg"
                      alt="VyomAI Logo"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="font-bold text-lg tracking-tight text-white">
                    Vyom<span className="text-cyan-400">AI</span>
                  </span>
                </Link>

                <button
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="mt-6 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  if (item.hasDropdown) {
                    return (
                      <div key={item.label} className="py-1">
                        <button
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900/80 hover:text-cyan-300 transition-colors"
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
                              className="overflow-hidden pl-4 pr-1 py-2 space-y-1 bg-slate-900/40 rounded-xl my-1 border border-slate-800/60"
                            >
                              {items.map((s) => (
                                <Link
                                  key={s.id}
                                  href={s.href}
                                  onClick={onClose}
                                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-900/80 rounded-lg transition-colors"
                                >
                                  <span>{s.title}</span>
                                  {s.badge && (
                                    <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                                      {s.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                              <Link
                                href="/services"
                                onClick={onClose}
                                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
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
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
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
            <div className="pt-6 border-t border-slate-800">
              <Button href="/contact" variant="primary" size="md" className="w-full">
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
