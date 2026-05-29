"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sparkles, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { genderLinks, categories, companyLinks } from "@/lib/constants/navigation";
import { useUserRole } from "@/hooks/use-user-role";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expandedGender, setExpandedGender] = useState<string | null>(null);
  const [expandedCollections, setExpandedCollections] = useState(false);
  const [expandedCompany, setExpandedCompany] = useState(false);
  const { isAdmin } = useUserRole();

  const toggleGender = (gender: string) => {
    setExpandedGender(expandedGender === gender ? null : gender);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-lg font-semibold">Menu</span>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                {/* <X className="h-5 w-5" /> */}
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetClose>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {/* Gender Sections */}
              {genderLinks.map((gender) => (
                <div key={gender.name} className="space-y-2">
                  {/* Parent Gender Link - Now Clickable */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={gender.href}
                      onClick={() => setOpen(false)}
                      className="py-2 text-left text-lg font-medium hover:text-primary transition-colors"
                    >
                      {gender.name}
                    </Link>
                    <button
                      onClick={() => toggleGender(gender.name)}
                      className="p-2 hover:bg-muted rounded-md transition-colors"
                      aria-label={`Toggle ${gender.name} categories`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expandedGender === gender.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {expandedGender === gender.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4"
                      >
                        <div className="space-y-2 border-l-2 border-primary/20 pl-3">
                          {categories[gender.slug as "men" | "women" | "kids"].map((cat) => (
                            <Link
                              key={cat.name}
                              href={cat.href}
                              onClick={() => setOpen(false)}
                              className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <div className="font-medium">{cat.name}</div>
                              <div className="text-xs text-muted-foreground/70 line-clamp-2">
                                {cat.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Collections Section */}
              <div className="space-y-2">
                {/* Parent Collections Link - Now Clickable */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/collections/all"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 text-left text-lg font-medium hover:text-primary transition-colors"
                  >
                    <Sparkles className="h-4 w-4" />
                    Collections
                  </Link>
                  <button
                    onClick={() => setExpandedCollections(!expandedCollections)}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                    aria-label="Toggle collections"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedCollections ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                
                <AnimatePresence>
                  {expandedCollections && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      <div className="space-y-2 border-l-2 border-primary/20 pl-3">
                        {categories.collections?.map((collection) => (
                          <Link
                            key={collection.slug}
                            href={collection.href}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <div className="font-medium">{collection.name}</div>
                            <div className="text-xs text-muted-foreground/70 line-clamp-1">
                              {collection.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Company Section */}
              <div className="space-y-2">
                {/* Parent Company Link - Now Clickable */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 text-left text-lg font-medium hover:text-primary transition-colors"
                  >
                    <Building2 className="h-4 w-4" />
                    Company
                  </Link>
                  <button
                    onClick={() => setExpandedCompany(!expandedCompany)}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                    aria-label="Toggle company links"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedCompany ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                
                <AnimatePresence>
                  {expandedCompany && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      <div className="space-y-2 border-l-2 border-primary/20 pl-3">
                        {companyLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <div className="font-medium">{link.name}</div>
                            <div className="text-xs text-muted-foreground/70 line-clamp-1">
                              {link.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="mt-8 border-t pt-4 space-y-3">
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                My Account
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}