"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import CoverLetterCard from "@/components/reusables/CoverLetterCard";

const coverLetterTemplates = [
  {
    title: "Formal Traditional",
    description: "Classic business letter format. Best for corporate and traditional industries.",
    value: "formal",
    previewBg: "#FEF1E8",
  },
  {
    title: "Modern Professional",
    description: "Contemporary layout with clean design. Great for most industries.",
    value: "modern",
    previewBg: "#FEF1E8",
  },
  {
    title: "Creative & Bold",
    description: "Standout design for creative roles. Shows personality.",
    value: "creative",
    previewBg: "#FEF1E8",
  },
  {
    title: "Executive Level",
    description: "Sophisticated format for senior positions. Commands authority.",
    value: "executive",
    previewBg: "#FEF1E8",
  },
  {
    title: "Startup Friendly",
    description: "Casual yet professional. Perfect for tech startups and modern companies.",
    value: "startup",
    previewBg: "#FEF1E8",
  },
];

const Page = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");

  return (
    <div className="bg-[#FFFCFD] min-h-screen flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-4 px-4 pb-32">
        <div className="text-[#161A21] text-[18px] md:text-[24px] sora-semibold text-center pt-6">
          Choose your template
        </div>
        <div className="text-[#6A6D71] text-[14px] md:text-[16px] text-center mt-1">
          Choose a template and generate a personalized cover letter
        </div>

        <section className="flex justify-center mt-10 md:w-[90%] mx-auto">
          <RadioGroup
            value={selectedTemplate}
            onValueChange={setSelectedTemplate}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {coverLetterTemplates.map((template) => (
                <label
                  key={template.value}
                  htmlFor={`cl-${template.value}`}
                  className="cursor-pointer w-full"
                >
                  <CoverLetterCard
                    title={template.title}
                    description={template.description}
                    value={template.value}
                    previewBg={template.previewBg}
                    isSelected={selectedTemplate === template.value}
                  />
                </label>
              ))}
            </div>
          </RadioGroup>
        </section>
      </div>

      {/* Fixed bottom bar */}
      <section className="bg-white w-full border-t border-[#E8E8E8] fixed bottom-0 left-0 right-0 py-4 z-20">
        <div className="flex justify-end items-center px-4 md:px-8">
          <Link href="/career-tools/cover-letter-builder/information">
            <Button className="px-6 gap-2">
              Next: Personal info
              <Image
                src="/arrow-right-line.svg"
                width={20}
                height={20}
                alt="arrow right"
                className="brightness-[10]"
              />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;
