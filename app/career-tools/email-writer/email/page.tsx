"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/* ─── Inline copy icon (no SVG asset available) ─────────────────────── */
const CopyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

/* ─── Sample generated email content ────────────────────────────────── */
const sampleEmail = {
  subject: "Product Designer Application – [Your Name]",
  body: [
    "Dear James,",
    "I am writing to formally express my interest in the Product Designer position at Moniepoint, having closely followed the company's impressive trajectory in the financial platform space.",
    "With [Number] years of experience in product design, I specialize in creating intuitive user interfaces and seamless user journeys that bridge the gap between complex financial technology and everyday user needs. My background aligns with Moniepoint's commitment to providing robust business banking solutions, and I am confident my expertise in [mention a specific skill, e.g., mobile-first design or design systems] would be an immediate asset to your design team.",
    "I have attached my resume and a link to my portfolio [Link], which showcases my process for solving high-impact product challenges. Highlights include:",
    "• [Key Achievement 1: e.g., Redesigning a checkout flow that increased conversion by 15%]\n• [Key Achievement 2: e.g., Scaling a design system for a cross-platform fintech app]\n• [Key Achievement 3: e.g., Conducting user research that led to a 20% improvement in retention]",
    "I would welcome the opportunity to discuss how my design approach can contribute to Moniepoint's continued growth and product excellence. Are you available for a brief introductory call next Tuesday or Wednesday?",
    "Best regards,",
  ],
  signature: ["[Your Name]", "[Phone Number]", "[LinkedIn Profile]"],
};

const Page = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullText = [
      `Email Subject\n${sampleEmail.subject}\n`,
      `Email Body\n${sampleEmail.body.join("\n\n")}`,
      sampleEmail.signature.join("\n"),
    ].join("\n\n");

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-[#FFFCFD] min-h-screen">
      {/* ── Simple header bar ── */}
      <div className="px-4 md:px-8 pt-4 pb-4 flex items-center justify-between">
        {/* Left: Go back + Title */}
        <div className="flex items-center gap-4">
          <h1 className="sora-semibold text-[#161A21] text-[18px] md:text-[24px]">
            Your email writer is ready!
          </h1>
        </div>

        {/* Right: Copy + Download */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2 text-[14px]"
            onClick={handleCopy}
          >
            <CopyIcon />
            {copied ? "Copied!" : "Copy text"}
          </Button>
          <Button className="gap-2 text-[14px]">
            <Image
              src="/download-line.svg"
              width={18}
              height={18}
              alt="download"
              className="brightness-[10]"
            />
            Download PDF
          </Button>
        </div>
      </div>

      {/* ── Email document card ── */}
      <div className="flex justify-center px-4 py-4 pb-12">
        <div
          className="w-full max-w-[700px] bg-white border border-[#E8E8E8] rounded-[20px] p-6 md:p-10"
          style={{
            boxShadow: `
              0px 96px 96px -32px #3333330F,
              0px 48px 48px -24px #3333330A,
              0px 24px 24px -12px #3333330A,
              0px 12px 12px -6px #3333330A,
              0px 6px 6px -3px #3333330A,
              0px 3px 3px -1.5px #33333305,
              0px 1px 1px 0.5px #3333330A,
              0px 0px 0px 1px #3333330A
            `,
          }}
        >
          {/* Email Subject */}
          <div className="mb-5">
            <p className="text-[15px] mori-semibold text-[#161A21] mb-1.5">
              Email Subject
            </p>
            <p className="text-[14px] text-[#444] leading-[1.7]">
              {sampleEmail.subject}
            </p>
          </div>

          <hr className="border-[#F0F0F0] mb-5" />

          {/* Email Body */}
          <div>
            <p className="text-[15px] mori-semibold text-[#161A21] mb-4">
              Email Body
            </p>
            <div className="space-y-4">
              {sampleEmail.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[14px] text-[#333] leading-[1.8] whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-5 space-y-0.5">
              {sampleEmail.signature.map((line, i) => (
                <p key={i} className="text-[14px] text-[#333] leading-[1.8]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
