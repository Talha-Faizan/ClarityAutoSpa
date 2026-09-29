import { Phone } from "lucide-react";

export default async function CTABanner() {
  let settings = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, { cache: 'no-store' });
    if (res.ok) {
      settings = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch settings for CTA:", error);
  }

  const phone = settings?.phone || "+1 347-227-8485";
  const address = settings?.address || "117 14th St, Brooklyn, NY 11215";
  const hours = settings?.weeklyHours?.[0]?.hours || "8:00 AM - 6:30 PM";

  return (
    <section className="bg-charcoal py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display md: capitalize text-cream mb-4 text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] font-heading font-medium">
          Ready to make your car shine?
        </h2>
        <p className="text-cream/80 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
          Drive in today for an express wash or call us to schedule a premium detailing service.
        </p>
        
        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="inline-flex items-center gap-3 bg-gold text-charcoal px-10 py-5 rounded-full font-display text-xl uppercase tracking-wider hover:bg-gold-hover hover:text-charcoal transition-colors group shadow-xl"
        >
          <Phone className="w-6 h-6 motion-safe:group-hover:animate-wiggle text-charcoal group-hover:text-current" />
          Call {phone}
        </a>
        
        <div className="mt-8 text-cream/90 font-semibold uppercase tracking-widest text-sm">
          {address} • {hours}
        </div>
      </div>
    </section>
  );
}
