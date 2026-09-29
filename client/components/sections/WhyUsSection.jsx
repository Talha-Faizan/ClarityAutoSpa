import { whyUsPoints } from "@/lib/siteData";
import { Clock, Leaf, BadgeCheck, ThumbsUp } from "lucide-react";

const iconMap = {
  Clock,
  Leaf,
  BadgeCheck,
  ThumbsUp,
};

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 bg-cream border-t border-grey/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cream-alt text-charcoal px-3 py-1 rounded-full tracking-[0.12em] uppercase mb-4 text-[12px] md:text-[13px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            The Clarity Difference
          </div>
          <h2 className="font-heading font-medium text-charcoal capitalize text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15]">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {whyUsPoints.map((point, index) => {
            const Icon = iconMap[point.icon];
            
            return (
              <div 
                key={index} 
                className="group flex gap-6 p-8 bg-cream rounded-2xl border border-grey shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex-shrink-0">
                  <div className="relative w-14 h-14 bg-cream-alt rounded-2xl flex items-center justify-center border border-grey/50">
                    {/* Hover animation */}
                    {Icon && (
                      <Icon className="w-6 h-6 text-charcoal transform transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                    )}
                    
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center text-charcoal font-semibold text-[10px] shadow-sm">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-lg capitalize tracking-tight text-charcoal mb-2 text-[1.5rem]">
                    {point.title}
                  </h3>
                  <p className="leading-relaxed text-[13px] text-charcoal-soft">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
