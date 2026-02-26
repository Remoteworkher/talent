import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import OnboardingFlow from "@/components/Onboarding/OnboardingFlow";

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar / Logo */}
      <header className="p-6 md:px-10">
        <Image src="/logo.svg" width={120} height={35} alt="logo" className="w-auto h-8" />
      </header>

      <main className="max-w-[1000px] mx-auto pt-4 md:pt-10 pb-20 px-4">
        {/* User Icon Container */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#F6F3FF] flex items-center justify-center">
            <Image
              src="/user.svg"
              width={24}
              height={24}
              alt="user"
              className="opacity-70"
            />
          </div>
        </div>

        <section>
          <OnboardingFlow />
        </section>
      </main>
    </div>
  );
};

export default page;
