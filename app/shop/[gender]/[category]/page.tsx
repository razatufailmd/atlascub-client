"use client";

import { useParams } from "next/navigation";
import { FilterSidebar } from "@/components/products/filter-sidebar";
import { SortDropdown } from "@/components/products/sort-dropdown";
import { MobileFilters } from "@/components/products/mobile-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import { useProductFilters } from "@/hooks/use-product-filters";
import { useGetProductsQuery } from "@/lib/store/apis/product-api";
import { useGetCategoryBySlugQuery } from "@/lib/store/apis/category-api";

export default function CategoryPage() {
  const params = useParams();
  const gender = params.gender as string;
  const categorySlug = params.category as string;

  const { data: category, isLoading: categoryLoading } = useGetCategoryBySlugQuery({
    gender,
    slug: categorySlug,
  });

  const { filters, updateFilters, hasActiveFilters, clearFilters } = useProductFilters();

  // Build query params - ensure arrays are sent properly
  const queryParams = {
    gender: gender,
    category: categorySlug,
    sizes: filters.sizes.length > 0 ? filters.sizes : undefined,
    colors: filters.colors.length > 0 ? filters.colors : undefined,
    minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
    maxPrice: filters.priceRange[1] < 50000 ? filters.priceRange[1] : undefined,
    inStock: filters.inStockOnly ? "true" : undefined,
    sortBy: filters.sortBy !== "newest" ? filters.sortBy : undefined,
    page: 1,
    limit: 12,
  };

  const { data, isLoading, isFetching } = useGetProductsQuery(queryParams);
  
  const products = data?.data || [];
  const totalProducts = data?.total || 0;

  const categoryTitle = category?.name || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  const categoryDescription = category?.description || `Explore our collection of ${categoryTitle.toLowerCase()}`;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
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
          {/* Mobile Filters */}
          <MobileFilters filters={filters} onChange={updateFilters} />
          
          {/* Active Filters Indicator */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        <SortDropdown
          value={filters.sortBy}
          onChange={(value) => updateFilters({ sortBy: value })}
        />
      </div>

      {/* Main Content: Sidebar + Grid */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Desktop Sidebar */}
        <aside className="lg:w-64 lg:shrink-0">
          <div className="sticky top-24 hidden lg:block">
            <FilterSidebar
              filters={filters}
              onChange={updateFilters}
            />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid
            products={products}
            isLoading={isLoading || isFetching || categoryLoading}
            columns={4}
          />
          
          {/* Results Count */}
          {!isLoading && products.length > 0 && (
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Showing {products.length} of {totalProducts} products
            </div>
          )}
        </div>
      </div>
    </div>
  );
}