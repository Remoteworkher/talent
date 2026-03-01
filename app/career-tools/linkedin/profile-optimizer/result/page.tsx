"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function LinkedInOptimizerResultPage() {
  return (
    <BaseResultPage
      slug="profile-optimizer"
      formPath="/career-tools/linkedin/profile-optimizer"
      headerTitle="Profile optimizer"
      downloadPdf={(output) => {
          console.log("Downloading PDF for LinkedIn Optimization Report", output);
      }}
    />
  );
}
