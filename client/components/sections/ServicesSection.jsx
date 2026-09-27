import ServiceCard from "@/components/cards/ServiceCard";

export default async function ServicesSection() {
  let mappedServices = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      mappedServices = data.map((s) => ({
        id: s._id,
        title: s.name,
        description: s.description,
        price: s.price,
        image: s.imageUrl || "/img-6.jpg",
        category: s.category,
        time: s.time,
        acuityLink: s.acuityLink,
        carType: s.carType
      }));
    } else {
      console.error("Failed to fetch services. Status:", res.status);
    }
  } catch (error) {
    console.error("Network error fetching services:", error);
  }

  return (
    <section id="services" className="py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-white font-bold tracking-widest uppercase text-md mb-4">
            Our Offerings
          </div>
          <h2 className="font-sans font-black text-4xl md:text-6xl tracking-wide text-white uppercase">
            Services & Pricing
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {mappedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
