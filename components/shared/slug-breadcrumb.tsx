"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { genderMetadata, getCategoryTitle } from "@/lib/constants/categories";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function SlugBreadcrumb() {
  const pathname = usePathname();
  const params = useParams();
  const gender = params.gender as string;
  const category = params.category as string;

  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    if (gender && genderMetadata[gender as keyof typeof genderMetadata]) {
      const genderTitle = genderMetadata[gender as keyof typeof genderMetadata].title;
      breadcrumbs.push({
        label: genderTitle,
        href: `/${gender}`,
      });
    }

    if (category) {
      const categoryTitle = getCategoryTitle(category);
      breadcrumbs.push({
        label: categoryTitle,
        href: `/${gender}/${category}`,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        if (isLast) {
          return (
            <span key={item.href} className="text-muted-foreground font-medium">
              {item.label}
            </span>
          );
        }

        return (
          <div key={item.href} className="flex items-center gap-2">
            <Link
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label === "Home" ? <Home className="h-3.5 w-3.5" /> : item.label}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        );
      })}
    </nav>
  );
}