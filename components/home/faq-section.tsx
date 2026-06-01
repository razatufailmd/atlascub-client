"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  LayoutGridIcon, 
  Truck, 
  RotateCcw, 
  Scissors, 
  Ruler 
} from "lucide-react";

const categories = [
  {
    icon: <LayoutGridIcon className="size-4" />,
    id: "all",
    label: "All Queries",
  },
  {
    icon: <Truck className="size-4" />,
    id: "shipping",
    label: "Shipping & Delivery",
  },
  {
    icon: <RotateCcw className="size-4" />,
    id: "returns",
    label: "Returns & Exchanges",
  },
  {
    icon: <Scissors className="size-4" />,
    id: "fabrics",
    label: "Fabrics & Care",
  },
  {
    icon: <Ruler className="size-4" />,
    id: "sizing",
    label: "Sizing & Fit",
  },
];

const faqs = [
  {
    id: 1,
    category: "shipping",
    title: "Do you offer international shipping?",
    content:
      "Currently, we fulfill and ship orders exclusively within India. However, we are actively working on expanding our logistics to support international fulfillment by the end of the year.",
  },
  {
    id: 2,
    category: "shipping",
    title: "How long will my order take to arrive?",
    content:
      "Standard orders are processed within 24 hours and typically delivered within 3-5 business days across major metro cities in India. Bespoke or customized studio pieces may take an additional 2 days for final finishing.",
  },
  {
    id: 3,
    category: "returns",
    title: "What is your return policy?",
    content:
      "We offer a seamless 7-day return policy for all unworn garments with original tags attached. Please note that customized tailored pieces or final-sale archive items are not eligible for standard returns.",
  },
  {
    id: 4,
    category: "returns",
    title: "How do I initiate an exchange for a different size?",
    content:
      "You can initiate a direct size exchange through your Account Dashboard under 'Orders'. Our courier partner will pick up the incorrect size and deliver the replacement simultaneously.",
  },
  {
    id: 5,
    category: "fabrics",
    title: "Are your linen shirts prone to heavy shrinking?",
    content:
      "Our premium French linens are pre-washed and treated during production to minimize shrinkage. To maintain their drape and texture, we recommend cold machine washing and line drying.",
  },
  {
    id: 6,
    category: "fabrics",
    title: "What is 'Raw Silk' and how should I care for it?",
    content:
      "Raw silk is a natural, slightly textured fiber with a beautiful matte sheen. Because it is a delicate handloom fabric, our raw silk bandhgalas and kurtas must be strictly dry-cleaned only.",
  },
  {
    id: 7,
    category: "sizing",
    title: "Do your oversized tees fit true to size?",
    content:
      "Yes. Our oversized silhouettes are intentionally engineered with a drop-shoulder and relaxed body. You should order your standard true size to achieve the intended oversized look. Do not size up.",
  },
];

export function FaqsSection() {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filtered = faqs.filter((faq) => {
    return activeCategory === "all" || faq.category === activeCategory;
  });

  const currentCategory = React.useMemo(
    () => categories.find((cat) => cat.id === activeCategory),
    [activeCategory]
  );

  return (
    <section className="relative w-full py-20 md:py-32 bg-background/30 border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 block text-xs md:text-sm tracking-[0.2em] uppercase font-secondary text-primary/80"
          >
            Customer Desk
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-primary font-bold tracking-tight text-foreground"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-muted-foreground font-body text-sm md:text-base max-w-lg"
          >
            Find quick answers regarding our fits, premium fabrics, and shipping procedures.
          </motion.p>
        </div>

        {/* FAQ Interactive Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative grid min-h-full grid-cols-1 gap-12 md:grid-cols-12"
        >
          {/* Left Sidebar: Categories */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="flex w-max flex-wrap items-start justify-start gap-2 md:flex-col md:w-full md:sticky md:top-24">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  variant={activeCategory === cat.id ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-11 ${
                    activeCategory === cat.id ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Right Content: Accordions */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            {currentCategory && (
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="text-primary">{currentCategory.icon}</span>
                <span className="font-serif text-lg font-bold text-foreground">
                  {currentCategory.label}
                </span>
              </div>
            )}
            
            <Accordion className="space-y-4" collapsible type="single">
              {filtered.map((item) => (
                <AccordionItem
                  className="border border-border rounded-lg overflow-hidden bg-card"
                  key={item.id}
                  value={item.id.toString()}
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline font-body font-semibold text-foreground text-left text-sm md:text-base transition-colors hover:text-primary">
                    {item.title}
                  </AccordionTrigger>

                  <AccordionContent className="px-5 pb-5 pt-1 text-muted-foreground font-body leading-relaxed text-sm md:text-base">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Read More Link */}
            <div className="pt-6">
              <Button asChild variant="outline" className="border-border hover:bg-muted text-muted-foreground">
                <Link href="/faq">
                  Read all FAQs
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
