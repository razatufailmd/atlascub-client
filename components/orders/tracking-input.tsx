"use client";

import { useState } from "react";
import { Truck, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TrackingInputProps {
  currentTracking?: string;
  onUpdate: (trackingNumber: string) => Promise<void>;
  isLoading?: boolean;
}

export function TrackingInput({
  currentTracking,
  onUpdate,
  isLoading = false,
}: TrackingInputProps) {
  const [trackingNumber, setTrackingNumber] = useState(currentTracking || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(trackingNumber.trim());
      toast.success("Tracking number updated");
    } catch (error) {
      toast.error("Failed to update tracking number");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Truck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder={currentTracking || "Enter tracking number..."}
          className="pl-9"
          disabled={isLoading || isUpdating}
        />
      </div>
      <Button type="submit" disabled={isLoading || isUpdating}>
        {isUpdating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
}