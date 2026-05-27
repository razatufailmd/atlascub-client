"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion ,Variants} from "framer-motion";
import {
ArrowUpRight,
Mail,
MapPin,
Phone,

} from "lucide-react";
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { Logo } from "../shared/logo";
export function Footer() {
const [mounted, setMounted] = useState(false);

useEffect(() => {
setMounted(true);
}, []);

// Framer Motion Animation Variants
const footerContainerVariants:Variants = {
hidden: { opacity: 0, y: 30 },
visible: {
opacity: 1,
y: 0,
transition: {
duration: 0.8,
ease: [0.16, 1, 0.3, 1],
staggerChildren: 0.08,
delayChildren: 0.1,
},
},
};

const itemVariants:Variants = {
hidden: { opacity: 0, y: 15 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
},
};

const borderVariants:Variants = {
hidden: { scaleX: 0 },
visible: {
scaleX: 1,
transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
},
};

if (!mounted) return null;

return (
<motion.footer
variants={footerContainerVariants}
initial="hidden"
whileInView="visible"
viewport={{ once: true, margin: "-50px" }}
className="relative bg-background text-foreground border-t border-border mt-auto overflow-hidden font-sans"
>
{/* Subtle Animated Glowing Highlight */}
<div
className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] origin-center bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none"
style={{ transform: "scaleX(1)" }}
/>

  {/* Subtle Border-Top Growing Animation */}
  <motion.div 
    variants={borderVariants}
    className="absolute top-0 left-0 right-0 h-[2px] bg-primary origin-left pointer-events-none"
  />

  <div className="container mx-auto px-6 py-16 md:py-24 max-w-7xl relative z-10">
    
    {/* Main 5-Column Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-border">
      
      {/* Column 1: Brand & Logo Panel */}
      <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
        <div className="flex items-center gap-3">
          <Logo withGlow={true} width={130} height={42} animated={true} />
        </div>
        
        <p className="text-xs leading-relaxed text-muted-foreground font-light max-w-sm">
          Translating classic Indian handloom textures and premium combed cottons into timeless, modern silhouettes. Made for generation-spanning daily wear.
        </p>

        <div className="flex gap-4">
          <Link 
            href="https://instagram.com/atlascub" 
            target="_blank" 
            className="p-2.5 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            aria-label="Follow Atlascub on Instagram"
          >
            <FaInstagram className="h-4 w-4" />
          </Link>
          <Link 
            href="https://twitter.com/atlascub" 
            target="_blank" 
            className="p-2.5 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            aria-label="Follow Atlascub on Twitter"
          >
            <FaTwitter className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      {/* Column 2: Shop Department Links */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
          Shop Collections
        </h4>
        <ul className="space-y-3 text-xs">
          {["Men's Wardrobe", "Women's Wardrobe", "Kids Playwear", "Ethnic & Festive"].map((item, idx) => {
            const hrefs = ["/shop?gender=men", "/shop?gender=women", "/shop?gender=kids", "/shop?category=ethnic"];
            return (
              <li key={idx}>
                <Link 
                  href={hrefs[idx]} 
                  className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200 block font-light"
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* Column 3: Sourcing & Philosophy */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
          The Brand
        </h4>
        <ul className="space-y-3 text-xs">
          {["Our Weavers", "Sourcing Map", "Slow Fashion Ethics", "Archival Campaign"].map((item, idx) => (
            <li key={idx}>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200 block font-light"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Column 4: Customer Support */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
          Customer Desk
        </h4>
        <ul className="space-y-3 text-xs">
          {["Fulfillment Desk", "Shipping & Courier Desk", "Returns Policy", "Secure Checkout"].map((item, idx) => (
            <li key={idx}>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200 block font-light"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Column 5: Sourcing Registry Location */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
          HQ Registry
        </h4>
        <ul className="space-y-3 text-xs text-muted-foreground font-light">
          <li className="flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Faridabad, Haryana</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Phone className="h-4 w-4 text-primary shrink-0" />
            <span>+91-987654321</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Mail className="h-4 w-4 text-primary shrink-0" />
            <a href="mailto:care@atlascub.in" className="hover:text-primary transition-colors">
              contact@atlascub.in
            </a>
          </li>
        </ul>
      </motion.div>

    </div>

    {/* Bottom Metadata & Copyright Panel */}
    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
      <motion.div 
        variants={itemVariants} 
        className="flex items-center gap-2"
      >
        <span>© 2026 Atlascub Premium Apparel. All rights reserved.</span>
        <span>Developer:Md Danish Raza</span>
      </motion.div>
     
      
      <motion.div 
        variants={itemVariants} 
        className="flex gap-6"
      >
        <Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-0.5 group">
          <span>Privacy Policy</span>
          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
        <Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-0.5 group">
          <span>Terms of Service</span>
          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    </div>

  </div>
</motion.footer>


);
}