"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AccountTab from "@/components/Settings/AccountTab";
import PreferencesTab from "@/components/Settings/PreferencesTab";
import PlansTab from "@/components/Settings/PlansTab";
import BillingsTab from "@/components/Settings/BillingsTab";
import ReferralTab from "@/components/Settings/ReferralTab";

export default function SettingsPage() {
  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-8 space-y-8">
      {/* Header section shown in the screenshots */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="sora-semibold text-[28px] md:text-[32px] text-[#161A21]">Settings</h1>
          <p className="text-[#6A6D71] text-[16px]">Manage your preferences and configure various options.</p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="bg-transparent h-auto p-0 flex justify-start gap-8 border-b border-[#E8E8E8] rounded-none overflow-x-auto scrollbar-hide">
            {["Account", "Preferences", "Plans", "Billings", "Referral Program"].map((tab) => (
              <TabsTrigger
                key={tab.toLowerCase()}
                value={tab.toLowerCase()}
                className="px-0 py-4 data-[state=active]:border-b-[#322FEB] data-[state=active]:text-[#322FEB] text-[#6A6D71] transition-all text-[15px] font-medium h-auto rounded-none bg-transparent border-x-0"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-8">
            <TabsContent value="account">
              <AccountTab />
            </TabsContent>
            <TabsContent value="preferences">
              <PreferencesTab />
            </TabsContent>
            <TabsContent value="plans">
              <PlansTab />
            </TabsContent>
            <TabsContent value="billings">
              <BillingsTab />
            </TabsContent>
            <TabsContent value="referral program">
              <ReferralTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
