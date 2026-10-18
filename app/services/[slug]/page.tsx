import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, Service } from "@/data/services";
import { getServiceBySlugFromDb, getServicesFromDb } from "@/lib/db-service";
import { ServiceDetailClient } from "@/components/services/ServiceDetailClient";
import { constructMetadata } from "@/lib/seo-helper";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  "use cache";
  const { slug } = await params;
  const { data: service } = await getServiceBySlugFromDb(slug);

  if (!service) {
    return {
      title: "Service Not Found — VyomAI",
      description: "The requested engineering service capability could not be located.",
    };
  }

  const s = service as any;
  const fallbackKeywords = [...(s.technologies || []), ...(s.features || []), "AI engineering"];

  return constructMetadata({
    metaTitle: s.metaTitle || `${s.title} — VyomAI Enterprise Services`,
    metaDescription: s.metaDescription || s.shortDesc || s.fullDesc,
    metaImage: s.metaImage || s.image || "/images/services/ai-ml.jpg",
    keywords: s.keywords && (Array.isArray(s.keywords) ? s.keywords.length > 0 : s.keywords.trim()) ? s.keywords : fallbackKeywords,
    canonicalUrl: `https://vyomai.com/services/${slug}`,
  });
}

export async function generateStaticParams() {
  const { data: services } = await getServicesFromDb();
  const list = services && services.length > 0 ? services : servicesData;
  return list.map((s: any) => ({
    slug: s.slug || s.id,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  "use cache";
  const { slug } = await params;
  const [{ data: service }, { data: allServices }] = await Promise.all([
    getServiceBySlugFromDb(slug),
    getServicesFromDb(),
  ]);

  if (!service) {
    notFound();
  }

  const currentKey = service.slug || ((service as { id?: string }).id);
  const otherServices = ((allServices || []) as Service[]).filter(
    (s) => (s.slug || s.id) !== currentKey
  );

  return (
    <ServiceDetailClient
      service={service as unknown as Service}
      otherServices={otherServices as unknown as Service[]}
    />
  );
}

