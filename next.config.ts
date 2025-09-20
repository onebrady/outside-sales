import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/outside-sales",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/outside-sales",
  },
};

export default nextConfig;
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
