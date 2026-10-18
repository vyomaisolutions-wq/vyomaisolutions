import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  source: string;
  status: "active" | "unsubscribed";
  ipAddress?: string;
  userAgent?: string;
  notifiedAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    source: {
      type: String,
      default: "Subscribe",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
      index: true,
    },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    notifiedAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Subscriber: Model<ISubscriber> =
  mongoose.models.Subscriber ||
  mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
