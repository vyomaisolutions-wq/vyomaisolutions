import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageSeo extends Document {
  pageId: string; // e.g. "home", "about", "services", "blog", "portfolio", "careers", "contact"
  pageName: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  keywords: string;
  canonicalUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PageSeoSchema = new Schema<IPageSeo>(
  {
    pageId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    pageName: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
    },
    metaImage: {
      type: String,
      default: "/images/logo.jpg",
      trim: true,
    },
    keywords: {
      type: String,
      default: "",
      trim: true,
    },
    canonicalUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PageSeo: Model<IPageSeo> =
  mongoose.models.PageSeo || mongoose.model<IPageSeo>("PageSeo", PageSeoSchema);
