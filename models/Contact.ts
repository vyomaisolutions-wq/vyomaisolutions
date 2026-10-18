import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
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
    phone: { type: String, trim: true, default: "" },
    company: { type: String, trim: true, default: "" },
    service: { type: String, default: "General Technical Consultation", trim: true },
    details: { type: String, default: "Inquiry submitted via web portal", trim: true },
    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "archived"],
      default: "new",
      index: true,
    },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
