import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  slug: string;
  gender: string;
  category: string; // This is string (category name) for wishlist display
}

interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
}

const initialState: WishlistState = {
  items: [],
  isOpen: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some(
        (item) => item.productId === action.payload.productId
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some(
        (item) => item.productId === action.payload.productId
      );
      if (exists) {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload.productId
        );
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    hydrateWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
    toggleWishlistDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    openWishlistDrawer: (state) => {
      state.isOpen = true;
    },
    closeWishlistDrawer: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  hydrateWishlist,
  toggleWishlistDrawer,
  openWishlistDrawer,
  closeWishlistDrawer,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
