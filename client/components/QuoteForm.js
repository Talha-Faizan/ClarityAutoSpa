"use client";

import { useState } from "react";
import { services } from "@/lib/siteData";
import { Send } from "lucide-react";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", service: "" });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="quote" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-brand-bg-alt p-8 md:p-12 rounded-3xl border border-brand-primary/20 shadow-[0_0_40px_rgba(227,169,31,0.05)]">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-brand-secondary mb-4">
              Get a <span className="text-brand-primary">Quote</span>
            </h2>
            <p className="text-brand-muted text-lg">
              Fill out the form below and we'll get back to you with an estimate or to schedule your detail.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-16 bg-brand-bg rounded-2xl border border-brand-primary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/20 text-brand-primary mb-6">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl uppercase text-brand-secondary mb-2">Request Sent!</h3>
              <p className="text-brand-muted">We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-brand-bg border border-brand-muted/20 rounded-xl px-5 py-4 text-brand-secondary placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-brand-bg border border-brand-muted/20 rounded-xl px-5 py-4 text-brand-secondary placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Service Requested
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-brand-bg border border-brand-muted/20 rounded-xl px-5 py-4 text-brand-secondary appearance-none focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                >
                  <option value="" disabled>Select a service...</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} - {s.price}
                    </option>
                  ))}
                  <option value="other">Other / Custom Request</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary text-white font-bold uppercase tracking-wide py-4 rounded-xl text-lg hover:bg-brand-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
              >
                Request Quote
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
