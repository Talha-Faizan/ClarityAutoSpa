import { contactInfo } from "@/lib/siteData";
import { MapPin, Clock, Phone } from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="py-24 bg-brand-primary   border-t border-brand-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Side */}
          <div>
            <div className="text-white font-bold tracking-widest uppercase text-sm mb-4">
              Visit Us
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white mb-10">
              Conveniently <span className="text-brand-bg">Located</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0 text-brand-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">Address</h4>
                  <p className="text-white/70">{contactInfo.address}</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0 text-brand-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">Hours of Operation</h4>
                  <p className="text-white/70">{contactInfo.hours}<br/>No appointment needed for basic washes.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0 text-brand-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">Phone</h4>
                  <p className="text-white/70">{contactInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Side */}
          <div className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 bg-black">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.232805404089!2d-73.9963237234317!3d40.66883914025594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25bde6e631853%3A0xad3ea7c78622e533!2sClarity%20Auto%20Spa!5e0!3m2!1sen!2sin!4v1790198739028!5m2!1sen!2sin" 
              className="absolute inset-0 w-full h-full" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
