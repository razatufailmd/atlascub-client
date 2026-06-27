"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  ArrowUpRight 
} from "lucide-react";
import { Logo } from "@/components/shared/logo"; 
import { FaInstagram,FaTwitter } from "react-icons/fa";

export function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Framer Motion Stagger Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) return null;

  return (
    <footer className="relative bg-background text-foreground border-t border-border mt-auto overflow-hidden">
      
      <div className="container mx-auto px-6 pt-20 md:pt-32 pb-8 max-w-7xl">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-20 md:mb-28"
        >
          {/* Column 1: Brand & Socials */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 space-y-8">
            <div className="space-y-4">
              <p className="font-serif text-lg font-bold">
                Atlascub Studio
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground font-body max-w-xs md:max-w-none">
                Translating classic Indian handloom textures and premium combed cottons into timeless, modern silhouettes. Made for generation-spanning daily wear.
              </p>
            </div>

            <div className="flex gap-4">
              <Link 
                href="https://instagram.com/atlascub" 
                target="_blank" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                aria-label="Follow Atlascub on Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link 
                href="https://twitter.com/atlascub" 
                target="_blank" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                aria-label="Follow Atlascub on Twitter"
              >
                <FaTwitter className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Column 2: Shop */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="font-secondary text-xs uppercase tracking-[0.2em] text-foreground font-bold">
              Shop
            </h4>
            <ul className="space-y-4 text-sm font-body">
              {["Men", "Women", "Kids", "Collections"].map((item, idx) => {
                const hrefs = ["/shop/men", "/shop/women", "/shop/kids", "/collections"];
                return (
                  <li key={idx}>
                    <Link 
                      href={hrefs[idx]} 
                      className="text-muted-foreground hover:text-primary hover:pl-2 transition-all duration-300 block"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Column 3: The Brand */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="font-secondary text-xs uppercase tracking-[0.2em] text-foreground font-bold">
              Company
            </h4>
            <ul className="space-y-4 text-sm font-body">
              {[
                { name: "About Us", href: "/about" },
              
              ].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary hover:pl-2 transition-all duration-300 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Customer Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="font-secondary text-xs uppercase tracking-[0.2em] text-foreground font-bold">
              Customer Services
            </h4>
            <ul className="space-y-4 text-sm font-body">
              { [
    { name: "Help Center", href: "/support" },
    { name: "Shipping Info", href: "/shipping-policy" },
    { name: "Returns & Exchanges", href: "/returns" },
    
    { name: "Contact Us", href: "/contact" },
  ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary hover:pl-2 transition-all duration-300 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>

        {/* Central Logo Brand Anchor */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border-t border-border pt-12 pb-8 flex justify-center items-center "
        >
          {/* Scaled up the logo width and height to act as a prominent footer anchor */}
          <div className="opacity-100 hover:opacity-100 transition-opacity">
            <Logo 
              width={800} 
              height={400} 
              animated={true} 
              withGlow={true} 
              variant="default"
            />
          </div>
        </motion.div>

        {/* Bottom Legal Panel */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-secondary uppercase tracking-widest text-muted-foreground border-t border-border/50 ">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <span>© 2026 Atlascub Premium Apparel.</span>
            <span className="hidden md:inline">•</span>
            <span>Developer: Md Danish Raza</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-1 group">
              <span>Privacy Policy</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-1 group">
              <span>Terms of Service</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
