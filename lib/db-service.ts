import { connectToDatabase, isDbConnected } from "./mongodb";
import { Blog, IBlog } from "@/models/Blog";
import { Project, IProject } from "@/models/Project";
import { Service, IService } from "@/models/Service";
import { Contact, IContact } from "@/models/Contact";
import { CareerApplication, ICareerApplication } from "@/models/CareerApplication";
import { Job, IJob } from "@/models/Job";
import { PageSeo, IPageSeo } from "@/models/PageSeo";
import { BlogPost } from "@/data/blog";
import { Project as StaticProject } from "@/data/projects";
import { Service as StaticService } from "@/data/services";
import { jobOpenings, JobOpening } from "@/data/careers";

// In-memory fallback stores for offline/dev operation without MongoDB (starts completely empty)
const inMemoryContacts: Array<{
  _id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  details: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  createdAt: string;
}> = [];

const inMemoryCareerApplications: Array<{
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  experienceYears?: string;
  portfolioUrl?: string;
  resumeFileName?: string;
  pitch?: string;
  status: "new" | "reviewed" | "shortlisted" | "contacted" | "rejected";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}> = [];

// In-memory overrides if DB is offline but admin creates data (starts completely empty)
let inMemoryBlogs: BlogPost[] = [];
let inMemoryProjects: StaticProject[] = [];
let inMemoryServices: StaticService[] = [];
let inMemoryJobs: JobOpening[] = [...jobOpenings];

// ==================== BLOG SERVICE ====================
export async function getBlogsFromDb(query: { category?: string; search?: string } = {}) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const filter: Record<string, unknown> = { isPublished: true };
      if (query.category && query.category !== "All") {
        filter.category = query.category;
      }
      if (query.search) {
        filter.$or = [
          { title: { $regex: query.search, $options: "i" } },
          { excerpt: { $regex: query.search, $options: "i" } },
        ];
      }
      const blogs = await Blog.find(filter).sort({ createdAt: -1 }).lean();
      return { data: blogs, source: "mongodb" };
    } catch (err) {
      console.warn("[DbService] Error fetching blogs from MongoDB:", err);
    }
  }

  // Fallback to in-memory data
  let filtered = [...inMemoryBlogs];
  if (query.category && query.category !== "All") {
    filtered = filtered.filter((b) => b.category === query.category);
  }
  if (query.search) {
    const s = query.search.toLowerCase();
    filtered = filtered.filter(
      (b) => b.title.toLowerCase().includes(s) || b.excerpt.toLowerCase().includes(s)
    );
  }
  return { data: filtered, source: "fallback" };
}

export async function deleteBlogFromDb(idOrSlug: string) {
  const decoded = decodeURIComponent(idOrSlug).trim();

  // Remove from in-memory fallback
  inMemoryBlogs = inMemoryBlogs.filter(
    (b) =>
      b.slug !== decoded &&
      b.id !== decoded &&
      (b as unknown as { _id?: string })._id !== decoded
  );

  const conn = await connectToDatabase();
  if (conn) {
    try {
      const orConditions: Array<Record<string, unknown>> = [
        { slug: decoded },
        { slug: decoded.toLowerCase() },
      ];
      if (/^[0-9a-fA-F]{24}$/.test(decoded)) {
        orConditions.unshift({ _id: decoded });
      }
      const deleted = await Blog.findOneAndDelete({ $or: orConditions });
      return { success: true, deleted: !!deleted, source: "mongodb" };
    } catch (err) {
      console.warn("[DbService] Error deleting blog from MongoDB:", err);
    }
  }

  return { success: true, deleted: true, source: "fallback" };
}

export async function getBlogBySlugFromDb(slug: string) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const blog = await Blog.findOne({ slug }).lean();
      if (blog) {
        // Increment views asynchronously
        Blog.updateOne({ slug }, { $inc: { views: 1 } }).exec();
        return { data: blog, source: "mongodb" };
      }
    } catch (err) {
      console.warn("[DbService] Error fetching blog slug:", err);
    }
  }

  const found = inMemoryBlogs.find((b) => b.slug === slug);
  return { data: found || null, source: "fallback" };
}

// ==================== PORTFOLIO SERVICE ====================
export async function getProjectsFromDb(category?: string) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const filter: Record<string, unknown> = {};
      if (category && category !== "All") {
        filter.category = category;
      }
      const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).lean();
      return { data: projects, source: "mongodb" };
    } catch (err) {
      console.warn("[DbService] Error fetching projects from MongoDB:", err);
    }
  }

  let list = [...inMemoryProjects];
  if (category && category !== "All") {
    list = list.filter((p) => p.category === category);
  }
  return { data: list, source: "fallback" };
}

// ==================== SERVICES SERVICE ====================
export async function getServicesFromDb() {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const services = await Service.find({ active: true }).sort({ order: 1 }).lean();
      return { data: services, source: "mongodb" };
    } catch (err) {
      console.warn("[DbService] Error fetching services from MongoDB:", err);
    }
  }

  return { data: inMemoryServices, source: "fallback" };
}

export async function getServiceBySlugFromDb(slug: string) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const service = await Service.findOne({
        $or: [{ slug }, { slug: slug.toLowerCase() }],
      }).lean();
      if (service) {
        return { data: service, source: "mongodb" };
      }
    } catch (err) {
      console.warn("[DbService] Error fetching service by slug:", err);
    }
  }

  const found = inMemoryServices.find((s) => s.id === slug || s.slug === slug);
  return { data: found || null, source: "fallback" };
}

// ==================== CONTACT SERVICE ====================
export async function getContactsFromDb() {
  const conn = await connectToDatabase();
  let mongoContacts: unknown[] = [];
  if (conn) {
    try {
      mongoContacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    } catch (err) {
      console.warn("[DbService] Error fetching contacts from MongoDB:", err);
    }
  }

  // Combine MongoDB contacts with in-memory contacts so inquiries are never lost
  const combined = [...mongoContacts] as Array<{ _id: unknown }>;
  const existingIds = new Set(combined.map((c) => String(c._id)));
  for (const inMem of inMemoryContacts) {
    if (!existingIds.has(String(inMem._id))) {
      combined.push(inMem);
    }
  }

  return { data: combined, source: conn ? "mongodb" : "fallback" };
}

export async function createContactInDb(payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  details?: string;
}) {
  const sanitized = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone ? payload.phone.trim() : "",
    company: payload.company ? payload.company.trim() : "",
    service: payload.service ? payload.service.trim() : "General Technical Consultation",
    budget: payload.budget ? payload.budget.trim() : "Not Specified",
    details: payload.details ? payload.details.trim() : "Technical inquiry submitted via website.",
    status: "new" as const,
  };

  const conn = await connectToDatabase();
  if (conn) {
    try {
      const newContact = await Contact.create(sanitized);
      return { success: true, data: newContact, source: "mongodb" };
    } catch (err) {
      console.error("[DbService] Error inserting contact to MongoDB:", err);
    }
  }

  const fallbackItem = {
    _id: "inmem-" + Date.now(),
    ...sanitized,
    createdAt: new Date().toISOString(),
  };
  inMemoryContacts.unshift(fallbackItem);
  return { success: true, data: fallbackItem, source: "fallback" };
}

// ==================== CAREER APPLICATION SERVICE ====================
export async function getCareerApplicationsFromDb(query: { status?: string; search?: string } = {}) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const filter: Record<string, unknown> = {};
      if (query.status && query.status !== "all" && query.status !== "All") {
        filter.status = query.status.toLowerCase();
      }
      if (query.search) {
        const s = query.search.trim();
        filter.$or = [
          { name: { $regex: s, $options: "i" } },
          { email: { $regex: s, $options: "i" } },
          { role: { $regex: s, $options: "i" } },
          { phone: { $regex: s, $options: "i" } },
        ];
      }
      const applications = await CareerApplication.find(filter).sort({ createdAt: -1 }).lean();
      return { data: applications, source: "mongodb" };
    } catch (err) {
      console.warn("[DbService] Error fetching career applications from MongoDB:", err);
    }
  }

  let list = [...inMemoryCareerApplications];
  if (query.status && query.status !== "all" && query.status !== "All") {
    list = list.filter((a) => a.status === query.status?.toLowerCase());
  }
  if (query.search) {
    const s = query.search.toLowerCase();
    list = list.filter(
      (a) =>
        a.name.toLowerCase().includes(s) ||
        a.email.toLowerCase().includes(s) ||
        a.role.toLowerCase().includes(s)
    );
  }
  return { data: list, source: "fallback" };
}

export async function createCareerApplicationInDb(payload: {
  name: string;
  email: string;
  phone?: string;
  role: string;
  experienceYears?: string;
  portfolioUrl?: string;
  resumeFileName?: string;
  pitch?: string;
}) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const app = await CareerApplication.create({
        ...payload,
        status: "new",
      });
      return { success: true, data: app, source: "mongodb" };
    } catch (err) {
      console.warn("[DbService] Error creating career application in MongoDB:", err);
    }
  }

  const fallbackApp = {
    _id: "inmem-app-" + Date.now(),
    ...payload,
    status: "new" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  inMemoryCareerApplications.unshift(fallbackApp);
  return { success: true, data: fallbackApp, source: "fallback" };
}

export async function updateCareerApplicationStatusInDb(
  id: string,
  status: "new" | "reviewed" | "shortlisted" | "contacted" | "rejected",
  notes?: string
) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const updateData: Record<string, unknown> = { status };
      if (notes !== undefined) updateData.notes = notes;
      const updated = await CareerApplication.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      ).lean();
      return { success: true, data: updated, source: "mongodb" };
    } catch (err) {
      console.warn("[DbService] Error updating career application in MongoDB:", err);
    }
  }

  const item = inMemoryCareerApplications.find((a) => a._id === id);
  if (item) {
    item.status = status;
    if (notes !== undefined) item.notes = notes;
    item.updatedAt = new Date().toISOString();
    return { success: true, data: item, source: "fallback" };
  }
  return { success: false, error: "Application not found" };
}

export async function deleteCareerApplicationFromDb(id: string) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      await CareerApplication.findByIdAndDelete(id);
      return { success: true, source: "mongodb" };
    } catch (err) {
      console.warn("[DbService] Error deleting career application from MongoDB:", err);
    }
  }

  const idx = inMemoryCareerApplications.findIndex((a) => a._id === id);
  if (idx !== -1) {
    inMemoryCareerApplications.splice(idx, 1);
  }
  return { success: true, source: "fallback" };
}

// ==================== CAREER JOB OPENINGS SERVICE ====================
export async function getJobsFromDb(query: { activeOnly?: boolean; department?: string; search?: string } = {}) {
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const filter: Record<string, unknown> = {};
      if (query.activeOnly) {
        filter.active = true;
      }
      if (query.department && query.department !== "All" && query.department !== "all") {
        filter.department = query.department;
      }
      if (query.search) {
        const s = query.search.trim();
        filter.$or = [
          { title: { $regex: s, $options: "i" } },
          { description: { $regex: s, $options: "i" } },
          { tags: { $in: [new RegExp(s, "i")] } },
        ];
      }

      let jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();

      // Seed initial job openings to MongoDB if the collection is empty
      if (jobs.length === 0 && (!query.department || query.department === "All") && !query.search) {
        const totalCount = await Job.countDocuments();
        if (totalCount === 0) {
          const seeded = await Job.insertMany(
            jobOpenings.map((j) => ({
              slug: j.slug || j.id,
              title: j.title,
              department: j.department,
              location: j.location,
              type: j.type,
              experience: j.experience,
              compensation: j.compensation,
              description: j.description,
              responsibilities: j.responsibilities || [],
              requirements: j.requirements || [],
              tags: j.tags || [],
              featured: !!j.featured,
              active: true,
            }))
          );
          jobs = seeded.map((doc) => doc.toObject()) as unknown as typeof jobs;
        }
      }

      return { data: jobs, source: "mongodb" };
    } catch (err) {
      console.warn("[DbService] Error fetching jobs from MongoDB:", err);
    }
  }

  // Fallback to in-memory jobs
  let list = [...inMemoryJobs];
  if (query.activeOnly) {
    list = list.filter((j) => (j as { active?: boolean }).active !== false);
  }
  if (query.department && query.department !== "All" && query.department !== "all") {
    list = list.filter((j) => j.department === query.department);
  }
  if (query.search) {
    const s = query.search.toLowerCase().trim();
    list = list.filter(
      (j) =>
        j.title.toLowerCase().includes(s) ||
        j.description.toLowerCase().includes(s) ||
        (j.tags && j.tags.some((t) => t.toLowerCase().includes(s)))
    );
  }
  return { data: list, source: "fallback" };
}

export async function createJobInDb(payload: {
  title: string;
  slug?: string;
  department: string;
  location?: string;
  type?: string;
  experience?: string;
  compensation?: string;
  description: string;
  responsibilities?: string[] | string;
  requirements?: string[] | string;
  tags?: string[] | string;
  featured?: boolean;
  active?: boolean;
}) {
  const slug = (
    payload.slug ||
    payload.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  ).trim();

  const parseArray = (input?: string[] | string) => {
    if (Array.isArray(input)) return input.map((s) => s.trim()).filter(Boolean);
    if (typeof input === "string") return input.split("\n").map((s) => s.trim()).filter(Boolean);
    return [];
  };

  const parseTags = (input?: string[] | string) => {
    if (Array.isArray(input)) return input.map((s) => s.trim()).filter(Boolean);
    if (typeof input === "string") return input.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);
    return [];
  };

  const jobDoc = {
    slug,
    title: payload.title.trim(),
    department: payload.department.trim(),
    location: payload.location?.trim() || "Remote (Global) / Bangalore",
    type: payload.type?.trim() || "Full-Time",
    experience: payload.experience?.trim() || "3-5 Years",
    compensation: payload.compensation?.trim() || "Competitive Market Rate + Equity",
    description: payload.description.trim(),
    responsibilities: parseArray(payload.responsibilities),
    requirements: parseArray(payload.requirements),
    tags: parseTags(payload.tags),
    featured: payload.featured ?? false,
    active: payload.active ?? true,
  };

  const conn = await connectToDatabase();
  if (conn) {
    try {
      const created = await Job.create(jobDoc);
      return { success: true, data: created, source: "mongodb" };
    } catch (err) {
      console.error("[DbService] Error creating job in MongoDB:", err);
      return { success: false, error: (err as Error).message };
    }
  }

  const fallbackJob = {
    id: slug,
    ...jobDoc,
    _id: "inmem-job-" + Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as unknown as JobOpening;
  inMemoryJobs.unshift(fallbackJob);
  return { success: true, data: fallbackJob, source: "fallback" };
}

export async function updateJobInDb(
  idOrSlug: string,
  payload: Partial<
    JobOpening & {
      responsibilities: string[] | string;
      requirements: string[] | string;
      tags: string[] | string;
      active?: boolean;
      featured?: boolean;
    }
  >
) {
  const decoded = decodeURIComponent(idOrSlug).trim();

  const parseArray = (input?: string[] | string) => {
    if (Array.isArray(input)) return input.map((s) => s.trim()).filter(Boolean);
    if (typeof input === "string") return input.split("\n").map((s) => s.trim()).filter(Boolean);
    return undefined;
  };

  const parseTags = (input?: string[] | string) => {
    if (Array.isArray(input)) return input.map((s) => s.trim()).filter(Boolean);
    if (typeof input === "string") return input.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);
    return undefined;
  };

  const updateFields: Record<string, unknown> = {};
  if (payload.title !== undefined) updateFields.title = payload.title.trim();
  if (payload.slug !== undefined) updateFields.slug = payload.slug.trim().toLowerCase();
  if (payload.department !== undefined) updateFields.department = payload.department.trim();
  if (payload.location !== undefined) updateFields.location = payload.location.trim();
  if (payload.type !== undefined) updateFields.type = payload.type.trim();
  if (payload.experience !== undefined) updateFields.experience = payload.experience.trim();
  if (payload.compensation !== undefined) updateFields.compensation = payload.compensation.trim();
  if (payload.description !== undefined) updateFields.description = payload.description.trim();
  if (payload.responsibilities !== undefined) updateFields.responsibilities = parseArray(payload.responsibilities);
  if (payload.requirements !== undefined) updateFields.requirements = parseArray(payload.requirements);
  if (payload.tags !== undefined) updateFields.tags = parseTags(payload.tags);
  if (payload.featured !== undefined) updateFields.featured = payload.featured;
  if (payload.active !== undefined) updateFields.active = payload.active;

  const conn = await connectToDatabase();
  if (conn) {
    try {
      const orConditions: Array<Record<string, unknown>> = [
        { slug: decoded },
        { slug: decoded.toLowerCase() },
      ];
      if (/^[0-9a-fA-F]{24}$/.test(decoded)) {
        orConditions.push({ _id: decoded });
      }

      const updated = await Job.findOneAndUpdate(
        { $or: orConditions },
        { $set: updateFields },
        { new: true }
      ).lean();

      if (updated) {
        return { success: true, data: updated, source: "mongodb" };
      }
    } catch (err) {
      console.error("[DbService] Error updating job in MongoDB:", err);
      return { success: false, error: (err as Error).message };
    }
  }

  const idx = inMemoryJobs.findIndex(
    (j) =>
      j.slug === decoded ||
      j.id === decoded ||
      (j as unknown as { _id?: string })._id === decoded
  );
  if (idx !== -1) {
    inMemoryJobs[idx] = {
      ...inMemoryJobs[idx],
      ...updateFields,
    } as JobOpening;
    return { success: true, data: inMemoryJobs[idx], source: "fallback" };
  }

  return { success: false, error: "Job opening not found." };
}

export async function deleteJobFromDb(idOrSlug: string) {
  const decoded = decodeURIComponent(idOrSlug).trim();

  // Remove from in-memory fallback
  inMemoryJobs = inMemoryJobs.filter(
    (j) =>
      j.slug !== decoded &&
      j.id !== decoded &&
      (j as unknown as { _id?: string })._id !== decoded
  );

  const conn = await connectToDatabase();
  if (conn) {
    try {
      const orConditions: Array<Record<string, unknown>> = [
        { slug: decoded },
        { slug: decoded.toLowerCase() },
      ];
      if (/^[0-9a-fA-F]{24}$/.test(decoded)) {
        orConditions.push({ _id: decoded });
      }

      await Job.findOneAndDelete({ $or: orConditions });
      return { success: true, source: "mongodb" };
    } catch (err) {
      console.error("[DbService] Error deleting job from MongoDB:", err);
      return { success: false, error: (err as Error).message };
    }
  }

  return { success: true, source: "fallback" };
}

// ==================== SEED DATABASE (DISABLED) ====================
export async function seedDatabase() {
  return {
    success: false,
    message: "Database seeding has been permanently disabled. Please upload records directly in the Admin Panel.",
  };
}

// ==================== PAGE SEO CONFIGURATION ====================
export interface PageSeoConfig {
  pageId: string;
  pageName: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  keywords: string;
  canonicalUrl?: string;
}

export const DEFAULT_PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    pageId: "home",
    pageName: "Home Page",
    metaTitle: "VyomAI — Engineering the Future with AI & Bespoke Software",
    metaDescription: "VyomAI architects high-impact Artificial Intelligence systems, generative AI workflows, and mission-critical software solutions for forward-thinking enterprises worldwide.",
    metaImage: "/images/logo.jpg",
    keywords: "Artificial Intelligence, Machine Learning, Generative AI, Custom Software Development, Cloud Architecture, Next.js Enterprise, VyomAI",
    canonicalUrl: "https://vyomai.com",
  },
  about: {
    pageId: "about",
    pageName: "About Us",
    metaTitle: "About Us — VyomAI | Engineering the Future with AI",
    metaDescription: "Learn about VyomAI's mission, values, research leads, and architectural philosophy driving next-generation AI and custom software solutions.",
    metaImage: "/images/about-hero-bg.jpg",
    keywords: "About VyomAI, AI Leadership, Research Team, Company Mission, Systems Architects, Cognitive Engineering",
    canonicalUrl: "https://vyomai.com/about",
  },
  services: {
    pageId: "services",
    pageName: "Services",
    metaTitle: "Enterprise Architecture & AI Solutions — VyomAI Services",
    metaDescription: "Explore our full spectrum of enterprise capabilities: Neural Networks, LLM Integration, Custom Software, Cloud & DevOps, and Process Automation.",
    metaImage: "/images/services/ai-ml.jpg",
    keywords: "AI Services, Machine Learning Solutions, LLM Engineering, Cloud Computing, Enterprise Software, Full-Stack AI",
    canonicalUrl: "https://vyomai.com/services",
  },
  portfolio: {
    pageId: "portfolio",
    pageName: "Portfolio",
    metaTitle: "Engineering Case Studies & Architectural Breakthroughs — VyomAI",
    metaDescription: "Explore verified case studies and architectural implementations delivering transformative metrics across global enterprises.",
    metaImage: "/images/projects/neuro-finance.jpg",
    keywords: "AI Case Studies, Software Portfolio, Enterprise Client Solutions, Predictive ML Systems, Cloud Infrastructure",
    canonicalUrl: "https://vyomai.com/portfolio",
  },
  blog: {
    pageId: "blog",
    pageName: "Blog & Publications",
    metaTitle: "Research Insights & AI Architecture Papers — VyomAI Insights",
    metaDescription: "In-depth research papers, architectural blueprints, and engineering insights from VyomAI researchers and systems leads.",
    metaImage: "/images/blog/generative-ai-arch.jpg",
    keywords: "AI Research Papers, Technical Articles, Generative AI Architecture, Neural Networks, Systems Engineering",
    canonicalUrl: "https://vyomai.com/blog",
  },
  careers: {
    pageId: "careers",
    pageName: "Careers",
    metaTitle: "Careers — Join the Engineering Frontier at VyomAI",
    metaDescription: "Explore high-impact engineering careers at VyomAI across applied AI research, distributed GPU cloud architectures, LLM systems, and high-performance computing.",
    metaImage: "/images/logo.jpg",
    keywords: "AI Careers, Machine Learning Jobs, Systems Engineer Careers, Remote Engineering, LLM Researchers",
    canonicalUrl: "https://vyomai.com/careers",
  },
  contact: {
    pageId: "contact",
    pageName: "Contact Us",
    metaTitle: "Contact Us — VyomAI | Technical Discovery & Consultations",
    metaDescription: "Connect directly with VyomAI's principal AI research engineers and software architects to discuss your technical roadmap.",
    metaImage: "/images/logo.jpg",
    keywords: "Contact VyomAI, Technical Consultation, AI Architecture Advisory, Engineering Inquiries, Project Discovery",
    canonicalUrl: "https://vyomai.com/contact",
  },
};

export async function getPageSeoFromDb(pageId: string): Promise<PageSeoConfig> {
  const normId = pageId.toLowerCase().trim();
  const fallback = DEFAULT_PAGE_SEO[normId] || {
    pageId: normId,
    pageName: normId.charAt(0).toUpperCase() + normId.slice(1),
    metaTitle: "VyomAI — Engineering the Future with AI",
    metaDescription: "Architecting high-impact cognitive AI systems and mission-critical enterprise software.",
    metaImage: "/images/logo.jpg",
    keywords: "VyomAI, Artificial Intelligence, Software Engineering",
  };

  const conn = await connectToDatabase();
  if (conn) {
    try {
      const doc = await PageSeo.findOne({ pageId: normId }).lean();
      if (doc) {
        return {
          pageId: doc.pageId,
          pageName: doc.pageName,
          metaTitle: doc.metaTitle || fallback.metaTitle,
          metaDescription: doc.metaDescription || fallback.metaDescription,
          metaImage: doc.metaImage || fallback.metaImage,
          keywords: doc.keywords || fallback.keywords,
          canonicalUrl: doc.canonicalUrl || fallback.canonicalUrl,
        };
      }
    } catch (err) {
      console.warn(`[DbService] Error fetching PageSeo for ${pageId}:`, err);
    }
  }

  return fallback;
}

export async function getAllPageSeoFromDb(): Promise<PageSeoConfig[]> {
  const conn = await connectToDatabase();
  const result: Record<string, PageSeoConfig> = { ...DEFAULT_PAGE_SEO };

  if (conn) {
    try {
      const docs = await PageSeo.find({}).lean();
      for (const d of docs) {
        if (d.pageId) {
          result[d.pageId] = {
            pageId: d.pageId,
            pageName: d.pageName || DEFAULT_PAGE_SEO[d.pageId]?.pageName || d.pageId,
            metaTitle: d.metaTitle,
            metaDescription: d.metaDescription,
            metaImage: d.metaImage || "/images/logo.jpg",
            keywords: d.keywords || "",
            canonicalUrl: d.canonicalUrl || "",
          };
        }
      }
    } catch (err) {
      console.warn("[DbService] Error fetching all PageSeo docs:", err);
    }
  }

  return Object.values(result);
}

export async function upsertPageSeoInDb(
  pageId: string,
  data: {
    pageName?: string;
    metaTitle: string;
    metaDescription: string;
    metaImage?: string;
    keywords?: string[] | string;
    canonicalUrl?: string;
  }
) {
  const normId = pageId.toLowerCase().trim();
  const pageName = data.pageName || DEFAULT_PAGE_SEO[normId]?.pageName || normId;
  const normKeywords = Array.isArray(data.keywords)
    ? data.keywords.join(", ")
    : typeof data.keywords === "string"
    ? data.keywords
    : "";

  const conn = await connectToDatabase();
  if (conn) {
    try {
      const updated = await PageSeo.findOneAndUpdate(
        { pageId: normId },
        {
          pageId: normId,
          pageName,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          metaImage: data.metaImage || "/images/logo.jpg",
          keywords: normKeywords,
          canonicalUrl: data.canonicalUrl || "",
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();

      return { success: true, data: updated, source: "mongodb" };
    } catch (err) {
      console.error("[DbService] Error upserting PageSeo:", err);
      return { success: false, error: (err as Error).message };
    }
  }

  // In-memory fallback
  DEFAULT_PAGE_SEO[normId] = {
    pageId: normId,
    pageName,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    metaImage: data.metaImage || "/images/logo.jpg",
    keywords: normKeywords,
    canonicalUrl: data.canonicalUrl || "",
  };

  return { success: true, data: DEFAULT_PAGE_SEO[normId], source: "fallback" };
}

