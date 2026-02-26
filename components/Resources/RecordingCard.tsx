"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Calendar, Clock, Gift } from "lucide-react";
import Image from "next/image";

interface RecordingCardProps {
  title: string;
  description: string;
  duration: string;
  date: string;
  onWatch?: () => void;
}

const RecordingCard = ({
  title,
  description,
  duration,
  date,
  onWatch
}: RecordingCardProps) => {
  return (
    <div className="bg-white rounded-[16px] border border-[#E8E8E8] p-3 flex flex-col md:flex-row md:items-center gap-5 transition-all">
      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] rounded-[10px] bg-[#F6F3FF] flex-shrink-0 flex items-center justify-center text-[#322FEB]">
        <Image src="/gift-line-2.svg" alt="Gift" width={20} height={20} />
      </div>

      <div className="flex-1 space-y-3">
        <div className="space-y-1">
          <h3 className="mori-semibold text-[18px] text-[#161A21]">{title}</h3>
          <p className="text-[#6A6D71] text-[14px] line-clamp-1">{description}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-[#6A6D71] text-[13px]">
          <div className="flex items-center gap-1.5">
            <Image src="/time-line-2.svg" alt="Time" width={20} height={20} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Image src="/calendar-line.svg" alt="Calendar" width={20} height={20} />
            <span>{date}</span>
          </div>
        </div>
      </div>

      <Button 
        variant="outline"
        className="rounded-full px-6 border-[#E8E8E8] text-[#161A21] font-medium flex items-center gap-2"
        onClick={onWatch}
      >
        Watch
        <Image src="/external-link-line.svg" alt="External Link" width={20} height={20} />
      </Button>
    </div>
  );
};

export default RecordingCard;
