"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Logo } from "@/components/shared/logo";
import { GenderNav } from "./gender-nav";
import { SearchBar } from "./search-bar";
import { CartIcon } from "./cart-icon";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { UserButton } from "../auth/user-button";

export function Navbar() {
  const scrollDirection = useScrollDirection();
  const scrolled = useScrollPosition(20);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Track search state from SearchBar via event listener
  useEffect(() => {
    const handleSearchState = (e: CustomEvent) => {
      setIsSearchOpen(e.detail.isOpen);
    };
    window.addEventListener("searchStateChange", handleSearchState as EventListener);
    return () => window.removeEventListener("searchStateChange", handleSearchState as EventListener);
  }, []);

  const navbarVariants: Variants = {
    visible: {
      y: 0,
      transition: { type: "spring", damping: 30, stiffness: 300 },
    },
    hidden: {
      y: "-100%",
      transition: { type: "spring", damping: 30, stiffness: 300 },
    },
  };

  // Don't hide navbar when search is open on mobile
  const shouldHide = scrollDirection === "down" && scrolled && !(isMobile && isSearchOpen);

  // Set CSS variable for navbar height
  useEffect(() => {
    const navbar = document.querySelector("header");
    if (navbar) {
      const height = navbar.offsetHeight;
      document.documentElement.style.setProperty("--navbar-height", `${height}px`);
    }
  }, []);

  return (
    <motion.header
      initial="visible"
      animate={shouldHide ? "hidden" : "visible"}
      variants={navbarVariants}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || isSearchOpen
          ? "bg-background/80 shadow-sm backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-2 md:h-20 md:gap-4">
          {/* Left Section - Logo + Desktop Navigation */}
          <div className="flex items-center gap-4 md:gap-8">
            <Logo />
            {!isMobile && !isSearchOpen && <GenderNav />}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <SearchBar />
            {!isSearchOpen && (
              <>
                <ThemeToggle />
                <UserButton />
                <CartIcon />
              </>
            )}
            {isMobile && !isSearchOpen && <MobileMenu />}
          </div>
        </div>
      </div>
    </motion.header>
  );
}