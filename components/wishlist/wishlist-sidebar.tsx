"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { closeWishlistDrawer, removeFromWishlist } from "@/lib/store/features/wishlistSlice";
import { addToCart, openCart } from "@/lib/store/features/cartSlice";
import { EmptyState } from "@/components/shared/empty-state";

export function WishlistSidebar() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.wishlist);
  const cartItems = useAppSelector((state) => state.cart.items);

  // Prevent body scroll when wishlist is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMoveToCart = (item: typeof items[0]) => {
    const defaultSize = "M";
    const defaultColor = "Default";
    
    // Check if item already exists in cart
    const existingItem = cartItems.find(
      (cartItem) => 
        cartItem.productId === item.productId && 
        cartItem.size === defaultSize && 
        cartItem.color === defaultColor
    );
    
    if (existingItem) {
      // Update quantity of existing item
      dispatch(
        addToCart({
          ...existingItem,
          quantity: existingItem.quantity + 1,
        })
      );
    } else {
      // Add new item
      dispatch(
        addToCart({
          id: `${item.productId}-${defaultSize}-${defaultColor}-${Date.now()}`,
          productId: item.productId,
          name: item.name,
          price: item.price,
          compareAtPrice: item.compareAtPrice,
          quantity: 1,
          size: defaultSize,
          color: defaultColor,
          image: item.image,
          slug: item.slug,
          inStock: true,
        })
      );
    }
    
    dispatch(removeFromWishlist(item.productId));
    dispatch(openCart());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeWishlistDrawer())}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-background shadow-xl sm:max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Wishlist</h2>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch(closeWishlistDrawer())}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-auto p-4">
              {items.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <EmptyState
                    title="Your wishlist is empty"
                    description="Save your favorite items here"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.productId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 pb-4 border-b border-border last:border-0"
                    >
                      {/* Product Image */}
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => dispatch(closeWishlistDrawer())}
                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={() => dispatch(closeWishlistDrawer())}
                          >
                            <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                              {item.name}
                            </h3>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => dispatch(removeFromWishlist(item.productId))}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="mt-1">
                          <span className="font-medium">₹{item.price.toLocaleString()}</span>
                          {item.compareAtPrice && (
                            <span className="ml-2 text-xs text-muted-foreground line-through">
                              ₹{item.compareAtPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveToCart(item)}
                          className="mt-2 gap-1 h-8 text-xs"
                        >
                          <ShoppingBag className="h-3 w-3" />
                          Move to Cart
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4">
                <Button
                  asChild
                  className="w-full gap-2"
                  onClick={() => dispatch(closeWishlistDrawer())}
                >
                  <Link href="/wishlist">
                    View All Wishlist
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}