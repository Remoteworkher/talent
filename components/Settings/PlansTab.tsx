"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePlans, Plan } from "@/hooks/usePlans";
import { useUserData } from "@/hooks/userData";
import { Loader2 } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  isCurrent?: boolean;
}

const PlanCard = ({ 
  plan, 
  isCurrent, 
}: PlanCardProps) => {
  const isRecommended = plan.tag === "recommended";
  const buttonLabel = isCurrent ? "Current plan" : (plan.name.toLowerCase() === 'pro' ? "Go PRO" : "Select plan");
  
  return (
    <div className={`p-8 rounded-[24px] border ${isCurrent ? 'border-[#E8E8E8] bg-[#F9F9FB]' : 'border-[#E8E8E8] bg-white'} flex flex-col items-center text-center space-y-6 flex-1 relative`}>
      {isRecommended && !isCurrent && (
        <div className="absolute -top-3 px-4 py-1 bg-[#322FEB] text-white text-[12px] font-bold rounded-full">
          Recommended
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="sora-semibold text-[20px] text-[#161A21]">{plan.name}</h3>
        <div className="space-y-1">
          <div className="text-[32px] sora-semibold text-[#161A21]">
            ₦{parseInt(plan.price).toLocaleString()} <span className="text-[16px] text-[#6A6D71] font-normal">/mo</span>
          </div>
          <p className="text-[#6A6D71] text-[15px]">{plan.tokens} Tokens/month</p>
        </div>
      </div>

      <Button 
        className={`w-full h-[52px] rounded-full text-[15px] font-semibold ${
          isCurrent 
            ? 'bg-[#E8E8E8] text-[#95969A] cursor-not-allowed hover:bg-[#E8E8E8]' 
            : 'bg-[#322FEB] text-white hover:bg-[#2826c8]'
        }`}
        disabled={isCurrent}
      >
        {buttonLabel}
      </Button>

      <div className="w-full pt-4 space-y-4">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3 text-left">
            <Image src="/check-fill.svg" alt="check" width={18} height={18} className="mt-1 shrink-0 text-[#322FEB]" />
            <span className="text-[#161A21] text-[14px] leading-tight">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlansTab = () => {
  const { data: plansData, isLoading: plansLoading } = usePlans();
  const { data: userData, isLoading: userLoading } = useUserData();

  if (plansLoading || userLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  // Use monthly plans for this view as per design
  const monthlyPlans = plansData?.monthly || [];
  
  // Note: Assuming there's a way to identify current plan, 
  // currently using a placeholder logic (e.g. matching name if plan_uid not in user data)
  // For now, let's assume 'Standard' is the default current plan if none specified
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {monthlyPlans.map((plan) => (
          <PlanCard 
            key={plan.uid} 
            plan={plan} 
            isCurrent={userData?.plan_uid === plan.uid} 
          />
        ))}
        
        {/* Fallback if no plans are returned from API */}
        {monthlyPlans.length === 0 && (
          <div className="text-center w-full py-10 text-[#6A6D71]">
            No subscription plans available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansTab;
