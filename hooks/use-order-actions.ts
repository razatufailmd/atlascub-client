"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useUpdateOrderStatusMutation } from "@/lib/store/apis/checkout-api";
import { OrderStatusType, getNextStatuses } from "@/lib/constants/order-status";

interface UseOrderActionsProps {
  orderId: string;
  currentStatus: OrderStatusType;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useOrderActions({
  orderId,
  currentStatus,
  onSuccess,
  onError,
}: UseOrderActionsProps) {
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  // Update order status
  const updateOrderStatus = useCallback(
    async (newStatus: OrderStatusType) => {
      const nextStatuses = getNextStatuses(currentStatus);

      // Check if status transition is allowed
      if (nextStatuses.length > 0 && !nextStatuses.includes(newStatus)) {
        const error = new Error(
          `Cannot transition from ${currentStatus} to ${newStatus}`
        );
        toast.error(error.message);
        onError?.(error);
        return;
      }

      try {
        await updateStatus({
          id: orderId,
          status: newStatus,
        }).unwrap();

        toast.success(`Order status updated to ${newStatus}`);
        onSuccess?.();
      } catch (error: any) {
        const err = new Error(
          error?.data?.message || "Failed to update order status"
        );
        toast.error(err.message);
        onError?.(err);
      }
    },
    [orderId, currentStatus, updateStatus, onSuccess, onError]
  );

  // Add tracking number
  const addTrackingNumber = useCallback(
    async (trackingNumber: string) => {
      if (!trackingNumber.trim()) {
        const error = new Error("Tracking number is required");
        toast.error(error.message);
        onError?.(error);
        return;
      }

      try {
        await updateStatus({
          id: orderId,
          status: currentStatus,
          trackingNumber: trackingNumber.trim(),
        }).unwrap();

        toast.success("Tracking number added successfully");
        onSuccess?.();
      } catch (error: any) {
        const err = new Error(
          error?.data?.message || "Failed to add tracking number"
        );
        toast.error(err.message);
        onError?.(err);
      }
    },
    [orderId, currentStatus, updateStatus, onSuccess, onError]
  );

  // Format order date
  const formatOrderDate = useCallback((date: string | Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  // Format order time
  const formatOrderTime = useCallback((date: string | Date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // Get status transition options for dropdown
  const getStatusTransition = useCallback(() => {
    return getNextStatuses(currentStatus);
  }, [currentStatus]);

  // Check if order is cancellable
  const isCancellable = useCallback(() => {
    return currentStatus === "PENDING" || currentStatus === "PAID";
  }, [currentStatus]);

  // Check if order is returnable (only if delivered within return window)
  const isReturnable = useCallback(
    (deliveredDate?: string) => {
      if (currentStatus !== "DELIVERED") return false;
      if (!deliveredDate) return false;

      const delivered = new Date(deliveredDate);
      const now = new Date();
      const diffDays =
        (now.getTime() - delivered.getTime()) / (1000 * 60 * 60 * 24);

      // 15 days return window (configurable)
      return diffDays <= 15;
    },
    [currentStatus]
  );

  return {
    // Actions
    updateOrderStatus,
    addTrackingNumber,

    // Formatters
    formatOrderDate,
    formatOrderTime,

    // Utilities
    getStatusTransition,
    isCancellable,
    isReturnable,

    // State
    isUpdating,
  };
}
