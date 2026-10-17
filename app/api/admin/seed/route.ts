import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "Database seeding has been permanently disabled. Please upload your publications, case studies, and services directly through the Admin Panel.",
    },
    { status: 400 }
  );
}
