import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  Scale,
  Code2,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Briefcase,
  Layers,
  Mail,
  AlertCircle,
} from "lucide-react";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const seo = await getPageSeoFromDb("terms-conditions");
  return constructMetadata({
    metaTitle: seo.metaTitle || "Terms & Conditions — VyomAI | Enterprise Service Agreement",
    metaDescription:
      seo.metaDescription ||
      "Review the terms and conditions governing VyomAI software engineering services, AI solutions, intellectual property ownership, and service level agreements.",
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/terms-conditions",
  });
}

export default function TermsConditionsPage() {
  const lastUpdated = "October 18, 2026";
  const version = "v3.1.0 (Enterprise MSA)";

  const keyPillars = [
    {
      icon: Code2,
      title: "100% Client IP Assignment",
      description:
        "All bespoke source code, model weights, database schemas, and tailored assets become your exclusive intellectual property upon milestone payment.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Dual-Party NDA",
      description:
        "Strict confidentiality protocols defend your trade secrets, technical roadmaps, and business logic with enterprise-grade non-disclosure terms.",
    },
    {
      icon: Layers,
      title: "Predictable Agile SOWs",
      description:
        "Every engagement operates under precise Statements of Work (SOW) with defined sprint deliverables, acceptance criteria, and change-control protocols.",
    },
    {
      icon: Scale,
      title: "90-Day Post-Launch Warranty",
      description:
        "Comprehensive warranty covering bug remediation, critical defect fixes, and performance guarantees following production deployment.",
    },
  ];

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms & Hierarchy" },
    { id: "services-sow", title: "2. Services & Statements of Work" },
    { id: "ip-rights", title: "3. Intellectual Property & Ownership" },
    { id: "client-obligations", title: "4. Client Responsibilities" },
    { id: "payment-terms", title: "5. Invoicing, Fees & Payments" },
    { id: "confidentiality", title: "6. Confidentiality & Non-Disclosure" },
    { id: "ai-disclaimers", title: "7. AI Systems & Model Determinism" },
    { id: "warranties-sla", title: "8. Warranties & SLA Standards" },
    { id: "liability", title: "9. Limitation of Liability" },
    { id: "termination", title: "10. Term, Cancellation & Handover" },
    { id: "governing-law", title: "11. Governing Law & Dispute Resolution" },
    { id: "contact-legal", title: "12. Contact Legal Department" },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 min-h-screen bg-slate-950 text-slate-200">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Legal</span>
          <span className="text-slate-600">/</span>
          <span className="text-cyan-400 font-medium">Terms &amp; Conditions</span>
        </nav>

        {/* Hero Section */}
        <header className="relative text-center sm:text-left pb-10 sm:pb-12 border-b border-slate-800/80">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-5">
            <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Master Engineering &amp; Services Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Terms &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Conditions
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            These Terms &amp; Conditions govern all software development, artificial intelligence architectures, cloud infrastructure
            deployments, and technical consultations executed by VyomAI Technologies Inc. and VyomAI Solutions Pvt. Ltd.
          </p>

          {/* Metadata badges */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Effective Date: {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Standard Contract: {version}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              Enterprise MSA &amp; SOW Framework
            </span>
          </div>
        </header>

        {/* 4 Key Pillars Grid */}
        <section aria-labelledby="key-pillars-title" className="py-10">
          <h2 id="key-pillars-title" className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Core Commercial Terms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900/70 border border-cyan-500/15 hover:border-cyan-500/35 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all" />
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Content Layout: Quick Jump Navigation + Terms Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
          {/* Quick Jump Sidebar */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-28 p-5 rounded-xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                Table of Contents
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block py-1 px-2 rounded hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-slate-800">
                <p className="text-xs text-slate-400 mb-2.5">Require an executed Master Services Agreement (MSA)?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Legal Contracts Desk
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Terms Body */}
          <article className="lg:col-span-8 order-1 lg:order-2 space-y-10 text-slate-300 text-sm leading-relaxed">
            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">01.</span> Acceptance of Terms &amp; Hierarchy
              </h2>
              <p className="mb-3">
                By entering into an agreement with VyomAI, executing a Statement of Work (&ldquo;SOW&rdquo;), signing a Master Services
                Agreement (&ldquo;MSA&rdquo;), or utilizing our bespoke digital platforms, you agree to be legally bound by these terms.
              </p>
              <p>
                In the event of any conflict between these general website terms and a mutually executed SOW or bilateral MSA,
                the executed bilateral agreement shall supersede and govern to the extent of the conflict.
              </p>
            </section>

            {/* Section 2 */}
            <section id="services-sow" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">02.</span> Services &amp; Statements of Work (SOW)
              </h2>
              <p className="mb-3">
                All engineering deliverables are executed pursuant to written SOWs outlining:
              </p>
              <ul className="space-y-2 pl-4 list-disc marker:text-cyan-400">
                <li>Detailed technical architecture, tech stack specifications, and deliverable descriptions.</li>
                <li>Agile sprint milestones, estimated delivery schedules, and verification protocols.</li>
                <li>Clear acceptance criteria and client sign-off procedures (standard 10 business days verification window).</li>
                <li>Change-request mechanisms for out-of-scope architectural expansions.</li>
              </ul>
            </section>

            {/* Section 3: Intellectual Property */}
            <section id="ip-rights" className="scroll-mt-28">
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-blue-950/30 border border-cyan-500/30 shadow-lg shadow-cyan-950/30">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      03. Intellectual Property &amp; Ownership
                    </h2>
                    <p className="text-xs text-cyan-300 font-mono mt-0.5">
                      Work-Made-For-Hire Guarantee
                    </p>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed mb-3">
                  VyomAI operates on a clean, pro-client intellectual property ownership model:
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Client Deliverable Ownership:</strong> Upon full and final settlement of agreed milestone invoices, all right, title, and interest in custom code, trained models, visual assets, and database schemas are assigned to the Client.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Pre-Existing VyomAI Frameworks:</strong> General reusable utilities, boilerplate scaffolding, or internal CI/CD toolsets remain VyomAI property, licensed to Client on a perpetual, royalty-free, non-exclusive basis.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Open-Source Compliance:</strong> All third-party libraries incorporated into deliverables are verified against restrictive licenses (e.g. GPL viral restrictions) to protect client commercial distribution.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="client-obligations" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">04.</span> Client Responsibilities
              </h2>
              <p className="mb-3">
                To enable successful sprint execution and adherence to delivery timelines, the Client agrees to:
              </p>
              <ul className="space-y-2 pl-4 list-disc marker:text-cyan-400">
                <li>Appoint an authorized Technical Lead or Product Owner with decision-making authority.</li>
                <li>Provide timely access to staging environments, third-party APIs, credentials, and test datasets.</li>
                <li>Review and provide written acceptance or detailed defect feedback within the specified review period.</li>
                <li>Warrant that all materials, datasets, and intellectual property supplied to VyomAI do not infringe third-party rights.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="payment-terms" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">05.</span> Invoicing, Fees &amp; Payments
              </h2>
              <p className="mb-3">
                Engagements are structured under milestone-based payments, monthly retainers, or dedicated time-and-materials (T&amp;M) models:
              </p>
              <ul className="space-y-2 pl-4 list-disc marker:text-cyan-400">
                <li><strong>Payment Windows:</strong> Invoices are payable within 15 business days (Net-15) of invoice date, unless otherwise specified in an SOW.</li>
                <li><strong>Currency &amp; Wire:</strong> Invoices are denominated in USD ($) or INR (₹) and settled via electronic wire transfer, ACH, or SWIFT.</li>
                <li><strong>Taxes:</strong> Fees are exclusive of applicable Goods &amp; Services Tax (GST) or statutory withholding taxes, which shall be remitted in compliance with legal mandates.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="confidentiality" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">06.</span> Confidentiality &amp; Non-Disclosure
              </h2>
              <p className="mb-3">
                Both parties agree to hold all non-public technical information, system architectures, customer databases, and commercial
                terms in strict confidence for a period of not less than five (5) years from disclosure date.
              </p>
              <p>
                VyomAI engineers are subject to strict employment confidentiality covenants, code review isolation, and background vetting.
              </p>
            </section>

            {/* Section 7 */}
            <section id="ai-disclaimers" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">07.</span> AI Systems &amp; Model Determinism
              </h2>
              <p className="mb-3">
                Modern artificial intelligence systems, Large Language Models (LLMs), and neural networks are probabilistic by nature.
                While VyomAI incorporates rigorous safety guardrails, Retrieval-Augmented Generation (RAG) truthfulness benchmarks,
                and validation tests:
              </p>
              <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                <p>
                  &bull; AI outputs should be validated with appropriate human-in-the-loop oversight in safety-critical, medical, or legal applications.
                </p>
                <p>
                  &bull; Client is responsible for ensuring end-user terms of service accurately convey the generative nature of customer-facing AI agents.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="warranties-sla" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">08.</span> Warranties &amp; SLA Standards
              </h2>
              <p className="mb-3">
                VyomAI warrants that all custom deliverables will perform substantially in accordance with the documented specifications
                in the applicable SOW for a period of <strong>ninety (90) calendar days</strong> following production handover acceptance.
              </p>
              <p>
                During the warranty window, any verified functional deviations or software bugs will be remediated at no additional charge.
              </p>
            </section>

            {/* Section 9 */}
            <section id="liability" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">09.</span> Limitation of Liability
              </h2>
              <p className="mb-3">
                To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, consequential,
                special, or punitive damages (including loss of profits, goodwill, or operational interruption).
              </p>
              <p>
                Except for breaches of confidentiality or gross negligence, VyomAI&apos;s aggregate liability under any engagement shall not
                exceed the total fees actually paid by the Client to VyomAI under the specific SOW during the twelve (12) months preceding the claim.
              </p>
            </section>

            {/* Section 10 */}
            <section id="termination" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">10.</span> Term, Cancellation &amp; Handover
              </h2>
              <p className="mb-3">
                Either party may terminate an SOW for material breach upon thirty (30) days prior written notice, if such breach remains uncured.
                Upon termination, VyomAI will immediately package and deliver all completed code, repositories, and documentation, and the Client
                shall settle payment for all completed milestone deliverables up to the termination date.
              </p>
            </section>

            {/* Section 11 */}
            <section id="governing-law" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">11.</span> Governing Law &amp; Dispute Resolution
              </h2>
              <p className="mb-3">
                These Terms shall be governed by and construed in accordance with the laws of India. Any controversy or dispute arising out
                of or relating to this agreement shall be settled through binding arbitration administered in Greater Noida / Ghaziabad,
                Uttar Pradesh, India under the Arbitration and Conciliation Act, 1996.
              </p>
            </section>

            {/* Section 12 */}
            <section id="contact-legal" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">12.</span> Contact Legal Department
              </h2>
              <p className="mb-4">
                For contract inquiries, notices, or bespoke enterprise master services agreement review:
              </p>
              <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/25 space-y-2">
                <p className="text-white font-semibold">VyomAI Legal &amp; Contracts Division</p>
                <p className="text-xs text-slate-300">VyomAI Solutions Pvt. Ltd. &bull; Greater Noida, Ghaziabad, Uttar Pradesh 201009, India</p>
                <p className="text-xs text-slate-300">
                  Legal Counsel Email:{" "}
                  <a href="mailto:legal@vyomaisolutions.com" className="text-cyan-400 hover:underline">
                    legal@vyomaisolutions.com
                  </a>{" "}
                  /{" "}
                  <a href="mailto:info@vyomaisolutions.com" className="text-cyan-400 hover:underline">
                    info@vyomaisolutions.com
                  </a>
                </p>
                <p className="text-xs text-slate-400">Corporate Identity: VyomAI Technologies Inc. &amp; VyomAI Solutions Pvt. Ltd.</p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
