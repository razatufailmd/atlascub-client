import { MetadataRoute } from "next";
import { categories } from "@/lib/constants/navigation";

// Static routes
const staticRoutes = [
  "",
  "/shop",
  "/shop/men",
  "/shop/women",
  "/shop/kids",
  "/collections/all",
  "/wishlist",
  "/about",
  "/contact",
  "/support",
];

// Generate dynamic category routes
const generateCategoryRoutes = () => {
  const routes: string[] = [];
  const genders = ["men", "women", "kids"];

  for (const gender of genders) {
    const genderCategories =
      categories[gender as keyof typeof categories] || [];
    for (const category of genderCategories) {
      routes.push(`/shop/${gender}/${category.slug}`);
    }
  }

  return routes;
};

// Generate collection routes
const generateCollectionRoutes = () => {
  const collections = categories.collections || [];
  return collections.map((collection) => `/collections/${collection.slug}`);
};

export default function sitemap(): MetadataRoute.Sitemap {
  const allRoutes = [
    ...staticRoutes,
    ...generateCategoryRoutes(),
    ...generateCollectionRoutes(),
  ];

  const baseUrl = "https://www.atlascub.in";

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("/shop/") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.includes("/shop/") ? 0.8 : 0.5,
  }));
}
