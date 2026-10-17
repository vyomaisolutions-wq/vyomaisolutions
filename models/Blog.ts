import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogSection {
  heading: string;
  paragraphs: string[];
  keyPoints?: string[];
  callout?: string;
}

export interface IBlog extends Document {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  image: string;
  gradient?: string;
  tags: string[];
  content?: string[];
  description?: string;
  sections?: IBlogSection[];
  conclusion?: string;
  isPublished: boolean;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  keywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSectionSchema = new Schema<IBlogSection>(
  {
    heading: { type: String, required: true },
    paragraphs: [{ type: String, required: true }],
    keyPoints: [{ type: String }],
    callout: { type: String },
  },
  { _id: false }
);

const BlogSchema = new Schema<IBlog>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true, index: true },
    readTime: { type: String, default: "5 min read" },
    publishedDate: { type: String, required: true },
    author: {
      name: { type: String, required: true, default: "VyomAI Research Team" },
      role: { type: String, default: "Principal AI Architect" },
      avatar: { type: String },
    },
    image: { type: String, required: true },
    gradient: { type: String, default: "from-cyan-500/20 via-blue-600/10 to-transparent" },
    tags: [{ type: String }],
    content: [{ type: String }],
    description: { type: String },
    sections: [BlogSectionSchema],
    conclusion: { type: String },
    isPublished: { type: Boolean, default: true, index: true },
    views: { type: Number, default: 0 },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaImage: { type: String, trim: true },
    keywords: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Prevent recompilation in Next.js hot reload
export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
