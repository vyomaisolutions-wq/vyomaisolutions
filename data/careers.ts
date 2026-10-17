export interface JobOpening {
  id: string;
  slug: string;
  title: string;
  department: "AI Research & Systems" | "Distributed Systems" | "Full-Stack Engineering" | "Product Design" | "MLOps & Security";
  location: string;
  type: "Full-Time" | "Contract / Research Fellow";
  experience: string;
  compensation: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
  featured?: boolean;
}

export interface CulturePillar {
  title: string;
  description: string;
  iconName: string;
}

export interface PerkItem {
  title: string;
  description: string;
  iconName: string;
}

export const culturePillars: CulturePillar[] = [
  {
    title: "Deep Work & Zero Bureaucracy",
    description: "No pointless status meetings or corporate theatre. We measure velocity by working code, benchmarked models, and architectural elegance.",
    iconName: "Zap",
  },
  {
    title: "Mission-Critical Standards",
    description: "We don't ship fragile wrappers. Every algorithm and infrastructure pipeline is built with deterministic verification, formal testing, and zero hallucination tolerances.",
    iconName: "ShieldCheck",
  },
  {
    title: "Direct GPU Compute Access",
    description: "Researchers and engineers have dedicated access to enterprise H100 and A100 GPU clusters with zero red tape to train, fine-tune, and benchmark novel architectures.",
    iconName: "Cpu",
  },
  {
    title: "High Engineering Density",
    description: "Work shoulder-to-shoulder with top-tier practitioners who hold deep domain mastery across neural networks, kernel programming, and distributed systems.",
    iconName: "Code2",
  },
];

export const perksList: PerkItem[] = [
  {
    title: "Competitive Pay & Equity",
    description: "Top 5% market compensation packages coupled with generous early-stage equity grants and performance bonuses.",
    iconName: "Award",
  },
  {
    title: "100% Remote-First Autonomy",
    description: "Work from anywhere on Earth with flexible asynchronous hours that optimize for your personal peak flow state.",
    iconName: "Globe",
  },
  {
    title: "Workstation & Home Lab Grant",
    description: "$4,000 setup budget for Apple Silicon or RTX workstations, 4K monitors, ergonomic chairs, and edge hardware.",
    iconName: "Laptop",
  },
  {
    title: "Comprehensive Health & Wellness",
    description: "Premium global medical, dental, and vision insurance for you and your dependents, plus mental wellness stipends.",
    iconName: "HeartPulse",
  },
  {
    title: "Learning & Conference Grants",
    description: "$3,000 annual budget to attend NeurIPS, ICML, CVPR, and PyData, plus full book and course reimbursements.",
    iconName: "BookOpen",
  },
  {
    title: "Annual Global Team Retreats",
    description: "Twice-yearly fully paid retreats in inspiring global destinations to collaborate, hack on wild ideas, and recharge.",
    iconName: "Compass",
  },
];

export const jobOpenings: JobOpening[] = [
  {
    id: "principal-ai-architect",
    slug: "principal-ai-architect",
    title: "Principal AI / LLM Systems Architect",
    department: "AI Research & Systems",
    location: "Remote (Global) / Bangalore",
    type: "Full-Time",
    experience: "7+ Years",
    compensation: "$150,000 – $220,000 + Top-Tier Equity",
    description: "Lead the design and implementation of private enterprise generative AI fabrics, hybrid vector-graph retrieval architectures (GraphRAG), and deterministic multi-agent swarms.",
    responsibilities: [
      "Architect multi-tenant RAG pipelines and private foundation model serving clusters using vLLM and TensorRT-LLM.",
      "Design formal guardrail engines that enforce schema validation, semantic validation, and hallucination bounds.",
      "Collaborate directly with enterprise client CTOs and engineering directors on deep architectural discovery.",
      "Mentor senior machine learning engineers and drive state-of-the-art model quantization (AWQ, FP8) benchmarks.",
    ],
    requirements: [
      "Extensive experience building production ML/LLM systems processing high QPS with strict latency bounds.",
      "Deep proficiency in PyTorch, CUDA, vLLM, LangChain/LlamaIndex, Triton Inference Server, and vector databases.",
      "Strong background in distributed computing, model fine-tuning (LoRA, QLoRA), and deterministic validation.",
      "Mastery of modern software architecture, microservices, gRPC, and cloud-native Kubernetes.",
    ],
    tags: ["LLMs", "vLLM", "PyTorch", "GraphRAG", "TensorRT", "Kubernetes"],
    featured: true,
  },
  {
    id: "senior-computer-vision-engineer",
    slug: "senior-computer-vision-engineer",
    title: "Senior Computer Vision & Edge AI Engineer",
    department: "AI Research & Systems",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "5+ Years",
    compensation: "$130,000 – $180,000 + Equity",
    description: "Develop low-latency edge vision pipelines, multimodal transformers, and real-time object tracking algorithms for autonomous robotics and industrial manufacturing.",
    responsibilities: [
      "Train, quantize, and deploy real-time vision models on edge compute hardware (NVIDIA Jetson, Hailo, Apple Neural Engine).",
      "Engineer multimodal anomaly detection systems combining high-speed camera streams and telemetry data.",
      "Optimize model inference via TensorRT, OpenVINO, and ONNX Runtime to achieve sub-10ms frame latencies.",
      "Build automated synthetic data generation pipelines using diffusion models and 3D rendering engines.",
    ],
    requirements: [
      "Solid mathematical foundation in computer vision, linear algebra, and deep learning architectures (YOLO, DETR, ViT).",
      "Hands-on expertise with OpenCV, PyTorch, C++, TensorRT, and edge hardware deployment.",
      "Experience with camera calibration, multi-camera sensor fusion, and spatial coordinate transformation.",
    ],
    tags: ["Computer Vision", "TensorRT", "Edge AI", "OpenCV", "C++", "PyTorch"],
    featured: true,
  },
  {
    id: "lead-mlops-distributed-engineer",
    slug: "lead-mlops-distributed-engineer",
    title: "Lead Distributed Cloud & MLOps Engineer",
    department: "MLOps & Security",
    location: "Remote (Global) / Hybrid",
    type: "Full-Time",
    experience: "5+ Years",
    compensation: "$135,000 – $185,000 + Equity",
    description: "Engineer hyper-scalable GPU clusters, automated model retraining pipelines, and air-gapped zero-data-retention infrastructure across hybrid enterprise environments.",
    responsibilities: [
      "Architect and operate high-availability Kubernetes clusters tailored for distributed GPU inference and multi-node training.",
      "Implement automated CI/CD pipelines for model validation, drift detection, load testing, and canary deployments.",
      "Design air-gapped VPC architectures satisfying SOC2 Type II, HIPAA, and ISO 27001 enterprise compliance.",
      "Build real-time Prometheus/Grafana telemetry tracking GPU memory bandwidth, token throughput, and latency percentiles.",
    ],
    requirements: [
      "Deep expertise in Kubernetes (K8s), Helm, Terraform, Ray, Slurm, and cloud providers (AWS, GCP, Azure, CoreWeave).",
      "Production experience managing GPU drivers, CUDA toolkits, NCCL interconnects, and NVLink networks.",
      "Strong automation skills in Python, Go, and Shell scripting with strict infrastructure-as-code discipline.",
    ],
    tags: ["Kubernetes", "Ray", "Terraform", "MLOps", "Go", "AWS/GCP"],
    featured: true,
  },
  {
    id: "senior-fullstack-ai-engineer",
    slug: "senior-fullstack-ai-engineer",
    title: "Senior Full-Stack AI Engineer",
    department: "Full-Stack Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "4+ Years",
    compensation: "$120,000 – $165,000 + Equity",
    description: "Craft ultra-responsive, real-time AI user experiences, agent orchestration dashboards, and collaborative web platforms powered by Next.js, WebSockets, and distributed APIs.",
    responsibilities: [
      "Build interactive generative AI workspaces featuring live token streaming, vector canvas graphs, and real-time diffing.",
      "Develop high-throughput REST and gRPC API gateways connecting web applications with distributed inference clusters.",
      "Design modular, responsive component systems using TailwindCSS, Framer Motion, and TypeScript.",
      "Optimize frontend bundle sizes, memory leaks, and WebGL/Canvas rendering performance.",
    ],
    requirements: [
      "Exceptional proficiency in TypeScript, React, Next.js (App Router), Node.js, and modern state management.",
      "Familiarity with streaming protocols (SSE, WebSockets), vector database clients, and AI SDKs.",
      "Meticulous eye for micro-interactions, accessibility (WCAG), and premium aesthetics.",
    ],
    tags: ["Next.js", "TypeScript", "React", "WebSockets", "Node.js", "TailwindCSS"],
    featured: false,
  },
  {
    id: "lead-ai-product-designer",
    slug: "lead-ai-product-designer",
    title: "Lead AI Product & UI/UX Designer",
    department: "Product Design",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "5+ Years",
    compensation: "$115,000 – $160,000 + Equity",
    description: "Redefine human-AI interaction paradigms. Design intuitive mental models, multimodal canvases, and cosmic aesthetic systems for enterprise intelligence applications.",
    responsibilities: [
      "Architect end-to-end design systems and interactive prototypes for high-complexity AI products.",
      "Invent novel UX patterns for model reasoning transparency, latency masking, and human-in-the-loop verification.",
      "Conduct in-depth user research with enterprise technical leads, data scientists, and business executives.",
      "Partner closely with frontend engineers to ensure 100% pixel-perfect fidelity and smooth 60fps animations.",
    ],
    requirements: [
      "A stunning portfolio showcasing complex B2B SaaS, developer tooling, or AI product design.",
      "Expertise in Figma, component design systems, prototyping, typography, and motion design.",
      "Deep curiosity about applied AI, cognitive ergonomics, and information density.",
    ],
    tags: ["Figma", "UI/UX", "Design Systems", "Prototyping", "Interaction Design"],
    featured: false,
  },
  {
    id: "ai-safety-researcher",
    slug: "ai-safety-researcher",
    title: "AI Safety & Deterministic Verification Researcher",
    department: "AI Research & Systems",
    location: "Remote (Global) / Hybrid",
    type: "Full-Time",
    experience: "3+ Years",
    compensation: "$130,000 – $175,000 + Equity",
    description: "Pioneer algorithmic techniques for adversarial robustness, automated red-teaming, and provable safety verification over autonomous multi-agent environments.",
    responsibilities: [
      "Develop algorithmic red-teaming suites to expose prompt injection, jailbreaks, and indirect data contamination.",
      "Design formal specification languages and runtime verifiers that intercept and halt out-of-distribution model actions.",
      "Publish peer-reviewed research papers and open-source benchmark datasets on AI robustness.",
      "Work with enterprise compliance teams to translate regulatory mandates (EU AI Act, NIST) into automated validation code.",
    ],
    requirements: [
      "MS or PhD in Computer Science, Mathematics, or equivalent research track record in AI alignment/robustness.",
      "Strong programming skills in Python and PyTorch with mathematical rigor in statistics and probability.",
      "Demonstrated publications or open-source contributions in trustworthy ML or algorithmic fairness.",
    ],
    tags: ["AI Safety", "Red Teaming", "Formal Methods", "PyTorch", "Research"],
    featured: false,
  },
];
