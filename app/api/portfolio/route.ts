import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { getProjectsFromDb } from "@/lib/db-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;

  const result = await getProjectsFromDb(category);
  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const conn = await connectToDatabase();

    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const payload = {
      ...body,
      slug,
      category: body.category || "AI & ML",
      clientIndustry: body.clientIndustry || "Enterprise Tech",
      results: body.results || "Production Validated",
      technologies: body.technologies || ["TypeScript", "Python"],
      gradient: body.gradient || "from-cyan-500/20 via-blue-500/10 to-transparent",
      accentColor: body.accentColor || "#00f0ff",
      sampleBadge: body.sampleBadge || "Showcase Case Study",
      featured: body.featured !== undefined ? body.featured : true,
    };

    if (conn) {
      const created = await Project.create(payload);
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
