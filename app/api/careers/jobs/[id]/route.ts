import { NextRequest, NextResponse } from "next/server";
import { updateJobInDb, deleteJobFromDb } from "@/lib/db-service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();

    const result = await updateJobInDb(id, body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update job opening." },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[Job API] Error updating job opening:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await deleteJobFromDb(id);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to delete job opening." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Job opening deleted successfully." });
  } catch (err) {
    console.error("[Job API] Error deleting job opening:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
