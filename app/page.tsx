import type { Metadata } from "next";
import {
  getPageSeoFromDb,
  getServicesFromDb,
  getProjectsFromDb,
  getBlogsFromDb,
} from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CTASection } from "@/components/sections/CTASection";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const seo = await getPageSeoFromDb("home");
  return constructMetadata({
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com",
  });
}

export default async function Home() {
  "use cache";
  const [servicesRes, projectsRes, blogsRes] = await Promise.all([
    getServicesFromDb(),
    getProjectsFromDb(),
    getBlogsFromDb(),
  ]);

  const initialServices = JSON.parse(JSON.stringify(servicesRes?.data || [])).slice(0, 8);
  const initialProjects = JSON.parse(JSON.stringify(projectsRes?.data || []));
  const initialPosts = JSON.parse(JSON.stringify(blogsRes?.data || [])).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Trusted By / Highlights */}
      <TrustedBy />

      {/* Section 3: About Us */}
      <AboutSection />

      {/* Section 4: Core Services */}
      <ServicesSection initialServices={initialServices} />

      {/* Section 5: Why Choose Us */}
      <WhyChooseUs />

      {/* Section 6: Portfolio & Case Studies */}
      <PortfolioSection initialProjects={initialProjects} />

      {/* Section 7: Client Testimonials */}
      <TestimonialsSection />

      {/* Section 8: Research & Insights */}
      <BlogSection initialPosts={initialPosts} />

      {/* Section 9: Conversion CTA Banner */}
      <CTASection />
    </div>
  );
}
