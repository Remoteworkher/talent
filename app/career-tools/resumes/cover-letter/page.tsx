"use client";
import React, { useState } from "react";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CoverLetterCard from "@/components/reusables/CoverLetterCard";

const templates = [
  {
    title: "Formal Traditional",
    description: "Classic business letter format. Best for corporate and traditional industries.",
    value: "formal",
    previewBg: "#FFF1EB",
  },
  {
    title: "Modern Professional",
    description: "Contemporary layout with clean design. Great for most industries.",
    value: "modern",
    previewBg: "#F0F0FF",
  },
  {
    title: "Creative & Bold",
    description: "Standout design for creative roles. Shows personality.",
    value: "creative",
    previewBg: "#FFF9E6",
  },
  {
    title: "Executive Level",
    description: "Sophisticated format for senior positions. Commands authority.",
    value: "executive",
    previewBg: "#E8F5FF",
  },
  {
    title: "Startup Friendly",
    description: "Casual yet professional. Perfect for tech startups and modern companies.",
    value: "startup",
    previewBg: "#F2FFF2",
  },
];

export default function CoverLetterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].value);

  const [formData, setFormData] = useState({
    full_name: "",
    job_title: "",
    company_name: "",
    writing_tone: "Professional",
    job_description: "",
    relevant_experience: "",
    key_skills: "",
  });

  if (step === 1) {
    return (
      <div className="bg-[#FFFCFD] min-h-screen px-4 md:px-8 py-8 flex flex-col items-center">
        <div className="w-full max-w-[1000px]">
          <div className="mb-6 md:mb-12" />

          <div className="text-center mb-12">
            <h1 className="text-[24px] md:text-[32px] sora-semibold text-[#161A21]">Choose your template</h1>
            <p className="text-[#6A6D71] mt-2">Choose a template and generate a personalized cover letter</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {templates.map((tpl) => (
              <div key={tpl.value} onClick={() => setSelectedTemplate(tpl.value)}>
                <CoverLetterCard
                  title={tpl.title}
                  description={tpl.description}
                  value={tpl.value}
                  previewBg={tpl.previewBg}
                  isSelected={selectedTemplate === tpl.value}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <Button 
                onClick={() => setStep(2)} 
                className="h-14 px-8 rounded-full bg-[#322FEB] hover:bg-[#322FEB]/90 gap-2 text-[16px] shadow-lg"
            >
              Next: Personal info <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BaseToolPage
      slug="cover-letter-builder"
      resultPath="/career-tools/resumes/cover-letter/result"
      submitButtonText="Generate cover letter"
      onBack={() => setStep(1)}
      titleOverride="Your information"
      descriptionOverride="Provide details about the role and your background to generate a tailored cover letter"
      initialData={{
        ...formData,
        template: selectedTemplate,
      }}
      renderFields={(form, handleInputChange) => {
        // We update our local state so we don't lose it if we go back
        const updateLocal = (field: string, value: any) => {
            handleInputChange(field, value);
            setFormData(prev => ({ ...prev, [field]: value }));
        };

        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 flex flex-col gap-1.5">
                <Label className="text-[14px]">Full Name</Label>
                <Input 
                    placeholder="Enter your full name" 
                    value={form.full_name} 
                    onChange={(e) => updateLocal("full_name", e.target.value)} 
                />
              </div>
              <div className="space-y-1.5 flex flex-col gap-1.5">
                <Label className="text-[14px]">Job Title</Label>
                <Input 
                    placeholder="Enter your job title" 
                    value={form.job_title} 
                    onChange={(e) => updateLocal("job_title", e.target.value)} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 flex flex-col gap-1.5">
                <Label className="text-[14px]">Company Name</Label>
                <Input 
                    placeholder="Enter your full name" 
                    value={form.company_name} 
                    onChange={(e) => updateLocal("company_name", e.target.value)} 
                />
              </div>
              <div className="space-y-1.5 flex flex-col gap-1.5">
                <Label className="text-[14px]">Writing Tone</Label>
                <select 
                    value={form.writing_tone} 
                    onChange={(e) => updateLocal("writing_tone", e.target.value)} 
                    className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3 text-[14px] outline-none appearance-none bg-[url('/chevron-down.svg')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
                >
                  {["Select a tone e.g Professional", "Friendly", "Enthusiastic", "Confident", "Academic"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5 flex flex-col gap-1.5">
              <Label className="text-[14px]">Job Description (Optional)</Label>
              <div className="relative">
                <Textarea 
                    value={form.job_description} 
                    onChange={(e) => updateLocal("job_description", e.target.value.slice(0, 200))}
                    className="h-[112px]" 
                    rows={4} 
                    placeholder="Paste the job description here for a more tailored cover letter..." 
                />
                <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
                    {form.job_description?.length || 0}/200
                </div>
              </div>
            </div>

            <div className="space-y-1.5 flex flex-col gap-1.5">
              <Label className="text-[14px]">Your Relevant Experience</Label>
              <div className="relative">
                <Textarea 
                    value={form.relevant_experience} 
                    onChange={(e) => updateLocal("relevant_experience", e.target.value.slice(0, 200))}
                    className="h-[112px]"  
                    rows={4} 
                    placeholder="Briefly describe your relevant experience and achievements..." 
                />
                <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
                    {form.relevant_experience?.length || 0}/200
                </div>
              </div>
            </div>

            <div className="space-y-1.5 flex flex-col gap-1.5">
              <Label className="text-[14px]">Key Skills (comma-separated)</Label>
              <Input 
                  placeholder="JavaScript, React, Team Leadership, Problem Solving..." 
                  value={form.key_skills} 
                  onChange={(e) => updateLocal("key_skills", e.target.value)} 
              />
            </div>
          </>
        );
      }}
    />
  );
}
