import type { Metadata } from "next";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";
import { PortfolioPageClient } from "@/components/portfolio/PortfolioPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeoFromDb("portfolio");
  return constructMetadata({
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/portfolio",
  });
}

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
