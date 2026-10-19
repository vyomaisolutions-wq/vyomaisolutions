import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  avatarInitials: string;
  quote: string;
  rating: number;
  metric: string;
  isSample: boolean;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    avatarInitials: { type: String, trim: true, default: "" },
    quote: { type: String, required: true, trim: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    metric: { type: String, required: true, trim: true },
    isSample: { type: Boolean, default: false },
    active: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to ensure avatar initials are set
TestimonialSchema.pre("save", function () {
  if (!this.avatarInitials && this.name) {
    const parts = this.name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      this.avatarInitials = parts[0].slice(0, 2).toUpperCase();
    } else {
      // Ignore titles like Dr., Mr., etc. if there are multiple parts
      const cleanParts = parts.filter((p) => !/^(dr\.?|mr\.?|mrs\.?|ms\.?|prof\.?)$/i.test(p));
      const targetParts = cleanParts.length >= 2 ? cleanParts : parts;
      this.avatarInitials = (targetParts[0][0] + targetParts[targetParts.length - 1][0]).toUpperCase();
    }
  }
});

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
