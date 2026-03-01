"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

const features = [
  "Match you with relevant jobs",
  "Create your career roadmap",
  "Recommend the right courses",
  "Generate daily tasks to make you succeed",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Page = () => {
  const router = useRouter();

  return (
    <div className="px-4">
      <div className="flex justify-between items-center border-b border-[#E8E8E8] pb-6">
        <Image src={`/logo.svg`} width={101} height={32.15} alt="logo" />
      </div>

      <section className="w-full max-w-[500px] mx-auto pt-16 md:pt-24">
        {/* Header Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center"
        >
          <Image
            src={`/celebrate.svg`}
            width={54}
            height={78}
            alt="celebrate"
          />
        </motion.div>

        {/* Text Content */}
        <div className="sora-semibold text-[22px] md:text-[32px] leading-[32px] md:leading-[40px] pt-8 text-[#161A21] text-center">
          Welcome to Compass!
        </div>
        <div className="text-center text-[#6A6D71] text-[15px] md:text-[16px] mt-2">
          Hey Adeife! 🎉 Let’s personalize your experience.
        </div>

        {/* Feature Box */}
        <div className="rounded-[8px] bg-[#F7F7F7] p-4 mt-8">
          <div className="text-[#161A21] text-[16px] mori-semibold mb-3">
            Tell us about yourself so we can:
          </div>

          {/* Animated List */}
          <motion.div
            className="space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((text) => (
              <motion.div
                key={text}
                variants={itemVariants}
                className="flex justify-start items-center gap-2"
              >
                <Image
                  src={`/box-check.svg`}
                  width={24}
                  height={24}
                  alt="box check"
                />
                <div className="text-[#161A21] text-[15px] md:text-[16px]">
                  {text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="text-center text-[#6A6D71] text-[13px] md:text-[14px] mt-6">
          This takes 3-5 minutes
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center pt-8">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.push("/")}
          >
            Go to Dashboard
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Page;
