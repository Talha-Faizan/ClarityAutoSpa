import BeforeAfterSlider from "@/components/features/BeforeAfterSlider";

const SERVICE_CATEGORIES = ['Detailing', 'Exterior Wash', 'Interior Detailing'];

export const metadata = {
  title: "Gallery | Clarity Auto Spa",
  description: "View our before and after auto detailing transformations.",
};

export default async function GalleryPage() {
  let images = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, { cache: 'no-store' });
    if (res.ok) {
      images = await res.json();
    }
  } catch (error) {
    console.error("Network error fetching gallery:", error);
  }

  const groupedImages = SERVICE_CATEGORIES.map(category => {
    return {
      category,
      items: images.filter(img => img.category === category)
    };
  }).filter(group => group.items.length > 0);

  return (
    <div className="pt-32 pb-24 bg-brand-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-white font-bold tracking-widest uppercase text-md mb-4">
            Our Work
          </div>
          <h1 className="font-sans font-black text-4xl md:text-6xl tracking-wide text-brand-bg uppercase mb-6">
            Transformation Gallery
          </h1>
          <p className="text-white/70 text-lg">
            See the dramatic difference a professional detail can make.
          </p>
        </div>

        <div className="space-y-24">
          {groupedImages.length === 0 ? (
            <div className="text-center text-white/50 text-xl font-light">More transformations coming soon.</div>
          ) : (
            groupedImages.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-10 pb-4 border-b border-white/10">
                  {section.category}
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {section.items.map((item) => (
                    <div key={item._id} className="flex flex-col gap-4">
                      {item.imageType === 'Plain Image' ? (
                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl relative">
                          <img src={item.imageUrl} alt={item.title || "Gallery Image"} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <BeforeAfterSlider 
                          beforeImage={item.beforeImageUrl} 
                          afterImage={item.afterImageUrl} 
                        />
                      )}
                      {item.title && (
                        <p className="text-white/60 text-sm italic text-center">
                          {item.title}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
}
