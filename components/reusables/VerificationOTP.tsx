"use client";

import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerificationOTPProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const VerificationOTP = ({ value, onChange, maxLength = 6 }: VerificationOTPProps) => {
  return (
    <InputOTP
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      containerClassName="justify-center"
    >
      <InputOTPGroup className="gap-4">
        {Array.from({ length: maxLength }).map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className="w-[80px] h-[50px] md:w-[117px] md:h-[64px] text-[24px] sora-semibold border-[#E8E8E8] rounded-[20px] bg-white transition-all focus-within:border-[#322FEB] focus-within:ring-1 focus-within:ring-[#322FEB]"
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

export default VerificationOTP;
