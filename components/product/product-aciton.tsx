"use client";

import { useState, useEffect } from "react";
import { Heart, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SizeSelector } from "./size-selector";
import { ColorSelector } from "./color-selector";
import { QuantitySelector } from "./quantity-selector";
import { AddToCartButton } from "./add-to-cart-button";
import { Product } from "@/lib/store/apis/product-api";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const { isInWishlist, toggleItem } = useWishlist();
  const { addItem, openCartDrawer } = useCart();
  const inWishlist = isInWishlist(product.id);

  // Set default size and color when product loads
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product, selectedSize, selectedColor]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
      slug: product.slug,
      inStock: product.inStock,
    });
    
    toast.success(`Added ${quantity} x ${product.name} to cart`);
    openCartDrawer();
  };

  const handleWishlistToggle = () => {
    toggleItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0],
      slug: product.slug,
      gender: product.gender,
      category: product.category?.name || "Other",
    });
    
    toast.success(
      inWishlist 
        ? `${product.name} removed from wishlist` 
        : `${product.name} added to wishlist`
    );
  };

  // Button is enabled when both size and color are selected (they are by default)
  const isAddToCartDisabled = !selectedSize || !selectedColor;

  return (
    <div className="space-y-6">
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
      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-2"
        onClick={handleWishlistToggle}
      >
        <Heart className={`h-4 w-4 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
        {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </Button>

      <Separator />

      {/* Shipping Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Free Shipping</p>
        </div>
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Secure Payment</p>
        </div>
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <RotateCcw className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Easy Returns</p>
        </div>
      </div>
    </div>
  );
}