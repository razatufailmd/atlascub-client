"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function EditorialStory() {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column: Visual Overlap Grid */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            
            {/* Primary Large Image Frame */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-4/5 aspect-[4/5] rounded-xl overflow-hidden border border-border shadow-sm bg-muted"
            >
              <Image
                src="/images/campaigns/heritage.jpg"
                alt="Artisan loom processing raw mulberry silk weaves"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </motion.div>

            {/* Overlapping Secondary Image Frame */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 md:-bottom-8 right-0 w-1/2 aspect-[4/5] rounded-xl overflow-hidden border border-border shadow-sm hidden sm:block bg-muted"
            >
              <Image
                src="/images/gender/men.jpg"
                alt="Close up detailed shot of bespoke raw silk bandhgala collar structure"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 40vw, 25vw"
              />
            </motion.div>

            {/* Decorative accent element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/5 blur-2xl -z-10" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-secondary/20 blur-2xl -z-10" />
          </div>

          {/* Right Column: Narrative Typography Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5 md:space-y-6"
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-primary font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Heritage Weaving Core</span>
            </div>

            {/* Heading */}
            <h2 className="heading-lg md:heading-xl lg:text-5xl font-primary font-semibold text-foreground leading-[1.1] tracking-tight">
              Indian Textures,<br className="hidden sm:block" /> Modern Outlines.
            </h2>

            {/* Description Paragraphs */}
            <p className="body-base text-foreground/85 leading-relaxed">
              We translate centuries of handloom expertise into contemporary wardrobes. Every Raw Silk Bandhgala and French Linen Resort Shirt is cut to sit with quiet confidence.
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              We collaborate with master weavers in heritage clusters, preserving historical patterns while adjusting weights, structures, and sizing for the global citizen. The result is clothing that carries the weight of history but sits light on the skin.
            </p>

            {/* CTA Button */}
            <div className="pt-3 md:pt-4">
              <Link
                href="/collections/modern-festive"
                className="group inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-wide text-xs uppercase px-6 md:px-8 py-3 md:py-4 rounded-md shadow-sm transition-all duration-300 gap-2"
              >
                <span>Read our Craft Story</span>
                <ArrowUpRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Stats or Trust Badge (Optional) */}
            <div className="pt-4 flex items-center gap-6">
              <div className="text-left">
                <div className="text-xl md:text-2xl font-primary font-semibold text-foreground">50+</div>
                <div className="text-xs text-muted-foreground">Artisan Partners</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-left">
                <div className="text-xl md:text-2xl font-primary font-semibold text-foreground">15+</div>
                <div className="text-xs text-muted-foreground">Years of Craft</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-left">
                <div className="text-xl md:text-2xl font-primary font-semibold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Handcrafted</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}