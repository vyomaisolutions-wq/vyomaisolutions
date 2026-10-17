import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  slug: string;
  title: string;
  category: "AI & ML" | "Web & Cloud" | "Enterprise Systems" | "Mobile" | string;
  clientIndustry: string;
  description: string;
  results: string;
  technologies: string[];
  image?: string;
  gradient: string;
  accentColor: string;
  sampleBadge: string;
  featured: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  keywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
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
    category: {
      type: String,
      required: true,
      index: true,
      default: "AI & ML",
    },
    clientIndustry: { type: String, required: true },
    description: { type: String, required: true },
    results: { type: String, required: true },
    technologies: [{ type: String }],
    image: { type: String },
    gradient: {
      type: String,
      default: "from-cyan-500/20 via-blue-500/10 to-transparent",
    },
    accentColor: { type: String, default: "#00f0ff" },
    sampleBadge: {
      type: String,
      default: "Showcase Case Study (Sample Client)",
    },
    featured: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaImage: { type: String, trim: true },
    keywords: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
