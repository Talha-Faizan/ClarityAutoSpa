"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/gallery" },
  { label: "Reviews", href: "/testimonials" },
  { label: "About Us", href: "/#about-us" },
  { label: "Contact / Location", href: "/location" },
];

function Logo() {
  return (
    <Image src="/clarity.png" alt="Clarity Auto Spa" width={180} height={44} className="h-[36px] md:h-[44px] w-auto object-contain" priority />
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl">
      <div className="bg-cream backdrop-blur-md border border-gray-200 rounded-full px-4 py-2.5 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center ml-2">
          <Logo />
        </Link>

        {/* Center: Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-semibold text-charcoal hover:text-gold transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right: CTA Button (Desktop) & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link href="/getquote" className="hidden lg:flex items-center justify-center bg-gold text-charcoal px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-hover hover:text-charcoal transition-all shadow-md">
            Book an Appointment
          </Link>
          <Link href="tel:+13472278485" className="hidden lg:flex items-center justify-center border-2 border-gold text-charcoal px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gold hover:text-charcoal transition-colors">
            Call
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-charcoal hover:text-gold transition-colors mr-1">
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 w-full bg-cream/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden lg:hidden border border-gray-200"
          >
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  onClick={() => setMobileOpen(false)} 
                  className="px-4 py-3 text-charcoal font-semibold hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-100 last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-4 px-2 mb-2">
                <Link 
                  href="tel:+13472278485" 
                  className="flex-1 text-center bg-gray-100 text-charcoal px-4 py-3 rounded-xl font-semibold transition-all"
                >
                  Call
                </Link>
                <Link 
                  href="/getquote" 
                  className="flex-1 text-center bg-gold text-charcoal px-4 py-3 rounded-xl font-semibold hover:bg-gold-hover hover:text-charcoal transition-all shadow-md"
                >
                  Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
