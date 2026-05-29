"use client";

import Link from "next/link";
import Image from "next/image";
import { motion,Variants } from "framer-motion";
import { ArrowRight, Sparkles, Tag, Sun, Flame } from "lucide-react";
import { genderMetadata } from "@/lib/constants/categories";
import { categories } from "@/lib/constants/navigation";

const typeIcons = {
  festival: <Sparkles className="h-5 w-5" />,
  campaign: <Sun className="h-5 w-5" />,
  season: <Flame className="h-5 w-5" />,
  sale: <Tag className="h-5 w-5" />,
};

export default function ShopIndexPage() {
  const genders = ["men", "women", "kids"];
  const collections = categories.collections || [];

  // Animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardHoverVariants:Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-muted">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        </div>
        <div className="relative h-full container mx-auto flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono uppercase tracking-wider text-primary mb-3 block">
              Welcome to Atlascub
            </span>
            <h1 className="heading-xl md:heading-2xl font-primary text-foreground">
              Shop by Category
            </h1>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Discover thoughtfully curated collections for every style and occasion
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Gender Grid Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="heading-lg font-primary">Shop by Gender</h2>
            <p className="mt-2 text-muted-foreground">
              Explore collections tailored for everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {genders.map((gender, index) => {
              const metadata = genderMetadata[gender as keyof typeof genderMetadata];
              const imagePath = `/images/gender/${gender}.jpg`;
              const heroImagePath = `/images/gender/${gender}-hero.jpg`;

              return (
                <motion.div
                  key={gender}
                  variants={itemVariants}
                  custom={index}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  variants={cardHoverVariants}
                  className="group"
                >
                  <Link href={`/shop/${gender}`} className="block">
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/5] shadow-sm">
                      {/* Background Image */}
                      <Image
                        src={heroImagePath}
                        alt={metadata?.title || gender}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={index === 0}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="heading-md font-primary">{metadata?.title}</h3>
                        <p className="text-sm text-white/80 mt-1 line-clamp-2">
                          {metadata?.description}
                        </p>
                        <motion.span
                          className="inline-flex items-center gap-1 mt-3 text-sm font-medium group-hover:gap-2 transition-all"
                          whileHover={{ x: 4 }}
                        >
                          Shop Now
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Collections Section */}
        {collections.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mb-24"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-primary mb-3">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  Curated for You
                </span>
              </div>
              <h2 className="heading-lg font-primary">Featured Collections</h2>
              <p className="mt-2 text-muted-foreground">
                Discover our latest editorial drops and seasonal edits
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.slug}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <Link href={collection.href} className="block">
                    <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-muted">
                      {/* Collection Image Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        {typeIcons[collection.type as keyof typeof typeIcons] || (
                          <Sparkles className="h-12 w-12 text-primary/30" />
                        )}
                      </div>
                      
                      {/* Badge */}
                      {collection.badge && (
                        <div className="absolute top-3 right-3">
                          <span className="rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                            {collection.badge}
                          </span>
                        </div>
                      )}
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="rounded-full bg-white/20 backdrop-blur-md p-2">
                          <ArrowRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {collection.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="text-center mt-10">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                View All Collections
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-primary/5 p-8 md:p-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          <div className="relative z-10">
            <h3 className="heading-md font-primary">Need Styling Advice?</h3>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Let our team help you find the perfect look
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}