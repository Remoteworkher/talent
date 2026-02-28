"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SalaryAnalyzerPage() {
  return (
    <BaseToolPage
      slug="salary-analyzer"
      resultPath="/career-tools/growth/salary-analyzer/result"
      initialData={{
        job_title: "",
        location: "",
        experience_level: "Mid-level",
        industry: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
            <div className="space-y-1.5"><Label>Job Title</Label><Input value={formData.job_title} onChange={(e) => handleInputChange("job_title", e.target.value)} placeholder="e.g. Sales Director" /></div>
            <div className="space-y-1.5"><Label>Location</Label><Input placeholder="e.g. London, UK" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} /></div>
            <div className="space-y-1.5">
                <Label>Experience Level</Label>
                <select value={formData.experience_level} onChange={(e) => handleInputChange("experience_level", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3">
                    {["Entry-level", "Mid-level", "Senior-level", "Executive"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div className="space-y-1.5"><Label>Industry</Label><Input value={formData.industry} onChange={(e) => handleInputChange("industry", e.target.value)} placeholder="e.g. SaaS" /></div>
        </>
      )}
    />
  );
}
