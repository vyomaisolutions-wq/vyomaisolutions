import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Share2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  User,
  Layers,
} from "lucide-react";
import { blogPosts, BlogPost } from "@/data/blog";
import { getBlogBySlugFromDb, getBlogsFromDb } from "@/lib/db-service";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo-helper";

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await getBlogBySlugFromDb(slug);

  if (!post) {
    return {
      title: "Article Not Found — VyomAI",
      description: "The requested article could not be located.",
    };
  }

  const p = post as any;
  const fallbackKeywords = p.tags || ["AI Research", "Machine Learning", "VyomAI"];

  return constructMetadata({
    metaTitle: p.metaTitle || `${p.title} — VyomAI Insights`,
    metaDescription: p.metaDescription || p.excerpt,
    metaImage: p.metaImage || p.image || "/images/blog/generative-ai-arch.jpg",
    keywords: p.keywords && (Array.isArray(p.keywords) ? p.keywords.length > 0 : p.keywords.trim()) ? p.keywords : fallbackKeywords,
    canonicalUrl: `https://vyomai.com/blog/${slug}`,
  });
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: post } = await getBlogBySlugFromDb(slug);

  if (!post) {
    notFound();
  }

  const { data: allBlogs } = await getBlogsFromDb();
  const recentPosts = (allBlogs as BlogPost[]).filter((p) => p.slug !== post.slug);

  return (
    <div className="pt-20 pb-16 overflow-hidden">
      {/* Hero Header with Cosmic Neural Background Image */}
      <section className="relative pt-8 sm:pt-12 pb-5 sm:pb-6 overflow-hidden border-b border-slate-900/80">
        {/* Background Image with Cinematic Overlays */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src="/images/about-hero-bg.jpg"
            alt="VyomAI Article Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-transparent to-slate-950/85" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-cyan-500/15 blur-[130px]" />
          <div className="absolute inset-0 grid-bg opacity-15" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-all duration-300 mb-5 backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Publications</span>
          </Link>

          {/* Meta Tags Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 backdrop-blur-md">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900/70 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{post.publishedDate}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900/70 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{post.readTime}</span>
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
            {post.title}
          </h1>

          {/* Author Block */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-sm shadow-md shadow-cyan-500/20">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <span className="text-sm font-bold text-white block">
                  {post.author.name}
                </span>
                <span className="text-xs text-cyan-400 font-mono block">
                  {post.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Peer-Reviewed Research
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Main Article Body */}
          <article className="lg:col-span-8 order-1 space-y-8">
            {/* Featured Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Executive Summary Callout */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-blue-950/30 border-l-4 border-cyan-400 border-y border-r border-slate-800/80 shadow-xl">
              <h2 className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2 flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4" /> Executive Abstract
              </h2>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </div>

            {/* Detailed Sections or Full Description */}
            <div className="space-y-12 text-slate-300">
              {post.description && (
                <div className="space-y-4">
                  {post.description.split("\n\n").map((para, pIdx) => (
                    <p key={pIdx} className="text-base sm:text-lg text-slate-300 leading-relaxed text-justify">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {post.sections?.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight border-b border-slate-800/80 pb-3">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base sm:text-lg text-slate-300 leading-relaxed text-justify"
                    >
                      {p}
                    </p>
                  ))}

                  {section.callout && (
                    <div className="p-5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-200 font-mono text-sm leading-relaxed my-4 shadow-md">
                      &ldquo;{section.callout}&rdquo;
                    </div>
                  )}

                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="mt-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                      <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                        Key Architectural Takeaways:
                      </h3>
                      <div className="space-y-2">
                        {section.keyPoints.map((point, kIdx) => (
                          <div key={kIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                            <span className="text-sm text-slate-300 leading-relaxed">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}

              {/* Conclusion */}
              {post.conclusion && (
                <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/20 shadow-xl space-y-3">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Strategic Synthesis
                  </h2>
                  <p className="text-base text-slate-300 leading-relaxed text-justify">
                    {post.conclusion}
                  </p>
                </div>
              )}

              {/* Tags */}
              {post.tags && (
                <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2">Topics:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Author Bio Card */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-2xl text-slate-950 shadow-lg shadow-cyan-500/20 shrink-0">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="text-center sm:text-left flex-1">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  About the Author
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{post.author.name}</h3>
                <p className="text-xs text-slate-400 font-mono mb-2">{post.author.role}</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Spearheading advanced cognitive architecture and distributed inference research at VyomAI Technologies.
                </p>
              </div>
              <Button href="/contact" variant="outline" size="sm" className="shrink-0">
                Consult Author
              </Button>
            </div>
          </article>

          {/* Right Column: Recent Publications / Topics Sidebar */}
          <aside className="lg:col-span-4 order-2 lg:sticky lg:top-28 space-y-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/75 border border-slate-800/80 backdrop-blur-md shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Recent Publications
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* List of items matching user screenshot */}
              <div className="space-y-3">
                {recentPosts.slice(0, 6).map((recent) => (
                  <Link
                    key={recent.id}
                    href={`/blog/${recent.slug}`}
                    className="group flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-slate-800/90 transition-all duration-300"
                  >
                    {/* Rounded square thumbnail image */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700/80 group-hover:border-cyan-400/50 shadow-md transition-colors">
                      <Image
                        src={recent.image}
                        alt={recent.title}
                        fill
                        unoptimized
                        sizes="56px"
                        className="object-cover group-hover:scale-108 transition-transform duration-300"
                      />
                    </div>

                    {/* Title & Category on the right */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {recent.title}
                      </h4>
                      <span className="text-[10px] font-mono text-cyan-400/80 mt-1 block">
                        {recent.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Architecture Consult Callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900/70 to-slate-950 border border-cyan-500/30 text-center shadow-lg">
              <Sparkles className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-1">
                Custom AI Architecture?
              </h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Connect with our principal researchers for a technical audit.
              </p>
              <Button href="/contact" variant="primary" size="sm" className="w-full justify-center text-xs">
                Consult Engineers
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
