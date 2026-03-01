"use client";

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserData } from "@/hooks/userData";
import { useTokens } from "@/hooks/useTokens";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface GetTokensDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GetTokensDialog: React.FC<GetTokensDialogProps> = ({ open, onOpenChange }) => {
  const { data: userData } = useUserData();
  const queryClient = useQueryClient();
  const { 
    tokenPlans, 
    subscriptionPlans, 
    buyTokensMutation,
    verifyTokenMutation,
    isLoading: isTokensLoading 
  } = useTokens();
  const plans = subscriptionPlans.data;
  const isLoadingTokenPlans = isTokensLoading;
  const [selectedOption, setSelectedOption] = useState("upgrade");
  const [selectedTokenPlanUid, setSelectedTokenPlanUid] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Verify payment using the stored reference
  const verifyPayment = useCallback(async (reference: string) => {
    setIsVerifying(true);
    const toastId = toast.loading("Verifying your payment...");
    try {
      await verifyTokenMutation.mutateAsync(reference);
      toast.success("Payment verified! Your tokens have been updated.", { id: toastId });
      // Refresh user data to reflect new token balance
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      onOpenChange(false);
    } catch (error: any) {
      console.error("Payment verification failed:", error);
      toast.error(
        error?.response?.data?.message || "Verification failed. Please contact support.",
        { id: toastId }
      );
    } finally {
      setIsVerifying(false);
    }
  }, [verifyTokenMutation, queryClient, onOpenChange]);

  // Load Paystack v2 inline script
  const loadPaystackScript = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if ((window as any).PaystackPop) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v2/inline.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Paystack"));
      document.head.appendChild(script);
    });
  }, []);

  // Handle the buy button click
  const handleBuy = () => {
    const uidToUse = selectedOption === "topup" ? selectedTokenPlanUid : nextPlan?.uid;
    
    if (!uidToUse) {
      toast.error(selectedOption === "topup" ? "Please select a token plan" : "No upgrade plan available.");
      return;
    }

    buyTokensMutation.mutate(uidToUse, {
      onSuccess: async (data: any) => {
        if (data.access_code) {
          try {
            await loadPaystackScript();

            const popup = new (window as any).PaystackPop();
            onOpenChange(false);
            popup.resumeTransaction(data.access_code, {
              onSuccess: (transaction: any) => {
                // Payment completed — verify with reference
                const ref = transaction.reference || data.reference;
                if (ref) {
                  verifyPayment(ref);
                }
              },
              onCancel: () => {
                toast.info("Payment was cancelled.");
              },
              onError: (error: any) => {
                console.error("Paystack error:", error);
                toast.error("Payment failed. Please try again.");
              },
            });
          } catch (err) {
            console.error("Failed to load Paystack:", err);
            // Fallback to redirect if script fails
            if (data.authorization_url) {
              window.location.href = data.authorization_url;
            }
          }
        } else if (data.authorization_url) {
          window.location.href = data.authorization_url;
        } else {
          toast.error("Failed to initiate payment. Please try again.");
        }
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  // Determine current and next plan for "Upgrade" section
  const allMonthlyPlans = (plans?.monthly || []) as any[];
  const currentPlan = allMonthlyPlans.find((p: any) => p.uid === userData?.plan_uid) || allMonthlyPlans[0];
  const nextPlan = allMonthlyPlans.find((p: any) => parseInt(p.tokens) > parseInt(currentPlan?.tokens || "0")) || allMonthlyPlans[1];

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(typeof amount === "string" ? parseInt(amount) : amount);
  };

  const isBusy = buyTokensMutation.isPending || isVerifying;

  return (
    <Dialog open={open} onOpenChange={isBusy ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none rounded-[24px]">
        <div className="p-6 md:p-4 space-y-6">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-[18px] mori-semibold text-[#161A21]">Get AI Tokens</DialogTitle>
            <DialogDescription className="text-[14px] text-[#6A6D71] leading-relaxed">
              <span>Choose a token package to continue using AI career tools.</span>
              <br />
              <span>Payment powered by Paystack.</span>
            </DialogDescription>
          </DialogHeader>

          <RadioGroup 
            value={selectedOption} 
            onValueChange={setSelectedOption}
            className="space-y-4"
          >
            {/* Upgrade Plan Option */}
            <div 
              className={`relative rounded-2xl border-2 p-5 transition-all cursor-pointer ${
                selectedOption === "upgrade" 
                  ? "border-[#322FEB]" 
                  : "border-[#E8E8E8] bg-white hover:border-[#322FEB40]"
              }`}
              onClick={() => setSelectedOption("upgrade")}
            >
              <div className="flex justify-between items-start mb-4">
                <Label className="text-[14px] text-[#161A21] cursor-pointer">Upgrade your plan</Label>
                <RadioGroupItem value="upgrade" id="upgrade" className="border-[#322FEB] text-[#322FEB]" />
              </div>
              
              <div className="space-y-4 text-[14px]">
                <div className="flex justify-between text-[#6A6D71]">
                  <span>Current Plan</span>
                  <span className="text-[#161A21] font-medium">
                    {currentPlan?.tokens} Tokens/mo • {formatCurrency(currentPlan?.price || 0)}/mo
                  </span>
                </div>
                <div className="flex justify-between text-[#6A6D71]">
                  <span>Upgrade To</span>
                  <span className="text-[#161A21] font-medium">
                    {nextPlan?.tokens} Tokens/mo • {formatCurrency(nextPlan?.price || 0)}/mo
                  </span>
                </div>
                
                <div className="pt-4 border-t border-[#E8E8E8] flex justify-between items-end">
                   <div className="space-y-1">
                      <p className="text-[12px] text-[#6A6D71]">Next billing date</p>
                      <p className="text-[#161A21] font-medium">Feb 14, 2025</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[12px] text-[#6A6D71]">Amount Due</p>
                      <p className="text-[28px] sora-bold text-[#161A21]">
                        {formatCurrency(parseInt(nextPlan?.price || "0") - parseInt(currentPlan?.price || "0"))}
                      </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Top Up Option */}
            <div 
              className={`relative rounded-2xl border-2 p-5 transition-all cursor-pointer ${
                selectedOption === "topup" 
                  ? "border-[#322FEB]" 
                  : "border-[#E8E8E8] bg-white hover:border-[#322FEB40]"
              }`}
              onClick={() => setSelectedOption("topup")}
            >
              <div className="flex justify-between items-start mb-2">
                <Label className="text-[14px] text-[#161A21] cursor-pointer">Top up</Label>
                <RadioGroupItem value="topup" id="topup" className="border-[#322FEB] text-[#322FEB]" />
              </div>
              <p className="text-[12px] text-[#6A6D71] mb-6">Buy tokens on demand. Valid for 2 months</p>
              
              <Select 
                disabled={selectedOption !== "topup" || isLoadingTokenPlans}
                value={selectedTokenPlanUid}
                onValueChange={setSelectedTokenPlanUid}
              >
                <SelectTrigger className="h-12 rounded-xl border-[#E8E8E8] bg-white">
                  <SelectValue placeholder={isLoadingTokenPlans ? "Loading plans..." : "Select an amount"} />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {((tokenPlans?.data || []) as any[]).map((plan: any) => (
                    <SelectItem key={plan.uid} value={plan.uid}>
                      {plan.tokens} Tokens — {formatCurrency(plan.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="p-6 md:p-8 bg-white border-t border-[#E8E8E8] flex flex-row gap-4 sm:justify-between items-center sm:space-x-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isBusy}
            className="flex-1 h-14 rounded-full border-[#E8E8E8] text-[#6A6D71] text-[16px] font-medium"
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 h-14 rounded-full bg-[#322FEB] hover:bg-[#2826c8] text-white text-[16px] font-medium shadow-[0px_8px_16px_0px_#322FEB4D]"
            disabled={isBusy || (selectedOption === "topup" && !selectedTokenPlanUid)}
            onClick={handleBuy}
          >
            {isBusy ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              selectedOption === "upgrade" ? "Upgrade plan" : "Top up now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GetTokensDialog;
