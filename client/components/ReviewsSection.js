import { reviews } from "@/lib/siteData";
import ReviewCard from "./ReviewCard";

export default function ReviewsSection() {
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
          <p className="text-brand-primary text-lg font-semibold">
            Don't just take our word for it. Here's what the community thinks about Clarity Auto Spa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
