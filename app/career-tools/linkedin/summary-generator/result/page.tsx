"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function SummaryGeneratorResultPage() {
  return (
    <BaseResultPage
      slug="linkedin-summary-generator"
      formPath="/career-tools/linkedin/summary-generator"
      headerTitle="LinkedIn Summary Generator"
      downloadPdf={(output) => {
          console.log("Downloading PDF for LinkedIn Summary", output);
      }}
    />
  );
}
