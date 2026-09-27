import ReviewCard from "@/components/cards/ReviewCard";

export default async function ReviewsSection() {
  let mappedReviews = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      mappedReviews = data.map((t) => ({
        name: t.customerName,
        source: "Clarity Auto Spa",
        rating: t.rating,
        text: t.quote,
        photo: t.photoUrl
      }));
    } else {
      console.error("Failed to fetch testimonials. Status:", res.status);
    }
  } catch (error) {
    console.error("Network error fetching testimonials:", error);
  }

  // Hardcoded fallback removed to use dynamic data from database

  return (
    <section id="reviews" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-white font-bold tracking-widest uppercase text-md mb-4">
            Testimonials
          </div>
          <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-brand-primary text-lg font-semibold max-w-2xl mx-auto">
            Experience the best car detailing and exterior washing at Clarity Auto Spa. Open 24/7 with expert staff and a commitment to perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {mappedReviews.slice(0, 3).map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
