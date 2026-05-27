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
            <SheetClose asChild >
              <Button variant="ghost" size="icon-sm" >
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
                  <button
                    onClick={() => toggleGender(gender.name)}
                    className="flex w-full items-center justify-between py-2 text-left text-lg font-medium"
                    aria-expanded={expandedGender === gender.name}
                  >
                    {gender.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedGender === gender.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
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
                              <div className="text-xs text-muted-foreground/70">
                                {cat.description?.substring(0, 60)}...
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
                <button
                  onClick={() => setExpandedCollections(!expandedCollections)}
                  className="flex w-full items-center justify-between py-2 text-left text-lg font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Collections
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      expandedCollections ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
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
                        {categories.collections.map((collection) => (
                          <Link
                            key={collection.slug}
                            href={collection.href}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <div className="font-medium">{collection.name}</div>
                            <div className="text-xs text-muted-foreground/70">
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
                <button
                  onClick={() => setExpandedCompany(!expandedCompany)}
                  className="flex w-full items-center justify-between py-2 text-left text-lg font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Company
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      expandedCompany ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
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
                            <div className="text-xs text-muted-foreground/70">
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

            <div className="mt-8 border-t pt-4 space-y-2">
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