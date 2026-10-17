"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  X,
  Send,
  UploadCloud,
  FileText,
  Zap,
  Search,
  Filter,
  Check,
  Terminal,
} from "lucide-react";
import { jobOpenings, JobOpening } from "@/data/careers";
import { Button } from "@/components/ui/Button";

export const CareersClient: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(jobOpenings[0]?.id || null);

  // Application Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    portfolioUrl: "",
    experienceYears: "5+",
    pitch: "",
    resumeFileName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const departments = [
    "All",
    "AI Research & Systems",
    "Distributed Systems",
    "Full-Stack Engineering",
    "MLOps & Security",
    "Product Design",
  ];

  const filteredJobs = jobOpenings.filter((job) => {
    const matchesDept = selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const handleOpenApplyModal = (job?: JobOpening) => {
    if (job) {
      setSelectedJobForModal(job);
      setFormData((prev) => ({ ...prev, role: job.title }));
    } else {
      setSelectedJobForModal(null);
      setFormData((prev) => ({ ...prev, role: "General Open Application" }));
    }
    setSubmitSuccess(false);
    setSubmitError(null);
    setIsApplyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
    setTimeout(() => {
      setSubmitSuccess(false);
      setSubmitError(null);
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, resumeFileName: file.name }));
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        company: `Candidate: ${formData.role} (${formData.experienceYears} exp, ${formData.portfolioUrl || "No Link"})`,
        service: `Career Application: ${formData.role}`,
        budget: "N/A (Job Application)",
        details: `[APPLIED FOR: ${formData.role}]\n[PHONE: ${formData.phone || "N/A"}]\n[PORTFOLIO/LINKEDIN: ${formData.portfolioUrl || "N/A"}]\n[RESUME FILE: ${formData.resumeFileName || "Uploaded in portal"}]\n\nCANDIDATE PITCH / HIGHLIGHTS:\n${formData.pitch}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application. Please try again or email careers@vyomai.com directly.");
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        portfolioUrl: "",
        experienceYears: "5+",
        pitch: "",
        resumeFileName: "",
      });
    } catch (err) {
      setSubmitError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="pt-20 pb-20 overflow-hidden bg-[#070b14] text-slate-100 min-h-screen">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 text-center overflow-hidden border-b border-slate-900/80">
        {/* Background Neural Grid and Ambient Glows */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src="/images/about-hero-bg.jpg"
            alt="VyomAI Engineering Careers Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/95 via-[#070b14]/75 to-[#070b14]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-transparent to-[#070b14]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-cyan-500/15 blur-[140px] rounded-full" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Join The Engineering Frontier // VyomAI Careers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-5">
            Architect The Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500">
              Autonomous Intelligence
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium mb-8">
            We are assembling an elite collective of systems architects, neural researchers, and distributed cloud engineers solving the hardest problems in applied AI. Zero red tape, high autonomy, and dedicated private GPU compute.
          </p>


          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("open-positions");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore Open Roles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>



      {/* ===================== OPEN POSITIONS JOB BOARD ===================== */}
      <section id="open-positions" className="py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block">
                Join The Swarm
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                Open Engineering Roles
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Showing {filteredJobs.length} active positions across core AI and distributed systems disciplines.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles, skills, or tags..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {departments.map((dept) => {
              const isActive = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20"
                      : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* Job Listings List */}
          {filteredJobs.length === 0 ? (
            <div className="p-16 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
              <Briefcase className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-slate-400 text-sm">
                No active roles match your search criteria. You can always submit a general pitch!
              </p>
              <button
                onClick={() => handleOpenApplyModal()}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                Submit General Pitch
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;

                return (
                  <div
                    key={job.id}
                    className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? "bg-slate-900/90 border-cyan-500/40 shadow-2xl shadow-cyan-950/40"
                        : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {/* Role Header Banner */}
                    <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="space-y-3 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-500/30 uppercase tracking-wider">
                            {job.department}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/60">
                            {job.location}
                          </span>
                          <span className="text-[10px] font-mono text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/80">
                            {job.experience}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                          {job.title}
                        </h3>

                        <p className="text-sm text-slate-300 leading-relaxed font-sans">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right action group */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0">
                        <div className="text-left lg:text-right">
                          <span className="text-[11px] font-mono text-slate-400 block uppercase">
                            Compensation Range
                          </span>
                          <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                            {job.compensation}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button
                            onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                            className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-cyan-400" : ""
                              }`}
                            />
                          </button>

                          <button
                            onClick={() => handleOpenApplyModal(job)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <span>Apply Now</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Deep Dive (Responsibilities & Requirements) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6 sm:px-8 pb-8 pt-4 border-t border-slate-800/80 bg-slate-950/60 space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider font-mono text-cyan-400">
                                <Zap className="w-4 h-4 text-cyan-400" /> Key Impact &amp; Responsibilities:
                              </h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((r, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-3">
                              <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider font-mono text-cyan-400">
                                <Terminal className="w-4 h-4 text-cyan-400" /> What We Look For:
                              </h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                            <span className="text-xs font-mono text-slate-400">
                              Direct founder-level interview loop. Zero algorithmic trick tests.
                            </span>
                            <button
                              onClick={() => handleOpenApplyModal(job)}
                              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <span>Apply For This Role</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>


      {/* ===================== APPLICATION MODAL ===================== */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 p-6 sm:p-8 z-10 my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400/50 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for applying to <span className="text-cyan-400 font-semibold">{formData.role || "VyomAI"}</span>. Our engineering team reviews every technical submission and will reach out directly within 48 business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Back to Careers
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      Engineering Application
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      {selectedJobForModal ? selectedJobForModal.title : "General Open Application"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      No corporate recruiter filtering. All applications are reviewed directly by technical leads.
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                      {submitError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 block">
                          Full Name <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Rivera"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 block">
                          Email Address <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@domain.io"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 block">
                          LinkedIn / GitHub / Portfolio <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={formData.portfolioUrl}
                          onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                          placeholder="https://github.com/username"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 block">
                          Target Role
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        >
                          {jobOpenings.map((j) => (
                            <option key={j.id} value={j.title}>
                              {j.title}
                            </option>
                          ))}
                          <option value="General Open Application">General Open Application / Initiative</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300 block">
                          Relevant Experience
                        </label>
                        <select
                          value={formData.experienceYears}
                          onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        >
                          <option value="1-3 Years">1 – 3 Years</option>
                          <option value="3-5 Years">3 – 5 Years</option>
                          <option value="5-8 Years">5 – 8 Years (Senior)</option>
                          <option value="8+ Years">8+ Years (Staff / Principal)</option>
                        </select>
                      </div>
                    </div>

                    {/* Resume Upload Simulator */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 block">
                        Resume / CV (PDF, DOCX)
                      </label>
                      <label className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 cursor-pointer transition-colors text-xs text-slate-400 hover:text-cyan-300">
                        <UploadCloud className="w-4 h-4 text-cyan-400" />
                        <span>
                          {formData.resumeFileName ? (
                            <span className="text-cyan-300 font-semibold">{formData.resumeFileName}</span>
                          ) : (
                            "Click to attach your Resume / CV file"
                          )}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Technical Pitch */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 block">
                        Technical Highlights / Why VyomAI? <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.pitch}
                        onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                        placeholder="Tell us about a non-trivial technical system you built, benchmarked, or debugged under pressure..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
