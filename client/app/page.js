import { LandingHero } from "@/components/ui/demo";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import WhyUsSection from "@/components/WhyUsSection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import QuoteForm from "@/components/QuoteForm";
import CTABanner from "@/components/CTABanner";
import CurvedLoop from "@/components/ui/CurvedLoop";

export default function Home() {
  return (
    <>
      <LandingHero />
      <CurvedLoop
        marqueeText="PREMIUM  ✦ AUTO ✦ DETAILING ✦ UNMATCHED ✦ CLARITY ✦ "
        speed={2}
        curveAmount={0}
        direction="right"
      />
      <GallerySection />
      <ServicesSection />
      <WhyUsSection />
      <ReviewsSection />
      <LocationSection />
      {/* <QuoteForm /> */}
      <CTABanner />
    </>
  );
}
