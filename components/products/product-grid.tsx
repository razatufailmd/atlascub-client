"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Product } from "@/types/globals";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, isLoading = false, columns = 4 }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 gap-4 sm:gap-6 ${
        columns === 4 ? "lg:grid-cols-3 xl:grid-cols-4" : 
        columns === 3 ? "lg:grid-cols-3" : 
        "lg:grid-cols-2"
      }`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] rounded-lg bg-muted" />
            <div className="mt-3 h-4 w-3/4 rounded bg-muted" />
            <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try adjusting your filters or search terms"
        action={{
          label: "Clear all filters",
          onClick: () => window.location.reload(),
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`grid grid-cols-2 gap-4 sm:gap-6 ${
        columns === 4 ? "lg:grid-cols-3 xl:grid-cols-4" : 
        columns === 3 ? "lg:grid-cols-3" : 
        "lg:grid-cols-2"
      }`}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </motion.div>
  );
}