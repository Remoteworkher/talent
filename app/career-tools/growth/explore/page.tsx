"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ExploreCareersPage() {
  return (
    <BaseToolPage
      slug="explore-careers"
      resultPath="/career-tools/growth/explore/result"
      initialData={{
        career_job_title: "",
        location: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
            <div className="space-y-1.5"><Label>Career Job Title</Label><Input value={formData.career_job_title} onChange={(e) => handleInputChange("career_job_title", e.target.value)} placeholder="e.g. Data Scientist" /></div>
            <div className="space-y-1.5"><Label>Location</Label><Input placeholder="e.g. Remote" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} /></div>
        </>
      )}
    />
  );
}
