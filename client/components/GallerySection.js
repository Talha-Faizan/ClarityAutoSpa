"use client";

import InfiniteSpiral from "./ui/InfiniteSpiral";

// Reusing high-quality images for the gallery
const galleryImages = [
  "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkhaS47ne9icREiJiA6Ei--5TLMsSM5SS7mqkXA4Oth62xCzTUgZzljs3o1jVN91mGtDf0nK0SLv5-uCvGKl74xJQqCEyktA6DfVmuzOdJ0rbn8nqY_WCr4IjzpeUFGuhs3Uqgg=s680-w680-h510-rw",
  "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnVIk038oOokcoVcPHJBYruXThVUVDkr9-lDZJazlt-rXNrhum-rm7qoTZNWQkPylO5_jxSTBj4qrmR3h2aM6pmVlmWtuFumEfsSkRV-HmrNQIv_j3tJEajcZYVzE8WpPhOPodW=s680-w680-h510-rw",
  "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnejASZn0FnQAyXx-9fzfP9MSDDtS5BM6b4L_kvIzhAd54bVgJovik2Wvdl7dUZGH6XDSiMZ6EJ4Rhcqns-w_oA5RBOcOZHucKdP_IgYi8XQ03SJtaRCGYzRx5E6m0b2NKCTeBD=s680-w680-h510-rw",
  "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnTqqXW74b7GwOUmixB0gdxFuR9B9NF4Mw0FUYaNQSJxXvJWxws1qjo8b0kyoXVQycC2oXULzDdxCvl-N2oLWOAdcIYlJQHZO2z8yfn7mbwryng3C2Q4QRTr9Zf8jUGMeMnIq_f=s680-w680-h510-rw",
  "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmgqr2yxIL6InoLj7JwjNqES4zm5XqzN2wst5GP0ahRz716YIFHj2tqlDvLdOBC9CMz7EaUoXD4JlEq2wkQd7sK9ENcgYdf6_aZLjAV9HxMH8_KL21XL1CEwZvTfpTfhcTKL3VF5g=s680-w680-h510-rw",
  "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2000&auto=format&fit=crop",
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[600px]">
          
          {/* Text Side */}
          <div className="order-2 lg:order-1 z-10">
            <div className="text-brand-secondary/70 font-bold tracking-widest uppercase text-xs mb-4">
              Our Work
            </div>
            <h2 className="font-sans font-light text-4xl md:text-5xl lg:text-8xl tracking-wide text-brand-secondary mb-6 uppercase leading-tight">
              See the <br/>
              <span className="font-black text-white tracking-tight">Clarity</span> <br/>
              Difference
            </h2>
            <p className="text-brand-secondary/80 text-lg leading-relaxed mb-10 max-w-lg">
              Interact with our 3D gallery to see the transformative results of our premium detailing services. Every vehicle gets the white-glove treatment it deserves.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center animate-pulse">
                <span className="text-black text-xl font-light tracking-tighter">←→</span>
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-brand-secondary">Drag to explore</span>
            </div>
          </div>

          {/* Spiral Side */}
          <div className="order-1 lg:order-2 h-[450px] sm:h-[550px] lg:h-[750px] w-full relative -mx-4 sm:mx-0">
            <div className="absolute inset-0 lg:scale-[1.2] flex items-center justify-center">
              <InfiniteSpiral 
                items={galleryImages} 
                animationMode="all" 
                cardWidth={200} 
                cardHeight={280} 
                radius={160} 
                perspective={1000}
                speed={0.4}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
