import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products";
import { site } from "@/lib/site";

/* Generated from the product registry, so a new SKU cannot be added
   without appearing in the sitemap. */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const slugs = await getAllSlugs();

  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/products", priority: 0.9, freq: "weekly" },
    { path: "/products/concretes-absolutes", priority: 0.9, freq: "weekly" },
    { path: "/products/essential-oils", priority: 0.9, freq: "weekly" },
    { path: "/catalogue", priority: 0.8, freq: "monthly" },
    { path: "/process", priority: 0.7, freq: "monthly" },
    { path: "/traceability", priority: 0.7, freq: "monthly" },
    { path: "/quality-documents", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "monthly" },
    { path: "/request-quote", priority: 0.6, freq: "monthly" },
    { path: "/request-sample", priority: 0.6, freq: "monthly" },
    { path: "/privacy", priority: 0.2, freq: "monthly" },
    { path: "/terms", priority: 0.2, freq: "monthly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...slugs.map((slug) => ({
      url: `${site.url}/products/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
