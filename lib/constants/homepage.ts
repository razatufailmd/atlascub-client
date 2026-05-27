export interface CTAButton {
  text: string;
  href: string;
}

export interface HeroSlide {
  id: number;
  overline: string;
  title: string;
  subtitle: string;
  image: string;
  mobileImage?: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
}

export interface GenderPanel {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  gradientFrom: string;
}

export interface CuratedCampaign {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
  accentOverlay: string;
}

export interface CategoryHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface InstagramPost {
  id: number;
  image: string;
  url: string;
}

export interface BrandValue {
  id: number;
  label: string;
  title: string;
  description: string;
  icon?: string; // Optional icon name for mapping
}

// --- CENTRAL EXPORTABLE DATA CONFIGURATION (DYNAMIC-READY) ---

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    overline: "Summer Solstice Campaign",
    title: "Quiet Confidence",
    subtitle:
      "Timeless, lightweight linen drapes and relaxed silhouettes tailored for the modern wardrobe.",
    image: "/images/hero/hero-1.jpg",
    ctaPrimary: { text: "Shop Menswear", href: "/men" },
    ctaSecondary: { text: "Explore Campaign", href: "/collections/summer-26" },
  },
  {
    id: 2,
    overline: "New Season Campaign",
    title: "Pastel Dreams",
    subtitle:
      "Understated lavender mists, soft sands, and lightweight organic cotton knits designed for daily ease.",
    image: "/images/hero/hero-2.jpg",
    ctaPrimary: { text: "Shop Womenswear", href: "/women" },
    ctaSecondary: { text: "View Lookbook", href: "/collections/pastel-dreams" },
  },
  {
    id: 3,
    overline: "Festive Exclusive",
    title: "Modern Festive 2026",
    subtitle:
      "A thoughtful fusion of raw silk bandhgalas, textured kurtas, and structured drapes.",
    image: "/images/campaigns/heritage.jpg",
    ctaPrimary: { text: "Explore Festive", href: "/men/ethnic" },
    ctaSecondary: { text: "Archival Sale", href: "/collections/sale" },
  },
];

export const genderGrid: GenderPanel[] = [
  {
    id: "men",
    title: "MEN",
    description: "Quiet Confidence. Timeless Essentials & Tailored Kurtas.",
    image: "/images/gender/men.jpg",
    href: "/men",
    gradientFrom: "from-amber-950/40",
  },
  {
    id: "women",
    title: "WOMEN",
    description: "Effortless Silhouettes. Organic Knits & Handspun Sarees.",
    image: "/images/gender/women.jpg",
    href: "/women",
    gradientFrom: "from-[#9b2c2c]/30",
  },
  {
    id: "kids",
    title: "KIDS",
    description: "Hypoallergenic Cottons. Cloud-Soft Daily Playwear.",
    image: "/images/gender/kids.jpg",
    href: "/kids",
    gradientFrom: "from-stone-900/30",
  },
];

export const curatedCampaigns: CuratedCampaign[] = [
  {
    id: 1,
    title: "Pastel Dreams",
    description: "Soft lavender mists, sage greens, and organic knitwear.",
    image: "/images/campaigns/pastel-dreams.jpg",
    href: "/collections/pastel-dreams",
    accentOverlay: "bg-[#fdf2d6]/15",
  },
  {
    id: 2,
    title: "Quiet Luxury",
    description: "Combed cotton tees and single-pleated tailored trousers.",
    image: "/images/campaigns/quiet-luxury.jpg",
    href: "/collections/quiet-luxury",
    accentOverlay: "bg-stone-500/10",
  },
  {
    id: 3,
    title: "Streetwear Core",
    description: "Heavyweight drop-shoulder hoodies and clean utility cargos.",
    image: "/images/campaigns/streetwear-core.jpg",
    href: "/collections/streetwear-core",
    accentOverlay: "bg-neutral-900/10",
  },
  {
    id: 4,
    title: "Heritage Weaves",
    description: "Rich handspun raw silk structures and traditional textures.",
    image: "/images/campaigns/heritage.jpg",
    href: "/collections/heritage",
    accentOverlay: "bg-[#9b2c2c]/10",
  },
];

export const categoryHighlights: CategoryHighlight[] = [
  {
    id: "outerwear",
    title: "Outerwear",
    description: "Unstructured Blazers & Overshirts",
    image: "/images/categories/outerwear.jpg",
    href: "/men/outerwear",
  },
  {
    id: "tops",
    title: "Tops & Linens",
    description: "Combed Cotton Tees & Resort Shirts",
    image: "/images/categories/tops.jpg",
    href: "/men/tops",
  },
  {
    id: "bottoms",
    title: "Bottoms & Trousers",
    description: "Pleated Chinos & Relaxed Drape Pants",
    image: "/images/categories/bottoms.jpg",
    href: "/men/bottoms",
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Minimalist Caps & Fine Leather Belts",
    image: "/images/categories/accessories.jpg",
    href: "/men/accessories",
  },
];

export const instagramFeed: InstagramPost[] = [
  {
    id: 1,
    image: "/images/instagram/post-1.jpg",
    url: "https://instagram.com/atlascub",
  },
  {
    id: 2,
    image: "/images/instagram/post-2.jpg",
    url: "https://instagram.com/atlascub",
  },
  {
    id: 3,
    image: "/images/instagram/post-3.jpg",
    url: "https://instagram.com/atlascub",
  },
  {
    id: 4,
    image: "/images/instagram/post-4.jpg",
    url: "https://instagram.com/atlascub",
  },
  {
    id: 5,
    image: "/images/instagram/post-5.jpg",
    url: "https://instagram.com/atlascub",
  },
  {
    id: 6,
    image: "/images/instagram/post-6.jpg",
    url: "https://instagram.com/atlascub",
  },
];

export const brandValues: BrandValue[] = [
  {
    id: 1,
    label: "01 / PURE MATERIALS",
    title: "Combed Cottons & Raw Silks",
    description:
      "We work directly with domestic spinners to source premium long-staple combed cottons and fine mulberry raw silk yarns.",
  },
  {
    id: 2,
    label: "02 / INDEPENDENT WEAVING",
    title: "Ethically Handspun",
    description:
      "Our clothing respects traditional Indian techniques, combining high-quality handloom structures with modern, clean lines.",
  },
  {
    id: 3,
    label: "03 / SLOW APPAREL",
    title: "Built to Outlast",
    description:
      "We don't do weekly fashion drops. Every stitch is reinforced and pre-shrunk, engineered to survive generations of daily wear.",
  },
];
