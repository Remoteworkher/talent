"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ResumeOptimizerPage() {
  return (
    <BaseToolPage
      slug="resume-optimizer"
      resultPath="/career-tools/resumes/optimizer/result"
      initialData={{
        current_resume: "",
        job_description: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
            <div className="space-y-1.5"><Label>Your Current Resume (Paste Content)</Label><Textarea value={formData.current_resume} onChange={(e) => handleInputChange("current_resume", e.target.value)} rows={6} placeholder="Format the text from your PDF/Word doc here..." /></div>
            <div className="space-y-1.5"><Label>Target Job Description</Label><Textarea value={formData.job_description} onChange={(e) => handleInputChange("job_description", e.target.value)} rows={6} placeholder="Paste the job requirements here..." /></div>
        </>
      )}
    />
  );
}
