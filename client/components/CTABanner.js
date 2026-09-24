import { contactInfo } from "@/lib/siteData";
import { Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-brand-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
          Ready to make your car shine?
        </h2>
        <p className="text-white/80 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
          Drive in today for an express wash or call us to schedule a premium detailing service.
        </p>
        
        <a
          href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
          className="inline-flex items-center gap-3 bg-brand-bg text-brand-secondary px-10 py-5 rounded-full font-display text-xl uppercase tracking-wider hover:bg-brand-bg-alt hover:text-brand-primary transition-colors group shadow-xl"
        >
          <Phone className="w-6 h-6 motion-safe:group-hover:animate-wiggle text-brand-primary group-hover:text-current" />
          Call {contactInfo.phone}
        </a>
        
        <div className="mt-8 text-white/90 font-bold uppercase tracking-widest text-sm">
          {contactInfo.address} • {contactInfo.hours}
        </div>
      </div>
    </section>
  );
}
