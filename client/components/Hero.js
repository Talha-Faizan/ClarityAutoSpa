import { stats, contactInfo } from "@/lib/siteData";
import { Star, Users, Clock, Award, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const iconMap = {
  Star,
  Users,
  Clock,
  Award,
};

export default function Hero() {
  return (
    <section className="relative pt-20  overflow-hidden bg-brand-bg-alt border-b border-brand-muted/10">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-bg border border-brand-primary/20 mb-8 shadow-[0_0_15px_rgba(227,169,31,0.1)]">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider text-brand-secondary">
              Open Right Now
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9] mb-8 text-brand-secondary">
            Premium Care For Your <span className="text-brand-primary">Vehicle</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm md:text-md bg-red-400 text-brand-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the best car detailing and exterior washing at Clarity Auto Spa. 
            Open 24/7 with expert staff and a commitment to perfection.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
              className="flex items-center justify-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full font-bold uppercase text-lg w-full sm:w-auto hover:bg-brand-primary/90 transition-all hover:scale-105 active:scale-95 group"
            >
              <Phone className="w-5 h-5 motion-safe:group-hover:animate-wiggle" />
              Call Now
            </a>
            <Link
              href="#services"
              className="flex items-center justify-center gap-2 bg-transparent border-2 border-brand-muted/30 text-brand-secondary px-8 py-4 rounded-full font-bold uppercase text-lg w-full sm:w-auto hover:border-brand-primary hover:text-brand-primary transition-all hover:scale-105 active:scale-95"
            >
              View Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon];
            return (
              <div 
                key={idx} 
                className="group flex flex-col items-center justify-center p-6 bg-brand-bg rounded-2xl border border-brand-muted/10 hover:border-brand-primary/30 transition-colors"
              >
                <div className="w-12 h-12 bg-brand-bg-alt rounded-full flex items-center justify-center mb-4 text-brand-primary transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <div className="text-3xl font-display text-brand-secondary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-brand-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
