// src/app/(CommonLayout)/page.tsx

import AboutSection from "@/components/home/AboutSection";
import BlogSection from "@/components/home/BlogSection";
import HeroSection from "@/components/home/Hero";
import ProductShowcase from "@/components/home/ProductShowcase";
import SpecialOfferSection from "@/components/home/SpecialOfferSection";
import TestimonialsSection from "@/components/home/TestmonialSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductShowcase />
      <AboutSection />
      <SpecialOfferSection />
      <TestimonialsSection />
      <BlogSection />
    </main>
  );
}
