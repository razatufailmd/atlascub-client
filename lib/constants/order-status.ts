import {
  Clock,
  CheckCircle,
  Truck,
  Package,
  XCircle,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

// Status type definition
export type OrderStatusType =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURN_REQUESTED"
  | "RETURNED";

// Status configuration
export interface OrderStatusConfig {
  label: string;
  color: {
    badge: string; // Background color for badge
    text: string; // Text color
    border: string; // Border color
    light: string; // Light background for cards
    dark: string; // Dark background for dark mode
  };
  icon: React.ElementType;
  timeline: {
    step: number; // Order in the timeline (1-5)
    label: string; // Display label for timeline
  };
  nextStatuses?: OrderStatusType[]; // Allowed next statuses
}

export const ORDER_STATUS_CONFIG: Record<OrderStatusType, OrderStatusConfig> = {
  PENDING: {
    label: "Pending",
    color: {
      badge:
        "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      light: "bg-amber-50 dark:bg-amber-950/20",
      dark: "bg-amber-900/30",
    },
    icon: Clock,
    timeline: {
      step: 1,
      label: "Order Placed",
    },
    nextStatuses: ["PAID", "CANCELLED"],
  },

  PAID: {
    label: "Paid",
    color: {
      badge:
        "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      light: "bg-blue-50 dark:bg-blue-950/20",
      dark: "bg-blue-900/30",
    },
    icon: CheckCircle,
    timeline: {
      step: 2,
      label: "Payment Confirmed",
    },
    nextStatuses: ["SHIPPED", "CANCELLED"],
  },

  SHIPPED: {
    label: "Shipped",
    color: {
      badge:
        "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      light: "bg-purple-50 dark:bg-purple-950/20",
      dark: "bg-purple-900/30",
    },
    icon: Truck,
    timeline: {
      step: 3,
      label: "Order Shipped",
    },
    nextStatuses: ["DELIVERED"],
  },

  DELIVERED: {
    label: "Delivered",
    color: {
      badge:
        "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      light: "bg-green-50 dark:bg-green-950/20",
      dark: "bg-green-900/30",
    },
    icon: Package,
    timeline: {
      step: 4,
      label: "Order Delivered",
    },
    nextStatuses: ["RETURN_REQUESTED"],
  },

  CANCELLED: {
    label: "Cancelled",
    color: {
      badge:
        "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      light: "bg-red-50 dark:bg-red-950/20",
      dark: "bg-red-900/30",
    },
    icon: XCircle,
    timeline: {
      step: 0,
      label: "Order Cancelled",
    },
  },

  RETURN_REQUESTED: {
    label: "Return Requested",
    color: {
      badge:
        "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
      light: "bg-orange-50 dark:bg-orange-950/20",
      dark: "bg-orange-900/30",
    },
    icon: AlertCircle,
    timeline: {
      step: 0,
      label: "Return Requested",
    },
    nextStatuses: ["RETURNED"],
  },

  RETURNED: {
    label: "Returned",
    color: {
      badge:
        "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700",
      text: "text-gray-600 dark:text-gray-400",
      border: "border-gray-200 dark:border-gray-700",
      light: "bg-gray-50 dark:bg-gray-900/20",
      dark: "bg-gray-800/30",
    },
    icon: RotateCcw,
    timeline: {
      step: 0,
      label: "Order Returned",
    },
  },
};

// Helper: Get status config by status key
export function getOrderStatus(status: OrderStatusType): OrderStatusConfig {
  return ORDER_STATUS_CONFIG[status] || ORDER_STATUS_CONFIG.PENDING;
}

// Helper: Get available next statuses for a given status
export function getNextStatuses(
  currentStatus: OrderStatusType
): OrderStatusType[] {
  const config = getOrderStatus(currentStatus);
  // For delivered, allow return request
  if (currentStatus === "DELIVERED") {
    return ["RETURN_REQUESTED"];
  }
  // For pending, allow paid or cancelled
  if (currentStatus === "PENDING") {
    return ["PAID", "CANCELLED"];
  }
  // For paid, allow shipped or cancelled
  if (currentStatus === "PAID") {
    return ["SHIPPED", "CANCELLED"];
  }
  // For shipped, allow delivered only
  if (currentStatus === "SHIPPED") {
    return ["DELIVERED"];
  }
  // For return requested, allow returned only
  if (currentStatus === "RETURN_REQUESTED") {
    return ["RETURNED"];
  }
  // Terminal statuses
  return [];
}

// Helper: Get all status options for dropdown (excluding terminal statuses)
export function getStatusOptionsForAdmin(): Array<{
  value: OrderStatusType;
  label: string;
}> {
  const terminalStatuses: OrderStatusType[] = ["CANCELLED", "RETURNED"];
  return (Object.keys(ORDER_STATUS_CONFIG) as OrderStatusType[])
    .filter((key) => !terminalStatuses.includes(key))
    .map((key) => ({
      value: key,
      label: ORDER_STATUS_CONFIG[key].label,
    }));
}

// Helper: Get status badge color class
export function getStatusBadgeClass(status: OrderStatusType): string {
  return getOrderStatus(status).color.badge;
}

// Helper: Get status text color class
export function getStatusTextClass(status: OrderStatusType): string {
  return getOrderStatus(status).color.text;
}

// Helper: Get status icon
export function getStatusIcon(status: OrderStatusType): React.ElementType {
  return getOrderStatus(status).icon;
}

// Order status timeline steps
export const ORDER_TIMELINE_STEPS = [
  { status: "PENDING", label: "Order Placed" },
  { status: "PAID", label: "Payment Confirmed" },
  { status: "SHIPPED", label: "Order Shipped" },
  { status: "DELIVERED", label: "Order Delivered" },
];

// Status type for API responses
export type OrderStatus = OrderStatusType;
