import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SOURCE_PATH = "C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\4462a002-87b1-42c5-845d-3ba58806a6dc\\cosmic_particle_wave_1791916582225.jpg";
const DEST_PATH = path.join(process.cwd(), "public", "images", "hero-wave.jpg");

export async function GET() {
  try {
    // If destination doesn't exist, copy from source
    if (fs.existsSync(SOURCE_PATH)) {
      if (!fs.existsSync(DEST_PATH)) {
        const destDir = path.dirname(DEST_PATH);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(SOURCE_PATH, DEST_PATH);
      }
      const buffer = fs.readFileSync(SOURCE_PATH);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (fs.existsSync(DEST_PATH)) {
      const buffer = fs.readFileSync(DEST_PATH);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
