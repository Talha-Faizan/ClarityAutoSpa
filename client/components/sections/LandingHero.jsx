"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { TextRotate } from "@/components/animations/TextRotate";
import Floating, { FloatingElement } from "@/components/animations/ParallaxFloating";

const exampleImages = [
  {
    url: "/hero/car.jpg",
    title: "Luxury car detailing",
  },
  {
    url: "/hero/wash.jpg",
    title: "Exterior detailing",
  },
  {
    url: "/hero/paint.jpg",
    title: "Paint correction",
  },
  {
    url: "/hero/interior.jpg",
    title: "Interior detailing",
  },
  {
    url: "/hero/car1.jpg",
    title: "Premium finish",
  },
];

export function LandingHero({ settings }) {
  const rating = settings?.rating || 4.6;
  const reviewsCount = settings?.reviewCount || 133;
  const googleUrl = settings?.googleReviewsUrl || "#";

  const [heroImages, setHeroImages] = useState(exampleImages);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`);
        if (res.ok) {
          const data = await res.json();
          const landingImages = data
            .filter(img => img.showOnLandingPage)
            .map(img => ({
              url: img.imageUrl || img.afterImageUrl,
              title: img.title || "Clarity Auto Spa",
            }))
            .filter(img => img.url);
          
          if (landingImages.length > 0) {
            const finalImages = [...exampleImages];
            for (let i = 0; i < Math.min(landingImages.length, 5); i++) {
              finalImages[i] = landingImages[i];
            }
            setHeroImages(finalImages);
          }
        }
      } catch (error) {
        console.error("Failed to fetch landing hero images:", error);
      }
    }
    fetchImages();
  }, []);

  return (
    <section className="w-full h-screen overflow-hidden flex flex-col items-center justify-center relative bg-cream-alt mb-5">
      <Floating sensitivity={-0.5} className="h-full">
        <FloatingElement
          depth={0.5}
          className="top-[10%] left-[-5%] sm:top-[12%] sm:left-[2%] md:top-[15%] md:left-[2%] lg:top-[20%] lg:left-[4%]"
        >
          <motion.div
            className="relative w-20 h-14 sm:w-28 sm:h-20 md:w-32 md:h-24 lg:w-48 lg:h-36 hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Image
              src={heroImages[0].url}
              alt={heroImages[0].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 30vw, 20vw"
              priority
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[-5%] left-[10%] sm:top-[2%] sm:left-[5%] md:top-[5%] md:left-[0%] lg:top-[8%] lg:left-[-5%] xl:left-[2%]"
        >
          <motion.div
            className="relative w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-72 lg:h-56 hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Image
              src={heroImages[1].url}
              alt={heroImages[1].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 30vw"
              priority
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[85%] left-[-5%] sm:top-[80%] sm:left-[-2%] md:top-[75%] md:left-[-15%] lg:top-[75%] lg:left-[-15%] xl:left-[-5%]"
        >
          <motion.div
            className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Image
              src={heroImages[2].url}
              alt={heroImages[2].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[-2%] left-[75%] sm:top-[0%] sm:left-[80%] md:top-[2%] md:left-[85%] lg:top-[5%] lg:left-[90%] xl:left-[85%]"
        >
          <motion.div
            className="relative w-40 h-36 sm:w-52 sm:h-48 md:w-64 md:h-56 lg:w-80 lg:h-72 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Image
              src={heroImages[3].url}
              alt={heroImages[3].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[75%] left-[65%] sm:top-[70%] sm:left-[75%] md:top-[68%] md:left-[85%] lg:top-[65%] lg:left-[88%] xl:left-[80%]"
        >
          <motion.div
            className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Image
              src={heroImages[4].url}
              alt={heroImages[4].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
          </motion.div>
        </FloatingElement>
      </Floating>

      <div className="flex flex-col justify-center items-center w-full px-4 max-w-[90vw] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[850px] font-semibold z-50 pointer-events-auto mt-5 md:mt-20 lg:mt-32">
        
        <motion.div
          className="flex items-center gap-2 bg-cream border border-grey px-4 py-2 rounded-full mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center text-gold">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="text-charcoal text-sm font-medium hover:text-gold transition-colors">
            {rating} Google Rating
          </a>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center w-full justify-center items-center flex-col flex leading-[1.1] font-semibold uppercase tracking-tight space-y-1 md:space-y-4 text-charcoal"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span className="mb-2">Premium Auto Detailing</span>
          <span className="mb-4">& Specialty Vehicle Cleaning</span>
          <span className="text-2xl sm:text-3xl md:text-4xl">in Park Slope, Brooklyn.</span>
        </motion.h1>
        <motion.div
          className="relative px-6 py-4 rounded-2xl bg-cream/40 backdrop-blur-md shadow-sm border border-cream/20 mt-6 sm:mt-8 md:mt-10 lg:mt-12"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          <p className="text-xs md:text-sm text-center text-charcoal max-w-2xl font-sans leading-relaxed">
            Welcome to Clarity Auto Spa! We are a dedicated team of detailing professionals in Park Slope, Brooklyn. We combine expert care, meticulous attention to detail, and a passion for perfection to deliver an unmatched auto spa experience. Thank you for trusting us with your vehicle.
          </p>
        </motion.div>

        <div className="hidden md:flex flex-row justify-center space-x-4 items-center mt-12 text-xs">
          <motion.button
            className="sm:text-base md:text-lg font-semibold uppercase tracking-tight text-charcoal bg-gold px-6 py-3 md:px-8 md:py-4 rounded-full z-20 shadow-xl w-full sm:w-auto hover:bg-gold-hover transition-colors"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href="/getquote">
              Book an Appointment
            </Link>
          </motion.button>
          
          <motion.button
            className="sm:text-base md:text-lg font-semibold uppercase tracking-tight text-charcoal bg-transparent px-6 py-3 md:px-8 md:py-4 rounded-full z-20 border-[1.5px] border-charcoal w-full sm:w-auto hover:bg-charcoal hover:text-cream transition-colors"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.8,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <a href="/services">
              Our Services
            </a>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
