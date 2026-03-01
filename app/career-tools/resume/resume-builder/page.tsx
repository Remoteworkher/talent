"use client";
import { useRouter } from "next/navigation";
import ResumeCard from "@/components/reusables/ResumeCard";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useResumeBuilderStore } from "@/lib/store/useResumeBuilderStore";

const resumeTemplates = [
  {
    image: "/resume1.svg",
    title: "Classic Professional",
    description:
      "Traditional format with blue accents. Perfect for corporate roles.",
    colors: ["#EDEDED", "#454545", "#0391FF"],
    value: "classic",
  },
  {
    image: "/resume2.svg",
    title: "Modern Tech",
    description:
      "Traditional format with blue accents. Perfect for corporate roles.",
    colors: ["#EDEDED", "#454545", "#3DA876", "#135FA2", "#DB17D1"],
    value: "modern",
  },
  {
    image: "/resume3.svg",
    title: "Minimalist",
    description:
      "Traditional format with blue accents. Perfect for corporate roles.",
    colors: ["#EDEDED", "#454545", "#0391FF", "#372275"],
    value: "minimalist",
  },
  {
    image: "/resume4.svg",
    title: "Executive",
    description:
      "Traditional format with blue accents. Perfect for corporate roles.",
    colors: ["#EDEDED", "#454545", "#3DA876", "#135FA2", "#DB17D1"],
    value: "executive",
  },
  {
    image: "/resume5.svg",
    title: "Creative Bold",
    description:
      "Traditional format with blue accents. Perfect for corporate roles.",
    colors: ["#EDEDED", "#454545", "#0391FF"],
    value: "creative",
  },
];

const Page = () => {
  const router = useRouter();
  const { template: selectedTemplate, setTemplate, setThemeColor } = useResumeBuilderStore();

  const handleNext = () => {
    if (!selectedTemplate) return;
    
    // Find selected template to get its default color (third color is usually the accent)
    const t = resumeTemplates.find(item => item.value === selectedTemplate);
    if (t && t.colors.length >= 3) {
      setThemeColor(t.colors[2]);
    }
    
    router.push("/career-tools/resume/resume-builder/information");
  };

  return (
    <div className="bg-[#FFFCFD] min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto pt-4 px-4 pb-24">
        <div className="text-[#161A21] text-[18px] md:text-[24px] sora-semibold text-center pt-6">
          Choose your resume template
        </div>
        <div className="text-[#6A6D71] text-[14px] md:text-[16px] text-center mt-1">
          Select a design that matches your industry and personal style
        </div>
        <section className="flex justify-center mt-10 md:w-4/5 mx-auto">
          <RadioGroup
            value={selectedTemplate}
            onValueChange={setTemplate}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {resumeTemplates.map((template) => (
                <label
                  key={template.value}
                  htmlFor={template.value}
                  className="cursor-pointer"
                >
                  <ResumeCard
                    image={template.image}
                    title={template.title}
                    description={template.description}
                    colors={template.colors}
                    value={template.value}
                    isSelected={selectedTemplate === template.value}
                  />
                </label>
              ))}
            </div>
          </RadioGroup>
        </section>
      </div>
      <section className="bg-white w-full border-t border-[#E8E8E8] fixed bottom-0 left-0 right-0 py-4 z-20">
        <div className="flex justify-end items-end px-4">
          <Button onClick={handleNext} disabled={!selectedTemplate} className="px-5">
            Next: Personal info
            <Image
              src={`/arrow-right-line.svg`}
              width={20}
              height={20}
              alt="arrow right line"
            />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Page;
