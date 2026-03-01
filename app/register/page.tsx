"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";

// UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// State & Context
import { useAuthContext } from "@/context/AuthContext";
import { useAuthStore } from "@/store/authStore";

// --- 1. Paystack Types ---
interface PaystackTransaction {
  status: string;
  reference: string;
  trans: string;
  message: string;
  transaction: string;
}

interface PaystackPopInstance {
  resumeTransaction: (
    accessCode: string,
    callbacks: {
      onSuccess: (transaction: PaystackTransaction) => void;
      onCancel: () => void;
    },
  ) => void;
  newTransaction: (options: Record<string, unknown>) => void;
}

declare const PaystackPop: {
  new (): PaystackPopInstance;
};

// --- 2. API Response Types ---

type ApiErrors = Record<string, string[]> | null;

interface VerifyResponseBody {
  event: string;
  status: string;
  message: string;
  data: {
    token: string;
  };
  errors: ApiErrors;
}

interface VerifyResponse {
  data: VerifyResponseBody;
}

interface SignupResponse {
  data: {
    status: string;
    message?: string;
    data?: {
      authorization_url?: string;
      access_code?: string;
      reference?: string;
    };
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const Page = () => {
  const router = useRouter();

  const { signup, verifySubscription } = useAuthContext();
  const selectedPlanId = useAuthStore((state) => state.selectedPlanId);

  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+234"); // Default to NG
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // --- UPDATED: Accepts reference string ---
  const handlePaymentVerification = async (reference: string) => {
    const toastId = toast.loading("Verifying payment...");

    try {
      // Pass the reference to the context function
      const res = (await verifySubscription(
        reference,
      )) as unknown as VerifyResponse;

      console.log("Verify Response:", res);

      if (res?.data?.status === "success" && res?.data?.data?.token) {
        const token = res.data.data.token;

        // 1. Store explicitly in LocalStorage (as requested)
        localStorage.setItem("token", token);

        // 2. Update Zustand Store
        useAuthStore.setState({
          token: token,
          isAuthenticated: true,
        });

        toast.dismiss(toastId);
        toast.success("Payment verified successfully!");

        router.push("/register/welcome");
      } else {
        throw new Error(res?.data?.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      toast.dismiss(toastId);
      toast.error(
        "Payment was successful, but verification failed. Please contact support.",
      );
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPlanId) {
      toast.error("Please select a plan first.");
      return;
    }

    if (!form.terms) {
      toast.error("Please agree to the Terms of Service.");
      return;
    }

    setLoading(true);

    const payload = {
      plan_uid: String(selectedPlanId),
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: `${countryCode}${form.phone}`,
      password: form.password,
    };

    try {
      const response = (await signup(payload)) as SignupResponse | undefined;

      console.log("Signup response:", response);

      if (response?.data?.status === "success") {
        const responseData = response.data.data;

        // Scenario A: Paystack Popup Flow
        if (responseData?.access_code) {
          const popup = new PaystackPop();

          popup.resumeTransaction(responseData.access_code, {
            onSuccess: (transaction: PaystackTransaction) => {
              console.log("Paystack success:", transaction);
              // --- UPDATED: Pass transaction.reference ---
              handlePaymentVerification(transaction.reference);
            },
            onCancel: () => {
              toast.error("Payment cancelled.");
              setLoading(false);
            },
          });

          return;
        }

        // Scenario B: Authorization URL Redirect (Fallback)
        if (responseData?.authorization_url) {
          window.location.href = responseData.authorization_url;
          return;
        }

        // Scenario C: Free Tier / No Payment
        toast.success("Registration successful!");
        router.push("/register/welcome");
      } else {
        throw new Error(
          response?.data?.message || "Registration failed. Please try again.",
        );
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Signup Error:", err);

      const errorMessage =
        err?.response?.data?.message || err.message || "Registration failed.";

      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Script src="https://js.paystack.co/v2/inline.js" strategy="lazyOnload" />

      <div className="flex justify-between md:items-center border-b border-[#E8E8E8] pb-6 md:px-6 pt-6">
        <Image
          src={`/logo.svg`}
          width={101}
          height={32.15}
          className="w-[90px] md:w-[101]"
          alt="logo"
        />
        <div className="text-[#161A21] text-[14px] md:text-[16px] text-center md:text-right">
          Already have an account?{" "}
          <Link href={"/login"} className="text-[#322FEB] underline">
            Sign In
          </Link>
        </div>
      </div>
      <section className="pt-10 w-full md:w-[540px] mx-auto">
        <div className="sora-semibold text-[24px] md:text-[32px] leading-[32px] md:leading-[40px] pt-8 text-[#161A21] text-center">
          Create your Compass
          <span className="sora-semibold text-[#322FEB]"> her </span>
          account
        </div>
        <form className="space-y-6 pt-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label
                htmlFor="first_name"
                className="text-[#161A21] text-[14px]"
              >
                First name*
              </Label>
              <Input
                id="first_name"
                placeholder="Enter your first name"
                type="text"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="last_name" className="text-[#161A21] text-[14px]">
                Last name*
              </Label>
              <Input
                id="last_name"
                placeholder="Enter your last name"
                type="text"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-[#161A21] text-[14px]">
              Email Address*
            </Label>
            <Input
              id="email"
              placeholder="hello@alignui.com"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone" className="text-[#161A21] text-[14px]">
              Phone Number*
            </Label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-[120px] border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
              >
                <option value="+234">🇳🇬 +234</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+55">🇧🇷 +55</option>
              </select>
              <Input
                id="phone"
                placeholder="800 000 0000"
                type="tel"
                className="flex-1"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-[#161A21] text-[14px]">
              Password*
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Password (8 or more characters)"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Image
                  src={showPassword ? "/eye-line.svg" : "/eye-off-line.svg"}
                  width={20}
                  height={20}
                  alt="Toggle password visibility"
                />
              </button>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              className="mt-1"
              checked={form.terms}
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, terms: !!checked }))
              }
              required
            />
            <div className="text-[#6A6D71] text-[14px] font-normal cursor-pointer">
              Yes I understand and agree to the{" "}
              <span className="text-[#161A21] underline">
                Compass Terms of Service{" "}
              </span>
              including{" "}
              <span className="text-[#161A21] underline">User Agreement</span>{" "}
              and{" "}
              <span className="text-[#161A21] underline">Privacy Policy</span>
            </div>
          </div>
          <div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Sign up"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Page;
