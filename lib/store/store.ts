import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import wishlistReducer from "./features/wishlistSlice";
import cartReducer from "./features/cartSlice";
import announceUI from "./features/announcementSlice";

// 2. CONFIGURE CENTRAL APP STORE
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    // announcement bar
    ui: announceUI,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 3. TYPED CUSTOM HOOKS
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
