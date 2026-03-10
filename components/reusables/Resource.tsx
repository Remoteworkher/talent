import React from "react";
import Image from "next/image";
import { ResourceItem } from "@/hooks/useResources";

interface ResourceProps {
  resource: ResourceItem;
}

const Resource = ({ resource }: ResourceProps) => {
  return (
    <div className="p-3 border border-[#E8E8E8] rounded-[16px] space-y-3 cursor-pointer hover:border-[#322FEB] transition-all bg-white">
      <div className="flex justify-start items-center gap-4">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#F6F3FF] flex justify-center items-center shrink-0">
          <Image src="/gift-line-grey.svg" alt="gift" width={24} height={24} />
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="text-[16px] mori-semibold text-[#161A21] leading-tight">
            {resource.name}
          </h3>
          <p className="text-[14px] text-[#6A6D71] line-clamp-2">
            {resource.description}
          </p>
          <div className="flex justify-start items-center space-x-2 pt-1">
            <Image src="/coins-line.svg" alt="coins" width={16} height={16} />
            <p className="text-[14px] mori-semibold text-[#AAABAE]">
              {resource.tokens} {resource.tokens === 1 ? "credit" : "credits"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
