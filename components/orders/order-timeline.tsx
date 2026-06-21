"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ORDER_TIMELINE_STEPS, getOrderStatus, OrderStatusType } from "@/lib/constants/order-status";

interface OrderTimelineProps {
  status: OrderStatusType;
  createdAt?: string;
  updatedAt?: string;
  className?: string;
}

interface TimelineStep {
  status: OrderStatusType;
  label: string;
  completed: boolean;
  active: boolean;
  date?: string;
}

export function OrderTimeline({ status, createdAt, updatedAt, className = "" }: OrderTimelineProps) {
  // Map order status to timeline steps
  const getTimelineSteps = (): TimelineStep[] => {
    const statusOrder = ["PENDING", "PAID", "SHIPPED", "DELIVERED"];
    const currentIndex = statusOrder.indexOf(status);
    
    // For terminal statuses (CANCELLED, RETURNED), show as final state
    const isTerminal = status === "CANCELLED" || status === "RETURNED" || status === "RETURN_REQUESTED";
    
    // Build timeline steps
    return ORDER_TIMELINE_STEPS.map((step, index) => {
      const isCompleted = index <= currentIndex;
      const isActive = index === currentIndex;
      
      // For terminal statuses, mark all as completed except the terminal one
      let completed = isCompleted;
      let active = isActive;
      
      if (isTerminal) {
        // For cancelled, show all previous steps as completed
        completed = index <= currentIndex;
        active = index === currentIndex;
      }
      
      return {
        status: step.status as OrderStatusType,
        label: step.label,
        completed,
        active,
      };
    });
  };

  const steps = getTimelineSteps();
  const config = getOrderStatus(status);
  const isTerminal = status === "CANCELLED" || status === "RETURNED" || status === "RETURN_REQUESTED";

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
        
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const stepConfig = getOrderStatus(step.status);
          const Icon = stepConfig.icon;
          
          return (
            <motion.div
              key={step.status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4 pb-6 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                {step.completed ? (
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step.active ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
                  }`}>
                    <Check className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full border-2 border-border bg-background flex items-center justify-center">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3">
                  <span className={`font-medium ${
                    step.completed ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                  {step.active && !isTerminal && (
                    <span className="text-xs font-medium text-primary animate-pulse">In Progress</span>
                  )}
                  {isTerminal && index === steps.length - 1 && (
                    <span className="text-xs font-medium text-destructive">
                      {status === "CANCELLED" ? "Cancelled" : "Returned"}
                    </span>
                  )}
                </div>
                
                {/* Date (optional - to be added from order data) */}
                {step.completed && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.active ? "Just now" : "Completed"}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Terminal Status Note */}
      {isTerminal && (
        <div className={`rounded-lg border p-3 text-sm ${
          status === "CANCELLED" 
            ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400"
            : "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
        }`}>
          <p>
            {status === "CANCELLED" && "This order has been cancelled."}
            {status === "RETURN_REQUESTED" && "Return has been requested for this order."}
            {status === "RETURNED" && "This order has been returned."}
          </p>
        </div>
      )}
    </div>
  );
}