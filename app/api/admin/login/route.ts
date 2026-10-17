import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "vyomai@2026";

    if (username === expectedUser && password === expectedPass) {
      return NextResponse.json({
        success: true,
        token: "vyomai_jwt_" + Buffer.from(`${username}:${Date.now()}`).toString("base64"),
        user: {
          username: expectedUser,
          role: "Principal Administrator",
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
