import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { getBlogsFromDb } from "@/lib/db-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;

  const result = await getBlogsFromDb({ category, search });
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const conn = await connectToDatabase();

    if (!body.title || !body.excerpt) {
      return NextResponse.json(
        { error: "Title and excerpt are required" },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const payload = {
      ...body,
      slug,
      publishedDate:
        body.publishedDate ||
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      image: body.image || "/images/blog/generative-ai-arch.jpg",
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
    };

    if (conn) {
      const created = await Blog.create(payload);
      return NextResponse.json({ success: true, data: created, source: "mongodb" }, { status: 201 });
    }

    return NextResponse.json(
      { success: true, data: { _id: "temp-" + Date.now(), ...payload }, source: "fallback" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
