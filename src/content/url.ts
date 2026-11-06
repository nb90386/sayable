/**
 * The canonical origin. Set NEXT_PUBLIC_SITE_URL when a custom domain exists;
 * until then the public Vercel production alias is the canonical address.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sayable-site.vercel.app").replace(/\/$/, "");
export const isProductionDeploy = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
