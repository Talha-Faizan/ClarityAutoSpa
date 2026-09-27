import { contactInfo } from "@/lib/siteData";
import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-bg-alt border-t border-brand-muted/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="block mb-6">
              <Image src="/logo.png" alt="Clarity Auto Spa Logo" width={300} height={192} className="h-40 md:h-48 w-auto object-contain mx-auto md:mx-0" />
            </Link>
            <p className="text-brand-muted leading-relaxed mb-6 max-w-sm">
              Premium auto detailing services. 
              We combine expert care with eco-friendly practices to keep your vehicle looking its best.
            </p>
          </div>

          {/* Col 2: Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-brand-secondary uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 text-brand-muted">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-brand-muted">
                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                <a href={`tel:${contactInfo.phone.replace(/\D/g, "")}`} className="hover:text-brand-primary transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-brand-muted">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-brand-primary transition-colors">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-brand-secondary uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#services" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link href="#quote" className="text-brand-muted hover:text-brand-primary transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-brand-muted/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm text-brand-muted">
          <p>© {currentYear} Clarity Auto Spa. All rights reserved.</p>
          <p>
            Designed and Developed by <span className="text-brand-primary">GhostForm Studios</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
