"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import { useWishlist } from "@/hooks/use-wishlist";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SlugBreadcrumb />
        <EmptyState
          title="Your wishlist is empty"
          description="Save your favorite items here and come back to them anytime."
          action={{
            label: "Start Shopping",
            href: "/men",
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <SlugBreadcrumb />
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="heading-lg font-primary">My Wishlist</h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        {items.length > 1 && (
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative rounded-lg border border-border bg-card overflow-hidden"
          >
            <Link href={`/product/${item.slug}`}>
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-foreground line-clamp-1">
                  {item.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    ₹{item.price.toLocaleString()}
                  </span>
                  {item.compareAtPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{item.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => removeFromWishlist(item.productId)}
                className="rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white"
                aria-label="Remove from wishlist"
              >
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </button>
            </div>

            <div className="border-t border-border p-4 pt-3">
              <Button
                size="sm"
                className="w-full gap-2"
                onClick={() => {
                  // Add to cart logic here
                  console.log("Add to cart:", item);
                }}
              >
                <ShoppingBag className="h-4 w-4" />
                Move to Cart
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="mt-12 text-center">
        <Link
          href="/men"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}