"use client";

import { useEffect, useRef } from "react";
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

export function LandingHero() {
  return (
    <section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative bg-brand-bg-alt mb-5">
      <Floating sensitivity={-0.5} className="h-full">
        <FloatingElement
          depth={0.5}
          className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
        >
          <motion.div
            className="relative w-24 h-16 sm:w-32 sm:h-24 md:w-36 md:h-28 lg:w-48 lg:h-36 hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Image
              src={exampleImages[0].url}
              alt={exampleImages[0].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 30vw, 20vw"
              priority
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
        >
          <motion.div
            className="relative w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-52 lg:w-72 lg:h-56 hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Image
              src={exampleImages[1].url}
              alt={exampleImages[1].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 30vw"
              priority
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
        >
          <motion.div
            className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Image
              src={exampleImages[2].url}
              alt={exampleImages[2].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
        >
          <motion.div
            className="relative w-48 h-44 sm:w-60 sm:h-52 md:w-72 md:h-64 lg:w-80 lg:h-72 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Image
              src={exampleImages[3].url}
              alt={exampleImages[3].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
        >
          <motion.div
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl opacity-70 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Image
              src={exampleImages[4].url}
              alt={exampleImages[4].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
          </motion.div>
        </FloatingElement>
      </Floating>

      <div className="flex flex-col justify-center items-center w-[280px] sm:w-[400px] md:w-[600px] lg:w-[800px] font-black z-50 pointer-events-auto mt-32 md:mt-40">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-center w-full justify-center items-center flex-col flex leading-[0.9] font-black uppercase tracking-tight space-y-1 md:space-y-4 text-brand-secondary"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span className="mb-2">Premium Care</span>
          <span className="mb-4">For Your</span>
          <LayoutGroup>
            <motion.span layout className="flex text-3xl sm:text-5xl md:text-7xl lg:text-8xl">
              <TextRotate
                texts={[
                  "Vehicle",
                  "Luxury Car",
                  "SUV",
                ]}
                mainClassName="overflow-hidden px-2 text-white py-0 pb-2 md:pb-4"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-sm md:text-xl text-center text-brand-secondary/80 pt-4 sm:pt-8 md:pt-10 lg:pt-12 max-w-2xl font-sans"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          Brooklyn's most trusted auto detailing shop, located in the heart of Park Slope.
        </motion.p>

        <div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
          <motion.button
            className="sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-tight text-white bg-brand-primary px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl"
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
            <Link href="#services">
              View Services <span className="font-sans ml-1">→</span>
            </Link>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
