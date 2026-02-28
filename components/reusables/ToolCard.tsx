import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ToolCardProps {
  name: string;
  description: string;
  icon: string;
  bgColor?: string;
  url?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  name,
  description,
  icon,
  bgColor = "#F7F0FC",
  url = "#",
}) => {
  return (
    <div className="border w-full border-[#E8E8E8] rounded-[16px] p-4 space-y-3">
      <div className="flex">
        <div
          className="p-2 rounded-[10px]"
          style={{ backgroundColor: bgColor }}
        >
          <Image src={icon} width={24} height={24} alt={`${name} icon`} />
        </div>
      </div>
      <div>
        <div className="mori-semibold text-[#161A21] text-[16px]">{name}</div>
        <div className="text-[14px] text-[#6A6D71]">{description}</div>
      </div>
      <Button className="w-full h-[42px]" variant="outline" asChild>
        <a href={url}>
          Open
          <span className="ml-2">
            <Image
              src="/arrow-right-w.svg"
              width={20}
              height={20}
              alt="right arrow"
            />
          </span>
        </a>
      </Button>
    </div>
  );
};

export default ToolCard;
