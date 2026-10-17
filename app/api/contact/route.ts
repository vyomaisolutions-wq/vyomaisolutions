import { NextRequest, NextResponse } from "next/server";
import { getContactsFromDb, createContactInDb } from "@/lib/db-service";

export async function GET() {
  const result = await getContactsFromDb();
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.details) {
      return NextResponse.json(
        { error: "Name, email, and details are required fields." },
        { status: 400 }
      );
    }

    const result = await createContactInDb({
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company ? body.company.trim() : undefined,
      service: body.service || "General Technical Consultation",
      budget: body.budget || "Not Specified",
      details: body.details.trim(),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
