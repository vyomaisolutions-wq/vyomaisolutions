import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "neuro-finance";
  return NextResponse.redirect(new URL(`/images/projects/${id}.jpg`, request.url), 307);
}
