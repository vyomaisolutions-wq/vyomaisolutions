import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Lock,
  Cpu,
  Eye,
  FileCheck2,
  Database,
  Globe2,
  Server,
  ArrowRight,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
} from "lucide-react";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";
import { companyInfo } from "@/data/company";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const seo = await getPageSeoFromDb("privacy-policy");
  return constructMetadata({
    metaTitle: seo.metaTitle || "Privacy & Policy — VyomAI | Enterprise Data Governance",
    metaDescription:
      seo.metaDescription ||
      "Learn how VyomAI collects, uses, and safeguards enterprise data, proprietary AI model weights, customer telemetry, and personal information.",
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/privacy-policy",
  });
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 18, 2026";
  const version = "v3.2.0 (Enterprise)";

  const keyGuarantees = [
    {
      icon: Cpu,
      title: "Zero Model Training on Client Data",
      description:
        "Your proprietary datasets, codebases, prompts, and embeddings are strictly isolated and NEVER used to train or fine-tune public foundation models.",
    },
    {
      icon: Lock,
      title: "AES-256 & TLS 1.3 Encryption",
      description:
        "All data at rest is encrypted via AES-256 with Hardware Security Module (HSM) keys. Data in transit is protected via modern TLS 1.3 ciphers.",
    },
    {
      icon: Shield,
      title: "Zero Trust Architecture",
      description:
        "Strict role-based access control (RBAC), biometric MFA, ephemeral SSH sessions, and continuous audit trails for engineering access.",
    },
    {
      icon: Globe2,
      title: "Global Compliance Ready",
      description:
        "Full adherence to EU GDPR, UK GDPR, California CCPA/CPRA, and India Digital Personal Data Protection Act (DPDP 2023).",
    },
  ];

  const sections = [
    { id: "scope", title: "1. Scope & Introduction" },
    { id: "collection", title: "2. Information We Collect" },
    { id: "ai-safeguards", title: "3. Proprietary AI Model Safeguards" },
    { id: "processing", title: "4. How We Process & Use Data" },
    { id: "storage-security", title: "5. Storage, Retention & Security" },
    { id: "sharing-processors", title: "6. Third-Party Sub-Processors" },
    { id: "data-rights", title: "7. Your Statutory Rights" },
    { id: "cookies", title: "8. Cookies & Telemetry Tracking" },
    { id: "international-transfers", title: "9. Cross-Border Transfers" },
    { id: "contact-dpo", title: "10. Contact Privacy Officer" },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 min-h-screen bg-slate-950 text-slate-200">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full" />
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
          <span className="text-cyan-400 font-medium">Privacy &amp; Policy</span>
        </nav>

        {/* Hero Section */}
        <header className="relative text-center sm:text-left pb-10 sm:pb-12 border-b border-slate-800/80">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-5">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Enterprise Privacy &amp; Data Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Privacy &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Data Policy
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            VyomAI Technologies Inc. and VyomAI Solutions Pvt. Ltd. (&ldquo;VyomAI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
            are committed to maintaining uncompromising standards of confidentiality, data integrity, and ethical AI governance.
            This document outlines how we process, store, and defend enterprise client assets and personal information.
          </p>

          {/* Metadata badges */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Effective Date: {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
              <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
              Document: {version}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              SOC 2 Type II &amp; ISO 27001 Aligned
            </span>
          </div>
        </header>

        {/* 4 Key Guarantees Grid */}
        <section aria-labelledby="key-guarantees-title" className="py-10">
          <h2 id="key-guarantees-title" className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Core Privacy Commitments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyGuarantees.map((item, idx) => {
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

        {/* Content Layout: Quick Jump Navigation + Policy Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
          {/* Quick Jump Sidebar */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-28 p-5 rounded-xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                <Database className="w-3.5 h-3.5" />
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
                <p className="text-xs text-slate-400 mb-2.5">Need a signed Data Processing Addendum (DPA)?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Request Enterprise DPA
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Policy Body */}
          <article className="lg:col-span-8 order-1 lg:order-2 space-y-10 text-slate-300 text-sm leading-relaxed">
            {/* Section 1 */}
            <section id="scope" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">01.</span> Scope &amp; Introduction
              </h2>
              <p className="mb-3">
                This Privacy &amp; Data Policy applies to all services, web applications, APIs, bespoke machine learning platforms,
                and technical consulting provided by VyomAI Technologies Inc. and VyomAI Solutions Pvt. Ltd. (collectively, &ldquo;VyomAI&rdquo;).
              </p>
              <p>
                When you visit our public portal (<code className="text-cyan-300">vyomai.com</code>), submit inquiries, engage our engineering
                teams for custom AI development, or access our deployed customer VPC systems, this policy governs the collection, processing,
                storage, and defense of all related data assets.
              </p>
            </section>

            {/* Section 2 */}
            <section id="collection" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">02.</span> Information We Collect
              </h2>
              <p className="mb-3">
                We categorize the data collected into three primary streams to ensure explicit clarity:
              </p>
              <ul className="space-y-3 pl-4 list-disc marker:text-cyan-400">
                <li>
                  <strong className="text-white">Direct Client Inquiries &amp; Account Information:</strong> Full name, professional email address,
                  telephone number, organization name, project scope documentation, and technical requirements submitted via our discovery forms.
                </li>
                <li>
                  <strong className="text-white">Engineering Deliverable Data:</strong> Repository schemas, architectural specifications, test datasets,
                  and environment configurations explicitly provided by enterprise clients under mutual non-disclosure agreements (NDAs) for project execution.
                </li>
                <li>
                  <strong className="text-white">Automated Telemetry &amp; System Logs:</strong> Anonymized HTTP request headers, IP address (hashed),
                  browser client identity, timestamped interaction metrics, and page latency logs utilized for infrastructure defense and DDoS mitigation.
                </li>
              </ul>
            </section>

            {/* Section 3: AI Model Safeguards */}
            <section id="ai-safeguards" className="scroll-mt-28">
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-blue-950/30 border border-cyan-500/30 shadow-lg shadow-cyan-950/30">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      03. Strict AI Model Training Safeguards
                    </h2>
                    <p className="text-xs text-cyan-300 font-mono mt-0.5">
                      Binding Contractual Guarantee
                    </p>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed mb-3">
                  At VyomAI, we recognize that our clients&apos; data, proprietary algorithms, and enterprise domain knowledge constitute
                  their greatest competitive moat. We maintain an unequivocal, non-negotiable architectural policy:
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>No Public Model Fine-Tuning:</strong> Client datasets, prompts, embeddings, and API inputs are NEVER used to train, retrain, or improve foundational open-weights models or shared AI infrastructure.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Dedicated VPC Deployment:</strong> All generative AI pipelines, vector stores, and neural networks are deployed within client-isolated virtual private clouds (VPC) with zero cross-tenant contamination.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Ephemeral Context Windows:</strong> In-flight LLM inferences utilize ephemeral memory spaces that are zeroed immediately upon response generation and socket closure.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="processing" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">04.</span> How We Process &amp; Use Data
              </h2>
              <p className="mb-3">
                VyomAI processes client and personal data solely under legitimate, well-defined legal grounds:
              </p>
              <ul className="space-y-2 pl-4 list-disc marker:text-cyan-400">
                <li>To execute custom software engineering contracts, AI model architectures, and cloud deployments.</li>
                <li>To provide continuous technical support, bug remediation, and SLA-backed infrastructure maintenance.</li>
                <li>To generate transparent project milestone estimates, architecture proposals, and billing schedules.</li>
                <li>To maintain cybersecurity defenses, prevent malicious bot attacks, and protect client intellectual property.</li>
                <li>To fulfill statutory legal compliance requirements, tax filings, and international regulatory filings.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="storage-security" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">05.</span> Storage, Retention &amp; Security Standards
              </h2>
              <p className="mb-3">
                VyomAI implements comprehensive technical and organizational safeguards across all software lifecycle tiers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-cyan-400 mb-1">Encryption at Rest</h4>
                  <p className="text-xs text-slate-300">FIPS 140-2 validated AES-256 cryptographic algorithms with annual key rotation via AWS KMS and HashiCorp Vault.</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-cyan-400 mb-1">Encryption in Transit</h4>
                  <p className="text-xs text-slate-300">Mandatory TLS 1.3 encryption across all API gateways, edge reverse proxies, and internal microservice mesh.</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-cyan-400 mb-1">Access Governance</h4>
                  <p className="text-xs text-slate-300">Zero Trust Network Architecture (ZTNA), mandatory hardware MFA keys, and audit logging retained in WORM storage.</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-cyan-400 mb-1">Data Retention &amp; Purge</h4>
                  <p className="text-xs text-slate-300">Inactive project test data is cryptographically shredded within 30 calendar days following client handover acceptance.</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="sharing-processors" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">06.</span> Third-Party Sub-Processors
              </h2>
              <p className="mb-3">
                We never sell, rent, or monetize your personal or enterprise information to data brokers or third parties.
                We partner exclusively with enterprise-grade cloud providers subject to strict Data Processing Agreements:
              </p>
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-300 uppercase font-mono">
                    <tr>
                      <th className="p-3">Provider</th>
                      <th className="p-3">Function</th>
                      <th className="p-3">Data Center Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-3 font-medium text-white">Amazon Web Services (AWS)</td>
                      <td className="p-3">VPC Cloud Compute, Model Inference, Object Storage</td>
                      <td className="p-3">US-East, EU-Central (Frankfurt), AP-South (Mumbai)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Microsoft Azure</td>
                      <td className="p-3">Enterprise Cloud Hosting &amp; Private OpenAI Instances</td>
                      <td className="p-3">North Europe, West US, Central India</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">MongoDB Atlas</td>
                      <td className="p-3">Encrypted Application Database &amp; Vector Search</td>
                      <td className="p-3">Multi-Region Enterprise Clustered</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 7 */}
            <section id="data-rights" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">07.</span> Your Statutory Rights
              </h2>
              <p className="mb-3">
                Regardless of your geographic location, VyomAI grants you robust control over your personal data:
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                  <span className="text-cyan-400 font-mono text-xs mt-0.5">01</span>
                  <div>
                    <h4 className="text-white font-semibold text-xs">Right to Access &amp; Portability</h4>
                    <p className="text-xs text-slate-400">Request a complete JSON/CSV export of all personal information we maintain regarding your account.</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                  <span className="text-cyan-400 font-mono text-xs mt-0.5">02</span>
                  <div>
                    <h4 className="text-white font-semibold text-xs">Right to Rectification &amp; Correction</h4>
                    <p className="text-xs text-slate-400">Update inaccurate or incomplete records promptly upon notifying our privacy operations desk.</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                  <span className="text-cyan-400 font-mono text-xs mt-0.5">03</span>
                  <div>
                    <h4 className="text-white font-semibold text-xs">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;)</h4>
                    <p className="text-xs text-slate-400">Request complete cryptographic deletion of all personal records, subject only to statutory tax retention duties.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="cookies" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">08.</span> Cookies &amp; Telemetry Tracking
              </h2>
              <p className="mb-3">
                We maintain a minimal cookie policy. We only set cookies strictly necessary for site authentication, dark/light theme state,
                and session continuity. We do not employ third-party cross-site advertising pixels or surveillance trackers.
              </p>
            </section>

            {/* Section 9 */}
            <section id="international-transfers" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">09.</span> Cross-Border Data Transfers
              </h2>
              <p className="mb-3">
                For international clients located in the European Economic Area (EEA), the United Kingdom, or Switzerland, all data transfers
                are executed pursuant to the European Commission&apos;s Standard Contractual Clauses (SCCs) (Module 1 Controller-to-Controller
                and Module 2 Controller-to-Processor), guaranteeing equivalent data protection levels.
              </p>
            </section>

            {/* Section 10 */}
            <section id="contact-dpo" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">10.</span> Contact Privacy Officer &amp; DPO
              </h2>
              <p className="mb-4">
                To exercise your privacy rights, file a Data Subject Access Request (DSAR), or inquire about enterprise DPA execution,
                please connect with our Data Protection Officer:
              </p>
              <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/25 space-y-2">
                <p className="text-white font-semibold">VyomAI Privacy Office &amp; Data Protection Officer</p>
                <p className="text-xs text-slate-300">VyomAI Solutions Pvt. Ltd. &bull; Greater Noida, Ghaziabad, Uttar Pradesh 201009, India</p>
                <p className="text-xs text-slate-300">
                  Official Email:{" "}
                  <a href="mailto:privacy@vyomaisolutions.com" className="text-cyan-400 hover:underline">
                    privacy@vyomaisolutions.com
                  </a>{" "}
                  /{" "}
                  <a href="mailto:info@vyomaisolutions.com" className="text-cyan-400 hover:underline">
                    info@vyomaisolutions.com
                  </a>
                </p>
                <p className="text-xs text-slate-400">Response Window: We acknowledge all privacy inquiries within 48 business hours.</p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
