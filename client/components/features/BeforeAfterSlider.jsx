"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt = "Before and after comparison",
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseMove = useCallback(
    (e) => updatePosition(e.clientX),
    [updatePosition],
  );
  const handleTouchMove = useCallback(
    (e) => updatePosition(e.touches[0].clientX),
    [updatePosition],
  );
  const handleMouseLeave = useCallback(() => setSliderPosition(50), []);

  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize group select-none shadow-2xl border border-white/10"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={afterImage}
        alt={`After: ${alt}`}
        fill
        className="object-cover pointer-events-none"
        sizes="(max-width: 768px) 100vw, 80vw"
        priority
      />

      <div
        className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <div 
          className="absolute top-0 left-0 h-full pointer-events-none" 
          style={{ width: containerWidth ? `${containerWidth}px` : "100vw" }}
        >
          <Image
            src={beforeImage}
            alt={`Before: ${alt}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white pointer-events-none z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand-bg rounded-full flex items-center justify-center shadow-lg border-2 border-white text-brand-primary transition-transform group-hover:scale-110">
          <ArrowLeftRight className="w-5 h-5" />
        </div>
      </div>

      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest pointer-events-none">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-brand-bg text-brand-primary px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest pointer-events-none shadow-lg">
        After
      </div>
    </div>
  );
}
