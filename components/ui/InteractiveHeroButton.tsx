"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface InteractiveHeroButtonProps {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "secondary";
  className?: string;
}

export const InteractiveHeroButton: React.FC<InteractiveHeroButtonProps> = ({
  href,
  children,
  variant,
  className = "",
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isPrimary = variant === "primary";

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative rounded-full"
    >
      <Link
        ref={buttonRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 select-none cursor-pointer ${
          isPrimary
            ? "text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 border border-cyan-300/50 shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)]"
            : "text-slate-100 bg-slate-950/80 hover:bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/80 shadow-lg shadow-black/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] backdrop-blur-xl"
        } ${className}`}
      >
        {/* Dynamic Interactive Cursor-Tracking Spotlight Beam inside the button */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: isHovered ? 1 : 0,
            background: isPrimary
              ? `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.45), rgba(0, 240, 255, 0.25) 50%, transparent 100%)`
              : `radial-gradient(110px circle at ${coords.x}px ${coords.y}px, rgba(0, 240, 255, 0.35), rgba(56, 189, 248, 0.15) 50%, transparent 100%)`,
          }}
        />

        {/* Shimmer sweep light effect on hover */}
        {isHovered && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
          />
        )}

        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          {children}
        </span>
      </Link>
    </motion.div>
  );
};
