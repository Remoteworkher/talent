"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Bell, Coins, Info } from "lucide-react";
import Image from "next/image";

interface ResourceDetailProps {
  title: string;
  type: string;
  image: string;
  tokenCost: number;
  tokensAvailable: number;
  onBack: () => void;
}

const ResourceDetail = ({
  title,
  type,
  image,
  tokenCost,
  tokensAvailable,
  onBack
}: ResourceDetailProps) => {
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#F0F0F0] bg-white">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="rounded-full h-[44px] px-5 border-[#E8E8E8] text-[#161A21] flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Go back
        </Button>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 relative">
            <Bell className="w-5 h-5 text-[#6A6D71]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E8E8E8]">
            <Image src="/avatar-placeholder.png" alt="User" width={40} height={40} />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content (Resource Preview) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-1">
            <h1 className="sora-semibold text-[28px] md:text-[32px] text-[#161A21]">{title}</h1>
            <p className="text-[#95969A] text-[16px]">{type}</p>
          </div>

          <div className="bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-10 shadow-sm min-h-[800px] flex justify-center">
            {/* Template Preview Content */}
            <div className="w-full max-w-[700px] h-full">
               <Image 
                 src={image} 
                 alt="Template Preview" 
                 width={700} 
                 height={1000} 
                 className="w-full h-auto rounded-lg shadow-inner border border-gray-50"
               />
            </div>
          </div>
        </div>

        {/* Sidebar (Purchase Component) */}
        <div className="lg:col-span-4">
          <div className="sticky top-10 space-y-6">
            <div className="bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-8 space-y-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="mori-semibold text-[20px] text-[#161A21]">Buy this template</h3>
                <p className="text-[#6A6D71] text-[15px]">{type}</p>
              </div>

              <div className="flex items-center justify-between py-4 border-y border-[#F0F0F0]">
                 <div className="flex items-center gap-2 text-[#322FEB] font-semibold text-[16px]">
                   <Coins className="w-5 h-5" />
                   <span>{tokenCost} Token</span>
                 </div>
                 <div className="text-[14px] text-[#95969A]">
                   You have {tokensAvailable} tokens available
                 </div>
              </div>

              <Button className="w-full h-[60px] rounded-full bg-[#322FEB] hover:bg-[#2826c8] text-white font-semibold text-[16px]">
                Buy now ({tokenCost} token)
              </Button>
            </div>

            {/* Optional info block if needed */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 flex gap-4 border border-[#F0F0F0]">
               <div className="text-[#322FEB] mt-1"><Info className="w-5 h-5" /></div>
               <p className="text-[#6A6D71] text-[14px] leading-relaxed">
                 Once purchased, this template will be available for download in your dashboard for lifetime access.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
