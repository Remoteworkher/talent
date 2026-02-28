"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function CareerRoadmapResultPage() {
  return (
    <BaseResultPage
      slug="career-roadmap"
      formPath="/career-tools/growth/roadmap"
      downloadPdf={(output) => {
          console.log("Downloading PDF for Career Roadmap", output);
      }}
    />
  );
}
