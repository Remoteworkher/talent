import React from "react";

interface OverallProgressProps {
  progress?: number; // 0–100
}

const OverallProgress = ({ progress = 1 }: OverallProgressProps) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="border border-[#E8E8E8] p-5 rounded-[16px]">
      <div className="flex justify-between items-center mb-3">
        <div className="text-[14px] text-[#161A21] mori-semibold">
          Overall Progress
        </div>
        <div className="text-[#6A6D71] text-[12px]">{clamped}%</div>
      </div>
      <div className="w-full h-[6px] rounded-full bg-transparent relative">
        <div
          className="h-full rounded-full bg-[#5335E9] transition-all duration-500 relative"
          style={{ width: `${clamped}%` }}
        >
          {clamped > 0 && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-[#5335E9] border-[5px] border-white shadow-md" />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="text-[#6A6D71] text-[12px]">Day 1</div>
        <div className="text-[#6A6D71] hidden md:block text-[12px]">Day 30</div>
        <div className="text-[#6A6D71] hidden md:block text-[12px]">Day 60</div>
        <div className="text-[#6A6D71] text-[12px]">Day 90</div>
      </div>
    </div>
  );
};

export default OverallProgress;
