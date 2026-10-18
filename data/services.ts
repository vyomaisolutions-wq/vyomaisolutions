export interface Service {
  id: string;
  slug?: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image?: string;
  iconName: string;
  features: string[];
  technologies: string[];
  metrics: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  keywords?: string[];
}

export const servicesData: Service[] = [
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    shortDesc: "Custom neural network architectures, predictive analytics, and computer vision models.",
    fullDesc: "We design and deploy proprietary machine learning pipelines that process complex multimodal data, detect anomalies, predict future trends, and deliver actionable intelligence to enterprise decision-makers.",
    iconName: "Brain",
    features: [
      "Custom Neural Network Architecture",
      "Predictive Analytics & Forecasting",
      "Computer Vision & Pattern Recognition",
      "Model Training, Validation & Quantization"
    ],
    technologies: ["PyTorch", "TensorFlow", "Scikit-Learn", "ONNX", "CUDA"],
    metrics: "99.4% Model Precision Across Production Pipelines"
  },
  {
    id: "gen-ai",
    title: "Generative AI & LLM Integration",
    shortDesc: "Enterprise Retrieval-Augmented Generation (RAG), fine-tuned LLMs, and autonomous agents.",
    fullDesc: "Transform enterprise operations by deploying private, compliant generative AI systems. From custom agent swarms to domain-specific fine-tuned models, we build secure architectures that augment human capability.",
    iconName: "Sparkles",
    features: [
      "Domain-Specific LLM Fine-Tuning",
      "Enterprise RAG & Hybrid Vector Search",
      "Autonomous Multi-Agent Workflows",
      "Strict Guardrails & Prompt Optimization"
    ],
    technologies: ["OpenAI API", "LangChain", "LlamaIndex", "vLLM", "Pinecone"],
    metrics: "10x Acceleration in Document & Knowledge Retrieval"
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    shortDesc: "Mission-critical enterprise software engineered for fault tolerance, velocity, and scale.",
    fullDesc: "We architect and build tailored software solutions that solve non-trivial business challenges. Our systems are engineered using domain-driven design, clean architecture, and rigorous automated testing.",
    iconName: "Code2",
    features: [
      "Microservices & Event-Driven Systems",
      "Enterprise API Gateways & Protocols",
      "Legacy Core Modernization",
      "High-Concurrency Transaction Engines"
    ],
    technologies: ["TypeScript", "Go", "Python", "gRPC", "Apache Kafka"],
    metrics: "99.999% Service Availability SLA"
  },
  {
    id: "web-dev",
    title: "Web Application Development",
    shortDesc: "Blazing-fast, responsive web platforms built on modern Next.js and distributed edge runtimes.",
    fullDesc: "We create captivating digital web experiences combining top-tier performance, sub-second latency, and fluid interaction design. Every interface is optimized for conversion, SEO, and accessibility.",
    iconName: "Globe",
    features: [
      "Next.js App Router & Server Components",
      "Real-Time Collaborative WebSockets",
      "Progressive Web Apps (PWA)",
      "Edge Caching & Dynamic SSR Optimization"
    ],
    technologies: ["Next.js", "React 19", "Tailwind CSS", "GraphQL", "WebSockets"],
    metrics: "Sub-100ms Global First Contentful Paint"
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    shortDesc: "Fluid native iOS and Android apps with offline synchronization and AI edge inference.",
    fullDesc: "From consumer-facing mobile products to secure workforce tools, we craft mobile experiences that feel instantaneous, natural, and rock-solid across all device form factors.",
    iconName: "Smartphone",
    features: [
      "Cross-Platform Flutter & React Native",
      "Native iOS (Swift) & Android (Kotlin)",
      "On-Device Machine Learning (CoreML & TFLite)",
      "Offline-First Data Sync Protocols"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "SQLite"],
    metrics: "4.9★ Average App Store Customer Rating"
  },
  {
    id: "cloud-devops",
    title: "Cloud Computing & DevOps",
    shortDesc: "Automated Kubernetes orchestration, multi-cloud resilience, and GitOps CI/CD pipelines.",
    fullDesc: "Accelerate your development lifecycle with zero-downtime deployment pipelines, infrastructure as code, automated autoscaling clusters, and rigorous enterprise cloud security frameworks.",
    iconName: "CloudCog",
    features: [
      "Kubernetes & Container Orchestration",
      "Infrastructure as Code (Terraform)",
      "Automated GitOps CI/CD Delivery",
      "Cost Optimization & FinOps Governance"
    ],
    technologies: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
    metrics: "45% Cloud Infrastructure Cost Reduction"
  },
  {
    id: "ui-ux",
    title: "UI/UX Design & Design Systems",
    shortDesc: "Human-centered digital interfaces, component libraries, and futuristic aesthetic systems.",
    fullDesc: "We bridge complex technological capabilities with intuitive, delightful human interfaces. Our design process combines cognitive psychology, user research, wireframing, and pixel-perfect design systems.",
    iconName: "Palette",
    features: [
      "End-to-End User Experience Research",
      "High-Fidelity Interactive Prototypes",
      "Multi-Brand Accessible Design Systems",
      "Micro-Interaction & Motion Design"
    ],
    technologies: ["Figma", "Design Tokens", "Storybook", "Tailwind CSS", "Framer"],
    metrics: "3.2x User Engagement & Retention Lift"
  },
  {
    id: "automation",
    title: "Business Process Automation",
    shortDesc: "Intelligent RPA bots, automated data extractors, and cognitive workflow integration.",
    fullDesc: "Eliminate repetitive manual bottlenecks across your organization. Our intelligent automation combines computer vision, document parsing, and API webhooks to automate critical business operations.",
    iconName: "Cpu",
    features: [
      "Cognitive Document Processing (IDP)",
      "Robotic Process Automation (RPA)",
      "Webhook & Multi-Platform Event Sync",
      "Real-Time SLA & Audit Logging"
    ],
    technologies: ["Python", "Temporal", "Celery", "Zapier APIs", "OCR Engines"],
    metrics: "85% Reduction in Manual Processing Hours"
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing & AI Growth Strategy",
    shortDesc: "Data-backed SEO engineering, programmatic performance marketing, and predictive conversion optimization.",
    fullDesc: "We merge cutting-edge search engine intelligence, programmatic ad bidding algorithms, and autonomous content optimization to drive predictable, high-value enterprise acquisition. Our growth engineers build custom tracking architectures and conversion funnels that maximize lifetime client value.",
    iconName: "TrendingUp",
    features: [
      "Algorithmic SEO & Semantic Search Dominance",
      "Programmatic Multi-Channel Performance Ads (PPC)",
      "Predictive Conversion Rate Optimization (CRO)",
      "Automated Marketing Analytics & Attribution Pipelines"
    ],
    technologies: ["Google Analytics 4", "Semrush", "Meta Ads API", "Google Ads API", "BigQuery", "HubSpot"],
    metrics: "4.2x Average Return on Ad Spend (ROAS) & Organic Traffic Lift",
    metaTitle: "Digital Marketing & AI-Driven Growth Strategy | VyomAI",
    metaDescription: "Enterprise SEO engineering, programmatic PPC campaigns, conversion rate optimization, and automated attribution pipelines designed for hyper-growth companies.",
    metaImage: "/images/hero-wave.jpg",
    keywords: ["Digital Marketing", "AI Marketing", "SEO Strategy", "Programmatic PPC", "Conversion Rate Optimization", "Growth Engineering"]
  }
];
