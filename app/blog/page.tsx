import type { Metadata } from "next";
import { getPageSeoFromDb, getBlogsFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";
import { BlogPageClient } from "@/components/blog/BlogPageClient";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const seo = await getPageSeoFromDb("blog");
  return constructMetadata({
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/blog",
  });
}

export default async function BlogPage() {
  "use cache";
  const { data: posts } = await getBlogsFromDb();
  const initialPosts = JSON.parse(JSON.stringify(posts || []));

  return <BlogPageClient initialPosts={initialPosts} />;
}
