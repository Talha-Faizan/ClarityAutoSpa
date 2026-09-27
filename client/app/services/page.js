import ServicesSection from "@/components/sections/ServicesSection";
import ServiceQuiz from "@/components/features/ServiceQuiz";

export const metadata = {
  title: "Services & Pricing | Clarity Auto Spa",
  description: "Explore our premium auto detailing services and packages.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-brand-bg">
      <ServicesSection />
      <ServiceQuiz/>
    </div>
  );
}
