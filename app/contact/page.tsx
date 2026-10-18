import { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { MessageSquare } from "lucide-react";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";
export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const seo = await getPageSeoFromDb("contact");
  return constructMetadata({
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaImage: seo.metaImage,
    keywords: seo.keywords,
    canonicalUrl: seo.canonicalUrl || "https://vyomai.com/contact",
  });
}

export default function ContactPage() {
  return (
    <div className="pt-28 pb-16 overflow-hidden">
      {/* Top Banner */}
      <section className="relative py-12 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Direct Engineering Line</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Let&apos;s Architect Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500">
              AI Future
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our principal solutions architects review every inquiry promptly to provide comprehensive architectural feedback and timeline estimates.
          </p>
        </div>
      </section>

      {/* Embedded Contact Component */}
      <ContactSection />
    </div>
  );
}
