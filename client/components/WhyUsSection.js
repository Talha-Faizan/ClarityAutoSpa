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
    <section id="why-us" className="py-24 bg-brand-bg border-t border-brand-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-white font-bold tracking-widest uppercase text-md mb-4">
            The Clarity Difference
          </div>
          <h2 className="font-sans font-black text-4xl md:text-6xl tracking-wide text-white uppercase">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {whyUsPoints.map((point, index) => {
            const Icon = iconMap[point.icon];
            
            return (
              <div 
                key={index} 
                className="group flex gap-6 p-8 bg-brand-primary rounded-2xl border border-transparent shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex-shrink-0">
                  <div className="relative w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center">
                    {/* Hover animation */}
                    {Icon && (
                      <Icon className="w-6 h-6 text-brand-primary transform transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                    )}
                    
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-brand-primary font-bold text-[10px] shadow-sm">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-sans font-light text-lg uppercase tracking-tight text-brand-bg mb-2">
                    {point.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-[13px]">
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
