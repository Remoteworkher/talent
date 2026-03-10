import React from "react";
import Image from "next/image";

interface TaskCardProps {
  icon?: string;
  iconAlt?: string;
  iconBg?: string;
  label: string;
  sublabel?: string;
}

const TaskCard = ({
  icon = "/thunder-outline.svg",
  iconAlt = "icon",
  iconBg = "#EFE9FE",
  label,
  sublabel,
}: TaskCardProps) => {
  return (
    <div
      className="p-5 border border-[#E9EAEB] rounded-[12px]"
      style={{
        boxShadow: "0px 1px 2px 0px var(--ColorsEffectsShadowsshadow-xs)",
      }}
    >
      <div className="flex justify-start items-center space-x-4">
        <div
          className="rounded-[8px] p-3 sm:p-4 border border-[#0A0D122E] shrink-0"
          style={{
            backgroundColor: iconBg,
            boxShadow:
              "0px 1px 2px 0px var(--ColorsEffectsShadowsshadow-xs), 0px -2px 0px 0px var(--ColorsEffectsShadowsshadow-skeumorphic-inner) inset, 0px 0px 0px 1px var(--ColorsEffectsShadowsshadow-skeumorphic-inner-border) inset",
          }}
        >
          <Image src={icon} width={24} height={24} alt={iconAlt} />
        </div>
        <div className="min-w-0">
          <div className="text-[#181D27] text-[16px] sm:text-[20px] mori-semibold truncate">
            {label}
          </div>
          {sublabel && (
            <div className="text-[#535862] text-[13px] sm:text-[14px] mori-semibold">
              {sublabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
