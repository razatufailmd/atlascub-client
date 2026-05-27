"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { genderGrid } from "@/lib/constants/homepage";

export function GenderGrid() {
return (

<section className="py-24 md:py-32 bg-[#faf7f5]">
<div className="container">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 text-center max-w-xl mx-auto"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fdf2d6] text-[#805500] text-[10px] font-mono uppercase tracking-widest font-bold mb-4 border border-[#f5e8d2]">
        <Sparkles className="h-3 w-3" />
        <span>Curated Departments</span>
      </div>
      <h2 className="heading-lg font-serif font-bold text-[#1a1a1a] tracking-tight">
        Shop by Department
      </h2>
      <p className="mt-4 text-sm md:text-base text-[#57534e] leading-relaxed">
        Thoughtfully engineered silhouettes structured specifically for individual frames and ease of movement.
      </p>
    </motion.div>

    {/* Triple Pane Split Screen */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {genderGrid.map((gender, index) => (
        <motion.div
          key={gender.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-xl bg-white border border-[#f5e8d2] shadow-2xs hover:shadow-sm transition-all duration-500"
        >
          <Link href={gender.href}>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <img
                src={gender.image}
                alt={gender.title}
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Subtle Brand Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${gender.gradientFrom} via-black/5 to-black/45`} />
            </div>

            {/* Overlapping Bottom Banner Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#fdf2d6] block mb-1">
                DEPT. 0{index + 1}
              </span>
              <h3 className="heading-md font-serif font-bold text-white mb-2">
                {gender.title}
              </h3>
              <p className="text-xs text-white/80 max-w-xs leading-relaxed font-light mb-6">
                {gender.description}
              </p>
              
              {/* Animated CTA Arrow */}
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#fdf2d6] font-bold group-hover:text-white transition-colors">
                <span>Shop Collection</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
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