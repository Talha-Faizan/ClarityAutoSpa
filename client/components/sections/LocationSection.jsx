import { MapPin, Clock, Phone } from "lucide-react";

export default async function LocationSection() {
  let settings = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, { cache: 'no-store' });
    if (res.ok) {
      settings = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch settings:", error);
  }

  const address = settings?.address || "117 14th St, Brooklyn, NY 11215";
  const phone = settings?.phone || "+1 347-227-8485";
  const hours = settings?.weeklyHours?.[0]?.hours || "8:00 AM - 6:30 PM";
  const requirements = settings?.appointmentRequirements || "Appointment required for specialty services. Walk-ins welcome for basic washes.";

  return (
    <section id="location" className="py-24 bg-charcoal border-t border-grey/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-cream-alt text-charcoal px-3 py-1 rounded-full tracking-[0.12em] uppercase mb-4 text-[12px] md:text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              Visit Us
            </div>
            <h2 className="capitalize text-cream mb-10 text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] font-heading font-medium">
              Conveniently <span className="text-cream">Located</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0 text-charcoal shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-cream mb-1">Address</h4>
                  <p className="text-cream/70 mb-2">{address}</p>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="text-cream text-sm font-semibold uppercase tracking-wider hover:underline hover:text-gold transition-colors">Get Directions</a>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0 text-charcoal shadow-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-cream mb-1">Hours of Operation</h4>
                  <p className="text-cream/70 mb-2">{hours}</p>
                  <p className="text-cream/70 text-sm italic">{requirements}</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0 text-charcoal shadow-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-cream mb-1">Phone</h4>
                  <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-cream/70 hover:text-gold transition-colors">{phone}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Side */}
          <div className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden border border-cream/10 bg-black">
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
