import Image from "next/image";
import React from "react";
import LoginCarousel from "@/components/Login/LoginCarousel";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white min-h-screen Selection:bg-[#322FEB]/10">
      <div className="container-fluid mx-auto h-screen">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
          {/* Left Column - Form */}
          <div className="bg-white p-2 flex flex-col justify-center items-center h-full px-4 lg:px-24 relative">
            <div className="absolute top-10 left-10">
              <Image
                src={`/logo.svg`}
                width={130}
                height={42}
                alt="logo"
                className="cursor-pointer"
              />
            </div>
            
            <section className="w-full max-w-[480px] space-y-3">
              <div className="space-y-2">
                <h2 className="sora-semibold text-[32px] md:text-[36px] text-[#161A21]">
                  Welcome back
                </h2>
                <p className="text-[#6A6D71] text-[16px]">
                  Sign in to your account to continue
                </p>
              </div>
              <div className="mt-8">{children}</div>
            </section>
          </div>

          {/* Right Column - Carousel */}
          <div className="hidden md:block h-full">
            <LoginCarousel />
          </div>
        </section>
      </div>
    </div>
  );
}
