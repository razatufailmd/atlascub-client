'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shirt, 
  Package, 
  LayoutGrid, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ChevronLeft,
  Store,
  Menu
} from 'lucide-react';
import { useUserRole } from '@/hooks/use-user-role';
import { SignOutButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useUserRole();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Products Catalog', href: '/admin/products', icon: Shirt },
    { name: 'Orders Pipeline', href: '/admin/orders', icon: Package },
    { name: 'Storefront Layout', href: '/admin/cms', icon: LayoutGrid },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-sidebar text-sidebar-foreground border-r border-sidebar-border px-4 py-6">
      <div>
        {/* Brand Header */}
        <div className={cn("flex items-center gap-3 mb-10 px-2", isCollapsed ? "justify-center" : "justify-start")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg tracking-wider text-foreground">ATLAS_CUB</span>
              <span className="font-mono text-[10px] text-primary tracking-widest uppercase">Admin Terminal</span>
            </div>
          )}
        </div>

        {/* Navigation Menu Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3.5 px-3.5 py-3 rounded-md text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs font-semibold" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  isCollapsed && "justify-center px-0"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-105", isActive ? "text-primary" : "text-muted-foreground")} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Information and Signout Controls */}
      <div className="space-y-4">
        <div className={cn("flex items-center gap-3 border-t border-sidebar-border pt-4 px-1", isCollapsed ? "justify-center" : "justify-start")}>
          <img 
            src={user?.imageUrl} 
            alt="Profile Avatar" 
            className="h-9 w-9 rounded-full object-cover border border-sidebar-border"
          />
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground truncate leading-tight">
                {user?.fullName || 'Administrator'}
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Clerk SignOut Component */}
        <SignOutButton>
          <button 
            className={cn(
              "flex w-full items-center gap-3.5 px-3.5 py-3 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-all",
              isCollapsed ? "justify-center px-0" : "justify-start"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </SignOutButton>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-sidebar border-b border-sidebar-border md:hidden">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" />
          <span className="font-serif font-bold tracking-wider">ATLAS_CUB</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu className="h-6 w-6 text-foreground" />
        </Button>
      </div>

      {/* Responsive Slide Out Panel for Mobile Browsers */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 h-full z-10 animate-in slide-in-from-left duration-300">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Collapsible Persistent Sidebar Layout for Tablet & Desktop Sizes */}
      <div className={cn(
        "hidden md:flex h-screen flex-col transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <SidebarContent />
        
        {/* Toggle Expand State Action Trigger */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-12 flex h-6 w-6 items-center justify-center rounded-full border border-sidebar-border bg-background shadow-xs hover:bg-accent transition-colors hidden md:flex"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </>
  );
}