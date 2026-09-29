"use client";
import Link from "next/link";
import { Phone, ClipboardEdit, Sparkles } from "lucide-react";

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-transparent rounded-xl backdrop-blur-3xl z-50 px-2 py-2 flex items-center justify-between gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <Link 
        href="/services" 
        className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-charcoal py-2 rounded-xl font-semibold text-xs border border-gray-200"
      >
        <Sparkles className="w-5 h-5 mb-1" />
        Services
      </Link>
      <a 
        href="tel:+13472278485" 
        className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-charcoal py-2 rounded-xl font-semibold text-xs border border-gray-200"
      >
        <Phone className="w-5 h-5 mb-1" />
        Call
      </a>
      <Link 
        href="/#quote" 
        className="flex-1 flex flex-col items-center justify-center bg-gold text-charcoal py-2 rounded-xl font-semibold text-xs shadow-md hover:bg-gold-hover transition-colors"
      >
        <ClipboardEdit className="w-5 h-5 mb-1" />
        Book Appointment
      </Link>
    </div>
  );
}
