import Image from "next/image";

export default async function AboutUsSection() {
  let settings = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, { cache: 'no-store' });
    if (res.ok) {
      settings = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch settings:", error);
  }

  const team = settings?.team || [];

  return (
    <section id="about-us" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cream-alt text-charcoal px-3 py-1 rounded-full tracking-[0.12em] uppercase mb-4 text-[12px] md:text-[13px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            Who We Are
          </div>
          <h2 className="font-heading font-medium text-charcoal capitalize mb-6 text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15]">
            About Us
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-16">
            Welcome to Clarity Auto Spa! We are a dedicated team of detailing professionals in Park Slope, Brooklyn. We combine expert care, meticulous attention to detail, and a passion for perfection to deliver an unmatched auto spa experience. Thank you for trusting us with your vehicle.
          </p>
        </div>

        {team.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 border-4 border-cream shadow-md">
                  <Image src={member.photoUrl || "/img-6.jpg"} alt={member.name} fill className="object-cover" />
                </div>
                <h4 className="text-xl font-semibold text-charcoal mb-1">{member.name}</h4>
                <p className="text-charcoal font-semibold text-sm mb-3 uppercase tracking-wider">{member.role}</p>
                {member.bio && (
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
