import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/images/about-hero-bg.jpg", request.url), 307);
}
