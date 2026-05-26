"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { genderLinks, categories } from "@/lib/constants/navigation";
import { useUserRole } from "@/hooks/use-user-role";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expandedGender, setExpandedGender] = useState<string | null>(null);
  const { isAdmin } = useUserRole();

  const toggleGender = (gender: string) => {
    setExpandedGender(expandedGender === gender ? null : gender);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-lg font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {genderLinks.map((gender) => (
                <div key={gender.name} className="space-y-2">
                  <button
                    onClick={() => toggleGender(gender.name)}
                    className="flex w-full items-center justify-between py-2 text-left text-lg font-medium"
                  >
                    {gender.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
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
                        <div className="space-y-2 border-l-2 pl-3">
                          {categories[gender.slug as "men" | "women" | "kids"].map((cat) => (
                            <Link
                              key={cat.name}
                              href={cat.href}
                              onClick={() => setOpen(false)}
                              className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
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
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}