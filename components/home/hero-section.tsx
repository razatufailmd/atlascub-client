"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { heroSlides } from "@/lib/constants/homepage";

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    resetTimer();
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    resetTimer();
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(handleNext, 6500);
  };

  useEffect(() => {
    timerRef.current = setInterval(handleNext, 6500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const activeSlide = heroSlides[currentIndex];

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[650px] w-full overflow-hidden bg-background"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0 origin-top"
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 8, ease: "linear" }}
              className="relative h-full w-full"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>

            {/* Gradient overlays using theme variables
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-foreground/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" /> */}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Text Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 h-full container mx-auto px-4 md:px-6 flex items-center

        "
      >
        <div className="max-w-2xl border-2 p-2 border-accent-foreground bg-black/10 rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-5 md:space-y-6"
            >
              {/* Overline - Secondary Font */}
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="block text-sm md:text-base tracking-[0.2em] uppercase font-secondary text-primary-foreground/90"
              >
                {activeSlide.overline}
              </motion.span>

              {/* Title - Primary Font (Serif) */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-primary font-bold tracking-tight text-primary-foreground leading-[1.1] md:leading-[1.15]"
              >
                {activeSlide.title}
              </motion.h1>

              {/* Subtitle - Body Font */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="text-base sm:text-lg font-body text-primary-foreground/80 max-w-lg leading-relaxed"
              >
                {activeSlide.subtitle}
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link
                  href={activeSlide.ctaPrimary.href}
                  className="group inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 px-6 md:px-8 py-3 md:py-4 font-medium rounded-md shadow-lg text-sm md:text-base"
                >
                  <span>{activeSlide.ctaPrimary.text}</span>
                  <ArrowUpRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href={activeSlide.ctaSecondary.href}
                  className="group inline-flex items-center justify-center bg-background/10 text-primary-foreground border border-primary-foreground/30 backdrop-blur-sm hover:bg-background/20 transition-all duration-300 px-6 md:px-8 py-3 md:py-4 font-medium rounded-md text-sm md:text-base"
                >
                  {activeSlide.ctaSecondary.text}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation Arrows */}
      <div className="absolute right-4 md:right-8 bottom-8 md:bottom-12 z-20 hidden sm:flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-primary-foreground/20 bg-background/5 text-primary-foreground backdrop-blur-md transition-all hover:bg-background/20 hover:border-primary-foreground/40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button
          onClick={handleNext}
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-primary-foreground/20 bg-background/5 text-primary-foreground backdrop-blur-md transition-all hover:bg-background/20 hover:border-primary-foreground/40"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 z-20 flex gap-3 md:gap-4">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => handleDotClick(index)}
              className="group flex flex-col items-start focus:outline-none"
            >
              <div className="flex items-center gap-2 mb-1 text-[10px] font-mono uppercase tracking-wider text-primary-foreground/50 group-hover:text-primary-foreground transition-colors">
                <span>0{index + 1}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  —
                </span>
              </div>
              <div className="h-[2px] w-12 md:w-16 bg-primary-foreground/20 relative rounded-full overflow-hidden">
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6.5, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-primary-foreground"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-6 right-4 md:right-8 z-20 hidden lg:flex items-center gap-2 text-primary-foreground/30 text-[9px] uppercase tracking-widest font-mono">
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </div>
    </section>
  );
}