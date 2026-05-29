"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FilterSidebar } from "@/components/products/filter-sidebar";
import { SortDropdown } from "@/components/products/sort-dropdown";
import { MobileFilters } from "@/components/products/mobile-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { getCategoryTitle, getCategoryDescription } from "@/lib/constants/categories";
import { FilterState } from "@/types/globals";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";

// Mock data - will be replaced with API calls
const mockProducts: any[] = [];

export default function CategoryPage() {
  const params = useParams();
  const gender = params.gender as string;
  const category = params.category as string;

  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    priceRange: [0, 50000],
    inStockOnly: false,
    sortBy: "newest",
  });

  const [isLoading, setIsLoading] = useState(false);

  const categoryTitle = getCategoryTitle(category);
  const categoryDescription = getCategoryDescription(category);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <SlugBreadcrumb />
      </div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="heading-lg font-primary">{categoryTitle}</h1>
        <p className="mt-2 text-muted-foreground">{categoryDescription}</p>
      </div>

      {/* Filters and Sort Row */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Desktop Filters Button */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
            />
          </div>
          
          {/* Mobile Filters */}
          <MobileFilters filters={filters} onChange={setFilters} />
          
          {/* Active Filters Count */}
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
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
            />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid
            products={mockProducts}
            isLoading={isLoading}
            columns={4}
          />
          
          {/* Results Count */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {mockProducts.length} products
          </div>
        </div>
      </div>
    </div>
  );
}