"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function ExploreCareersResultPage() {
  return (
    <BaseResultPage
      slug="explore-careers"
      formPath="/career-tools/growth/explore"
      downloadPdf={(output) => {
          console.log("Downloading PDF for Career Insight", output);
      }}
    />
  );
}
