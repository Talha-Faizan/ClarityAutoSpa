import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="flex flex-col bg-brand-primary p-8 rounded-2xl border border-brand-muted/10 h-full">
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < review.rating ? 'fill-brand-bg-alt text-brand-bg' : 'fill-brand-muted/20 text-brand-muted/20'}`} 
          />
        ))}
      </div>
      
      <blockquote className="text-white italic flex-grow mb-8 text-lg">
        "{review.text}"
      </blockquote>
      
      <div className="mt-auto flex items-center justify-between pt-6 border-t text-white">
        <div className="font-bold text-white">{review.name}</div>
        <div className="text-sm text-white">{review.source}</div>
      </div>
    </div>
  );
}
