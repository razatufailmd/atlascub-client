'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';

export default function CartPage() {
  // Pull persistent local client state directly from Redux Toolkit Cart Slice
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Shopping Cart
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review your chosen apparel design options before final purchase settlement.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <EmptyState 
          title="Your Cart is Empty"
          description="Looks like you haven't added any premium Atlascub custom garments to your shopping bag yet."
          icon={ShoppingBag}
          action={{
            label: "Explore Collections",
            href: "/"
          }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart item layout and checkout summation blocks will be implemented in Module 3 */}
          <div className="lg:col-span-8 bg-card border border-border p-6 rounded-xl">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-4 border-b last:border-0 border-border">
                <span>{item.name} ({item.size} / {item.color})</span>
                <span>Qty: {item.quantity} - ₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}