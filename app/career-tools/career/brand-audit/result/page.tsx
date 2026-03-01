"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function BrandAuditResultPage() {
  return (
    <BaseResultPage
      slug="personal-brand-audit"
      headerTitle="Your Personal Brand Audit"
      formPath="/career-tools/career/brand-audit"
      downloadPdf={(output) => {
          console.log("Downloading PDF for Personal Brand Audit", output);
      }}
    />
  );
}
