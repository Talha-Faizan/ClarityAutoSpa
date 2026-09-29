import QuoteForm from "@/components/features/QuoteForm";
import CTABanner from "@/components/layout/CTABanner";

export const metadata = {
  title: "Get a Quote | Clarity Auto Spa",
  description: "Request a free assessment and quote for your vehicle.",
};

export default function GetQuotePage() {
  return (
    <div className="pt-24 bg-charcoal min-h-screen flex flex-col">
      <div className="flex-grow">
        <section className="bg-cream py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuoteForm />
          </div>
        </section>
      </div>
      <CTABanner />
    </div>
  );
}
