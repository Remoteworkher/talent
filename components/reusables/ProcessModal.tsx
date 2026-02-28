import Image from "next/image";
import React from "react";

interface ProcessModalProps {
  onClose?: () => void;
  title?: string;
  description?: string;
}

const ProcessModal: React.FC<ProcessModalProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3 pt-2">
      <div className="animate-spin">
        <Image src={`/loader.svg`} width={40.52} height={40.52} alt="loader" />
      </div>
      <div className="text-[#161A21] mori-semibold text-[18px] text-center w-[85%] mx-auto">
        {title || "Generating Content"}
      </div>
      <div className="text-[#6A6D71] text-[14px] text-center w-[85%] mx-auto">
        {description || "AI is generating your content, this might take some time."}
      </div>
    </div>
  );
};

export default ProcessModal;
