"use client";


import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { instagramFeed } from "@/lib/constants/homepage";
export function InstagramFeed() {
return (
  <section className="py-24 md:py-32 bg-background/30">
      <div className="container">
        


    {/* Section Title */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 text-center max-w-xl mx-auto"
    >
      <div className="inline-flex items-center gap-2 mb-4 text-[#9b2c2c]">
        <Sparkles className="h-4 w-4" />
        <span className="text-[11px] font-mono uppercase tracking-widest font-bold">
          Follow @atlascub.in
        </span>
      </div>
      <h2 className="heading-lg font-serif font-bold text-[#1a1a1a] tracking-tight">
        Shared Aesthetic
      </h2>
      <p className="mt-4 text-sm text-[#57534e] leading-relaxed">
        Interact with our active community. Tag your raw silk drapes or vacation linens with `#Atlascub` to be featured.
      </p>
    </motion.div>

    {/* 6 Column Square grid */}
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {instagramFeed.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="group relative aspect-square overflow-hidden rounded-lg bg-stone-100 border border-[#f5e8d2] shadow-2xs hover:shadow-xs transition-shadow"
        >
          <Link href={post.url} target="_blank" rel="noopener noreferrer">
            
            {/* Visual Cover */}
            <img
              src={post.image}
              alt={`Instagram social feed post reference ${post.id}`}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Fine interactive mask overlay on hover */}
            <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="transform scale-90 group-hover:scale-100 transition-transform duration-300 flex flex-col items-center gap-2 text-white">
                <Heart className="h-6 w-6 text-[#fdf2d6] fill-[#fdf2d6]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/90">
                  View Post
                </span>
              </div>
            </div>

          </Link>
        </motion.div>
      ))}
    </div>

    {/* External Link Action block */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-12 text-center"
    >
      <Link
        href="https://instagram.com/atlascub"
        target="_blank"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-stone-500 transition-colors hover:text-[#9b2c2c] group"
      >
        <span>Launch Instagram Interface</span>
        <Sparkles className="h-4 w-4 text-[#9b2c2c] group-hover:rotate-12 transition-transform" />
      </Link>
    </motion.div>

  </div>
</section>


);
}