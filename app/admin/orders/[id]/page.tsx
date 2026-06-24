"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, User, MapPin, Receipt, RotateCcw, ShieldCheck, XCircle, Banknote, Loader2, Printer, AlertCircle,RefreshCcw  } from "lucide-react";
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
import { toast } from "sonner";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // 🛡️ Live API Integrations
  const { data: order, isLoading, isError,isFetching, refetch } = useGetOrderByIdQuery(id);
  const {
    updateOrderStatus,
    addTrackingInfo,
    handleReturnAction, // Exposed from updated hook
    isUpdating,
    
  } = useOrderActions({
    orderId: id,
    currentStatus: order?.status as any,
    onSuccess: refetch,
  });

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
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push("/admin/orders")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCcw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <EmptyState
          title="Order not found"
          description="The order you're looking for doesn't exist."
          action={{ label: "Back to Orders", href: "/admin/orders" }}
        />
      </div>
    );
  }

  // Use the actual return status from the DB
  const activeReturnStatus = order.returnStatus;

  const processRazorpayRefund = () => {
    // Note: For Phase 6, this triggers your NestJS POST /api/payments/refund endpoint
    toast.info("Razorpay Refund API Trigger mechanism to be connected here.");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
      {/* ✅ Back Button + Refresh Button */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => router.push("/admin/orders")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
        </Button>
        
        {/* ✅ Refresh Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => refetch()}
          disabled={isLoading || isFetching}
          className="h-9 w-9 rounded-full"
          title="Refresh Order Data"
        >
          <RefreshCcw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* 🛡️ ADMIN RETURN MANAGEMENT BANNER */}
      {activeReturnStatus && (
        <Card className={`mb-8 border-2 shadow-md ${
          activeReturnStatus === 'REQUESTED' ? 'border-orange-300 bg-orange-50/50 dark:bg-orange-950/20' : 
          activeReturnStatus === 'APPROVED' ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20' : 
          activeReturnStatus === 'REFUNDED' ? 'border-blue-300 bg-blue-50/50 dark:bg-blue-950/20' : 
          'border-red-300 bg-red-50/50 dark:bg-red-950/20'
        }`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <RotateCcw className="h-5 w-5" /> Return Action Required
              <span className="ml-auto text-xs font-mono bg-background px-3 py-1 rounded-full border shadow-sm uppercase tracking-widest text-foreground">
                STATUS: {activeReturnStatus}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-background rounded-lg border p-4 mb-4 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Requested Resolution</p>
                  <p className="font-semibold text-lg">{order.returnType}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Customer Reason</p>
                  <p className="text-sm font-medium italic mt-1 leading-relaxed text-foreground/80">"{order.returnReason}"</p>
                </div>
              </div>
            </div>

            {/* Admin Action Buttons */}
            {activeReturnStatus === 'REQUESTED' && (
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => handleReturnAction('APPROVED')} 
                  disabled={isUpdating}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 px-6"
                >
                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                  Approve Request
                </Button>
                <Button 
                  onClick={() => handleReturnAction('REJECTED')} 
                  disabled={isUpdating}
                  variant="destructive" 
                  className="gap-2 px-6"
                >
                  <XCircle className="h-4 w-4" /> Reject Request
                </Button>
              </div>
            )}

            {/* Phase 2 of Return: The Actual Refund Action */}
            {activeReturnStatus === 'APPROVED' && order.returnType === 'REFUND' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                  Item approved for return. Once the package is received in the warehouse, trigger the payment reversal.
                </p>
                <Button 
                  onClick={processRazorpayRefund} 
                  disabled={isUpdating || order.status === 'REFUNDED'}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto shrink-0 shadow-md"
                >
                  <Banknote className="h-4 w-4" /> Process ₹{order.totalAmount.toLocaleString()} Refund
                </Button>
              </div>
            )}
            
            {order.status === 'REFUNDED' && (
              <p className="text-sm font-medium text-blue-700">✓ The payment has been reversed to the customer via Razorpay.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Warning for Abandoned Payments */}
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
          <h1 className="heading-lg font-primary">Order #{order.orderNumber}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <OrderStatusBadge status={order.status as any} size="lg" />
            <span className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => window.open(`/admin/orders/${id}/label`, '_blank')}
          >
            <Printer className="h-4 w-4" /> Print Label
          </Button>
          <StatusUpdateDropdown
            currentStatus={order.status as any}
            onStatusChange={(status: string) => updateOrderStatus(status)}
            isLoading={isUpdating}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><User className="h-4 w-4" /> Customer</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p className="text-muted-foreground">{order.shippingAddress.email}</p>
            <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><MapPin className="h-4 w-4" /> Shipping Address</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
            <p>{order.shippingAddress.pincode}</p>
            <p className="text-muted-foreground">{order.shippingAddress.country}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tracking Section */}
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Package className="h-4 w-4" /> Logistics & Shiprocket</CardTitle></CardHeader>
        <CardContent>
          <TrackingInput
            order={order}
            onUpdate={(data: any) => addTrackingInfo(data)}
            isLoading={isUpdating}
          />
        </CardContent>
      </Card>

      {/* Items List */}
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Receipt className="h-4 w-4" /> Order Items</CardTitle></CardHeader>
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
          <CardHeader><CardTitle className="text-base">Order Timeline</CardTitle></CardHeader>
          <CardContent><OrderTimeline status={order.status as any} /></CardContent>
        </Card>
      )}
    </div>
  );
}