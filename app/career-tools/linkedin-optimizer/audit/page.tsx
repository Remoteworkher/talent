"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#322FEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIconPurple = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#5335E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 12.9V17.1C16 18.15 15.15 19 14.1 19H5.9C4.85 19 4 18.15 4 17.1V8.9C4 7.85 4.85 7 5.9 7H10.1M16 12.9L20 8.9M16 12.9H20V17.1M10.1 7L14.1 3H22.3V11.2H18.2" stroke="#322FEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Page = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("Senior Product Designer | Helping SaaS & Tech Teams Scale via Modular UX Frameworks & Design Systems | Increased User Engagement by 40% | UX Research & Product Strategy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skills = [
    "UX Design", "Prototyping", "Wireframing", "Information Architecture", 
    "User Research", "Stakeholder Management", "UX Audit", "Design System"
  ];

  return (
    <div className="bg-[#FFFCFD] min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/career-tools/linkedin-optimizer">
            <Button variant="outline" size="sm" className="gap-1.5 rounded-[12px]">
              <Image src="/arrow-left-line.svg" width={16} height={16} alt="back" />
              Go back
            </Button>
          </Link>
          <Button className="gap-2 rounded-[24px] px-6">
            <Image src="/sparkling-line.svg" width={18} height={18} alt="sparkle" className="brightness-0 invert" />
            Generate again (2 tokens)
          </Button>
        </div>

        <h1 className="sora-semibold text-[#161A21] text-[24px] md:text-[28px] mb-8">
          Your Personal Brand Audit
        </h1>

        {/* Score and Suggestions card */}
        <div className="bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-8 mb-10 shadow-sm">
          <div className="mb-4">
            <p className="text-[#6A6D71] text-[14px] mb-1">Avg. Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-[#322FEB] text-[36px] sora-bold font-bold leading-none">79</span>
              <span className="text-[#322FEB] text-[18px] opacity-60">/100</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <CheckIcon className="mt-1 shrink-0" />
              <p className="text-[#6A6D71] text-[13px]">Quantify your early career roles with the same rigor as your recent ones.</p>
            </div>
            <div className="flex gap-2 items-start">
              <CheckIcon className="mt-1 shrink-0" />
              <p className="text-[#6A6D71] text-[13px]">Add &apos;Senior Product Designer&apos; to the current job title to help with HR searches.</p>
            </div>
            <div className="flex gap-2 items-start">
              <CheckIcon className="mt-1 shrink-0" />
              <p className="text-[#6A6D71] text-[13px]">Build a &apos;Featured&apos; section to showcase the Framer portfolio visually.</p>
            </div>
          </div>
        </div>

        {/* Optimized Headline Section */}
        <div className="mb-12">
          <h2 className="text-[#161A21] text-[18px] mori-semibold mb-3">Optimized Headline</h2>
          <p className="text-[#6A6D71] text-[14px] mb-4 font-normal">Current: Emmanuel ThankGod Product Designer | Delaware, USA</p>
          <div className="bg-[#F6F3FF] border border-[#DED6FF] rounded-[16px] p-5 relative">
            <div className="flex items-center gap-2 mb-3">
               <Image src="/sparkling-line.svg" width={14} height={14} alt="sparkle" className="opacity-70" />
               <span className="text-[#5335E9] text-[13px] mori-semibold">Optimized:</span>
            </div>
            <p className="text-[#161A21] text-[16px] leading-[1.6]">
              Senior Product Designer | Helping SaaS & Tech Teams Scale via Modular UX Frameworks & Design Systems | Increased User Engagement by 40% | UX Research & Product Strategy
            </p>
            <button 
              onClick={handleCopy}
              className="absolute bottom-4 right-4 p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <CopyIcon />
              {copied && <span className="absolute -top-8 right-0 text-[10px] bg-black text-white px-2 py-1 rounded">Copied!</span>}
            </button>
          </div>
        </div>

        {/* Optimized About Section Section */}
        <div className="mb-12">
          <h2 className="text-[#161A21] text-[18px] mori-semibold mb-3">Optimized About Section</h2>
          <p className="text-[#6A6D71] text-[14px] mb-6 leading-[1.6]">
            Does your design system actually speed up development, or is it just a library of pretty buttons?<br/>
            I specialize in bridging the gap between complex engineering requirements and intuitive user experiences. Over the last 7+ years, I&apos;ve led design initiatives that didn&apos;t just look good—they moved the needle. Specifically, I&apos;ve helped organizations increase user engagement by 40% and reduce developer handoff friction by 60% through modular UX frameworks.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E8E8E8] rounded-[20px] p-6 shadow-sm">
              <h3 className="text-[#161A21] text-[15px] mori-semibold mb-6">What I bring to the table:</h3>
              <div className="space-y-4">
                {[
                  "Strategic Design Leadership: Leading end-to-end product lifecycles from discovery to launch.",
                  "Modular Architecture: Building design systems that reduce iteration cycles by up to 45%.",
                  "Data-Driven UX: Using quantitative analysis and Google Analytics to drive 30% improvements in usability completion.",
                  "Cross-Functional Synergy: Facilitating workshops that align developers, PMs, and stakeholders."
                ].map((text, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckIconPurple className="mt-1 shrink-0" />
                    <p className="text-[#6A6D71] text-[13px] leading-[1.5]">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E8E8E8] rounded-[20px] p-6 shadow-sm">
              <h3 className="text-[#161A21] text-[15px] mori-semibold mb-6">Areas to Improve.</h3>
              <div className="space-y-4">
                {[
                  "Use white space to make it readable on mobile.",
                  "Keep the email address visible so recruiters don't have to hunt for it.",
                  "Bold key achievements to make them pop during a quick skim."
                ].map((text, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckIconPurple className="mt-1 shrink-0" />
                    <p className="text-[#6A6D71] text-[13px] leading-[1.5]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Skills */}
        <div className="mb-12 pb-10">
          <h2 className="text-[#161A21] text-[18px] mori-semibold mb-5">Recommended Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <span 
                key={i} 
                className="px-4 py-2 border border-[#322FEB] text-[#322FEB] rounded-full text-[13px] hover:bg-[#F6F3FF] cursor-default transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
