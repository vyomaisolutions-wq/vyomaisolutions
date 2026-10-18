import type { Metadata } from "next";
import { getPageSeoFromDb, getProjectsFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";
import { PortfolioPageClient } from "@/components/portfolio/PortfolioPageClient";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const seo = await getPageSeoFromDb("portfolio");
  return constructMetadata({
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/portfolio",
  });
}

export default async function PortfolioPage() {
  "use cache";
  const { data: projects } = await getProjectsFromDb();
  const initialProjects = JSON.parse(JSON.stringify(projects || []));

  return <PortfolioPageClient initialProjects={initialProjects} />;
}
