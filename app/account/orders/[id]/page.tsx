"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, MapPin, Receipt, Truck, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { useGetOrderByIdQuery } from "@/lib/store/apis/checkout-api";
import { formatPrice } from "@/lib/utils";

export default function AccountOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: order, isLoading, isError, refetch } = useGetOrderByIdQuery(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
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
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/account/orders")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
        <EmptyState
          title="Order not found"
          description="The order you're looking for doesn't exist."
          action={{
            label: "View All Orders",
            href: "/account/orders",
          }}
        />
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const orderTime = new Date(order.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-in fade-in duration-500">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push("/account/orders")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Orders
      </Button>

      {/* Order Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="heading-lg font-primary">
              Order #{order.orderNumber}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <OrderStatusBadge status={order.status as any} size="lg" />
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {orderDate} at {orderTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🛡️ FIX: Replaced misleading timeline for failed/abandoned payments */}
      {order.status === "PENDING" ? (
        <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-5 text-destructive flex items-start gap-3 shadow-sm">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-base">Payment Incomplete</h3>
            <p className="text-sm opacity-90 mt-1 leading-relaxed">
              The payment for this order was not completed or failed. For security reasons, a new transaction session cannot be restarted for this specific reference. 
              <br/><br/>
              <strong>Action required:</strong> Please place a new order if you still wish to purchase these items.
            </p>
          </div>
        </div>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTimeline status={order.status as any} />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-medium">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="text-muted-foreground">{order.shippingAddress.email}</p>
            <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
            <Separator className="my-2" />
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

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Receipt className="h-4 w-4" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                <span className="text-lg text-primary">₹{formatPrice(order.totalAmount)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="capitalize">{order.paymentMethod}</span>
              </div>
              {order.paymentId && (
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Payment ID</span>
                  <span className="font-mono text-xs">{order.paymentId}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tracking Number */}
      {order.trackingNumber && (
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Truck className="h-4 w-4 text-primary" />
              Tracking Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium">Tracking Number</p>
                <p className="text-sm text-muted-foreground font-mono mt-1">
                  {order.trackingNumber}
                </p>
              </div>
              {order.status === "SHIPPED" && (
                <Button variant="outline" size="sm">
                  Track Package
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Items */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            Order Items ({order.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              >
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
        </CardContent>
      </Card>

      {/* Help Section */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Need help with this order?{" "}
          <a href="/contact" className="text-primary hover:underline font-medium">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}