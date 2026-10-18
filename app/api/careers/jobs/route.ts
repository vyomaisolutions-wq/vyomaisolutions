import { NextRequest, NextResponse } from "next/server";
import { getJobsFromDb, createJobInDb } from "@/lib/db-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get("activeOnly") === "true";
  const department = searchParams.get("department") || undefined;
  const search = searchParams.get("search") || undefined;

  const result = await getJobsFromDb({ activeOnly, department, search });
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.department || !body.description) {
      return NextResponse.json(
        { error: "Title, department, and description are required fields." },
        { status: 400 }
      );
    }

    const result = await createJobInDb({
      title: body.title,
      slug: body.slug,
      department: body.department,
      location: body.location,
      type: body.type,
      experience: body.experience,
      compensation: body.compensation,
      description: body.description,
      responsibilities: body.responsibilities,
      requirements: body.requirements,
      tags: body.tags,
      featured: body.featured,
      active: body.active !== undefined ? body.active : true,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create job opening." },
        { status: 500 }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("[Job API] Error creating job opening:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
