"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SalaryAnalyzerPage() {
  return (
    <BaseToolPage
      slug="salary-analyzer"
      resultPath="/career-tools/career/salary-analyzer/result"
      initialData={{
        job_title: "",
        location: "",
        experience_level: "Mid-level",
        industry: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <div className="space-y-6">
            <div className="space-y-1.5 text-left">
              <Label className="text-[#161A21] font-semibold text-[14px]">Job Title</Label>
              <Input 
                placeholder="e.g. Sales Director"
                value={formData.job_title} 
                onChange={(e) => handleInputChange("job_title", e.target.value)} 
                className="h-14 rounded-xl"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <Label className="text-[#161A21] font-semibold text-[14px]">Location</Label>
              <Input 
                placeholder="e.g. London, UK" 
                value={formData.location} 
                onChange={(e) => handleInputChange("location", e.target.value)} 
                className="h-14 rounded-xl"
              />
            </div>
            <div className="space-y-1.5 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">Experience Level</Label>
                <Select value={formData.experience_level} onValueChange={(v) => handleInputChange("experience_level", v)}>
                  <SelectTrigger className="h-14 rounded-xl border-[#E8E8E8]">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {["Entry-level", "Mid-level", "Senior-level", "Executive"].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-1.5 text-left">
              <Label className="text-[#161A21] font-semibold text-[14px]">Industry</Label>
              <Input 
                placeholder="e.g. SaaS"
                value={formData.industry} 
                onChange={(e) => handleInputChange("industry", e.target.value)} 
                className="h-14 rounded-xl"
              />
            </div>
        </div>
      )}
    />
  );
}
