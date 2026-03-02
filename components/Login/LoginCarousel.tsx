"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/a.png",
    quote: "“Your career doesn’t grow by chance. It grows when you decide where you’re going and build toward it daily”",
    author: "",
    role: "Compass",
    company: ""
  },
  {
    image: "/1.png",
    quote: "Skills create opportunities. Consistency turns them into results",
    author: "",
    role: "Compass",
    company: ""
  },
  {
    image: "/2.png",
    quote: "No one can outwork a focused professional who understands their direction.",
    author: "",
    role: "Compass",
    company: ""
  },
  {
    image: "/3.png",
    quote: "Your next level requires a stronger version of you. Upgrade your skills first.",
    author: "",
    role: "Compass",
    company: ""
  }
];

const LoginCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000); // 8 seconds for slower, premium feel
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden hidden rounded-l-[80px] md:block group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative h-full rounded-l-[80px] w-full"
        >
          <div className="absolute inset-0 rounded-l-[80px]">
            <Image
              src={slides[current].image}
              alt="Slide background"
              fill
              className="object-cover rounded-l-[80px]"
              priority
            />
            {/* Multi-stage gradient for text legibility without muddying the whole image */}
            <div className="absolute rounded-l-[80px] inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute rounded-l-[80px] inset-0 bg-black/10" />
          </div>

          <div className="absolute bottom-16 left-16 right-16 z-10 text-white space-y-1">
            <motion.blockquote 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[36px] leading-[1.15] max-w-[90%]"
            >
              “{slides[current].quote}”
            </motion.blockquote>
            
            <div className="flex justify-between items-end">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-1"
              >
                <p className="text-[16px] text-white/90 font-medium">{slides[current].role}</p>
                <p className="text-[14px] text-white/70">{slides[current].company}</p>
              </motion.div>

              <div className="flex gap-4 mb-2">
                <button
                  onClick={prevSlide}
                  className="w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 group/btn"
                >
                  <ChevronLeft className="w-7 h-7 text-white transition-transform group-hover/btn:-translate-x-0.5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 group/btn"
                >
                  <ChevronRight className="w-7 h-7 text-white transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginCarousel;
