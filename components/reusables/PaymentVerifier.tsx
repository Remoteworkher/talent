"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useVerifyTokenTransaction } from "@/hooks/useTokens";

/**
 * PaymentVerifier is a silent component that checks for a 'reference' query parameter 
 * in the URL (usually after a Paystack redirect) and triggers the payment verification.
 */
export const PaymentVerifier = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const verifyTokenMutation = useVerifyTokenTransaction();
  
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (reference) {
      const verifyPayment = async () => {
        const toastId = toast.loading("Verifying your payment...");
        try {
          // Calling the unified endpoint: api/talent/tokens/verify?reference=...
          await verifyTokenMutation.mutateAsync(reference);
          
          toast.success("Payment verified! Your account has been updated.", { id: toastId });
          
          // Invalidate user-specific data to refresh balances (tokens, plan, etc.)
          queryClient.invalidateQueries({ queryKey: ["user-data"] });
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          
          // Remove the reference from the URL to avoid re-triggering on refresh
          const params = new URLSearchParams(searchParams.toString());
          params.delete("reference");
          const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
          router.replace(newUrl);
        } catch (error: any) {
          console.error("Payment verification failed:", error);
          toast.error(error?.response?.data?.message || "Failed to verify payment. Please contact support.", { id: toastId });
          
          // Even on failure, clean up the URL to prevent loops
          const params = new URLSearchParams(searchParams.toString());
          params.delete("reference");
          const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
          router.replace(newUrl);
        }
      };
      
      verifyPayment();
    }
  }, [reference, queryClient, router, pathname, searchParams, verifyTokenMutation]);

  return null;
};
