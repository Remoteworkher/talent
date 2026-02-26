"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const SalaryCTA = () => {
  return (
    <div className="w-full bg-[#F6F3FF] border border-[#C3BCFC] rounded-[16px] p-3 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#322FEB] opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="space-y-3 z-10">
        <h2 className="sora-semibold text-[18px] md:text-[18px] text-[#161A21]">
          Know your worth with real salary data
        </h2>
        <p className="text-[#151268] text-[13px] md:text-[14px] leading-relaxed">
          Compare your salary across roles, experience levels, and locations using real market data to better understand your true value and earning potential.
        </p>
      </div>

      <Button className="rounded-full h-[56px] px-8 bg-[#322FEB] hover:bg-[#2826c8] text-white font-medium z-10 whitespace-nowrap">
        Get salary insight
      </Button>
    </div>
  );
};

export default SalaryCTA;
