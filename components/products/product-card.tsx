"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/store/apis/product-api";
import { WishlistButton } from "../layout/wishlist/wishlist-button";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { addToCart, removeItemFromCart, openCart } from "@/lib/store/features/cartSlice";
import { QuickViewModal } from "../product/quick-view-modal";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  // Auth Protection
  const { isSignedIn } = useAuth();
  const router = useRouter();
  
  const cartItems = useAppSelector((state) => state.cart.items);
  
  // Check if product is in cart (with default size/color for quick add)
  const defaultSize = product.sizes[0] || "M";
  const defaultColor = product.colors[0]?.name || "Default";
  
  const isInCart = cartItems.some(
    (item) => item.productId === product.id && item.size === defaultSize && item.color === defaultColor
  );

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // REDIRECT IF NOT SIGNED IN
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    
    if (isInCart) {
      // Remove from cart
      dispatch(removeItemFromCart({ 
        productId: product.id, 
        size: defaultSize, 
        color: defaultColor 
      }));
      setIsAdded(false);
    } else {
      // Add to cart
      dispatch(
        addToCart({
          id: `${product.id}-${defaultSize}-${defaultColor}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          quantity: 1,
          size: defaultSize,
          color: defaultColor,
          image: product.images[0],
          slug: product.slug,
          inStock: product.inStock,
        })
      );
      setIsAdded(true);
      dispatch(openCart());
      
      // Reset added state after 2 seconds
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative"
      >
        <Link href={`/product/${product.slug}`}>
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[0] || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            
            {/* Secondary Image on Hover */}
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.name} - alternate view`}
                fill
                className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}

            {/* Badges */}
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="bg-primary text-primary-foreground text-[10px] uppercase tracking-wider">
                  New In
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                  {discount}% OFF
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <div className="absolute right-2 top-2 z-10">
              <WishlistButton product={product} size="sm" />
            </div>

            {/* Quick Action Buttons (Visible on hover) */}
            <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                className={`flex-1 gap-1 bg-white/90 text-foreground hover:bg-white ${
                  isInCart ? "bg-green-500 text-white hover:bg-green-600" : ""
                }`}
                onClick={handleQuickAdd}
              >
                {isInCart || isAdded ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span className="text-xs">Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span className="text-xs">Quick Add</span>
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 bg-white/90 p-0 hover:bg-white"
                onClick={handleQuickView}
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="text-xs text-muted-foreground">{product.rating || 0}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-1">
              {product.colors?.length || 0} Colors | {product.sizes?.join(", ") || "N/A"}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
}