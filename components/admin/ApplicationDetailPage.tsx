"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Paperclip,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Trash2,
  Check,
  Copy,
  Calendar,
} from "lucide-react";

export interface CareerApplicationItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  experienceYears?: string;
  portfolioUrl?: string;
  resumeFileName?: string;
  pitch?: string;
  status: "new" | "reviewed" | "shortlisted" | "contacted" | "rejected";
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

interface ApplicationDetailPageProps {
  application: CareerApplicationItem;
  onBack: () => void;
  notes: string;
  setNotes: (val: string) => void;
  onSaveNotes: () => Promise<void>;
  isUpdatingStatus: boolean;
  onUpdateStatus: (
    id: string,
    status: "reviewed" | "shortlisted" | "contacted" | "rejected",
    notes: string
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ApplicationDetailPage({
  application,
  onBack,
  notes,
  setNotes,
  onSaveNotes,
  isUpdatingStatus,
  onUpdateStatus,
  onDelete,
}: ApplicationDetailPageProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const statusColors = {
    new: "bg-cyan-500 text-slate-950 font-bold",
    reviewed: "bg-sky-950 text-sky-300 border border-sky-400 font-bold",
    shortlisted: "bg-emerald-950 text-emerald-300 border border-emerald-400 font-bold",
    contacted: "bg-purple-950 text-purple-300 border border-purple-400 font-bold",
    rejected: "bg-red-950 text-red-400 border border-red-500 font-bold",
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
            <span>Back to Applications</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Careers</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold truncate max-w-xs">{application.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className={`text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider ${
              statusColors[application.status] || "bg-slate-800 text-slate-300"
            }`}
          >
            Stage: {application.status}
          </span>
          <button
            type="button"
            onClick={() => onDelete(application._id)}
            className="px-3.5 py-1.5 rounded-xl bg-red-950/40 border border-red-900/60 hover:bg-red-900/50 text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Hero Title Section */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
            Candidate Pipeline Record
          </span>
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Submitted {new Date(application.createdAt).toLocaleDateString()}</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span>{application.name}</span>
          <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
            {application.role}
          </span>
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Application submission for engineering position:{" "}
          <strong className="text-cyan-300">{application.role}</strong> ({application.experienceYears || "3-5 Years"} experience).
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* Left Column (8 cols): Technical Pitch & Evaluation Notes */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Technical Pitch Statement */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>Technical Pitch &amp; Systems Highlights</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopy(application.pitch || "", "pitch")}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copied === "pitch" ? "Copied!" : "Copy Pitch"}</span>
              </button>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {application.pitch || "No technical pitch statement provided by candidate."}
            </div>
          </div>

          {/* Card 2: Interview / Evaluation Notes */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-sm">
                Internal Hiring &amp; Technical Interview Notes
              </span>
              <button
                type="button"
                onClick={onSaveNotes}
                disabled={isUpdatingStatus}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Cleared round 1 technical screen with high marks. Exceptional distributed training and CUDA quantization benchmarks. Recommended for partner interview."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none font-sans leading-relaxed"
            />
          </div>

          {/* Card 3: Pipeline Stage Progression */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <span className="font-bold text-white text-sm block border-b border-slate-800 pb-3">
              Progress Hiring Pipeline Stage
            </span>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onUpdateStatus(application._id, "reviewed", notes)}
                className={`px-4 py-2 rounded-xl font-mono text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                  application.status === "reviewed"
                    ? "bg-sky-950 border-sky-400 text-sky-300 font-bold shadow-md shadow-sky-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark Reviewed</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateStatus(application._id, "shortlisted", notes)}
                className={`px-4 py-2 rounded-xl font-mono text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                  application.status === "shortlisted"
                    ? "bg-emerald-950 border-emerald-400 text-emerald-300 font-bold shadow-md shadow-emerald-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Shortlist Candidate</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateStatus(application._id, "contacted", notes)}
                className={`px-4 py-2 rounded-xl font-mono text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                  application.status === "contacted"
                    ? "bg-purple-950 border-purple-400 text-purple-300 font-bold shadow-md shadow-purple-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Interview Contacted</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateStatus(application._id, "rejected", notes)}
                className={`px-4 py-2 rounded-xl font-mono text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                  application.status === "rejected"
                    ? "bg-red-950 border-red-500 text-red-300 font-bold shadow-md shadow-red-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <span>Reject</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Candidate Contact & Assets */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <span className="font-bold text-white text-xs block border-b border-slate-800 pb-3">
              Candidate Profile &amp; Contact
            </span>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Email Address
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${application.email}`}
                    className="text-cyan-400 hover:underline font-mono text-xs truncate flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                    <span className="truncate">{application.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(application.email, "email")}
                    className="text-slate-500 hover:text-slate-300 p-1"
                    title="Copy Email"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Phone Number
                </span>
                {application.phone ? (
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={`tel:${application.phone.replace(/\s+/g, "")}`}
                      className="text-emerald-400 hover:underline font-mono text-xs flex items-center gap-1.5 font-bold"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                      <span>{application.phone}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(application.phone || "", "phone")}
                      className="text-slate-500 hover:text-slate-300 p-1"
                      title="Copy Phone"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <span className="text-slate-500 italic">Not provided</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Experience Level
                </span>
                <span className="text-white font-semibold block">
                  {application.experienceYears || "3-5 Years"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Resume / CV Document
                </span>
                <span className="text-cyan-300 font-mono text-xs flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{application.resumeFileName || "Uploaded in portal"}</span>
                </span>
              </div>

              {application.portfolioUrl && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Portfolio / GitHub Profile
                  </span>
                  <a
                    href={
                      application.portfolioUrl.startsWith("http")
                        ? application.portfolioUrl
                        : `https://${application.portfolioUrl}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-mono transition-colors break-all w-full"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{application.portfolioUrl}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
