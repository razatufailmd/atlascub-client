export const genderLinks = [
  { name: "Men", slug: "men", href: "/men" },
  { name: "Women", slug: "women", href: "/women" },
  { name: "Kids", slug: "kids", href: "/kids" },
];

export const categories = {
  men: [
    {
      name: "Outerwear",
      href: "/men/outerwear",
      description: "Jackets, coats, overshirts",
    },
    { name: "Tops", href: "/men/tops", description: "Shirts, tees, knitwear" },
    {
      name: "Bottoms",
      href: "/men/bottoms",
      description: "Trousers, jeans, shorts",
    },
    {
      name: "Accessories",
      href: "/men/accessories",
      description: "Bags, caps, belts",
    },
  ],
  women: [
    {
      name: "Outerwear",
      href: "/women/outerwear",
      description: "Coats, blazers, jackets",
    },
    {
      name: "Tops",
      href: "/women/tops",
      description: "Blouses, shirts, knitwear",
    },
    {
      name: "Bottoms",
      href: "/women/bottoms",
      description: "Trousers, skirts, shorts",
    },
    {
      name: "Accessories",
      href: "/women/accessories",
      description: "Bags, jewelry, scarves",
    },
  ],
  kids: [
    {
      name: "Outerwear",
      href: "/kids/outerwear",
      description: "Jackets, raincoats",
    },
    { name: "Tops", href: "/kids/tops", description: "T-shirts, shirts" },
    { name: "Bottoms", href: "/kids/bottoms", description: "Pants, shorts" },
    {
      name: "Accessories",
      href: "/kids/accessories",
      description: "Hats, bags",
    },
  ],
};

export const navigation = {
  genderLinks,
  categories,
};
