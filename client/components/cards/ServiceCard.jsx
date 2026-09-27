import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-[2rem] p-2 transition-transform duration-300 hover:-translate-y-1 shadow-md hover:shadow-2xl flex flex-col h-full group border border-gray-100">
      
      {/* Top Image Section */}
      <div className="relative bg-yellow-100 rounded-[1.5rem] overflow-hidden aspect-[4/3] flex flex-col">
        {/* The Image */}
        <div className="flex-1 relative overflow-hidden">
          <Image 
            src={service.image || "/img-6.jpg"} 
            alt={service.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
          />
        </div>
        
        {/* Bottom Banner */}
        <div className="bg-brand-bg text-brand-primary text-center py-2.5 text-[11px] font-bold z-10 w-full relative tracking-widest uppercase">
          {service.carType && service.carType !== 'All Vehicles' ? `Available for ${service.carType}` : 'Available for All Vehicles'}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-3 pt-5 pb-4 flex-grow flex gap-4">
        
        {/* Left: Title & Tags */}
        <div className="flex-1 flex flex-col justify-between">
          <h3 className="font-sans font-medium text-[22px] text-gray-900 leading-tight tracking-tight line-clamp-2 mb-3">
            {service.title}
          </h3>
          
          {/* Tags / Pills */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {service.category && (
              <span className="bg-yellow-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide">
                {service.category}
              </span>
            )}
            {service.time && (
              <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide">
                {service.time}
              </span>
            )}
            {service.popular ? (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide">
                Popular
              </span>
            ) : (
              <span className="bg-yellow-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide">
                Premium
              </span>
            )}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] bg-gray-200 shrink-0 my-1" />

        {/* Right: Price & Order */}
        <div className="shrink-0 flex flex-col justify-center items-end pl-1 pr-1">
          <div className="text-gray-900 font-medium text-3xl mb-1.5 leading-none">
            $ {service.price}
          </div>
          <a
            href={service.acuityLink || "#quote"}
            target={service.acuityLink ? "_blank" : "_self"}
            rel={service.acuityLink ? "noopener noreferrer" : ""}
            className="flex items-center gap-1 text-[12px] font-medium text-gray-900 hover:text-brand-bg transition-colors whitespace-nowrap"
          >
            Order Now <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
      
    </div>
  );
}
