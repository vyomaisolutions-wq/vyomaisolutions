import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJob extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true, index: true },
    location: { type: String, required: true, trim: true, default: "Remote (Global) / Bangalore" },
    type: { type: String, required: true, trim: true, default: "Full-Time" },
    experience: { type: String, required: true, trim: true, default: "3-5 Years" },
    compensation: { type: String, trim: true, default: "Competitive Market Rate + Equity" },
    description: { type: String, required: true, trim: true },
    responsibilities: [{ type: String, trim: true }],
    requirements: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const Job: Model<IJob> =
  mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
