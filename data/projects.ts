export interface Project {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  category: "AI & ML" | "Web & Cloud" | "Enterprise Systems" | "Mobile";
  clientIndustry: string;
  description: string;
  results: string;
  technologies: string[];
  gradient?: string;
  accentColor?: string;
  sampleBadge?: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  keywords?: string[];
}

export const portfolioProjects: Project[] = [
  {
    id: "neuro-finance",
    title: "NeuroFinance Autonomous Algorithmic Suite",
    category: "AI & ML",
    clientIndustry: "Quantitative FinTech",
    description: "High-frequency market sentiment analysis and predictive asset pricing engine powered by transformer models and microsecond event streaming.",
    results: "99.8% Prediction Accuracy • $1.2B+ Daily Processed Volume",
    technologies: ["PyTorch", "Rust", "FastAPI", "Apache Kafka", "Redis"],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentColor: "#00f0ff",
    sampleBadge: "Showcase Case Study (Sample Client)",
  },
  {
    id: "synapse-health",
    title: "Synapse Health Multimodal Diagnostic AI",
    category: "AI & ML",
    clientIndustry: "Healthcare & MedTech",
    description: "FDA-compliant radiological scan analysis engine with zero-shot segmentation and automated doctor summarization via private HIPAA-grade LLMs.",
    results: "3.8x Faster Diagnosis • 99.2% Sensitivity Rate",
    technologies: ["PyTorch", "Next.js", "Docker", "HIPAA Cloud", "Python"],
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    accentColor: "#38bdf8",
    sampleBadge: "Showcase Case Study (Sample Client)",
  },
  {
    id: "aerologix-cloud",
    title: "AeroLogix Autonomous Global Logistics Hub",
    category: "Enterprise Systems",
    clientIndustry: "Supply Chain & Aerospace",
    description: "Dynamic route optimization and predictive maintenance platform controlling thousands of interconnected autonomous transit units in real time.",
    results: "34% Fuel Efficiency Lift • 99.999% Fault Resilience",
    technologies: ["Go", "Kubernetes", "GraphQL", "PostgreSQL", "Google Cloud"],
    gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
    accentColor: "#0284c7",
    sampleBadge: "Showcase Case Study (Sample Client)",
  },
  {
    id: "pulsecloud-platform",
    title: "PulseCloud Multi-Cluster Kubernetes Fabric",
    category: "Web & Cloud",
    clientIndustry: "Cloud Infrastructure",
    description: "Self-healing microservice orchestration console offering live telemetry, anomaly auto-remediation, and centralized secret management across hybrid clouds.",
    results: "68% Faster Incident Remediation • Zero Data Loss",
    technologies: ["Next.js", "TypeScript", "Terraform", "AWS", "Prometheus"],
    gradient: "from-cyan-400/20 via-blue-500/10 to-transparent",
    accentColor: "#22d3ee",
    sampleBadge: "Showcase Case Study (Sample Client)",
  },
  {
    id: "omnistore-ar",
    title: "OmniStore Spatial Commerce & AI Recommendation",
    category: "Mobile",
    clientIndustry: "Retail & Spatial Tech",
    description: "Immersive mobile shopping experience integrating on-device spatial AR viewing with vector-powered real-time contextual recommendation agents.",
    results: "4.9★ App Rating • 48% Increase in Checkout Conversion",
    technologies: ["React Native", "Swift", "CoreML", "Pinecone", "Stripe"],
    gradient: "from-sky-600/20 via-cyan-500/10 to-transparent",
    accentColor: "#0ea5e9",
    sampleBadge: "Showcase Case Study (Sample Client)",
  },
  {
    id: "veritas-gov",
    title: "Veritas AI Compliance & Document Extraction",
    category: "Enterprise Systems",
    clientIndustry: "Legal & Regulatory Tech",
    description: "Automated regulatory contract compliance auditor capable of parsing 50,000+ legal pages per hour with citation lineage and audit transparency.",
    results: "85% Reduction in Review Cost • 100% Audit Traceability",
    technologies: ["Python", "LangChain", "vLLM", "PostgreSQL", "Next.js"],
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accentColor: "#3b82f6",
    sampleBadge: "Showcase Case Study (Sample Client)",
  },
];
