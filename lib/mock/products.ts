import { Product } from "@/types/product";

// Helper to generate consistent IDs
const generateId = (prefix: string, index: number) =>
  `${prefix}-${String(index).padStart(3, "0")}`;

// Mock images (using placeholders - replace with actual image URLs)
const imagePlaceholders = {
  men: {
    tops: [
      "/images/products/men/tops/oversized-tee-1.jpg",
      "/images/products/men/tops/oversized-tee-2.jpg",
      "/images/products/men/tops/linen-shirt-1.jpg",
      "/images/products/men/tops/linen-shirt-2.jpg",
    ],
    bottoms: [
      "/images/products/men/bottoms/pleated-trousers-1.jpg",
      "/images/products/men/bottoms/linen-shorts-1.jpg",
    ],
    outerwear: [
      "/images/products/men/outerwear/overshirt-1.jpg",
      "/images/products/men/outerwear/jacket-1.jpg",
    ],
    ethnic: [
      "/images/products/men/ethnic/kurta-1.jpg",
      "/images/products/men/ethnic/bandhgala-1.jpg",
    ],
    accessories: [
      "/images/products/men/accessories/cap-1.jpg",
      "/images/products/men/accessories/bag-1.jpg",
    ],
  },
  women: {
    tops: [
      "/images/products/women/tops/blouse-1.jpg",
      "/images/products/women/tops/shirt-1.jpg",
    ],
    bottoms: [
      "/images/products/women/bottoms/trousers-1.jpg",
      "/images/products/women/bottoms/palazzo-1.jpg",
    ],
    ethnic: [
      "/images/products/women/ethnic/kurta-1.jpg",
      "/images/products/women/ethnic/saree-1.jpg",
    ],
    accessories: [
      "/images/products/women/accessories/bag-1.jpg",
      "/images/products/women/accessories/scarf-1.jpg",
    ],
  },
  kids: {
    tops: [
      "/images/products/kids/tops/tee-1.jpg",
      "/images/products/kids/tops/shirt-1.jpg",
    ],
    bottoms: [
      "/images/products/kids/bottoms/pants-1.jpg",
      "/images/products/kids/bottoms/shorts-1.jpg",
    ],
    ethnic: ["/images/products/kids/ethnic/kurta-1.jpg"],
    accessories: ["/images/products/kids/accessories/cap-1.jpg"],
  },
};

// Mock Products Data
export const mockProducts: Product[] = [
  // Men - Tops & Linens
  {
    id: generateId("prod", 1),
    slug: "premium-linen-oversized-shirt",
    name: "Premium Linen Oversized Shirt",
    description:
      "Handcrafted from premium French linen, this oversized shirt offers breathability and effortless style for warm days. Features a relaxed fit, button-down collar, and chest pocket.",
    price: 3499,
    compareAtPrice: 5999,
    images: [
      "/images/products/men/linen-shirt-1.jpg",
      "/images/products/men/linen-shirt-2.jpg",
      "/images/products/men/linen-shirt-3.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Natural", value: "#f5e6d3" },
      { name: "Navy", value: "#1a2b4c" },
      { name: "Sage", value: "#9caf88" },
      { name: "Black", value: "#1a1a1a" },
    ],
    category: "Tops & Linens",
    categorySlug: "tops",
    gender: "men",
    tags: ["linen", "summer", "premium", "oversized"],
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isBestSeller: true,
    inStock: true,
    inventory: 45,
    details:
      "Crafted from 100% premium French linen sourced from Normandy. Features a relaxed, boxy fit with dropped shoulders. Breathable fabric perfect for warm weather.",
    sizing:
      "Model is 6'0\" (183 cm) and wears size M. This shirt has an oversized fit. For a more tailored look, consider sizing down.",
    shipping:
      "Free shipping on orders over ₹5000. Delivery within 3-5 business days. Easy returns within 15 days.",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: generateId("prod", 2),
    slug: "heavyweight-cotton-oversized-tee",
    name: "Heavyweight Cotton Oversized Tee",
    description:
      "Premium heavyweight cotton tee with a relaxed, boxy silhouette. Perfect for everyday wear.",
    price: 1899,
    compareAtPrice: 2999,
    images: [
      "/images/products/men/oversized-tee-1.jpg",
      "/images/products/men/oversized-tee-2.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#1a1a1a" },
      { name: "White", value: "#ffffff" },
      { name: "Charcoal", value: "#4a4a4a" },
      { name: "Sand", value: "#d4c5a9" },
    ],
    category: "Tops & Linens",
    categorySlug: "tops",
    gender: "men",
    tags: ["cotton", "essential", "oversized"],
    rating: 4.9,
    reviewCount: 89,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    inventory: 120,
    details:
      "Made from 100% organic cotton, 280GSM. Features a ribbed crew neck and reinforced stitching.",
    sizing: "True to size with an oversized fit. Model wears size M.",
    shipping: "Free shipping on orders over ₹5000",
    createdAt: new Date("2023-12-10"),
  },
  {
    id: generateId("prod", 3),
    slug: "french-linen-resort-shirt",
    name: "French Linen Resort Shirt",
    description:
      "Lightweight French linen resort shirt with a relaxed camp collar. Perfect for tropical getaways.",
    price: 3999,
    compareAtPrice: 6999,
    images: ["/images/products/men/resort-shirt-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sage", value: "#9caf88" },
      { name: "Terracotta", value: "#e2725b" },
      { name: "Natural", value: "#f5e6d3" },
    ],
    category: "Tops & Linens",
    categorySlug: "tops",
    gender: "men",
    tags: ["linen", "resort", "vacation"],
    rating: 4.7,
    reviewCount: 56,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    inventory: 30,
    details:
      "Premium French linen with a relaxed, resort-inspired silhouette. Features a camp collar and chest pocket.",
    sizing: "Relaxed fit. Model wears size M.",
    shipping: "Free shipping on orders over ₹5000",
    createdAt: new Date("2024-02-01"),
  },

  // Men - Bottoms
  {
    id: generateId("prod", 4),
    slug: "pleated-linen-trousers",
    name: "Pleated Linen Trousers",
    description:
      "Elegant pleated trousers crafted from premium European linen. Features a tailored fit with a comfortable elastic waistband.",
    price: 4499,
    compareAtPrice: 7999,
    images: ["/images/products/men/pleated-trousers-1.jpg"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Beige", value: "#d4c5a9" },
      { name: "Navy", value: "#1a2b4c" },
      { name: "Olive", value: "#6b705c" },
    ],
    category: "Bottoms & Trousers",
    categorySlug: "bottoms",
    gender: "men",
    tags: ["linen", "formal", "pleated"],
    rating: 4.8,
    reviewCount: 78,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    inventory: 50,
    details:
      "Made from premium Portuguese linen. Features front pleats, side pockets, and a tailored fit.",
    sizing: "True to size. Model wears size 32.",
    shipping: "Free shipping on orders over ₹5000",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: generateId("prod", 5),
    slug: "relaxed-cotton-cargo-pants",
    name: "Relaxed Cotton Cargo Pants",
    description:
      "Utilitarian-inspired cargo pants in a relaxed silhouette. Made from garment-dyed cotton for a lived-in feel.",
    price: 3299,
    compareAtPrice: 5499,
    images: ["/images/products/men/cargo-pants-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", value: "#6b705c" },
      { name: "Black", value: "#1a1a1a" },
      { name: "Sand", value: "#d4c5a9" },
    ],
    category: "Bottoms & Trousers",
    categorySlug: "bottoms",
    gender: "men",
    tags: ["cargo", "casual", "cotton"],
    rating: 4.6,
    reviewCount: 45,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    inventory: 80,
    details:
      "100% cotton with garment-dye finish. Features multiple pockets and an adjustable hem.",
    sizing: "Relaxed fit. Size down for a slimmer look.",
    shipping: "Free shipping on orders over ₹5000",
    createdAt: new Date("2023-11-15"),
  },

  // Women - Ethnic & Fusion
  {
    id: generateId("prod", 6),
    slug: "handwoven-kurta-set",
    name: "Handwoven Kurta Set",
    description:
      "Beautifully handcrafted kurta set featuring traditional patterns with contemporary silhouette.",
    price: 5999,
    compareAtPrice: 9999,
    images: ["/images/products/women/kurta-set-1.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Indigo", value: "#2e4a7c" },
      { name: "Rust", value: "#b85d3f" },
      { name: "Teal", value: "#2b6f6f" },
    ],
    category: "Ethnic & Fusion Sets",
    categorySlug: "ethnic",
    gender: "women",
    tags: ["handwoven", "festive", "kurta"],
    rating: 4.9,
    reviewCount: 112,
    isNew: true,
    isBestSeller: true,
    inStock: true,
    inventory: 25,
    details:
      "Handwoven by master artisans. Features intricate embroidery and a comfortable A-line silhouette.",
    sizing: "True to size. Model wears size S.",
    shipping: "Free shipping on orders over ₹5000",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: generateId("prod", 7),
    slug: "draped-linen-saree",
    name: "Draped Linen Saree",
    description:
      "Contemporary take on the classic saree, crafted from premium linen with modern draping style.",
    price: 8999,
    compareAtPrice: 14999,
    images: ["/images/products/women/linen-saree-1.jpg"],
    sizes: ["One Size"],
    colors: [
      { name: "Natural", value: "#f5e6d3" },
      { name: "Slate", value: "#6b6b6b" },
      { name: "Rose", value: "#d4a5a5" },
    ],
    category: "Ethnic & Fusion Sets",
    categorySlug: "ethnic",
    gender: "women",
    tags: ["saree", "linen", "contemporary"],
    rating: 4.8,
    reviewCount: 67,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    inventory: 15,
    details:
      "Pre-draped linen saree with modern styling. Easy to wear with no pleating required.",
    sizing: "One size fits most (US 0-12)",
    shipping: "Free shipping on orders over ₹5000",
    createdAt: new Date("2023-12-05"),
  },

  // Kids
  {
    id: generateId("prod", 8),
    slug: "organic-cotton-kurta-set-boys",
    name: "Organic Cotton Kurta Set (Boys)",
    description:
      "Comfortable organic cotton kurta set for festive occasions. Soft, breathable, and easy to wear.",
    price: 2499,
    compareAtPrice: 3999,
    images: ["/images/products/kids/kurta-set-boys-1.jpg"],
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y"],
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Blue", value: "#3b6ea5" },
    ],
    category: "Festive & Ethnic Sets",
    categorySlug: "ethnic",
    gender: "kids",
    tags: ["organic", "festive", "kurta"],
    rating: 4.9,
    reviewCount: 89,
    isNew: true,
    isBestSeller: true,
    inStock: true,
    inventory: 60,
    details:
      "100% GOTS-certified organic cotton. Soft on sensitive skin and machine washable.",
    sizing: "True to size. Size up for longer wear.",
    shipping: "Free shipping on orders over ₹5000",
    createdAt: new Date("2024-01-25"),
  },

  // Accessories
  {
    id: generateId("prod", 9),
    slug: "minimalist-leather-belt",
    name: "Minimalist Leather Belt",
    description:
      "Handcrafted full-grain leather belt with a minimalist brass buckle.",
    price: 1899,
    images: ["/images/products/accessories/leather-belt-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Tan", value: "#c4a47a" },
      { name: "Black", value: "#1a1a1a" },
      { name: "Brown", value: "#6b3a2a" },
    ],
    category: "Accessories",
    categorySlug: "accessories",
    gender: "men",
    tags: ["leather", "accessories", "minimalist"],
    rating: 4.7,
    reviewCount: 234,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    inventory: 150,
    details:
      "Full-grain leather from sustainable tanneries. Solid brass buckle with matte finish.",
    sizing: "Size up if between sizes.",
    shipping: "Free shipping on orders over ₹5000",
    createdAt: new Date("2023-10-01"),
  },
  {
    id: generateId("prod", 10),
    slug: "canvas-tote-bag",
    name: "Canvas Tote Bag",
    description:
      "Heavyweight organic cotton canvas tote with reinforced handles.",
    price: 1299,
    compareAtPrice: 2499,
    images: ["/images/products/accessories/canvas-tote-1.jpg"],
    sizes: ["One Size"],
    colors: [
      { name: "Natural", value: "#f5e6d3" },
      { name: "Black", value: "#1a1a1a" },
    ],
    category: "Accessories",
    categorySlug: "accessories",
    gender: "women",
    tags: ["canvas", "tote", "eco-friendly"],
    rating: 4.8,
    reviewCount: 156,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    inventory: 200,
    details:
      "100% organic cotton canvas. Reinforced stitching and internal pocket.",
    sizing: '16" x 14" x 5"',
    shipping: "Free shipping on orders over ₹5000",
    createdAt: new Date("2023-09-15"),
  },
];

// Helper functions
export const getProductById = (id: string) =>
  mockProducts.find((p) => p.id === id);
export const getProductBySlug = (slug: string) =>
  mockProducts.find((p) => p.slug === slug);
export const getProductsByGender = (gender: "men" | "women" | "kids") =>
  mockProducts.filter((p) => p.gender === gender);
export const getProductsByCategory = (gender: string, categorySlug: string) =>
  mockProducts.filter(
    (p) => p.gender === gender && p.categorySlug === categorySlug
  );
export const getNewArrivals = () => mockProducts.filter((p) => p.isNew);
export const getBestSellers = () => mockProducts.filter((p) => p.isBestSeller);
