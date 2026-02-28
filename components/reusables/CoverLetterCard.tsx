"use client";
import React from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface CoverLetterCardProps {
  title: string;
  description: string;
  value: string;
  previewBg?: string; // background colour of the preview pane
  isSelected?: boolean;
}

const CoverLetterCard: React.FC<CoverLetterCardProps> = ({
  title,
  description,
  value,
  previewBg = "#FFF5EE",
  isSelected = false,
}) => {
  return (
    <div
      className={`bg-white border w-full p-4 rounded-[16px] relative cursor-pointer transition-all duration-300 ${
        isSelected ? "ring-2 ring-[#322FEB] border-transparent" : "border-[#E8E8E8] hover:border-[#322FEB]/50"
      }`}
      style={{
        boxShadow: isSelected ? "0px 16px 32px -12px #322FEB1A" : "0px 1px 2px 0px #0A0D1408",
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10">
          <div className="w-5 h-5 rounded-full border-2 border-[#322FEB] flex items-center justify-center bg-white">
             <div className="w-2.5 h-2.5 rounded-full bg-[#322FEB]" />
          </div>
        </div>
      )}

      {/* Template preview pane */}
      <div
        className="rounded-[12px] h-[160px] w-full mb-4"
        style={{ backgroundColor: previewBg }}
      />

      {/* Info */}
      <div className="space-y-1">
        <div className="text-[#161A21] text-[16px] font-bold">{title}</div>
        <div className="text-[#6A6D71] text-[13px] leading-relaxed">{description}</div>
      </div>
    </div>
  );
};

export default CoverLetterCard;
