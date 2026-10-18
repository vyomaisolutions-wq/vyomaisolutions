import { NextRequest, NextResponse } from "next/server";
import { getCareerApplicationsFromDb, createCareerApplicationInDb } from "@/lib/db-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;

  const result = await getCareerApplicationsFromDb({ status, search });
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { error: "Candidate name, email, and role applied for are required fields." },
        { status: 400 }
      );
    }

    const result = await createCareerApplicationInDb({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone ? body.phone.trim() : undefined,
      role: body.role.trim(),
      experienceYears: body.experienceYears || "3-5",
      portfolioUrl: body.portfolioUrl ? body.portfolioUrl.trim() : undefined,
      resumeFileName: body.resumeFileName ? body.resumeFileName.trim() : undefined,
      pitch: body.pitch ? body.pitch.trim() : undefined,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("[Career API] Application submission error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
