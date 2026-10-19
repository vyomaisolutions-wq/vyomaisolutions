import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/models/Project";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();

  const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
  const project = await Project.findOne(query);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ data: project });
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await req.json();
  const conn = await connectToDatabase();

  if (conn) {
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const updated = await Project.findOneAndUpdate(query, { $set: body }, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Project not found to update" }, { status: 404 });
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
    await Project.findOneAndDelete({ $or: orConditions });
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  }

  return NextResponse.json({ success: true, message: "Project removed" });
}
