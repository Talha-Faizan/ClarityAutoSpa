"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ServiceCard({ service, onBookMiniDetail }) {
  const getPriceLabel = () => {
    if (!service.price || service.price === "0" || service.price === "") {
      return <span className="text-sm">Quote on request</span>;
    }
    switch (service.pricingType) {
      case 'starts_at':
        return <span className="whitespace-nowrap">Starts at<br/>${service.price}</span>;
      case 'inspection':
        return <span className="tabular-nums font-semibold text-2xl md:text-3xl">${service.price}</span>;
      case 'fixed':
      default:
        return <span className="tabular-nums font-semibold text-2xl md:text-3xl">${service.price}</span>;
    }
  };

  const handlePrimaryClick = (e) => {
    if (service.categoryId === "mini-detail") {
      e.preventDefault();
      onBookMiniDetail(service);
    }
  };

  return (
    <div className="bg-cream rounded-[2rem] p-2 transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_16px_rgba(52,52,52,0.08)] hover:shadow-2xl flex flex-col h-full group border border-grey">
      
      {/* Top Image Section */}
      <div className="relative bg-cream-alt rounded-[1.5rem] overflow-hidden aspect-[4/3] flex flex-col">
        {/* The Image */}
        <div className="flex-1 relative overflow-hidden">
          <Image 
            src={service.imageUrl || "/img-6.jpg"} 
            alt={service.name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pt-5 pb-4 flex-grow flex flex-col gap-4">
        
        {/* Left: Title & Tags */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-sans font-semibold text-[22px] text-charcoal leading-tight tracking-tight mb-2">
            {service.name}
          </h3>
          
          {service.description && (
            <p className="text-sm text-charcoal-soft mb-3 line-clamp-3">
              {service.description}
            </p>
          )}

          {/* Tags / Pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {(service.vehicleSize || service.carType) && (
              <span className="bg-cream-alt text-charcoal px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase">
                {(service.vehicleSize || service.carType).replace('_', ' ')}
              </span>
            )}
            {(service.turnaround || service.time) && (
              <span className="bg-cream-alt text-charcoal px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide">
                {service.turnaround || service.time}
              </span>
            )}
            {service.categoryId === 'specialty' && service.requiresAssessment && (
              <span className="bg-cream-alt text-charcoal px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide">
                Assessment may be required
              </span>
            )}
          </div>
        </div>

        <div className="w-full h-[1px] bg-grey shrink-0 my-1 opacity-50" />

        {/* Bottom: Price & CTAs */}
        <div className="flex justify-between items-end gap-2 pt-2">
          <div className="text-charcoal font-semibold text-lg leading-tight">
            {getPriceLabel()}
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {service.acuityLink ? (
              <>
                <a
                  href={service.acuityLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handlePrimaryClick}
                  className="flex items-center gap-1 text-[12px] font-semibold text-charcoal hover:text-charcoal bg-gold hover:bg-gold-hover transition-colors whitespace-nowrap px-4 py-2 rounded-full"
                >
                  Book a Detail <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <Link href={`/getquote?service=${encodeURIComponent(service.name)}`} className="text-[11px] font-medium text-charcoal-soft hover:text-charcoal underline underline-offset-2">
                  Request a Quote
                </Link>
              </>
            ) : (
              <Link
                href={`/getquote?service=${encodeURIComponent(service.name)}`}
                className="flex items-center gap-1 text-[12px] font-semibold text-charcoal hover:text-charcoal bg-gold hover:bg-gold-hover transition-colors whitespace-nowrap px-4 py-2 rounded-full"
              >
                Request an Assessment <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
