import { HeroSection } from "@/components/home/hero-section";
import { GenderGrid } from "@/components/home/gender-grid";
import { FeaturedCollection } from "@/components/home/featured-section";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { NewsletterSignup } from "@/components/home/newsletter-signup";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <GenderGrid />
      <FeaturedCollection />
      <CategoryShowcase />
      <NewsletterSignup />
      <InstagramFeed />
    </main>
  );
}