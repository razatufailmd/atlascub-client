"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FilterSidebar } from "@/components/products/filter-sidebar";
import { SortDropdown } from "@/components/products/sort-dropdown";
import { MobileFilters } from "@/components/products/mobile-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import { FilterState } from "@/types/globals";
import { EmptyState } from "@/components/shared/empty-state";

// Collection data with proper images
const mockCollectionData: Record<string, { 
  title: string; 
  description: string; 
  heroImage: string;
  productCount?: number;
}> = {
  "modern-festive": {
    title: "Modern Festive 2026",
    description: "An elegant blend of traditional patterns and contemporary drapes. Crafted for celebrations that demand timeless sophistication.",
    heroImage: "/images/collections/modern-festive.jpg",
    productCount: 24,
  },
  "pastel-dreams": {
    title: "Pastel Dreams",
    description: "Quiet, understated pastel hues tailored in light cottons and linen blends. Soft tones for the dreamer in you.",
    heroImage: "/images/collections/pastel-dreams.jpg",
    productCount: 18,
  },
  "summer-26": {
    title: "Summer Solstice",
    description: "Breathable, airy resort-wear for warm-weather adventures. Light fabrics that move with you.",
    heroImage: "/images/collections/summer-solstice.jpg",
    productCount: 32,
  },
  sale: {
    title: "Archive Sale",
    description: "Curated collections with limited-time archival pricing. Timeless pieces at exceptional value.",
    heroImage: "/images/collections/archive-sale.jpg",
    productCount: 45,
  },
};

// Fallback image for collections without custom hero
const FALLBACK_HERO = "/images/collections/fallback.jpg";

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

  // Get collection data or use fallback
  const collection = mockCollectionData[slug] || {
    title: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    description: "Explore our curated collection of premium apparel, crafted with attention to detail and timeless design.",
    heroImage: FALLBACK_HERO,
    productCount: 0,
  };

  // Mock empty products array (will be replaced with API data)
  const mockProducts: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      {/* Collection Hero Section */}
      <div className="relative h-[280px] md:h-[360px] lg:h-[400px] overflow-hidden bg-muted">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.src = FALLBACK_HERO;
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-4 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Collection Badge */}
            <span className="inline-block text-xs font-mono uppercase tracking-wider text-white/80 mb-3">
              Curated Collection
            </span>
            <h1 className="heading-xl md:heading-2xl font-primary text-white">
              {collection.title}
            </h1>
            <p className="mt-3 text-white/80 max-w-2xl text-base md:text-lg">
              {collection.description}
            </p>
            {collection.productCount && collection.productCount > 0 && (
              <p className="mt-4 text-sm text-white/60">
                {collection.productCount} products
              </p>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/40 text-xs font-mono uppercase tracking-wider"
          >
            Scroll
          </motion.div>
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
            {mockProducts.length === 0 && !isLoading && (
              <div className="py-12">
                <EmptyState
                  title="Coming Soon"
                  description="Products in this collection will be available shortly. Stay tuned for updates!"
                />
              </div>
            )}
            
            <ProductGrid
              products={mockProducts}
              isLoading={isLoading}
              columns={4}
            />
            
            {mockProducts.length > 0 && (
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Showing {mockProducts.length} products
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}