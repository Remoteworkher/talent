"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function SalaryAnalyzerResultPage() {
  return (
    <BaseResultPage
      slug="salary-analyzer"
      formPath="/career-tools/career/salary-analyzer"
      downloadPdf={(output) => {
          console.log("Downloading PDF for Salary Insights", output);
      }}
    />
  );
}
