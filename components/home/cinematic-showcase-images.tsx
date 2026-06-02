"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 3D positioning mapping for our showcase images
// 'z' controls how far back into the screen the image starts
// 10 High-quality fashion images for the cinematic showcase
const showcaseImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
      alt: "Bespoke Sherwani - Men's Wedding Collection",
      className: "top-[50%] left-[50%] w-[85vw] h-[55vh] md:w-[35vw] md:h-[50vh]",
      z: 0,
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1583391733958-650fac5ebf7f?q=80&w=800&auto=format&fit=crop",
      alt: "Rich Embroidered Lehenga - Festive Edit",
      className: "top-[25%] left-[15%] md:left-[15%] w-[60vw] h-[40vh] md:w-[22vw] md:h-[38vh]",
      z: -800,
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      alt: "Contemporary Silk Drape - Modern Festive",
      className: "top-[75%] left-[75%] md:left-[78%] w-[55vw] h-[35vh] md:w-[20vw] md:h-[32vh]",
      z: -1600,
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=800&auto=format&fit=crop",
      alt: "Mustard Fusion Kurta - Everyday Ethnic",
      className: "top-[15%] left-[70%] md:left-[82%] w-[60vw] h-[42vh] md:w-[25vw] md:h-[42vh]",
      z: -2400,
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop",
      alt: "Linen Short Kurta - Men's Casuals",
      className: "top-[82%] left-[25%] md:left-[18%] w-[55vw] h-[38vh] md:w-[22vw] md:h-[36vh]",
      z: -3200,
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1617064974950-89196b02660d?q=80&w=800&auto=format&fit=crop",
      alt: "Handwoven Saree - Heritage Collection",
      className: "top-[50%] left-[50%] w-[80vw] h-[50vh] md:w-[30vw] md:h-[42vh]",
      z: -4000,
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=800&auto=format&fit=crop",
      alt: "Textured Nehru Jacket - Festive Layers",
      className: "top-[30%] left-[85%] md:left-[88%] w-[50vw] h-[35vh] md:w-[18vw] md:h-[30vh]",
      z: -4800,
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1550614000-4b95dd2db621?q=80&w=800&auto=format&fit=crop",
      alt: "Intricate Hand Embroidery Details",
      className: "top-[68%] left-[10%] md:left-[8%] w-[55vw] h-[40vh] md:w-[20vw] md:h-[34vh]",
      z: -5600,
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1596450514735-110291410f94?q=80&w=800&auto=format&fit=crop",
      alt: "Bridal Reds and Golds - Atlascub Couture",
      className: "top-[18%] left-[45%] md:left-[48%] w-[45vw] h-[30vh] md:w-[16vw] md:h-[28vh]",
      z: -6400,
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1583391733975-4700d11c5f87?q=80&w=800&auto=format&fit=crop",
      alt: "Flowing Lehenga Twirl - Grand Finale",
      className: "top-[85%] left-[55%] md:left-[55%] w-[65vw] h-[42vh] md:w-[28vw] md:h-[44vh]",
      z: -7200,
    },
  ];
export function CinematicShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.context helps cleanly revert animations when component unmounts (React 18 safe)
    const ctx = gsap.context(() => {
      
      // 1. The Camera Fly-Through Animation
      // Using native CSS `sticky` means we no longer need `pin: true`. We push the Z index to 7000
      // so the farthest image (-6500) perfectly settles into view without pushing it into a blank screen.
      gsap.to(galleryRef.current, {
        z: 7000, 
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth dampening on scrub
        },
      });

      // 2. Text Fade-Out Animation
      gsap.to(".showcase-text", {
        opacity: 0,
        scale: 2,
        y: -100, // Moves up slightly as you dive in
        ease: "power2.in",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1000",
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background/30 text-foreground">
      
      {/* Sticky Frame containing the 3D perspective viewport */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: "800px" }} // Decreased perspective for a deeper 3D pop
      >
        
        {/* Central Titles */}
        <div className="showcase-text absolute z-20 flex flex-col items-center pointer-events-none drop-shadow-2xl">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs md:text-sm font-secondary uppercase tracking-[0.3em] font-bold">
              The Atlascub Archive
            </span>
          </div>
          <h2 className="font-primary text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center leading-[1.1] text-foreground">
            Bespoke <br /> Mastery.
          </h2>
        </div>

        {/* 3D Gallery Wrapper */}
        <div 
          ref={galleryRef} 
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {showcaseImages.map((img) => (
            <div
              key={img.id}
              className={`absolute shadow-2xl border border-border/20 rounded-xl overflow-hidden bg-card will-change-transform ${img.className}`}
              style={{
                transform: `translate(-50%, -50%) translateZ(${img.z}px)`,
              }}
            >
              {/* Image Overlay to keep cinematic contrast and text legibility */}
              <div className="absolute inset-0 bg-background/20 z-10 mix-blend-overlay pointer-events-none" />
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Fog/Vignette overlay to blend the edges into the theme background */}
        <div 
          className="absolute inset-0 pointer-events-none z-10" 
          style={{ 
            background: "radial-gradient(circle at center, transparent 30%, hsl(var(--background)) 100%)" 
          }} 
        />
        
      </div>
    </section>
  );
}
