import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Senior Clinical Research Associate`,
    short_name: siteConfig.name,
    description:
      "Senior Clinical Research Associate — operational support for clinical trials.",
    start_url: "/fr",
    display: "standalone",
    background_color: "#07131b",
    theme_color: "#07131b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
