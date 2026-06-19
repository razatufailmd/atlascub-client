"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// Razorpay options type definition
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler?: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function useRazorpay() {
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load the script exactly once when the hook mounts
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.Razorpay) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      toast.error(
        "Payment gateway failed to load. Please check your connection."
      );
    };

    document.body.appendChild(script);

    return () => {
      // Optional: Cleanup if needed, but usually safe to leave the script
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // 2. The initialization function to be called by your components
  const initializePayment = useCallback(
    (options: RazorpayOptions, onPaymentFailure?: (error: string) => void) => {
      if (!isLoaded || !window.Razorpay) {
        toast.error("Payment gateway is not ready. Please try again.");
        return;
      }

      try {
        const razorpay = new window.Razorpay(options);

        // Bind custom failure event listener
        razorpay.on("payment.failed", (response: any) => {
          const errorMsg =
            response.error?.description || "Payment failed. Please try again.";
          if (onPaymentFailure) {
            onPaymentFailure(errorMsg);
          } else {
            toast.error(errorMsg);
          }
        });

        razorpay.open();
        return razorpay;
      } catch (error) {
        console.error("Razorpay initialization error:", error);
        toast.error("Failed to initialize payment gateway");
      }
    },
    [isLoaded]
  );

  return {
    isLoaded,
    initializePayment,
  };
}
