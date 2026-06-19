"use client";

import { useAppSelector } from "@/lib/store/store";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, Truck, CheckCircle2 } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 200;

export function OrderSummary() {
  const { items } = useAppSelector((state) => state.cart);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = isFreeShipping ? 0 : SHIPPING_COST;
  const tax = Math.round(subtotal * 0.18 * 100) / 100;
  const total = subtotal + shipping + tax;
  
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-8 shadow-sm relative overflow-hidden group">
      {/* Subtle decorative background gradient */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/5 blur-3xl transition-transform group-hover:scale-150 duration-700" />

      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h2 className="heading-sm font-primary m-0">Order Summary</h2>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-12 text-muted-foreground animate-in fade-in duration-500">
          <p>Your cart is feeling a bit light.</p>
        </div>
      )}

      {/* Cart Items */}
      <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="flex gap-4 pb-4 border-b border-border/40 last:border-0 last:pb-0 animate-in fade-in slide-in-from-right-4 fill-mode-both"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Product Image with Quantity Badge */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted border border-border/50 group-hover:border-border transition-colors">
              <Image
                src={item.image || "/images/placeholder.jpg"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* Modern Quantity Badge */}
              <div className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-card z-10">
                {item.quantity}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <p className="text-sm font-medium line-clamp-1 text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-1 tracking-wide">
                {item.size} <span className="mx-1">•</span> <span className="capitalize">{item.color}</span>
              </p>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      {items.length > 0 && (
        <div className="mt-8 space-y-4 pt-6 border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
          
          {/* Free Shipping Tracker */}
          <div className="bg-muted/40 rounded-lg p-3 space-y-2 border border-border/30">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Truck className="h-3.5 w-3.5" />
                Shipping
              </span>
              {isFreeShipping ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Free
                </span>
              ) : (
                <span className="text-muted-foreground">
                  ₹{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} away from Free
                </span>
              )}
            </div>
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-secondary overflow-hidden rounded-full">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${isFreeShipping ? 'bg-emerald-500' : 'bg-primary'}`}
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3 px-1 text-sm text-muted-foreground">
            {/* Subtotal */}
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className={shipping === 0 ? "text-emerald-600" : "text-foreground"}>
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>

            {/* Tax */}
            <div className="flex justify-between">
              <span>Estimated Tax (18%)</span>
              <span className="text-foreground">{formatPrice(tax)}</span>
            </div>
          </div>

          <Separator className="bg-border/60" />

          {/* Grand Total */}
          <div className="flex justify-between items-end px-1 pt-2">
            <div className="space-y-1">
              <span className="text-base font-bold text-foreground">Total</span>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Including Taxes</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary tracking-tight">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}