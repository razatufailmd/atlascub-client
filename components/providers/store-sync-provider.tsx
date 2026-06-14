"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { hydrateCart } from "@/lib/store/features/cartSlice";
import { hydrateWishlist } from "@/lib/store/features/wishlistSlice";
import { useAuth } from "@clerk/nextjs";
import { cartApi, useSyncCartMutation } from "@/lib/store/apis/cart-api";
import { wishlistApi, useSyncWishlistMutation } from "@/lib/store/apis/wishlist-api";

/**
 * 🛡️ STATE PERSISTENCE ENGINE (BIDIRECTIONAL)
 * 1. Mounts: Instantly hydrates from LocalStorage for immediate UX.
 * 2. Login: Fetches saved items from the Database cross-device.
 * 3. Updates: Silently debounces & syncs any Redux changes back to DB & LocalStorage.
 */
export function StoreSyncProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  
  const isInitialized = useRef(false);
  const { isSignedIn, isLoaded } = useAuth();
  
  const [syncCart] = useSyncCartMutation();
  const [syncWishlist] = useSyncWishlistMutation();

  // 1. FAST LOCAL LOAD: Hydrate Redux Store from LocalStorage instantly on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("atlascub_cart");
      const savedWishlist = localStorage.getItem("atlascub_wishlist");
      
      if (savedCart) dispatch(hydrateCart(JSON.parse(savedCart)));
      if (savedWishlist) dispatch(hydrateWishlist(JSON.parse(savedWishlist)));
      
      isInitialized.current = true;
    } catch (e) {
      console.error("Failed to hydrate state from local storage", e);
    }
  }, [dispatch]);

  // 2. CROSS-DEVICE PULL: Fetch from Backend Database when user signs in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Pull saved cart from Postgres
      dispatch(cartApi.endpoints.getCart.initiate())
        .unwrap()
        .then((serverCart) => {
          if (serverCart && serverCart.length > 0) {
            dispatch(hydrateCart(serverCart));
          }
        })
        .catch((err) => console.error("Failed to pull DB cart:", err));

      // Pull saved wishlist from Postgres
      dispatch(wishlistApi.endpoints.getWishlist.initiate())
        .unwrap()
        .then((serverWishlist) => {
          if (serverWishlist && serverWishlist.length > 0) {
            dispatch(hydrateWishlist(serverWishlist));
          }
        })
        .catch((err) => console.error("Failed to pull DB wishlist:", err));
    }
  }, [isLoaded, isSignedIn, dispatch]);

  // 3A. SECURE PUSH: Mirror Cart changes to LocalStorage and Backend
  useEffect(() => {
    if (!isInitialized.current) return;
    
    // Always save locally for guest users & speed
    localStorage.setItem("atlascub_cart", JSON.stringify(cartItems));

    // If logged in, push to DB securely with a 1-second debounce
    if (isLoaded && isSignedIn) {
      const debounceTimer = setTimeout(() => {
        syncCart(cartItems).catch((err) => console.error("Cloud cart sync failed:", err));
      }, 1000);
      return () => clearTimeout(debounceTimer);
    }
  }, [cartItems, isSignedIn, isLoaded, syncCart]);

  // 3B. SECURE PUSH: Mirror Wishlist changes to LocalStorage and Backend
  useEffect(() => {
    if (!isInitialized.current) return;
    
    // Always save locally for guest users & speed
    localStorage.setItem("atlascub_wishlist", JSON.stringify(wishlistItems));

    // If logged in, push to DB securely with a 1-second debounce
    if (isLoaded && isSignedIn) {
      const debounceTimer = setTimeout(() => {
        syncWishlist(wishlistItems).catch((err) => console.error("Cloud wishlist sync failed:", err));
      }, 1000);
      return () => clearTimeout(debounceTimer);
    }
  }, [wishlistItems, isSignedIn, isLoaded, syncWishlist]);

  return <>{children}</>;
}