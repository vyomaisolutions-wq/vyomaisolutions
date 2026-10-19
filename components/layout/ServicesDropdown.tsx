"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  CloudCog,
  Palette,
  Cpu,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { servicesDropdownItems, ServiceDropdownItem } from "@/data/navigation";

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  services?: ServiceDropdownItem[];
}

export const ServicesDropdown: React.FC<ServicesDropdownProps> = ({
  isOpen,
  onClose,
  services,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ServiceDropdownItem[]>(
    services && services.length > 0 ? services : servicesDropdownItems
  );

  useEffect(() => {
    let isMounted = true;

    const fetchDynamicServices = async () => {
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
              description: s.shortDesc || (s.fullDesc ? s.fullDesc.slice(0, 75) + "..." : ""),
              href: `/services/${slug}`,
              iconName: s.iconName || "Brain",
              badge: idx === 0 ? "Core" : idx === 1 ? "Trending" : undefined,
            };
          });
          if (isMounted) {
            setItems(mapped);
          }
        }
      } catch (err) {
        console.warn("[ServicesDropdown] Error fetching dynamic services:", err);
      }
    };

    if (isOpen) {
      fetchDynamicServices();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, services]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getIcon = (iconName: string) => {
    const props = { className: "w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" };
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
      case "TrendingUp":
        return <TrendingUp {...props} />;
      default:
        return <Brain {...props} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] max-w-[95vw] rounded-2xl p-5 bg-slate-950/95 border border-cyan-500/25 shadow-2xl shadow-cyan-950/50 backdrop-blur-2xl z-50 text-left"
        >
          {/* Subtle top indicator arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 border-t border-l border-cyan-500/30 rotate-45" />

          {/* Top header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Our Core Capabilities
              </span>
              <p className="text-xs text-slate-400">
                End-to-end AI engineering, custom software, and cloud modernization
              </p>
            </div>
            <Link
              href="/services"
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Dynamic grid or empty notice */}
          {items.length === 0 ? (
            <div className="py-6 px-4 text-center">
              <p className="text-xs text-slate-400">Services will appear here once published in the Admin Panel.</p>
              <Link
                href="/services"
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <span>View Services Overview</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                {items.slice(0, 8).map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.025 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-900/90 border border-transparent hover:border-cyan-500/25 transition-all duration-200"
                    >
                      <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/20 group-hover:border-cyan-400/50 group-hover:bg-cyan-900/40 text-cyan-400 shrink-0 mt-0.5 transition-colors">
                        {getIcon(item.iconName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {items.length > 8 && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between px-2">
                  <span className="text-xs text-slate-400">
                    Showing 8 of {items.length} services (4 per side)
                  </span>
                  <Link
                    href="/services"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
                  >
                    <span>View All ({items.length}) Services</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

