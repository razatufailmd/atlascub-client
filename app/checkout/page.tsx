"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentModal } from "@/components/checkout/payment-modal";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import { Button } from "@/components/ui/button";

import { useCheckout } from "@/hooks/use-checkout";
import { useAppSelector } from "@/lib/store/store";

export default function CheckoutPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded: authLoaded, user } = useUser();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [showPayment, setShowPayment] = useState(false);

  const {
    orderData,
    isSubmitting,
    error,
    handlePlaceOrder,
    handlePaymentSuccess,
    handlePaymentFailure,
    resetCheckout,
  } = useCheckout();

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  // Redirect if not signed in
  useEffect(() => {
    if (authLoaded && !isSignedIn) {
      router.push("/sign-in?redirect=/checkout");
    }
  }, [authLoaded, isSignedIn, router]);

  // Automatically trigger payment modal when order generation completes
  useEffect(() => {
    if (orderData) {
      setShowPayment(true);
    }
  }, [orderData]);

  // Premium Loading State
  if (!authLoaded || cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] w-full flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Preparing secure checkout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <div className="container mx-auto px-4 py-6 md:py-10 max-w-7xl">
        
        {/* Subtle Fade-in Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <SlugBreadcrumb />
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-6 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Secure Checkout
          </h1>
        </div>

        {/* Animated Error Banner */}
        {error && (
          <div className="mb-8 p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{error}</p>
              <Button
                variant="link"
                className="h-auto p-0 text-destructive underline mt-1"
                onClick={resetCheckout}
              >
                Clear error and try again
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          
          {/* Left Column: Form (Slides up gracefully) */}
          <div className="lg:col-span-7 xl:col-span-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
            <CheckoutForm
              onSubmit={handlePlaceOrder}
              isSubmitting={isSubmitting}
              defaultValues={{
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                email: user?.primaryEmailAddress?.emailAddress || "",
              }}
            />
          </div>

          {/* Right Column: Order Summary (Slides up gracefully, Sticky on Desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            {/* The sticky wrapper keeps the summary in view when filling long forms */}
            <div className="sticky top-24"> 
              <OrderSummary />
            </div>
          </div>

        </div>
      </div>

      {/* Payment Modal Integration */}
      <PaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        orderData={orderData}
        onSuccess={(paymentId, orderId) => {
          handlePaymentSuccess({ razorpay_payment_id: paymentId, razorpay_order_id: orderId });
        }}
        onFailure={(errorMsg) => {
          handlePaymentFailure(new Error(errorMsg));
        }}
        user={{
          name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Customer",
          email: user?.primaryEmailAddress?.emailAddress || "",
          phone: "", // Captured in DB, not needed strictly for Razorpay prefill unless explicitly requested
        }}
      />
    </div>
  );
}