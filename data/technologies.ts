export interface TechItem {
  name: string;
  description: string;
  category: "Frontend" | "Backend" | "AI & Machine Learning" | "Databases" | "Cloud & DevOps";
  badge: string;
}

export const techStackCategories = [
  "All",
  "AI & Machine Learning",
  "Frontend",
  "Backend",
  "Databases",
  "Cloud & DevOps",
] as const;

export const technologyStack: TechItem[] = [
  // AI & ML
  {
    name: "PyTorch",
    description: "Deep learning model development and tensor computing",
    category: "AI & Machine Learning",
    badge: "Core Framework",
  },
  {
    name: "OpenAI & Anthropic APIs",
    description: "State-of-the-art foundation models and reasoning engines",
    category: "AI & Machine Learning",
    badge: "LLM Provider",
  },
  {
    name: "LangChain & LlamaIndex",
    description: "Agent orchestration and enterprise RAG architectures",
    category: "AI & Machine Learning",
    badge: "Agentic Framework",
  },
  {
    name: "Hugging Face",
    description: "Open-source model fine-tuning and transformers hub",
    category: "AI & Machine Learning",
    badge: "Model Hub",
  },
  {
    name: "vLLM & TensorRT-LLM",
    description: "High-throughput, low-latency model inference servers",
    category: "AI & Machine Learning",
    badge: "Inference Engine",
  },

  // Frontend
  {
    name: "Next.js 16 (App Router)",
    description: "Hybrid server-rendered React framework with partial pre-rendering",
    category: "Frontend",
    badge: "Framework",
  },
  {
    name: "React 19",
    description: "Declarative component-driven user interface architecture",
    category: "Frontend",
    badge: "UI Library",
  },
  {
    name: "TypeScript",
    description: "Strict compile-time type safety across all layers",
    category: "Frontend",
    badge: "Type Safety",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first design system with custom brand tokens",
    category: "Frontend",
    badge: "Design System",
  },
  {
    name: "Framer Motion",
    description: "Physics-based declarative animations and gesture tracking",
    category: "Frontend",
    badge: "Motion",
  },

  // Backend
  {
    name: "Python (FastAPI)",
    description: "Asynchronous microservices tailored for ML workloads",
    category: "Backend",
    badge: "Async Engine",
  },
  {
    name: "Go (Golang)",
    description: "Ultra-high concurrency microservices and system tools",
    category: "Backend",
    badge: "High Performance",
  },
  {
    name: "Node.js & Fastify",
    description: "Event-driven runtime for low-latency web sockets and APIs",
    category: "Backend",
    badge: "Runtime",
  },
  {
    name: "gRPC & Protocol Buffers",
    description: "Ultra-fast binary serialization across internal services",
    category: "Backend",
    badge: "RPC Protocol",
  },
  {
    name: "Apache Kafka",
    description: "Distributed fault-tolerant streaming and event queues",
    category: "Backend",
    badge: "Event Broker",
  },

  // Databases
  {
    name: "PostgreSQL & pgvector",
    description: "ACID transactional relational data and embedded vector search",
    category: "Databases",
    badge: "Relational + Vector",
  },
  {
    name: "Pinecone & Milvus",
    description: "Dedicated enterprise vector databases for billion-scale embeddings",
    category: "Databases",
    badge: "Vector Store",
  },
  {
    name: "Redis Enterprise",
    description: "Sub-millisecond in-memory cache and session management",
    category: "Databases",
    badge: "In-Memory",
  },
  {
    name: "ClickHouse",
    description: "Columnar OLAP database for real-time analytics dashboards",
    category: "Databases",
    badge: "Analytics DB",
  },

  // Cloud & DevOps
  {
    name: "Kubernetes (K8s)",
    description: "Automated container deployment, scaling, and self-healing",
    category: "Cloud & DevOps",
    badge: "Orchestration",
  },
  {
    name: "Amazon Web Services (AWS)",
    description: "Enterprise multi-region cloud infrastructure & GPU compute",
    category: "Cloud & DevOps",
    badge: "Cloud Provider",
  },
  {
    name: "Google Cloud Platform (GCP)",
    description: "Vertex AI, BigQuery, and specialized TPU clusters",
    category: "Cloud & DevOps",
    badge: "AI Cloud",
  },
  {
    name: "Terraform & OpenTofu",
    description: "Declarative Infrastructure as Code (IaC) governance",
    category: "Cloud & DevOps",
    badge: "Infrastructure",
  },
  {
    name: "Docker & Containerd",
    description: "Standardized lightweight containerization packaging",
    category: "Cloud & DevOps",
    badge: "Containers",
  },
];
