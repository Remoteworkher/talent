import Image from "next/image";
import React, { useState } from "react";
import TrackBar from "./TrackBar";
import { Button } from "../ui/button";
import { useUserData } from "@/hooks/userData";
import { useTokens } from "@/hooks/useTokens";
import GetTokensDialog from "./GetTokensDialog";

const TokensCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: userData } = useUserData();
  const { subscriptionPlans } = useTokens();
  const plans = subscriptionPlans.data;

  const currentTokens = userData?.tokens ?? 0;
  
  // Find the plan that matches the user's current plan_uid
  const allPlans = [
    ...(plans?.monthly || []),
    ...(plans?.quarterly || []),
    ...(plans?.yearly || []),
  ] as any[];
  const userPlan = allPlans.find((p: any) => p.uid === userData?.plan_uid);
  
  const planTokens = userPlan ? parseInt(userPlan.tokens) : 150;
  const maxTokens = Math.max(planTokens, currentTokens);
  const progress = (currentTokens / maxTokens) * 100;

  return (
    <>
      <div className="bg-[#F6F3FF] border border-[#C3BCFC] p-4 rounded-[16px] md:flex md:justify-between md:items-center space-y-3 md:space-y-0 gap-4 w-full">
        <div className="flex">
          <div className="p-3 rounded-[10px] bg-[#EFE9FE]">
            <Image
              src={`/token-icon.svg`}
              width={24}
              height={24}
              alt="token card"
            />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex justify-start items-center gap-2">
            <div className="sora-semibold text-[#161A21] text-[24px]">
              {currentTokens}/{maxTokens}
            </div>
            <div className="text-[14px] text-[#151268]">AI Tokens</div>
          </div>
            <TrackBar progress={progress} />
        </div>
        <Button 
          className="w-full md:w-[125px]"
          onClick={() => setIsDialogOpen(true)}
        >
          <span className="">
            <Image src="/plus.svg" width={20} height={20} alt="plus icon" />
          </span>
          Get Tokens
        </Button>
      </div>

      <GetTokensDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
};

export default TokensCard;
