import { NextRequest, NextResponse } from "next/server";
import {
  createSubscriberInDb,
  getSubscribersFromDb,
  deleteSubscriberFromDb,
} from "@/lib/db-service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const result = await getSubscribersFromDb({ search });
    return NextResponse.json(result);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Failed to retrieve subscribers", details: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = (body.email || "").trim().toLowerCase();

    if (!rawEmail) {
      return NextResponse.json(
        { error: "Please enter an email address." },
        { status: 400 }
      );
    }

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await createSubscriberInDb({
      email: rawEmail,
      source: body.source || "Subscribe",
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[Newsletter API] Error subscribing email:", err);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Subscriber ID is required." },
        { status: 400 }
      );
    }

    const result = await deleteSubscriberFromDb(id);
    return NextResponse.json(result);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Failed to delete subscriber", details: String(err) },
      { status: 500 }
    );
  }
}
