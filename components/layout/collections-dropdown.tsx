"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Tag, Sun, Flame } from "lucide-react";
import { categories } from "@/lib/constants/navigation";

const typeIcons = {
  festival: <Sparkles className="h-4 w-4" />,
  campaign: <Sun className="h-4 w-4" />,
  season: <Flame className="h-4 w-4" />,
  sale: <Tag className="h-4 w-4" />,
};

export function CollectionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const collections = categories.collections;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
        Collections
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full pt-4"
          >
            <div className="w-80 rounded-lg border bg-popover p-4 shadow-lg">
              <div className="mb-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Curated for you
              </div>
              <div className="grid gap-2">
                {collections.map((collection) => (
                  <Link
                    key={collection.slug}
                    href={collection.href}
                    className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent"
                  >
                    <div className="mt-0.5 text-muted-foreground group-hover:text-primary">
                      {typeIcons[collection.type as keyof typeof typeIcons] || <Sparkles className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{collection.name}</span>
                        {collection.badge && (
                          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                            {collection.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {collection.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-3 border-t pt-3">
                <Link
                  href="/collections/all"
                  className="block rounded-md p-2 text-center text-sm font-medium text-primary transition-colors hover:bg-accent"
                >
                  View All Collections →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}