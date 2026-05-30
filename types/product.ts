export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  sizes: string[];
  colors: ColorOption[];
  category: string;
  gender: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  inStock: boolean;
  details?: string;
  sizing?: string;
  shipping?: string;
  createdAt: Date;
}

export interface ColorOption {
  name: string;
  value: string; // Hex code
  image?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
  slug: string;
}
