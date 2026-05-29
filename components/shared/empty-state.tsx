'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon; // Make icon optional with a default
  action?: {
    label: string;
    href?: string; // Make href optional
    onClick?: () => void;
  };
}

// Default icon if none provided
const DefaultIcon = () => (
  <svg
    className="h-10 w-10 text-primary"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
);

export function EmptyState({ 
  title, 
  description, 
  icon: Icon, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[480px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-2xs transition-all duration-300 hover:shadow-xs">
      {/* Dynamic Animated Graphic Circle */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/40 text-secondary-foreground">
        <div className="animate-pulse duration-4000">
          {Icon ? <Icon className="h-10 w-10 text-primary animate-bounce duration-3000" /> : <DefaultIcon />}
        </div>
      </div>
      
      {/* Brand Elegant Heading */}
      <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h3>
      
      {/* Detail Copywriting */}
      <p className="mt-2.5 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Primary Action Trigger */}
      {action && (
        <div className="mt-8 animate-fade-in duration-500">
          {action.onClick ? (
            <Button 
              onClick={action.onClick} 
              size="lg" 
              className="rounded-md px-8 py-6 font-medium tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {action.label}
            </Button>
          ) : action.href ? (
            <Button asChild size="lg" className="rounded-md px-8 py-6 font-medium tracking-wide shadow-sm hover:shadow-md transition-all">
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}