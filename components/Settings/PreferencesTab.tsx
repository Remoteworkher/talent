"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

const PreferenceItem = ({ title, onClick }: { title: string; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between py-6 border-b border-[#F0F0F0] cursor-pointer transition-all px-2 rounded-xl group hover:bg-gray-50/50"
  >
    <div className="space-y-1">
      <h4 className="mori-semibold text-[14px] text-[#161A21] group-hover:text-[#322FEB] transition-colors">{title}</h4>
      <p className="text-[#6A6D71] text-[14px]">Manage your preferences and configure various options.</p>
    </div>
    <ChevronRight className="w-5 h-5 text-[#95969A] group-hover:text-[#322FEB] group-hover:translate-x-1 transition-all" />
  </div>
);

const PreferencesTab = () => {
  const router = useRouter();

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <PreferenceItem 
          title="Onboarding Questions" 
          onClick={() => router.push("/settings/onboarding")} 
        />
        {/* <PreferenceItem title="Event Preferences" /> */}
        <PreferenceItem title="Notifications" />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" className="h-[48px] px-8 rounded-xl border-[#E8E8E8] text-[#161A21] font-semibold">
          Discard
        </Button>
        <Button className="h-[48px] px-8 rounded-xl bg-[#F0F0F0] text-[#95969A] font-semibold cursor-not-allowed">
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default PreferencesTab;
