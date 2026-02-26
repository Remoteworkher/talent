"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserData } from "@/hooks/userData";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { toast } from "sonner";
import { Loader2, AlertTriangle, Info } from "lucide-react";

import { useProfile, useUpdateProfile } from "@/hooks/useProfile";

const AccountTab = () => {
  const router = useRouter();
  const { sendOTP } = useEmailVerification();
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [biography, setBiography] = useState("");
  const [avatar, setAvatar] = useState<string | File>("");

  useEffect(() => {
    if (profileData) {
      setName(profileData.name || "");
      setEmail(profileData.email || "");
      setPhone(profileData.phone || "");
      setJobTitle(profileData.job_title || "");
      setBiography(profileData.bio || "");
      setAvatar(profileData.avatar || "");
    }
  }, [profileData]);

  const handleVerifyClick = async () => {
    try {
      const res = await sendOTP.mutateAsync();
      if (res.status === "success" && res.data?.signature) {
        toast.success("Verification code sent!");
        router.push(`/settings/verify-email?signature=${res.data.signature}`);
      } else {
        toast.error(res.message || "Failed to send verification email.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleApplyChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("job_title", jobTitle);
      formData.append("bio", biography);
      
      if (avatar instanceof File) {
        formData.append("avatar", avatar);
      }

      await updateProfileMutation.mutateAsync(formData);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  const handleDiscard = () => {
    if (profileData) {
      setName(profileData.name || "");
      setEmail(profileData.email || "");
      setPhone(profileData.phone || "");
      setJobTitle(profileData.job_title || "");
      setBiography(profileData.bio || "");
      setAvatar(profileData.avatar || "");
    }
  };

  if (profileLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  const isChanged = 
    name !== profileData?.name ||
    email !== profileData?.email ||
    phone !== profileData?.phone ||
    jobTitle !== (profileData?.job_title || "") ||
    biography !== (profileData?.bio || "") ||
    avatar instanceof File;

  return (
    <div className="space-y-10">
      {/* Upload Image Section */}
      <div className="flex items-center gap-6 py-6 border-b border-[#F0F0F0]">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-[#E8E8E8]">
          <Image 
            src={avatar instanceof File ? URL.createObjectURL(avatar) : (avatar || "/user-avatar.svg")} 
            alt="User Avatar" 
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-[16px] text-[#161A21]">Upload Image</h3>
            <p className="text-[#95969A] text-[14px]">Min 400x400px, PNG or JPEG</p>
          </div>
          <label className="cursor-pointer">
            <div className="rounded-full h-[40px] px-6 border border-[#E8E8E8] text-[#161A21] font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">
              Upload
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Full Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pb-6 border-b border-[#F0F0F0]">
          <div className="space-y-1">
            <h4 className="mori-semibold text-[15px] text-[#161A21]">Full Name</h4>
            <p className="text-[#95969A] text-[13px]">Manage your preferences and configure various options.</p>
          </div>
          <Input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-[44px] border-[#E8E8E8] bg-white px-4 text-[15px]"
          />
        </div>

        {/* Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pb-6 border-b border-[#F0F0F0]">
          <div className="space-y-1">
            <h4 className="mori-semibold text-[15px] text-[#161A21]">Email Address</h4>
            <p className="text-[#95969A] text-[13px]">Manage your preferences and configure various options.</p>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[44px] bg-white px-4 text-[15px] pr-[120px]"
              />
              <Button 
                onClick={handleVerifyClick}
                disabled={sendOTP.isPending}
                className="absolute right-1 top-1 bottom-1 h-auto rounded-lg bg-[#322FEB] hover:bg-[#2826c8] text-white px-4 text-[13px] font-semibold flex items-center gap-2"
              >
                {sendOTP.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify email"}
              </Button>
            </div>
            {/* Note: This logic for "verified" status might need real data from API if available */}
            <div className="flex items-center gap-2 text-[#F29339] text-[12px]">
              <AlertTriangle className="w-4 h-4" />
              <span>Email not verified</span>
            </div>
          </div>
        </div>

        {/* Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pb-6 border-b border-[#F0F0F0]">
          <div className="space-y-1">
            <h4 className="mori-semibold text-[15px] text-[#161A21]">Phone Number</h4>
            <p className="text-[#95969A] text-[13px]">Manage your phone number for account security.</p>
          </div>
          <Input 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08012345678"
            className="h-[44px] border-[#E8E8E8] bg-white px-4 text-[15px]"
          />
        </div>

        {/* Job Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pb-6 border-b border-[#F0F0F0]">
          <div className="space-y-1">
            <h4 className="mori-semibold text-[15px] text-[#161A21]">Job Title</h4>
            <p className="text-[#95969A] text-[13px]">Manage your preferences and configure various options.</p>
          </div>
          <Input 
            placeholder="UI/UX Designer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="h-[44px] border-[#E8E8E8] bg-white px-4 text-[15px]"
          />
        </div>

        {/* Biography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pb-6 border-b border-[#F0F0F0]">
          <div className="space-y-1">
            <h4 className="mori-semibold text-[15px] text-[#161A21]">Biography</h4>
            <p className="text-[#95969A] text-[13px]">Manage your preferences and configure various options.</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[13px] text-[#161A21]">
              <span className="font-medium">Biography <span className="text-[#95969A] font-normal">(Optional)</span></span>
            </div>
            <div className="relative">
              <Textarea 
                placeholder="Describe yourself..."
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="min-h-[120px] rounded-xl border-[#E8E8E8] bg-white p-4 text-[15px] resize-none"
                maxLength={200}
              />
              <div className="absolute bottom-3 right-4 text-[#95969A] text-[11px]">
                {biography.length}/200
              </div>
            </div>
            <div className="flex items-start gap-2 text-[#95969A] text-[12px]">
              <Info className="w-3.5 h-3.5 mt-0.5" />
              <span>It will be displayed on your profile.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 pb-10">
        <Button 
          variant="outline" 
          onClick={handleDiscard}
          className="h-[48px] px-8 rounded-xl border-[#E8E8E8] text-[#161A21] font-semibold"
        >
          Discard
        </Button>
        <Button 
          onClick={handleApplyChanges}
          disabled={!isChanged || updateProfileMutation.isPending}
          className={`h-[48px] px-8 rounded-xl font-semibold flex items-center gap-2 transition-all ${
            isChanged 
              ? "bg-[#322FEB] hover:bg-[#2826c8] text-white" 
              : "bg-[#F0F0F0] text-[#95969A] cursor-not-allowed"
          }`}
        >
          {updateProfileMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default AccountTab;
