"use client";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePlans } from "@/hooks/usePlans";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

// --- PriceCard Reusable Component ---
type PriceCardProps = {
  plan: {
    uid: string;
    tag: string | null;
    name: string;
    price: string;
    tokens: string;
    currency: string;
    billing_period: string;
    features: string[];
  };
  onSelect: (planId: string) => void;
};

const PriceCard: React.FC<PriceCardProps> = ({ plan, onSelect }) => (
  <div
    className={`relative flex flex-col border ${
      plan.tag === "recommended"
        ? "border-4 border-[#322FEB]"
        : "border border-[#E8E8E8]"
    } px-4 py-10 rounded-[18px] h-full bg-white`}
    style={{ minHeight: 500 }}
  >
    {plan.tag === "recommended" && (
      <div className="flex -mt-14 items-center justify-center bg-[#322FEB] rounded-full w-[130px] mx-auto px-5 py-1 gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <div className="text-white text-[12px] font-semibold">Recommended</div>
      </div>
    )}
    <div className="flex flex-col justify-center items-center space-y-2">
      <div className="text-[#161A21] text-[18px] mori-semibold">
        {plan.name}
      </div>
      <div className="text-[#161A21] sora-semibold text-[32px]">
        ₦{parseInt(plan.price).toLocaleString()}{" "}
        <span className="text-[#6A6D71] text-[16px]">
          /{plan.billing_period}
        </span>
      </div>
      <div className="text-[#6A6D71] text-[16px] text-center">
        { plan.tokens} Token(s)/month
      </div>
    </div>
    <div className="pt-8 text-[#161A21] text-[16px] space-y-4 flex-1">
      {plan.features.map((feature, idx) => (
        <div key={idx} className="space-x-2 flex justify-start items-center">
          <Image src="/check-fill.svg" width={24} height={24} alt="check" />
          <div>{feature}</div>
        </div>
      ))}
    </div>
    <div className="absolute left-0 bottom-0 w-full px-4 pb-6">
      <Button className="w-full" onClick={() => onSelect(plan.uid)}>
        Select plan
      </Button>
    </div>
  </div>
);

// --- PricingTab Component ---
type Plan = {
  uid: string;
  tag: string | null;
  name: string;
  price: string;
  tokens: string;
  currency: string;
  billing_period: string;
  features: string[];
};

type PlansByPeriod = {
  monthly?: Plan[];
  quarterly?: Plan[];
  yearly?: Plan[];
};

const PricingTab = () => {
  const {
    data: plans,
    isLoading,
    isError,
    refetch,
  } = usePlans() as {
    data: PlansByPeriod;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
  };
  const setSelectedPlan = useAuthStore((state) => state.setSelectedPlanId);
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    router.push("/register");
  };

  const renderPlans = (period: "monthly" | "quarterly" | "yearly") => {
    if (!plans || !plans[period]) return null;
    return (
      <div className="flex flex-wrap justify-center gap-5">
        {plans[period].map((plan: Plan) => (
          <div key={plan.uid} className="w-full sm:w-[calc(50%-1.25rem)] md:w-[calc(33.333%-1.25rem)] max-w-[360px]">
            <PriceCard plan={plan} onSelect={handleSelectPlan} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <Tabs defaultValue="monthly" className="w-full max-w-[1140px] px-2">
        <TabsList className="flex justify-center items-center mx-auto w-fit flex-wrap gap-2">
          <TabsTrigger value="monthly" className="px-4 md:px-8">
            Monthly
          </TabsTrigger>
          <TabsTrigger value="quarterly" className="px-4 md:px-8">
            Quarterly
          </TabsTrigger>
          <TabsTrigger value="yearly" className="px-4 md:px-8">
            Yearly (Save 5%)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="pt-10">
          <section>{isLoading ? <Loader /> : renderPlans("monthly")}</section>
        </TabsContent>
        <TabsContent value="quarterly" className="pt-10">
          <section>{isLoading ? <Loader /> : renderPlans("quarterly")}</section>
        </TabsContent>
        <TabsContent value="yearly" className="pt-10">
          <section>{isLoading ? <Loader /> : renderPlans("yearly")}</section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingTab;
