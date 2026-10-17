export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Strategy",
    subtitle: "Aligning Business Goals with Technical Feasibility",
    description: "We conduct deep architectural interviews, audit existing data infrastructure, define measurable KPIs, and establish high-impact AI/software milestones.",
    deliverables: ["Technical Architecture Roadmap", "Data Readiness Audit", "ROI & Feasibility Report"],
    iconName: "SearchCode",
  },
  {
    step: "02",
    title: "Planning & UI/UX Design",
    subtitle: "Architecting Intuitive Systems & Fluid Prototypes",
    description: "Our product designers build interactive wireframes, establish the design system tokens, and map out human-AI interaction journeys before writing code.",
    deliverables: ["Interactive High-Fi Prototypes", "Design System Tokens", "System Flow Specifications"],
    iconName: "Layers",
  },
  {
    step: "03",
    title: "Development & AI Integration",
    subtitle: "Agile Sprints with Continuous Code Reviews",
    description: "Engineers implement robust microservices, train or fine-tune neural models, integrate vector databases, and construct high-performance frontends.",
    deliverables: ["Bi-Weekly Deployable Sprints", "Clean Modular Codebase", "Model Training Checkpoints"],
    iconName: "Code",
  },
  {
    step: "04",
    title: "Testing & Quality Assurance",
    subtitle: "Rigorous Security, Load, and Precision Audits",
    description: "Every module undergoes unit, integration, and end-to-end regression testing. AI pipelines are benchmarked for hallucination boundaries and latency bounds.",
    deliverables: ["Automated Test Suites (>90% coverage)", "Penetration & Security Report", "Model Accuracy Verification"],
    iconName: "ShieldCheck",
  },
  {
    step: "05",
    title: "Cloud Deployment & CI/CD",
    subtitle: "Zero-Downtime Multi-Region Releases",
    description: "We orchestrate Kubernetes clusters, provision immutable cloud infrastructure via Terraform, and configure automated GitOps CI/CD delivery pipelines.",
    deliverables: ["Multi-Region Cloud Deployment", "Automated CI/CD Pipelines", "Real-Time Telemetry Dashboards"],
    iconName: "Rocket",
  },
  {
    step: "06",
    title: "Maintenance & Optimization",
    subtitle: "Continuous Learning & SRE Support",
    description: "Post-launch, our Site Reliability Engineers monitor SLAs 24/7, while our data scientists continuously fine-tune models against real-world production drift.",
    deliverables: ["24/7 SLA Uptime Guarantee", "Automated Model Drift Retraining", "Quarterly Architecture Upgrades"],
    iconName: "Cpu",
  },
];
