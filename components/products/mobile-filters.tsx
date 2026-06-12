"use client";

import { FilterSidebar } from "./filter-sidebar";
import { FilterState } from "@/types/globals";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface MobileFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function MobileFilters({ filters, onChange }: MobileFiltersProps) {
  const activeCount = filters.sizes.length + filters.colors.length + (filters.inStockOnly ? 1 : 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 lg:hidden">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm p-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <FilterSidebar
            filters={filters}
            onChange={onChange}
            onClose={() => document.body.click()}
            isMobile
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}