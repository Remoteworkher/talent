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

const INDUSTRIES = [
  "Technology",
  "Fintech",
  "E-commerce",
  "Healthcare",
  "Education",
  "Media & Entertainment",
  "Banking & Finance",
  "Consulting",
  "Manufacturing",
  "Telecommunications",
  "Real Estate",
  "Agriculture",
  "Energy & Utilities",
  "Logistics & Supply Chain",
  "Other",
];

export default function SalaryAnalyzerPage() {
  return (
    <BaseToolPage
      slug="salary-analyzer"
      resultPath="/career-tools/career/salary-analyzer/result"
      submitButtonText="Analyze salary"
      initialData={{
        job_title: "",
        location: "",
        experience_level: "",
        industry: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <div className="space-y-7">
          {/* Job Title */}
          <div className="space-y-2 text-left">
            <Label className="text-[#161A21] font-semibold text-[14px]">Job Title</Label>
            <Input
              placeholder="e.g Software Engineer"
              value={formData.job_title}
              onChange={(e) => handleInputChange("job_title", e.target.value)}
              className="h-14 rounded-xl border-[#E8E8E8] bg-white"
            />
          </div>

          {/* Location */}
          <div className="space-y-2 text-left">
            <Label className="text-[#161A21] font-semibold text-[14px]">Location</Label>
            <Input
              placeholder="City, Country e.g Lagos, Nigeria"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="h-14 rounded-xl border-[#E8E8E8] bg-white"
            />
          </div>

          {/* Experience Level */}
          <div className="space-y-2 text-left">
            <Label className="text-[#161A21] font-semibold text-[14px]">Experience Level</Label>
            <Select
              value={formData.experience_level}
              onValueChange={(v) => handleInputChange("experience_level", v)}
            >
              <SelectTrigger className="h-14 rounded-xl border-[#E8E8E8] bg-white text-left">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Entry-level">Entry-level</SelectItem>
                <SelectItem value="Mid-level">Mid-level</SelectItem>
                <SelectItem value="Senior-level">Senior-level</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Industry (Optional) */}
          <div className="space-y-2 text-left">
            <Label className="text-[#161A21] font-semibold text-[14px]">Industry (Optional)</Label>
            <Select
              value={formData.industry}
              onValueChange={(v) => handleInputChange("industry", v)}
            >
              <SelectTrigger className="h-14 rounded-xl border-[#E8E8E8] bg-white text-left">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {INDUSTRIES.map((ind) => (
                  <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    />
  );
}
