import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3100",
    // Fake audio output: playback timing no longer depends on the host machine's sound device.
    launchOptions: { executablePath: process.env.PW_CHROME || undefined, args: ["--disable-audio-output"] },
    // Protected Vercel previews: pass the short-lived local OIDC token as a header (never logged).
    extraHTTPHeaders: process.env.VERCEL_OIDC_TOKEN ? { "x-vercel-trusted-oidc-idp-token": process.env.VERCEL_OIDC_TOKEN } : undefined,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, hasTouch: true } },
  ],
});
