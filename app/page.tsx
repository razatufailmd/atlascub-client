import { HeroSection } from "@/components/home/hero-section";
import { GenderGrid } from "@/components/home/gender-grid";
import { FeaturedCollection } from "@/components/home/featured-section";

import { CategoryShowcase } from "@/components/home/category-showcase";
import { BrandValues } from "@/components/home/brand-values";
import { DiscoverMore } from "@/components/home/discover-section";
import { NewsletterSignup } from "@/components/home/newsletter-signup";
import { FloatingBlobs } from "@/components/home/floating-blob";
import { TestimonialsSection } from "@/components/home/testimonials";
import { FeatureSection } from "@/components/home/feature-section";
import { FaqsSection } from "@/components/home/faq-section";
import { InstagramFeedLive } from "@/components/home/ig-feed";
import { CinematicShowcase } from "@/components/home/cinematic-showcase-images";


export default function HomePage() {
  return (
    <main>
      <FloatingBlobs />
       {/* 1. Hero Section with Scroll Parallax */}
       <HeroSection />
        {/* 5. discover products */}
        <DiscoverMore/>
        {/* 2. Brand Sourcing Values */}
        <BrandValues />
        {/* 3. Featured Collections */}
        <GenderGrid />
        {/* best work */}
        <CinematicShowcase/>
        {/* 6. Category Silhouette Showcase */}
        <CategoryShowcase />
        <FeaturedCollection/>
        {/* 4. Gender/Department Split Grid */}
        <FeatureSection/>
        {/* 7. Dynamic Newsletter Signup */}
        {/* <NewsletterSignup /> */}
        {/*  */}
        <TestimonialsSection/>
        {/* 8. Instagram Community Grid */}
        {/* <InstagramFeed />  */}
        <InstagramFeedLive/>
        <FaqsSection/>
    </main>
  );
}