import InfiniteSpiral from "@/components/animations/InfiniteSpiral";

export default async function GallerySection() {
  let galleryImages = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      galleryImages = data
        .filter(img => img.showOnLandingPage)
        .map(img => img.imageUrl || img.afterImageUrl)
        .filter(Boolean);
    }
  } catch (error) {
    console.error("Network error fetching gallery:", error);
  }

  // Ensure there is an array to avoid crashes if empty
  if (!galleryImages.length) {
    galleryImages = [];
  }
  return (
    <section id="gallery" className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[600px]">
          
          {/* Text Side */}
          <div className="order-1 z-10">
            <div className="inline-flex items-center gap-2 bg-cream-alt text-charcoal px-3 py-1 rounded-full tracking-[0.12em] uppercase mb-4 text-[12px] md:text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              Our Work
            </div>
            <h2 className="font-heading text-charcoal mb-6 capitalize text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] font-medium">
              See the <br/>
              <span className="font-semibold text-gold tracking-tight">Clarity</span> <br/>
              Difference
            </h2>
            <p className="text-charcoal/80 text-lg leading-relaxed mb-10 max-w-lg">
              Interact with our 3D gallery to see the transformative results of our premium detailing services. Every vehicle gets the white-glove treatment it deserves.
            </p>
            <a
              href="/gallery"
              className="inline-block bg-gold text-charcoal px-8 py-3 rounded-full font-semibold uppercase tracking-widest text-sm hover:bg-gold-hover transition-all shadow-lg"
            >
              View Full Gallery
            </a>
          </div>

          {/* Spiral Side */}
          <div className="order-2 h-[450px] sm:h-[550px] lg:h-[750px] w-full relative -mx-4 sm:mx-0">
            <div className="absolute inset-0 lg:scale-[1.2] flex items-center justify-center">
              {galleryImages.length > 0 ? (
                <InfiniteSpiral 
                  items={galleryImages} 
                  animationMode="all" 
                  cardWidth={200} 
                  cardHeight={280} 
                  radius={160} 
                  perspective={1000}
                  speed={0.4}
                />
              ) : (
                <div className="text-cream text-center font-semibold">No gallery images available.</div>
              )}
            </div>
          </div>

          

        </div>
      </div>
    </section>
  );
}
