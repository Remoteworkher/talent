"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import React from "react";

const targetAudiences = [
  "Select an option",
  "Recruiters & Hiring Managers",
  "Potential Clients & Leads",
  "Industry Peers & Professionals",
  "Startup Founders & CEOs",
];

const tones = [
  "Select an option",
  "Confident",
  "Professional",
  "Approachable",
  "Creative",
  "Storyteller",
];

export default function SummaryGeneratorPage() {
  return (
    <BaseToolPage
      slug="linkedin-summary-generator"
      resultPath="/career-tools/linkedin/summary-generator/result"
      submitButtonText="Generate summary"
      icon={
        <div className="bg-[#EEF2FF] p-2.5 rounded-xl border border-[#D0D7FF]">
           <FileText className="w-6 h-6 text-[#322FEB]" />
        </div>
      }
      titleOverride="LinkedIn Summary Generator"
      descriptionOverride="Create a compelling About section that tells your professional story"
      initialData={{
        current_role: "",
        target_audience: "Select an option",
        tone: "Select an option",
        experience_background: "",
        key_achievements: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <div className="space-y-6">
          <div className="space-y-2 text-left">
            <Label className="text-[14px] mori-semibold text-[#161A21]">Current Role</Label>
            <Input 
              value={formData.current_role} 
              onChange={(e) => handleInputChange("current_role", e.target.value)} 
              placeholder="Enter your current role" 
              className="h-12 rounded-xl border-[#E8E8E8] focus:border-[#322FEB] focus:ring-1 focus:ring-[#322FEB] transition-all"
            />
          </div>

          <div className="space-y-2 text-left">
            <Label className="text-[14px] mori-semibold text-[#161A21]">Target Audience</Label>
            <div className="relative">
              <select 
                value={formData.target_audience} 
                onChange={(e) => handleInputChange("target_audience", e.target.value)} 
                className="w-full h-12 rounded-xl border border-[#E8E8E8] bg-white px-4 text-[14px] outline-none appearance-none bg-[url('/chevron-down.svg')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat focus:border-[#322FEB] focus:ring-1 focus:ring-[#322FEB] transition-all text-[#6A6D71]"
              >
                {targetAudiences.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <Label className="text-[14px] mori-semibold text-[#161A21]">Tone</Label>
            <div className="relative">
              <select 
                value={formData.tone} 
                onChange={(e) => handleInputChange("tone", e.target.value)} 
                className="w-full h-12 rounded-xl border border-[#E8E8E8] bg-white px-4 text-[14px] outline-none appearance-none bg-[url('/chevron-down.svg')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat focus:border-[#322FEB] focus:ring-1 focus:ring-[#322FEB] transition-all text-[#6A6D71]"
              >
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <Label className="text-[14px] mori-semibold text-[#161A21]">Your Experience & Background</Label>
            <div className="relative">
              <Textarea 
                value={formData.experience_background} 
                onChange={(e) => handleInputChange("experience_background", e.target.value.slice(0, 200))} 
                rows={4} 
                placeholder="Brief overview of your career journey, skills, and what you do..." 
                className="rounded-xl border-[#E8E8E8] focus:border-[#322FEB] focus:ring-1 focus:ring-[#322FEB] transition-all resize-none min-h-[120px] pb-8"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[12px] text-[#95969A]">
                {formData.experience_background?.length || 0}/200
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M16.5 3.5L20.5 7.5L7.5 20.5H3.5V16.5L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <Label className="text-[14px] mori-semibold text-[#161A21]">Key Achievements</Label>
            <div className="relative">
              <Textarea 
                value={formData.key_achievements} 
                onChange={(e) => handleInputChange("key_achievements", e.target.value.slice(0, 200))} 
                rows={4} 
                placeholder="Notable accomplishments, metrics, awards..." 
                className="rounded-xl border-[#E8E8E8] focus:border-[#322FEB] focus:ring-1 focus:ring-[#322FEB] transition-all resize-none min-h-[120px] pb-8"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[12px] text-[#95969A]">
                {formData.key_achievements?.length || 0}/200
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M16.5 3.5L20.5 7.5L7.5 20.5H3.5V16.5L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
