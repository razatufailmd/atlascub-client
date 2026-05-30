"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { ImageGallery } from "@/components/product/image-gallery";
import { SizeSelector } from "@/components/product/size-selector";
import { ColorSelector } from "@/components/product/color-selector";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductInfoTabs } from "@/components/product/product-info-tabs";
import { RelatedProducts } from "@/components/product/related-products";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock product data - replace with API call
const mockProduct = {
  id: "1",
  slug: "premium-linen-shirt",
  name: "Premium Linen Shirt",
  description: "Handcrafted from premium French linen, this shirt offers breathability and effortless style for warm days.",
  price: 2999,
  compareAtPrice: 4999,
  images: [
    "/images/products/linen-shirt-1.jpg",
    "/images/products/linen-shirt-2.jpg",
    "/images/products/linen-shirt-3.jpg",
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Natural", value: "#f5e6d3" },
    { name: "Navy", value: "#1a2b4c" },
    { name: "Sage", value: "#9caf88" },
  ],
  category: "tops",
  gender: "men",
  tags: ["linen", "summer", "premium"],
  rating: 4.8,
  reviewCount: 124,
  isNew: true,
  isBestSeller: true,
  inStock: true,
  details: "Crafted from 100% premium French linen. Features a relaxed fit, button-down collar, and chest pocket. Breathable fabric perfect for warm weather.",
  sizing: "Model is 6'0\" (183 cm) and wears size M. This shirt has a relaxed fit. For a more tailored look, consider sizing down.",
  shipping: "Free shipping on orders over ₹5000. Delivery within 3-5 business days. Easy returns within 15 days.",
};

const relatedProducts: any[] = []; // Mock related products

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // In production, fetch product based on slug
  const product = mockProduct;

  const handleAddToCart = async () => {
    // Add to cart logic here
    console.log({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
      slug: product.slug,
    });
  };

  const isAddToCartDisabled = !selectedSize || !selectedColor;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <SlugBreadcrumb />
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isNew && (
                <Badge className="bg-primary text-primary-foreground">New In</Badge>
              )}
              {product.isBestSeller && (
                <Badge variant="secondary">Best Seller</Badge>
              )}
              {product.compareAtPrice && (
                <Badge variant="outline" className="border-destructive text-destructive">
                  {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="heading-lg font-primary">{product.name}</h1>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-foreground">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-muted-foreground line-through">
                    ₹{product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "fill-muted text-muted"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviewCount} reviews
                </span>
              </div>
            </div>

            <Separator />

            {/* Size Selector */}
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* Color Selector */}
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />

            {/* Quantity Selector */}
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(q + 1, 10))}
              onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
            />

            {/* Add to Cart Button */}
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={isAddToCartDisabled}
              inStock={product.inStock}
            />

            {/* Wishlist Button */}
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-border py-3 text-sm font-medium transition-colors hover:bg-muted">
              <Heart className="h-4 w-4" />
              Add to Wishlist
            </button>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <Truck className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-1 text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-1 text-xs text-muted-foreground">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-1 text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <ProductInfoTabs
            details={product.details || ""}
            sizing={product.sizing || ""}
            shipping={product.shipping || ""}
          />
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}