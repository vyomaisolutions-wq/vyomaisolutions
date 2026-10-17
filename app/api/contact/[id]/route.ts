import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await req.json();
  const conn = await connectToDatabase();

  if (conn && mongoose.isValidObjectId(id)) {
    const updated = await Contact.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  }

  return NextResponse.json({ success: true, data: { ...body, id } });
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const conn = await connectToDatabase();

  if (conn && mongoose.isValidObjectId(id)) {
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Inquiry not found to delete" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  }

  return NextResponse.json({ success: true, message: "Inquiry removed" });
}
