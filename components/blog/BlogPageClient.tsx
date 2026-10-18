"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  Check,
  Send,
} from "lucide-react";
import { BlogPost } from "@/data/blog";
import { Pagination } from "@/components/ui/Pagination";

interface BlogPageClientProps {
  initialPosts?: BlogPost[];
}

export const BlogPageClient: React.FC<BlogPageClientProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) {
      fetch("/api/blog")
        .then((res) => res.json())
        .then((data) => {
          if (data.data && Array.isArray(data.data)) {
            setPosts(data.data);
          }
        })
        .catch((err) => console.warn("Dynamic blog fetch:", err));
    }
  }, [initialPosts]);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const totalPosts = filteredPosts.length;
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById("articles-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden w-full min-w-0">
      {/* Hero Header with Reduced Padding & Cosmic Neural Background Image */}
      <section className="relative py-12 sm:py-16 text-center overflow-hidden border-b border-slate-900/80">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src="/images/about-hero-bg.jpg"
            alt="VyomAI Blog Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/65 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-cyan-500/15 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5 max-w-full">
            <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">Research &amp; Engineering Publications</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 sm:mb-5 break-words">
            Architectural Insights &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500">
              AI Papers
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Practical engineering blueprints, mathematical analyses, and field notes from building high-scale AI systems.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-4 sm:py-6 border-y border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer min-tap-target shrink-0 ${
                  selectedCategory === cat
                    ? "bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-semibold"
                    : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles or topics..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors min-h-[44px]"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section id="articles-section" className="py-12 sm:py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 sm:py-20 text-slate-400">
              <p>No articles published yet. Publications will appear here once added in the Admin Panel.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedPosts.map((post) => (
                  <Link
                    key={post._id || post.slug || post.id}
                    href={`/blog/${post.slug}`}
                    className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] via-slate-900/60 to-cyan-950/30 backdrop-blur-2xl border border-cyan-400/50 hover:border-cyan-300/80 shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(0,240,255,0.22),inset_0_1px_2px_rgba(255,255,255,0.25)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.7),0_0_50px_rgba(0,240,255,0.38),inset_0_1px_2px_rgba(255,255,255,0.45)] transition-all duration-300 overflow-hidden cursor-pointer min-w-0"
                  >
                    {/* Top ambient highlight line in normal state */}
                    <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

                    <div className="relative h-44 sm:h-52 w-full overflow-hidden border-b border-cyan-500/20 p-4 sm:p-5 flex flex-col justify-between">
                      <Image
                        src={post.image || "/images/blog/generative-ai-arch.jpg"}
                        alt={post.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/60 pointer-events-none" />
                      <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-400/20 rounded-full blur-2xl group-hover:bg-cyan-400/35 transition-all duration-500 pointer-events-none" />

                      <div className="flex items-center justify-between gap-2 relative z-10">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-950/85 border border-cyan-400/40 text-cyan-300 backdrop-blur-md shadow-md truncate">
                          {post.category}
                        </span>
                        <span className="text-xs font-mono text-slate-200 bg-slate-950/75 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md flex items-center gap-1.5 shadow-sm shrink-0">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" /> {post.readTime}
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md text-[11px] text-cyan-300 font-mono">
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Publication</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{post.publishedDate}</span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2.5 break-words">
                          {post.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all min-tap-target">
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>

                        <span className="text-xs font-mono text-slate-400 truncate max-w-[140px]">
                          {post.author?.name || "VyomAI Lead"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPosts > ITEMS_PER_PAGE && (
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalPosts}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={handlePageChange}
                  itemLabel="publications"
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Box */}
      <section className="py-16 sm:py-20 bg-slate-950/80 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-slate-900 border border-cyan-500/20 shadow-2xl min-w-0">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-3 sm:mb-4 animate-pulse" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 break-words">
              Stay Ahead of AI Breakthroughs
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              Subscribe to get our quarterly engineering whitepapers, benchmark data, and model architecture deep-dives.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your corporate email"
                required
                className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 pr-14 min-h-[48px]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 w-11 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer flex items-center justify-center min-tap-target shrink-0"
                aria-label="Subscribe to newsletter"
              >
                {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-xs text-cyan-300 mt-3">
                ✓ Successfully subscribed! You will receive our next quarterly release.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
