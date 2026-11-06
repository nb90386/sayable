import type { MetadataRoute } from "next";
import { SITE_URL, isProductionDeploy } from "@/content/url";

/** Production is indexable; previews and local builds are not. */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeploy) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
