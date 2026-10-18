import { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Server,
  Mail,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Database,
} from "lucide-react";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const seo = await getPageSeoFromDb("gdpr");
  return constructMetadata({
    metaTitle: seo.metaTitle || "GDPR Compliance & Data Rights Portal — VyomAI",
    metaDescription:
      seo.metaDescription ||
      "Learn how VyomAI complies with EU General Data Protection Regulation (GDPR), manages data subject requests, data processing agreements, and cloud sovereignty.",
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/gdpr",
  });
}

export default function GDPRPage() {
  const lastUpdated = "October 18, 2026";
  const regulationRef = "Regulation (EU) 2016/679";

  const gdprPillars = [
    {
      icon: Server,
      title: "EU Sovereign Cloud Deployments",
      description:
        "Full support for dedicated European Union isolated cloud regions (AWS Frankfurt/Ireland, Azure Western Europe) with zero cross-border replication.",
    },
    {
      icon: UserCheck,
      title: "Standard Contractual Clauses (SCCs)",
      description:
        "All cross-border data flows are shielded under the 2021 European Commission Standard Contractual Clauses (Controller-to-Processor Module).",
    },
    {
      icon: ShieldCheck,
      title: "DPA & Sub-Processor Transparency",
      description:
        "Pre-executed Data Processing Addendums (DPAs) available for all enterprise clients with comprehensive sub-processor change notifications.",
    },
    {
      icon: ShieldAlert,
      title: "72-Hour Breach Notification",
      description:
        "Mandatory computer security incident response protocols ensuring supervisory authority and data controller notification within 72 hours under Art. 33.",
    },
  ];

  const gdprRights = [
    {
      article: "Article 15",
      title: "Right of Access",
      description:
        "You have the right to obtain confirmation from VyomAI as to whether personal data concerning you is being processed and receive a structured copy.",
    },
    {
      article: "Article 16",
      title: "Right to Rectification",
      description:
        "You have the right to request the rectification of inaccurate personal data or completion of incomplete personal information.",
    },
    {
      article: "Article 17",
      title: "Right to Erasure ('Forgotten')",
      description:
        "You have the right to request cryptographic deletion of your personal data when no longer necessary for original processing purposes.",
    },
    {
      article: "Article 18",
      title: "Right to Restriction",
      description:
        "You have the right to request limitation of data processing while accuracy disputes or legitimate interest evaluations are pending.",
    },
    {
      article: "Article 20",
      title: "Right to Data Portability",
      description:
        "You have the right to receive your personal data in a structured, commonly used, and machine-readable format (JSON/CSV).",
    },
    {
      article: "Article 21",
      title: "Right to Object",
      description:
        "You have the right to object at any time to processing of personal data concerning you based on legitimate interests or direct communications.",
    },
    {
      article: "Article 22",
      title: "Automated Decision-Making & AI",
      description:
        "You have the right not to be subject to a decision based solely on automated processing or AI profiling producing legal effects without human oversight.",
    },
  ];

  const sections = [
    { id: "overview", title: "1. GDPR Commitment Overview" },
    { id: "controller-processor", title: "2. Controller vs. Processor Roles" },
    { id: "legal-basis", title: "3. Lawful Basis for Processing" },
    { id: "data-rights", title: "4. Data Subject Rights (Art. 15-22)" },
    { id: "ai-governance", title: "5. AI Ethics & Algorithmic Transparency" },
    { id: "sccs-transfers", title: "6. International Transfers & SCCs" },
    { id: "sub-processors", title: "7. Approved Sub-Processors" },
    { id: "dsar-procedure", title: "8. Filing a DSAR Request" },
    { id: "breach-protocol", title: "9. 72-Hour Breach Protocol" },
    { id: "dpo-contact", title: "10. Data Protection Officer" },
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
          <span className="text-cyan-400 font-medium">GDPR Compliance</span>
        </nav>

        {/* Hero Section */}
        <header className="relative text-center sm:text-left pb-10 sm:pb-12 border-b border-slate-800/80">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-5">
            <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>European Union Regulation (EU) 2016/679</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            GDPR Compliance &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Data Rights
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            VyomAI Technologies Inc. and VyomAI Solutions Pvt. Ltd. operate with strict adherence to the General Data Protection
            Regulation (GDPR). We ensure high-tier data sovereignty, ethical AI pipelines, and seamless facilitation of all European
            Union data subject entitlements.
          </p>

          {/* Metadata badges */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Effective Date: {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Regulation: {regulationRef}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              DPA Ready &amp; DPO Appointed
            </span>
          </div>
        </header>

        {/* 4 Pillars Grid */}
        <section aria-labelledby="gdpr-pillars-title" className="py-10">
          <h2 id="gdpr-pillars-title" className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            GDPR Architecture Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gdprPillars.map((item, idx) => {
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

        {/* Content Layout: Quick Jump Sidebar + GDPR Content */}
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
                <p className="text-xs text-slate-400 mb-2.5">Exercise your GDPR rights or submit a DSAR:</p>
                <a
                  href="mailto:dpo@vyomaisolutions.com?subject=GDPR%20Data%20Subject%20Access%20Request%20(DSAR)"
                  className="inline-flex items-center justify-center w-full gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Submit DSAR to DPO
                </a>
              </div>
            </div>
          </aside>

          {/* Main GDPR Body */}
          <article className="lg:col-span-8 order-1 lg:order-2 space-y-10 text-slate-300 text-sm leading-relaxed">
            {/* Section 1 */}
            <section id="overview" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">01.</span> GDPR Commitment Overview
              </h2>
              <p className="mb-3">
                The General Data Protection Regulation (Regulation (EU) 2016/679) sets the benchmark for individual privacy and data sovereignty.
                VyomAI adheres to all seven core principles articulated in Article 5:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <strong className="text-white block mb-0.5">&bull; Lawfulness, Fairness &amp; Transparency</strong>
                  <span className="text-slate-400">Processing with explicit lawful basis and zero dark patterns.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <strong className="text-white block mb-0.5">&bull; Purpose Limitation</strong>
                  <span className="text-slate-400">Data is collected only for specified, legitimate technical purposes.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <strong className="text-white block mb-0.5">&bull; Data Minimisation</strong>
                  <span className="text-slate-400">Only data strictly necessary for engineering milestones is collected.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <strong className="text-white block mb-0.5">&bull; Accuracy &amp; Storage Limitation</strong>
                  <span className="text-slate-400">Continuous hygiene and prompt deletion once project cycles conclude.</span>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="controller-processor" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">02.</span> Controller vs. Processor Roles
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    VyomAI as Data Controller
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When you browse our website (<code className="text-cyan-300">vyomai.com</code>), submit discovery inquiries, subscribe
                    to our research newsletters, or apply for engineering vacancies, VyomAI acts as the <strong>Data Controller</strong>.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    VyomAI as Data Processor
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When enterprise clients engage VyomAI to build bespoke AI systems, configure client VPC databases, or architect data
                    pipelines, the Client acts as the Data Controller and VyomAI acts as the <strong>Data Processor</strong> under a binding
                    Article 28 Data Processing Addendum (DPA).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="legal-basis" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">03.</span> Lawful Basis for Processing
              </h2>
              <p className="mb-3">
                Under Article 6 of the GDPR, VyomAI relies on the following lawful bases:
              </p>
              <ul className="space-y-2 pl-4 list-disc marker:text-cyan-400 text-xs sm:text-sm">
                <li><strong className="text-white">Contractual Necessity (Art. 6(1)(b)):</strong> To execute engineering statements of work, deliver software milestones, and provide SLA-backed maintenance.</li>
                <li><strong className="text-white">Explicit Consent (Art. 6(1)(a)):</strong> For research publication subscriptions and discovery inquiries.</li>
                <li><strong className="text-white">Legitimate Interests (Art. 6(1)(f)):</strong> For cybersecurity telemetry, DDoS prevention, and safeguarding infrastructure resilience.</li>
                <li><strong className="text-white">Legal Obligations (Art. 6(1)(c)):</strong> To fulfill statutory corporate and taxation requirements.</li>
              </ul>
            </section>

            {/* Section 4: Data Subject Rights */}
            <section id="data-rights" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">04.</span> Data Subject Rights (Articles 15–22)
              </h2>
              <p className="mb-4">
                As an EU/EEA data subject, you hold statutory rights under Chapter III of the GDPR. We guarantee prompt execution
                without undue delay and at the latest within one month of receipt:
              </p>
              <div className="space-y-3">
                {gdprRights.map((r, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/90 flex flex-col sm:flex-row sm:items-start gap-2.5">
                    <span className="text-cyan-400 font-mono text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/20 shrink-0 self-start">
                      {r.article}
                    </span>
                    <div>
                      <h3 className="text-white font-semibold text-xs sm:text-sm mb-0.5">{r.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{r.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: AI Ethics & Algorithmic Transparency */}
            <section id="ai-governance" className="scroll-mt-28">
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-blue-950/30 border border-cyan-500/30 shadow-lg shadow-cyan-950/30">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      05. AI Ethics &amp; Algorithmic Transparency (Art. 22)
                    </h2>
                    <p className="text-xs text-cyan-300 font-mono mt-0.5">
                      EU AI Act &amp; GDPR Harmonization
                    </p>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed mb-3">
                  VyomAI designs cognitive AI platforms that comply with Article 22 GDPR restrictions on purely automated decision-making:
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Human-in-the-Loop (HITL):</strong> Enterprise workflows impacting individual credit, employment, or rights require explicit human verification gates.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Explainable AI (XAI):</strong> Model architectures incorporate attention weights inspection, SHAP/LIME explainability, and prompt reasoning logs.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Secret Profiling:</strong> We never generate behavioral marketing profiles or sell inferential telemetry to advertising networks.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="sccs-transfers" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">06.</span> International Transfers &amp; Standard Contractual Clauses (SCCs)
              </h2>
              <p className="mb-3">
                Where personal data is transferred outside the European Economic Area (EEA), VyomAI implements:
              </p>
              <ul className="space-y-2 pl-4 list-disc marker:text-cyan-400 text-xs sm:text-sm">
                <li>The European Commission&apos;s Standard Contractual Clauses (SCCs) adopted under Implementing Decision (EU) 2021/914.</li>
                <li>Transfer Impact Assessments (TIAs) evaluating local legal regimes against European standards.</li>
                <li>Supplementary technical measures, including end-to-end encryption with client-held encryption keys (BYOK).</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="sub-processors" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">07.</span> Approved Sub-Processors
              </h2>
              <p className="mb-3">
                Under Article 28(2), VyomAI maintains a strict vetting protocol for all infrastructure vendors. Enterprise clients
                receive at least thirty (30) days prior notification before onboarding new sub-processors.
              </p>
            </section>

            {/* Section 8 */}
            <section id="dsar-procedure" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">08.</span> How to File a Data Subject Access Request (DSAR)
              </h2>
              <p className="mb-3">
                To submit an access, erasure, or portability request under GDPR, email our Data Protection Office at{" "}
                <a href="mailto:dpo@vyomaisolutions.com" className="text-cyan-400 hover:underline">
                  dpo@vyomaisolutions.com
                </a>
                . Please include:
              </p>
              <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <p>&bull; Your full legal name and email address associated with your account or inquiry.</p>
                <p>&bull; The specific GDPR right you wish to exercise (e.g. Article 17 Erasure, Article 15 Access).</p>
                <p>&bull; Proof of identity (we will verify your identity via secure challenge before releasing records).</p>
                <p>&bull; We will respond and provide a verifiable resolution within 30 calendar days at zero cost.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="breach-protocol" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">09.</span> 72-Hour Breach Notification Protocol
              </h2>
              <p className="mb-3">
                In the unlikely event of a personal data security incident, VyomAI activates an emergency response protocol pursuant
                to Article 33. We notify relevant Supervisory Authorities and affected Data Controllers without undue delay and within
                <strong> 72 hours</strong> of becoming aware of the breach.
              </p>
            </section>

            {/* Section 10 */}
            <section id="dpo-contact" className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-cyan-400 font-mono text-sm">10.</span> Data Protection Officer &amp; EU Inquiries
              </h2>
              <p className="mb-4">
                Our designated Data Protection Officer coordinates all compliance operations and DSAR fulfillment:
              </p>
              <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/25 space-y-2">
                <p className="text-white font-semibold">VyomAI Data Protection Officer (DPO)</p>
                <p className="text-xs text-slate-300">VyomAI Solutions Pvt. Ltd. &bull; Greater Noida, Ghaziabad, Uttar Pradesh 201009, India</p>
                <p className="text-xs text-slate-300">
                  Direct DPO Email:{" "}
                  <a href="mailto:dpo@vyomaisolutions.com" className="text-cyan-400 hover:underline">
                    dpo@vyomaisolutions.com
                  </a>{" "}
                  /{" "}
                  <a href="mailto:privacy@vyomaisolutions.com" className="text-cyan-400 hover:underline">
                    privacy@vyomaisolutions.com
                  </a>
                </p>
                <p className="text-xs text-slate-400">
                  Supervisory Authority Recourse: EU residents also possess the statutory right to lodge a complaint with their local
                  Data Protection Authority (DPA) in their member state of habitual residence.
                </p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
