"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Upload,
  Globe,
  CheckCircle,
  FileText,
  ChevronRight,
  Tag,
  Clock,
  User,
} from "lucide-react";

export interface BlogFormData {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  description: string;
  image: string;
  tags: string;
  authorName: string;
  authorRole: string;
  conclusion: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  keywords: string;
}

interface BlogEditorPageProps {
  blogForm: BlogFormData;
  setBlogForm: React.Dispatch<React.SetStateAction<BlogFormData>>;
  isEditing: boolean;
  editingTitle?: string;
  onSave: (e: React.FormEvent) => Promise<void> | void;
  onCancel: () => void;
  handleFileUpload: (file: File, target: "blog" | "blog-meta") => Promise<void>;
  uploadingImage: boolean;
  generateSlug: (title: string) => string;
}

export default function BlogEditorPage({
  blogForm,
  setBlogForm,
  isEditing,
  editingTitle,
  onSave,
  onCancel,
  handleFileUpload,
  uploadingImage,
  generateSlug,
}: BlogEditorPageProps) {
  const parsedTags = blogForm.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const wordCount = ((blogForm.description || "") + " " + blogForm.excerpt)
    .split(/\s+/)
    .filter(Boolean).length;
  const computedReadTime = Math.max(3, Math.ceil(wordCount / 160)) + " min read";

  const metaTitleLength = (blogForm.metaTitle || blogForm.title).length;
  const metaDescLength = (blogForm.metaDescription || blogForm.excerpt).length;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
            <span>Back to Publications</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Blog</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold truncate max-w-xs">
              {isEditing ? `Edit: ${editingTitle || blogForm.title}` : "New Publication"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Discard
          </button>
          <button
            type="submit"
            form="blog-editor-form"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isEditing ? "Save Publication" : "Publish Article"}</span>
          </button>
        </div>
      </div>

      {/* Hero Title Section */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
            Publication Engine
          </span>
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>Est. {computedReadTime} ({wordCount} words)</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isEditing ? `Edit Publication: ${editingTitle || blogForm.title}` : "Publish New Technical Whitepaper"}
        </h1>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Craft high-impact research articles, distributed AI architecture guides, and technical insights for enterprise decision makers.
        </p>
      </div>

      {/* Main 2-Column Responsive Form */}
      <form id="blog-editor-form" onSubmit={onSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* Left Column (8 cols): Primary Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Article Identity */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Publication Headline &amp; Author</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Step 1 of 3</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold block">
                  Article Title <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setBlogForm((prev) => ({
                      ...prev,
                      title,
                      slug: isEditing ? prev.slug : generateSlug(title),
                    }));
                  }}
                  placeholder="e.g. Distributed Agentic Systems: Architecture at Scale"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-medium transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">URL Slug</label>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    Live Public Article URL
                  </span>
                </div>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 overflow-hidden focus-within:border-cyan-400 transition-colors">
                  <span className="px-3.5 py-2.5 text-slate-500 font-mono text-xs border-r border-slate-800/80 select-none bg-slate-900/40">
                    https://vyomai.com/blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: generateSlug(e.target.value) })}
                    placeholder="distributed-agentic-systems"
                    className="flex-1 px-3.5 py-2.5 bg-transparent text-cyan-300 font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 cursor-pointer text-xs"
                  >
                    <option value="Generative AI">Generative AI</option>
                    <option value="Autonomous Agents">Autonomous Agents</option>
                    <option value="Neural Networks">Neural Networks</option>
                    <option value="Cloud &amp; Edge AI">Cloud &amp; Edge AI</option>
                    <option value="Security &amp; Governance">Security &amp; Governance</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.authorName}
                    onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                    placeholder="Aarav Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Author Role</label>
                  <input
                    type="text"
                    value={blogForm.authorRole}
                    onChange={(e) => setBlogForm({ ...blogForm, authorRole: e.target.value })}
                    placeholder="Lead AI Research Architect"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Article Narrative & Content */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Technical Narrative &amp; Content</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Step 2 of 3</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">
                    Executive Summary / Excerpt <span className="text-cyan-400">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Card snippet preview</span>
                </div>
                <textarea
                  required
                  rows={3}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="A concise 2-3 sentence overview explaining the central thesis, methodology, and practical enterprise impact..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">
                    Full Article Content (Markdown / HTML Supported) <span className="text-cyan-400">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {blogForm.description.length} chars
                  </span>
                </div>
                <textarea
                  required
                  rows={14}
                  value={blogForm.description}
                  onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                  placeholder="### Architectural Overview&#10;&#10;When architecting autonomous systems, concurrency bottlenecks often emerge at the vector retrieval layer...&#10;&#10;```python&#10;import torch&#10;# TensorRT Quantization benchmark&#10;```&#10;&#10;### Benchmarks &amp; Production Latency..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold">
                  Key Takeaways &amp; Architectural Conclusion
                </label>
                <textarea
                  rows={3}
                  value={blogForm.conclusion}
                  onChange={(e) => setBlogForm({ ...blogForm, conclusion: e.target.value })}
                  placeholder="Final architectural summary or key takeaways for enterprise engineering leads..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Card 3: SEO & OpenGraph Configuration */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Globe className="w-4 h-4" />
                <span>SEO &amp; OpenGraph Social Indexing</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Auto-falls back to article title/excerpt if blank
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold text-[11px]">Meta Title</label>
                  <span
                    className={`text-[10px] font-mono ${
                      metaTitleLength > 60 ? "text-amber-400" : "text-emerald-400"
                    }`}
                  >
                    {metaTitleLength} / 60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={blogForm.metaTitle}
                  onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                  placeholder={blogForm.title || "Custom Meta Title for Article"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold text-[11px]">Keywords (Comma-separated)</label>
                <input
                  type="text"
                  value={blogForm.keywords}
                  onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
                  placeholder="LLMs, Architecture, Autonomous AI"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-200 font-semibold text-[11px]">Meta Description</label>
                <span
                  className={`text-[10px] font-mono ${
                    metaDescLength > 160 ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  {metaDescLength} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={blogForm.metaDescription}
                onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                placeholder={blogForm.excerpt || "Custom snippet summary for Google search results..."}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs leading-relaxed"
              />
            </div>

            {/* Google Search Live Preview Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Google Search Result Preview:
              </span>
              <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span>https://vyomai.com</span>
                <span>›</span>
                <span>blog</span>
                <span>›</span>
                <span className="text-emerald-300">{blogForm.slug || "article"}</span>
              </div>
              <div className="text-sm font-semibold text-sky-400 hover:underline cursor-pointer truncate">
                {blogForm.metaTitle || blogForm.title || "Article Title | VyomAI Whitepaper"}
              </div>
              <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {blogForm.metaDescription ||
                  blogForm.excerpt ||
                  "A comprehensive deep-dive into production-grade artificial intelligence and neural network systems."}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Media Assets & Publishing Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Publishing Actions */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Publication Actions</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                ● Ready to Publish
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isEditing ? "Save &amp; Update Article" : "Publish Article"}</span>
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel &amp; Return
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Calculated Reading Time:</span>
                <span className="text-cyan-300 font-bold">{computedReadTime}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Words:</span>
                <span className="text-white font-semibold">{wordCount}</span>
              </div>
            </div>
          </div>

          {/* Card: Featured Cover Image */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Featured Cover Image</span>
              <span className="text-[10px] font-mono text-cyan-400">Article Header</span>
            </div>

            <div className="space-y-3">
              <label className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-xs">
                  {uploadingImage ? "Uploading Cover..." : "Upload Cover Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "blog");
                  }}
                />
              </label>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] font-mono block">Or Direct Static / CDN URL:</span>
                <input
                  type="text"
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  placeholder="/images/blog/generative-ai-arch.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              {blogForm.image ? (
                <div className="space-y-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800">
                    <Image
                      src={blogForm.image}
                      alt="Cover Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Selected Cover Image
                    </span>
                    <button
                      type="button"
                      onClick={() => setBlogForm({ ...blogForm, image: "" })}
                      className="text-[10px] font-mono text-red-400 hover:text-red-300 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-slate-500 text-xs">
                  No cover image selected yet
                </div>
              )}
            </div>
          </div>

          {/* Card: Tags */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Topics &amp; Tags</span>
              <span className="text-[10px] font-mono text-cyan-400">Comma-separated</span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={blogForm.tags}
                onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                placeholder="LLMs, Architecture, Distributed AI, PyTorch"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
              />
              {parsedTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {parsedTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-slate-800/90 border border-slate-700/80 text-cyan-300 font-mono text-[10px] flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5 text-cyan-400" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Card: Social Preview Image (OpenGraph) */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Social Share Image (OG)</span>
              <span className="text-[10px] font-mono text-cyan-400">Social Meta</span>
            </div>

            <div className="space-y-3">
              <label className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-xs">
                  {uploadingImage ? "Uploading..." : "Upload Meta Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "blog-meta");
                  }}
                />
              </label>

              <input
                type="text"
                value={blogForm.metaImage}
                onChange={(e) => setBlogForm({ ...blogForm, metaImage: e.target.value })}
                placeholder={blogForm.image || "/images/blog/generative-ai-arch.jpg"}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
              />

              {(blogForm.metaImage || blogForm.image) && (
                <div className="relative w-full h-28 rounded-lg overflow-hidden border border-slate-800 mt-1">
                  <Image
                    src={blogForm.metaImage || blogForm.image}
                    alt="Social Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex items-end p-2.5">
                    <span className="text-[10px] font-mono text-cyan-300 font-semibold truncate">
                      {blogForm.metaTitle || blogForm.title || "Article Title"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
