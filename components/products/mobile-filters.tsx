"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FilterSidebar } from "./filter-sidebar";
import { FilterState } from "@/types/globals";


interface MobileFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function MobileFilters({ filters, onChange }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  const activeFilterCount =
    filters.sizes.length + filters.colors.length + (filters.inStockOnly ? 1 : 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 border-border lg:hidden">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm p-0">
        <FilterSidebar
          filters={filters}
          onChange={onChange}
          onClose={() => setOpen(false)}
          isMobile
        />
      </SheetContent>
    </Sheet>
  );
}