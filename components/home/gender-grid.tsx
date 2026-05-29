"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { genderGrid } from "@/lib/constants/homepage";

export function GenderGrid() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 text-center max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest font-semibold mb-4 border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Curated Departments</span>
          </div>
          <h2 className="heading-lg md:heading-xl font-primary font-bold text-foreground tracking-tight">
            Shop by Department
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            Thoughtfully engineered silhouettes structured specifically for individual frames and ease of movement.
          </p>
        </motion.div>

        {/* Triple Pane Split Screen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {genderGrid.map((gender, index) => (
            <motion.div
              key={gender.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-500"
            >
              <Link href={gender.href} className="block h-full w-full">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={gender.image}
                    alt={gender.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Dynamic Dark Gradient for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Overlapping Bottom Banner Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 block mb-2 opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    DEPT. 0{index + 1}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-primary font-bold text-white mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                    {gender.title}
                  </h3>
                  
                  <p className="text-sm text-white/80 max-w-xs leading-relaxed font-light mb-6 line-clamp-2 transition-transform duration-500 group-hover:-translate-y-1">
                    {gender.description}
                  </p>
                  
                  {/* Animated CTA */}
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white font-semibold transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="relative overflow-hidden pb-1">
                      Shop Collection
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                    <ArrowRight className="h-4 w-4 transform transition-all duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}