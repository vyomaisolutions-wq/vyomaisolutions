import { NextRequest, NextResponse } from "next/server";
import {
  updateCareerApplicationStatusInDb,
  deleteCareerApplicationFromDb,
} from "@/lib/db-service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.status) {
      return NextResponse.json(
        { error: "Status field is required." },
        { status: 400 }
      );
    }

    const result = await updateCareerApplicationStatusInDb(
      id,
      body.status,
      body.notes
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update application." },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[Career API] Update application error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await deleteCareerApplicationFromDb(id);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to delete application." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Application deleted successfully." });
  } catch (err) {
    console.error("[Career API] Delete application error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
