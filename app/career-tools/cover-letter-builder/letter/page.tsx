"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CoverLetterPreview from "@/components/Tools/CoverLetter/CoverLetterPreview";
import CoverLetterCard from "@/components/reusables/CoverLetterCard";
import { RadioGroup } from "@/components/ui/radio-group";

/* ─── Template data (mirrors the selection page) ──────────────────── */
const coverLetterTemplates = [
  {
    title: "Formal Traditional",
    description: "Classic business letter format.",
    value: "formal",
    previewBg: "#FEF1E8",
  },
  {
    title: "Modern Professional",
    description: "Contemporary layout with clean design.",
    value: "modern",
    previewBg: "#FEF1E8",
  },
  {
    title: "Creative & Bold",
    description: "Standout design for creative roles.",
    value: "creative",
    previewBg: "#FEF1E8",
  },
  {
    title: "Executive Level",
    description: "Sophisticated format for senior positions.",
    value: "executive",
    previewBg: "#FEF1E8",
  },
  {
    title: "Startup Friendly",
    description: "Casual yet professional.",
    value: "startup",
    previewBg: "#FEF1E8",
  },
];

/* ─── Page ────────────────────────────────────────────────────────── */
const Page = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("formal");

  return (
    <div className="-m-4 bg-[#FFFCFD] min-h-[calc(100vh-80px)] flex flex-col">
      {/* Top bar */}
      <div className="w-full flex justify-between items-center py-8 px-4 md:px-8 border-b border-[#E8E8E8] bg-white">
        <div className="flex items-center gap-4">
          <h1 className="sora-semibold text-[#161A21] text-[18px] md:text-[22px]">
            Your cover letter is ready!
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 text-[14px] hidden md:flex">
            <Image
              src="/reset-right-line.svg"
              width={18}
              height={18}
              alt="regenerate"
            />
            Regenerate
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

      {/* Two-column layout: center letter + right template panel */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* ── Center: Cover Letter Preview ── */}
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-10 flex justify-center items-start">
          <div
            className="w-full max-w-[620px] border border-[#E8E8E8] rounded-[12px] overflow-hidden"
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
            <CoverLetterPreview />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
