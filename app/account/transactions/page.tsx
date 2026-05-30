"use client";

import { Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

// Mock transactions - replace with API data
const mockTransactions: any[] = [];

export default function AccountTransactionsPage() {
  if (mockTransactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No transactions yet"
            description="Your payment history will appear here"
            icon={Receipt}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Transaction list will go here */}
        </div>
      </CardContent>
    </Card>
  );
}