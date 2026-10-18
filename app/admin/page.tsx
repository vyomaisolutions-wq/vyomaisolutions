"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Layers,
  Inbox,
  Database,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  RefreshCw,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  Mail,
  Building,
  DollarSign,
  Tag,
  Check,
  X,
  ChevronRight,
  Shield,
  Activity,
  Server,
  Lock,
  Key,
  LogOut,
  UserCheck,
  Upload,
  Globe,
  Phone,
  Paperclip,
} from "lucide-react";

type ActiveTab = "overview" | "blog" | "portfolio" | "services" | "contact" | "careers" | "database" | "seo";

interface CareerApplicationItem {
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
  updatedAt?: string;
}

interface JobOpeningItem {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  compensation: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
  featured?: boolean;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PageSeoItem {
  _id?: string;
  pageId: string;
  pageName: string;
  metaTitle: string;
  metaDescription: string;
  metaImage?: string;
  keywords?: string[];
  canonicalUrl?: string;
  updatedAt?: string;
}

interface BlogItem {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  excerpt: string;
  description?: string;
  image: string;
  tags?: string[];
  author?: { name: string; role: string };
  isPublished?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  keywords?: string[];
}

interface ProjectItem {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  category: string;
  clientIndustry: string;
  description: string;
  results: string;
  technologies: string[];
  image?: string;
  sampleBadge?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  keywords?: string[];
}

interface ServiceItem {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  image?: string;
  iconName: string;
  features: string[];
  technologies: string[];
  metrics: string;
  active?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  keywords?: string[];
}

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  details: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  createdAt: string;
}

interface DbStatus {
  connected: boolean;
  state: number;
  uriConfigured: boolean;
  maskedUri: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [counts, setCounts] = useState({
    blogs: 0,
    projects: 0,
    services: 0,
    contacts: 0,
    newLeads: 0,
    totalViews: 2450,
    applications: 0,
    newApplications: 0,
  });
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [careerApplications, setCareerApplications] = useState<CareerApplicationItem[]>([]);
  const [jobOpeningsList, setJobOpeningsList] = useState<JobOpeningItem[]>([]);
  const [careerSectionView, setCareerSectionView] = useState<"applications" | "jobs">("applications");

  // Search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [contactStatusFilter, setContactStatusFilter] = useState<string>("all");
  const [careerStatusFilter, setCareerStatusFilter] = useState<string>("all");

  // Modal states
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpeningItem | null>(null);
  const [viewingContact, setViewingContact] = useState<ContactItem | null>(null);
  const [viewingApplication, setViewingApplication] = useState<CareerApplicationItem | null>(null);
  const [applicationNotesInput, setApplicationNotesInput] = useState<string>("");
  const [isUpdatingApplicationStatus, setIsUpdatingApplicationStatus] = useState<boolean>(false);

  // Job Opening form buffer
  const [jobForm, setJobForm] = useState({
    title: "",
    slug: "",
    department: "AI Research & Systems",
    location: "Remote (Global) / Bangalore",
    type: "Full-Time",
    experience: "3-5 Years",
    compensation: "$120,000 – $180,000 + Equity",
    description: "",
    responsibilities: "",
    requirements: "",
    tags: "AI, PyTorch, Deep Learning",
    featured: false,
    active: true,
  });

  // Form buffers
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    category: "Generative AI",
    excerpt: "",
    description: "",
    image: "/images/blog/generative-ai-arch.jpg",
    tags: "LLMs, Architecture, AI",
    authorName: "Aarav Sharma",
    authorRole: "Lead AI Research Architect",
    conclusion: "",
    metaTitle: "",
    metaDescription: "",
    metaImage: "",
    keywords: "",
  });

  const [projectForm, setProjectForm] = useState({
    title: "",
    slug: "",
    category: "AI & ML",
    clientIndustry: "Enterprise Tech",
    description: "",
    results: "99.8% Prediction Accuracy",
    technologies: "PyTorch, TypeScript, Next.js",
    image: "/images/projects/neuro-finance.jpg",
    sampleBadge: "Showcase Case Study",
    metaTitle: "",
    metaDescription: "",
    metaImage: "",
    keywords: "",
  });

  const [serviceForm, setServiceForm] = useState({
    title: "",
    slug: "",
    iconName: "Brain",
    shortDesc: "",
    fullDesc: "",
    image: "",
    features: "Custom Neural Network Architecture\nPredictive Analytics & Forecasting\nModel Training & Quantization",
    technologies: "PyTorch, CUDA, Next.js",
    metrics: "99.4% Model Precision Across Production Pipelines",
    metaTitle: "",
    metaDescription: "",
    metaImage: "",
    keywords: "",
  });

  // Page SEO state
  const [pageSeoList, setPageSeoList] = useState<PageSeoItem[]>([]);
  const [selectedSeoPageId, setSelectedSeoPageId] = useState<string>("home");
  const [isSavingSeo, setIsSavingSeo] = useState(false);
  const [seoForm, setSeoForm] = useState({
    pageId: "home",
    pageName: "Home (/)",
    metaTitle: "VyomAI | Next-Gen Autonomous AI & Deep Tech Solutions",
    metaDescription: "VyomAI architects production-grade artificial intelligence, neural networks, multimodal RAG systems, and autonomous enterprise software.",
    metaImage: "/images/about-hero-bg.jpg",
    keywords: "VyomAI, Artificial Intelligence, Machine Learning, Deep Tech, Enterprise AI, Autonomous Systems",
    canonicalUrl: "https://vyomai.com",
  });

  const showToast = (text: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleFileUpload = async (
    file: File,
    target: "blog" | "project" | "service" | "blog-meta" | "project-meta" | "service-meta" | "page-meta"
  ) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (target === "blog") setBlogForm((prev) => ({ ...prev, image: data.url }));
        if (target === "project") setProjectForm((prev) => ({ ...prev, image: data.url }));
        if (target === "service") setServiceForm((prev) => ({ ...prev, image: data.url }));
        if (target === "blog-meta") setBlogForm((prev) => ({ ...prev, metaImage: data.url }));
        if (target === "project-meta") setProjectForm((prev) => ({ ...prev, metaImage: data.url }));
        if (target === "service-meta") setServiceForm((prev) => ({ ...prev, metaImage: data.url }));
        if (target === "page-meta") setSeoForm((prev) => ({ ...prev, metaImage: data.url }));
        showToast("Image uploaded successfully!", "success");
      } else {
        showToast("Image upload failed: " + (data.error || "Unknown error"), "error");
      }
    } catch (err) {
      showToast("Error uploading image: " + (err as Error).message, "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Fetch all data
  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // 1. Stats and DB Status
      const statsRes = await fetch("/api/admin/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setDbStatus(statsData.db);
        if (statsData.counts) setCounts(statsData.counts);
      }

      // 2. Blogs
      const blogRes = await fetch("/api/blog");
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        setBlogs(blogData.data || []);
      }

      // 3. Projects
      const projRes = await fetch("/api/portfolio");
      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(projData.data || []);
      }

      // 4. Services
      const servRes = await fetch("/api/services");
      if (servRes.ok) {
        const servData = await servRes.json();
        setServices(servData.data || []);
      }

      // 5. Contacts
      const contactRes = await fetch("/api/contact");
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContacts(contactData.data || []);
      }

      // 5b. Career Applications
      const careerRes = await fetch("/api/careers/apply");
      if (careerRes.ok) {
        const careerData = await careerRes.json();
        setCareerApplications(careerData.data || []);
      }

      // 5c. Job Openings
      const jobsRes = await fetch("/api/careers/jobs");
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobOpeningsList(jobsData.data || []);
      }

      // 6. Page SEO
      const seoRes = await fetch("/api/admin/seo");
      if (seoRes.ok) {
        const seoData = await seoRes.json();
        if (seoData.data && Array.isArray(seoData.data)) {
          setPageSeoList(seoData.data);
          const current = seoData.data.find((p: PageSeoItem) => p.pageId === selectedSeoPageId);
          if (current) {
            setSeoForm({
              pageId: current.pageId,
              pageName: current.pageName,
              metaTitle: current.metaTitle || "",
              metaDescription: current.metaDescription || "",
              metaImage: current.metaImage || "",
              keywords: Array.isArray(current.keywords) ? current.keywords.join(", ") : "",
              canonicalUrl: current.canonicalUrl || "",
            });
          }
        }
      }
    } catch (e) {
      console.error("Error loading dashboard data:", e);
      showToast("Error fetching some data modules.", "error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedSeoPageId]);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("vyomai_admin_token") : null;
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
    setAuthLoading(false);
  }, [fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername.trim(), password: loginPassword.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("vyomai_admin_token", data.token);
        setIsAuthenticated(true);
        showToast("Welcome back, Administrator!", "success");
        fetchData();
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setLoginError("Login failed. Check server connection.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vyomai_admin_token");
    setIsAuthenticated(false);
    setLoginPassword("");
    showToast("Signed out from Admin OS.", "info");
  };

  // Blog CRUD
  const openNewBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      slug: "",
      category: "Generative AI",
      excerpt: "",
      description: "",
      image: "/images/blog/generative-ai-arch.jpg",
      tags: "LLMs, Architecture, AI",
      authorName: "Aarav Sharma",
      authorRole: "Lead AI Research Architect",
      conclusion: "",
      metaTitle: "",
      metaDescription: "",
      metaImage: "",
      keywords: "",
    });
    setBlogModalOpen(true);
  };

  const openEditBlogModal = (blog: BlogItem) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      excerpt: blog.excerpt,
      description: blog.description || "",
      image: blog.image || "/images/blog/generative-ai-arch.jpg",
      tags: blog.tags?.join(", ") || "",
      authorName: blog.author?.name || "VyomAI Research Team",
      authorRole: blog.author?.role || "Principal AI Architect",
      conclusion: "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaImage: blog.metaImage || "",
      keywords: blog.keywords?.join(", ") || "",
    });
    setBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const wordCount = ((blogForm.description || "") + " " + blogForm.excerpt).split(/\s+/).filter(Boolean).length;
    const computedReadTime = Math.max(3, Math.ceil(wordCount / 160)) + " min read";

    const payload = {
      title: blogForm.title,
      slug: blogForm.slug || generateSlug(blogForm.title),
      category: blogForm.category,
      readTime: computedReadTime,
      excerpt: blogForm.excerpt,
      description: blogForm.description,
      image: blogForm.image,
      tags: blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: {
        name: blogForm.authorName,
        role: blogForm.authorRole,
      },
      metaTitle: blogForm.metaTitle.trim() || undefined,
      metaDescription: blogForm.metaDescription.trim() || undefined,
      metaImage: blogForm.metaImage.trim() || undefined,
      keywords: blogForm.keywords ? blogForm.keywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
    };

    try {
      if (editingBlog) {
        const id = editingBlog._id || editingBlog.slug;
        const res = await fetch(`/api/blog/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showToast("Article updated successfully!");
          setBlogModalOpen(false);
          fetchData();
        }
      } else {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showToast("Article published successfully!");
          setBlogModalOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      showToast("Failed to save article: " + (err as Error).message, "error");
    }
  };

  const handleDeleteBlog = async (blog: BlogItem) => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) return;
    try {
      const id = blog._id || blog.slug || blog.id;
      if (!id) {
        showToast("Error: Article identifier not found.", "error");
        return;
      }

      // Optimistically update the UI immediately
      setBlogs((prev) =>
        prev.filter((b) => {
          if (blog._id && b._id === blog._id) return false;
          if (blog.slug && b.slug === blog.slug) return false;
          if (blog.id && b.id === blog.id) return false;
          return true;
        })
      );

      const res = await fetch(`/api/blog/${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        showToast("Article deleted successfully!", "success");
      } else {
        showToast("Error: " + (data.error || "Failed to delete article"), "error");
      }
      fetchData();
    } catch (err) {
      showToast("Error deleting: " + (err as Error).message, "error");
      fetchData();
    }
  };

  // Project CRUD
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: "",
      slug: "",
      category: "AI & ML",
      clientIndustry: "Enterprise Tech",
      description: "",
      results: "99.8% Prediction Accuracy",
      technologies: "PyTorch, TypeScript, Next.js",
      image: "/images/projects/neuro-finance.jpg",
      sampleBadge: "Showcase Case Study",
      metaTitle: "",
      metaDescription: "",
      metaImage: "",
      keywords: "",
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      slug: proj.slug || proj.id || "",
      category: proj.category,
      clientIndustry: proj.clientIndustry,
      description: proj.description,
      results: proj.results,
      technologies: proj.technologies.join(", "),
      image: proj.image || "/images/projects/neuro-finance.jpg",
      sampleBadge: proj.sampleBadge || "Showcase Case Study",
      metaTitle: proj.metaTitle || "",
      metaDescription: proj.metaDescription || "",
      metaImage: proj.metaImage || "",
      keywords: proj.keywords?.join(", ") || "",
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: projectForm.title,
      slug: projectForm.slug || generateSlug(projectForm.title),
      category: projectForm.category,
      clientIndustry: projectForm.clientIndustry,
      description: projectForm.description,
      results: projectForm.results,
      technologies: projectForm.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      image: projectForm.image,
      sampleBadge: projectForm.sampleBadge,
      metaTitle: projectForm.metaTitle.trim() || undefined,
      metaDescription: projectForm.metaDescription.trim() || undefined,
      metaImage: projectForm.metaImage.trim() || undefined,
      keywords: projectForm.keywords ? projectForm.keywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
    };

    try {
      if (editingProject) {
        const id = editingProject._id || editingProject.slug || editingProject.id;
        const res = await fetch(`/api/portfolio/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showToast("Portfolio project updated!");
          setProjectModalOpen(false);
          fetchData();
        }
      } else {
        const res = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showToast("Portfolio project created!");
          setProjectModalOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      showToast("Failed to save project: " + (err as Error).message, "error");
    }
  };

  const handleDeleteProject = async (proj: ProjectItem) => {
    if (!confirm(`Delete project "${proj.title}"?`)) return;
    try {
      const id = proj._id || proj.slug || proj.id;
      if (!id) return;
      setProjects((prev) =>
        prev.filter((p) => {
          if (proj._id && p._id === proj._id) return false;
          if (proj.slug && p.slug === proj.slug) return false;
          if (proj.id && p.id === proj.id) return false;
          return true;
        })
      );
      const res = await fetch(`/api/portfolio/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Project deleted successfully!");
      }
      fetchData();
    } catch (err) {
      showToast("Error deleting project: " + (err as Error).message, "error");
      fetchData();
    }
  };

  // Service CRUD
  const openNewServiceModal = () => {
    setEditingService(null);
    setServiceForm({
      title: "",
      slug: "",
      iconName: "Brain",
      shortDesc: "",
      fullDesc: "",
      image: "",
      features: "Custom Neural Network Architecture\nPredictive Analytics & Forecasting\nModel Training & Quantization",
      technologies: "PyTorch, CUDA, Next.js",
      metrics: "99.4% Model Precision Across Production Pipelines",
      metaTitle: "",
      metaDescription: "",
      metaImage: "",
      keywords: "",
    });
    setServiceModalOpen(true);
  };

  const openEditServiceModal = (serv: ServiceItem) => {
    setEditingService(serv);
    setServiceForm({
      title: serv.title,
      slug: serv.slug || serv.id || "",
      iconName: serv.iconName,
      shortDesc: serv.shortDesc,
      fullDesc: serv.fullDesc || serv.shortDesc,
      image: serv.image || "",
      features: serv.features.join("\n"),
      technologies: serv.technologies.join(", "),
      metrics: serv.metrics,
      metaTitle: serv.metaTitle || "",
      metaDescription: serv.metaDescription || "",
      metaImage: serv.metaImage || "",
      keywords: serv.keywords?.join(", ") || "",
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: serviceForm.title,
      slug: serviceForm.slug || generateSlug(serviceForm.title),
      iconName: serviceForm.iconName,
      shortDesc: serviceForm.shortDesc,
      fullDesc: serviceForm.fullDesc || serviceForm.shortDesc,
      image: serviceForm.image || "",
      features: serviceForm.features.split("\n").map((f) => f.trim()).filter(Boolean),
      technologies: serviceForm.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      metrics: serviceForm.metrics,
      metaTitle: serviceForm.metaTitle.trim() || undefined,
      metaDescription: serviceForm.metaDescription.trim() || undefined,
      metaImage: serviceForm.metaImage.trim() || undefined,
      keywords: serviceForm.keywords ? serviceForm.keywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
    };

    try {
      if (editingService) {
        const id = editingService._id || editingService.slug || editingService.id;
        const res = await fetch(`/api/services/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showToast("Service updated!");
          setServiceModalOpen(false);
          fetchData();
        }
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showToast("Service created!");
          setServiceModalOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      showToast("Failed to save service: " + (err as Error).message, "error");
    }
  };

  const handleDeleteService = async (serv: ServiceItem) => {
    if (!confirm(`Delete service "${serv.title}"?`)) return;
    try {
      const id = serv._id || serv.slug || serv.id;
      if (!id) return;
      setServices((prev) =>
        prev.filter((s) => {
          if (serv._id && s._id === serv._id) return false;
          if (serv.slug && s.slug === serv.slug) return false;
          if (serv.id && s.id === serv.id) return false;
          return true;
        })
      );
      const res = await fetch(`/api/services/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Service deleted successfully!");
      }
      fetchData();
    } catch (err) {
      showToast("Error deleting service: " + (err as Error).message, "error");
      fetchData();
    }
  };

  // Page SEO Static definitions & helpers
  const STATIC_SEO_PAGES = [
    { id: "home", name: "Home (/)", url: "https://vyomai.com", defaultTitle: "VyomAI | Next-Gen Autonomous AI & Deep Tech Solutions", defaultDesc: "VyomAI architects production-grade artificial intelligence, neural networks, multimodal RAG systems, and autonomous enterprise software." },
    { id: "about", name: "About Us (/about)", url: "https://vyomai.com/about", defaultTitle: "About VyomAI | Pioneering Intelligent Autonomous Systems", defaultDesc: "Learn about VyomAI's elite engineering heritage, quantum-ready neural architectures, research principles, and leadership." },
    { id: "services", name: "Services (/services)", url: "https://vyomai.com/services", defaultTitle: "Services & Capabilities | VyomAI Deep Tech Engineering", defaultDesc: "Explore VyomAI's specialized engineering capabilities in GenAI, custom LLM fine-tuning, enterprise vector search, cloud infrastructure, and autonomous agents." },
    { id: "portfolio", name: "Portfolio (/portfolio)", url: "https://vyomai.com/portfolio", defaultTitle: "Portfolio & Case Studies | VyomAI Real-World Deployments", defaultDesc: "Explore mission-critical case studies deployed across FinTech, MedTech, Aerospace, and High-Scale Cloud Infrastructure." },
    { id: "blog", name: "Blog (/blog)", url: "https://vyomai.com/blog", defaultTitle: "Research & Engineering Insights | VyomAI Technical Journal", defaultDesc: "Deep-dive technical architectural blueprints, state-of-the-art AI benchmarks, LLM evaluations, and enterprise AI engineering guides." },
    { id: "careers", name: "Careers (/careers)", url: "https://vyomai.com/careers", defaultTitle: "Careers at VyomAI | Build Autonomous Intelligence", defaultDesc: "Join VyomAI's world-class team of AI researchers, distributed systems engineers, and deep tech innovators." },
    { id: "contact", name: "Contact (/contact)", url: "https://vyomai.com/contact", defaultTitle: "Contact VyomAI | Enterprise AI Architecture Advisory", defaultDesc: "Schedule an architectural briefing with VyomAI's principal AI research team for your mission-critical initiative." },
  ];

  const selectSeoPage = (pageId: string) => {
    setSelectedSeoPageId(pageId);
    const existing = pageSeoList.find((p) => p.pageId === pageId);
    const pageMeta = STATIC_SEO_PAGES.find((p) => p.id === pageId);
    if (existing) {
      setSeoForm({
        pageId: existing.pageId,
        pageName: existing.pageName || pageMeta?.name || pageId,
        metaTitle: existing.metaTitle || pageMeta?.defaultTitle || "",
        metaDescription: existing.metaDescription || pageMeta?.defaultDesc || "",
        metaImage: existing.metaImage || "/images/about-hero-bg.jpg",
        keywords: Array.isArray(existing.keywords) ? existing.keywords.join(", ") : (existing.keywords || "AI, Machine Learning, VyomAI"),
        canonicalUrl: existing.canonicalUrl || pageMeta?.url || "",
      });
    } else {
      setSeoForm({
        pageId,
        pageName: pageMeta?.name || pageId,
        metaTitle: pageMeta?.defaultTitle || `${pageMeta?.name} | VyomAI`,
        metaDescription: pageMeta?.defaultDesc || "VyomAI next-generation deep tech solutions.",
        metaImage: "/images/about-hero-bg.jpg",
        keywords: "VyomAI, Artificial Intelligence, Machine Learning, Deep Tech, Enterprise AI",
        canonicalUrl: pageMeta?.url || `https://vyomai.com/${pageId === "home" ? "" : pageId}`,
      });
    }
  };

  const handleSavePageSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSeo(true);
    try {
      const payload = {
        pageId: seoForm.pageId,
        pageName: seoForm.pageName,
        metaTitle: seoForm.metaTitle.trim(),
        metaDescription: seoForm.metaDescription.trim(),
        metaImage: seoForm.metaImage.trim(),
        keywords: seoForm.keywords ? seoForm.keywords.split(",").map((k) => k.trim()).filter(Boolean) : [],
        canonicalUrl: seoForm.canonicalUrl.trim(),
      };
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`SEO settings for "${seoForm.pageName}" saved successfully!`, "success");
        setPageSeoList((prev) => {
          const idx = prev.findIndex((p) => p.pageId === payload.pageId);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = data.data;
            return next;
          }
          return [...prev, data.data];
        });
      } else {
        showToast("Error saving SEO: " + (data.error || "Unknown error"), "error");
      }
    } catch (err) {
      showToast("Failed to save SEO: " + (err as Error).message, "error");
    } finally {
      setIsSavingSeo(false);
    }
  };

  // Contact status change
  const handleUpdateContactStatus = async (id: string, status: ContactItem["status"]) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        showToast(`Inquiry marked as ${status}`);
        if (viewingContact && viewingContact._id === id) {
          setViewingContact({ ...viewingContact, status });
        }
        fetchData();
      }
    } catch (err) {
      showToast("Error updating inquiry: " + (err as Error).message, "error");
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Permanently delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Inquiry deleted");
        setViewingContact(null);
        fetchData();
      }
    } catch (err) {
      showToast("Error deleting inquiry: " + (err as Error).message, "error");
    }
  };

  // Career Application status and delete handlers
  const handleUpdateApplicationStatus = async (
    id: string,
    status: CareerApplicationItem["status"],
    notes?: string
  ) => {
    setIsUpdatingApplicationStatus(true);
    try {
      const res = await fetch(`/api/careers/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`Application marked as ${status}`);
        if (viewingApplication && viewingApplication._id === id) {
          setViewingApplication((prev) =>
            prev ? { ...prev, status, notes: notes !== undefined ? notes : prev.notes } : null
          );
        }
        fetchData();
      } else {
        showToast(data.error || "Failed to update application", "error");
      }
    } catch (err) {
      showToast("Error updating application: " + (err as Error).message, "error");
    } finally {
      setIsUpdatingApplicationStatus(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm("Permanently delete this career application?")) return;
    try {
      const res = await fetch(`/api/careers/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Application deleted");
        setViewingApplication(null);
        fetchData();
      } else {
        showToast("Failed to delete application", "error");
      }
    } catch (err) {
      showToast("Error deleting application: " + (err as Error).message, "error");
    }
  };

  const handleSaveApplicationNotes = async () => {
    if (!viewingApplication) return;
    await handleUpdateApplicationStatus(
      viewingApplication._id,
      viewingApplication.status,
      applicationNotesInput
    );
  };

  // Job Opening Handlers
  const openNewJobModal = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      slug: "",
      department: "AI Research & Systems",
      location: "Remote (Global) / Bangalore",
      type: "Full-Time",
      experience: "3-5 Years",
      compensation: "$120,000 – $180,000 + Equity",
      description: "",
      responsibilities: "",
      requirements: "",
      tags: "AI, PyTorch, Deep Learning",
      featured: false,
      active: true,
    });
    setJobModalOpen(true);
  };

  const openEditJobModal = (job: JobOpeningItem) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      slug: job.slug,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      compensation: job.compensation,
      description: job.description,
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join("\n") : "",
      requirements: Array.isArray(job.requirements) ? job.requirements.join("\n") : "",
      tags: Array.isArray(job.tags) ? job.tags.join(", ") : "",
      featured: !!job.featured,
      active: job.active !== false,
    });
    setJobModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title.trim() || !jobForm.description.trim()) {
      showToast("Job title and description are required.", "error");
      return;
    }

    try {
      const isEditing = !!editingJob;
      const targetId = editingJob ? (editingJob._id || editingJob.slug) : "";
      const url = isEditing ? `/api/careers/jobs/${targetId}` : "/api/careers/jobs";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(isEditing ? "Job position updated!" : "New job position published!", "success");
        setJobModalOpen(false);
        fetchData();
      } else {
        showToast(data.error || "Failed to save job opening", "error");
      }
    } catch (err) {
      showToast("Error saving job: " + (err as Error).message, "error");
    }
  };

  const handleToggleJobActive = async (job: JobOpeningItem) => {
    const targetId = job._id || job.slug;
    try {
      const res = await fetch(`/api/careers/jobs/${targetId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !job.active }),
      });
      if (res.ok) {
        showToast(`Job ${!job.active ? "activated" : "deactivated"} successfully!`);
        fetchData();
      }
    } catch (err) {
      showToast("Error updating job: " + (err as Error).message, "error");
    }
  };

  const handleDeleteJob = async (job: JobOpeningItem) => {
    if (!confirm(`Permanently delete job opening "${job.title}"?`)) return;
    const targetId = job._id || job.slug;
    try {
      const res = await fetch(`/api/careers/jobs/${targetId}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Job opening deleted successfully!");
        fetchData();
      } else {
        showToast("Failed to delete job", "error");
      }
    } catch (err) {
      showToast("Error deleting job: " + (err as Error).message, "error");
    }
  };

  // Filtered lists
  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientIndustry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter((c) => {
    const s = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !s ||
      (c.name && c.name.toLowerCase().includes(s)) ||
      (c.email && c.email.toLowerCase().includes(s)) ||
      (c.service && c.service.toLowerCase().includes(s)) ||
      (c.company && c.company.toLowerCase().includes(s)) ||
      (c.details && c.details.toLowerCase().includes(s));
    const matchesStatus =
      contactStatusFilter === "all" ||
      (c.status && c.status.toLowerCase() === contactStatusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const filteredApplications = careerApplications.filter((a) => {
    const s = searchQuery.toLowerCase();
    const matchesSearch =
      !s ||
      a.name.toLowerCase().includes(s) ||
      a.email.toLowerCase().includes(s) ||
      a.role.toLowerCase().includes(s) ||
      (a.phone && a.phone.toLowerCase().includes(s));
    const matchesStatus =
      careerStatusFilter === "all" || a.status === careerStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredJobOpenings = jobOpeningsList.filter((j) => {
    const s = searchQuery.toLowerCase().trim();
    return (
      !s ||
      j.title.toLowerCase().includes(s) ||
      j.department.toLowerCase().includes(s) ||
      j.location.toLowerCase().includes(s) ||
      j.description.toLowerCase().includes(s) ||
      (j.tags && j.tags.some((t) => t.toLowerCase().includes(s)))
    );
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-cyan-400">Initializing VyomAI Admin Gateway...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Background ambient cosmic glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <Image
            src="/images/about-hero-bg.jpg"
            alt="VyomAI Admin Security Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/90 via-[#070b14]/75 to-[#070b14]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        {/* Login Card */}
        <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 mx-auto rounded-2xl overflow-hidden border border-cyan-500/40 shadow-xl shadow-cyan-500/20 mb-3">
              <Image src="/images/logo.jpg" alt="VyomAI Logo" fill className="object-cover" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-widest">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>Restricted Access Control</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">VyomAI Admin OS</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign in with administrative credentials to access database controls and client inquiries.
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Authorize &amp; Enter Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors"
            >
              ← Return to VyomAI Main Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all animate-bounce ${
            toastMessage.type === "success"
              ? "bg-cyan-950/90 border-cyan-500/50 text-cyan-200"
              : toastMessage.type === "error"
              ? "bg-red-950/90 border-red-500/50 text-red-200"
              : "bg-slate-900/90 border-slate-700 text-slate-200"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Badge */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/40 shadow-lg shadow-cyan-500/20">
              <Image src="/images/logo.jpg" alt="VyomAI Logo" fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-white">VyomAI</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800/50 font-bold">
                  Admin OS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Dynamic Architecture &amp; Database Command Center
              </p>
            </div>
          </div>

          {/* Database Live Status Badge */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border backdrop-blur-md ${
                dbStatus?.connected
                  ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                  : "bg-cyan-950/80 border-cyan-500/40 text-cyan-300"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  dbStatus?.connected
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-cyan-400 animate-pulse"
                }`}
              />
              <span className="hidden md:inline font-semibold">
                {dbStatus?.connected ? "MongoDB Live" : "Active Data Layer"}
              </span>
              <span className="text-[10px] opacity-75">
                {dbStatus?.connected ? "(vyomai)" : "(Ready)"}
              </span>
            </div>

            {/* Quick Actions */}
            <button
              onClick={fetchData}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
            </button>



            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 transition-all"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
              title="Sign Out of Admin OS"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row gap-6 md:gap-8 min-w-0">
        {/* Left Side Navigation Panel */}
        <aside className="w-full md:w-64 shrink-0 space-y-4 sm:space-y-6 min-w-0">
          <div className="p-2 sm:p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md flex md:flex-col overflow-x-auto no-scrollbar gap-1.5 sm:gap-1">
            <button
              onClick={() => { setActiveTab("overview"); setSearchQuery(""); }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full min-tap-target ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Overview Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab("blog"); setSearchQuery(""); }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full min-tap-target gap-2 ${
                activeTab === "blog"
                  ? "bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Blog Publications</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                {blogs.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("portfolio"); setSearchQuery(""); }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full min-tap-target gap-2 ${
                activeTab === "portfolio"
                  ? "bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Portfolio Showcases</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("services"); setSearchQuery(""); }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full min-tap-target gap-2 ${
                activeTab === "services"
                  ? "bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Services Catalog</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                {services.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("contact"); setSearchQuery(""); }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full min-tap-target gap-2 ${
                activeTab === "contact"
                  ? "bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Contact Inquiries</span>
              </div>
              {counts.newLeads > 0 ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold animate-pulse">
                  {counts.newLeads} new
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  {contacts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab("careers"); setSearchQuery(""); }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full min-tap-target gap-2 ${
                activeTab === "careers"
                  ? "bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Careers / Applications</span>
              </div>
              {counts.newApplications > 0 ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500 text-slate-950 font-bold animate-pulse">
                  {counts.newApplications} new
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  {careerApplications.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab("database"); setSearchQuery(""); }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full min-tap-target gap-2 ${
                activeTab === "database"
                  ? "bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>MongoDB Settings</span>
              </div>
              <span
                className={`w-2 h-2 rounded-full ${
                  dbStatus?.connected ? "bg-emerald-400" : "bg-cyan-400"
                }`}
              />
            </button>

            <button
              onClick={() => { setActiveTab("seo"); setSearchQuery(""); }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full min-tap-target gap-2 ${
                activeTab === "seo"
                  ? "bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Page SEO Config</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 font-bold">
                7 Pages
              </span>
            </button>
          </div>

          {/* Quick System Info Card */}
          <div className="hidden md:block p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950 border border-slate-800 text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold">
              <Server className="w-3.5 h-3.5 shrink-0" />
              <span>Environment Status</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-400 font-mono">
              <div className="flex justify-between">
                <span>Database:</span>
                <span className={dbStatus?.connected ? "text-emerald-400" : "text-cyan-400"}>
                  {dbStatus?.connected ? "MongoDB Live" : "Active Layer"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Collections:</span>
                <span className="text-white">4 Models</span>
              </div>
              <div className="flex justify-between">
                <span>API Engine:</span>
                <span className="text-white">Next.js 16 App Router</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* ======================= TAB: OVERVIEW ======================= */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Executive Dashboard</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Real-time operational metrics for publications, portfolio projects, services, and client inquiries.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={openNewBlogModal}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-xs font-semibold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>New Article</span>
                  </button>
                  <button
                    onClick={openNewProjectModal}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-xs font-semibold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>New Project</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div
                  onClick={() => setActiveTab("blog")}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Blog Articles
                    </span>
                    <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{blogs.length}</div>
                  <div className="text-[11px] text-cyan-400/80 font-mono mt-1 flex items-center gap-1">
                    <span>Manage Publications</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("portfolio")}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Portfolio Projects
                    </span>
                    <Briefcase className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{projects.length}</div>
                  <div className="text-[11px] text-sky-400/80 font-mono mt-1 flex items-center gap-1">
                    <span>Manage Case Studies</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("services")}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Services Catalog
                    </span>
                    <Layers className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{services.length}</div>
                  <div className="text-[11px] text-blue-400/80 font-mono mt-1 flex items-center gap-1">
                    <span>Manage Offerings</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("contact")}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Client Inquiries
                    </span>
                    <Inbox className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-extrabold text-white flex items-center gap-2">
                    <span>{contacts.length}</span>
                    {counts.newLeads > 0 && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold">
                        +{counts.newLeads} new
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-emerald-400/80 font-mono mt-1 flex items-center gap-1">
                    <span>Review Inbound Leads</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("careers")}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Careers / Talent
                    </span>
                    <UserCheck className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-extrabold text-white flex items-center gap-2">
                    <span>{careerApplications.length}</span>
                    {counts.newApplications > 0 && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500 text-slate-950 font-bold animate-pulse">
                        +{counts.newApplications} new
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-purple-400/80 font-mono mt-1 flex items-center gap-1">
                    <span>Review Candidates</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB: BLOG PUBLICATIONS ======================= */}
          {activeTab === "blog" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Blog Publications</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage technical whitepapers, research articles, and dynamic engineering publications.
                  </p>
                </div>
                <button
                  onClick={openNewBlogModal}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish New Article</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title or category..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Articles Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Publication</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Author</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {filteredBlogs.map((b) => (
                        <tr key={b.slug} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                                <Image
                                  src={b.image || "/images/blog/generative-ai-arch.jpg"}
                                  alt={b.title}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0 max-w-sm">
                                <h4 className="font-bold text-white truncate">{b.title}</h4>
                                <p className="text-[11px] text-slate-400 truncate mt-0.5">{b.excerpt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-cyan-300">
                            {b.category}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                            {b.publishedDate}
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 font-medium">
                            {b.author?.name || "VyomAI Lead"}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/blog/${b.slug}`}
                                target="_blank"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                                title="View public post"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => openEditBlogModal(b)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(b)}
                                className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB: PORTFOLIO ======================= */}
          {activeTab === "portfolio" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio Showcases</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage client case studies, benchmark demonstrations, and production deployments.
                  </p>
                </div>
                <button
                  onClick={openNewProjectModal}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Case Study</span>
                </button>
              </div>

              {/* Grid of Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredProjects.map((p) => (
                  <div
                    key={p.slug || p.id}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                          {p.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {p.clientIndustry}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{p.title}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-[11px] text-cyan-300">
                        {p.results}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {p.technologies?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditProjectModal(p)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================= TAB: SERVICES ======================= */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Services Catalog</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage core AI capabilities, architecture offerings, and enterprise service tiers.
                  </p>
                </div>
                <button
                  onClick={openNewServiceModal}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Grid of Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredServices.map((s) => (
                  <div
                    key={s.slug || s.id}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                          Icon: {s.iconName}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">● Active</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{s.title}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {s.shortDesc}
                      </p>
                      <div className="mt-3 space-y-1">
                        {s.features?.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                            <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-cyan-300 truncate max-w-[70%]">
                        {s.metrics}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditServiceModal(s)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(s)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================= TAB: CONTACT INQUIRIES ======================= */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Contact Inquiries Inbox</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage incoming client discovery requests, project briefings, and enterprise consultation leads.
                  </p>
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  {["all", "new", "reviewed", "contacted", "archived"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setContactStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg capitalize font-mono text-[11px] transition-colors cursor-pointer ${
                        contactStatusFilter === st
                          ? "bg-cyan-950 border border-cyan-500/40 text-cyan-300"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Service Requested</th>
                        <th className="py-3 px-4">Budget</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Received</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {filteredContacts.map((c) => (
                        <tr
                          key={c._id}
                          className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                          onClick={() => setViewingContact(c)}
                        >
                          <td className="py-3.5 px-4">
                            <div>
                              <span className="font-bold text-white block">{c.name}</span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                {c.company ? `${c.company} • ` : ""}
                                {c.email}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-cyan-300">
                            {c.service}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                            {c.budget || "Not Specified"}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase ${
                                c.status === "new"
                                  ? "bg-cyan-500 text-slate-950 font-bold"
                                  : c.status === "contacted"
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setViewingContact(c)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteContact(c._id)}
                                className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredContacts.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                            No inquiries match the current filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB: CAREERS & JOB POSITIONS ======================= */}
          {activeTab === "careers" && (
            <div className="space-y-6">
              {/* Header and Sub-tab Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Careers &amp; Engineering Hiring</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage live job positions published on the Careers page and review candidate applications.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Sub-tab Switcher */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                    <button
                      onClick={() => setCareerSectionView("applications")}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                        careerSectionView === "applications"
                          ? "bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Applications ({careerApplications.length})</span>
                    </button>
                    <button
                      onClick={() => setCareerSectionView("jobs")}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                        careerSectionView === "jobs"
                          ? "bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Open Positions ({jobOpeningsList.length})</span>
                    </button>
                  </div>

                  {careerSectionView === "jobs" && (
                    <button
                      onClick={openNewJobModal}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Post New Position</span>
                    </button>
                  )}
                </div>
              </div>

              {/* VIEW 1: CANDIDATE APPLICATIONS */}
              {careerSectionView === "applications" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Status Filter */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      {["all", "new", "reviewed", "shortlisted", "contacted", "rejected"].map((st) => (
                        <button
                          key={st}
                          onClick={() => setCareerStatusFilter(st)}
                          className={`px-3 py-1 rounded-lg capitalize font-mono text-[11px] transition-colors cursor-pointer ${
                            careerStatusFilter === st
                              ? "bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-semibold"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-slate-400">
                      Showing {filteredApplications.length} of {careerApplications.length} applications
                    </span>
                  </div>

                  {/* Search Bar for Applications */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search applicants by name, email, role, or phone..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Applications Table */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="py-3 px-4">Candidate</th>
                            <th className="py-3 px-4">Target Role &amp; Exp</th>
                            <th className="py-3 px-4">Links / Portfolio</th>
                            <th className="py-3 px-4">Resume / CV</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Submitted</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-300">
                          {filteredApplications.map((app) => (
                            <tr
                              key={app._id}
                              className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                              onClick={() => {
                                setViewingApplication(app);
                                setApplicationNotesInput(app.notes || "");
                              }}
                            >
                              <td className="py-3.5 px-4">
                                <div>
                                  <span className="font-bold text-white block">{app.name}</span>
                                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                                    <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                                    <span>{app.email}</span>
                                  </span>
                                  {app.phone && (
                                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                                      <Phone className="w-3 h-3 text-slate-600 shrink-0" />
                                      <span>{app.phone}</span>
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="space-y-1">
                                  <span className="font-medium text-cyan-300 block font-mono text-[11px]">
                                    {app.role}
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 inline-block">
                                    {app.experienceYears || "3-5 Years"}
                                  </span>
                                </div>
                              </td>

                              <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                                {app.portfolioUrl ? (
                                  <a
                                    href={app.portfolioUrl.startsWith("http") ? app.portfolioUrl : `https://${app.portfolioUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-[11px] font-mono transition-colors max-w-[180px] truncate"
                                  >
                                    <ExternalLink className="w-3 h-3 shrink-0" />
                                    <span className="truncate">View Link</span>
                                  </a>
                                ) : (
                                  <span className="text-slate-500 text-[11px] font-mono">None</span>
                                )}
                              </td>

                              <td className="py-3.5 px-4">
                                {app.resumeFileName ? (
                                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                                    <Paperclip className="w-3 h-3 text-cyan-400 shrink-0" />
                                    <span className="max-w-[130px] truncate">{app.resumeFileName}</span>
                                  </span>
                                ) : (
                                  <span className="text-slate-500 text-[11px] font-mono">In Portal</span>
                                )}
                              </td>

                              <td className="py-3.5 px-4">
                                <span
                                  className={`text-[9px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold ${
                                    app.status === "new"
                                      ? "bg-cyan-500 text-slate-950 font-bold"
                                      : app.status === "shortlisted"
                                      ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                                      : app.status === "contacted"
                                      ? "bg-purple-950 text-purple-300 border border-purple-500/40"
                                      : app.status === "reviewed"
                                      ? "bg-sky-950 text-sky-300 border border-sky-500/40"
                                      : "bg-red-950/70 text-red-400 border border-red-900/60"
                                  }`}
                                >
                                  {app.status}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                                {new Date(app.createdAt).toLocaleDateString()}
                              </td>

                              <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setViewingApplication(app);
                                      setApplicationNotesInput(app.notes || "");
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                                    title="Inspect Application"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteApplication(app._id)}
                                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                                    title="Delete Application"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                          {filteredApplications.length === 0 && (
                            <tr>
                              <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                                No career applications found matching the current filter.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: JOB OPENINGS / POSTINGS MANAGEMENT */}
              {careerSectionView === "jobs" && (
                <div className="space-y-4">
                  {/* Search Bar for Jobs */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search jobs by title, department, location, or tag..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Jobs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredJobOpenings.map((job) => (
                      <div
                        key={job.slug || job.id || (job as { _id?: string })._id}
                        className={`p-5 rounded-2xl border transition-all ${
                          job.active !== false
                            ? "bg-slate-900/70 border-slate-800 hover:border-cyan-500/40 shadow-sm"
                            : "bg-slate-950/60 border-slate-800/50 opacity-60"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30 uppercase">
                                {job.department}
                              </span>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                  job.active !== false
                                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"
                                    : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {job.active !== false ? "Active on /careers" : "Hidden / Inactive"}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white pt-1">{job.title}</h3>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => openEditJobModal(job)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Edit Position"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job)}
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                              title="Delete Position"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed font-sans">
                          {job.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">Location &amp; Type</span>
                            <span className="text-slate-200">{job.location} • {job.type}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">Experience / Comp</span>
                            <span className="text-cyan-300">{job.experience}</span>
                          </div>
                        </div>

                        {job.tags && job.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {job.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-3 pt-2.5 flex items-center justify-between">
                          <button
                            onClick={() => handleToggleJobActive(job)}
                            className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                              job.active !== false
                                ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                : "bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950"
                            }`}
                          >
                            {job.active !== false ? "Hide from Career Page" : "Publish to Career Page"}
                          </button>
                          <Link
                            href="/careers#open-positions"
                            target="_blank"
                            className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <span>Preview</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}

                    {filteredJobOpenings.length === 0 && (
                      <div className="col-span-full py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
                        <Briefcase className="w-8 h-8 text-slate-500 mx-auto" />
                        <p className="text-xs text-slate-400">
                          No job positions found. Click &quot;Post New Position&quot; to publish a role to the Careers page.
                        </p>
                        <button
                          onClick={openNewJobModal}
                          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
                        >
                          Post First Job Position
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================= TAB: DATABASE & SETTINGS ======================= */}
          {activeTab === "database" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">MongoDB &amp; Data Layer Configuration</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage database connectivity, sync schemas, and inspect runtime database health.
                </p>
              </div>

              {/* Status Card */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        dbStatus?.connected ? "bg-emerald-400 animate-pulse" : "bg-cyan-400 animate-pulse"
                      }`}
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {dbStatus?.connected ? "MongoDB Live Connection Active" : "Operational in Fallback Store"}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        {dbStatus?.maskedUri || "mongodb://localhost:27017/vyomai"}
                      </p>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block mb-1">Total Collections</span>
                    <span className="text-lg font-bold text-white">4 Collections</span>
                    <p className="text-[11px] text-slate-400 mt-1">blogs, projects, services, contacts</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block mb-1">Connection State</span>
                    <span className={`text-lg font-bold ${dbStatus?.connected ? "text-emerald-400" : "text-cyan-400"}`}>
                      {dbStatus?.connected ? "Connected (State 1)" : "Fallback Active"}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">Graceful fallback ensures zero downtime</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block mb-1">Environment File</span>
                    <span className="text-lg font-bold text-white">.env.local</span>
                    <p className="text-[11px] text-slate-400 mt-1">Configured with MONGODB_URI</p>
                  </div>
                </div>

                {/* Connection Instructions */}
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold block">
                    How to connect to your MongoDB instance:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    1. Open <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded">.env.local</code> in your project root.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    2. For a local MongoDB instance, ensure MongoDB is running at <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded">mongodb://localhost:27017/vyomai</code>.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    3. For MongoDB Atlas (Cloud), replace with your cluster URI: <br />
                    <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded block mt-1 break-all">
                      MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/vyomai?retryWrites=true&amp;w=majority
                    </code>
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    4. Manage and publish your live articles, case studies, and services directly via the Admin tabs above!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB: PAGE SEO CONFIGURATION ======================= */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/50">
                      Metadata Engine
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Real-time Crawl Optimization</span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Global Page SEO &amp; Meta Tags Manager</h2>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    Configure custom meta titles, meta descriptions, OpenGraph social sharing images, and target keywords for all individual static routes. Changes update search engine indexability and social media link previews in real-time.
                  </p>
                </div>
              </div>

              {/* Page Selection Pill Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                {STATIC_SEO_PAGES.map((page) => {
                  const isSelected = selectedSeoPageId === page.id;
                  const isCustomized = pageSeoList.some((p) => p.pageId === page.id && p.metaTitle);
                  return (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => selectSeoPage(page.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-950/50"
                          : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
                      }`}
                    >
                      <Globe className={`w-3.5 h-3.5 ${isSelected ? "text-cyan-400" : "text-slate-500"}`} />
                      <span>{page.name}</span>
                      {isCustomized ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Custom SEO active" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" title="Default SEO active" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Main 2-Column Work Area */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 7 Columns: Form Editor */}
                <div className="lg:col-span-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                        Editing Route Target
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        {seoForm.pageName}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                      ID: {seoForm.pageId}
                    </span>
                  </div>

                  <form onSubmit={handleSavePageSeo} className="space-y-4 text-xs">
                    {/* Meta Title */}
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-medium flex items-center justify-between">
                        <span>Meta Title *</span>
                        <span
                          className={`text-[10px] font-mono ${
                            seoForm.metaTitle.length > 60
                              ? "text-amber-400"
                              : seoForm.metaTitle.length < 30
                              ? "text-slate-500"
                              : "text-emerald-400"
                          }`}
                        >
                          {seoForm.metaTitle.length} / 60 chars (Optimal: 40-60)
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        value={seoForm.metaTitle}
                        onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                        placeholder="Page Title for Browser Tabs & Search Engines"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Meta Description */}
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-medium flex items-center justify-between">
                        <span>Meta Description *</span>
                        <span
                          className={`text-[10px] font-mono ${
                            seoForm.metaDescription.length > 160
                              ? "text-amber-400"
                              : seoForm.metaDescription.length < 70
                              ? "text-slate-500"
                              : "text-emerald-400"
                          }`}
                        >
                          {seoForm.metaDescription.length} / 160 chars (Optimal: 120-160)
                        </span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={seoForm.metaDescription}
                        onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                        placeholder="Comprehensive search snippet summarizing this page for search results and social cards..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed transition-colors"
                      />
                    </div>

                    {/* Meta Image (OpenGraph / Social) */}
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-medium flex items-center justify-between">
                        <span>Meta Image (OpenGraph / Social Share Preview)</span>
                        <span className="text-[10px] font-mono text-cyan-400">File Upload or URL</span>
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span className="font-semibold text-xs">
                            {uploadingImage ? "Uploading..." : "Upload Meta Image"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingImage}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, "page-meta");
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          value={seoForm.metaImage}
                          onChange={(e) => setSeoForm({ ...seoForm, metaImage: e.target.value })}
                          placeholder="/images/about-hero-bg.jpg"
                          className="flex-1 w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                        />
                      </div>
                      {seoForm.metaImage && (
                        <div className="flex items-center gap-3 mt-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                            <Image src={seoForm.metaImage} alt="Meta Preview" fill unoptimized className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Meta Image Configured
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 truncate block mt-0.5">
                              {seoForm.metaImage}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Keywords */}
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-medium flex items-center justify-between">
                        <span>Keywords / Search Terms</span>
                        <span className="text-[10px] font-mono text-slate-500">Comma-separated</span>
                      </label>
                      <input
                        type="text"
                        value={seoForm.keywords}
                        onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                        placeholder="VyomAI, Artificial Intelligence, Machine Learning, Deep Tech, Enterprise AI"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                      />
                      {seoForm.keywords && (
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {seoForm.keywords
                            .split(",")
                            .map((k) => k.trim())
                            .filter(Boolean)
                            .slice(0, 8)
                            .map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-300"
                              >
                                #{tag}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Canonical URL */}
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-medium">Canonical URL</label>
                      <input
                        type="url"
                        value={seoForm.canonicalUrl}
                        onChange={(e) => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })}
                        placeholder="https://vyomai.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-mono">
                        Stored in MongoDB &amp; served via Next.js Metadata API
                      </span>
                      <button
                        type="submit"
                        disabled={isSavingSeo}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                      >
                        {isSavingSeo ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Saving SEO...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Save Page SEO</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right 5 Columns: Live SERP & Social Card Preview */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Google Desktop SERP Preview */}
                  <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Search className="w-3 h-3 text-cyan-400" /> Google Search Result Preview
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                        Desktop Snippet
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-300 font-bold">
                          V
                        </div>
                        <div className="flex items-center text-[11px] text-slate-400 truncate font-mono">
                          <span>vyomai.com</span>
                          {seoForm.pageId !== "home" && (
                            <span className="text-slate-600 ml-1">&gt; {seoForm.pageId}</span>
                          )}
                        </div>
                      </div>

                      <h4 className="text-sm font-semibold text-sky-400 hover:underline cursor-pointer line-clamp-1 leading-snug">
                        {seoForm.metaTitle || "VyomAI | Leading Autonomous Intelligence & Deep Tech Solutions"}
                      </h4>

                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {seoForm.metaDescription || "VyomAI architects production-grade artificial intelligence, neural networks, multimodal RAG systems, and autonomous enterprise software."}
                      </p>
                    </div>
                  </div>

                  {/* OpenGraph Social Card Preview */}
                  <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-cyan-400" /> Social Card Preview (OpenGraph / X)
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                        Large Card
                      </span>
                    </div>

                    <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                      <div className="relative w-full h-36 bg-slate-950">
                        <Image
                          src={seoForm.metaImage || "/images/about-hero-bg.jpg"}
                          alt="OpenGraph Preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-700 backdrop-blur-sm text-[9px] font-mono text-cyan-300 uppercase">
                          og:image
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block">
                          vyomai.com
                        </span>
                        <h5 className="text-xs font-bold text-white line-clamp-1">
                          {seoForm.metaTitle || "VyomAI Next-Gen Autonomous AI"}
                        </h5>
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                          {seoForm.metaDescription || "Next-generation deep tech solutions and AI systems."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SEO Audit Checklist */}
                  <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Activity className="w-3 h-3 text-cyan-400" /> SEO Readiness Audit
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-300">Title Length (30-65 chars)</span>
                        {seoForm.metaTitle.length >= 30 && seoForm.metaTitle.length <= 65 ? (
                          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Optimal ({seoForm.metaTitle.length})
                          </span>
                        ) : (
                          <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {seoForm.metaTitle.length} chars
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-300">Description Length (70-160 chars)</span>
                        {seoForm.metaDescription.length >= 70 && seoForm.metaDescription.length <= 160 ? (
                          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Optimal ({seoForm.metaDescription.length})
                          </span>
                        ) : (
                          <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {seoForm.metaDescription.length} chars
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-300">OpenGraph Share Image</span>
                        {seoForm.metaImage ? (
                          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Configured
                          </span>
                        ) : (
                          <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Missing
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-300">Search Keywords</span>
                        {seoForm.keywords ? (
                          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> {seoForm.keywords.split(",").filter(Boolean).length} tags
                          </span>
                        ) : (
                          <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> None
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================= MODAL: EDIT/CREATE BLOG ======================= */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingBlog ? "Edit Publication" : "Create New Publication"}
              </h3>
              <button
                onClick={() => setBlogModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setBlogForm((prev) => ({
                        ...prev,
                        title,
                        slug: generateSlug(title),
                      }));
                    }}
                    placeholder="e.g. Distributed Agentic Systems at Scale"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium flex items-center justify-between">
                    <span>URL Slug</span>
                    <span className="text-[10px] font-mono text-cyan-400">Auto-Generated</span>
                  </label>
                  <input
                    type="text"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Category *</label>
                <input
                  type="text"
                  required
                  value={blogForm.category}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  placeholder="e.g. Generative AI"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Executive Excerpt (Short Summary) *</label>
                <textarea
                  required
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="Concise 2-line executive summary of the paper..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span>Full Article Description / Body (For Details Page)</span>
                  <span className="text-[10px] font-mono text-cyan-400">Separate paragraphs with double enter</span>
                </label>
                <textarea
                  rows={5}
                  value={blogForm.description}
                  onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                  placeholder="Write the full in-depth publication paragraphs here. This content will appear on the article details page..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span>Featured Image</span>
                  <span className="text-[10px] font-mono text-cyan-400">Upload File or URL Path</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-xs">
                      {uploadingImage ? "Uploading..." : "Upload Image from Device"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "blog");
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    placeholder="/images/blog/generative-ai-arch.jpg"
                    className="flex-1 w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                  />
                </div>
                {blogForm.image && (
                  <div className="flex items-center gap-2.5 mt-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                      <Image src={blogForm.image} alt="Preview" fill unoptimized className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Selected Image
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 truncate block mt-0.5">
                        {blogForm.image}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.authorName}
                    onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Author Role</label>
                  <input
                    type="text"
                    value={blogForm.authorRole}
                    onChange={(e) => setBlogForm({ ...blogForm, authorRole: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                  placeholder="LLMs, Architecture, Distributed AI"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              {/* SEO & Social Meta Configuration (For Article Details Page) */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                    <Globe className="w-4 h-4" />
                    <span>SEO &amp; OpenGraph Metadata (Article Details Page)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Auto-falls back to article content if blank
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium flex items-center justify-between text-[11px]">
                      <span>Meta Title</span>
                      <span className="text-[10px] font-mono text-slate-500">{(blogForm.metaTitle || blogForm.title).length} chars</span>
                    </label>
                    <input
                      type="text"
                      value={blogForm.metaTitle}
                      onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                      placeholder={blogForm.title || "Custom Meta Title for Google"}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium text-[11px]">Keywords (Comma-separated)</label>
                    <input
                      type="text"
                      value={blogForm.keywords}
                      onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
                      placeholder="AI, Large Language Models, Deep Tech"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium flex items-center justify-between text-[11px]">
                    <span>Meta Description</span>
                    <span className="text-[10px] font-mono text-slate-500">{(blogForm.metaDescription || blogForm.excerpt).length} chars</span>
                  </label>
                  <textarea
                    rows={2}
                    value={blogForm.metaDescription}
                    onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                    placeholder={blogForm.excerpt || "Custom search snippet description..."}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium flex items-center justify-between text-[11px]">
                    <span>Meta Image (Social Preview)</span>
                    <span className="text-[10px] font-mono text-cyan-400">Defaults to Featured Image</span>
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="flex-1 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-xs">
                        {uploadingImage ? "Uploading..." : "Upload Meta Image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "blog-meta");
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={blogForm.metaImage}
                      onChange={(e) => setBlogForm({ ...blogForm, metaImage: e.target.value })}
                      placeholder={blogForm.image || "/images/blog/custom-og.jpg"}
                      className="flex-1 w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                    />
                  </div>
                  {blogForm.metaImage && (
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-700 mt-1">
                      <Image src={blogForm.metaImage} alt="Meta Preview" fill unoptimized className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  Save Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: EDIT/CREATE PROJECT ======================= */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? "Edit Case Study" : "Add New Case Study"}
              </h3>
              <button
                onClick={() => setProjectModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setProjectForm((prev) => ({
                        ...prev,
                        title,
                        slug: generateSlug(title),
                      }));
                    }}
                    placeholder="e.g. NeuroFinance Algorithmic Engine"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium flex items-center justify-between">
                    <span>URL Slug</span>
                    <span className="text-[10px] font-mono text-cyan-400">Auto-Generated</span>
                  </label>
                  <input
                    type="text"
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="AI & ML">AI &amp; ML</option>
                    <option value="Web & Cloud">Web &amp; Cloud</option>
                    <option value="Enterprise Systems">Enterprise Systems</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Client Industry</label>
                  <input
                    type="text"
                    required
                    value={projectForm.clientIndustry}
                    onChange={(e) => setProjectForm({ ...projectForm, clientIndustry: e.target.value })}
                    placeholder="e.g. Quantitative FinTech"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Key Result Metrics *</label>
                <input
                  type="text"
                  required
                  value={projectForm.results}
                  onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                  placeholder="e.g. 99.8% Prediction Accuracy • $1.2B Daily"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Project Description *</label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Detailed architectural summary and engineering outcome..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span>Showcase Image</span>
                  <span className="text-[10px] font-mono text-cyan-400">Upload File or URL Path</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-xs">
                      {uploadingImage ? "Uploading..." : "Upload Image from Device"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "project");
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="/images/projects/neuro-finance.jpg"
                    className="flex-1 w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                  />
                </div>
                {projectForm.image && (
                  <div className="flex items-center gap-2.5 mt-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                      <Image src={projectForm.image} alt="Preview" fill unoptimized className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Selected Image
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 truncate block mt-0.5">
                        {projectForm.image}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  placeholder="PyTorch, Rust, Apache Kafka, Redis"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              {/* SEO & Social Meta Configuration (For Project Details Page) */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                    <Globe className="w-4 h-4" />
                    <span>SEO &amp; OpenGraph Metadata (Project Showcase Page)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Auto-falls back to project content if blank
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium flex items-center justify-between text-[11px]">
                      <span>Meta Title</span>
                      <span className="text-[10px] font-mono text-slate-500">{(projectForm.metaTitle || projectForm.title).length} chars</span>
                    </label>
                    <input
                      type="text"
                      value={projectForm.metaTitle}
                      onChange={(e) => setProjectForm({ ...projectForm, metaTitle: e.target.value })}
                      placeholder={projectForm.title || "Custom Meta Title for Project"}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium text-[11px]">Keywords (Comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.keywords}
                      onChange={(e) => setProjectForm({ ...projectForm, keywords: e.target.value })}
                      placeholder="FinTech, PyTorch, Autonomous Engine"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium flex items-center justify-between text-[11px]">
                    <span>Meta Description</span>
                    <span className="text-[10px] font-mono text-slate-500">{(projectForm.metaDescription || projectForm.description).length} chars</span>
                  </label>
                  <textarea
                    rows={2}
                    value={projectForm.metaDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, metaDescription: e.target.value })}
                    placeholder={projectForm.description || "Custom snippet summary for search engines..."}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium flex items-center justify-between text-[11px]">
                    <span>Meta Image (Social Preview)</span>
                    <span className="text-[10px] font-mono text-cyan-400">Defaults to Project Image</span>
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="flex-1 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-xs">
                        {uploadingImage ? "Uploading..." : "Upload Meta Image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "project-meta");
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={projectForm.metaImage}
                      onChange={(e) => setProjectForm({ ...projectForm, metaImage: e.target.value })}
                      placeholder={projectForm.image || "/images/projects/custom-og.jpg"}
                      className="flex-1 w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                    />
                  </div>
                  {projectForm.metaImage && (
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-700 mt-1">
                      <Image src={projectForm.metaImage} alt="Meta Preview" fill unoptimized className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: EDIT/CREATE SERVICE ======================= */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingService ? "Edit Service" : "Add New Service Offering"}
              </h3>
              <button
                onClick={() => setServiceModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setServiceForm((prev) => ({
                        ...prev,
                        title,
                        slug: generateSlug(title),
                      }));
                    }}
                    placeholder="e.g. Artificial Intelligence & Machine Learning"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium flex items-center justify-between">
                    <span>URL Slug</span>
                    <span className="text-[10px] font-mono text-cyan-400">Auto-Generated</span>
                  </label>
                  <input
                    type="text"
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Icon Key</label>
                  <select
                    value={serviceForm.iconName}
                    onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Brain">Brain (AI &amp; ML)</option>
                    <option value="Sparkles">Sparkles (Generative AI)</option>
                    <option value="Code2">Code2 (Custom Software)</option>
                    <option value="Globe">Globe (Web &amp; Cloud)</option>
                    <option value="Smartphone">Smartphone (Mobile)</option>
                    <option value="CloudCog">CloudCog (DevOps / SRE)</option>
                    <option value="Palette">Palette (UI/UX Design)</option>
                    <option value="Cpu">Cpu (Hardware / Embedded)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Metrics / SLA Guarantee</label>
                  <input
                    type="text"
                    value={serviceForm.metrics}
                    onChange={(e) => setServiceForm({ ...serviceForm, metrics: e.target.value })}
                    placeholder="e.g. 99.4% Model Precision Across Production Pipelines"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Short Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  placeholder="One sentence description of the capability..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span>Full Service Description / Overview (For Details Page) *</span>
                  <span className="text-[10px] font-mono text-cyan-400">Separate paragraphs with double enter</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={serviceForm.fullDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
                  placeholder="Detailed multi-paragraph description of the engineering service, methodologies, and enterprise impact..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span>Service Featured Image</span>
                  <span className="text-[10px] font-mono text-cyan-400">Upload File or URL Path</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-xs">
                      {uploadingImage ? "Uploading..." : "Upload Image from Device"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "service");
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    value={serviceForm.image}
                    onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                    placeholder="/images/services/ai-ml.jpg"
                    className="flex-1 w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                  />
                </div>
                {serviceForm.image && (
                  <div className="flex items-center gap-2.5 mt-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                      <Image src={serviceForm.image} alt="Preview" fill unoptimized className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Selected Image
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 truncate block mt-0.5">
                        {serviceForm.image}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Technologies (Comma-separated)</label>
                <input
                  type="text"
                  value={serviceForm.technologies}
                  onChange={(e) => setServiceForm({ ...serviceForm, technologies: e.target.value })}
                  placeholder="PyTorch, CUDA, Next.js"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              {/* SEO & Social Meta Configuration (For Service Details Page) */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                    <Globe className="w-4 h-4" />
                    <span>SEO &amp; OpenGraph Metadata (Service Details Page)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Auto-falls back to service description if blank
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium flex items-center justify-between text-[11px]">
                      <span>Meta Title</span>
                      <span className="text-[10px] font-mono text-slate-500">{(serviceForm.metaTitle || serviceForm.title).length} chars</span>
                    </label>
                    <input
                      type="text"
                      value={serviceForm.metaTitle}
                      onChange={(e) => setServiceForm({ ...serviceForm, metaTitle: e.target.value })}
                      placeholder={serviceForm.title || "Custom Meta Title for Service"}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium text-[11px]">Keywords (Comma-separated)</label>
                    <input
                      type="text"
                      value={serviceForm.keywords}
                      onChange={(e) => setServiceForm({ ...serviceForm, keywords: e.target.value })}
                      placeholder="Enterprise AI, Neural Networks, Deep Tech"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium flex items-center justify-between text-[11px]">
                    <span>Meta Description</span>
                    <span className="text-[10px] font-mono text-slate-500">{(serviceForm.metaDescription || serviceForm.shortDesc).length} chars</span>
                  </label>
                  <textarea
                    rows={2}
                    value={serviceForm.metaDescription}
                    onChange={(e) => setServiceForm({ ...serviceForm, metaDescription: e.target.value })}
                    placeholder={serviceForm.shortDesc || "Custom snippet summary for search engines..."}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium flex items-center justify-between text-[11px]">
                    <span>Meta Image (Social Preview)</span>
                    <span className="text-[10px] font-mono text-cyan-400">Defaults to Service Image</span>
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="flex-1 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-xs">
                        {uploadingImage ? "Uploading..." : "Upload Meta Image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "service-meta");
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={serviceForm.metaImage}
                      onChange={(e) => setServiceForm({ ...serviceForm, metaImage: e.target.value })}
                      placeholder={serviceForm.image || "/images/services/custom-og.jpg"}
                      className="flex-1 w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                    />
                  </div>
                  {serviceForm.metaImage && (
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-700 mt-1">
                      <Image src={serviceForm.metaImage} alt="Meta Preview" fill unoptimized className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: CREATE / EDIT JOB OPENING ======================= */}
      {jobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  Careers &amp; Engineering Hiring
                </span>
                <h3 className="text-xl font-bold text-white">
                  {editingJob ? "Edit Job Position" : "Post New Engineering Position"}
                </h3>
              </div>
              <button
                onClick={() => setJobModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4 pt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setJobForm((prev) => ({
                        ...prev,
                        title,
                        slug: editingJob ? prev.slug : generateSlug(title),
                      }));
                    }}
                    placeholder="e.g. Lead Distributed Systems Architect"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.slug}
                    onChange={(e) => setJobForm({ ...jobForm, slug: generateSlug(e.target.value) })}
                    placeholder="lead-distributed-systems-architect"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Department *</label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="AI Research & Systems">AI Research & Systems</option>
                    <option value="Distributed Systems">Distributed Systems</option>
                    <option value="Full-Stack Engineering">Full-Stack Engineering</option>
                    <option value="MLOps & Security">MLOps & Security</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Core Engineering">Core Engineering</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Location</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="e.g. Remote (Global) / Bangalore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Employment Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract / Research Fellow">Contract / Research Fellow</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Experience Required</label>
                  <input
                    type="text"
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                    placeholder="e.g. 5+ Years"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Compensation Package</label>
                  <input
                    type="text"
                    value={jobForm.compensation}
                    onChange={(e) => setJobForm({ ...jobForm, compensation: e.target.value })}
                    placeholder="e.g. $140,000 – $200,000 + Top Equity"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Short Role Summary / Overview *</label>
                <textarea
                  required
                  rows={2}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="High-level overview of the mission, core challenges, and the architectural focus..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span>Key Responsibilities</span>
                  <span className="text-[10px] font-mono text-cyan-400">One bullet point per line</span>
                </label>
                <textarea
                  rows={4}
                  value={jobForm.responsibilities}
                  onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                  placeholder="Architect multi-tenant RAG pipelines and private foundation model serving clusters&#10;Design formal guardrail engines that enforce schema validation&#10;Collaborate directly with enterprise client CTOs"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-sans leading-relaxed text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span>Core Requirements</span>
                  <span className="text-[10px] font-mono text-cyan-400">One bullet point per line</span>
                </label>
                <textarea
                  rows={4}
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  placeholder="5+ years in production systems engineering and applied AI&#10;Deep experience with CUDA, vLLM, TensorRT-LLM&#10;Strong background in distributed training benchmarks"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-sans leading-relaxed text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Technology Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={jobForm.tags}
                  onChange={(e) => setJobForm({ ...jobForm, tags: e.target.value })}
                  placeholder="PyTorch, CUDA, vLLM, Python, Next.js"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
                  <input
                    type="checkbox"
                    checked={jobForm.active}
                    onChange={(e) => setJobForm({ ...jobForm, active: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-800"
                  />
                  <span>Publish and show immediately on /careers page</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {editingJob ? "Save Changes" : "Publish Job Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: VIEW INQUIRY DETAILS ======================= */}
      {viewingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  Inbound Consultation Request
                </span>
                <h3 className="text-lg font-bold text-white">{viewingContact.name}</h3>
              </div>
              <button
                onClick={() => setViewingContact(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 font-mono text-[11px]">
                <div>
                  <span className="text-slate-500 block mb-0.5">Email</span>
                  <a
                    href={`mailto:${viewingContact.email}`}
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{viewingContact.email}</span>
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Company</span>
                  <span className="text-slate-200">{viewingContact.company || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Service Requested</span>
                  <span className="text-cyan-300 font-semibold">{viewingContact.service}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Estimated Budget</span>
                  <span className="text-slate-200">{viewingContact.budget || "Flexible"}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 font-mono text-[11px] block">Project Brief &amp; Inquiry:</span>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                  {viewingContact.details}
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-mono text-[11px] block">Update Status:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdateContactStatus(viewingContact._id, "reviewed")}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] border transition-colors cursor-pointer ${
                      viewingContact.status === "reviewed"
                        ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Mark Reviewed
                  </button>
                  <button
                    onClick={() => handleUpdateContactStatus(viewingContact._id, "contacted")}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] border transition-colors cursor-pointer ${
                      viewingContact.status === "contacted"
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => handleUpdateContactStatus(viewingContact._id, "archived")}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] border transition-colors cursor-pointer ${
                      viewingContact.status === "archived"
                        ? "bg-slate-800 border-slate-600 text-slate-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => handleDeleteContact(viewingContact._id)}
                    className="px-3 py-1.5 rounded-xl font-mono text-[11px] bg-red-950/40 border border-red-900/60 text-red-400 hover:bg-red-900/40 transition-colors ml-auto cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= CAREER APPLICATION DETAILS MODAL ======================= */}
      {viewingApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  Candidate Job Application
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{viewingApplication.name}</span>
                  <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    {viewingApplication.role}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setViewingApplication(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 font-mono text-[11px]">
                <div>
                  <span className="text-slate-500 block mb-0.5">Email Address</span>
                  <a
                    href={`mailto:${viewingApplication.email}`}
                    className="text-cyan-400 hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{viewingApplication.email}</span>
                  </a>
                </div>

                <div>
                  <span className="text-slate-500 block mb-0.5">Phone Number</span>
                  {viewingApplication.phone ? (
                    <a
                      href={`tel:${viewingApplication.phone}`}
                      className="text-slate-200 hover:text-cyan-300 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{viewingApplication.phone}</span>
                    </a>
                  ) : (
                    <span className="text-slate-500">Not provided</span>
                  )}
                </div>

                <div>
                  <span className="text-slate-500 block mb-0.5">Experience Level</span>
                  <span className="text-slate-200 font-semibold">{viewingApplication.experienceYears || "3-5 Years"}</span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-0.5">Resume / CV Attached</span>
                  <span className="text-cyan-300 flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{viewingApplication.resumeFileName || "Uploaded in portal"}</span>
                  </span>
                </div>

                {viewingApplication.portfolioUrl && (
                  <div className="sm:col-span-2 pt-1 border-t border-slate-800/60">
                    <span className="text-slate-500 block mb-1">Portfolio / Profile Link</span>
                    <a
                      href={viewingApplication.portfolioUrl.startsWith("http") ? viewingApplication.portfolioUrl : `https://${viewingApplication.portfolioUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-mono transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span className="break-all">{viewingApplication.portfolioUrl}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Technical Pitch */}
              <div className="space-y-1.5">
                <span className="text-slate-400 font-mono text-[11px] block">
                  Technical Pitch &amp; Systems Highlights:
                </span>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto font-sans">
                  {viewingApplication.pitch || "No pitch statement provided by candidate."}
                </div>
              </div>

              {/* Admin Evaluation Notes */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono text-[11px] block">
                    Internal Hiring / Interview Notes:
                  </span>
                  <button
                    onClick={handleSaveApplicationNotes}
                    disabled={isUpdatingApplicationStatus}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-[10px] font-mono transition-colors cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={applicationNotesInput}
                  onChange={(e) => setApplicationNotesInput(e.target.value)}
                  placeholder="e.g. Cleared round 1 technical screen, impressive distributed training experience..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none font-sans"
                />
              </div>

              {/* Pipeline Status Actions */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-mono text-[11px] block">Hiring Pipeline Stage:</span>
                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    onClick={() => handleUpdateApplicationStatus(viewingApplication._id, "reviewed", applicationNotesInput)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] border transition-colors cursor-pointer ${
                      viewingApplication.status === "reviewed"
                        ? "bg-sky-950 border-sky-400 text-sky-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Mark Reviewed
                  </button>
                  <button
                    onClick={() => handleUpdateApplicationStatus(viewingApplication._id, "shortlisted", applicationNotesInput)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] border transition-colors cursor-pointer ${
                      viewingApplication.status === "shortlisted"
                        ? "bg-emerald-950 border-emerald-400 text-emerald-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => handleUpdateApplicationStatus(viewingApplication._id, "contacted", applicationNotesInput)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] border transition-colors cursor-pointer ${
                      viewingApplication.status === "contacted"
                        ? "bg-purple-950 border-purple-400 text-purple-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => handleUpdateApplicationStatus(viewingApplication._id, "rejected", applicationNotesInput)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] border transition-colors cursor-pointer ${
                      viewingApplication.status === "rejected"
                        ? "bg-red-950 border-red-500 text-red-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleDeleteApplication(viewingApplication._id)}
                    className="px-3 py-1.5 rounded-xl font-mono text-[11px] bg-red-950/40 border border-red-900/60 text-red-400 hover:bg-red-900/40 transition-colors ml-auto cursor-pointer"
                  >
                    Delete Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
