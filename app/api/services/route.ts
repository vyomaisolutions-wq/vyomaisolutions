import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { getServicesFromDb } from "@/lib/db-service";

export async function GET() {
  const result = await getServicesFromDb();
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const conn = await connectToDatabase();

    if (!body.title || !body.shortDesc) {
      return NextResponse.json(
        { error: "Title and short description are required" },
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
      fullDesc: body.fullDesc || body.shortDesc,
      iconName: body.iconName || "Brain",
      features: body.features || [],
      technologies: body.technologies || [],
      metrics: body.metrics || "99.9% Uptime Guarantee",
      active: body.active !== undefined ? body.active : true,
    };

    if (conn) {
      const created = await Service.create(payload);
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
