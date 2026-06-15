"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Filter, X, Search as SearchIcon, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SortDropdown } from "@/components/products/sort-dropdown";
import { ProductGrid } from "@/components/products/product-grid";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useGetProductsQuery } from "@/lib/store/apis/product-api";

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const genders = ["men", "women", "kids"];

function SearchPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // URL Params state
  const urlQuery = searchParams.get("q") || "";
  
  // Local state for the in-page search bar
  const [localSearchInput, setLocalSearchInput] = useState(urlQuery);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "price_asc" | "price_desc" | "popularity">("newest");
  const [page, setPage] = useState(1);

  // Sync local input when URL changes (e.g. from header search)
  useEffect(() => {
    setLocalSearchInput(urlQuery);
  }, [urlQuery]);

  // Build query params for the RTK Query
  const queryParams = {
    search: urlQuery || undefined,
    gender: selectedGender !== "all" ? selectedGender : undefined,
    sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
    sortBy: sortBy !== "newest" ? sortBy : undefined,
    page,
    limit: 12,
  };

  const { data, isLoading, isFetching } = useGetProductsQuery(queryParams);
  
  const products = data?.data || [];
  const totalProducts = data?.total || 0;
  const totalPages = data?.totalPages || 0;

  // 🛡️ Handles the in-page search submission
  const handlePageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (localSearchInput.trim()) {
      params.set("q", localSearchInput.trim());
    } else {
      params.delete("q");
    }
    setPage(1); // Reset page on new search
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
    setPage(1);
  };

  const toggleGender = (gender: string) => {
    setSelectedGender(gender);
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedGender("all");
    setPage(1);
  };

  const clearEverything = () => {
    clearFilters();
    setLocalSearchInput("");
    router.push(pathname); // Removes all query params completely
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedGender !== "all";

  const SizeFilterContent = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Category</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {genders.map((gender) => (
            <button
              key={gender}
              onClick={() => toggleGender(gender)}
              className={`h-9 px-4 rounded-full border text-sm font-medium transition-all duration-300 ${
                selectedGender === gender
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/60 bg-muted/20 hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3 pt-4 border-t border-border/40">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Size</h3>
          {selectedSizes.length > 0 && (
            <button onClick={() => setSelectedSizes([])} className="text-xs text-primary hover:underline font-medium">
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`h-10 w-12 rounded-lg border text-sm font-medium transition-all duration-300 ${
                selectedSizes.includes(size)
                  ? "border-primary bg-primary text-primary-foreground shadow-sm scale-105"
                  : "border-border/60 bg-muted/20 hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Search Hero Section */}
      <div className="bg-muted/30 border-b border-border/40 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="heading-xl font-primary mb-6">Find Your Style</h1>
            
            {/* 🛡️ New In-Page Search Bar */}
            <form onSubmit={handlePageSearch} className="relative flex items-center shadow-sm rounded-full bg-background border border-border/50 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <SearchIcon className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for hoodies, sneakers, collections..."
                value={localSearchInput}
                onChange={(e) => setLocalSearchInput(e.target.value)}
                className="pl-12 pr-24 h-14 rounded-full border-none shadow-none focus-visible:ring-0 text-lg bg-transparent"
              />
              <div className="absolute right-2 flex items-center gap-1">
                {localSearchInput && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => setLocalSearchInput("")} className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button type="submit" className="rounded-full px-6 h-10">
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <SlugBreadcrumb />
          <div className="text-sm text-muted-foreground hidden md:block">
            {isFetching ? <Loader2 className="h-4 w-4 animate-spin inline mr-2" /> : <Sparkles className="h-4 w-4 inline mr-2 text-primary" />}
            {totalProducts} Results
          </div>
        </div>

        {/* Filters and Sort Row */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-card border border-border/40 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            
            {/* Mobile Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" className="gap-2 lg:hidden rounded-full">
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {(selectedSizes.length) + (selectedGender !== "all" ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm p-6">
                <SheetHeader className="mb-6">
                  <SheetTitle className="font-primary text-2xl">Filters</SheetTitle>
                </SheetHeader>
                <SizeFilterContent />
                <div className="mt-8 pt-6 border-t">
                  <Button className="w-full" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))}>
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Filters (Inline Pills) */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">Gender:</span>
                {genders.map(g => (
                  <button 
                    key={g} onClick={() => toggleGender(g)}
                    className={`text-sm px-3 py-1.5 rounded-full transition-colors ${selectedGender === g ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted text-muted-foreground"}`}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
              <div className="w-px h-6 bg-border/60" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">Sizes:</span>
                {availableSizes.slice(0, 4).map(s => (
                   <button 
                   key={s} onClick={() => toggleSize(s)}
                   className={`text-sm px-3 py-1.5 rounded-full transition-colors ${selectedSizes.includes(s) ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted text-muted-foreground"}`}
                 >
                   {s}
                 </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            {(hasActiveFilters || urlQuery) && (
              <button
                onClick={clearEverything}
                className="flex items-center gap-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-full transition-colors ml-2"
              >
                <X className="h-3 w-3" />
                Clear All
              </button>
            )}
          </div>

          <SortDropdown value={sortBy} onChange={(value) => { setSortBy(value); setPage(1); }} />
        </div>

        {/* Results Count & Empty States */}
        <AnimatePresence mode="wait">
          {!isLoading && !isFetching && products.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center py-20 bg-muted/10 rounded-3xl border border-dashed border-border"
            >
              <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find anything matching "{urlQuery}" with your current filters.
              </p>
              <Button onClick={clearEverything} className="rounded-full px-8">
                Clear all filters & search
              </Button>
            </motion.div>
          ) : (
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
              <ProductGrid products={products} isLoading={isLoading || isFetching} columns={4} />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-3">
                  <Button variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded-full">
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setPage(i + 1)}
                        className={`h-8 w-8 rounded-full text-sm font-medium transition-colors ${page === i + 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <Button variant="outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-full">
                    Next
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 🛡️ Wrapper component to handle Next.js App Router Suspense requirements for useSearchParams
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}