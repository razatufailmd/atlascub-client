"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Grid, Eye } from "lucide-react";
import { categoryHighlights } from "@/lib/constants/homepage";

export function CategoryShowcase() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 text-center max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background text-primary text-[10px] font-mono uppercase tracking-widest font-medium mb-4 border border-border shadow-sm">
            <Grid className="h-3.5 w-3.5" />
            <span>Functional Taxonomy</span>
          </div>
          <h2 className="heading-lg md:heading-xl font-primary font-semibold text-foreground tracking-tight">
            Browse by Silhouette
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            Clean and uncomplicated categorizations. Explore our collections by structural clothing lines.
          </p>
        </motion.div>

        {/* 4 Column Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {categoryHighlights.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl bg-card border border-border aspect-square shadow-sm hover:shadow-md transition-all duration-500"
            >
              <Link href={category.href} className="absolute inset-0">
                {/* Image Container */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500" />
                </div>

                {/* Text Overlay */}
                <div className="absolute inset-0 z-10 p-5 md:p-6 flex flex-col justify-end text-primary-foreground">
                  <h3 className="heading-sm md:text-xl font-primary font-semibold text-white mb-1.5 group-hover:text-secondary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-xs font-light">
                    {category.description}
                  </p>
                  
                  {/* Hover Reveal Indicator */}
                  <span className="mt-3 md:mt-4 inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-secondary opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    <span>View Catalog</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}