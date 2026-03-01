import React from "react";
import Image from "next/image";

interface ToolFormWrapperProps {
  icon: string | React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const ToolFormWrapper: React.FC<ToolFormWrapperProps> = ({
  icon,
  title,
  description,
  children,
}) => {
  return (
    <div className="flex justify-center px-0 md:px-4 py-6">
      <div
        className="w-full max-w-[600px] bg-white border border-[#E8E8E8] rounded-[20px] p-4 sm:p-6 md:p-10"
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
        <div className="flex flex-col items-center text-center mb-7">
          <div className="w-12 h-12 rounded-[12px] bg-[#F6F3FF] flex items-center justify-center mb-4 text-[#322FEB]">
            {typeof icon === "string" ? (
              <Image src={icon} width={24} height={24} alt={title} />
            ) : (
              icon
            )}
          </div>
          <h1 className="sora-semibold text-[#161A21] text-[22px] md:text-[26px]">
            {title}
          </h1>
          <p className="text-[#6A6D71] text-[14px] mt-1.5 max-w-[380px]">
            {description}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ToolFormWrapper;
