"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { clearCart } from "@/lib/store/features/cartSlice";
import {
  useInitiateCheckoutMutation,
  mapCartItemsToCheckout,
  useGetOrderByIdQuery,
} from "@/lib/store/apis/checkout-api";
import { InitiateCheckoutPayload, ShippingAddress } from "@/types/checkout";
import { toast } from "sonner";
import { isApiError } from "@/lib/store/apis/checkout-api";

// 🛡️ FIX: Added keyId to the state interface
export interface CheckoutState {
  orderId: string | null;
  razorpayOrderId: string | null;
  orderNumber: string | null;
  amount: number | null;
  keyId: string | null;
  isSubmitting: boolean;
  isProcessing: boolean;
  error: string | null;
  step: "shipping" | "payment" | "success" | "failed";
}

export function useCheckout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [state, setState] = useState<CheckoutState>({
    orderId: null,
    razorpayOrderId: null,
    orderNumber: null,
    amount: null,
    keyId: null,
    isSubmitting: false,
    isProcessing: false,
    error: null,
    step: "shipping",
  });

  const [initiateCheckout, { isLoading: isInitiating }] =
    useInitiateCheckoutMutation();

  const resetCheckout = useCallback(() => {
    setState({
      orderId: null,
      razorpayOrderId: null,
      orderNumber: null,
      amount: null,
      keyId: null,
      isSubmitting: false,
      isProcessing: false,
      error: null,
      step: "shipping",
    });
  }, []);

  const handlePaymentSuccess = useCallback(
    async (response: any) => {
      setState((prev) => ({ ...prev, isProcessing: true }));

      try {
        dispatch(clearCart());
        router.push(`/checkout/success?orderNumber=${state.orderNumber}`);
        toast.success("Payment successful! Your order has been placed.");
      } catch (error) {
        console.error("Payment success handling error:", error);
        toast.error(
          "Payment was successful but we couldn't redirect. Please check your orders."
        );
        setState((prev) => ({ ...prev, step: "failed", isProcessing: false }));
      }
    },
    [dispatch, router, state.orderNumber]
  );

  const handlePaymentFailure = useCallback((error?: any) => {
    const errorMessage =
      error?.message ||
      error?.description ||
      "Payment was declined. Please try again.";

    // 🔑 Navigate to failure page with error message
    router.push(`/checkout/failure?error=${encodeURIComponent(errorMessage)}`);

    setState((prev) => ({
      ...prev,
      step: "failed",
      error: errorMessage,
      isProcessing: false,
    }));

    toast.error(errorMessage);
  }, []);

  const handlePlaceOrder = useCallback(
    async (shippingAddress: ShippingAddress) => {
      if (cartItems.length === 0) {
        toast.error("Your cart is empty. Please add some items.");
        return;
      }

      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        error: null,
        step: "payment",
      }));

      try {
        const payload: InitiateCheckoutPayload = {
          cartItems: mapCartItemsToCheckout(cartItems),
          shippingAddress,
          paymentMethod: "razorpay",
        };

        const result = await initiateCheckout(payload).unwrap();

        // 🛡️ FIX: Save all necessary data to state, including keyId
        setState((prev) => ({
          ...prev,
          orderId: result.orderId,
          razorpayOrderId: result.razorpayOrderId,
          orderNumber: result.orderNumber,
          amount: result.amount,
          keyId: result.keyId,
          isSubmitting: false,
        }));

        // Note: We no longer manually open the modal here.
        // The React component in the Page will detect this state change and open automatically!
      } catch (error: any) {
        let errorMessage = "Failed to place order. Please try again.";

        if (isApiError(error)) {
          const backendMessage = error.data?.message || error.message;
          if (error.status === 400) {
            errorMessage = backendMessage || "Invalid request.";
          } else if (error.status === 401) {
            errorMessage = "Please sign in to place an order.";
          } else if (error.status === 404) {
            errorMessage =
              "Some products in your cart are no longer available.";
          }
        }

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          step: "failed",
          error: errorMessage,
        }));

        toast.error(errorMessage);

        if (isApiError(error) && error.status === 401) {
          router.push("/sign-in");
        }
      }
    },
    [cartItems, initiateCheckout, router]
  );

  const getOrderForSuccess = useCallback((orderNumber: string) => {
    return useGetOrderByIdQuery(orderNumber, { skip: !orderNumber });
  }, []);

  // 🛡️ FIX: Bundle the required orderData object for the PaymentModal component
  const orderData =
    state.orderId &&
    state.razorpayOrderId &&
    state.orderNumber &&
    state.amount &&
    state.keyId
      ? {
          orderId: state.orderId,
          orderNumber: state.orderNumber,
          razorpayOrderId: state.razorpayOrderId,
          keyId: state.keyId,
          amount: state.amount,
        }
      : null;

  return {
    ...state,
    orderData, // Exposed safely to the component
    isSubmitting: state.isSubmitting,
    isProcessing: state.isProcessing,
    isInitiating,
    handlePlaceOrder,
    handlePaymentSuccess,
    handlePaymentFailure,
    resetCheckout,
    getOrderForSuccess,
    cartItems,
  };
}
