"use client";

import { useState, useRef, useEffect } from "react";
import { quizOptions, DEEP, SPECIALTY, NONE, quizResults } from "@/config/quizConfig";
import ServiceCard from "@/components/cards/ServiceCard";
import Link from "next/link";

export default function ServiceQuiz({ services = [], categories = [], onBookMiniDetail }) {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [followUpResponse, setFollowUpResponse] = useState(null); // 'yes' | 'no' | null
  const [announcement, setAnnouncement] = useState("");
  const resultRef = useRef(null);

  const handleToggle = (id) => {
    let newSelected;
    if (id === NONE) {
      newSelected = [NONE];
      setAnnouncement("Selected: None of these. Other options cleared.");
    } else {
      if (selected.includes(NONE)) {
        newSelected = [id];
      } else {
        newSelected = selected.includes(id) 
          ? selected.filter(x => x !== id) 
          : [...selected, id];
      }
      const optionLabel = quizOptions.find(o => o.id === id)?.label;
      setAnnouncement(selected.includes(id) ? `Unselected: ${optionLabel}` : `Selected: ${optionLabel}`);
    }
    setSelected(newSelected);
    setResult(null); // Clear result if user changes selection
    setFollowUpResponse(null);
  };

  const handleRecommend = () => {
    let res = null;
    
    const hasSpecialty = selected.some(s => SPECIALTY.includes(s));
    const hasDeep = selected.some(s => DEEP.includes(s));
    
    if (hasSpecialty) {
      res = quizResults.SPECIALTY;
    } else if (hasDeep) {
      res = quizResults.DEEP;
    } else if (selected.includes(NONE)) {
      res = quizResults.MINI;
    }

    setResult(res);
    setAnnouncement(`Result: ${res?.title}`);
    
    // Scroll to result after a short delay to let it render
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleStartOver = (e) => {
    e.preventDefault();
    setSelected([]);
    setResult(null);
    setFollowUpResponse(null);
    setAnnouncement("Quiz reset");
  };

  const getResultCards = () => {
    if (!result) return [];
    
    let targetSlug = null;
    if (result.id === "MINI") targetSlug = "mini-detail";
    if (result.id === "DEEP") {
      if (followUpResponse === 'yes') targetSlug = "full-detail";
      else if (followUpResponse === 'no') targetSlug = "interior-detail";
      else return []; // No cards until follow-up answered
    }
    
    if (!targetSlug) return [];

    return services.filter(s => s.categoryId === targetSlug && s.enabled)
                   .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  };

  const resultCards = getResultCards();

  const getQuoteUrl = () => {
    const selectedLabels = selected.map(id => quizOptions.find(o => o.id === id)?.label).join('; ');
    const msg = `Quiz selections: ${selectedLabels}`;
    return `/getquote?service=Not%20sure&message=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-cream-alt rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gold/10 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div aria-live="polite" className="sr-only">{announcement}</div>
      
      {!result ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading font-medium text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] text-charcoal mb-2 capitalize">
              Does your vehicle have any of the following?
            </h2>
            <p className="text-charcoal-soft font-medium">Select all that apply.</p>
          </div>

          <fieldset className="space-y-3 mb-8">
            <legend className="sr-only">Vehicle conditions</legend>
            {quizOptions.map((opt) => {
              const isChecked = selected.includes(opt.id);
              return (
                <label 
                  key={opt.id} 
                  className={`flex items-center min-h-[56px] p-4 md:px-6 rounded-2xl border-2 transition-all cursor-pointer focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 ${isChecked ? 'border-gold bg-gold/5 shadow-md shadow-gold/10' : 'border-white bg-white hover:border-gold/30 hover:shadow-sm'}`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => handleToggle(opt.id)}
                  />
                  <div className={`w-5 h-5 flex-shrink-0 border-2 rounded mr-4 transition-colors flex items-center justify-center ${isChecked ? 'border-gold bg-gold' : 'border-gray-300'}`}>
                    {isChecked && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                  </div>
                  <span className="font-sans text-charcoal leading-[1.65] font-medium">{opt.label}</span>
                </label>
              );
            })}
          </fieldset>

          <div className="text-center">
            <button
              disabled={selected.length === 0}
              onClick={handleRecommend}
              className="bg-gold text-charcoal font-semibold px-8 py-4 rounded-full hover:bg-gold-hover transition-colors disabled:opacity-50 disabled:hover:bg-gold w-full sm:w-auto"
            >
              See my recommendation
            </button>
          </div>
        </div>
      ) : (
        <div ref={resultRef} className="animate-fade-in scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-cream-alt text-charcoal px-3 py-1 rounded-full text-[12px] md:text-[13px] tracking-[0.12em] font-semibold uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              Recommendation
            </div>
            <h2 className="font-heading font-medium text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] text-charcoal mb-4 capitalize">
              {result.title}
            </h2>
            <p className="text-charcoal-soft leading-[1.65] text-[16px] md:text-[17px] mb-6">
              {result.copy}
            </p>
            
            {result.id === "DEEP" && (
              <div className="bg-white p-6 md:p-8 rounded-[2rem] inline-block text-left mb-8 w-full max-w-lg border border-gray-100 shadow-sm relative z-10">
                <p className="font-semibold text-charcoal mb-6 text-center text-[17px]">Would you like comprehensive exterior detailing too?</p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setFollowUpResponse('yes')}
                    className={`px-6 py-2.5 rounded-full font-semibold transition-colors border-2 ${followUpResponse === 'yes' ? 'bg-gold border-gold text-charcoal' : 'bg-transparent border-gray-300 text-charcoal hover:border-gold'}`}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setFollowUpResponse('no')}
                    className={`px-6 py-2.5 rounded-full font-semibold transition-colors border-2 ${followUpResponse === 'no' ? 'bg-gold border-gold text-charcoal' : 'bg-transparent border-gray-300 text-charcoal hover:border-gold'}`}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {result.id === "SPECIALTY" && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link 
                  href={getQuoteUrl()}
                  className="bg-gold text-charcoal font-semibold px-8 py-3.5 rounded-full hover:bg-gold-hover transition-colors"
                >
                  Request an Assessment
                </Link>
                <a 
                  href="tel:+13472278485"
                  className="bg-transparent text-charcoal font-semibold border-[1.5px] border-charcoal px-8 py-3.5 rounded-full hover:bg-charcoal hover:text-white transition-colors"
                >
                  Call Us
                </a>
              </div>
            )}
            
            <div className="mt-6">
              <a href="#" onClick={handleStartOver} className="text-sm font-semibold text-charcoal-soft underline underline-offset-4 hover:text-charcoal">
                Start over
              </a>
            </div>
          </div>

          {resultCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 mt-10 animate-fade-in-up">
              {resultCards.map(service => (
                <ServiceCard key={service._id || service.id} service={service} onBookMiniDetail={onBookMiniDetail} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
