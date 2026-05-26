import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. DYNAMIC CART COMPONENT INTERFACES
export interface CartItem {
  id: string; // Unique Cart Item ID (incorporating variation states)
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string; // Selected Size variant (e.g. "M")
  color: string; // Selected Color variant (e.g. "Olive")
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean; // Sidebar slide-out state management
}

const getStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("atlascub_cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialCartState: CartState = {
  items: getStoredCart(),
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "id">>) {
      const { productId, size, color, quantity } = action.payload;
      const compositeId = `${productId}-${size}-${color}`;

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === compositeId
      );

      if (existingItemIndex > -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({ ...action.payload, id: compositeId });
      }

      localStorage.setItem("atlascub_cart", JSON.stringify(state.items));
      state.isOpen = true; // Slide open cart drawer automatically on selection
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("atlascub_cart", JSON.stringify(state.items));
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
        localStorage.setItem("atlascub_cart", JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("atlascub_cart");
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    setCartOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

// 2. CONFIGURE CENTRAL APP STORE
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
