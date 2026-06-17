"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { hideAnnouncement, setAnnouncementVisibility } from "@/lib/store/features/announcementSlice";

// --- STRUCTURED DATA FOR FUTURE API BINDING ---
interface Announcement {
id: string;
overline?: string;
text: string;
ctaText?: string;
ctaHref?: string;
}

const STATIC_ANNOUNCEMENTS: Announcement[] = [
{
id: "ann_1",
overline: "Complimentary",
text: "Enjoy complimentary shipping on all orders over ₹4999 across India.",
ctaText: "Details",
ctaHref: "/support",
},
{
id: "ann_2",
overline: "Launch Offer",
text: "Grab heavy discounts on every product.",
ctaText: "Shop Originals",
ctaHref: "/search",
},
{
id: "ann_3",
overline: "Limited Drop",
text: "Our Summer Solstice French Linen collection is now live.",
ctaText: "Explore Collection",
ctaHref: "/collections",
},
];

export function AnnouncementBar() {
    const dispatch = useAppDispatch();
    const isVisible = useAppSelector((state) => state.ui.isAnnouncementVisible);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // Auto-slide effect
    useEffect(() => {
      if (!isVisible) return;
      
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % STATIC_ANNOUNCEMENTS.length);
      }, 6000);
  
      return () => clearInterval(interval);
    }, [isVisible]);
  
    // Check if the user has previously dismissed this banner session safely on the client
    useEffect(() => {
      const isDismissed = sessionStorage.getItem("atlascub_announcement_dismissed");
      if (isDismissed === "true") {
        dispatch(setAnnouncementVisibility(false));
      }
    }, [dispatch]);
  
    const handleDismiss = () => {
      // 1. Update global Redux State
      dispatch(hideAnnouncement());
      // 2. Persist to session storage so it stays closed on refresh
      sessionStorage.setItem("atlascub_announcement_dismissed", "true");
    };
  
    if (!isVisible) return null;
  
    const currentAnn = STATIC_ANNOUNCEMENTS[currentIndex];
  
    return (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-100 w-full bg-[#fdf2d6] text-[#805500] border-b border-[#f5e8d2] dark:bg-[#92400e]/20 dark:text-[#fef3c7] dark:border-[#44403c] overflow-hidden"
      >
        <div className="container mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between gap-4">
          
          {/* Decorative Space-filler to center content on desktop */}
          <div className="hidden md:block w-8" />
  
          {/* Sliding Text Wrapper */}
          <div className="flex-1 relative flex justify-center items-center h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnn.id}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-row items-center gap-.5 sm:gap-3 text-center"
              >
                {currentAnn.overline && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest font-bold bg-[#9b2c2c]/10 text-[#9b2c2c] dark:bg-[#fef3c7]/20 dark:text-[#fef3c7] px-2 py-0.5 rounded">
                    <Sparkles className="h-2.5 w-2.5" />
                    {currentAnn.overline}
                  </span>
                )}
                <p className="font-body text-[8px] md:text-xs tracking-wide font-medium">
                  {currentAnn.text}
                </p>
                {currentAnn.ctaText && currentAnn.ctaHref && (
                  <Link
                    href={currentAnn.ctaHref}
                    className="inline-flex items-center gap-0.5 text-[6px] md:text-xs font-mono font-bold uppercase tracking-wider text-[#9b2c2c] dark:text-[#fef3c7] hover:underline underline-offset-2 group shrink-0"
                  >
                    <span>{currentAnn.ctaText}</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
  
          {/* Minimalist Close Trigger */}
          <button
            onClick={handleDismiss}
            className="p-1 rounded-full hover:bg-[#805500]/10 dark:hover:bg-[#fef3c7]/10 transition-colors text-inherit"
            aria-label="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
  
        </div>
      </motion.div>
    );
}