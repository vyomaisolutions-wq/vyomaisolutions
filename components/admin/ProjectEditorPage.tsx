"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Upload,
  Globe,
  CheckCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  Trash2,
  Tag,
  Briefcase,
} from "lucide-react";

export interface ProjectFormData {
  title: string;
  slug: string;
  category: string;
  clientIndustry: string;
  description: string;
  results: string;
  technologies: string;
  image: string;
  sampleBadge: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  keywords: string;
}

interface ProjectEditorPageProps {
  projectForm: ProjectFormData;
  setProjectForm: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  isEditing: boolean;
  editingTitle?: string;
  onSave: (e: React.FormEvent) => Promise<void> | void;
  onCancel: () => void;
  handleFileUpload: (file: File, target: "project" | "project-meta") => Promise<void>;
  uploadingImage: boolean;
  generateSlug: (title: string) => string;
}

export default function ProjectEditorPage({
  projectForm,
  setProjectForm,
  isEditing,
  editingTitle,
  onSave,
  onCancel,
  handleFileUpload,
  uploadingImage,
  generateSlug,
}: ProjectEditorPageProps) {
  const parsedTechs = projectForm.technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const parsedKeywords = projectForm.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const metaTitleLength = (projectForm.metaTitle || projectForm.title).length;
  const metaDescLength = (projectForm.metaDescription || projectForm.description).length;

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
            <span>Back to Case Studies</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Portfolio</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold truncate max-w-xs">
              {isEditing ? `Edit: ${editingTitle || projectForm.title}` : "New Case Study"}
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
            form="project-editor-form"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isEditing ? "Save Changes" : "Publish Case Study"}</span>
          </button>
        </div>
      </div>

      {/* Hero Title Section */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
            Portfolio Management
          </span>
          {isEditing && (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              Editing Existing Record
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isEditing ? `Edit Case Study: ${editingTitle || projectForm.title}` : "Create New Production Case Study"}
        </h1>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Configure detailed engineering specifications, measurable client outcomes, architectural narrative, showcase imagery, and search engine OpenGraph parameters.
        </p>
      </div>

      {/* Main 2-Column Responsive Form */}
      <form id="project-editor-form" onSubmit={onSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* Left Column (8 cols): Primary Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Project Identity */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Project Identity &amp; Classification</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Step 1 of 3</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold block">
                  Project Title <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setProjectForm((prev) => ({
                      ...prev,
                      title,
                      slug: isEditing ? prev.slug : generateSlug(title),
                    }));
                  }}
                  placeholder="e.g. NeuroFinance Algorithmic Engine"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-medium transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">URL Slug</label>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    Live Public URL Path
                  </span>
                </div>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 overflow-hidden focus-within:border-cyan-400 transition-colors">
                  <span className="px-3.5 py-2.5 text-slate-500 font-mono text-xs border-r border-slate-800/80 select-none bg-slate-900/40">
                    https://vyomai.com/portfolio/
                  </span>
                  <input
                    type="text"
                    required
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: generateSlug(e.target.value) })}
                    placeholder="neurofinance-algorithmic-engine"
                    className="flex-1 px-3.5 py-2.5 bg-transparent text-cyan-300 font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 cursor-pointer text-xs"
                  >
                    <option value="AI & ML">AI &amp; ML</option>
                    <option value="Web & Cloud">Web &amp; Cloud</option>
                    <option value="Enterprise Systems">Enterprise Systems</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">
                    Client Industry <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.clientIndustry}
                    onChange={(e) => setProjectForm({ ...projectForm, clientIndustry: e.target.value })}
                    placeholder="e.g. Quantitative FinTech / Hedge Funds"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold">Showcase Card Badge</label>
                <input
                  type="text"
                  value={projectForm.sampleBadge}
                  onChange={(e) => setProjectForm({ ...projectForm, sampleBadge: e.target.value })}
                  placeholder="e.g. Showcase Case Study / Enterprise Production"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Engineering Highlights & Outcomes */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Benchmark Results &amp; Architecture</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Step 2 of 3</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">
                    Key Result Metrics <span className="text-cyan-400">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Displayed prominently on card</span>
                </div>
                <input
                  type="text"
                  required
                  value={projectForm.results}
                  onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                  placeholder="e.g. 99.8% Prediction Accuracy • $1.2B Daily Volume • 4ms Latency"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
                {projectForm.results && (
                  <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 font-mono text-[11px] flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-sans text-slate-400 uppercase tracking-wider font-semibold">
                      Card Preview:
                    </span>
                    <span className="font-bold">{projectForm.results}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">
                    Project Description / Architectural Summary <span className="text-cyan-400">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    {projectForm.description.length} chars
                  </span>
                </div>
                <textarea
                  required
                  rows={6}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Provide an in-depth breakdown of the client's business challenge, the neural network / distributed systems architecture deployed, benchmarks achieved, and the ongoing production SLA..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold flex items-center justify-between">
                  <span>Technologies &amp; Frameworks (Comma-separated)</span>
                  <span className="text-[10px] font-mono text-slate-400">e.g. PyTorch, CUDA, Next.js</span>
                </label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  placeholder="PyTorch, TensorRT, TypeScript, Next.js, Redis, Kafka"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                />
                {parsedTechs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {parsedTechs.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-cyan-300 font-mono text-[10px] flex items-center gap-1"
                      >
                        <Tag className="w-2.5 h-2.5 text-cyan-400" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                )}
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
                Auto-falls back to project title/description if blank
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
                  value={projectForm.metaTitle}
                  onChange={(e) => setProjectForm({ ...projectForm, metaTitle: e.target.value })}
                  placeholder={projectForm.title || "Custom Meta Title for Showcase"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold text-[11px]">Keywords (Comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.keywords}
                  onChange={(e) => setProjectForm({ ...projectForm, keywords: e.target.value })}
                  placeholder="FinTech, PyTorch, Autonomous Engine"
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
                value={projectForm.metaDescription}
                onChange={(e) => setProjectForm({ ...projectForm, metaDescription: e.target.value })}
                placeholder={projectForm.description || "Custom snippet summary for Google search results..."}
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
                <span>portfolio</span>
                <span>›</span>
                <span className="text-emerald-300">{projectForm.slug || "case-study"}</span>
              </div>
              <div className="text-sm font-semibold text-sky-400 hover:underline cursor-pointer truncate">
                {projectForm.metaTitle || projectForm.title || "Project Title | VyomAI Case Study"}
              </div>
              <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {projectForm.metaDescription ||
                  projectForm.description ||
                  "Detailed architectural summary and engineering outcome of this client production deployment."}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Media Assets & Publishing Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Publishing Actions */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Publishing Status</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                ● Live Ready
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isEditing ? "Save &amp; Update Project" : "Publish Case Study"}</span>
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel &amp; Return
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
              Saving updates the case study in the active database and deploys to the public{" "}
              <span className="text-cyan-300 font-mono">/portfolio</span> directory instantly.
            </p>
          </div>

          {/* Card: Showcase Image */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Showcase Image</span>
              <span className="text-[10px] font-mono text-cyan-400">Card &amp; Hero Media</span>
            </div>

            <div className="space-y-3">
              <label className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-xs">
                  {uploadingImage ? "Uploading Image..." : "Upload Image from Device"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "project");
                  }}
                />
              </label>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] font-mono block">Or Direct Static / CDN URL:</span>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="/images/projects/neuro-finance.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              {projectForm.image ? (
                <div className="space-y-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800">
                    <Image
                      src={projectForm.image}
                      alt="Project Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Selected Showcase Image
                    </span>
                    <button
                      type="button"
                      onClick={() => setProjectForm({ ...projectForm, image: "" })}
                      className="text-[10px] font-mono text-red-400 hover:text-red-300 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-slate-500 text-xs">
                  No showcase image selected yet
                </div>
              )}
            </div>
          </div>

          {/* Card: Social Preview Image (OpenGraph) */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Social Share Image (OG)</span>
              <span className="text-[10px] font-mono text-cyan-400">LinkedIn / Twitter</span>
            </div>

            <div className="space-y-3">
              <label className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-xs">
                  {uploadingImage ? "Uploading..." : "Upload Custom Meta Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "project-meta");
                  }}
                />
              </label>

              <input
                type="text"
                value={projectForm.metaImage}
                onChange={(e) => setProjectForm({ ...projectForm, metaImage: e.target.value })}
                placeholder={projectForm.image || "/images/projects/neuro-finance.jpg"}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
              />

              {(projectForm.metaImage || projectForm.image) && (
                <div className="relative w-full h-28 rounded-lg overflow-hidden border border-slate-800 mt-1">
                  <Image
                    src={projectForm.metaImage || projectForm.image}
                    alt="Social Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex items-end p-2.5">
                    <span className="text-[10px] font-mono text-cyan-300 font-semibold truncate">
                      {projectForm.metaTitle || projectForm.title || "Project Title"}
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
