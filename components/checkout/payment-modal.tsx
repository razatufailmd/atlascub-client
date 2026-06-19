"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRazorpay } from "@/hooks/use-razorpay";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderData: {
    orderId: string;
    orderNumber: string;
    razorpayOrderId: string;
    keyId: string;
    amount: number;
  } | null;
  onSuccess: (paymentId: string, orderId: string) => void;
  onFailure: (error: string) => void;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export function PaymentModal({
  open,
  onOpenChange,
  orderData,
  onSuccess,
  onFailure,
  user,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isLoaded, initializePayment } = useRazorpay();
  
  // 🛡️ Guard to ensure we only auto-open Razorpay once per modal open
  const hasAutoOpened = useRef(false);

  // Reset the guard when the modal closes
  useEffect(() => {
    if (!open) {
      hasAutoOpened.current = false;
      setIsProcessing(false);
    }
  }, [open]);

  const handlePayClick = useCallback(() => {
    if (!orderData || !isLoaded) return;

    setIsProcessing(true);

    initializePayment(
      {
        key: orderData.keyId,
        amount: orderData.amount * 100, // Convert to paise
        currency: "INR",
        name: "Atlascub",
        description: `Order #${orderData.orderNumber || "N/A"}`,
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.phone || "",
        },
        notes: {
          orderId: orderData.orderId,
          orderNumber: orderData.orderNumber,
        },
        theme: {
          color: "#9b2c2c",
        },
        handler: (response: any) => {
          // Success callback handled by Razorpay
          const paymentId = response.razorpay_payment_id;
          const rzpOrderId = response.razorpay_order_id;

          toast.success("Payment successful!");
          onSuccess(paymentId, rzpOrderId);
          
          setIsProcessing(false);
          onOpenChange(false);
        },
        modal: {
          ondismiss: () => {
            // User closed the Razorpay popup without paying
            setIsProcessing(false);
            // We do NOT call onFailure here, as they might just want to change payment methods or try again
          },
        },
      },
      (errorMsg) => {
        // Explicit failure callback (e.g., card declined)
        setIsProcessing(false);
        onFailure(errorMsg);
        toast.error(errorMsg);
      }
    );
  }, [orderData, isLoaded, user, initializePayment, onSuccess, onFailure, onOpenChange]);

  // Auto-open Razorpay when the script is loaded and the modal is visible
  useEffect(() => {
    if (open && isLoaded && orderData && !hasAutoOpened.current) {
      hasAutoOpened.current = true;
      
      // Small timeout ensures the UI renders the loader before Razorpay hijacks the thread
      const timer = setTimeout(() => {
        handlePayClick();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [open, isLoaded, orderData, handlePayClick]);

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!isProcessing) onOpenChange(val);
    }}>
      <DialogContent className="sm:max-w-md bg-background" showCloseButton={!isProcessing}>
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            {isProcessing ? "Processing Payment..." : "Secure Payment"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          {isProcessing ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Please complete the payment in the secure window
                </p>
                <p className="text-xs text-muted-foreground">
                  Do not refresh or close this page
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 w-full text-center space-y-1">
                <p className="text-sm text-muted-foreground">Amount to Pay</p>
                <p className="text-3xl font-bold text-foreground">
                  {orderData ? `₹${orderData.amount.toLocaleString()}` : "..."}
                </p>
                <p className="text-xs text-muted-foreground pt-1">
                  Order #{orderData?.orderNumber}
                </p>
              </div>

              <div className="w-full space-y-3">
                <Button
                  onClick={handlePayClick}
                  disabled={!isLoaded || !orderData}
                  className="w-full text-md h-12"
                >
                  {!isLoaded ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading Secure Gateway...
                    </>
                  ) : (
                    "Retry Payment"
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  disabled={isProcessing}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}