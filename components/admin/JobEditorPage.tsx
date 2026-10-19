"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Briefcase,
  ChevronRight,
  ExternalLink,
  MapPin,
  Clock,
  DollarSign,
  Tag,
  CheckCircle,
} from "lucide-react";

export interface JobFormData {
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  compensation: string;
  description: string;
  responsibilities: string;
  requirements: string;
  tags: string;
  featured: boolean;
  active: boolean;
}

interface JobEditorPageProps {
  jobForm: JobFormData;
  setJobForm: React.Dispatch<React.SetStateAction<JobFormData>>;
  isEditing: boolean;
  editingTitle?: string;
  onSave: (e: React.FormEvent) => Promise<void> | void;
  onCancel: () => void;
  generateSlug: (title: string) => string;
}

export default function JobEditorPage({
  jobForm,
  setJobForm,
  isEditing,
  editingTitle,
  onSave,
  onCancel,
  generateSlug,
}: JobEditorPageProps) {
  const parsedResp = jobForm.responsibilities
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  const parsedReqs = jobForm.requirements
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  const parsedTags = jobForm.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

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
            <span>Back to Careers &amp; Jobs</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Careers</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold truncate max-w-xs">
              {isEditing ? `Edit: ${editingTitle || jobForm.title}` : "Post Job Opening"}
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
            form="job-editor-form"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isEditing ? "Save Position Changes" : "Publish Job Opening"}</span>
          </button>
        </div>
      </div>

      {/* Hero Title Section */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
            Talent Acquisition Engine
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
              jobForm.active
                ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            {jobForm.active ? "● Live on /careers" : "○ Inactive / Draft"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isEditing ? `Edit Job Position: ${editingTitle || jobForm.title}` : "Post New Engineering Position"}
        </h1>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Publish engineering roles to recruit world-class distributed systems engineers, AI researchers, and deep-tech operators.
        </p>
      </div>

      {/* Main 2-Column Responsive Form */}
      <form id="job-editor-form" onSubmit={onSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* Left Column (8 cols): Primary Job Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Role Overview */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Position Title &amp; Department</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Step 1 of 2</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold block">
                    Job Title <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setJobForm((prev) => ({
                        ...prev,
                        title,
                        slug: isEditing ? prev.slug : generateSlug(title),
                      }));
                    }}
                    placeholder="e.g. Lead Distributed Systems Architect"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-medium transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold block">
                    URL Slug <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.slug}
                    onChange={(e) => setJobForm({ ...jobForm, slug: generateSlug(e.target.value) })}
                    placeholder="lead-distributed-systems-architect"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Department *</label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 cursor-pointer text-xs"
                  >
                    <option value="AI Research &amp; Systems">AI Research &amp; Systems</option>
                    <option value="Distributed Systems">Distributed Systems</option>
                    <option value="Full-Stack Engineering">Full-Stack Engineering</option>
                    <option value="MLOps &amp; Security">MLOps &amp; Security</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Core Engineering">Core Engineering</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Location</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="e.g. Remote (Global) / Bangalore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Employment Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 cursor-pointer text-xs"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract / Research Fellow">Contract / Research Fellow</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Experience Required</label>
                  <input
                    type="text"
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                    placeholder="e.g. 5+ Years"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-200 font-semibold">Compensation Package</label>
                  <input
                    type="text"
                    value={jobForm.compensation}
                    onChange={(e) => setJobForm({ ...jobForm, compensation: e.target.value })}
                    placeholder="e.g. $140,000 – $200,000 + Top Equity"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Mission, Responsibilities & Requirements */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>Mission, Responsibilities &amp; Requirements</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Step 2 of 2</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold">
                  Role Overview / Mission Summary <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="High-level mission overview, core technical challenges, and the architectural focus of this position..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">
                    Key Responsibilities (One bullet point per line)
                  </label>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {parsedResp.length} items configured
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={jobForm.responsibilities}
                  onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                  placeholder="Architect multi-tenant RAG pipelines and private foundation model serving clusters&#10;Design formal guardrail engines that enforce schema validation&#10;Collaborate directly with enterprise client CTOs and systems leads"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold">
                    Core Requirements (One bullet point per line)
                  </label>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {parsedReqs.length} items configured
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  placeholder="5+ years in production systems engineering and applied AI&#10;Deep experience with CUDA, vLLM, TensorRT-LLM&#10;Strong background in distributed training benchmarks and low-latency APIs"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-200 font-semibold">Technology Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={jobForm.tags}
                  onChange={(e) => setJobForm({ ...jobForm, tags: e.target.value })}
                  placeholder="PyTorch, CUDA, vLLM, Python, Next.js, Redis, TensorRT"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                />
                {parsedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {parsedTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-cyan-300 font-mono text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Visibility & Live Preview */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Publishing Status */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Publishing Status</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  jobForm.active
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {jobForm.active ? "● Live on /careers" : "○ Hidden"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 font-medium text-xs">
                <input
                  type="checkbox"
                  checked={jobForm.active}
                  onChange={(e) => setJobForm({ ...jobForm, active: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-900 border-slate-800 mt-0.5"
                />
                <span className="leading-snug">
                  Publish role immediately on public{" "}
                  <span className="text-cyan-300 font-mono">/careers</span> page
                </span>
              </label>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isEditing ? "Save Position Changes" : "Publish Job Opening"}</span>
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

          {/* Card: Live Career Page Card Preview */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-xs">Careers Card Preview</span>
              <span className="text-[10px] font-mono text-cyan-400">Public Appearance</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30 uppercase">
                  {jobForm.department || "AI Research & Systems"}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {jobForm.type || "Full-Time"}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  {jobForm.title || "Job Title Preview"}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {jobForm.description || "Mission summary and architectural challenge overview..."}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{jobForm.location || "Remote"}</span>
                </span>
                <span className="text-cyan-300 font-bold">{jobForm.experience || "5+ Years"}</span>
              </div>
            </div>

            <Link
              href="/careers#open-positions"
              target="_blank"
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-mono flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
            >
              <span>View Live Careers Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
