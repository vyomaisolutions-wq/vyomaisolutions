import type { Metadata } from "next";

export interface SeoInput {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  keywords?: string | string[];
  canonicalUrl?: string;
}

const DEFAULT_TITLE = "VyomAI — Engineering the Future with AI & Bespoke Software";
const DEFAULT_DESC =
  "VyomAI architects high-impact Artificial Intelligence systems, generative AI workflows, and mission-critical software solutions for forward-thinking enterprises worldwide.";
const DEFAULT_IMAGE = "/images/logo.jpg";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vyomai.com";

export function constructMetadata(input: SeoInput): Metadata {
  const title = input.metaTitle?.trim() || DEFAULT_TITLE;
  const description = input.metaDescription?.trim() || DEFAULT_DESC;
  const image = input.metaImage?.trim() || DEFAULT_IMAGE;

  let keywordsArray: string[] = [];
  if (Array.isArray(input.keywords)) {
    keywordsArray = input.keywords.map((k) => k.trim()).filter(Boolean);
  } else if (typeof input.keywords === "string") {
    keywordsArray = input.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
  }

  const imageUrl = image.startsWith("http")
    ? image
    : `${BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;

  const canonical = input.canonicalUrl
    ? input.canonicalUrl
    : undefined;

  return {
    title,
    description,
    keywords: keywordsArray.length > 0 ? keywordsArray : undefined,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      siteName: "VyomAI",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
