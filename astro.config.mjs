// @ts-check
import { defineConfig } from "astro/config";

// Static output — ideal for Cloudflare Pages (no Workers needed for this marketing site).
export default defineConfig({
  site: "https://caleclarke.com",
  output: "static",
  compressHTML: true,
});
