"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

interface TemplateCardProps {
  title: string;
  description: string;
  image: string;
  tokenCost: number;
  actionLabel: string;
  onViewDetail?: () => void;
}

const TemplateCard = ({ 
  title, 
  description, 
  image, 
  tokenCost, 
  actionLabel,
  onViewDetail 
}: TemplateCardProps) => {
  return (
    <div className="bg-white rounded-[16px] w-full border border-[#E8E8E8] pb-6 px-2 pt-2 flex flex-col gap-6 group transition-all">
      <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden bg-[#D8F8E8] flex justify-center items-center px-2 pt-2">
        <div className="relative w-full h-full">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="flex justify-between items-end px-1">
        <div className="space-y-2 flex-1">
          <h3 className="sora-semibold text-[16px] text-[#161A21] leading-tight">{title}</h3>
          <p className="text-[#6A6D71] text-[14px] leading-relaxed line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center gap-1.5 text-[#95969A] mt-1 shrink-0">
          <Image src="/coins-line.svg" alt="Coins" width={22} height={22} />
          <span className="text-[14px] font-medium">{tokenCost} Token</span>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full rounded-full border-[#E8E8E8] text-[#161A21] font-semibold mt-auto"
        onClick={onViewDetail}
      >
        {actionLabel}
      </Button>
    </div>
  );
};

export default TemplateCard;
