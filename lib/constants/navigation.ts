export interface NavigationItem {
  name: string;
  slug: string;
  href: string;
  description?: string;
}

export const genderLinks: NavigationItem[] = [
  { name: "Men", slug: "men", href: "/men" },
  { name: "Women", slug: "women", href: "/women" },
  { name: "Kids", slug: "kids", href: "/kids" },
];

export const categories = {
  men: [
    {
      name: "Ethnic & Festive",
      slug: "ethnic",
      href: "/men/ethnic",
      description:
        "Premium Kurtas, Nehru Jackets, Bandhgalas, and Sherwanis for festive milestones.",
    },
    {
      name: "Tops & Linens",
      slug: "tops",
      href: "/men/tops",
      description:
        "Oversized Tees, structural Shirts, drapes, and lightweight French linen wear.",
    },
    {
      name: "Outerwear & Shackets",
      slug: "outerwear",
      href: "/men/outerwear",
      description:
        "Modern jackets, tailored utility overshirts, and unstructured blazers.",
    },
    {
      name: "Bottoms & Trousers",
      slug: "bottoms",
      href: "/men/bottoms",
      description:
        "Pleated trousers, linen shorts, and relaxed-fit tapered trousers.",
    },
    {
      name: "Accessories",
      slug: "accessories",
      href: "/men/accessories",
      description: "Minimalist caps, canvas bags, and premium leather belts.",
    },
  ],
  women: [
    {
      name: "Ethnic & Fusion Sets",
      slug: "ethnic",
      href: "/women/ethnic",
      description:
        "Designer Kurtas, effortless Anarkalis, contemporary Sarees, and Indigo drapes.",
    },
    {
      name: "Tops & Blouses",
      slug: "tops",
      href: "/women/tops",
      description:
        "Minimalist shirts, drapes, knitted vests, and tailored blouses.",
    },
    {
      name: "Outerwear & Capes",
      slug: "outerwear",
      href: "/women/outerwear",
      description:
        "Flowing outerwear, contemporary blazers, and lightweight layered capes.",
    },
    {
      name: "Bottoms & Palazzos",
      slug: "bottoms",
      href: "/women/bottoms",
      description:
        "Wide-leg trousers, flared palazzos, draped skirts, and structured shorts.",
    },
    {
      name: "Accessories",
      slug: "accessories",
      href: "/women/accessories",
      description:
        "Aesthetic tote bags, handcrafted jewelry, and handspun scarves.",
    },
  ],
  kids: [
    {
      name: "Festive & Ethnic Sets",
      slug: "ethnic",
      href: "/kids/ethnic",
      description:
        "Comfortable organic cotton Kurta sets and miniature Lehengas.",
    },
    {
      name: "Tops & Shirts",
      slug: "tops",
      href: "/kids/tops",
      description: "Playful graphic Tees and comfortable linen shirts.",
    },
    {
      name: "Bottoms",
      slug: "bottoms",
      href: "/kids/bottoms",
      description:
        "Easy pull-on pants, elastic trousers, and breathable shorts.",
    },
    {
      name: "Outerwear & Accessories",
      slug: "accessories",
      href: "/kids/accessories",
      description:
        "Comfy sweatshirts, lightweight rain jackets, and dynamic caps.",
    },
  ],

  // Global Collections Category - Easily extensible dynamically for future promotional events or campaigns
  collections: [
    {
      name: "Modern Festive 2026",
      slug: "modern-festive",
      href: "/collections/modern-festive",
      description:
        "An elegant blend of traditional patterns and contemporary drapes.",
      type: "festival",
    },
    {
      name: "Pastel Dreams Campaign",
      slug: "pastel-dreams",
      href: "/collections/pastel-dreams",
      description:
        "Quiet, understated pastel hues tailored in light cottons and linen blends.",
      type: "campaign",
    },
    {
      name: "Summer Solstice drapes",
      slug: "summer-26",
      href: "/collections/summer-26",
      description: "Breathable, airy resort-wear for warm-weather adventures.",
      type: "season",
    },
    {
      name: "Atlas Essentials Sale",
      slug: "sale",
      href: "/collections/sale",
      description: "Curated collections with limited-time archival pricing.",
      type: "sale",
    },
  ],
};

export const navigation = {
  genderLinks,
  categories,
};
