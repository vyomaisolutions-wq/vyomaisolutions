import { NextRequest, NextResponse } from "next/server";
import { getTestimonialsFromDb, createTestimonialInDb } from "@/lib/db-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || undefined;
  const activeOnly = searchParams.get("activeOnly") === "true";

  const result = await getTestimonialsFromDb({ search, activeOnly });
  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.quote || !body.metric) {
      return NextResponse.json(
        { error: "Client Name, Quote, and Verified Outcome Metric are required" },
        { status: 400 }
      );
    }

    const result = await createTestimonialInDb({
      name: body.name,
      role: body.role || "Technical Leader",
      company: body.company || "Enterprise Client",
      quote: body.quote,
      rating: body.rating !== undefined ? Number(body.rating) : 5,
      metric: body.metric,
      avatarInitials: body.avatarInitials,
      isSample: body.isSample !== undefined ? Boolean(body.isSample) : false,
      active: body.active !== undefined ? Boolean(body.active) : true,
      order: body.order ? Number(body.order) : 0,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
