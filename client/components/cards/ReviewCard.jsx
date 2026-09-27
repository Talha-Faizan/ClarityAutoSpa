import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  const avatarUrl = review.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=F3F4F6&color=111827&bold=true`;

  return (
    <div className="bg-white/40 p-2 rounded-[2.5rem] h-full flex transition-transform duration-300 hover:-translate-y-1 shadow-sm">
      <div className="flex flex-col bg-white p-8 rounded-[2rem] w-full shadow-sm">
        
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={avatarUrl} 
            alt={review.name} 
            className="w-14 h-14 rounded-full object-cover shadow-sm" 
            loading="lazy"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-[17px] leading-tight">
              {review.name}
            </h4>
            <p className="text-gray-400 text-sm mt-0.5">
              {review.source}
            </p>
          </div>
        </div>
        
        {/* Quote Body */}
        <blockquote className="text-gray-800 text-[15px] leading-relaxed mb-8 flex-grow font-medium">
          “ {review.text} ”
        </blockquote>
        
        {/* Rating Footer */}
        <div className="mt-auto flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-6 h-6 ${i < review.rating ? 'fill-brand-bg text-brand-bg' : 'fill-gray-200 text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="font-bold text-gray-900 text-lg">
            {Number(review.rating).toFixed(2)}
          </span>
        </div>

      </div>
    </div>
  );
}
