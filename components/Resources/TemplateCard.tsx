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
    <div className="bg-white rounded-[12px] w-full border border-[#E8E8E8] p-2 flex flex-col gap-4 group transition-all">
      <div className="relative aspect-[5/3] rounded-[8px] overflow-hidden bg-[#F6F3FF] px-4 flex justify-center items-center">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className=""
        />
      </div>
      
      <div className="flex justify-between items-end">
        <div className="space-y-2 px-2 flex-1">
          <h3 className="mori-semibold text-[16px] text-[#161A21]">{title}</h3>
          <p className="text-[#6A6D71] text-[13px] line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center gap-1 text-[#95969A] text-[14px]">
          <Image src="/coins-line.svg" alt="Coins" width={20} height={20} />
          <span className="text-[12px]">{tokenCost} Token</span>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full rounded-full h-[48px] border-[#E8E8E8] text-[#161A21] font-medium mt-auto mb-2"
        onClick={onViewDetail}
      >
        {actionLabel}
      </Button>
    </div>
  );
};

export default TemplateCard;
