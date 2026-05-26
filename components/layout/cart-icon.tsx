"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/lib/store/store";
import { Button } from "@/components/ui/button";

export function CartIcon() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingBag className="h-5 w-5" />
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.span
              key="cart-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
            >
              {itemCount > 9 ? "9+" : itemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </Link>
  );
}