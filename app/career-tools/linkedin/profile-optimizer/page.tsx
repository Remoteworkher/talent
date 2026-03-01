"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
  </svg>
);

const CloudUploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z" fill="#95969A"/>
  </svg>
);

export default function LinkedInOptimizerPage() {
  return (
    <BaseToolPage
      slug="profile-optimizer"
      resultPath="/career-tools/linkedin/profile-optimizer/result"
      submitButtonText="Generate my profile"
      icon={
        <div className="w-12 h-12 rounded-full bg-[#322FEB] flex items-center justify-center">
           <UserIcon />
        </div>
      }
      titleOverride="LinkedIn Profile Optimizer"
      descriptionOverride="Upload your LinkedIn PDF or enter details to get AI-powered optimization suggestions"
      initialData={{
        profile_pdf: null,
        full_name: "",
        job_title: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <div className="space-y-6">
          <div className="space-y-4">
             <Label className="text-[#161A21] text-[14px] mori-semibold">
               Step 1: Upload your LinkedIn Profile PDF
             </Label>
             <div 
               className="border-2 border-dashed border-[#E8E8E8] rounded-[24px] p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors bg-white"
               onClick={() => document.getElementById("profile_pdf_input")?.click()}
             >
                <input 
                  id="profile_pdf_input"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleInputChange("profile_pdf", e.target.files?.[0])}
                  accept=".pdf"
                />
                <CloudUploadIcon />
                <p className="text-[#161A21] text-[15px] mori-semibold mt-4">
                  {formData.profile_pdf ? formData.profile_pdf.name : "Upload your LinkedIn Profile PDF"}
                </p>
                <p className="text-[#95969A] text-[12px] mt-1">
                  JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
                </p>
                <Button variant="outline" type="button" className="mt-6 rounded-[20px] px-8 border-[#E8E8E8] text-[#161A21] h-11">
                  Browse File
                </Button>
             </div>
          </div>

          <div className="relative flex items-center justify-center py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#E8E8E8]"></span>
            </div>
            <span className="relative px-3 bg-white text-[#95969A] text-[12px] font-medium uppercase tracking-wider">
              Or enter details manually
            </span>
          </div>

          <div className="space-y-5">
            <div className="space-y-2 text-left">
              <Label htmlFor="full_name" className="text-[#161A21] text-[14px] mori-semibold">
                Full Name
              </Label>
              <Input
                id="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
                className="h-12 rounded-xl border-[#E8E8E8] focus:border-[#322FEB] transition-all"
              />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="job_title" className="text-[#161A21] text-[14px] mori-semibold">
                Job Title
              </Label>
              <Input
                id="job_title"
                placeholder="Enter your job title"
                value={formData.job_title}
                onChange={(e) => handleInputChange("job_title", e.target.value)}
                className="h-12 rounded-xl border-[#E8E8E8] focus:border-[#322FEB] transition-all"
              />
            </div>
          </div>
        </div>
      )}
    />
  );
}
