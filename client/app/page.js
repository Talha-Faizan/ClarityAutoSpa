import { LandingHero } from "@/components/sections/LandingHero";
import GallerySection from "@/components/sections/GallerySection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import LocationSection from "@/components/sections/LocationSection";
import CTABanner from "@/components/layout/CTABanner";
import CurvedLoop from "@/components/animations/CurvedLoop";
import ServiceQuiz from "@/components/features/ServiceQuiz";

export default async function Home() {
  let services = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, { cache: 'no-store' });
    if (res.ok) {
      services = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch services for quiz:", error);
  }

  return (
    <>
      <LandingHero />
      <CurvedLoop
        marqueeText="PREMIUM  ✦ AUTO ✦ DETAILING ✦ UNMATCHED ✦ CLARITY ✦ "
        speed={2}
        curveAmount={0}
        direction="right"
      />
      <ReviewsSection />
      <ServiceQuiz services={services} />
      <GallerySection />
      <WhyUsSection />
      <LocationSection />
      <CTABanner />
    </>
  );
}
