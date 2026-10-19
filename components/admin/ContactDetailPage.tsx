"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  Trash2,
  Check,
  Copy,
  ChevronRight,
  Inbox,
} from "lucide-react";

export interface ContactItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  details: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  createdAt: string;
}

interface ContactDetailPageProps {
  contact: ContactItem;
  onBack: () => void;
  onUpdateStatus: (id: string, status: "reviewed" | "contacted" | "archived") => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ContactDetailPage({
  contact,
  onBack,
  onUpdateStatus,
  onDelete,
}: ContactDetailPageProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const statusColors = {
    new: "bg-cyan-500 text-slate-950 font-bold",
    reviewed: "bg-sky-950 text-sky-300 border border-sky-800",
    contacted: "bg-emerald-950 text-emerald-300 border border-emerald-800",
    archived: "bg-slate-800 text-slate-400 border border-slate-700",
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
            <span>Back to Inquiries</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Inbound Inquiries</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold truncate max-w-xs">{contact.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className={`text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider ${
              statusColors[contact.status] || "bg-slate-800 text-slate-300"
            }`}
          >
            Status: {contact.status}
          </span>
          <button
            type="button"
            onClick={() => onDelete(contact._id)}
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
            Consultation Discovery Request
          </span>
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Received {new Date(contact.createdAt).toLocaleDateString()}</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span>{contact.name}</span>
          {contact.company && (
            <span className="text-slate-400 text-lg font-normal">({contact.company})</span>
          )}
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Inbound enterprise discovery submission requesting{" "}
          <strong className="text-cyan-300">{contact.service}</strong> services.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* Left Column (8 cols): Project Brief & Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Project Brief & Inquiry Message */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <Inbox className="w-4 h-4 text-cyan-400" />
                <span>Project Scope &amp; Discovery Brief</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopy(contact.details, "brief")}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copied === "brief" ? "Copied!" : "Copy Brief"}</span>
              </button>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {contact.details}
            </div>
          </div>

          {/* Card 2: Status Management Workflow */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <span className="font-bold text-white text-sm block border-b border-slate-800 pb-3">
              Update Inbound Pipeline Status
            </span>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onUpdateStatus(contact._id, "reviewed")}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  contact.status === "reviewed"
                    ? "bg-sky-950 border-sky-400 text-sky-300 font-bold shadow-md shadow-sky-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark Reviewed</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateStatus(contact._id, "contacted")}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  contact.status === "contacted"
                    ? "bg-emerald-950 border-emerald-400 text-emerald-300 font-bold shadow-md shadow-emerald-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark Contacted</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateStatus(contact._id, "archived")}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  contact.status === "archived"
                    ? "bg-slate-800 border-slate-600 text-slate-200 font-bold"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <span>Archive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Client Contact Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-sm">
            <span className="font-bold text-white text-xs block border-b border-slate-800 pb-3">
              Client Contact Information
            </span>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Email Address
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-cyan-400 hover:underline font-mono text-xs truncate flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                    <span className="truncate">{contact.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(contact.email, "email")}
                    className="text-slate-500 hover:text-slate-300 p-1"
                    title="Copy Email"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Phone / Mobile
                </span>
                {contact.phone ? (
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="text-emerald-400 hover:underline font-mono text-xs flex items-center gap-1.5 font-bold"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                      <span>{contact.phone}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(contact.phone || "", "phone")}
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
                  Company / Organization
                </span>
                <span className="text-white font-medium block">
                  {contact.company || "Not provided"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Target Service
                </span>
                <span className="text-cyan-300 font-semibold block">
                  {contact.service}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
