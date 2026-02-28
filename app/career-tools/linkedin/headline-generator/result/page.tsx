"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function HeadlineGeneratorResultPage() {
  return (
    <BaseResultPage
      slug="headline-generator"
      formPath="/career-tools/linkedin/headline-generator"
      downloadPdf={(output) => {
          // Placeholder for PDF download
          console.log("Downloading PDF for Headlines", output);
      }}
    />
  );
}
