import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ToolResultCardProps {
  label: string;
  content: string;
}

const ToolResultCard: React.FC<ToolResultCardProps> = ({ label, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-[12px] p-5 space-y-3 relative group transition-all shadow-[0px_16px_32px_-12px_#0E121B1A]">
      <div className="flex items-center gap-2 text-[#5335E9] mori-semibold text-[16px]">
        <Image src="/sparkling-line-2.svg" width={20} height={20} alt="sparkle" />
        {label}
      </div>
      <p className="text-[#161A21] text-[16px] md:text-[18px] leading-relaxed pr-8">
        {content}
      </p>
      <button
        onClick={handleCopy}
        className="absolute bottom-4 right-4 p-2 text-[#6A6D71] hover:text-[#322FEB] transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Image src="/file-copy-line-2.svg" width={20} height={20} alt="copy" />
        )}
      </button>
    </div>
  );
};

export default ToolResultCard;
