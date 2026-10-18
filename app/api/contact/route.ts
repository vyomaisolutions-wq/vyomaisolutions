import { NextRequest, NextResponse } from "next/server";
import { getContactsFromDb, createContactInDb } from "@/lib/db-service";

export async function GET() {
  const result = await getContactsFromDb();
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = (body.name || body.fullName || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const rawPhone = (body.phone || body.mobile || body.phoneNumber || "").trim();
    const phone = rawPhone.replace(/\D/g, "");
    const company = (body.company || "").trim() || undefined;
    const service = (body.service || "General Technical Consultation").trim();
    const details = (body.details || body.message || body.projectGoals || "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid corporate email address." },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Mobile / Phone number is required." },
        { status: 400 }
      );
    }

    if (phone.length !== 10) {
      return NextResponse.json(
        { error: "Phone number must be exactly 10 digits." },
        { status: 400 }
      );
    }

    const result = await createContactInDb({
      name,
      email,
      phone,
      company,
      service: service || "General Technical Consultation",
      details: details || "Not provided (optional)",
    });

    if (!result || !(result as { success?: boolean }).success) {
      return NextResponse.json(
        { error: (result as { error?: string })?.error || "Failed to save contact inquiry." },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("[Contact API] Error handling POST:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
