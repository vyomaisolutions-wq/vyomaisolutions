"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string | React.ReactNode;
  gradientText?: string | React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  descriptionClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  gradientText,
  description,
  align = "center",
  className,
  descriptionClassName,
}) => {
  const isCenter = align === "center";

  return (
    <motion.div
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "max-w-3xl mb-10 md:mb-14",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 shadow-sm shadow-cyan-500/10 mb-4",
            isCenter ? "mx-auto" : ""
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-[1.2]">
        {title}{" "}
        {gradientText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            {gradientText}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg text-slate-300/90 leading-relaxed",
            isCenter ? "max-w-2xl mx-auto" : "",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};
