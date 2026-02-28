"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function CoverLetterResultPage() {
  return (
    <BaseResultPage
      slug="cover-letter-builder"
      formPath="/career-tools/resumes/cover-letter"
      headerTitle="Your cover letter is ready!"
      downloadPdf={(output) => {
          console.log("Downloading PDF for Cover Letter", output);
      }}
    />
  );
}
