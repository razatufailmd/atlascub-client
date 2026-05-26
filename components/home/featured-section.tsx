"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { curatedCampaigns } from "@/lib/constants/homepage";

export function FeaturedCollection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="heading-lg mb-3 font-primary">Curated Campaigns</h2>
          <p className="text-muted-foreground">Editorial collections for every aesthetic</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {curatedCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={campaign.href}>
                <div className="relative mb-4 overflow-hidden rounded-xl aspect-square">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 ${campaign.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
                </div>
                <h3 className="heading-sm mb-1">{campaign.title}</h3>
                <p className="text-sm text-muted-foreground">{campaign.description}</p>
                <motion.span
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Explore Collection
                  <ArrowRight className="h-3 w-3" />
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}