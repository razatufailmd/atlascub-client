"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, MoreHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/lib/store/apis/product-api";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch products with RTK Query
  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    search: search || undefined,
    page,
    limit,
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const products = data?.data || [];
  const totalPages = data?.totalPages || 0;

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="mt-1 h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-full max-w-sm" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-md font-primary">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button className="gap-2" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
        <Card>
          <CardContent className="py-12">
            <EmptyState
              title="Failed to load products"
              description="There was an error loading your products. Please try again."
              action={{
                label: "Retry",
                onClick: () => refetch(),
              }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="heading-md font-primary">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="pl-9"
        />
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total {data?.total || 0} products found
          </p>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <EmptyState
              title="No products found"
              description={
                search
                  ? `No products matching "${search}"`
                  : "Start adding products to your catalog"
              }
              action={{
                label: search ? "Clear Search" : "Add Your First Product",
                onClick: search ? () => setSearch("") : undefined,
                href: !search ? "/admin/products/new" : undefined,
              }}
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Inventory</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-md bg-muted">
                              {product.images[0] ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                                  No img
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="line-clamp-1 font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {product.slug}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{product.category}</TableCell>
                        <TableCell className="capitalize">{product.gender}</TableCell>
                        <TableCell>₹{product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <span
                            className={
                              product.inventory <= 5
                                ? "text-orange-600"
                                : "text-green-600"
                            }
                          >
                            {product.inventory} units
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.inStock ? (
                              <Badge
                                variant="outline"
                                className="border-green-500 text-green-600"
                              >
                                In Stock
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="border-red-500 text-red-600"
                              >
                                Out of Stock
                              </Badge>
                            )}
                            {product.isNew && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                New
                              </Badge>
                            )}
                            {product.isBestSeller && (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                                Bestseller
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            // Update the DropdownMenuContent section:
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild className="gap-2">
                                <Link href={`/admin/products/${product.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 text-destructive"
                                onClick={() => handleDelete(product.id, product.name)}
                                disabled={isDeleting}
                              >
                                {isDeleting ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}