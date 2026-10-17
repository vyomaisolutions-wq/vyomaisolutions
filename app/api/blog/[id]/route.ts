import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { blogPosts } from "@/data/blog";
import { deleteBlogFromDb } from "@/lib/db-service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const decoded = decodeURIComponent(id).trim();
  await connectToDatabase();

  const staticMatch = blogPosts.find((p) => p.id === decoded || p.slug === decoded);
  const targetSlug = staticMatch ? staticMatch.slug : decoded;

  const orConditions: Array<Record<string, unknown>> = [
    { slug: decoded },
    { slug: decoded.toLowerCase() },
    { slug: targetSlug },
    { slug: targetSlug.toLowerCase() },
  ];
  if (mongoose.isValidObjectId(decoded)) {
    orConditions.unshift({ _id: decoded });
  }

  const blog = await Blog.findOne({ $or: orConditions });

  if (!blog) {
    if (staticMatch) {
      return NextResponse.json({ data: staticMatch });
    }
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json({ data: blog });
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const decoded = decodeURIComponent(id).trim();
  const body = await req.json();
  const conn = await connectToDatabase();

  if (conn) {
    const staticMatch = blogPosts.find((p) => p.id === decoded || p.slug === decoded);
    const targetSlug = staticMatch ? staticMatch.slug : decoded;

    const orConditions: Array<Record<string, unknown>> = [
      { slug: decoded },
      { slug: decoded.toLowerCase() },
      { slug: targetSlug },
      { slug: targetSlug.toLowerCase() },
    ];
    if (mongoose.isValidObjectId(decoded)) {
      orConditions.unshift({ _id: decoded });
    }

    const updated = await Blog.findOneAndUpdate(
      { $or: orConditions },
      { $set: body },
      { new: true }
    );
    if (!updated) {
      const created = await Blog.create({
        ...body,
        slug: body.slug || targetSlug,
      });
      return NextResponse.json({ success: true, data: created });
    }
    return NextResponse.json({ success: true, data: updated });
  }

  return NextResponse.json({ success: true, data: { ...body, id: decoded } });
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await deleteBlogFromDb(id);
    return NextResponse.json({
      message: "Article deleted successfully",
      ...result,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Error deleting article: " + (err as Error).message },
      { status: 500 }
    );
  }
}
