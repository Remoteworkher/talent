"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const emailTypes = [
  "Job Application",
  "Networking",
  "Follow-up",
  "Thank You",
  "Cold Outreach",
  "Interview Request",
  "Referral",
];

const emailTones = [
  "Professional",
  "Formal",
  "Confident",
  "Friendly",
  "Enthusiastic",
  "Casual",
];

const MAX_CHARS = 200;

const Page = () => {
  const [emailType, setEmailType] = useState("job-application");
  const [emailTone, setEmailTone] = useState("professional");
  const [recipientName, setRecipientName] = useState("");
  const [recipientRole, setRecipientRole] = useState("");
  const [company, setCompany] = useState("");
  const [contextDetails, setContextDetails] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to result page (in real app would submit to API)
    window.location.href = "/career-tools/email-writer/email";
  };

  return (
    <div className="bg-[#FFFCFD] min-h-screen">
      {/* Go back link – sits above the card, inside page content */}
      <div className="px-4 md:px-8 pt-4 pb-2">
      </div>

      {/* Centered form card */}
      <div className="flex justify-center px-4 py-6">
        <div
          className="w-full max-w-[600px] bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-10"
          style={{
            boxShadow: `
              0px 96px 96px -32px #3333330F,
              0px 48px 48px -24px #3333330A,
              0px 24px 24px -12px #3333330A,
              0px 12px 12px -6px #3333330A,
              0px 6px 6px -3px #3333330A,
              0px 3px 3px -1.5px #33333305,
              0px 1px 1px 0.5px #3333330A,
              0px 0px 0px 1px #3333330A,
              0px -1px 1px -0.5px #3333330F inset
            `,
          }}
        >
          {/* Icon + Title + Subtitle */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-12 h-12 rounded-[12px] bg-[#F6F3FF] flex items-center justify-center mb-4">
              <Image
                src="/mail-line.svg"
                width={24}
                height={24}
                alt="Email Writer"
              />
            </div>
            <h1 className="sora-semibold text-[#161A21] text-[22px] md:text-[26px]">
              Email Writer
            </h1>
            <p className="text-[#6A6D71] text-[14px] mt-1.5 max-w-[380px]">
              Upload your Linkedin PDF or enter details to get AI-powered
              optimization suggestions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Email Type */}
            <div className="space-y-1">
              <Label htmlFor="email-type" className="text-[#161A21] text-[14px]">
                Email Type
              </Label>
              <div className="relative">
                <select
                  id="email-type"
                  value={emailType}
                  onChange={(e) => setEmailType(e.target.value)}
                  className="w-full h-[44px] rounded-[20px] border border-[#E8E8E8] bg-white px-3 pr-10 text-[14px] text-[#161A21] appearance-none focus:outline-none focus:border-[#322FEB] focus:ring-[3px] focus:ring-[#322FEB]/20 transition-[color,box-shadow]"
                >
                  {emailTypes.map((type) => (
                    <option key={type} value={type.toLowerCase().replace(/ /g, "-")}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <Image src="/arrow-down.svg" width={16} height={16} alt="chevron" />
                </div>
              </div>
            </div>

            {/* Email Tone */}
            <div className="space-y-1">
              <Label htmlFor="email-tone" className="text-[#161A21] text-[14px]">
                Email Tone
              </Label>
              <div className="relative">
                <select
                  id="email-tone"
                  value={emailTone}
                  onChange={(e) => setEmailTone(e.target.value)}
                  className="w-full h-[44px] rounded-[20px] border border-[#E8E8E8] bg-white px-3 pr-10 text-[14px] text-[#161A21] appearance-none focus:outline-none focus:border-[#322FEB] focus:ring-[3px] focus:ring-[#322FEB]/20 transition-[color,box-shadow]"
                >
                  {emailTones.map((tone) => (
                    <option key={tone} value={tone.toLowerCase()}>
                      {tone}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <Image src="/arrow-down.svg" width={16} height={16} alt="chevron" />
                </div>
              </div>
            </div>

            {/* Recipient Name */}
            <div className="space-y-1">
              <Label htmlFor="ew-recipient-name" className="text-[#161A21] text-[14px]">
                Recipient Name
              </Label>
              <Input
                id="ew-recipient-name"
                placeholder="e.g., Sarah Johnson"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>

            {/* Recipient Role */}
            <div className="space-y-1">
              <Label htmlFor="ew-recipient-role" className="text-[#161A21] text-[14px]">
                Recipient Role
              </Label>
              <Input
                id="ew-recipient-role"
                placeholder="e.g Senior Engineer"
                type="text"
                value={recipientRole}
                onChange={(e) => setRecipientRole(e.target.value)}
              />
            </div>

            {/* Company */}
            <div className="space-y-1">
              <Label htmlFor="ew-company" className="text-[#161A21] text-[14px]">
                Company
              </Label>
              <Input
                id="ew-company"
                placeholder="e.g. Moniepoint"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* Context & Details */}
            <div className="space-y-1">
              <Label htmlFor="ew-context" className="text-[#161A21] text-[14px]">
                Context &amp; Details
              </Label>
              <div className="relative">
                <Textarea
                  id="ew-context"
                  placeholder="Provide details about the situation, what you want to communicate, the job you're applying for, etc..."
                  value={contextDetails}
                  onChange={(e) =>
                    setContextDetails(e.target.value.slice(0, MAX_CHARS))
                  }
                  rows={5}
                  className="rounded-[16px] resize-none pr-8"
                />
                <span className="absolute bottom-2 right-3 text-[11px] text-[#95969A]">
                  {contextDetails.length}/{MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Generate button */}
            <div className="pt-2 flex justify-center">
              <Button type="submit" className="gap-2 px-6">
                <Image
                  src="/sparkling-line.svg"
                  width={18}
                  height={18}
                  alt="generate"
                  className="brightness-[10]"
                />
                Generate email (20 tokens)
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
