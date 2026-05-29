"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { FilterState } from "@/types/globals";


// Available filter options (will come from API in production)
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const availableColors = [
  { name: "Black", value: "#1a1a1a" },
  { name: "White", value: "#ffffff" },
  { name: "Navy", value: "#1a2b4c" },
  { name: "Sage Green", value: "#9caf88" },
  { name: "Burgundy", value: "#8b2c2c" },
  { name: "Beige", value: "#d4c5a9" },
];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({ filters, onChange, onClose, isMobile }: FilterSidebarProps) {
  const updateFilters = (updates: Partial<FilterState>) => {
    onChange({ ...filters, ...updates });
  };

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    updateFilters({ sizes: newSizes });
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    updateFilters({ colors: newColors });
  };

  const clearAllFilters = () => {
    onChange({
      sizes: [],
      colors: [],
      priceRange: [0, 50000],
      inStockOnly: false,
      sortBy: "newest",
    });
  };

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.inStockOnly ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 50000;

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

      {/* Category Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Category</h4>
        <div className="space-y-2">
          {["Tops", "Bottoms", "Outerwear", "Accessories"].map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <Checkbox checked={false} />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Price Range</h4>
        <div className="pt-2 px-1">
          <Slider
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            min={0}
            max={50000}
            step={500}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onValueChange={(value) => updateFilters({ priceRange: [value[0], value[1]] })}
            className="mb-4"
          />
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 rounded-md border border-border px-3 py-1.5">
              <span className="text-xs text-muted-foreground">Min</span>
              <p className="text-sm font-medium">₹{filters.priceRange[0].toLocaleString()}</p>
            </div>
            <span className="text-muted-foreground">—</span>
            <div className="flex-1 rounded-md border border-border px-3 py-1.5">
              <span className="text-xs text-muted-foreground">Max</span>
              <p className="text-sm font-medium">₹{filters.priceRange[1].toLocaleString()}</p>
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
                filters.sizes.includes(size)
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
                filters.colors.includes(color.name)
                  ? "border-primary scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: color.value, borderColor: color.value === "#ffffff" ? "#e5e5e5" : undefined }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="inStock" className="cursor-pointer">
            In Stock Only
          </Label>
          <Checkbox
            id="inStock"
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => updateFilters({ inStockOnly: checked === true })}
          />
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="h-[calc(100vh-56px)] overflow-y-auto p-4">
          <FilterContent />
          <div className="sticky bottom-0 mt-6 bg-background pt-4 pb-6">
            <Button className="w-full" onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <FilterContent />;
}