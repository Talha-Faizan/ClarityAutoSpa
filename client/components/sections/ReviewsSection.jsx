import ReviewCard from "@/components/cards/ReviewCard";

export default async function ReviewsSection() {
  let settings = null;
  let mappedReviews = [];
  try {
    const [res, settingsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, { cache: 'no-store' }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, { cache: 'no-store' })
    ]);
    if (res.ok) {
      const data = await res.json();
      mappedReviews = data.map((t) => ({
        name: t.customerName,
        source: "Google review",
        rating: t.rating,
        text: t.quote,
        photo: t.photoUrl
      }));
    }
    if (settingsRes.ok) {
      settings = await settingsRes.json();
    }
  } catch (error) {
    console.error("Network error fetching testimonials:", error);
  }

  const rating = settings?.rating || 4.6;
  const reviewCount = settings?.reviewCount || 133;
  const googleUrl = settings?.googleReviewsUrl || "#";

  return (
    <section id="reviews" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cream-alt text-charcoal px-3 py-1 rounded-full tracking-[0.12em] uppercase mb-4 text-[12px] md:text-[13px] font-semibold">
            <span className="text-gold">★</span>
            <span>{rating} Google Rating · {reviewCount} Reviews</span>
          </div>
          <h2 className="font-medium capitalize text-charcoal mb-6 text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] font-heading">
            What Our Clients Say
          </h2>
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-charcoal text-sm font-semibold uppercase tracking-widest bg-gold px-6 py-3 rounded-full hover:bg-gold-hover transition-colors shadow-lg">
            Read all reviews on Google
          </a>
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
