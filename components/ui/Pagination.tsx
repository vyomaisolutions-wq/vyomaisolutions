"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemLabel = "items",
  className = "",
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-8 sm:pt-10 border-t border-slate-800/80 w-full min-w-0 ${className}`}
    >
      {/* Items Count Summary */}
      <p className="text-xs font-mono text-slate-400 text-center sm:text-left">
        Showing <span className="text-cyan-400 font-semibold">{startItem}</span> –{" "}
        <span className="text-cyan-400 font-semibold">{endItem}</span> of{" "}
        <span className="text-white font-semibold">{totalItems}</span> {itemLabel}
      </p>

      {/* Page Numbers and Prev/Next Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 max-w-full">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="h-8 sm:h-9 px-2 sm:px-3 rounded-xl text-xs font-mono font-medium flex items-center gap-1 bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer backdrop-blur-md shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {getPageNumbers().map((p, idx) => {
          if (p === "...") {
            return (
              <span key={`dots-${idx}`} className="px-1 sm:px-2 text-xs font-mono text-slate-500 select-none">
                …
              </span>
            );
          }

          const pageNum = p as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center backdrop-blur-md shrink-0 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/25 scale-105"
                  : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="h-8 sm:h-9 px-2 sm:px-3 rounded-xl text-xs font-mono font-medium flex items-center gap-1 bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer backdrop-blur-md shrink-0"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
