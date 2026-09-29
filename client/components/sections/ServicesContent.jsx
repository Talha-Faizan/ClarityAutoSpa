"use client";

import { useState } from "react";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceQuiz from "@/components/features/ServiceQuiz";

export default function ServicesContent({ services, categories }) {
  const [miniDetailModal, setMiniDetailModal] = useState({ isOpen: false, service: null });
  const [ackChecked, setAckChecked] = useState(false);

  const handleBookMiniDetail = (service) => {
    setAckChecked(false);
    setMiniDetailModal({ isOpen: true, service });
  };

  const handleContinueBooking = () => {
    if (!ackChecked || !miniDetailModal.service) return;
    const url = miniDetailModal.service.acuityLink || "https://claritybk.as.me";
    window.open(url, "_blank");
    setMiniDetailModal({ isOpen: false, service: null });
  };

  // Filter categories to only those that have enabled services
  const activeCategories = categories.filter(cat => {
    if (!cat.enabled) return false;
    const catServices = services.filter(s => s.categoryId === cat.slug && s.enabled);
    return catServices.length > 0;
  });

  return (
    <div className="pb-24">
      {/* Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 md:pt-12 mb-8">
        <div className="inline-flex items-center gap-2 bg-gold text-charcoal px-3 py-1 rounded-full tracking-[0.12em] uppercase mb-4 text-[12px] md:text-[13px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-charcoal"></span>
          Our Offerings
        </div>
        <h1 className="font-heading font-medium text-charcoal capitalize text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] tracking-[-0.01em]">
          Services & Pricing
        </h1>
      </div>

      {/* Jump Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap overflow-x-auto pb-4 hide-scrollbar gap-3 md:justify-center md:sticky md:top-24 z-30 bg-cream/90 backdrop-blur-md pt-2">
          {activeCategories.map(cat => (
            <button 
              key={cat.slug}
              onPointerDown={(e) => {
                e.preventDefault();
                const el = document.getElementById(cat.slug);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 150;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-[13px] font-semibold text-charcoal active:border-gold active:bg-gold/5 transition-colors shadow-sm"
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>



      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {activeCategories.map(cat => {
          const catServices = services.filter(s => s.categoryId === cat.slug && s.enabled)
                                      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          const isSpecialty = cat.slug === 'specialty';

          return (
            <div key={cat.slug} id={cat.slug} className="scroll-mt-32 animate-fade-in-up">
              <div className="mb-6 border-b border-gray-200 pb-4">
                <h2 className="font-medium text-charcoal capitalize text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] font-heading mb-3">
                  {cat.title}
                </h2>
                {cat.description && (
                  <p className="text-charcoal-soft leading-[1.65] max-w-3xl">
                    {cat.description}
                  </p>
                )}
                {cat.slug === 'mini-detail' && (
                  <p className="text-charcoal-soft text-sm mt-4 bg-cream-alt p-4 rounded-xl border border-gray-100">
                    Mini Detail covers light maintenance cleaning. It does not include shampooing, stain treatment, embedded pet-hair removal or odor treatment.
                  </p>
                )}
              </div>

              <div className={`grid gap-6 xl:gap-8 ${isSpecialty ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                {catServices.map(service => (
                  <ServiceCard key={service._id || service.id} service={service} onBookMiniDetail={handleBookMiniDetail} />
                ))}
              </div>
              
              {(cat.slug === 'specialty' && catServices.some(s => s.name.includes('Water') || s.name.includes('Mold'))) && (
                <div className="mt-8 bg-cream-alt p-4 rounded-xl border border-gray-100 text-sm text-charcoal-soft italic">
                  We clean, dry and treat vehicle interiors. We do not repair mechanical or electrical damage caused by flooding.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Section Moved to Bottom */}
      <div id="quiz" className="scroll-mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-20">
        <ServiceQuiz services={services} categories={categories} onBookMiniDetail={handleBookMiniDetail} />
      </div>

      {/* Mini Detail Acknowledgement Modal */}
      {miniDetailModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[2rem] p-6 shadow-2xl relative animate-slide-up">
            <button 
              onClick={() => setMiniDetailModal({ isOpen: false, service: null })}
              className="absolute top-4 right-4 text-gray-400 hover:text-charcoal transition-colors p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <h3 className="font-heading font-semibold text-2xl text-charcoal mb-4 pr-8">
              Booking a Mini Detail
            </h3>
            
            <div className="bg-cream-alt rounded-xl p-4 mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    checked={ackChecked}
                    onChange={(e) => setAckChecked(e.target.checked)}
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-colors flex items-center justify-center ${ackChecked ? 'bg-gold border-gold' : 'border-gray-300 group-hover:border-gold'}`}>
                    {ackChecked && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                  </div>
                </div>
                <span className="text-sm text-charcoal leading-[1.65]">
                  I understand that a Mini Detail covers light maintenance cleaning. It does not include shampooing, stain treatment, embedded pet-hair removal or odor treatment. If my vehicle requires deeper cleaning, Clarity Auto SPA will discuss any service and price changes with me before work begins.
                </span>
              </label>
            </div>
            
            <button
              disabled={!ackChecked}
              onClick={handleContinueBooking}
              className="w-full bg-gold text-charcoal font-semibold py-3.5 rounded-full hover:bg-gold-hover disabled:opacity-50 disabled:hover:bg-gold transition-colors"
            >
              Continue to booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
