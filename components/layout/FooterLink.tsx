"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  badge?: React.ReactNode;
  title?: string;
}

/**
 * FooterLink provides the interactive hover state requested by the user:
 * - On hover, a '>' chevron arrow smoothly animates into view on the left.
 * - The text shifts slightly to the right ("text going some").
 * - Text and arrow switch to the website brand cyan color (#00f0ff / text-cyan-400).
 * - The text receives a brand cyan underline.
 */
export const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  children,
  className = "",
  external = false,
  badge,
  title,
}) => {
  const pathname = usePathname();
  const isInternal =
    !external &&
    !href.startsWith("http") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:");

  const isActive = pathname === href;

  const content = (
    <span
      className={`footer-interactive-link group inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors duration-200 py-0.5 select-none cursor-pointer text-xs sm:text-sm ${
        isActive ? "active text-cyan-300" : ""
      }`}
      title={title}
    >
      {/* Animated Arrow Chevron: Reveals with width & opacity transition on hover */}
      <span
        aria-hidden="true"
        className="footer-link-arrow inline-flex items-center justify-center overflow-hidden w-0 opacity-0 -translate-x-2 group-hover:w-3.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:mr-1 transition-all duration-200 ease-out text-cyan-400 shrink-0"
      >
        <ChevronRight className="w-3.5 h-3.5 stroke-[2.6]" />
      </span>

      {/* Text shifts forward and underlines in website cyan theme */}
      <span className="footer-link-text transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:underline group-hover:underline-offset-4 group-hover:decoration-cyan-400 group-hover:decoration-1">
        {children}
      </span>

      {/* Optional attached badge */}
      {badge && <span className="ml-1.5 inline-flex items-center">{badge}</span>}
    </span>
  );

  if (isInternal) {
    return (
      <Link href={href} className={`inline-block ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
    >
      {content}
    </a>
  );
};
