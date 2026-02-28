"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HeadlineGeneratorPage() {
  return (
    <BaseToolPage
      slug="headline-generator"
      resultPath="/career-tools/linkedin/headline-generator/result"
      initialData={{
        current_role: "",
        target_role: "",
        industry: "",
        key_skills: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
          <div className="space-y-1.5">
            <Label>Current Role</Label>
            <Input 
              value={formData.current_role} 
              onChange={(e) => handleInputChange("current_role", e.target.value)} 
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Target Role (Optional)</Label>
            <Input 
              value={formData.target_role} 
              onChange={(e) => handleInputChange("target_role", e.target.value)} 
              placeholder="e.g. Engineering Lead"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Industry</Label>
            <Input 
              value={formData.industry} 
              onChange={(e) => handleInputChange("industry", e.target.value)} 
              placeholder="e.g. HealthTech"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Key Skills</Label>
            <Input 
              value={formData.key_skills} 
              onChange={(e) => handleInputChange("key_skills", e.target.value)} 
              placeholder="e.g. Leadership, React, TypeScript"
            />
          </div>
        </>
      )}
    />
  );
}
