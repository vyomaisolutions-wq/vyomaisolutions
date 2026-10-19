import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/models/Service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();

  const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
  const service = await Service.findOne(query);

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json({ data: service });
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await req.json();
  const conn = await connectToDatabase();

  if (conn) {
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const updated = await Service.findOneAndUpdate(query, { $set: body }, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Service not found to update" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  }

  return NextResponse.json({ success: true, data: { ...body, id } });
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const decoded = decodeURIComponent(id).trim();
  const conn = await connectToDatabase();

  if (conn) {
    const orConditions: Array<Record<string, unknown>> = [
      { slug: decoded },
      { slug: decoded.toLowerCase() },
    ];
    if (mongoose.isValidObjectId(decoded)) {
      orConditions.unshift({ _id: decoded });
    }
    await Service.findOneAndDelete({ $or: orConditions });
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  }

  return NextResponse.json({ success: true, message: "Service removed" });
}
