export interface ValueItem {
  title: string;
  description: string;
  iconName: string;
}

export interface AdvantageItem {
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export const companyHighlights = [
  {
    label: "Innovative AI Solutions",
    subtext: "Proprietary models & autonomous agent systems",
    metric: "99.8%",
    metricLabel: "Model Accuracy",
    iconName: "Sparkles",
  },
  {
    label: "Experienced Engineering Team",
    subtext: "Senior architects, researchers & full-stack specialists",
    metric: "12+ Yrs",
    metricLabel: "Average Core Experience",
    iconName: "Users",
  },
  {
    label: "Scalable Cloud Architecture",
    subtext: "Fault-tolerant Kubernetes & microservice design",
    metric: "99.999%",
    metricLabel: "Uptime SLA",
    iconName: "Shield",
  },
  {
    label: "Client-Focused Agility",
    subtext: "Rapid iterative bi-weekly sprint delivery cycles",
    metric: "2.5x",
    metricLabel: "Faster Time-to-Market",
    iconName: "Zap",
  },
];

export const whyChooseUsItems: AdvantageItem[] = [
  {
    title: "AI-First Thinking",
    description: "We don't merely tack on AI as an afterthought. We architect intelligent systems from the ground up with optimized inference loops and data pipelines.",
    badge: "Core Philosophy",
    iconName: "BrainCircuit",
  },
  {
    title: "Tailored Enterprise Solutions",
    description: "Every organization has unique constraints and workflows. We never rely on generic off-the-shelf templates; our software is bespoke to your operational DNA.",
    badge: "Custom Architecture",
    iconName: "Code2",
  },
  {
    title: "Scalable High-Throughput Architecture",
    description: "Engineered from day one to handle millions of requests, streaming real-time websockets, and petabyte-scale data stores without performance degradation.",
    badge: "Infinite Scale",
    iconName: "Layers",
  },
  {
    title: "Security & Compliance Focused",
    description: "End-to-end encryption, strict role-based access controls (RBAC), and built-in adherence to SOC 2, HIPAA, and GDPR standards across all environments.",
    badge: "Enterprise Security",
    iconName: "ShieldCheck",
  },
  {
    title: "Agile Sprint Delivery",
    description: "Transparent bi-weekly release cycles, real-time staging previews, continuous automated testing, and direct Slack/Discord collaboration channels.",
    badge: "Sprint Velocity",
    iconName: "Rocket",
  },
  {
    title: "Long-Term Technical Support",
    description: "We stay with you long after deployment. Our site reliability engineers and ML researchers ensure models don't drift and systems stay patched and lightning fast.",
    badge: "24/7 SRE Support",
    iconName: "Headphones",
  },
];

export const companyInfo = {
  name: "VyomAI",
  tagline: "Engineering the Future with AI",
  description: "VyomAI is a premier Software Development and Artificial Intelligence engineering studio. We design, architect, and deploy intelligent enterprise systems, generative AI solutions, and high-performance cloud platforms for visionary businesses worldwide.",
  mission: "To empower visionary organizations with state-of-the-art cognitive AI and resilient software engineering, turning complex computational challenges into seamless competitive advantages.",
  vision: "To pioneer the next frontier of human-AI collaboration where intelligent systems augment human creativity, automate mundane complexity, and accelerate progress toward an equitable, innovative future.",
  contact: {
    email: "info@vyomaisolutions.com",
    phone: "+91 9598360224",
    alternatePhone: "+91 8853468637",
    address: "JFFH+G2F, Grand Trunk Rd, near Bisrakh Mod Police Chowki, Lal Kuan, Greater Noida, Ghaziabad, Uttar Pradesh 201009",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=JFFH%2BG2F%2C+Grand+Trunk+Rd%2C+near+Bisrakh+Mod+Police+Chowki%2C+Lal+Kuan%2C+Greater+Noida%2C+Ghaziabad%2C+Uttar+Pradesh+201009",
    locations: [
      {
        city: "Greater Noida / Ghaziabad",
        country: "India",
        address: "JFFH+G2F, Grand Trunk Rd, near Bisrakh Mod Police Chowki, Lal Kuan, Greater Noida, Ghaziabad, Uttar Pradesh 201009",
      },
    ],
  },
};
