"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CareerRoadmapPage() {
  return (
    <BaseToolPage
      slug="career-roadmap"
      resultPath="/career-tools/career/roadmap/result"
      initialData={{
        current_role: "",
        years_of_experience: "",
        key_skills: "",
        target_monthly_income: "",
        timeline: "12 months",
      }}
      renderFields={(formData, handleInputChange) => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">Current Role</Label>
                <Input 
                  placeholder="e.g. Junior Developer"
                  value={formData.current_role} 
                  onChange={(e) => handleInputChange("current_role", e.target.value)} 
                  className="h-14 rounded-xl"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">Years of Experience</Label>
                <Input 
                  placeholder="e.g. 2 years"
                  value={formData.years_of_experience} 
                  onChange={(e) => handleInputChange("years_of_experience", e.target.value)} 
                  className="h-14 rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-1.5 text-left">
              <Label className="text-[#161A21] font-semibold text-[14px]">Key Skills</Label>
              <Input 
                placeholder="Skills you already have..."
                value={formData.key_skills} 
                onChange={(e) => handleInputChange("key_skills", e.target.value)} 
                className="h-14 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">Target Monthly Income</Label>
                <Input 
                  placeholder="e.g. ₦500k/month"
                  value={formData.target_monthly_income} 
                  onChange={(e) => handleInputChange("target_monthly_income", e.target.value)} 
                  className="h-14 rounded-xl"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">Timeline</Label>
                <Input 
                  placeholder="e.g. 6 months, 2 years"
                  value={formData.timeline} 
                  onChange={(e) => handleInputChange("timeline", e.target.value)} 
                  className="h-14 rounded-xl"
                />
              </div>
            </div>
        </div>
      )}
    />
  );
}
