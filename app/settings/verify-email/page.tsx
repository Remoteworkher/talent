"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import VerificationOTP from "@/components/reusables/VerificationOTP";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { useUserData } from "@/hooks/userData";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const { data: userData } = useUserData();
  const { verifyOTP, sendOTP } = useEmailVerification();
  const signature = searchParams.get("signature");

  const email = userData?.email || "loading...";

  // 1. Ensure signature is present
  useEffect(() => {
    if (!signature) {
       toast.error("Invalid verification session.");
       // router.push("/settings");
    }
  }, [signature, router]);

  // 2. Stable verification function
  const handleVerify = async (tokenValue?: string) => {
    const tokenToVerify = tokenValue || otp;
    if (!signature || tokenToVerify.length < 6 || verifyOTP.isPending) return;
    
    try {
      const res = await verifyOTP.mutateAsync({
        token: tokenToVerify,
        signature: signature,
      });

      if (res.status === "success") {
        toast.success("Email verified successfully!");
        router.push("/settings");
      } else {
        toast.error(res.message || "Verification failed.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid or expired verification code.");
    }
  };

  // 3. Auto-verify when OTP is complete
  useEffect(() => {
    if (otp.length === 6) {
      handleVerify(otp);
    }
  }, [otp, signature]);

  const handleResend = async () => {
    try {
      const res = await sendOTP.mutateAsync();
      if (res.status === "success" && res.data?.signature) {
        toast.success("Verification code resent!");
        // Update the URL with the new signature if needed, or if it's identical it doesn't matter
        router.replace(`/settings/verify-email?signature=${res.data.signature}`);
      }
    } catch (error) {
      toast.error("Failed to resend code.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[600px] mx-auto pt-20 pb-10 px-6 flex flex-col items-center text-center">
        {/* Mail Icon */}
        <Image src="/verification-icon.svg" alt="Verification Icon" width={96} height={96} />

        {/* Text Content */}
        <div className="space-y-2 mt-6">
          <h1 className="sora-semibold text-[32px] text-[#161A21]">Enter Verification Code</h1>
          <div className="space-y-1">
            <p className="text-[#6A6D71] text-[16px]">We've sent your verification codes to your email address</p>
            <p className="text-[#161A21] font-semibold text-[16px]">{email}</p>
          </div>
        </div>

        {/* OTP Input Section */}
        <div className="w-full py-8">
          <VerificationOTP value={otp} onChange={setOtp} maxLength={6} />
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => handleVerify()}
          disabled={otp.length < 6 || verifyOTP.isPending}
          className="w-full h-[52px] bg-[#322FEB] hover:bg-[#2826c8] text-white font-semibold transition-all disabled:opacity-50 mb-4 rounded-xl"
        >
          {verifyOTP.isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Verify"}
        </Button>

        {/* Resend Link */}
        <div className="text-center space-y-2">
          <p className="text-[#6A6D71] text-[15px]">Experiencing issues receiving the code?</p>
          <button 
            onClick={handleResend}
            disabled={sendOTP.isPending}
            className="text-[#161A21] font-bold text-[15px] underline hover:text-[#322FEB] transition-colors disabled:opacity-50"
          >
            {sendOTP.isPending ? "Sending..." : "Resend code"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" /></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
