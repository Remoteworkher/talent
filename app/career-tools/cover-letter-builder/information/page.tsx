"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import ProcessModal from "@/components/reusables/ProcessModal";

const writingTones = [
  "Professional",
  "Confident",
  "Enthusiastic",
  "Formal",
  "Conversational",
];

const MAX_CHARS = 200;

const Page = () => {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [writingTone, setWritingTone] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [relevantExperience, setRelevantExperience] = useState("");
  const [keySkills, setKeySkills] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerate = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-[#FFFCFD] px-2 md:px-4 py-14">
      <div
        className="w-full md:w-[600px] mx-auto bg-white p-4 md:p-8 border border-[#E8E8E8] rounded-[24px]"
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
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-[#161A21] sora-semibold text-[20px] md:text-[24px]">
            Your information
          </div>
          <div className="text-[#6A6D71] text-[14px] md:text-[15px] mt-1 max-w-[380px] mx-auto">
            Upload your resume and job description to get ATS score,
            improvements, and an optimized version
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1">
            <Label htmlFor="cl-fullName" className="text-[#161A21] text-[14px]">
              Full Name
            </Label>
            <Input
              id="cl-fullName"
              placeholder="Enter your full name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Job Title */}
          <div className="space-y-1">
            <Label htmlFor="cl-jobTitle" className="text-[#161A21] text-[14px]">
              Job Title
            </Label>
            <Input
              id="cl-jobTitle"
              placeholder="Enter your job title"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          {/* Company Name */}
          <div className="space-y-1">
            <Label htmlFor="cl-companyName" className="text-[#161A21] text-[14px]">
              Company Name
            </Label>
            <Input
              id="cl-companyName"
              placeholder="Enter your full name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Writing Tone */}
          <div className="space-y-1">
            <Label htmlFor="cl-writingTone" className="text-[#161A21] text-[14px]">
              Writing Tone
            </Label>
            <div className="relative">
              <select
                id="cl-writingTone"
                value={writingTone}
                onChange={(e) => setWritingTone(e.target.value)}
                className="w-full h-[44px] rounded-[20px] border border-[#E8E8E8] bg-white px-3 pr-10 text-[14px] text-[#161A21] appearance-none focus:outline-none focus:border-[#322FEB] focus:ring-[3px] focus:ring-[#322FEB]/20 transition-[color,box-shadow]"
              >
                <option value="" disabled>
                  Select a tone e.g Professional
                </option>
                {writingTones.map((tone) => (
                  <option key={tone} value={tone.toLowerCase()}>
                    {tone}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <Image src="/arrow-down.svg" width={16} height={16} alt="chevron down" />
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-1">
            <Label htmlFor="cl-jobDesc" className="text-[#161A21] text-[14px]">
              Job Description{" "}
              <span className="text-[#6A6D71] font-normal">(Optional)</span>
            </Label>
            <div className="relative">
              <Textarea
                id="cl-jobDesc"
                placeholder="Paste the job description here for a more tailored cover letter..."
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value.slice(0, MAX_CHARS))
                }
                rows={4}
                className="rounded-[16px] resize-none pr-8"
              />
              <span className="absolute bottom-2 right-3 text-[11px] text-[#95969A]">
                {jobDescription.length}/{MAX_CHARS}
              </span>
            </div>
            {/* Helper tip */}
            <div className="flex items-start gap-1.5 mt-1">
              <Image src="/mark.svg" width={14} height={14} alt="info" className="mt-[2px] shrink-0" />
              <p className="text-[12px] text-[#6A6D71]">
                Adding the job description helps the AI match your skills to the
                requirements
              </p>
            </div>
          </div>

          {/* Relevant Experience */}
          <div className="space-y-1">
            <Label htmlFor="cl-experience" className="text-[#161A21] text-[14px]">
              Your Relevant Experience
            </Label>
            <div className="relative">
              <Textarea
                id="cl-experience"
                placeholder="Briefly describe your relevant experience and achievements..."
                value={relevantExperience}
                onChange={(e) =>
                  setRelevantExperience(e.target.value.slice(0, MAX_CHARS))
                }
                rows={4}
                className="rounded-[16px] resize-none pr-8"
              />
              <span className="absolute bottom-2 right-3 text-[11px] text-[#95969A]">
                {relevantExperience.length}/{MAX_CHARS}
              </span>
            </div>
          </div>

          {/* Key Skills */}
          <div className="space-y-1">
            <Label htmlFor="cl-skills" className="text-[#161A21] text-[14px]">
              Key Skills{" "}
              <span className="text-[#6A6D71] font-normal">(comma-separated)</span>
            </Label>
            <Input
              id="cl-skills"
              placeholder="JavaScript, React, Team Leadership, Problem Solving..."
              type="text"
              value={keySkills}
              onChange={(e) => setKeySkills(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-8">
          <Link href="/career-tools/cover-letter-builder">
            <Button variant="outline" type="button" className="gap-2">
              <Image
                src="/arrow-left-line.svg"
                width={18}
                height={18}
                alt="back"
              />
              Previous
            </Button>
          </Link>
          <Button onClick={handleGenerate} className="gap-2">
            <Image
              src="/sparkling-line.svg"
              width={18}
              height={18}
              alt="generate"
              className="brightness-[10]"
            />
            Generate cover letter (2 tokens)
          </Button>
        </div>
      </div>

      {/* Generating modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[440px]">
          <ProcessModal onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
