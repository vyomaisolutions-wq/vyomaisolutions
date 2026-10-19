"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Upload,
  Globe,
  CheckCircle,
  Layers,
  ChevronRight,
  Brain,
  Sparkles,
  Code2,
  Smartphone,
  CloudCog,
  Palette,
  Cpu,
} from "lucide-react";

export interface ServiceFormData {
  title: string;
  slug: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string;
  technologies: string;
  metrics: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  keywords: string;
}

interface ServiceEditorPageProps {
  serviceForm: ServiceFormData;
  setServiceForm: React.Dispatch<React.SetStateAction<ServiceFormData>>;
  isEditing: boolean;
  editingTitle?: string;
  onSave: (e: React.FormEvent) => Promise<void> | void;
  onCancel: () => void;
  handleFileUpload: (file: File, target: "service" | "service-meta") => Promise<void>;
  uploadingImage: boolean;
  generateSlug: (title: string) => string;
}

const iconOptions = [
  { value: "Brain", label: "Brain (AI & ML)", Icon: Brain },
  { value: "Sparkles", label: "Sparkles (Generative AI)", Icon: Sparkles },
  { value: "Code2", label: "Code2 (Custom Software)", Icon: Code2 },
  { value: "Globe", label: "Globe (Web & Cloud)", Icon: Globe },
  { value: "Smartphone", label: "Smartphone (Mobile Systems)", Icon: Smartphone },
  { value: "CloudCog", label: "CloudCog (DevOps & SRE)", Icon: CloudCog },
  { value: "Palette", label: "Palette (UI/UX Design)", Icon: Palette },
  { value: "Cpu", label: "Cpu (Hardware & Embedded)", Icon: Cpu },
];

export default function ServiceEditorPage({
  serviceForm,
  setServiceForm,
  isEditing,
  editingTitle,
  onSave,
  onCancel,
  handleFileUpload,
  uploadingImage,
  generateSlug,
}: ServiceEditorPageProps) {
  const parsedFeatures = serviceForm.features
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  const parsedTechs = serviceForm.technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const metaTitleLength = (serviceForm.metaTitle || serviceForm.title).length;
  const metaDescLength = (serviceForm.metaDescription || serviceForm.shortDesc).length;

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
            <span>Back to Services Catalog</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold truncate max-w-xs">
              {isEditing ? `Edit: ${editingTitle || serviceForm.title}` : "New Service"}
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
            form="service-editor-form"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isEditing ? "Save Changes" : "Create Service"}</span>
          </button>
        </div>
      </div>

      {/* Hero Title Section */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
            Capability Architecture
          </span>
          {isEditing && (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              Editing Existing Service
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isEditing ? `Edit Service: ${editingTitle || serviceForm.title}` : "Add New Enterprise Service Offering"}
        </h1>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Configure production service capabilities, formal SLA performance guarantees, feature checklists, and dedicated SEO details page content.
        </p>
      </div>

      {/* Main 2-Column Responsive Form */}
      <form id="service-editor-form" onSubmit={onSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* Left Column (8 cols): Primary Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Service Definition */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Service Definition &amp; SLA</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Step 1 of 3</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold block">
                  Service Title <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setServiceForm((prev) => ({
                      ...prev,
                      title,
                      slug: isEditing ? prev.slug : generateSlug(title),
                    }));
                  }}
                  placeholder="e.g. Artificial Intelligence &amp; Autonomous Agents"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-medium transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">URL Slug</label>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    Live Public Details Page
                  </span>
                </div>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 overflow-hidden focus-within:border-cyan-400 transition-colors">
                  <span className="px-3.5 py-2.5 text-slate-500 font-mono text-xs border-r border-slate-800/80 select-none bg-slate-900/40">
                    https://vyomai.com/services/
                  </span>
                  <input
                    type="text"
                    required
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm({ ...serviceForm, slug: generateSlug(e.target.value) })}
                    placeholder="ai-machine-learning"
                    className="flex-1 px-3.5 py-2.5 bg-transparent text-cyan-300 font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Visual Icon</label>
                  <select
                    value={serviceForm.iconName}
                    onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 cursor-pointer text-xs"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Metrics / SLA Guarantee</label>
                  <input
                    type="text"
                    value={serviceForm.metrics}
                    onChange={(e) => setServiceForm({ ...serviceForm, metrics: e.target.value })}
                    placeholder="e.g. 99.4% Model Precision Across Production Pipelines"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Descriptions & Features */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Descriptions &amp; Core Capabilities</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Step 2 of 3</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">
                    Short Summary (Card Overview) <span className="text-cyan-400">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Card listing summary</span>
                </div>
                <textarea
                  required
                  rows={2}
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  placeholder="One sentence description explaining the core capability and client value proposition..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">
                    Full Service Description (For Dedicated /services/{serviceForm.slug || "details"} Page) <span className="text-cyan-400">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Double enter for paragraphs</span>
                </div>
                <textarea
                  required
                  rows={6}
                  value={serviceForm.fullDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
                  placeholder="Comprehensive multi-paragraph breakdown of this engineering service, research methodology, security posture, and deployment pipeline..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">
                    Key Features Checklist (One per line)
                  </label>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {parsedFeatures.length} features configured
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                  placeholder="Custom Neural Network Architecture&#10;Predictive Analytics &amp; Forecasting&#10;Model Training &amp; Quantization"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs leading-relaxed"
                />
                {parsedFeatures.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {parsedFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold">Technologies (Comma-separated)</label>
                <input
                  type="text"
                  value={serviceForm.technologies}
                  onChange={(e) => setServiceForm({ ...serviceForm, technologies: e.target.value })}
                  placeholder="PyTorch, CUDA, Next.js, vLLM, TensorRT"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                />
                {parsedTechs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {parsedTechs.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-cyan-300 font-mono text-[10px]"
                      >
                        {tech}
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
                Auto-falls back to service description if blank
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
                  value={serviceForm.metaTitle}
                  onChange={(e) => setServiceForm({ ...serviceForm, metaTitle: e.target.value })}
                  placeholder={serviceForm.title || "Custom Meta Title for Service"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold text-[11px]">Keywords (Comma-separated)</label>
                <input
                  type="text"
                  value={serviceForm.keywords}
                  onChange={(e) => setServiceForm({ ...serviceForm, keywords: e.target.value })}
                  placeholder="Enterprise AI, Neural Networks, Deep Tech"
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
                value={serviceForm.metaDescription}
                onChange={(e) => setServiceForm({ ...serviceForm, metaDescription: e.target.value })}
                placeholder={serviceForm.shortDesc || "Custom snippet summary for search engines..."}
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
                <span>services</span>
                <span>›</span>
                <span className="text-emerald-300">{serviceForm.slug || "service"}</span>
              </div>
              <div className="text-sm font-semibold text-sky-400 hover:underline cursor-pointer truncate">
                {serviceForm.metaTitle || serviceForm.title || "Enterprise Service Offering | VyomAI"}
              </div>
              <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {serviceForm.metaDescription ||
                  serviceForm.shortDesc ||
                  "Production-grade artificial intelligence and deep-tech engineering services."}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Media Assets & Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Publishing Actions */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Service Status</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                ● Active Offering
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isEditing ? "Save &amp; Update Service" : "Publish Service Offering"}</span>
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel &amp; Return
              </button>
            </div>
          </div>

          {/* Card: Service Featured Image */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Service Featured Image</span>
              <span className="text-[10px] font-mono text-cyan-400">Card &amp; Details</span>
            </div>

            <div className="space-y-3">
              <label className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-xs">
                  {uploadingImage ? "Uploading Image..." : "Upload Service Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "service");
                  }}
                />
              </label>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] font-mono block">Or Direct Static / CDN URL:</span>
                <input
                  type="text"
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  placeholder="/images/services/ai-ml.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              {serviceForm.image ? (
                <div className="space-y-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800">
                    <Image
                      src={serviceForm.image}
                      alt="Service Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Selected Image
                    </span>
                    <button
                      type="button"
                      onClick={() => setServiceForm({ ...serviceForm, image: "" })}
                      className="text-[10px] font-mono text-red-400 hover:text-red-300 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-slate-500 text-xs">
                  No service image selected yet
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
                    if (file) handleFileUpload(file, "service-meta");
                  }}
                />
              </label>

              <input
                type="text"
                value={serviceForm.metaImage}
                onChange={(e) => setServiceForm({ ...serviceForm, metaImage: e.target.value })}
                placeholder={serviceForm.image || "/images/services/custom-og.jpg"}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
              />

              {(serviceForm.metaImage || serviceForm.image) && (
                <div className="relative w-full h-28 rounded-lg overflow-hidden border border-slate-800 mt-1">
                  <Image
                    src={serviceForm.metaImage || serviceForm.image}
                    alt="Social Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex items-end p-2.5">
                    <span className="text-[10px] font-mono text-cyan-300 font-semibold truncate">
                      {serviceForm.metaTitle || serviceForm.title || "Service Title"}
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
