import type { Metadata } from "next";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";
import { BlogPageClient } from "@/components/blog/BlogPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeoFromDb("blog");
  return constructMetadata({
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/blog",
  });
}

export default function BlogPage() {
  return <BlogPageClient />;
}
