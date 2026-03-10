"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useUserData } from "@/hooks/userData";
import { WelcomeSkeleton } from "../reusables/Skeletons";

const Welcome = () => {
  const { data, isLoading } = useUserData();

  if (isLoading) {
    return <WelcomeSkeleton />;
  }

  return (
    <div className="p-5 rounded-[16px] flex flex-wrap justify-between items-center gap-3 bg-gradient-to-r from-[#F3F8FF] to-[#FFFFFF]">
      <div className="flex justify-start items-center gap-4 min-w-0">
        <div className="min-w-0">
          <div className="flex justify-start items-center gap-1 flex-wrap">
            <Image
              src={`/focus-icon.svg`}
              width={24}
              height={24}
              alt="focus"
              className="shrink-0"
            />
            <div className="mori-semibold text-[18px] sm:text-[24px] text-[#161A21]">
              Your 90-Day Career Plan
            </div>
          </div>
          <div className="text-[13px] sm:text-[14px] text-[#161A21]">
            A personalised roadmap to accelerate your career growth
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
