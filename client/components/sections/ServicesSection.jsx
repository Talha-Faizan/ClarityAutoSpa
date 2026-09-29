import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function ServicesSection() {
  let categories = [];
  try {
    const resCat = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/categories`, { cache: 'no-store' });
    if (resCat.ok) categories = await resCat.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  const activeCategories = categories.filter(c => c.enabled).sort((a,b) => (a.order||0) - (b.order||0));

  return (
    <section className="py-24 bg-cream relative z-10" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E7B21E] text-charcoal px-3 py-1 rounded-full tracking-[0.12em] uppercase mb-4 text-[12px] md:text-[13px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal"></span>
            Our Offerings
          </div>
          <h2 className="font-heading font-medium text-charcoal capitalize text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] mb-6">
            Comprehensive Detailing
          </h2>
          <p className="text-charcoal-soft font-sans leading-[1.65] text-[17px]">
            From routine maintenance to deep interior restoration, select the perfect package for your vehicle's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 mb-16">
          {activeCategories.map((cat, index) => (
            <div key={cat.slug} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full group hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold font-bold text-xl">
                  0{index + 1}
                </div>
              </div>
              <h3 className="font-heading font-semibold text-[26px] md:text-[28px] text-charcoal mb-4">
                {cat.title}
              </h3>
              <p className="text-charcoal-soft leading-[1.65] mb-8 flex-grow">
                {cat.description}
              </p>
              <Link 
                href={`/services#${cat.slug}`}
                className="inline-flex items-center gap-2 font-semibold text-charcoal hover:text-gold transition-colors group-hover:gap-3"
              >
                View Packages <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services" className="inline-flex items-center justify-center bg-gold text-charcoal px-8 py-4 rounded-full font-semibold hover:bg-gold-hover transition-colors shadow-lg">
            See All Pricing & Services
          </Link>
        </div>

      </div>
    </section>
  );
}
