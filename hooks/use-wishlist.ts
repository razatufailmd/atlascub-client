"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
  hydrateWishlist,
  WishlistItem,
} from "@/lib/store/features/wishlistSlice";

const STORAGE_KEY = "atlascub-wishlist";

export function useWishlist() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.wishlist.items);
  const itemCount = items.length;

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch(hydrateWishlist(parsed));
      } catch (e) {
        console.error("Failed to hydrate wishlist:", e);
      }
    }
  }, [dispatch]);

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isInWishlist = useCallback(
    (productId: string) => {
      return items.some((item) => item.productId === productId);
    },
    [items]
  );

  const addToWishlist = useCallback(
    (item: WishlistItem) => {
      if (!isInWishlist(item.productId)) {
        dispatch(toggleWishlist(item));
      }
    },
    [dispatch, isInWishlist]
  );

  const removeFromWishlistById = useCallback(
    (productId: string) => {
      dispatch(removeFromWishlist(productId));
    },
    [dispatch]
  );

  const toggleItem = useCallback(
    (item: WishlistItem) => {
      dispatch(toggleWishlist(item));
    },
    [dispatch]
  );

  const clearAll = useCallback(() => {
    dispatch(clearWishlist());
  }, [dispatch]);

  return {
    items,
    itemCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist: removeFromWishlistById,
    toggleItem,
    clearWishlist: clearAll,
  };
}
