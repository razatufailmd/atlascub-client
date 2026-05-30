"use client";

import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

// Mock addresses - replace with API data
const mockAddresses: any[] = [];

export default function AccountAddressPage() {
  if (mockAddresses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No addresses saved"
            description="Add your first shipping address for faster checkout"
            icon={MapPin}
            action={{
              label: "Add New Address",
              onClick: () => console.log("Add address"),
            }}
          />
          <div className="mt-4 flex justify-center">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Address
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Saved Addresses</CardTitle>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Address
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Address list will go here */}
        </div>
      </CardContent>
    </Card>
  );
}