import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atlascub | Premium Modern Clothing",
    short_name: "Atlascub",
    description:
      "Discover curated apparel at Atlascub. Premium quality, timeless design, and modern Indian tailoring.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#faf7f5", // Matches theme --background variables
    theme_color: "#9b2c2c", // Matches brand --primary variables
    orientation: "portrait-primary",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
