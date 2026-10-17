import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_MAP: Record<string, string> = {
  "neuro-finance": "C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\4462a002-87b1-42c5-845d-3ba58806a6dc\\fintech_ai_visual_1791918099607.jpg",
  "synapse-health": "C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\4462a002-87b1-42c5-845d-3ba58806a6dc\\medtech_ai_visual_1791918121553.jpg",
  "aerologix-cloud": "C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\4462a002-87b1-42c5-845d-3ba58806a6dc\\logistics_ai_visual_1791918145793.jpg",
  "pulsecloud-platform": "C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\4462a002-87b1-42c5-845d-3ba58806a6dc\\ai_about_visual_1791917439025.jpg",
  "omnistore-ar": "C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\4462a002-87b1-42c5-845d-3ba58806a6dc\\ai_hero_visual_1791916220518.jpg",
  "veritas-gov": "C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\4462a002-87b1-42c5-845d-3ba58806a6dc\\ai_neural_synapse_1791916390479.jpg",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sourcePath = IMAGE_MAP[id] || IMAGE_MAP["neuro-finance"];
  const destDir = path.join(process.cwd(), "public", "images", "projects");
  const destPath = path.join(destDir, `${id}.jpg`);

  try {
    if (fs.existsSync(sourcePath)) {
      if (!fs.existsSync(destPath)) {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(sourcePath, destPath);
      }
      const buffer = fs.readFileSync(sourcePath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (fs.existsSync(destPath)) {
      const buffer = fs.readFileSync(destPath);
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
