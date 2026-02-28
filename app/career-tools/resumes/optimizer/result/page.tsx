"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function ResumeOptimizerResultPage() {
  return (
    <BaseResultPage
      slug="resume-optimizer"
      formPath="/career-tools/resumes/optimizer"
      downloadPdf={(output) => {
          console.log("Downloading PDF for Resume Optimization Report", output);
      }}
    />
  );
}
