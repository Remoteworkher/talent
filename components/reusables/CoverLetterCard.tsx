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
  previewBg = "#FEF1E8",
  isSelected = false,
}) => {
  return (
    <div
      className={`bg-white border w-full md:w-[302px] p-3 rounded-[12px] relative cursor-pointer transition-all ${
        isSelected ? "border-[2px] border-[#322FEB]" : "border border-[#E8E8E8]"
      }`}
      style={{
        boxShadow: `
          0px 96px 96px -32px #3333330F,
          0px 48px 48px -24px #3333330A,
          0px 24px 24px -12px #3333330A,
          0px 12px 12px -6px #3333330A,
          0px 6px 6px -3px #3333330A,
          0px 3px 3px -1.5px #33333305,
          0px 1px 1px 0.5px #3333330A,
          0px 0px 0px 1px #3333330A,
          0px -1px 1px -0.5px #3333330F inset
        `,
      }}
    >
      {/* Radio selector */}
      <div className="absolute top-3 right-3 z-10">
        <RadioGroupItem value={value} id={`cl-${value}`} />
      </div>

      {/* Template preview pane */}
      <div
        className="rounded-[8px] h-[140px] md:h-[160px] w-full"
        style={{ backgroundColor: previewBg }}
      />

      {/* Info */}
      <div className="p-2 pt-3">
        <div className="text-[#161A21] text-[16px] mori-semibold">{title}</div>
        <div className="text-[#6A6D71] text-[14px] mt-0.5">{description}</div>
      </div>
    </div>
  );
};

export default CoverLetterCard;
