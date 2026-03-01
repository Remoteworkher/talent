"use client";
import React, { useRef } from "react";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

export default function BrandAuditPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <BaseToolPage
      slug="personal-brand-audit"
      titleOverride="Personal Brand Audit"
      descriptionOverride="Get AI-powered insights on your online presence and personal brand"
      submitButtonText="Run brand audit"
      icon={
        <div className="w-8 h-8 rounded-full bg-[#E0FAEC] flex items-center justify-center">
          <Image src="/globe.svg" width={20} height={20} alt="globe" />
        </div>
      }
      resultPath="/career-tools/career/brand-audit/result"
      initialData={{
        current_role: "",
        desired_brand_perception: "",
        linkedin_url: "",
        twitter_handle: "",
        instagram_handle: "",
        portfolio_url: "",
        github_url: "",
        page_image_file_id: null as File | null,
      }}
      renderFields={(formData, handleInputChange) => (
        <div className="space-y-6">
             {/* Step 1: Upload */}
             <div className="space-y-3">
                <p className="text-[#161A21] font-semibold text-[14px] text-left">Step 1: Upload Page Image</p>
                <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="border-2 border-dashed border-[#E8E8E8] rounded-[16px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors group"
                >
                   <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      onChange={(e) => {
                         const file = e.target.files?.[0];
                         if (file) handleInputChange("page_image_file_id", file);
                      }} 
                   />
                   <div className="text-[#6A6D71] group-hover:text-[#322FEB] transition-colors">
                      <UploadCloud className="w-8 h-8" />
                   </div>
                   <div className="text-center">
                      <p className="text-[#161A21] font-bold text-[14px]">
                         {formData.page_image_file_id ? formData.page_image_file_id.name : "Upload your LinkedIn page image"}
                      </p>
                      <p className="text-[#95969A] text-[12px]">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
                   </div>
                   <button 
                      type="button"
                      className="mt-2 px-6 py-2 border border-[#E8E8E8] rounded-full text-[13px] font-semibold text-[#161A21] hover:bg-white"
                   >
                      Browse File
                   </button>
                </div>
             </div>

             <div className="space-y-1.5 text-left pt-2">
               <Label className="text-[#161A21] font-semibold text-[14px]">Current Role</Label>
               <Input 
                 placeholder="e.g Product Designer"
                 value={formData.current_role} 
                 onChange={(e) => handleInputChange("current_role", e.target.value)} 
                 className="h-14 rounded-xl"
               />
             </div>
             <div className="space-y-1.5 text-left">
               <Label className="text-[#161A21] font-semibold text-[14px]">Desired Brand Perception</Label>
               <Input 
                 placeholder="e.g., Thought leader in UX" 
                 value={formData.desired_brand_perception} 
                 onChange={(e) => handleInputChange("desired_brand_perception", e.target.value)} 
                 className="h-14 rounded-xl"
               />
             </div>
             
             <div className="space-y-1.5 text-left">
               <Label className="text-[#161A21] font-semibold text-[14px]">LinkedIn Url</Label>
               <Input 
                 placeholder="linkedin.com/in/yourname"
                 value={formData.linkedin_url} 
                 onChange={(e) => handleInputChange("linkedin_url", e.target.value)} 
                 className="h-14 rounded-xl"
               />
             </div>

             <div className="space-y-1.5 text-left">
               <Label className="text-[#161A21] font-semibold text-[14px]">Twitter/X Handle</Label>
               <Input 
                 placeholder="@yourhandle"
                 value={formData.twitter_handle} 
                 onChange={(e) => handleInputChange("twitter_handle", e.target.value)} 
                 className="h-14 rounded-xl"
               />
             </div>

             <div className="space-y-1.5 text-left">
               <Label className="text-[#161A21] font-semibold text-[14px]">Instagram Handle</Label>
               <Input 
                 placeholder="@yourhandle"
                 value={formData.instagram_handle} 
                 onChange={(e) => handleInputChange("instagram_handle", e.target.value)} 
                 className="h-14 rounded-xl"
               />
             </div>

             <div className="space-y-1.5 text-left">
               <Label className="text-[#161A21] font-semibold text-[14px]">Portfolio Url</Label>
               <Input 
                 placeholder="yourportfolio.com"
                 value={formData.portfolio_url} 
                 onChange={(e) => handleInputChange("portfolio_url", e.target.value)} 
                 className="h-14 rounded-xl"
               />
             </div>

             <div className="space-y-1.5 text-left">
               <Label className="text-[#161A21] font-semibold text-[14px]">Github Url</Label>
               <Input 
                 placeholder="github.com/yourname"
                 value={formData.github_url} 
                 onChange={(e) => handleInputChange("github_url", e.target.value)} 
                 className="h-14 rounded-xl"
               />
             </div>
        </div>
      )}
    />
  );
}
