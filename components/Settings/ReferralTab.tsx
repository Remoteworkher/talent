"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Star, Users, Zap, Link2, Copy, User, Loader2 } from "lucide-react";
import Image from "next/image";
import { useReferrals } from "@/hooks/useReferrals";

const ReferralTab = () => {
  const { data, isLoading, isError } = useReferrals();
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load referral data. Please try again later.
      </div>
    );
  }

  const { referral_count, commission, referral_code, referrals } = data;
  const referralLink = `https://remoteworkher.com/register?ref=${referral_code}`;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="sora-semibold text-[24px] text-[#161A21]">Referral Program</h2>
        <p className="text-[#6A6D71] text-[14px]">Manage your preferences and configure various options.</p>
      </div>

      {/* Hero Banner */}
      <div className="p-4 rounded-[16px] bg-[#F6F3FF] border border-[#E0D7FF] flex items-center gap-4">
        <div className="w-12 h-12 rounded-[10px] bg-[#EFE9FE] flex items-center justify-center shrink-0">
          <Image src="/star-line.svg" alt="Star" width={24} height={24} />
        </div>
        <div className="space-y-0.5">
          <h3 className="mori-semibold text-[18px] text-[#322FEB]">Compass Referral</h3>
          <p className="text-[#161A21] text-[16px]">
            Get instant job alerts, career tips, and exclusive updates delivered straight to your phone
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-[16px] border border-[#E8E8E8] bg-white space-y-2">
          <Image src="/group-line.svg" alt="Group" width={24} height={24} />
          <div className="space-y-1">
            <div className="text-[24px] sora-semibold text-[#161A21]">{referral_count.toLocaleString()}</div>
            <p className="text-[#6A6D71] text-[14px]">Referrals</p>
          </div>
        </div>

        <div className="p-4 rounded-[16px] border border-[#E8E8E8] bg-white space-y-2">
          <Image src="/flashlight-line.svg" alt="Flashlight" width={24} height={24} />
          <div className="space-y-1">
            <div className="text-[24px] sora-semibold text-[#161A21]">₦{commission.toLocaleString()}</div>
            <p className="text-[#6A6D71] text-[14px]">Earned</p>
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="rounded-[16px] p-3 border border-[#E8E8E8] bg-white overflow-hidden">
        <div className="border-b border-[#E8E8E8]">
          <h4 className="mori-semibold text-[16px] text-[#161A21]">Referral Link</h4>
        </div>
        <div className="flex items-center py-3 justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F9F9FB] border border-[#E8E8E8] flex items-center justify-center">
              <Link2 className="w-5 h-5 text-[#6A6D71]" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[14px] font-semibold text-[#161A21]">Copy your referral link</p>
              <p className="text-[14px] text-[#6A6D71] break-all">{referralLink}</p>
            </div>
          </div>
          <Button variant="outline" className="h-[44px] px-6 rounded-xl border-[#E8E8E8] flex items-center gap-2 text-[#161A21] font-medium shrink-0">
            <Copy className="w-4 h-4" />
            Copy link
          </Button>
        </div>
      </div>

      {/* Earning History Section */}
      <div className="rounded-[16px] border border-[#E8E8E8] bg-white overflow-hidden">
        <div className="p-6 border-b border-[#E8E8E8]">
          <h4 className="mori-semibold text-[16px] text-[#161A21]">Earning History</h4>
        </div>
        <div className="divide-y divide-[#E8E8E8]">
          {referrals.length > 0 ? (
            referrals.map((item) => (
              <div key={item.uid} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F9F9FB] border border-[#E8E8E8] flex items-center justify-center">
                    <User className="w-5 h-5 text-[#6A6D71]" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[14px] font-semibold text-[#161A21]">{item.name}</p>
                    <p className="text-[13px] text-[#6A6D71]">Joined Compass via referral link</p>
                  </div>
                </div>
                {/* Assuming there might be a reward amount per entry, but the API doesn't specify it per user yet, using a placeholder or logic if available */}
                <div className="text-[14px] font-bold text-[#00A854]">
                  ₦{(commission / referral_count).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-[#6A6D71] text-[14px]">
              No referrals yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralTab;
