"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

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
      icon={<FileText className="w-6 h-6" />}
      initialData={{
        current_role: "",
        target_audience: "Select an option",
        tone: "Select an option",
        experience_background: "",
        key_achievements: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
          <div className="space-y-1.5">
            <Label className="text-[14px]">Current Role</Label>
            <Input 
              value={formData.current_role} 
              onChange={(e) => handleInputChange("current_role", e.target.value)} 
              placeholder="Enter your current role" 
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[14px]">Target Audience</Label>
            <select 
              value={formData.target_audience} 
              onChange={(e) => handleInputChange("target_audience", e.target.value)} 
              className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3 text-[14px] outline-none appearance-none bg-[url('/chevron-down.svg')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
            >
              {targetAudiences.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[14px]">Tone</Label>
            <select 
              value={formData.tone} 
              onChange={(e) => handleInputChange("tone", e.target.value)} 
              className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3 text-[14px] outline-none appearance-none bg-[url('/chevron-down.svg')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
            >
              {tones.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-1.5 flex flex-col gap-1.5">
            <Label className="text-[14px]">Your Experience & Background</Label>
            <div className="relative">
              <Textarea 
                value={formData.experience_background} 
                onChange={(e) => handleInputChange("experience_background", e.target.value.slice(0, 200))} 
                rows={4} 
                placeholder="Brief overview of your career journey, skills, and what you do..." 
              />
              <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
                {formData.experience_background?.length || 0}/200
              </div>
            </div>
          </div>

          <div className="space-y-1.5 flex flex-col gap-1.5">
            <Label className="text-[14px]">Key Achievements</Label>
            <div className="relative">
              <Textarea 
                value={formData.key_achievements} 
                onChange={(e) => handleInputChange("key_achievements", e.target.value.slice(0, 200))} 
                rows={4} 
                placeholder="Notable accomplishments, metrics, awards..." 
              />
              <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
                {formData.key_achievements?.length || 0}/200
              </div>
            </div>
          </div>
        </>
      )}
    />
  );
}
