"use client";

import { Loader2 } from "lucide-react";
import { Review } from "@/lib/store/apis/review-api";
import { ReviewStar } from "./review-star";
import { formatDistanceToNow } from "date-fns";

interface ReviewItemProps {
  review: Review;
  canDelete?: boolean;
  onDelete?: () => void;
  isDeleting?: boolean;
  hasReviewed?: boolean;
}

export function ReviewItem({ review, canDelete, onDelete, isDeleting, hasReviewed = false  }: ReviewItemProps) {

    if (hasReviewed) {
        return (
          <div className="rounded-lg border border-border bg-muted/30 p-5 text-center">
            <p className="text-muted-foreground">You have already reviewed this product.</p>
            <p className="text-sm text-muted-foreground mt-1">Thank you for your feedback!</p>
          </div>
        );
      }
  return (
    <div className="border-b border-border pb-4 last:border-0">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{review.userName}</span>
            {review.isVerified && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                Verified
              </span>
            )}
          </div>
          <ReviewStar rating={review.rating} size="sm" />
        </div>
        {canDelete && (
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              "Delete"
            )}
          </button>
        )}
      </div>
      {review.title && (
        <h4 className="mt-2 font-medium text-foreground">{review.title}</h4>
      )}
      <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
}