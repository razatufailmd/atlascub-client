import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atlascub | Premium Modern Clothing",
    short_name: "Atlascub",
    description:
      "Discover curated apparel at Atlascub. Premium quality, timeless design, and modern tailoring.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f5", // Matches your shadcn --background
    theme_color: "#9b2c2c", // Matches your shadcn --primary
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
