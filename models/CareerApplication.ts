import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICareerApplication extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const CareerApplicationSchema = new Schema<ICareerApplication>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    role: { type: String, required: true, trim: true },
    experienceYears: { type: String, default: "3-5" },
    portfolioUrl: { type: String, trim: true },
    resumeFileName: { type: String, trim: true },
    pitch: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "reviewed", "shortlisted", "contacted", "rejected"],
      default: "new",
      index: true,
    },
    notes: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export const CareerApplication: Model<ICareerApplication> =
  mongoose.models.CareerApplication ||
  mongoose.model<ICareerApplication>("CareerApplication", CareerApplicationSchema);
