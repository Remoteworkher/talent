"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CareerRoadmapPage() {
  return (
    <BaseToolPage
      slug="career-roadmap"
      resultPath="/career-tools/growth/roadmap/result"
      initialData={{
        current_role: "",
        years_of_experience: "",
        key_skills: "",
        target_monthly_income: "",
        timeline: "12 months",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Current Role</Label><Input value={formData.current_role} onChange={(e) => handleInputChange("current_role", e.target.value)} placeholder="e.g. Junior Developer" /></div>
              <div className="space-y-1.5"><Label>Years of Experience</Label><Input value={formData.years_of_experience} onChange={(e) => handleInputChange("years_of_experience", e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Key Skills</Label><Input value={formData.key_skills} onChange={(e) => handleInputChange("key_skills", e.target.value)} placeholder="Skills you already have..." /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Target Monthly Income</Label><Input value={formData.target_monthly_income} onChange={(e) => handleInputChange("target_monthly_income", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Timeline</Label><Input value={formData.timeline} onChange={(e) => handleInputChange("timeline", e.target.value)} placeholder="e.g. 6 months, 2 years" /></div>
            </div>
        </>
      )}
    />
  );
}
