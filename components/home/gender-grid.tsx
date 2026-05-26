"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { genderGrid } from "@/lib/constants/homepage";

export function GenderGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="heading-lg mb-3 font-primary">Shop by Gender</h2>
          <p className="text-muted-foreground">Discover collections tailored for everyone</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {genderGrid.map((gender, index) => (
            <motion.div
              key={gender.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Link href={gender.href}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={gender.image}
                    alt={gender.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${gender.color}`} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="heading-md mb-2">{gender.title}</h3>
                  <p className="mb-4 text-sm text-white/80">{gender.description}</p>
                  <motion.span
                    className="inline-flex items-center gap-2 text-sm font-medium"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}