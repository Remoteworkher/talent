"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import Image from "next/image";

interface GuideCardProps {
  title: string;
  description: string;
  tokenCost: number;
  buttonLabel: string;
  meta?: string;
  onAction?: () => void;
}

const GuideCard = ({
  title,
  description,
  tokenCost,
  buttonLabel,
  meta,
  onAction
}: GuideCardProps) => {
  return (
    <div className="bg-white rounded-[16px] border border-[#E8E8E8] p-3 flex flex-col gap-5 transition-all">
      <div className="w-12 h-12 rounded-[16px] bg-[#F6F3FF] flex items-center justify-center text-[#322FEB]">
        <Image src="/gift-line-2.svg" alt="Gift" width={24} height={24} />
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-2 flex-1">
        <h3 className="mori-semibold text-[16px] text-[#161A21]">{title}</h3>
        {meta && <p className="text-[#322FEB] text-[14px] font-medium">{meta}</p>}
        <p className="text-[#6A6D71] text-[14px] leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-1 text-[#95969A] text-[14px]">
        <Image src="/coins-line.svg" alt="Coins" width={20} height={20} />
        <span>{tokenCost} Token</span>
      </div>
      </div>

      <Button 
        className="w-full rounded-full h-[52px] bg-[#322FEB] hover:bg-[#2826c8] text-white font-medium"
        onClick={onAction}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default GuideCard;
