"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ExploreCareersPage() {
  return (
    <BaseToolPage
      slug="explore-careers"
      titleOverride="Explore Careers"
      descriptionOverride="Discover detailed information about any career and see how well you fit based on your skills"
      submitButtonText="Generate career path"
      resultPath="/career-tools/career/explore/result"
      initialData={{
        career_job_title: "",
        location: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <div className="space-y-6">
            <div className="space-y-1.5 text-left">
              <Label className="text-[#161A21] font-semibold text-[14px]">Career / Job Title</Label>
              <Input 
                placeholder="Enter your current role" 
                value={formData.career_job_title} 
                onChange={(e) => handleInputChange("career_job_title", e.target.value)} 
                className="h-14 rounded-xl"
              />
            </div>
            
            <div className="space-y-1.5 text-left">
              <Label className="text-[#161A21] font-semibold text-[14px]">Location</Label>
              <Input 
                placeholder="City, Country e.g Lagos, Nigeria" 
                value={formData.location} 
                onChange={(e) => handleInputChange("location", e.target.value)} 
                className="h-14 rounded-xl"
              />
            </div>
        </div>
      )}
    />
  );
}
