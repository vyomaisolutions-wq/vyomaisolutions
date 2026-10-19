import { NextRequest, NextResponse } from "next/server";
import { updateTestimonialInDb, deleteTestimonialFromDb } from "@/lib/db-service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();

    const result = await updateTestimonialInDb(id, body);
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to update testimonial" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await deleteTestimonialFromDb(id);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
