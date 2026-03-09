"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Bell, Coins, Info } from "lucide-react";
import Image from "next/image";

import { useBuyResource, useDownloadResource, useResourceDetail } from "@/hooks/useResources";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ResourceDetailSkeleton } from "@/components/reusables/Skeletons";

interface ResourceDetailProps {
  title: string;
  type: string;
  image: string;
  tokenCost: number;
  tokensAvailable: number;
  onBack: () => void;
  uid: string;
}

const ResourceDetail = ({
  title,
  type,
  image,
  tokenCost,
  tokensAvailable,
  onBack,
  uid
}: ResourceDetailProps) => {
  const { data: resource, isLoading: isDetailLoading } = useResourceDetail(uid);
  const { mutate: buy, isPending: isBuying } = useBuyResource();
  const { mutate: download, isPending: isDownloading } = useDownloadResource();

  const handleBuy = () => {
    if (tokensAvailable < tokenCost) {
      toast.error("You don't have enough tokens.");
      return;
    }

    buy(uid, {
      onSuccess: () => {
        toast.success("Resource purchased! Starting download...");
        download(uid, {
          onSuccess: () => toast.success("Download started!"),
          onError: () => toast.error("Purchase succeeded but download failed. Try downloading again.")
        });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Purchase failed.");
      }
    });
  };

  const handleDownload = () => {
    download(uid, {
      onSuccess: () => toast.success("Starting download..."),
      onError: () => toast.error("Download failed. Please try again.")
    });
  };

  const isPurchased = resource?.purchased;

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-[1440px] mx-auto p-6 lg:p-6">
      {/* Top Header */}
<div className="space-y-1">
            <h1 className="sora-semibold text-[20px] md:text-[24px] text-[#161A21]">{title}</h1>
            <p className="text-[#95969A] text-[14px]">{type}</p>
          </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content (Resource Preview) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-[#E8E8E8] p-6 md:p-10 min-h-[800px] flex justify-center items-start">
            {isDetailLoading ? (
               <ResourceDetailSkeleton />
            ) : (
              <div className="w-full max-w-[700px]">
                 <Image 
                   src={image} 
                   alt="Template Preview" 
                   width={700} 
                   height={1000} 
                   className="w-full h-auto"
                 />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Purchase Component) */}
        <div className="lg:col-span-4">
          <div className="sticky top-10 space-y-6">
            <div className="bg-white border border-[#E8E8E8] rounded-[12px] p-3 md:p-4 space-y-6">
              <div className="">
                <h3 className="mori-semibold text-[18px] text-[#161A21]">
                  {isPurchased ? "Download resource" : "Buy this template"}
                </h3>
                <p className="text-[#6A6D71] text-[14px]">{type}</p>
              </div>

              {!isPurchased && (
                <div className="flex items-center justify-start space-x-3">
                   <div className="flex items-center gap-2 text-[#322FEB] font-semibold text-[14px]">
                     <Image src="/coins-line-colored.svg" alt="Coins" width={20} height={20} />
                     <span>{tokenCost} Token</span>
                   </div>
                   <div className="text-[14px] text-[#95969A] border-l-2 border-[#E8E8E8] pl-3">
                     You have {tokensAvailable} tokens available
                   </div>
                </div>
              )}

              {isPurchased ? (
                <Button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full rounded-full bg-[#322FEB] hover:bg-[#2826c8] text-white font-semibold flex items-center justify-center gap-2"
                >
                  {isDownloading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isDownloading ? "Downloading..." : "Download now"}
                </Button>
              ) : (
                <Button 
                  onClick={handleBuy}
                  disabled={isBuying || tokensAvailable < tokenCost}
                  className="w-full rounded-full bg-[#322FEB] hover:bg-[#2826c8] text-white font-semibold flex items-center justify-center gap-2"
                >
                  {isBuying && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isBuying ? "Purchasing..." : `Buy now (${tokenCost} token)`}
                </Button>
              )}

              {!isPurchased && tokensAvailable < tokenCost && (
                <p className="text-[13px] text-[#E16614] text-center">
                  You need {tokenCost - tokensAvailable} more token(s) to purchase this resource.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
