"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsExpanded(false);
      setQuery("");
    }
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className="flex items-center">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.form
            key="expanded"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onSubmit={handleSearch}
            className="relative"
          >
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for shirts, trousers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-16"
            />
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-8 top-1/2 h-8 w-8 -translate-y-1/2"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(false)}
              className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.form>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
          >
            <Search className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}