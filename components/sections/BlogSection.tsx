"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { BlogPost } from "@/data/blog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) {
          setPosts(data.data.slice(0, 3));
        }
      })
      .catch((err) => console.warn("Dynamic blog fetch error:", err));
  }, []);

  return (
    <section id="blog" className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      {/* Background Image with Cinematic Overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <Image
          src="/images/about-hero-bg.jpg"
          alt="VyomAI Blog Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Intellectual Capital"
          title="Engineering Insights &"
          gradientText="AI Architecture Papers"
          description="In-depth analysis, system blueprints, and thought leadership from our research leads on generative AI, distributed systems, and modern software paradigms."
        />

        {posts.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm">Publications and research insights will appear here once published in the Admin Panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.div
                key={post._id || post.slug || post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col justify-between h-full rounded-2xl bg-slate-900/80 hover:bg-transparent border border-slate-800 hover:border-cyan-400/60 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-md cursor-pointer"
                >
                  {/* Card Visual Header with Real Image */}
                  <div className="relative h-52 w-full overflow-hidden border-b border-slate-800 p-5 flex flex-col justify-between">
                    <Image
                      src={post.image || "/images/blog/generative-ai-arch.jpg"}
                      alt={post.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/60 pointer-events-none" />
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-400/10 rounded-full blur-2xl group-hover:bg-cyan-400/25 transition-all duration-500 pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-950/85 border border-cyan-400/40 text-cyan-300 backdrop-blur-md shadow-md">
                        {post.category}
                      </span>
                      {post.readTime && (
                        <span className="text-xs font-mono text-slate-200 bg-slate-950/75 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" /> {post.readTime}
                        </span>
                      )}
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md text-[11px] text-cyan-300 font-mono">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Publication</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {post.publishedDate && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{post.publishedDate}</span>
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                        {post.title}
                      </h3>

                      <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2 text-justify">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all">
                        <span>Read Full Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>

                      {post.author?.name && (
                        <span className="text-xs font-mono text-slate-400">
                          {post.author.name}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View all articles button */}
        <div className="mt-14 text-center">
          <Button href="/blog" variant="outline" size="md">
            View All Research &amp; Articles
          </Button>
        </div>
      </div>
    </section>
  );
};
