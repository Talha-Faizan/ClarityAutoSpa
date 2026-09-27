"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Location", href: "/location" },
];

function Logo() {
  return (
    <img src="/clarity.png" alt="Clarity Auto Spa" className="h-8 w-auto object-contain" />
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-5xl">
      <div className="bg-brand-primary backdrop-blur-md border border-brand-primary/20 rounded-full px-3 py-2.5 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center ml-2">
          <Logo />
        </Link>

        {/* Center: Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-white hover:text-brand-bg transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: CTA Button (Desktop) & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link href="tel:+13472278485" className="hidden md:flex items-center justify-center bg-[#FFC601] text-[#383939] px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg">
            Call (347) 227-8485
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-brand-secondary hover:text-brand-primary transition-colors mr-2">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="absolute top-20 left-0 w-full bg-brand-bg-alt/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden md:hidden border border-brand-primary/20"
          >
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  onClick={() => setMobileOpen(false)} 
                  className="px-4 py-3 text-brand-secondary font-medium hover:bg-brand-bg rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                href="tel:+13472278485" 
                className="mt-2 mx-2 mb-2 text-center bg-brand-primary text-white px-4 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
              >
                Call (347) 227-8485
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
