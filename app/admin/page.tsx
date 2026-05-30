"use client";

import { motion } from "framer-motion";
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, Eye } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useUser } from "@clerk/nextjs";

// Mock data - replace with API calls
const stats = [
  {
    title: "Total Revenue",
    value: "₹0",
    icon: DollarSign,
    trend: { value: 0, isPositive: true },
  },
  {
    title: "Total Orders",
    value: "0",
    icon: ShoppingCart,
    trend: { value: 0, isPositive: true },
  },
  {
    title: "Total Customers",
    value: "1",
    icon: Users,
    trend: { value: 0, isPositive: true },
  },
  {
    title: "Conversion Rate",
    value: "0%",
    icon: TrendingUp,
    trend: { value: 0, isPositive: false },
  },
];

const recentOrders: any[] = [];
const lowStockProducts: any[] = [];

export default function AdminDashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 p-6"
      >
        <h1 className="heading-md font-primary">
          Welcome back, {user?.firstName || "Admin"}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here's what's happening with your store today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Recent Orders */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        {recentOrders.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <EmptyState
                title="No orders yet"
                description="Orders will appear here once customers start shopping"
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              {/* Order table will go here */}
            </CardContent>
          </Card>
        )}
      </section>

      {/* Low Stock Alert */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Low Stock Alert</h2>
          <Button variant="ghost" size="sm">
            View All Products
          </Button>
        </div>
        {lowStockProducts.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <EmptyState
                title="All products in stock"
                description="No low inventory alerts at this time"
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              {/* Low stock table will go here */}
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}