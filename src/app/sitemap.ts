import type { MetadataRoute } from "next";
import { resources } from "@/content/resources";
import { SITE_URL } from "@/content/url";

const routes = [
  "",
  "/product",
  "/readiness-audit",
  "/how-it-works",
  "/verify",
  "/solutions",
  "/solutions/government",
  "/solutions/agencies",
  "/resources",
  "/about",
  "/security",
  "/contact",
  "/accessibility",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-05");
  return [
    ...routes.map((r) => ({
      url: `${SITE_URL}${r}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : r === "/readiness-audit" ? 0.9 : 0.6,
    })),
    ...resources.map((g) => ({ url: `${SITE_URL}/resources/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
