import { NextRequest, NextResponse } from "next/server";
import { getAllPageSeoFromDb, getPageSeoFromDb, upsertPageSeoInDb } from "@/lib/db-service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get("pageId");

    if (pageId) {
      const seo = await getPageSeoFromDb(pageId);
      return NextResponse.json({ success: true, data: seo });
    }

    const allSeo = await getAllPageSeoFromDb();
    return NextResponse.json({ success: true, data: allSeo });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pageId, pageName, metaTitle, metaDescription, metaImage, keywords, canonicalUrl } = body;

    if (!pageId || !metaTitle || !metaDescription) {
      return NextResponse.json(
        { success: false, error: "pageId, metaTitle, and metaDescription are required." },
        { status: 400 }
      );
    }

    const result = await upsertPageSeoInDb(pageId, {
      pageName,
      metaTitle,
      metaDescription,
      metaImage,
      keywords,
      canonicalUrl,
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
