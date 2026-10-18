import type { Metadata } from "next";
import { getPageSeoFromDb, getServicesFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";
import { ServicesPageClient } from "@/components/services/ServicesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const seo = await getPageSeoFromDb("services");
  return constructMetadata({
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/services",
  });
}

export default async function ServicesPage() {
  "use cache";
  const { data: services } = await getServicesFromDb();
  const initialServices = JSON.parse(JSON.stringify(services || []));

  return <ServicesPageClient initialServices={initialServices} />;
}
