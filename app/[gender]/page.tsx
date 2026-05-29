"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories, genderMetadata } from "@/lib/constants/categories";
import { ProductGrid } from "@/components/products/product-grid";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";

// Mock data - will be replaced with API calls
const mockProducts = {
  newArrivals: [],
  bestSellers: [],
};

export default function GenderPage() {
  const params = useParams();
  const gender = params.gender as string;
  const genderCategories = categories[gender as keyof typeof categories] || [];
  const metadata = genderMetadata[gender as keyof typeof genderMetadata];

  if (!metadata) return null;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
         {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <SlugBreadcrumb />
      </div>

      {/* Category Navigation - Horizontal Scroll */}
      <div className="mb-12 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-4 min-w-max">
          {genderCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/${gender}/${category.slug}`}
              className="group whitespace-nowrap rounded-full border border-border px-5 py-2 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* New Arrivals Section */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="heading-md font-primary">New Arrivals</h2>
            <p className="text-sm text-muted-foreground">Fresh styles just landed</p>
          </div>
          <Link
            href={`/${gender}?filter=new`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid
          products={mockProducts.newArrivals}
          isLoading={true}
          columns={4}
        />
      </section>

      {/* Best Sellers Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="heading-md font-primary">Best Sellers</h2>
            <p className="text-sm text-muted-foreground">Customer favorites</p>
          </div>
          <Link
            href={`/${gender}?filter=bestsellers`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid
          products={mockProducts.bestSellers}
          isLoading={true}
          columns={4}
        />
      </section>
    </div>
  );
}