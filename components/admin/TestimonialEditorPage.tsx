"use client";

import React from "react";
import {
  ArrowLeft,
  Check,
  Star,
  Quote,
  Sparkles,
  ChevronRight,
  User,
  Building,
  Activity,
  Award,
} from "lucide-react";

export interface TestimonialFormData {
  name: string;
  role: string;
  company: string;
  avatarInitials: string;
  quote: string;
  rating: number;
  metric: string;
  isSample: boolean;
  active: boolean;
  order: number;
}

interface TestimonialEditorPageProps {
  testimonialForm: TestimonialFormData;
  setTestimonialForm: React.Dispatch<React.SetStateAction<TestimonialFormData>>;
  isEditing: boolean;
  editingName?: string;
  onSave: (e: React.FormEvent) => Promise<void> | void;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function TestimonialEditorPage({
  testimonialForm,
  setTestimonialForm,
  isEditing,
  editingName,
  onSave,
  onCancel,
  isSaving = false,
}: TestimonialEditorPageProps) {
  // Computed initials for preview if empty
  const computedInitials = React.useMemo(() => {
    if (testimonialForm.avatarInitials?.trim()) {
      return testimonialForm.avatarInitials.trim().slice(0, 3).toUpperCase();
    }
    if (!testimonialForm.name?.trim()) return "VO";
    const parts = testimonialForm.name.trim().split(/\s+/).filter(Boolean);
    const cleanParts = parts.filter((p) => !/^(dr\.?|mr\.?|mrs\.?|ms\.?|prof\.?)$/i.test(p));
    const target = cleanParts.length >= 2 ? cleanParts : parts;
    return (target[0][0] + (target.length > 1 ? target[target.length - 1][0] : "")).toUpperCase();
  }, [testimonialForm.name, testimonialForm.avatarInitials]);

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
            <span>Back to Testimonials</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span>Testimonials</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold truncate max-w-xs">
              {isEditing ? `Edit: ${editingName || testimonialForm.name}` : "New Testimonial"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : isEditing ? "Update Testimonial" : "Publish Testimonial"}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Author & Client Profile */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <User className="w-4 h-4" />
              <span>Client / Executive Identity</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Elena Rostova"
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-600 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Title / Role <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Technology Officer"
                  value={testimonialForm.role}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-600 transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Company / Organization <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Healthcare AI"
                  value={testimonialForm.company}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-600 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Avatar Initials</span>
                  <span className="text-[10px] text-slate-500 font-mono">Optional</span>
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder={`Auto: "${computedInitials}"`}
                  value={testimonialForm.avatarInitials}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, avatarInitials: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm font-mono text-cyan-300 placeholder-slate-600 transition-all outline-none uppercase"
                />
              </div>
            </div>
          </div>

          {/* Card: Review Content & Verified Outcome */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <Quote className="w-4 h-4" />
              <span>Feedback &amp; Benchmark Metrics</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Verified Outcome Metric <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. 3.8x Accelerated Diagnostics or 99.999% Fault Tolerance"
                  value={testimonialForm.metric}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, metric: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-600 transition-all outline-none"
                />
                <Sparkles className="w-4 h-4 text-cyan-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Displayed prominently in the top glowing pill badge on the testimonial card.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Star Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })}
                    className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group"
                  >
                    <Star
                      className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        star <= testimonialForm.rating
                          ? "text-cyan-400 fill-cyan-400"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono text-cyan-400 font-semibold ml-2">
                  {testimonialForm.rating} / 5 Stars
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Testimonial Quote <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={5}
                required
                placeholder="Enter client testimonial quote describing technical delivery, architecture quality, and impact..."
                value={testimonialForm.quote}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-600 transition-all outline-none leading-relaxed italic"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>Recommended: 120–280 characters</span>
                <span>{testimonialForm.quote.length} chars</span>
              </div>
            </div>
          </div>

          {/* Card: Display Controls & Metadata */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <Award className="w-4 h-4" />
              <span>Publishing &amp; Presentation Options</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Active Toggle */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={testimonialForm.active}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, active: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
                />
                <div>
                  <span className="text-xs font-semibold text-white block">Active on Website</span>
                  <span className="text-[11px] text-slate-400">Include in public homepage testimonial carousel</span>
                </div>
              </label>

              {/* Sample / Demo Toggle */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={testimonialForm.isSample}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, isSample: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
                />
                <div>
                  <span className="text-xs font-semibold text-white block">Sample Enterprise Disclaimer</span>
                  <span className="text-[11px] text-slate-400">Display &quot;Demonstration Content Only&quot; tag</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Mockup Card Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
              <span className="uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Live Card Preview
              </span>
              <span className="text-slate-500">Homepage Component Mockup</span>
            </div>

            {/* Testimonials Carousel Card Preview (Exact Homepage Styling) */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] via-slate-900/60 to-cyan-950/30 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(0,240,255,0.22),inset_0_1px_2px_rgba(255,255,255,0.25)] p-6 sm:p-7 overflow-hidden">
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 pointer-events-none" />
              <div className="absolute -top-14 -right-14 w-36 h-36 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

              {/* Ambient quote icon */}
              <div className="absolute top-5 right-6 text-cyan-500/15 pointer-events-none">
                <Quote className="w-12 h-12" />
              </div>

              <div className="space-y-4 relative z-10">
                {/* Metric pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono max-w-full">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    Verified Outcome: {testimonialForm.metric || "3.8x Accelerated Diagnostics"}
                  </span>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1 text-cyan-400">
                  {Array.from({ length: testimonialForm.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed italic pr-6 break-words">
                  &ldquo;
                  {testimonialForm.quote ||
                    "VyomAI delivered our multimodal diagnostic model ahead of schedule. Their attention to model validation, HIPAA compliance, and responsive Next.js frontend is unmatched in the industry."}
                  &rdquo;
                </blockquote>

                {/* Author Info & Sample disclaimer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-slate-950 shadow-md shadow-cyan-500/20 text-sm shrink-0">
                      {computedInitials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">
                        {testimonialForm.name || "Client Name"}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {testimonialForm.role || "Executive Role"} •{" "}
                        <span className="text-cyan-300">
                          {testimonialForm.company || "Enterprise Client"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {testimonialForm.isSample && (
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider self-start sm:self-center shrink-0">
                      Demonstration Content Only
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-400 space-y-1.5 font-mono">
              <span className="text-cyan-400 font-bold block">Production Best Practice</span>
              <p className="leading-relaxed">
                Include concrete engineering metrics (e.g. latency drop, accuracy score, cost reduction) to build strong technical authority with enterprise prospects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
