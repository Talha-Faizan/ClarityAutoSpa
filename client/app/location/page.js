import LocationSection from "@/components/sections/LocationSection";
import CTABanner from "@/components/layout/CTABanner";

export const metadata = {
  title: "Location & Hours | Clarity Auto Spa",
  description: "Visit Clarity Auto Spa in the heart of Park Slope, Brooklyn. Open 24/7.",
};

export default function LocationPage() {
  return (
    <div className="pt-24 bg-brand-primary min-h-screen flex flex-col">
      <div className="flex-grow">
        <LocationSection />
      </div>
      <CTABanner />
    </div>
  );
}
