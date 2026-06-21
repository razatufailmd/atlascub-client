"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, User, MapPin, Receipt, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { StatusUpdateDropdown } from "@/components/orders/status-update-dropdown";
import { TrackingInput } from "@/components/orders/tracking-input";
import { useGetOrderByIdQuery } from "@/lib/store/apis/checkout-api";
import { useOrderActions } from "@/hooks/use-order-actions"; 
import { formatPrice } from "@/lib/utils";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: order, isLoading, isError, refetch } = useGetOrderByIdQuery(id);

  const {
    updateOrderStatus,
    addTrackingNumber,
    isUpdating,
  } = useOrderActions({
    orderId: id,
    currentStatus: order?.status as any,
    onSuccess: refetch,
  });

  const handleStatusChange = async (newStatus: string) => {
    await updateOrderStatus(newStatus as any);
  };

  const handleTrackingUpdate = async (trackingNumber: string) => {
    await addTrackingNumber(trackingNumber);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <EmptyState
          title="Order not found"
          description="The order you're looking for doesn't exist."
          action={{ label: "Back to Orders", href: "/admin/orders" }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push("/admin/orders")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Orders
      </Button>

      {/* 🛡️ FIX: Added contextual warning for Admin if an order was abandoned/failed */}
      {order.status === "PENDING" && (
        <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-amber-700 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-base">Payment Abandoned / Failed</h3>
            <p className="text-sm opacity-90 mt-1">
              This transaction was not completed securely on the gateway. Do not dispatch these items. You may update the status to CANCELLED to close it, or PAID if you manually collected payment offline.
            </p>
          </div>
        </div>
      )}

      {/* Order Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="heading-lg font-primary">
            Order #{order.orderNumber}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <OrderStatusBadge status={order.status as any} size="lg" />
            <span className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <StatusUpdateDropdown
          currentStatus={order.status as any}
          onStatusChange={handleStatusChange}
          isLoading={isUpdating}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Customer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-medium">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="text-muted-foreground">{order.shippingAddress.email}</p>
            <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && (
              <p>{order.shippingAddress.addressLine2}</p>
            )}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p>{order.shippingAddress.pincode}</p>
            <p className="text-muted-foreground">{order.shippingAddress.country}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tracking Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TrackingInput
            currentTracking={order.trackingNumber}
            onUpdate={handleTrackingUpdate}
            isLoading={isUpdating}
          />
          {order.trackingNumber && (
            <p className="mt-2 text-sm text-muted-foreground">
              Tracking: <span className="font-medium text-foreground">{order.trackingNumber}</span>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Items List */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Receipt className="h-4 w-4" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                    <span>Size: {item.size}</span>
                    <span>Color: {item.color}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Order Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>₹{formatPrice(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>₹{formatPrice(order.tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-lg">₹{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      {order.status !== "PENDING" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTimeline status={order.status as any} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}