import { Car, Sparkles, Shield, Droplets, ArrowRight } from "lucide-react";

const iconMap = {
  Car,
  Sparkles,
  Shield,
  Droplets,
};

export default function ServiceCard({ service }) {
  const Icon = iconMap[service.icon];

  return (
    <div
      className={`relative flex flex-col h-full bg-brand-primary rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        service.popular
          ? "border border-white/20 shadow-2xl"
          : "border border-transparent hover:border-white/10 shadow-lg"
      }`}
    >
      {service.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-brand-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10">
          Most Popular
        </div>
      )}

      {/* Icon with background */}
      <div className="relative w-14 h-14 mb-8 bg-brand-bg rounded-2xl flex items-center justify-center">
        {Icon && <Icon className="w-6 h-6 text-brand-primary" strokeWidth={1.5} />}
      </div>

      <h3 className="font-sans font-bold text-xl uppercase tracking-tight text-brand-bg mb-3">
        {service.title}
      </h3>

      <p className="text-white/80 mb-8 flex-grow leading-relaxed text-[13px]">
        {service.description}
      </p>

      <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/10">
        <div className="font-sans text-xl font-normal text-white">
          {service.price}
          <span className="text-xs text-white/50 ml-1">+</span>
        </div>
        <a
          href="#quote"
          className="flex items-center gap-1 text-[11px] font-bold uppercase text-brand-bg hover:text-white transition-colors group"
        >
          Get Quote
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
