"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FilterSidebar } from "@/components/products/filter-sidebar";
import { SortDropdown } from "@/components/products/sort-dropdown";
import { MobileFilters } from "@/components/products/mobile-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterState } from "@/types/globals";



// Mock data - will be replaced with API call
import {collections as mockCollectionData}  from "@/lib/constants/collections"

// Mock products (empty for now, will be populated from API)
const mockProducts: any[] = [];

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    priceRange: [0, 50000],
    inStockOnly: false,
    sortBy: "newest",
  });

  const [isLoading, setIsLoading] = useState(false);

  const collection = mockCollectionData[slug] || {
    title: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    description: "Explore our curated collection of premium apparel, crafted with attention to detail and timeless design.",
    heroImage: "/images/collections/fallback.jpg",
  };

  return (
    <div className="min-h-screen bg-background">
       

      {/* Collection Hero Section */}
      <div className="relative h-[280px] md:h-[320px] overflow-hidden bg-muted">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={collection.heroImage}
            alt={collection.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
        </div>
        <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-4 pb-12">
          <h1 className="heading-xl font-primary text-white">{collection.title}</h1>
          <p className="mt-2 text-white/80 max-w-2xl">{collection.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <SlugBreadcrumb />
        </div>

        {/* Filters and Sort Row */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
              />
            </div>
            
            <MobileFilters filters={filters} onChange={setFilters} />
            
            {(filters.sizes.length > 0 || filters.colors.length > 0 || filters.inStockOnly) && (
              <span className="text-xs text-muted-foreground">
                {filters.sizes.length + filters.colors.length + (filters.inStockOnly ? 1 : 0)} filters active
              </span>
            )}
          </div>

          <SortDropdown
            value={filters.sortBy}
            onChange={(value) => setFilters({ ...filters, sortBy: value })}
          />
        </div>

        {/* Desktop Layout: Sidebar + Grid */}
        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
              />
            </div>
          </aside>

          <div className="flex-1">
            <ProductGrid
              products={mockProducts}
              isLoading={isLoading}
              columns={4}
            />
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Showing {mockProducts.length} products
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}