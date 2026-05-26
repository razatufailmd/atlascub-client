'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[480px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-2xs transition-all duration-300 hover:shadow-xs">
      {/* Dynamic Animated Graphic Circle */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/40 text-secondary-foreground animate-pulse duration-4000">
        <Icon className="h-10 w-10 text-primary animate-bounce duration-3000" />
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
          <Button asChild size="lg" className="rounded-md px-8 py-6 font-medium tracking-wide shadow-sm hover:shadow-md transition-all">
            {action.onClick ? (
              <button onClick={action.onClick}>{action.label}</button>
            ) : (
              <Link href={action.href}>{action.label}</Link>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}