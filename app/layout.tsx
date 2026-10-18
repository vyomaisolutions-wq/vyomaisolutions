import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#050b14",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vyomai.com"),
  title: "VyomAI — Engineering the Future with AI & Bespoke Software",
  description:
    "VyomAI architects high-impact Artificial Intelligence systems, generative AI workflows, and mission-critical software solutions for forward-thinking enterprises worldwide.",
  keywords: [
    "Artificial Intelligence",
    "Machine Learning",
    "Generative AI",
    "Custom Software Development",
    "Cloud Architecture",
    "DevOps",
    "Next.js Enterprise",
    "VyomAI",
  ],
  authors: [{ name: "VyomAI Technologies" }],
  creator: "VyomAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vyomai.com",
    title: "VyomAI — Engineering the Future with AI",
    description:
      "Enterprise Artificial Intelligence, autonomous agents, and high-performance cloud platforms engineered for scale.",
    siteName: "VyomAI",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "VyomAI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VyomAI — Engineering the Future with AI",
    description:
      "Enterprise Artificial Intelligence, autonomous agents, and high-performance cloud platforms.",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden w-full">
        <Suspense fallback={<div className="h-20 w-full" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 w-full min-w-0 overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
