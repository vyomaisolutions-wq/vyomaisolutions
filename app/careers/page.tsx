import { Metadata } from "next";
import { CareersClient } from "@/components/careers/CareersClient";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeoFromDb("careers");
  return constructMetadata({
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/careers",
  });
}

export default function CareersPage() {
  return <CareersClient />;
}
