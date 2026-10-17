import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image?: string;
  iconName: string;
  features: string[];
  technologies: string[];
  metrics: string;
  order: number;
  active: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  keywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
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
    shortDesc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    image: { type: String, default: "" },
    iconName: { type: String, default: "Brain" },
    features: [{ type: String }],
    technologies: [{ type: String }],
    metrics: { type: String, default: "Enterprise SLA Guarantee" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true, index: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaImage: { type: String, trim: true },
    keywords: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
