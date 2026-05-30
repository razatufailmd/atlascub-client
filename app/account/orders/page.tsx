"use client";

import Link from "next/link";
import { Package, ArrowRight, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";

// Mock orders - replace with API data
const mockOrders: any[] = [];

const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return "bg-green-500";
    case "SHIPPED":
      return "bg-blue-500";
    case "PAID":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

export default function AccountOrdersPage() {
  if (mockOrders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No orders yet"
            description="When you place an order, it will appear here"
            icon={Package}
            action={{
              label: "Start Shopping",
              href: "/shop",
            }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-wrap items-center justify-between rounded-lg border border-border p-4"
            >
              <div>
                <p className="font-medium">Order #{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              <div>
                <p className="font-medium">₹{order.total}</p>
                <p className="text-sm text-muted-foreground">{order.items} items</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/account/orders/${order.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}