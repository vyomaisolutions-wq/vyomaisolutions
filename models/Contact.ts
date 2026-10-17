import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  details: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true },
    service: { type: String, required: true },
    budget: { type: String, default: "Not Specified" },
    details: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "archived"],
      default: "new",
      index: true,
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
