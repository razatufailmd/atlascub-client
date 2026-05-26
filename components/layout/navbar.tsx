"use client";

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

  return (
    <motion.header
      initial="visible"
      animate={scrollDirection === "down" && scrolled ? "hidden" : "visible"}
      variants={navbarVariants}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 shadow-sm backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Left Section - Logo + Desktop Navigation */}
          <div className="flex items-center gap-8">
            <Logo />
            {!isMobile && <GenderNav />}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            <SearchBar />
            <ThemeToggle />
            <UserButton />
            <CartIcon />
            {isMobile && <MobileMenu />}
          </div>
        </div>
      </div>
    </motion.header>
  );
}