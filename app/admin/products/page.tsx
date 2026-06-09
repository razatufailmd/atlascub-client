"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, Search, Edit, Trash2, MoreHorizontal, 
  Loader2, Eye, EyeOff 
} from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { toast } from "sonner";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useHardDeleteProductMutation,
} from "@/lib/store/apis/product-api";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [productToAction, setProductToAction] = useState<{ id: string; name: string; action: 'soft' | 'hard' } | null>(null);
  const limit = 10;

  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    search: search || undefined,
    page,
    limit,
  });

  const [softDelete, { isLoading: isSoftDeleting }] = useDeleteProductMutation();
  const [hardDelete, { isLoading: isHardDeleting }] = useHardDeleteProductMutation();

  const products = data?.data || [];
  const totalPages = data?.totalPages || 0;
  const isDeleting = isSoftDeleting || isHardDeleting;

  const handleSoftDelete = async (id: string, name: string) => {
    try {
      await softDelete(id).unwrap();
      toast.success(`"${name}" has been hidden from storefront`);
      refetch();
    } catch (error) {
      toast.error("Failed to hide product");
    }
    setProductToAction(null);
  };

  const handleHardDelete = async (id: string, name: string) => {
    try {
      await hardDelete(id).unwrap();
      toast.success(`"${name}" has been permanently deleted`);
      refetch();
    } catch (error) {
      toast.error("Failed to delete product permanently");
    }
    setProductToAction(null);
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
              action={{ label: "Retry", onClick: () => refetch() }}
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
        <Button asChild className="gap-2">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search */}
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
              description={search ? `No products matching "${search}"` : "Start adding products to your catalog"}
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
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                  No img
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="line-clamp-1 font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.slug}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{product.category}</TableCell>
                        <TableCell className="capitalize">{product.gender}</TableCell>
                        <TableCell>₹{product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={product.inventory <= 5 ? "text-orange-600" : "text-green-600"}>
                            {product.inventory} units
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className={product.inStock ? "border-green-500 text-green-600" : "border-red-500 text-red-600"}>
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                            {product.isNew && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">New</Badge>
                            )}
                            {product.isBestSeller && (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-700">Bestseller</Badge>
                            )}
                            {product.deletedAt && (
                              <Badge variant="outline" className="border-gray-500 text-gray-500">Hidden</Badge>
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
                            <DropdownMenuContent align="end">
                              {/* Edit */}
                              <DropdownMenuItem asChild className="gap-2">
                                <Link href={`/admin/products/${product.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>

                              {/* View on Storefront */}
                              <DropdownMenuItem asChild className="gap-2">
                                <Link href={`/product/${product.slug}`} target="_blank">
                                  <Eye className="h-4 w-4" />
                                  View on Store
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              {/* Hide/Unhide (Soft Delete/Restore) */}
                              {product.deletedAt ? (
                                <DropdownMenuItem 
                                  className="gap-2 text-green-600"
                                  onClick={() => handleSoftDelete(product.id, product.name)}
                                  disabled={isDeleting}
                                >
                                  {isSoftDeleting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                  Restore to Store
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem 
                                  className="gap-2 text-amber-600"
                                  onClick={() => setProductToAction({ id: product.id, name: product.name, action: 'soft' })}
                                  disabled={isDeleting}
                                >
                                  <EyeOff className="h-4 w-4" />
                                  Hide from Store
                                </DropdownMenuItem>
                              )}

                              {/* Permanent Delete */}
                              <DropdownMenuItem 
                                className="gap-2 text-destructive"
                                onClick={() => setProductToAction({ id: product.id, name: product.name, action: 'hard' })}
                                disabled={isDeleting}
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete Permanently
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
                  <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!productToAction} onOpenChange={() => setProductToAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {productToAction?.action === 'soft' ? 'Hide Product' : 'Permanently Delete Product'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {productToAction?.action === 'soft' 
                ? `"${productToAction?.name}" will be hidden from the storefront. You can restore it later.`
                : `Are you sure you want to permanently delete "${productToAction?.name}"? This action cannot be undone and will also delete all product images from Cloudinary.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (productToAction) {  // Add null check
                  if (productToAction.action === 'soft') {
                    handleSoftDelete(productToAction.id, productToAction.name);
                  } else if (productToAction.action === 'hard') {
                    handleHardDelete(productToAction.id, productToAction.name);
                  }
                }
              }}
              className={productToAction?.action === 'soft' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-destructive hover:bg-destructive/90'}
            >
              {productToAction?.action === 'soft' ? 'Hide Product' : 'Permanently Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}