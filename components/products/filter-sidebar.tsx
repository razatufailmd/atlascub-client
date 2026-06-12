"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { FilterState } from "@/types/globals";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Available options (can be fetched from API later)
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const availableColors = [
  { name: "Black", value: "#1a1a1a" },
  { name: "White", value: "#ffffff" },
  { name: "Navy", value: "#1a2b4c" },
  { name: "Sage Green", value: "#9caf88" },
  { name: "Burgundy", value: "#8b2c2c" },
  { name: "Beige", value: "#d4c5a9" },
  { name: "Charcoal", value: "#4a4a4a" },
];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({ filters, onChange, onClose, isMobile }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Sync local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...localFilters, ...updates };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onChange(localFilters);
    if (onClose) onClose();
  };

  const toggleSize = (size: string) => {
    const newSizes = localFilters.sizes.includes(size)
      ? localFilters.sizes.filter((s) => s !== size)
      : [...localFilters.sizes, size];
    updateFilters({ sizes: newSizes });
  };

  const toggleColor = (colorName: string) => {
    const newColors = localFilters.colors.includes(colorName)
      ? localFilters.colors.filter((c) => c !== colorName)
      : [...localFilters.colors, colorName];
    updateFilters({ colors: newColors });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      sizes: [],
      colors: [],
      priceRange: [0, 50000] as [number, number],
      inStockOnly: false,
      sortBy: "newest" as const,
    };
    setLocalFilters(clearedFilters);
    onChange(clearedFilters);
    if (onClose) onClose();
  };

  const hasActiveFilters =
    localFilters.sizes.length > 0 ||
    localFilters.colors.length > 0 ||
    localFilters.priceRange[0] > 0 ||
    localFilters.priceRange[1] < 50000 ||
    localFilters.inStockOnly;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <h3 className="font-medium">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-auto text-xs text-muted-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Price Range</h4>
        <div className="pt-2 px-1">
          <Slider
            value={[localFilters.priceRange[0], localFilters.priceRange[1]]}
            min={0}
            max={50000}
            step={500}
            onValueChange={(value) => updateFilters({ priceRange: [value[0], value[1]] })}
            className="mb-4"
          />
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 rounded-md border border-border px-3 py-1.5">
              <span className="text-xs text-muted-foreground">Min</span>
              <p className="text-sm font-medium">₹{localFilters.priceRange[0].toLocaleString()}</p>
            </div>
            <span className="text-muted-foreground">—</span>
            <div className="flex-1 rounded-md border border-border px-3 py-1.5">
              <span className="text-xs text-muted-foreground">Max</span>
              <p className="text-sm font-medium">₹{localFilters.priceRange[1].toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Size */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Size</h4>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`h-9 w-10 rounded-md border text-sm transition-all ${
                localFilters.sizes.includes(size)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Color */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Color</h4>
        <div className="flex flex-wrap gap-3">
          {availableColors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`relative h-8 w-8 rounded-full border-2 transition-all ${
                localFilters.colors.includes(color.name)
                  ? "border-primary scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* In Stock Only */}
      <div className="flex items-center justify-between">
        <Label htmlFor="inStock" className="cursor-pointer">
          In Stock Only
        </Label>
        <Checkbox
          id="inStock"
          checked={localFilters.inStockOnly}
          onCheckedChange={(checked) => updateFilters({ inStockOnly: checked === true })}
        />
      </div>

      {/* Apply Button (for mobile) */}
      {isMobile && (
        <div className="sticky bottom-0 mt-6 bg-background pt-4 pb-6">
          <Button className="w-full" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 lg:hidden">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {localFilters.sizes.length + localFilters.colors.length + (localFilters.inStockOnly ? 1 : 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-sm p-4 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return <FilterContent />;
}