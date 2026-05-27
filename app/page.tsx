import { HeroSection } from "@/components/home/hero-section";
import { GenderGrid } from "@/components/home/gender-grid";
import { FeaturedCollection } from "@/components/home/featured-section";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { BrandValues } from "@/components/home/brand-values";
import { EditorialStory } from "@/components/home/editorial-story";
import { NewsletterSignup } from "@/components/home/newsletter-signup";

export default function HomePage() {
  return (
    <main>
       {/* 1. Hero Section with Scroll Parallax */}
       <HeroSection />
        {/* 2. Brand Sourcing Values */}
        <BrandValues />
        {/* 3. Featured Collections */}
        <FeaturedCollection/>
        {/* 4. Gender/Department Split Grid */}
        <GenderGrid />
        {/* 5. Editorial Storytelling */}
        <EditorialStory />
        {/* 6. Category Silhouette Showcase */}
        <CategoryShowcase />
        {/* 7. Dynamic Newsletter Signup */}
        <NewsletterSignup />
        {/* 8. Instagram Community Grid */}
        <InstagramFeed /> 
    </main>
  );
}