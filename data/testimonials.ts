export interface Testimonial {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  company: string;
  avatarInitials?: string;
  quote: string;
  rating: number;
  metric: string;
  isSample?: boolean;
  active?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const sampleTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Elena Rostova",
    role: "Chief Technology Officer",
    company: "Apex Healthcare AI (Sample Client)",
    avatarInitials: "ER",
    quote: "VyomAI delivered our multimodal diagnostic model ahead of schedule. Their attention to model validation, HIPAA compliance, and responsive Next.js frontend is unmatched in the industry.",
    rating: 5,
    metric: "3.8x Accelerated Diagnostics",
    isSample: true,
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    role: "VP of Engineering",
    company: "FinVertex Capital (Sample Client)",
    avatarInitials: "MV",
    quote: "The autonomous algorithmic engine VyomAI architected handles over $1B in daily transaction flows with zero downtime. Their engineers understand both deep ML math and enterprise reliability.",
    rating: 5,
    metric: "99.999% Fault Tolerance",
    isSample: true,
  },
  {
    id: "test-3",
    name: "Sophia Sterling",
    role: "Head of Product",
    company: "OmniLogix Global (Sample Client)",
    avatarInitials: "SS",
    quote: "From day one, the VyomAI team felt like an extension of our core team. The UI/UX is breathtaking and our internal operators love the intuitive agent workflow dashboards.",
    rating: 5,
    metric: "85% Manual Hours Saved",
    isSample: true,
  },
  {
    id: "test-4",
    name: "David Kim",
    role: "Chief Digital Officer",
    company: "AeroDynamics Tech (Sample Client)",
    avatarInitials: "DK",
    quote: "Migrating our core legacy systems to Kubernetes with real-time vector search was daunting until VyomAI stepped in. Clean code, zero regressions, and outstanding engineering rigor.",
    rating: 5,
    metric: "45% Cloud Infrastructure Savings",
    isSample: true,
  },
];
