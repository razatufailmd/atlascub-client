import { HeroSection } from "@/components/home/hero-section";
import { GenderGrid } from "@/components/home/gender-grid";
import { FeaturedCollection } from "@/components/home/featured-section";

import { CategoryShowcase } from "@/components/home/category-showcase";
import { BrandValues } from "@/components/home/brand-values";
import { EditorialStory } from "@/components/home/editorial-story";
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
        {/* 2. Brand Sourcing Values */}
        <BrandValues />
        {/* 3. Featured Collections */}
        <FeaturedCollection/>
        {/* 4. Gender/Department Split Grid */}
        <GenderGrid />
        {/* best work */}
        <CinematicShowcase/>
        {/* 5. Editorial Storytelling */}
        <EditorialStory />
        {/* 6. Category Silhouette Showcase */}
        <CategoryShowcase />
        <FeatureSection/>
        {/* 7. Dynamic Newsletter Signup */}
        <NewsletterSignup />
        {/*  */}
        <TestimonialsSection/>
        {/* 8. Instagram Community Grid */}
        {/* <InstagramFeed />  */}
        <InstagramFeedLive/>
        <FaqsSection/>
    </main>
  );
}