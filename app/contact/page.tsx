import { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { Sparkles, Shield, Clock, MessageSquare, MapPin } from "lucide-react";
import { companyInfo } from "@/data/company";
import { getPageSeoFromDb } from "@/lib/db-service";
import { constructMetadata } from "@/lib/seo-helper";

export async function generateMetadata(): Promise<Metadata> {
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
            Our principal solutions architects review every inquiry within 4 business hours to provide architectural feedback and timeline estimates.
          </p>
        </div>
      </section>

      {/* Embedded Contact Component */}
      <ContactSection />

      {/* Global Locations Detail Cards */}
      <section className="py-16 bg-slate-950/80 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              Physical Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Global Presence &amp; Collaborative Spaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {companyInfo.contact.locations.map((loc) => (
              <div
                key={loc.city}
                className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{loc.city}</h3>
                    <p className="text-xs font-mono text-slate-400">{loc.country}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-6">{loc.address}</p>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>In-Person Discovery</span>
                  <span className="text-cyan-400">By Appointment</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
