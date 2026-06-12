"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { SlugBreadcrumb } from "@/components/shared/slug-breadcrumb";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { ProductHeader } from "@/components/product/product-header";
import { ProductInfoTabs } from "@/components/product/product-info-tabs";
import { RelatedProducts } from "@/components/product/related-products";
import { ReviewItem } from "@/components/product/review-item";
import { ReviewForm } from "@/components/product/review-form";
import { ReviewStar } from "@/components/product/review-star";
import { useProduct } from "@/hooks/use-product";
import { ProductActions } from "@/components/product/product-aciton";
import {
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} from "@/lib/store/apis/review-api";
import { useGetProductsQuery } from "@/lib/store/apis/product-api";

export default function ProductDetailPage() {
  const { product, isLoading, isError, refetch: refetchProduct } = useProduct();
  const { user } = useUser();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isDeletingReview, setIsDeletingReview] = useState<string | null>(null);
  
  // Fetch reviews
  const {
    data: reviews,
    isLoading: reviewsLoading,
    isError: reviewsError,
    refetch: refetchReviews,
  } = useGetProductReviewsQuery(product?.id || "", {
    skip: !product?.id,
  });
  
  // Check if current user has already reviewed
  const hasUserReviewed = reviews?.some(review => review.userId === user?.id) || false;

  // Fetch related products (same category, different products)
  const { data: relatedProductsData } = useGetProductsQuery(
    {
      gender: product?.gender,
      category: product?.category?.slug,
      limit: 4,
    },
    {
      skip: !product?.id,
    }
  );

  const [createReview, { isLoading: isSubmittingReview }] = useCreateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  // Filter out current product from related products
  const relatedProducts = relatedProductsData?.data?.filter(
    (p) => p.id !== product?.id
  ) || [];

  const handleSubmitReview = async (data: {
    rating: number;
    title: string;
    comment: string;
  }) => {
    if (!product?.id) {
      toast.error("Unable to submit review");
      return;
    }

    try {
      await createReview({
        productId: product.id,
        rating: data.rating,
        title: data.title,
        comment: data.comment,
      }).unwrap();
      toast.success("Review submitted successfully!");
      setShowReviewForm(false);
      refetchReviews();
      refetchProduct();
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    setIsDeletingReview(reviewId);
    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted successfully");
      refetchReviews();
      refetchProduct();
    } catch (error) {
      toast.error("Failed to delete review");
    } finally {
      setIsDeletingReview(null);
    }
  };

  // Calculate review statistics
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
  const totalReviews = reviews?.length || 0;

  // Loading State
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Skeleton className="mb-6 h-6 w-48" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-10 w-32" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SlugBreadcrumb />
        <EmptyState
          title="Product not found"
          description="The product you're looking for doesn't exist or has been removed."
          action={{
            label: "Continue Shopping",
            href: "/shop",
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <SlugBreadcrumb />
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Gallery */}
          <ImageCarousel images={product.images} alt={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            <ProductHeader product={product} />
            <ProductActions product={product} />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <ProductInfoTabs
            details={product.details || product.description || ""}
            sizing={
              product.sizing || "Refer to size chart in product images"
            }
            shipping={
              product.shipping ||
              "Free shipping on orders over ₹5000. Delivery in 3-5 business days."
            }
          />
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="heading-sm font-primary">Customer Reviews</h2>
              <div className="flex items-center gap-3 mt-1">
                <ReviewStar rating={Math.round(averageRating)} />
                <span className="text-sm text-muted-foreground">
                  {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                </span>
                {averageRating > 0 && (
                  <span className="text-sm font-medium text-foreground">
                    {averageRating.toFixed(1)} / 5
                  </span>
                )}
              </div>
            </div>
            {user && !showReviewForm && !hasUserReviewed && (
              <Button onClick={() => setShowReviewForm(true)}>Write a Review</Button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-6">
              <ReviewForm
                productId={product.id}
                onSubmit={handleSubmitReview}
                onCancel={() => setShowReviewForm(false)}
                isSubmitting={isSubmittingReview}
              />
            </div>
          )}

          {/* Reviews List */}
          {reviewsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-border pb-4">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : reviewsError ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Failed to load reviews</p>
              <Button
                variant="link"
                onClick={() => refetchReviews()}
                className="mt-2"
              >
                Try again
              </Button>
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="space-y-4 max-h-[500px] overflow-auto pr-2">
              {reviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  review={review}
                  canDelete={review.userId === user?.id}
                  onDelete={() => handleDeleteReview(review.id)}
                  isDeleting={isDeletingReview === review.id}
                  hasReviewed={hasUserReviewed}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-lg">
              No reviews yet. Be the first to review this product!
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}