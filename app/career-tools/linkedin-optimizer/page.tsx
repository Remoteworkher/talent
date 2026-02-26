"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#322FEB"/>
  </svg>
);

const CloudUploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z" fill="#95969A"/>
  </svg>
);

const Page = () => {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/career-tools/linkedin-optimizer/audit";
  };

  return (
    <div className="bg-[#FFFCFD] min-h-screen py-10 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <Link href="/career-tools">
            <Button variant="outline" size="sm" className="gap-1.5 rounded-[12px]">
              <Image src="/arrow-left-line.svg" width={16} height={16} alt="back" />
              Go back
            </Button>
          </Link>
        </div>

        <div className="flex justify-center">
          <div
            className="w-full max-w-[640px] bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-12"
            style={{
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-[#F0F0FF] flex items-center justify-center mb-4">
                <UserIcon />
              </div>
              <h1 className="sora-semibold text-[#161A21] text-[24px] md:text-[28px]">
                LinkedIn Profile Optimizer
              </h1>
              <p className="text-[#6A6D71] text-[15px] mt-2 max-w-[420px]">
                Upload your LinkedIn PDF or enter details to get AI-powered optimization suggestions
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-[#161A21] text-[14px] mori-semibold mb-3 block">
                  Step 1: Upload your LinkedIn Profile PDF
                </Label>
                <div className="border-2 border-dashed border-[#E8E8E8] rounded-[16px] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <CloudUploadIcon />
                  <p className="text-[#161A21] text-[15px] mori-semibold mt-4">
                    Upload your LinkedIn Profile PDF
                  </p>
                  <p className="text-[#95969A] text-[12px] mt-1">
                    JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
                  </p>
                  <Button variant="outline" className="mt-5 rounded-[20px] px-8 border-[#E8E8E8] text-[#161A21]">
                    Browse File
                  </Button>
                </div>
              </div>

              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E8E8E8]"></span>
                </div>
                <span className="relative px-3 bg-white text-[#95969A] text-[12px]">
                  Or enter details manually
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-[#161A21] text-[14px] mori-semibold">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="jobTitle" className="text-[#161A21] text-[14px] mori-semibold">
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    placeholder="Enter your job title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleGenerate}
                  className="w-full md:w-auto mx-auto flex gap-2 rounded-[24px] px-8 py-6 h-auto"
                >
                  <Image src="/sparkling-line.svg" width={18} height={18} alt="sparkle" className="brightness-0 invert" />
                  Generate my profile (10 tokens)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
